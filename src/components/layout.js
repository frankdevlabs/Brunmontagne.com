import React from "react"; // eslint-disable-line no-unused-vars
// import { SkipNavContent, SkipNavLink } from "./skip-nav"
import Header from "./header";
// import { Footer } from "./footer"
import Seo from "./seo";

function Layout(props) {
  const { children } = props;
  return (
    <div
      css={{
        position: `${
          props.path === "/" || props.path === "/en/" ? "relative" : "unset "
        }`,
      }}
    >
      <Seo {...props} />
      <Header />
      <main
        css={{
          height: "80vh",
          minHeight: "35rem",
          ...(props.path === "/" || props.path === "/en/"
            ? { position: "absolute", top: "0", width: "100%" }
            : {}),
        }}
      >
        {children}
      </main>
      {/*<Footer />*/}
    </div>
  );
}

export default Layout;
