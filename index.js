var deasync = require("deasync");
var terser = require("terser");

function syncPromise(fn) {
  return function () {
    var done = false;
    var args = Array.prototype.slice.apply(arguments);
    var err;
    var res;

    var ret = fn.apply(this, args);

    if (!ret || !ret.then) {
      throw new Error("It's not a promise.");
    }

    ret.then(function (result) {
      done = true;
      res = result;
    });

    ret.catch(function (e) {
      done = true;
      err = e;
    });

    deasync.loopWhile(function () {
      return !done;
    });
    if (err) throw err;

    return res;
  };
}
var syncMinify = syncPromise(terser.minify);

module.exports = function (content, file, options) {
  var result = syncMinify(content, options);

  // todo 支持 sourceMap

  return result.code;
};

module.exports.defaultOptions = {};
