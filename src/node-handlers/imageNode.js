const nodeMatcher = (contentNode) => {
  return (
    contentNode.paragraph &&
    Array.isArray(contentNode.paragraph.elements) &&
    contentNode.paragraph.elements[0].inlineObjectElement
  );
};

const convertNode = (imageNode, inlineObjects) => {
  const imgId =
    imageNode.paragraph.elements[0].inlineObjectElement.inlineObjectId;
  const imgUrl =
    inlineObjects[imgId].inlineObjectProperties.embeddedObject.imageProperties
      .contentUri;
  const title =
    inlineObjects[imgId].inlineObjectProperties.embeddedObject.title;
  return {
    type: "IMAGE",
    title,
    url: imgUrl,
  };
};

module.exports = { nodeMatcher, convertNode };
