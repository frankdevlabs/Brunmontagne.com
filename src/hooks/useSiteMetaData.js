import { useStaticQuery, graphql } from "gatsby"

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
            title
            description
            supportedLanguages
          }
        }
      }
    `
  )
  return site.siteMetadata
}

export default useSiteMetadata
