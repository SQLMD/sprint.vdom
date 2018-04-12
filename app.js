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
function createElement(node) {
  // Initialize an element that will be returned
  const result = document.createElement(node.type);

  // Iterate over the given node's properties and
  // Add each property as an attribute to the result.
  for (let prop in node.props) {
    result.setAttribute(prop, node.props[prop]);
  }

  // Iterate over the given node's children and
  // append each child as a child element of the result.
  for (let child of node.children) {
    let childNode;
    if (typeof child === "string") {
      childNode = document.createTextNode(child);
    } else {
      childNode = createElement(child);
    }
    result.appendChild(childNode);
  }

  return result;
}

// eslint-disable-next-line no-unused-vars
function changed(node1, node2) {
  return (
    typeof node1 !== typeof node2 ||
    (typeof node1 === "string" && node1 !== node2) ||
    node1.type !== node2.type
  );
}

/**
 * Compare the given nodes, and store the difference. Then, update the target.
 *
 *
 * @param {Com} target the HTMLElement that should be updated
 * @param {*} newNode
 * @param {*} oldNode
 */
// eslint-disable-next-line no-unused-vars
function updateElement(target, newNode, oldNode) {}
