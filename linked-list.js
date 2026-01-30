class Node {
  //   #value;
  //   #nextNode;

  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
    // this.#value = value;
    // this.#nextNode = nextNode;
  }

  //   get value() {
  //     return this.#value;
  //   }

  //   set value(x) {
  //     this.#value = x;
  //   }

  //   get nextNode() {
  //     return this.#nextNode;
  //   }

  //   set nextNode(node) {
  //     this.#nextNode = node;
  //   }
}

class LinkedList {
  #size = 0;
  #firstNode;

  constructor() {
    this.#firstNode = new Node();
    // this.#size = 0;
  }

  size() {
    return this.#size;
  }

  append(value) {
    const newNode = new Node(value);

    if (this.size() === 0) {
      this.#firstNode = newNode;
      this.#size++;
      return;
    }

    let currentNode = this.#firstNode;

    while (currentNode.nextNode !== null) {
      currentNode = currentNode.nextNode;
    }

    currentNode.nextNode = newNode;
    this.#size++;
  }

  prepend(value) {
    const newFirstNode = new Node(value, this.#firstNode);
    // newFirstNode.nextNode = this.#firstNode.nextNode;

    this.#firstNode = newFirstNode;

    this.#size++;
  }

  // how to make size filed private??

  head() {
    if (this.size() === 0) {
      return undefined;
    }

    return this.#firstNode.value;
  }

  tail() {
    if (this.size() === 0) {
      return undefined;
    }

    let currentNode = this.#firstNode;

    while (currentNode.nextNode !== null) {
      currentNode = currentNode.nextNode;
    }

    return currentNode.value;
  }

  at(index) {
    if (!Number.isInteger(index) || index < 0 || index > this.size() - 1) {
      return undefined;
    }

    let currentNode = this.#firstNode;

    for (let i = 0; i < index; i++) {
      currentNode = currentNode.nextNode;
    }

    return currentNode.value;
  }

  // remove the head node from the list and return its value
  pop() {
    if (this.size() === 0) {
      return undefined;
    }

    const returnedNode = this.#firstNode;

    this.#firstNode = this.#firstNode.nextNode;

    this.#size--;
    return returnedNode.value;
  }

  contains(value) {
    if (this.size() === 0) {
      return false;
    }

    let currentNode = this.#firstNode;

    while (currentNode.nextNode !== null) {
      if (currentNode.value === value) {
        return true;
      } else {
        currentNode = currentNode.nextNode;
      }
    }

    return false;
  }

  findIndex(value) {
    if (this.size() === 0) {
      return -1;
    }

    let index = 0;
    let currentNode = this.#firstNode;

    while (currentNode.nextNode !== null) {
      if (currentNode.value === value) {
        return index;
      } else {
        index++;
        currentNode = currentNode.nextNode;
      }
    }

    return -1;
  }

  toString() {
    if (this.size() === 0) {
      return "";
    }

    let string = "";
    let currentNode = this.#firstNode;
    while (currentNode.nextNode !== null) {
      string += `( ${currentNode.value} ) -> `;

      currentNode = currentNode.nextNode;
    }

    string += `( ${currentNode.value} )`;
    return string;
  }

  insertAt(index, ...values) {
    if (!Number.isInteger(index) || index < 0 || index > this.size()) {
      throw new RangeError("Index is out of range!!!");
    }

    if (index === 0) {
      values.reverse().forEach((val) => {
        // const newNode = new Node(val);
        this.prepend(val);
      });
      return;
    } else if (index === this.size()) {
      values.forEach((val) => {
        this.append(val);
      });

      return;
    }

    let currentNode = this.#firstNode;
    for (let i = 0; i < index - 1; i++) {
      currentNode = currentNode.nextNode;
    }

    let endNode = currentNode.nextNode;

    for (let i = 0; i < values.length; i++) {
      const newNode = new Node(values[i]);

      currentNode.nextNode = newNode;
      currentNode = newNode;

      this.#size++;

      if (i === values.length - 1) {
        currentNode.nextNode = endNode;
      }
    }
  }

  removeAt(index) {
    if (!Number.isInteger(index) || index < 0 || index > this.size() - 1) {
      throw new RangeError("Index is out of range!!!");
    }

    if (index === 0) {
      this.#firstNode = this.#firstNode.nextNode;
      this.#size--;
      return;
    }

    let prevNode = this.#firstNode;
    for (let i = 0; i < index - 1; i++) {
      prevNode = prevNode.nextNode;
    }

    if (index === this.size() - 1) {
      prevNode.nextNode = null;
      this.#size--;

      return;
    }

    prevNode.nextNode = prevNode.nextNode.nextNode;
    this.#size--;
  }
}

export { LinkedList };
