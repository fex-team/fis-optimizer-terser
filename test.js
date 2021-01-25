const minify = require("./index.js");

console.log(
  minify(`
function add(first, second) { return first + second; }
`)
);
