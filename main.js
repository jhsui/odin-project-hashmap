import { HashMap } from "./script.js";

const test = new HashMap(); // or HashMap() if using a factory

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");

test.set("apple", "green");

// test.set('frog', 'green')
// test.set('grape', 'purple')
// test.set('hat', 'black')
// test.set('ice cream', 'white')
// test.set('jacket', 'blue')
// test.set('kite', 'pink')
// test.set('lion', 'golden')

console.log(test.get("apple"));
console.log(test.get("banana"));
console.log(test.get("carrot"));
console.log(test.get("dog"));
console.log(test.get("elephant"));

console.log(test.length());

test.remove("elephant");
console.log(test.get("elephant"));
console.log(test.length());
test.remove("carrot");
console.log(test.keys());
console.log(test.values());
console.log(test.entries());

// test.clear();
// console.log(test.length());
