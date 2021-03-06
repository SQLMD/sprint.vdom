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
/**
 * Returns whether or not the given nodes are :
 *   not the same type OR
 *   not equal strings OR
 *   not the same VDOM.type
 * @param {Object} node1
 * @param {Object} node2
 * @returns Boolean
 */
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
 * @param {HTMLElement} target the HTMLElement that should be updated (in place)
 * @param {Object} newNode a VDOMNode that represents the Virtual DOM in the changed state
 * @param {Object} oldNode a VDOMNode that represents the target HTMLElement (previous state of newNode)
 */
// eslint-disable-next-line no-unused-vars
function updateElement(target, newNode, oldNode) {
  if (typeof newNode === "string") {
    target.innerText = newNode;
    return;
  }

  if (!newNode) {
    target.parentNode.removeChild(target);
    return;
  }
  let x = changed(newNode, oldNode);
  if (changed(newNode, oldNode)) {
    target.parentNode.replaceChild(createElement(newNode), target);
    return;
  }

  if (newNode.props !== oldNode.props) {
    if (oldNode.props) {
      Object.keys(oldNode.props).forEach((name) =>
        target.removeAttribute(name)
      );
    }
    if (newNode.props) {
      Object.keys(newNode.props).forEach((name) =>
        target.setAttribute(name, newNode.props[name])
      );
    }
  }

  if (typeof oldNode === "string") {
    return;
  }

  oldNode.children.forEach((oldNodeChild, i) => {
    updateElement(
      target.childNodes[i],
      newNode.children[i],
      oldNode.children[i]
    );
  });

  for (let i = oldNode.children.length; i < newNode.children.length; i += 1) {
    target.appendChild(createElement(newNode.children[i]));
  }
}
