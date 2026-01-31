import { HashMap } from "./script.js";

const test = new HashMap(); // or HashMap() if using a factory

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");

test.set("apple", "green");

test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("moon", "silver");

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

test.clear();
console.log(test.length());

test.set("red apple", "red");
test.set("apple", "red");
test.set("apple", "green");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("moon", "silver");
test.set("this is key", "this is value");
console.log(test.length());
console.log(test.entries());

test.remove("apple");
test.remove("banana");
test.remove("carrot");
test.remove("dog");
test.remove("elephant");
test.remove("frog");
test.remove("grape");
test.remove("hat");
test.remove("ice cream");
test.remove("jacket");
test.remove("kite");
test.remove("lion");
test.remove("moon");

console.log(test.length());
console.log(test.entries());
console.log(test.length());

test.set("101", undefined);
test.set("102", null);

console.log(test.has("101"));
console.log(test.has("102"));
