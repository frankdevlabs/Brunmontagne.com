import React from "react"; // eslint-disable-line no-unused-vars
import { Link, useI18next } from "gatsby-plugin-react-i18next";
import Dutch from "../assets/vectors/nl.svg";
import English from "../assets/vectors/uk.svg";

const LanguagePicker = () => {
  const { languages, originalPath, language } = useI18next();
  const isDutch = language === "nl";
  const isEnglish = language === "en";

  return (
    <div>
      <div
        css={{
          "&:hover > ul": {
            zIndex: "9001",
            opacity: "1",
          },
          position: "relative",
          "& > svg, & > ul > li > a > svg": { height: "24px" },
        }}
      >
        {isDutch && <Dutch />}
        {isEnglish && <English />}
        <ul
          css={{
            transition: "all 1s ease",
            position: "absolute",
            zIndex: "-2",
            opacity: "0",
          }}
        >
          {languages.map((lng) => {
            if (lng === language) return;
            return (
              <li key={lng}>
                <Link to={originalPath} language={lng}>
                  {isEnglish && <Dutch />}
                  {isDutch && <English />}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default LanguagePicker;
