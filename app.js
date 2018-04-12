/**
 * Create and return a virtual DOM object from the given type, properties, and children.
 * @param {String} type the name of the HTMLElement
 * @param {Object} props an object of element attributes
 * @param {String|Object} children an array of Strings or VDOM objects that are children of this HTMLElement.
 * @returns {Object}
 */
// eslint-disable-next-line no-unused-vars
function createVDOM(type, props = {}, ...children) {
  //Initialize result
  const result = {
    type,
    props,
    children: [],
  };
  //traverse the children
  //add each child to this result's children
  for (let child of children) {
    result.children.push(child);
  }

  return result;
}

/**
 * Create and returns an HTML Element given a VDOM object
 * @param {Object} node
 * @returns {Object} HTMLElement
 */
// eslint-disable-next-line no-unused-vars
function createElement(node) {}

// eslint-disable-next-line no-unused-vars
function changed(node1, node2) {
  return (
    typeof node1 !== typeof node2 ||
    (typeof node1 === "string" && node1 !== node2) ||
    node1.type !== node2.type
  );
}

// eslint-disable-next-line no-unused-vars
function updateElement(target, newNode, oldNode) {}
