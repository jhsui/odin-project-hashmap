import { LinkedList } from "./linked-list.js";

class HashMap {
  #loadFactor = 0.75;
  #capacity = 16;
  #arr = [];
  #size = 0;

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    let list = this.#arr[index];

    if (list === undefined) {
      list = new LinkedList();
      list.append({ key, value });
      this.#arr[index] = list;
      this.#size++;
    } else {
      const entry = list.find((e) => e.key === key);
      if (entry !== undefined) {
        entry.value = value;
        return;
      }

      list.append({ key, value });
      this.#size++;
    }

    if (this.length() >= this.#loadFactor * this.#capacity) {
      const bufferArr = this.entries();
      this.#capacity *= 2;
      this.#size = 0;
      this.#arr = [];
      bufferArr.forEach(([key, value]) => {
        this.set(key, value);
      });
    }
  }

  get(key) {
    const index = this.hash(key);
    const list = this.#arr[index];

    if (list === undefined) return null;

    const entry = list.find((e) => e.key === key);

    return entry !== undefined ? entry.value : null;
  }

  has(key) {
    const index = this.hash(key);
    const list = this.#arr[index];

    return list?.find((e) => e.key === key) !== undefined;
  }

  remove(key) {
    const index = this.hash(key);
    const list = this.#arr[index];
    if (list === undefined) return false;

    const listKey = list.findIndexBy((e) => e.key === key);
    if (listKey === -1) return false;
    list.removeAt(listKey);
    this.#size--;

    if (
      this.#capacity > 16 &&
      this.length() < (1 - this.#loadFactor) * this.#capacity
    ) {
      const bufferArr = this.entries();
      this.#size = 0;

      this.#capacity /= 2;
      this.#arr = [];
      bufferArr.forEach(([key, value]) => {
        this.set(key, value);
      });
    }

    return true;
  }

  length() {
    return this.#size;
  }

  clear() {
    this.#arr.length = 0;

    this.#size = 0;
    this.#capacity = 16;
  }

  keys() {
    const keyArr = [];
    for (let i = 0; i < this.#arr.length; i++) {
      if (this.#arr[i] !== undefined) {
        const objArr = this.#arr[i].values();

        objArr.forEach((e) => {
          keyArr.push(e.key);
        });
      }
    }

    return keyArr;
  }

  values() {
    const valArr = [];

    for (let i = 0; i < this.#arr.length; i++) {
      if (this.#arr[i] !== undefined) {
        const objArr = this.#arr[i].values();

        objArr.forEach((e) => {
          valArr.push(e.value);
        });
      }
    }

    return valArr;
  }

  entries() {
    const entryArr = [];

    for (let i = 0; i < this.#arr.length; i++) {
      if (this.#arr[i] !== undefined) {
        const objArr = this.#arr[i].values();

        objArr.forEach((e) => {
          entryArr.push([e.key, e.value]);
        });
      }
    }

    return entryArr;
  }
}

export { HashMap };
