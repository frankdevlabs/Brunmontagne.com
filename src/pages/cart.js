import React, { useContext, useEffect } from "react"; // eslint-disable-line no-unused-vars
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import LayoutContainer from "../containers/layout-container";
import { StoreContext } from "../context/store-context";
import CartItem from "../components/cart-item";
import Link from "../components/link";
import ProductDeliveryTerms from "../components/product-delivery-terms";
import { formatPrice } from "../utils/format-price";
import Button from "../components/button";
import mq from "../theme/media-queries";
import { VIEW_CART_EVENT, BEGIN_CHECKOUT_EVENT } from "../utils/gtm";
import useCookie from "../utils/use-cookie";

const CartPage = ({ pageContext, location }) => {
  const { checkout, loading } = useContext(StoreContext);
  const emptyCart = checkout.lineItems.length === 0;
  const [pref] = useCookie("pref", "analytics=1|personalisation=0");

  useEffect(() => {
    VIEW_CART_EVENT(checkout.lineItems, pref.includes("personalisation=1"));
  });

  const handleCheckout = () => {
    BEGIN_CHECKOUT_EVENT(
      checkout.lineItems,
      pref.includes("personalisation=1")
    );
    window.open(
      `${checkout.webUrl.replace(
        process.env.GATSBY_SHOPIFY_STORE_URL,
        process.env.GATSBY_PUBLIC_SHOPIFY_STORE_URL
      )}&note=2013-02-14`
    );
  };

  const { t } = useTranslation();
  const description = t("description");
  const title = t("empty-cart.title");
  const lang = pageContext.i18n.language;

  return (
    <LayoutContainer
      title={title}
      description={description}
      path={location.pathname}
      type="website"
      lang={lang}
    >
      <section>
        <div className="container">
          {emptyCart ? (
            <div
              css={{
                textAlign: "center",
                maxWidth: "48ch",
                marginLeft: "auto",
                marginRight: "auto",
                minHeight: "50vh",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <h1 css={{ marginBottom: "1rem" }}>{t("empty-cart.title")}</h1>
              <p>{t("empty-cart.description")}</p>
              <div css={{ marginTop: "4rem" }}>
                <Link ui="button" to="/collection/">
                  {t("empty-cart.button")}
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div css={{ margin: "5rem 0 7rem 0" }}>
                <div>
                  <div>
                    <h1>{t("not-empty-cart.title")}</h1>
                  </div>
                </div>
                <div
                  css={{
                    marginTop: "3rem",
                    "& > *:not(:first-of-type)": {
                      padding: "3rem 0",
                    },
                  }}
                >
                  {checkout.lineItems.map((item) => (
                    <CartItem item={item} key={item.id} />
                  ))}
                </div>
                <div
                  css={{
                    display: "flex",
                    justifyContent: "space-between",
                    maxWidth: "90rem",
                    alignItems: "end",
                    [mq("md")]: {
                      flexWrap: "wrap",

                      "& > *": {
                        flex: "0 1 100%",
                      },
                      "& > *:last-of-type": {
                        marginTop: "2rem",
                      },
                    },
                  }}
                >
                  <div
                    css={{
                      marginTop: "3rem",
                      "& > *": {
                        display: "flex",
                        justifyContent: "space-between",

                        "& > *:first-of-type": {
                          fontWeight: "700",
                          marginRight: "2rem",
                        },
                      },
                    }}
                  >
                    <div>
                      <span>{t("not-empty-cart.subtotal")}:</span>
                      <span>
                        {formatPrice(
                          checkout.subtotalPriceV2.currencyCode,
                          checkout.subtotalPriceV2.amount
                        )}
                      </span>
                    </div>
                    <div>
                      <span>{t("not-empty-cart.taxes")}:</span>
                      <span>
                        {formatPrice(
                          checkout.totalTaxV2.currencyCode,
                          checkout.totalTaxV2.amount
                        )}
                      </span>
                    </div>
                    <div
                      css={{ marginTop: "1rem", borderTop: "1px solid white" }}
                    >
                      <span>{t("not-empty-cart.total")}:</span>
                      <span>
                        {formatPrice(
                          checkout.totalPriceV2.currencyCode,
                          checkout.totalPriceV2.amount
                        )}
                      </span>
                    </div>
                  </div>
                  <div
                    css={{
                      display: "inline-block",

                      "& > button": {
                        padding: "2.3rem 7rem",
                      },
                    }}
                  >
                    <Button onClick={handleCheckout} disabled={loading}>
                      {t("not-empty-cart.checkout-button")}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div>
          <ProductDeliveryTerms />
        </div>
        <div css={{ marginTop: "2.7rem" }}>
          <Link ui="button" to="/collection/">
            Verder winkelen
          </Link>
        </div>
      </section>
    </LayoutContainer>
  );
};

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;

export default CartPage;
