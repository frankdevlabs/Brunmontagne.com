exports.TRANSLATE_BY_RESOURCE_ID = `
query TRANSLATE_BY_RESOURCE_ID($resourceId: ID!, $locale: String = "en") {
  translatableResource(resourceId: $resourceId ) {
        resourceId
        translatableContent {
          key
          value
          digest
          locale
        }
        translations(locale: $locale) {
          locale
          key
          value
        }
      }
    }
`;
