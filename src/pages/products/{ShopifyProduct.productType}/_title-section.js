import React from "react"; // eslint-disable-line no-unused-vars
// import Rating from "../../../components/rating";

// eslint-disable-next-line no-unused-vars
const Title = ({ title, averageAllReviews, votes }) => {
  return (
    <section css={{ paddingBottom: "1rem" }}>
      <div className="container">
        <div
          css={{
            borderTop: "1px solid #F1F1F1",
            borderBottom: "1px solid #F1F1F1",
            height: "5.6rem",
            display: "flex",
            alignItems: "center",
            "& > *:not(:last-child)::after": {
              content: '"|"',
              display: "inline-flex",
              width: "2.6rem",
              justifyContent: "center",
            },
          }}
        >
          <div
            css={{
              fontSize: "1.6rem",
              lineHeight: "19px",
              letterSpacing: "0.01em",
            }}
          >
            {title}
          </div>
          {/*{averageAllReviews && (*/}
          {/*  <div>*/}
          {/*    <Rating votes={votes} value={averageAllReviews.average} />*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>
      </div>
    </section>
  );
};

export default Title;
