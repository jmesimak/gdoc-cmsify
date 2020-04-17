const { nodeMatcher, convertNode } = require("./textNode");

const standardTextNode = {
  startIndex: 47,
  endIndex: 236,
  paragraph: {
    elements: [
      {
        startIndex: 47,
        endIndex: 236,
        textRun: {
          content:
            "You might think that making pasta from scratch is hard, well you’re wrong. It is pretty easy, and I’ll give you a recipe right below. It is also something that your kids can help you with.\n",
          textStyle: {},
        },
      },
    ],
    paragraphStyle: {
      namedStyleType: "NORMAL_TEXT",
      direction: "LEFT_TO_RIGHT",
    },
  },
};

describe("matcher", () => {
  test("reports truthy for standard text node", () => {
    expect(nodeMatcher(standardTextNode)).toBeTruthy();
  });

  test("reports falsy for standard image node", () => {
    const node = {
      startIndex: 74,
      endIndex: 76,
      paragraph: {
        elements: [
          {
            startIndex: 74,
            endIndex: 75,
            inlineObjectElement: {
              inlineObjectId: "kix.mtk82nwqb6dt",
              textStyle: {},
            },
          },
          {
            startIndex: 75,
            endIndex: 76,
            textRun: { content: "\n", textStyle: {} },
          },
        ],
        paragraphStyle: {
          namedStyleType: "NORMAL_TEXT",
          direction: "LEFT_TO_RIGHT",
        },
      },
    };

    expect(nodeMatcher(node)).toBeFalsy();
  });
});

describe("converter", () => {
  test("returns text, namedStyleType and type for a standard text node", () => {
    expect(convertNode(standardTextNode)).toStrictEqual({
      type: "TEXT",
      namedStyleType: "NORMAL_TEXT",
      text:
        "You might think that making pasta from scratch is hard, well you’re wrong. It is pretty easy, and I’ll give you a recipe right below. It is also something that your kids can help you with.",
    });
  });
});
