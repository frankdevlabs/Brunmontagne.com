import React from "react"; // eslint-disable-line no-unused-vars
import FastDeliverTruck from "../assets/vectors/fast-delivery-truck.svg";
import IDeal from "../assets/vectors/ideal.svg";
import Mastercard from "../assets/vectors/mastercard.svg";
import Visa from "../assets/vectors/visa.svg";
import AmericanExpress from "../assets/vectors/american-express.svg";
import GooglePay from "../assets/vectors/google-pay.svg";
import ShopPay from "../assets/vectors/shop-pay.svg";
import { useTranslation } from "gatsby-plugin-react-i18next";

/*
Quick Fix: We are importing the PostNL Vector in this manner to avoid an
id collision in case we import the PostNL vector more than once on a page.
*/
const PostNL = () => {
  const id = Math.random();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 75 74.2"
      width={2500}
      height={2473}
    >
      <style>{".st3{fill:#fff}"}</style>
      <path
        d="M-37.5-37.8h150v150h-150z"
        style={{
          fill: "none",
        }}
      />
      <path
        d="M16.4.1c9 0 23.5 5.7 33.1 11C60.1 17 75 28.9 75 37.1c0 8.7-15.3 20.3-25.5 26-9.3 5.1-23.5 11.1-32.8 11.1-2.5 0-4.5-.4-6-1.2C3.4 68.9 0 51.5 0 37.1c0-7.3.9-15 2.6-21.4 2-7.6 4.8-12.6 8.1-14.5C12.1.5 14 .1 16.4.1"
        style={{
          fill: "#a6acb2",
        }}
      />
      <radialGradient
        id={id}
        cx={304.728}
        cy={1214.748}
        r={49.143}
        gradientTransform="translate(-283.6 -1185.99)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#ffc429" />
        <stop offset={1} stopColor="#f26f23" />
      </radialGradient>
      <path
        d="M72.5 37.3c0-6.2-11.7-17.1-24.2-24C33.8 5.4 17.4.8 12 3.7 5.9 7.1 2.5 24.1 2.5 37.3c0 13.3 3.2 30.1 9.5 33.6 5.8 3.2 21.5-1.5 36.2-9.7C61 54.3 72.5 43.9 72.5 37.3"
        style={{
          fill: `url(#${id})`,
        }}
      />
      <path
        className="st3"
        d="m56.1 43.6-.1-6.3c0-1.4-.5-2-1.6-2-.4 0-.9.1-1.3.4-.5.3-.8.5-1 .6l-.1.1v7.1s0 .1-.1.1h-2.8s-.1 0-.1-.1v-10c0-.2.1-.3.3-.3h2.5s.1 0 .1.1v.8s0 .1.1.1h.1l.1-.1c.3-.2.8-.5 1.1-.6.7-.3 1.4-.4 2-.4 2.3 0 3.5 1.3 3.5 3.8v6.7s0 .1-.1.1l-2.6-.1m5.2 0c-.1 0-.1 0 0 0l-.1-15.4c0-.1 0-.1.1-.1.2 0 1.7 1 2.2 1.5.4.4.6 1 .6 1.5v12.3s0 .1-.1.1h-2.7"
      />
      <path
        d="M30.6 38.4c0 3.7-2.4 5.4-5.4 5.4-3 0-5.4-1.7-5.4-5.4s2.4-5.4 5.4-5.4c3 0 5.4 1.7 5.4 5.4m-3 0c0-2-1-2.8-2.3-2.8-1.3 0-2.3.9-2.3 2.8 0 1.8 1 2.8 2.3 2.8 1.3.1 2.3-.9 2.3-2.8zm17.1-8c0-.1 0-.1-.1-.1-.2 0-1.8 1-2.2 1.5-.4.4-.6 1-.6 1.5V40c0 2.9 1.7 3.8 3.5 3.8 1 0 1.7-.1 2.1-.4.1 0 .2-.1.2-.3v-1.9c0-.1 0-.1-.1-.1s-.8.3-1.2.3c-.9 0-1.5-.4-1.5-1.9v-3.8c0-.1 0-.1.1-.1h2.5c.1 0 .1 0 .1-.1v-2c0-.2-.1-.3-.3-.3h-2.3c-.1 0-.1 0-.1-.1l-.1-2.7M8.6 33.6c0-.2.2-.3.3-.3h3.9c3.9 0 5.9 2.3 5.9 5.3s-2.2 5.1-5.9 5.1h-1.2c-.1 0-.1 0-.1.1v4.9c0 .1 0 .1-.1.1-.2 0-1.8-1-2.2-1.5-.4-.4-.6-1-.6-1.5V33.6m7.2 4.8c0-1.3-.8-2.5-3-2.5h-1.2c-.1 0-.1 0-.1.1v4.8c0 .1 0 .1.1.1h1.2c2.6 0 3-1.8 3-2.5zM39 38c-.6-.4-1.4-.6-2.1-.7-.1 0-.6-.1-.7-.2-.9-.2-1.6-.4-1.6-.9s.5-.8 1.2-.8c.9 0 2.2.2 3.6.7.1 0 .2 0 .2-.1v-2c0-.1-.1-.3-.2-.3-.5-.2-2-.6-3.2-.6-1.4 0-2.5.3-3.3.9-.8.6-1.2 1.4-1.2 2.4 0 2.3 1.9 2.7 3.7 3.1.3.1.2.1.3.1.8.2 1.7.4 1.7 1 0 .2-.1.4-.2.5-.2.2-.6.3-1.2.3-1.1 0-3.3-.5-3.9-.7-.1 0-.1.1-.1.1v2c0 .1.1.3.2.3 0 0 1.9.6 3.6.6 3.1 0 4.7-1.2 4.7-3.4-.3-1-.7-1.8-1.5-2.3"
        style={{
          fill: "#383792",
        }}
      />
      <path
        className="st3"
        d="M20.7 30.6c-.2 0-.4-.1-.4-.4V29c0-.3.2-.5.5-.5h8.9c.3 0 .5.2.5.5v1.1c0 .3-.1.4-.4.4h-9.1m8-3.1c-.1 0-.2 0-.2-.1v-.2c.3-.9 1.3-3.7 1.3-3.7.1-.2 0-.4-.2-.5l-.5-.2H29c-.1 0-.2 0-.2.1-.2.5-.3.8-.5 1.3 0 .1-.1.1-.2.1h-1c-.1 0-.1 0-.2-.1v-.2c.3-.9.5-1.6.9-2.4.1-.1.2-.4.6-.4h.2c.3.1.7.2 1.1.3.3.1.6.2 1 .3 1 .4 1 1.1.8 1.8-.1.4-.7 2.1-1.1 3.1-.1.2-.1.4-.2.5 0 .1-.1.2-.3.2h-1.2zm-4.1 0c-.2 0-.2-.2-.2-.3 0-.1-.1-5.3-.1-6 0-.1 0-.2.1-.2 0 0 .1-.1.2-.1H26c.1 0 .1 0 .2.1s.1.2.1.2c0 .7-.1 5.9-.1 6 0 0 0 .3-.2.3h-1.4zm-4.1 0c-.2 0-.2-.1-.3-.2 0-.1-.1-.3-.2-.5-.4-1-.9-2.6-1.1-3.1-.2-.7-.2-1.5.8-1.8.3-.1.7-.2 1-.3.4-.1.8-.2 1.1-.3h.2c.3 0 .5.2.6.4.4.8.6 1.5.9 2.4v.2s-.1.1-.2.1h-1c-.1 0-.2 0-.2-.1-.2-.5-.3-.9-.5-1.3 0 0-.1-.1-.2-.1h-.1l-.5.2c-.2.1-.3.3-.2.5 0 0 1 2.8 1.3 3.7v.2s-.1.1-.2.1c0-.1-1.2-.1-1.2-.1zm4.7-7.6c-.1 0-.1 0-.2-.1-.4-.3-.8-.7-1.1-1.1 0 0-.1-.1 0-.3.3-.5.8-.8 1.2-1.2h.2c.4.3.8.7 1.2 1.2.1.1.1.2 0 .3-.3.4-.7.8-1.1 1.1-.1.1-.1.1-.2.1z"
      />
    </svg>
  );
};

const ProductDeliveryTerms = ({ position = "default" }) => {
  const { t } = useTranslation();
  return (
    <div
      css={{
        "& > div": {
          display: "flex",
          fontSize: "1.2rem",
          lineHeight: "171%",
          alignItems: "center",
          ...(position !== "default" ? { justifyContent: position } : {}),
          "& > div > svg": {
            height: "3.6rem",
            width: "3.6rem",
          },
        },
      }}
    >
      <div>
        <div css={{ marginRight: "2.7rem" }}>
          <FastDeliverTruck />
        </div>
        <p css={{ display: "block" }}>{t("return-policy")}</p>
      </div>
      <div
        css={{
          marginTop: "2.7rem",
          "& > div:not(:last-of-type)": {
            marginRight: "1rem",
          },
        }}
      >
        <div>
          <PostNL />
        </div>
        <div>
          <IDeal />
        </div>
        <div>
          <Mastercard />
        </div>
        <div>
          <Visa />
        </div>
        <div>
          <AmericanExpress />
        </div>
        <div>
          <GooglePay />
        </div>
        <div>
          <ShopPay />
        </div>
      </div>
    </div>
  );
};

export default ProductDeliveryTerms;
