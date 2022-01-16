exports.removeHtmlTags = function (htmlString) {
  if (htmlString === null || htmlString === "") return false;
  else htmlString = htmlString.toString();

  // Regular expression to identify HTML tags in
  // the input htmlStringing. Replacing the identified
  // HTML tag with a null htmlStringing.
  return htmlString.replace(/(<([^>]+)>)/gi, "");
};
