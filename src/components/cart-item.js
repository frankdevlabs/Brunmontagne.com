import React from "react"; // eslint-disable-line no-unused-vars
import debounce from "lodash.debounce";
import { StoreContext } from "../context/store-context";
import { formatPrice } from "../utils/format-price";
import { GatsbyImage } from "gatsby-plugin-image";
import { getShopifyImage } from "gatsby-source-shopify";
import DeleteIcon from "../assets/vectors/delete.svg";
import { useTheme } from "@emotion/react";
import mq from "../theme/media-queries";

const NumericInput = ({ onIncrement, onDecrement, disabled, ...props }) => {
  const theme = useTheme();
  return (
    <div css={{ display: "flex" }}>
      <input
        css={{
          background: "transparent",
          color: "white",
          border: "1px white solid",
          padding: "2rem",
          width: "6ch",
        }}
        disabled={disabled}
        type="numeric"
        {...props}
      />
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          "& > button": {
            padding: "0 0.5rem",
            background: theme.colors.SECONDARY_LIGHT,
            color: theme.colors.PRIMARY_LIGHT,
            marginLeft: " 5px",
            borderRadius: "4px",
            transition: "all 0.5s ease",
            "&:hover, &:active": {
              background: theme.colors.PRIMARY_LIGHT,
              color: theme.colors.SECONDARY_LIGHT,
            },
          },
        }}
      >
        <button
          disabled={disabled}
          aria-label="Increment"
          onClick={onIncrement}
        >
          <span>+</span>
        </button>
        <button
          disabled={disabled}
          aria-label="Decrement"
          onClick={onDecrement}
        >
          <span>-</span>
        </button>
      </div>
    </div>
  );
};

const RemoveButton = ({ handleRemove }) => {
  const theme = useTheme();
  return (
    <button
      css={{
        color: theme.colors.SECONDARY_LIGHT,
        transition: "all 0.5s ease",

        "&:hover": {
          color: theme.colors.TERTIARY,
        },
      }}
      onClick={handleRemove}
    >
      <DeleteIcon />
    </button>
  );
};

const CartItem = ({ item }) => {
  const { removeLineItem, checkout, updateLineItem, loading } =
    React.useContext(StoreContext);
  const [quantity, setQuantity] = React.useState(item.quantity);

  const variantImage = {
    ...item.variant.image,
    originalSrc: item.variant.image.src,
  };
  const price = formatPrice(
    item.variant.priceV2.currencyCode,
    Number(item.variant.priceV2.amount)
  );

  const handleRemove = () => {
    removeLineItem(checkout.id, item.id);
  };

  const uli = debounce(
    (value) => updateLineItem(checkout.id, item.id, value),
    300
  );
  // eslint-disable-next-line
  const debouncedUli = React.useCallback((value) => uli(value), [])

  const handleQuantityChange = (value) => {
    if (value !== "" && Number(value) < 1) {
      return;
    }
    setQuantity(value);
    if (Number(value) >= 1) {
      debouncedUli(value);
    }
  };

  function doIncrement() {
    handleQuantityChange(Number(quantity || 0) + 1);
  }

  function doDecrement() {
    handleQuantityChange(Number(quantity || 0) - 1);
  }

  const image = React.useMemo(
    () =>
      getShopifyImage({
        image: variantImage,
        layout: "constrained",
        crop: "contain",
        width: 160,
        height: 160,
      }),
    [variantImage.src]
  );

  return (
    <div
      css={{
        marginRight: "auto",
        height: "30%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "90rem",

        "& > *:not(:last-of-type)": {
          marginRight: "4rem",
          [mq("md")]: {
            marginRight: "2rem",
          },
        },
      }}
    >
      <div css={{ maxHeight: "160px" }}>
        {image && (
          <GatsbyImage
            key={variantImage.src}
            image={image}
            alt={variantImage.altText ?? item.variant.title}
          />
        )}
      </div>
      <div
        css={{
          minWidth: "40rem",
          [mq("lg")]: {
            minWidth: "25rem",
          },
          [mq("sm")]: {
            minWidth: "15rem",
          },
        }}
      >
        <h4>{item.title}</h4>
        <div css={{ fontSize: "1.4rem" }}>
          {item.variant.title === "Default Title" ? "" : item.variant.title}
        </div>
        <div css={{ display: "flex" }}>
          <div
            css={{
              display: "none",
              visibility: "hidden",
              [mq("md")]: {
                marginTop: "5px",
                display: "block",
                visibility: "visible",
              },
            }}
          >
            <RemoveButton />
          </div>
          <div
            css={{
              display: "none",
              visibility: "hidden",
              [mq("sm")]: {
                marginTop: "5px",
                marginLeft: "1rem",
                display: "block",
                visibility: "visible",
              },
            }}
          >
            <NumericInput
              disabled={loading}
              value={quantity}
              aria-label="Quantity"
              onIncrement={doIncrement}
              onDecrement={doDecrement}
              onChange={(e) => handleQuantityChange(e.currentTarget.value)}
            />
          </div>
        </div>
      </div>
      <div
        css={{
          display: "flex",
          alignItems: "center",
          [mq("md")]: {
            marginRight: "0 !important",
          },
        }}
      >
        <div css={{ marginRight: "2rem" }}>
          {price} <span css={{ fontSize: "1.4rem" }}>x</span>
        </div>
        <div
          css={{
            [mq("sm")]: {
              display: "none",
              visibility: "hidden",
            },
          }}
        >
          <NumericInput
            disabled={loading}
            value={quantity}
            aria-label="Quantity"
            onIncrement={doIncrement}
            onDecrement={doDecrement}
            onChange={(e) => handleQuantityChange(e.currentTarget.value)}
          />
        </div>
      </div>
      <div
        css={{
          [mq("md")]: {
            display: "none",
            visibility: "hidden",
          },
        }}
      >
        <RemoveButton handleRemove={handleRemove} />
      </div>
    </div>
  );
};

export default CartItem;
