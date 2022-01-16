const { createClient } = require("gatsby-source-shopify/client");
const { TRANSLATE_BY_RESOURCE_ID } = require("./queries/translateByResourceId");
const { parseTranslations } = require("./lib/parse-translations");
const { removeHtmlTags } = require("./lib/remove-html-tags");

exports.onCreateNode = async ({ node, actions }, pluginOptions) => {
  const { createNodeField } = actions;
  const nodeType = node.internal.type;
  const isShopifyProduct = nodeType === "ShopifyProduct";
  const isShopifyProductVariant = nodeType === "ShopifyProductVariant";

  if (isShopifyProduct || isShopifyProductVariant) {
    const client = createClient(pluginOptions);

    const defaultDescription = node.description;
    const defaultMetaDescription = node.seo ? node.seo.description : "";
    const defaultTitle = node.title;

    createNodeField({
      node,
      name: `${pluginOptions.defaultLanguage}-locale`,
      value: {
        description: defaultDescription || "",
        metaDescription: defaultMetaDescription || "",
        title: defaultTitle || "",
      },
    });

    pluginOptions.translatedLangs.map(async (lang) => {
      const localizedProduct = await client.request(TRANSLATE_BY_RESOURCE_ID, {
        resourceId: node.shopifyId,
        lang: lang,
      });

      const translations = parseTranslations(
        localizedProduct.translatableResource.translations
      );
      const description = translations.body_html
        ? removeHtmlTags(translations.body_html)
        : defaultDescription;
      const metaDescription = translations.meta_description
        ? translations.meta_description
        : defaultMetaDescription;
      const title = translations.title ? translations.title : defaultTitle;

      createNodeField({
        node,
        name: `${lang}-locale`,
        value: {
          description: description || "",
          metaDescription: metaDescription || "",
          title: title || "",
        },
      });
    });
  }
};
