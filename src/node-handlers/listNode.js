const nodeMatcher = (contentNode) => {
  return contentNode.paragraph && contentNode.paragraph.bullet;
};

/**
 *
 * @param {contentNode} listNode - Content node identified to contain a list object
 * @param {[documentBlock]} blocks - Document blocks built by the library earlier in the document
 * @param {listOject} lists - Object of all the lists found from the document, with their respective contents
 */
const convertNode = (listNode, blocks, lists) => {
  const id = listNode.paragraph.bullet.listId;
  if (blocks.find((b) => b && b.type === "LIST" && b.id === id)) return null;

  const correspondingList = lists[id];
  return {
    type: "LIST",
    id,
    items: correspondingList,
  };
};

module.exports = { convertNode, nodeMatcher };
