import React from "react"; // eslint-disable-line no-unused-vars
import Header from "./header";
import Footer from "./footer";
import Seo from "./seo";
import CookieNotice from "./cookie-notice";

function Layout(props) {
  const { children, topLayerComponent } = props;

  return (
    <>
      <CookieNotice />
      <div
        css={{
          position: `${
            props.path === "/" ||
            props.path === "/en/" ||
            props.path.indexOf("/en#") === 0
              ? "relative"
              : "unset "
          }`,
        }}
      >
        <Seo {...props} />
        <Header />
        <div
          css={{
            height: "80vh",
            minHeight: "35rem",
            ...(props.path === "/" ||
            props.path === "/en/" ||
            props.path.indexOf("/en#") === 0
              ? { position: "absolute", top: "0", width: "100%" }
              : {}),
          }}
        >
          <main>{children}</main>
          <Footer />
          {topLayerComponent}
        </div>
      </div>
    </>
  );
}

export default Layout;
