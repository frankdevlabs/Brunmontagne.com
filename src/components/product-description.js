import React from "react"; // eslint-disable-line no-unused-vars
import ReadMoreTextBlock from "./read-more-text-block";
import { useTheme } from "../theme/theme";

const ProductDescription = ({ description }) => {
  const theme = useTheme();
  return (
    <ReadMoreTextBlock
      styles={{
        fontSize: "1.4rem",
        lineHeight: "137%",
        letterSpacing: "0.03em",
        color: theme.colors.SECONDARY_LIGHT,
      }}
      length={150}
    >
      {description}
    </ReadMoreTextBlock>
  );
};

export default ProductDescription;
