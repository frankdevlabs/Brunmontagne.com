exports.parseTranslations = function (translations) {
  return translations.reduce(
    (obj, item) => Object.assign(obj, { [item.key]: item.value }),
    {}
  );
};
