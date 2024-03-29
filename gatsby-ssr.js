import React, { createElement } from "react"; // eslint-disable-line no-unused-vars
import SimpleReactLightbox from "simple-react-lightbox";
import App from "./src/app";

export const wrapRootElement = ({ element }) => {
  return (
    <App>
      <SimpleReactLightbox>{element}</SimpleReactLightbox>
    </App>
  );
};

const gtmLoadScript = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      '${process.env.GATSBY_GTM_CONTAINER_URL}/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${process.env.GATSBY_GTM_CONTAINER_ID}');`;

export const onRenderBody = ({ setPreBodyComponents, setHeadComponents }) => {
  const gtmHeadScript = createElement("script", {
    key: "gtm-head",
    dangerouslySetInnerHTML: {
      __html: gtmLoadScript,
    },
  });
  const gtmBodyScript = (
    <noscript key="gtm-body">
      <iframe
        title="gtm"
        src={`${process.env.GATSBY_GTM_CONTAINER_URL}/ns.html?id=${process.env.GATSBY_GTM_CONTAINER_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      >
        {""}
      </iframe>
    </noscript>
  );

  if (process.env.NODE_ENV !== "development") {
    setHeadComponents([gtmHeadScript]);
    setPreBodyComponents([gtmBodyScript]);
  }
};
