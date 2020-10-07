import React from "react"
import Img from "gatsby-image"
import ExternalLink from "../ExternalLink"
import Link from "../Link"
import Dropdown from "../Dropdown"
import { useTranslation } from "react-i18next"

const LookbookItem = ({ node }) => {
  const { t } = useTranslation("translation")

  return (
    <div key={node.id} className="lookbook__gallery-item">
      <Img
        className="lookbook__gallery-image"
        fluid={node.localFile.childImageSharp.fluid}
        alt="person writing in a notebook beside by an iPad, laptop, printed photos, spectacles, and a cup of coffee on a saucer"
      />
      <div className="lookbook__overlay">
        <div className="lookbook__overlay-inner">
          <div className="lookbook__overlay-inner-top">
            <ExternalLink to={node.permalink} border={true}>
              {t("lookbook.viewIG")}
            </ExternalLink>
            <div className="lookbook__meta">
              <span className="lookbook__meta-item">
                <svg className="lookbook__meta-icon">
                  <use xlinkHref="/svg/main.svg#heart"></use>
                </svg>
                {node.likes}
              </span>
              <span className="lookbook__meta-item">
                <svg className="lookbook__meta-icon">
                  <use xlinkHref="/svg/main.svg#comment"></use>
                </svg>
                {node.comments}
              </span>
            </div>
          </div>
          <div className="lookbook__overlay-inner-middle">
            <blockquote className="lookbook__caption">
              {node.caption}
            </blockquote>
          </div>
          <div className="lookbook__overlay-inner-bottom">
            {node.linkedProducts && node.linkedProducts.length === 1 ? (
              <>
                <span className="lookbook__product-name">
                  {node.linkedProducts[0].data.name}
                </span>
                <span className="lookbook__at"> @ </span>
                <svg className="lookbook__meta-icon">
                  <use xlinkHref="/svg/main.svg#camera"></use>
                </svg>
                <Link
                  style={{ marginLeft: "1rem" }}
                  className="link link-primary link__border"
                  to={`/products/${node.linkedProducts[0].uid}`}
                >
                  {t("lookbook.viewProduct")}
                </Link>
              </>
            ) : node.linkedProducts && node.linkedProducts.length > 1 ? (
              <div className="lookbook__product-dropdown">
                <Dropdown
                  small
                  activeOption={
                    <span>
                      <svg className="lookbook__meta-icon">
                        <use xlinkHref="/svg/main.svg#watch"></use>
                      </svg>{" "}
                      {node.linkedProducts.length}
                    </span>
                  }
                >
                  {node.linkedProducts.map(product => {
                    return (
                      <li key={product.data.name}>
                        {product.data.name}
                        <Link
                          style={{ marginLeft: "1rem" }}
                          className="link link-primary link__border"
                          to={`/products/${product.uid}`}
                        >
                          {t("lookbook.viewProduct")}
                        </Link>
                      </li>
                    )
                  })}
                </Dropdown>
                <span className="lookbook__at"> @ </span>
                <svg className="lookbook__meta-icon">
                  <use xlinkHref="/svg/main.svg#camera"></use>
                </svg>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LookbookItem