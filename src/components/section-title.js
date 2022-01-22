import React from "react"; // eslint-disable-line no-unused-vars

const SectionTitle = ({ children }) => (
  <h2
    css={{
      fontSize: "5.6rem",
      fontWeight: "400",
      lineHeight: "64px",
      textAlign: "right",
      letterSpacing: "0.01em",
      textTransform: "uppercase",
    }}
  >
    {children}
  </h2>
);

export default SectionTitle;
