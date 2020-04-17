const { nodeMatcher, convertNode } = require("./imageNode");

const standardImageNode = {
  startIndex: 44,
  endIndex: 46,
  paragraph: {
    elements: [
      {
        startIndex: 44,
        endIndex: 45,
        inlineObjectElement: {
          inlineObjectId: "kix.cp33zvh9dv19",
          textStyle: {},
        },
      },
      {
        startIndex: 45,
        endIndex: 46,
        textRun: { content: "\n", textStyle: {} },
      },
    ],
    paragraphStyle: {
      namedStyleType: "NORMAL_TEXT",
      direction: "LEFT_TO_RIGHT",
    },
  },
};

const inlineObjects = {
  "kix.cp33zvh9dv19": {
    objectId: "kix.cp33zvh9dv19",
    inlineObjectProperties: {
      embeddedObject: {
        imageProperties: {
          contentUri:
            "https://lh6.googleusercontent.com/J8L3IV_ubY5tqScrgkZFHMmPI2urc4OQbMrqOwlXUmm0hDkqAxlMTZmgc3xgKVGGcujxKr4qAesZvPrVWDERyF2YprCaPQBDQnUsLeMKZI9FzWHNetvT0VIWuBmbSkTr856fSBDBs1AgL72Jxg",
          cropProperties: {},
        },
        title: "Ready to boil!",
        embeddedObjectBorder: {
          color: { color: { rgbColor: {} } },
          width: { unit: "PT" },
          dashStyle: "SOLID",
          propertyState: "NOT_RENDERED",
        },
        size: {
          height: { magnitude: 368.65303156146183, unit: "PT" },
          width: { magnitude: 276.375, unit: "PT" },
        },
        marginTop: { magnitude: 9, unit: "PT" },
        marginBottom: { magnitude: 9, unit: "PT" },
        marginRight: { magnitude: 9, unit: "PT" },
        marginLeft: { magnitude: 9, unit: "PT" },
      },
    },
  },
};

describe("matcher", () => {
  test("reports truthy for standard image node", () => {
    expect(nodeMatcher(standardImageNode)).toBeTruthy();
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
  test("returns type, url and title", () => {
    expect(convertNode(standardImageNode, inlineObjects)).toStrictEqual({
      type: "IMAGE",
      title: "Ready to boil!",
      url:
        "https://lh6.googleusercontent.com/J8L3IV_ubY5tqScrgkZFHMmPI2urc4OQbMrqOwlXUmm0hDkqAxlMTZmgc3xgKVGGcujxKr4qAesZvPrVWDERyF2YprCaPQBDQnUsLeMKZI9FzWHNetvT0VIWuBmbSkTr856fSBDBs1AgL72Jxg",
    });
  });
});
