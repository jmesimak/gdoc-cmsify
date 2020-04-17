const { nodeMatcher, convertNode } = require("./listNode");

const standardListNode = {
  startIndex: 395,
  endIndex: 451,
  paragraph: {
    elements: [
      {
        startIndex: 395,
        endIndex: 451,
        textRun: {
          content: "100g 00 flour, 1 egg per portion (easily serves 1.5ppl)\n",
          textStyle: {},
        },
      },
    ],
    paragraphStyle: {
      namedStyleType: "NORMAL_TEXT",
      direction: "LEFT_TO_RIGHT",
      indentFirstLine: { magnitude: 18, unit: "PT" },
      indentStart: { magnitude: 36, unit: "PT" },
    },
    bullet: {
      listId: "kix.rp3q508jp6ct",
      textStyle: { underline: false },
    },
  },
};

describe("matcher", () => {
  test("reports truthy for standard list node", () => {
    expect(nodeMatcher(standardListNode)).toBeTruthy();
  });

  test("reports falsy for standard text node", () => {
    const node = {
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

    expect(nodeMatcher(node)).toBeFalsy();
  });
});

describe("converter", () => {
  describe("when list item is first in list", () => {
    test("returns a content block containing the list with all its items", () => {
      expect(
        convertNode(standardListNode, [], {
          "kix.rp3q508jp6ct": ["First bullet", "Second bullet", "Third bullet"],
        })
      ).toStrictEqual({
        type: "LIST",
        id: "kix.rp3q508jp6ct",
        items: ["First bullet", "Second bullet", "Third bullet"],
      });
    });
  });
  describe("when list has already been processed", () => {
    test("returns null", () => {
      expect(
        convertNode(
          standardListNode,
          [
            {
              type: "LIST",
              id: "kix.rp3q508jp6ct",
            },
          ],
          []
        )
      ).toBe(null);
    });
  });
});
