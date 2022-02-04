import React, { useState } from "react"; // eslint-disable-line no-unused-vars
import Button from "./button";
import { useTranslation } from "gatsby-plugin-react-i18next";

const ReadMoreTextBlock = ({ children, length, styles }) => {
  const { t } = useTranslation();

  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <>
      <p css={styles}>
        {isReadMore ? text.slice(0, length) : text}
        {isReadMore ? "..." : ""}
      </p>
      <div css={{ paddingTop: "3.1rem" }}>
        <Button onClick={toggleReadMore} size="sm" ui="arrow-btn">
          {isReadMore ? t("buttons.read-more") : t("buttons.read-less")}
        </Button>
      </div>
    </>
  );
};

export default ReadMoreTextBlock;
