const { getAuth } = require("./services/googleAuth");
const { fetchDoc } = require("./services/googleDoc");

const textNode = require("./node-handlers/textNode");
const listNode = require("./node-handlers/listNode");
const imageNode = require("./node-handlers/imageNode");

const auth = getAuth();

const matchers = [
  { matcher: textNode.nodeMatcher, type: "TEXT" },
  { matcher: listNode.nodeMatcher, type: "LIST" },
  { matcher: imageNode.nodeMatcher, type: "IMAGE" },
];

const converters = {
  TEXT: textNode.convertNode,
  LIST: listNode.convertNode,
  IMAGE: imageNode.convertNode,
};

const constructLists = (content) => {
  const listElements = content.filter((block) => {
    return block.paragraph && block.paragraph.bullet;
  });

  const listGroup = listElements.reduce((memo, cur) => {
    const id = cur.paragraph.bullet.listId;
    const text = cur.paragraph.elements[0].textRun.content;

    if (!memo[id]) memo[id] = [];
    memo[id].push(text.trim());
    return memo;
  }, {});

  return listGroup;
};

module.exports = {
  gdocJsonify: async (id, config) => {
    const doc = await fetchDoc(id, auth);
    const contentArray = doc.data.body.content;

    const lists = constructLists(contentArray);

    const contentBlocks = contentArray.reduce((blocks, contentNode) => {
      const matched = matchers.find(({ matcher }) => matcher(contentNode));
      if (!matched) return blocks;

      switch (matched.type) {
        case "TEXT":
          return [...blocks, converters.TEXT(contentNode)];
        case "LIST":
          return [...blocks, converters.LIST(contentNode, blocks, lists)];
        case "IMAGE":
          return [
            ...blocks,
            converters.IMAGE(contentNode, doc.data.inlineObjects),
          ];
      }
    }, []);

    return contentBlocks.filter((block) => block);
  },
};
