/* eslint-disable no-unused-expressions */
const { expect } = chai;

describe("cc4-sprint.vdom", () => {
  let aProps, divVDOMObject, spanVDOMObject, textString, seedVDOMObject;

  beforeEach(() => {
    // here are some test elements (aka seed) to help you get started
    aProps = { href: "https://codechrysalis.io" };
    divVDOMObject = createVDOM(
      "div",
      null,
      "text node",
      createVDOM("img", null, "text node")
    );
    spanVDOMObject = createVDOM("span");
    textString = "Click Me";
    seedVDOMObject = createVDOM(
      "a",
      aProps,
      divVDOMObject,
      spanVDOMObject,
      textString
    );
  });

  describe("vDOM implementation", () => {
    // we have some spec titles to help you get started

    describe("createVDOM function", () => {
      it("should have a function called 'createVDOM'", () => {
        expect(createVDOM).to.be.a("function");
      });

      it("should return an object with type, props, and children properties", () => {
        expect(spanVDOMObject)
          .to.be.an("object")
          .that.has.all.keys("type", "props", "children");
      });

      it("should return a string for type", () => {
        expect(spanVDOMObject.type).to.be.a("string");
      });

      it("should return an array of children objects", () => {
        expect(spanVDOMObject.children).to.be.an("array");
      });

      it("should return a object of props", () => {
        expect(spanVDOMObject.props).to.be.an("object");
      });

      it("should return an array of grandchildren objects", () => {
        const grandChildren = seedVDOMObject.children[0].children;

        expect(grandChildren).to.be.an("array");
      });

      it("should return an array of great-grandchildren objects", () => {
        const greatGrandChildren =
          seedVDOMObject.children[0].children[1].children;

        expect(greatGrandChildren).to.be.an("array");
      });

      it("should have a string value to represent a text node when given a string (aka text element)", () => {
        const textNode = divVDOMObject.children[0];
        expect(textNode).to.be.a("string");
      });
    });

    describe("createElement function", () => {
      let seedHTMLElement, spanHTMLElement, divHTMLElement;

      beforeEach(() => {
        // create your own seed elements or use the ones created above!
        seedHTMLElement = createElement(seedVDOMObject);
        spanHTMLElement = createElement(spanVDOMObject);
        divHTMLElement = createElement(divVDOMObject);
      });

      it("should have a function called createElement", () => {
        expect(createElement).to.be.a("function");
      });

      it("should return an HTML Element", () => {
        expect(seedHTMLElement.tagName).to.equal("A");
      });

      it("should convert childNodes to HTML", () => {
        /* Clues:
        |* child elements should NOT include text nodes
        |* BUT child nodes SHOULD include text nodes
        |* This may be important for testing...
        |* ...ok, it obviously is, so take this clue into account.
        */
        expect(divHTMLElement.children[0] instanceof HTMLElement).to.be.true;
      });

      it("should convert grand childNodes to HTML", () => {
        expect(seedHTMLElement.children[0].children[0] instanceof HTMLElement)
          .to.be.true;
      });

      it("should convert props to attributes", () => {
        for (let prop in seedVDOMObject.props) {
          expect(prop in seedHTMLElement.attributes).to.be.true;
        }
      });
    });

    describe("updateElement function", () => {
      function resetParent() {
        target.innerHTML = "";
        const childA = document.createElement("a");
        const childP = document.createElement("p");
        const grandchildFont = document.createElement("font");
        childP.appendChild(grandchildFont);
        target.append(childA, childP);
      }

      beforeEach(() => {
        resetParent();
      });

      let target = document.getElementById("tes-div");
      let oldNode = createVDOM(
        "div",
        { id: "tes-div", style: "display: none;" },
        createVDOM("a"),
        createVDOM("p", null, createVDOM("font"))
      );

      it("updateElement should be a function", () => {
        expect(updateElement).to.be.a("function");
      });

      it("should update target element with new nodes", () => {
        let newNodeAddToEnd = createVDOM(
          "div",
          {
            id: "tes-div",
            style: "display: none;",
          },
          createVDOM("a"),
          createVDOM("p", null, createVDOM("font")),
          createVDOM("span")
        );

        updateElement(target, newNodeAddToEnd, oldNode);

        expect(target.childNodes.length).to.equal(3);
        expect(target.childNodes[0].nodeName).to.equal("A");
        expect(target.childNodes[1].nodeName).to.equal("P");
        expect(target.childNodes[2].nodeName).to.equal("SPAN");
      });

      it("should update target element with new nodes", () => {
        let newNodeAddToBeginning = createVDOM(
          "div",
          {
            id: "tes-div",
            style: "display: none;",
          },
          createVDOM("span"),
          createVDOM("a"),
          createVDOM("p", null, createVDOM("font"))
        );
        updateElement(target, newNodeAddToBeginning, oldNode);

        expect(target.childNodes.length).to.equal(3);

        expect(target.childNodes[0].nodeName).to.equal("SPAN");
        expect(target.childNodes[1].nodeName).to.equal("A");
        expect(target.childNodes[2].nodeName).to.equal("P");
      });

      it("should delete old nodes", () => {
        let nodeRemoveFromMiddle = createVDOM(
          "div",
          { id: "tes-div", style: "display: none;" },
          createVDOM("p", null, createVDOM("font"))
        );

        updateElement(target, nodeRemoveFromMiddle, oldNode);

        expect(target.childNodes.length).to.equal(1);
        expect(target.childNodes[0].nodeName).to.equal("P");
      });

      it("should delete old nodes", () => {
        let nodeRemoveFromMiddle = createVDOM(
          "div",
          { id: "tes-div", style: "display: none;" },
          createVDOM("p", null, createVDOM("font"))
        );

        updateElement(target, nodeRemoveFromMiddle, oldNode);

        expect(target.childNodes.length).to.equal(1);
        expect(target.childNodes[0].nodeName).to.equal("P");
      });

      it("should update target element with new nodes and texts", () => {
        let newNodeAddText = createVDOM(
          "div",
          {
            id: "tes-div",
            style: "display: none;",
          },
          createVDOM("a"),
          "Hello World",
          createVDOM("p", null, createVDOM("font"))
        );

        updateElement(target, newNodeAddText, oldNode);

        expect(target.childNodes.length).to.equal(3);
        expect(target.childNodes[0].nodeName).to.equal("A");
        expect(target.childNodes[1].textContent).to.equal("Hello World");
        expect(target.childNodes[2].nodeName).to.equal("P");
      });

      it("should update target element with new grand children nodes", () => {
        let newGrandChildrenNodes = createVDOM(
          "div",
          {
            id: "tes-div",
            style: "display: none;",
          },
          createVDOM("a"),
          createVDOM(
            "p",
            null,
            createVDOM("font"),
            createVDOM("a", null, "Bar")
          )
        );

        updateElement(target, newGrandChildrenNodes, oldNode);

        expect(target.childNodes.length).to.equal(2);
        expect(target.childNodes[0].nodeName).to.equal("A");
        expect(target.childNodes[1].nodeName).to.equal("P");
        expect(target.childNodes[1].childNodes.length).to.equal(2);
        expect(target.childNodes[1].childNodes[0].nodeName).to.equal("FONT");
        expect(target.childNodes[1].childNodes[1].nodeName).to.equal("A");
        expect(target.childNodes[1].childNodes[1].childNodes.length).to.equal(
          1
        );
        expect(
          target.childNodes[1].childNodes[1].childNodes[0].textContent
        ).to.equal("Bar");
      });

      it.only("should update target element with new text for grand child node", () => {
        let newTextToGrandChildNode = createVDOM(
          "div",
          {
            id: "tes-div",
            style: "display: none;",
          },
          createVDOM("a"),
          createVDOM("p", null, createVDOM("font", null, "Foo"))
        );

        updateElement(target, newTextToGrandChildNode, oldNode);

        expect(target.childNodes[1].childNodes[0].nodeName).to.equal("FONT");
        expect(target.childNodes[1].childNodes[0].childNodes.length).to.equal(
          1
        );
        expect(
          target.childNodes[1].childNodes[0].childNodes[0].textContent
        ).to.equal("Foo");
      });

      it("should update attributes of target element", () => {
        let changeAttributesAddToTarget = createVDOM(
          "div",
          {
            id: "tes-div",
            style: "display: block;",
          },
          createVDOM("a"),
          createVDOM("p", null, createVDOM("font"))
        );

        updateElement(target, changeAttributesAddToTarget, oldNode);

        let newTarget = document.getElementById("tes-div");

        expect(newTarget.attributes.length).to.equal(2);
        expect(newTarget.getAttribute("id")).to.equal("tes-div");
        expect(newTarget.getAttribute("style")).to.equal("display: block;");
      });

      it("should update attributes of children of target element", () => {
        let newAttributesAddToChild = createVDOM(
          "div",
          {
            id: "tes-div",
            style: "display: none;",
          },
          createVDOM("a"),
          createVDOM("p", { class: "baz" }, createVDOM("font"))
        );

        updateElement(target, newAttributesAddToChild, oldNode);

        expect(target.childNodes.length).to.equal(2);
        expect(target.childNodes[0].attributes.length).to.equal(0);
        expect(target.childNodes[1].attributes.length).to.equal(1);
        expect(target.childNodes[1].getAttribute("class")).to.equal("baz");
      });
    });
  });
});
