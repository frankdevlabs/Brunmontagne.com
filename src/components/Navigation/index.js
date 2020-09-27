import React from "react"
import NavMain from "./main"
import { usePageContext } from "../../../pageContext"

export default () => {
  const { lang } = usePageContext()
  const items = {
    nl: [
      {
        content: "Home",
        to: "/",
        subMenu: [],
      },
      {
        content: "Collectie",
        to: "/collectie",
        subMenu: [
          {
            content: "Horloges",
            to: "/product-categorie/horloges",
            subMenu: [],
          },
          {
            content: "Pre-orders",
            to: "/product-categorie/pre-orders",
            subMenu: [],
          },
          {
            content: "Banden",
            to: "/product-categorie/horlogebanden",
            subMenu: [],
          },
        ],
      },
      {
        content: "Lookbook",
        to: "/lookbook",
        subMenu: [],
      },
      {
        content: "Het verhaal",
        to: "/about-us",
        subMenu: [],
      },

      {
        content: "Contact",
        to: "/contact",
        subMenu: [],
      },
    ],
    en: [
      {
        content: "Home",
        to: "/en",
        subMenu: [],
      },
      {
        content: "Collection",
        to: "/en/collection",
        subMenu: [
          {
            content: "Watches",
            to: "/en/product-category/watches",
            subMenu: [],
          },
          {
            content: "Pre-orders",
            to: "/en/product-category/pre-orders",
            subMenu: [],
          },
          {
            content: "Watch straps",
            to: "/en/product-category/watch-straps",
            subMenu: [],
          },
        ],
      },
      {
        content: "Lookbook",
        to: "/en/lookbook",
        subMenu: [],
      },
      {
        content: "The story",
        to: "/en/about-us",
        subMenu: [],
      },
      {
        content: "Contact",
        to: "/en/contact",
        subMenu: [],
      },
    ],
  }

  return <NavMain lang={lang} items={items[lang]} />
}
