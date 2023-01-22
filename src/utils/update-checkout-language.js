import { isBrowser } from "./is-browser";
import { localStorageKey } from "../context/store-context";

const createGraphQLQueryString = (country, language, lineItems) => `
mutation updateCheckout @inContext(country: ${country}, language: ${language}) {
  checkoutCreate(input: { lineItems: [${lineItems}] }) {
    checkout {
       id
       webUrl
       lineItems(first:1) {
         edges {
           node {
             id
             title
             quantity
           }
         }
       }
    }
  }
}`;

export const updateCheckoutLanguage = async (
  country,
  language,
  shopifyLineItems
) => {
  // using fetch, create a POST request to a graphql endpoint with the language,
  // variantId and checkoutId using fetch
  // return the response

  const checkoutId = isBrowser ? localStorage.getItem(localStorageKey) : null;

  if (checkoutId && checkoutId !== `null`) {
    const items = shopifyLineItems
      .map((item) => {
        return `{
        variantId: "${item.variant.id}", quantity: ${item.quantity}
        }`;
      })
      .toString();
    const res = await fetch(
      `https://${process.env.GATSBY_SHOPIFY_STORE_URL}/api/2023-01/graphql`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-SDK-Variant": "javascript",
          "X-Shopify-Storefront-Access-Token":
            process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
        },
        body: JSON.stringify({
          operationName: "updateCheckout",
          query: createGraphQLQueryString(country, language, items, checkoutId),
          variables: null,
        }),
      }
    );

    const data = await res.json();
    return data.data.checkoutCreate.checkout.webUrl;
  }
};
