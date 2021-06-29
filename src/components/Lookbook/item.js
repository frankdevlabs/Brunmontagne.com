import React from "react"
import { GatsbyImage } from "gatsby-plugin-image";
import Dropdown from "../Dropdown"
import ExternalLink from "../ExternalLink"
import Link from "../Link"
import { useTranslation } from "react-i18next"
import * as styles from "../../scss/components/modules/lookbook.module.scss"

const LookbookItem = ({ node }) => {
  const { t } = useTranslation("translation")
  return (
    <div key={node.id} className={styles.lookbook__galleryItem}>
      <GatsbyImage
        image={node.localFile.childImageSharp.gatsbyImageData}
        className={styles.lookbook__galleryImage}
        objectPosition="50% 50%"
        alt={node.caption || node.likes} />
      <div className={styles.lookbook__overlay}>
        <div className={styles.lookbook__overlayInner}>
          <div className={styles.lookbook__overlayInnerTop}>
            {node.linkedProducts && node.linkedProducts.length === 1 ? (
              <>
                <span className={styles.lookbook__productName}>
                  {node.linkedProducts[0].data.name}
                </span>
                <span className={styles.lookbook__at}> @ </span>
                <svg className={styles.lookbook__metaIcon}>
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
              <div>
                <Dropdown
                  small
                  activeOption={
                    <span>
                      <svg className={styles.lookbook__metaIcon}>
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
                <span className={styles.lookbook__at}> @ </span>
                <svg className={styles.lookbook__metaIcon}>
                  <use xlinkHref="/svg/main.svg#camera"></use>
                </svg>
              </div>
            ) : null}
          </div>
          <div className={styles.lookbook__overlayInnerMiddle}>
            <blockquote className={styles.lookbook__caption}>
              {node.caption}
            </blockquote>
          </div>
          <div className={styles.lookbook__overlayInnerBottom}>
            <ExternalLink to={node.permalink} border={true}>
              {t("lookbook.viewIG")}
            </ExternalLink>
            <div>
              <span className={styles.lookbook__metaItem}>
                <svg className={styles.lookbook__metaIcon}>
                  <use xlinkHref="/svg/main.svg#heart"></use>
                </svg>
                {node.likes}
              </span>
              <span className={styles.lookbook__metaItem}>
                <svg className={styles.lookbook__metaIcon}>
                  <use xlinkHref="/svg/main.svg#comment"></use>
                </svg>
                {node.comments}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LookbookItem
