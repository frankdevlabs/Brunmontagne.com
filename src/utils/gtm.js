export const productCardData = (shopifyProduct, listName, listIndex) => {
  const {
    title,
    vendor,
    productType,
    priceRangeV2: {
      minVariantPrice: { amount: price },
    },
  } = shopifyProduct;
  const { sku, title: variantTitle } = shopifyProduct.variants[0];
  return {
    item_name: title,
    item_id: sku,
    item_variant: variantTitle,
    item_brand: vendor,
    item_category: productType,
    item_list_name: listName,
    index: listIndex,
    quantity: 1,
    price: price,
  };
};

export const getOriginProductList = (sku, productMetaList) => {
  return (
    productMetaList[sku] || {
      category: "unknown",
      name: "n/a",
      index: 0,
    }
  );
};

const getTotalPrice = (GAProducts) =>
  GAProducts.reduce((acc, cur) => {
    return acc + parseInt(cur.price) * cur.quantity;
  }, 0);

const shopifyProductToGAProduct = (shopifyProducts, originList = null) => {
  return shopifyProducts.map((p) => {
    return {
      item_name: p.title,
      item_id: p.productVariant.sku,
      item_variant: p.productVariant.title,
      item_brand: "Brunmontagne",
      item_category: p.productType,
      ...(originList
        ? {
            item_list_name: originList.name, // If associated with a list selection.
            item_list_id: originList.name, // If associated with a list selection.
            index: originList.index, // If associated with a list selection.
          }
        : {}),
      quantity: 1,
      price: p.productVariant.price,
    };
  });
};

const GAProduct2FacebookProduct = (GAProduct) => {
  return {
    content_ids: [GAProduct.item_id],
    content_name: GAProduct.item_name + " " + GAProduct.item_variant,
    content_type: "product",
    contents: [{ id: GAProduct.item_id, quantity: GAProduct.quantity }],
    currency: "EUR",
    value: GAProduct.price * GAProduct.quantity,
  };
};

const shopifyCheckoutItems2GAProducts = (
  shopifyCheckoutItems,
  originList = null
) => {
  return shopifyCheckoutItems.map((s) => {
    return {
      item_name: s.title,
      item_id: s.variant.sku,
      item_variant: s.variant.title,
      item_brand: "Brunmontagne",
      ...(originList
        ? {
            item_list_name: originList.name, // If associated with a list selection.
            item_list_id: originList.name, // If associated with a list selection.
            index: originList.index, // If associated with a list selection.
          }
        : {}),
      quantity: s.quantity,
      price: s.variant.price,
    };
  });
};

export const ADD_TO_CART_EVENT = (
  shopifyProduct,
  originList,
  wantsPersonalisation
) => {
  const GAProducts = shopifyProductToGAProduct([shopifyProduct], originList);
  const totalPrice = getTotalPrice(GAProducts);
  /*
    Measure when a product is added to a shopping cart.
    event is predefined by GA4. More info: https://support.google.com/analytics/answer/9268036?hl=en&ref_topic=9756175
  */
  // eslint-disable-next-line no-undef
  dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
  // eslint-disable-next-line no-undef
  dataLayer.push({
    event: "add_to_cart",
    ecommerce: {
      currency: "EUR",
      value: totalPrice,
      items: GAProducts,
    },
  });
  if (wantsPersonalisation) {
    const facebookProducts = GAProduct2FacebookProduct(GAProducts[0]);
    // eslint-disable-next-line no-undef
    dataLayer.push({ pixel: null }); // Clear the previous ecommerce object.
    // eslint-disable-next-line no-undef
    dataLayer.push({
      event: "facebookEvent",
      pixel: {
        payload: facebookProducts,
        event: "AddToCart",
      },
    });
  }
};

export const REMOVE_FROM_CART_EVENT = (
  shopifyCheckoutItem,
  originList,
  wantsPersonalisation
) => {
  const GAProducts = shopifyCheckoutItems2GAProducts(
    [shopifyCheckoutItem],
    originList
  );
  const totalPrice = getTotalPrice(GAProducts);
  // return GAProduct;

  /*
     Measure the removal of a product from a shopping cart.
     event is defined by GA4. More info: https://support.google.com/analytics/answer/9268036?hl=en&ref_topic=9756175
  */
  // eslint-disable-next-line no-undef
  dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
  // eslint-disable-next-line no-undef
  dataLayer.push({
    event: "remove_from_cart",
    ecommerce: {
      currency: "EUR",
      value: totalPrice,
      items: GAProducts,
    },
  });

  if (wantsPersonalisation) {
    const facebookProducts = GAProduct2FacebookProduct(GAProduct[0]);
    // eslint-disable-next-line no-undef
    dataLayer.push({ pixel: null }); // Clear the previous ecommerce object.
    // eslint-disable-next-line no-undef
    dataLayer.push({
      event: "facebookEvent",
      pixel: {
        payload: facebookProducts,
        event: "RemovedFromCart",
      },
    });
  }
};

export const VIEW_CART_EVENT = (shopifyCheckoutItems, wantsPersonalisation) => {
  const GAProducts = shopifyCheckoutItems2GAProducts(shopifyCheckoutItems);
  const totalPrice = getTotalPrice(GAProducts);
  // return GAProduct;

  /*
     Measure view of a shopping cart.
     event is defined by GA4. More info: https://support.google.com/analytics/answer/9268036?hl=en&ref_topic=9756175
  */
  // eslint-disable-next-line no-undef
  dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
  // eslint-disable-next-line no-undef
  dataLayer.push({
    event: "view_cart",
    ecommerce: {
      currency: "EUR",
      value: totalPrice,
      items: GAProducts,
    },
  });

  if (wantsPersonalisation) {
    // `TODO: Implement Facebook 'view_cart' event
  }
};

export const BEGIN_CHECKOUT_EVENT = (
  shopifyCheckoutItems,
  wantsPersonalisation
) => {
  const GAProducts = shopifyCheckoutItems2GAProducts(shopifyCheckoutItems);
  const totalPrice = getTotalPrice(GAProducts);
  // return GAProduct;

  /*
     Measure clicking the 'checkout' button.
     event is defined by GA4. More info: https://support.google.com/analytics/answer/9268036?hl=en&ref_topic=9756175
  */
  // eslint-disable-next-line no-undef
  dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
  // eslint-disable-next-line no-undef
  dataLayer.push({
    event: "begin_checkout",
    ecommerce: {
      currency: "EUR",
      value: totalPrice,
      items: GAProducts,
    },
  });

  if (wantsPersonalisation) {
    // `TODO: Implement Facebook 'begin_checkout' event
  }
};
