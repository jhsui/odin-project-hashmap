import { LinkedList } from "./linked-list.js";

class HashMap {
  #loadFactor = 0.75;
  #capacity = 16;
  #arr = [];
  #size = 0;
  //   #keyArr = [];

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
    const list = this.#arr[index];

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

      // there is already a list
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
    // if (this.length() === 0) return null;
    // if (!this.has(key)) return null;

    const index = this.hash(key);
    const list = this.#arr[index];

    // for (let i = 0; i < list.size(); i++) {
    //   if (list.at(i).key === key) {
    //     return list.at(i).value;
    //   }
    // }

    if (list === undefined) return null;

    const entry = list.find((e) => e.key === key);
    // if (entry !== undefined) return entry.value;
    // return null;

    return entry !== undefined ? entry.value : null;
  }

  has(key) {
    // if (this.length() === 0) {
    //   return false;
    // }

    const index = this.hash(key);
    const list = this.#arr[index];

    return list?.find((e) => e.key === key) !== undefined;
  }

  remove(key) {
    // if (!this.has(key)) return false;

    // const keyIndex = this.#keyArr.indexOf(key);
    // this.#keyArr.splice(keyIndex, 1);

    const index = this.hash(key);
    const list = this.#arr[index];
    if (list === undefined) return false;
    // for (let i = 0; i < list.size(); i++) {
    //   if (list.at(i).key === key) {
    //     list.removeAt(i);
    //     this.#size--;
    //     return true;
    //   }
    // }

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
      //   this.#keyArr = [];
      this.#capacity /= 2;
      this.#arr = [];
      bufferArr.forEach(([key, value]) => {
        this.set(key, value);
      });
    }

    return true;
  }

  // returns the number of stored keys in the hash map.
  length() {
    // return this.#keyArr.length;

    // if (this.#size === 0) return 0;

    // const keyCount = 0;
    // for (let i = 0; i < this.#arr.length; i++) {
    //   if (this.#arr[i] !== undefined) {
    //     keyCount += this.#arr[i].size();
    //   }
    // }
    // return keyCount;
    return this.#size;
  }

  clear() {
    this.#arr.length = 0;
    // this.#keyArr.length = 0;
    this.#size = 0;
    this.#capacity = 16;
  }

  keys() {
    // return this.#keyArr;

    // if (this.length() === 0) return [];

    const keyArr = [];
    for (let i = 0; i < this.#arr.length; i++) {
      if (this.#arr[i] !== undefined) {
        // for (let j = 0; j < this.#arr[i].size(); j++) {
        //   keyArr.push(this.#arr[i].at(j).key);
        // }
        const objArr = this.#arr[i].values();

        objArr.forEach((e) => {
          keyArr.push(e.key);
        });
      }
    }

    return keyArr;
  }

  values() {
    // if (this.length() === 0) return [];

    const valArr = [];

    // this.keys().forEach((key) => {
    //   valArr.push(this.get(key));
    // });

    for (let i = 0; i < this.#arr.length; i++) {
      if (this.#arr[i] !== undefined) {
        // for (let j = 0; j < this.#arr[i].size(); j++) {
        //   keyArr.push(this.#arr[i].at(j).key);
        // }
        const objArr = this.#arr[i].values();

        objArr.forEach((e) => {
          valArr.push(e.value);
        });
      }
    }

    return valArr;
  }

  entries() {
    // if (this.length() === 0) return [];

    const entryArr = [];

    // this.keys().forEach((key) => {
    //   entryArr.push([key, this.get(key)]);
    // });

    for (let i = 0; i < this.#arr.length; i++) {
      if (this.#arr[i] !== undefined) {
        // for (let j = 0; j < this.#arr[i].size(); j++) {
        //   keyArr.push(this.#arr[i].at(j).key);
        // }
        const objArr = this.#arr[i].values();

        objArr.forEach((e) => {
          entryArr.push([e.key, e.value]);
        });
      }
    }

    return entryArr;
  }

  //   size() {
  //     return this.#size;
  //   }
}

export { HashMap };
