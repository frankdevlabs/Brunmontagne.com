import React from "react"; // eslint-disable-line no-unused-vars
import { useTheme } from "@emotion/react";
import mq from "../theme/media-queries";

const Footer = () => {
  const theme = useTheme();
  return (
    <footer
      css={{
        padding: `12.5rem ${theme.padding.DEFAULT} 0 ${theme.padding.DEFAULT}`,
        [mq("lg")]: {
          padding: `12.5rem ${theme.padding.XL} 0 ${theme.padding.XL}`,
        },
        [mq("md")]: {
          padding: `6rem ${theme.padding.MD} 0 ${theme.padding.MD}`,
        },
        [mq("sm")]: {
          padding: `3.5rem ${theme.padding.SM} 0 ${theme.padding.SM}`,
        },
      }}
    >
      footer placeholder
    </footer>
  );
};

export default Footer;
