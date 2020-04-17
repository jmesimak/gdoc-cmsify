const nodeMatcher = (contentNode) => {
  return (
    contentNode.paragraph &&
    contentNode.paragraph.paragraphStyle.namedStyleType &&
    contentNode.paragraph.elements[0].textRun
  );
};

const convertNode = (textNode) => {
  const text = textNode.paragraph.elements[0].textRun.content.trim();
  if (text.length === 0) return null;
  return {
    type: "TEXT",
    namedStyleType: textNode.paragraph.paragraphStyle.namedStyleType,
    text,
  };
};

module.exports = { nodeMatcher, convertNode };
