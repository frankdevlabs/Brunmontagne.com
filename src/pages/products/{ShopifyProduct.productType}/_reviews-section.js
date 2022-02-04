import React from "react"; // eslint-disable-line no-unused-vars
import { useTranslation } from "gatsby-plugin-react-i18next";
import { formatLocalizedDate } from "../../../utils/format-date";
import Avatar from "../../../components/avatar";
import Rating from "../../../components/rating";

import { useTheme } from "@emotion/react";
import mq from "../../../theme/media-queries";

const Reviews = ({ reviews, averageAllReviews, lang }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <section>
      <div css={{ marginBottom: "2.1rem" }}>
        <h2>{t("titles.reviews-section")}</h2>
      </div>
      <div css={{ marginBottom: "5.3rem" }}>
        <Rating value={averageAllReviews.average} votes={reviews.length} />
        <div
          css={{
            fontSize: "1.6rem",
            lineHeight: "119%",
            letterSpacing: "0.01em",
            color: theme.colors.SECONDARY_LIGHT_60,
          }}
        >
          {t("average-rating")}
        </div>
      </div>
      <div
        css={{
          "& > div:not(:last-child) > *::after": {
            content: '""',
            display: "block",
            height: "0.5px",
            width: "90%",
            marginBottom: "2.3rem",
            marginRight: "auto",
            marginLeft: "auto",
            backgroundColor: "rgba(241, 241, 241, 0.7)",
          },
        }}
      >
        {reviews.map(({ node }) => {
          const [day, month, year] = node.date.split("-");
          const formattedDate = formatLocalizedDate(day, month, year, lang);
          return (
            <div
              key={node.id}
              css={{
                marginRight: "4.6rem",
                [mq("lg")]: {
                  marginRight: 0,
                },
              }}
            >
              <div>
                <div
                  css={{
                    display: "flex",
                  }}
                >
                  <div css={{ marginRight: "4.1rem" }}>
                    <Avatar />
                  </div>
                  <div css={{ fontSize: "1.6rem" }}>
                    <div
                      css={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.8rem",
                        [mq("md")]: {
                          flexWrap: "wrap",
                          marginBottom: "0",
                        },
                      }}
                    >
                      <div
                        css={{
                          lineHeight: "119%",
                          letterSpacing: "0.03em",
                          [mq("md")]: {
                            flex: "0 1 100%",
                          },
                        }}
                      >
                        <strong>{node.name}</strong>{" "}
                        <span css={{ color: theme.colors.SECONDARY_LIGHT_60 }}>
                          {formattedDate}
                        </span>
                      </div>
                      <div
                        css={{
                          marginRight: "2rem",
                          [mq("md")]: {
                            marginRight: "0",
                            flex: "0 1 100%",
                          },
                        }}
                      >
                        <Rating
                          value={node.rating}
                          showVotes={false}
                          size="sm"
                        />
                      </div>
                    </div>
                    <div
                      css={{
                        lineHeight: "131%",
                        letterSpacing: "0.02em",
                        marginBottom: "2.3rem",
                      }}
                    >
                      {node[`text${lang}`]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Reviews;
