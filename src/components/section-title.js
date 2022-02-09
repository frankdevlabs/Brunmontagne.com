import React from "react"; // eslint-disable-line no-unused-vars
import mq from "../theme/media-queries";

const SectionTitle = ({ children, textAlign = "right" }) => (
  <h2
    css={{
      fontSize: "5.6rem",
      fontWeight: "400",
      lineHeight: "64px",
      textAlign: textAlign,
      letterSpacing: "0.01em",
      textTransform: "uppercase",
      [mq("md")]: {
        fontSize: "4.5rem",
        lineHeight: "50px",
      },
      [mq("sm")]: {
        fontSize: "2.8rem",
        lineHeight: "36px",
      },
    }}
  >
    {children}
  </h2>
);

export default SectionTitle;
