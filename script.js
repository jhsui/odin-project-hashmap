import { LinkedList } from "./linked-list.js";

class HashMap {
  #loadFactor = 0.75;
  #capacity = 16;
  #arr = [];
  #size = 0;
  #keyArr = [];

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }

    return hashCode;
  }

  //   indexValidate(index) {
  //     if (index < 0 || index >= capacity) {
  //       throw new Error("Trying to access index out of bounds");
  //     }
  //   }

  set(key, value) {
    const index = this.hash(key);

    // key-value pairs are stored as objects.
    // if this hash map already contains this key:
    if (this.has(key)) {
      const list = this.#arr[index];

      for (let i = 0; i < list.size(); i++) {
        if (key === list.at(i).key) {
          list.at(i).value = value;
          this.#size++;
        }
      }
    }

    if (this.#arr[index] === undefined) {
      const list = new LinkedList();
      list.append({ key, value });
      this.#arr[index] = list;
      this.#size++;
    } else {
      // there is already a list
      this.#arr[index].append({ key, value });
      this.#size++;
    }

    if (!this.#keyArr.includes(key)) {
      this.#keyArr.push(key);
    }

    // !!!growth!!!
    // if (this.#size >= this.#loadFactor * this.#capacity) {
    //   const bufferArr = this.#arr;

    //   this.#capacity = 2 * this.#capacity;

    //   for()
    // }
  }

  get(key) {
    if (!this.has(key)) return null;

    const index = this.hash(key);
    const list = this.#arr[index];

    for (let i = 0; i < list.size(); i++) {
      if (list.at(i).key === key) {
        return list.at(i).value;
      }
    }
  }

  has(key) {
    if (this.length() === 0) {
      return false;
    }

    // const index = this.hash(key);
    // const list = this.#arr[index];

    // for (let i = 0; i < list.size(); i++) {
    //   if (this.list.at(i).key === key) {
    //     return true;
    //   }
    // }
    // return false;

    if (this.#keyArr.includes(key)) return true;

    return false;
  }

  remove(key) {
    if (!this.has(key)) return false;

    const keyIndex = this.#keyArr.indexOf(key);
    this.#keyArr.splice(keyIndex, 1);

    const index = this.hash(key);
    const list = this.#arr[index];

    for (let i = 0; i < list.size(); i++) {
      if (list.at(i).key === key) {
        list.removeAt(i);
        this.#size--;
        return true;
      }
    }
  }

  // returns the number of stored keys in the hash map.
  length() {
    return this.#keyArr.length;
  }

  clear() {
    this.#arr.length = 0;
    this.#keyArr.length = 0;
    this.#size = 0;
    this.#capacity = 16;
  }

  keys() {
    return this.#keyArr;
  }

  values() {
    if (this.length() === 0) return [];

    const valArr = [];

    this.keys().forEach((key) => {
      valArr.push(this.get(key));
    });

    return valArr;
  }

  entries() {
    if (this.length() === 0) return [];

    const entryArr = [];

    this.keys().forEach((key) => {
      entryArr.push([key, this.get(key)]);
    });

    return entryArr;
  }
}

export { HashMap };
