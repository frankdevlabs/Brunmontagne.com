import React from "react"
import NavMain from "./main"
import { usePageContext } from "../../../pageContext"

const Navigation = ({ sticky }) => {
  const { lang } = usePageContext()
  const items = {
    nl: [
      {
        content: "Home",
        to: "/nl/",
        subMenu: [],
      },
      {
        content: "Collectie",
        to: "/nl/collection/",
        subMenu: [
          {
            content: "Horloges",
            to: "/nl/collection#watches",
            subMenu: [],
          },
          {
            content: "Banden",
            to: "/nl/collection#watch-straps",
            subMenu: [],
          },
        ],
      },
      {
        content: "Lookbook",
        to: "/nl/lookbook/",
        subMenu: [],
      },
      {
        content: "Het verhaal",
        to: "/nl/about-us/",
        subMenu: [],
      },

      {
        content: "Contact",
        to: "/nl/contact/",
        subMenu: [],
      },
    ],
    en: [
      {
        content: "Home",
        to: "/en/",
        subMenu: [],
      },
      {
        content: "Collection",
        to: "/en/collection/",
        subMenu: [
          {
            content: "Watches",
            to: "/en/collection#watches",
            subMenu: [],
          },
          {
            content: "Watch straps",
            to: "/en/collection#watch-straps",
            subMenu: [],
          },
        ],
      },
      {
        content: "Lookbook",
        to: "/en/lookbook/",
        subMenu: [],
      },
      {
        content: "The story",
        to: "/en/about-us/",
        subMenu: [],
      },
      {
        content: "Contact",
        to: "/en/contact/",
        subMenu: [],
      },
    ],
  }

  return <NavMain sticky={sticky} lang={lang} items={items[lang]} />
}

export default Navigation
