var _    = require('lodash-node');
var path = require('path');
var fs   = require('fs');
var config;

try {
  config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config.json')));
} catch(e) {
  throw e;
}

function Config(config) {
  var type = typeof config;

  if (type !== 'object') {
    throw new TypeError('Argument type error. argument 1 must be object, not ' + type + '.');
  }
  _.each(config, function(value, key) {
    this[key] = value;
  }, this);
  this._ = {};
}

Config.prototype = {
  constructor: Config,
  set: _set
};

function _set(key, value) {
  var type = typeof key;

  if (type !== 'string' && type !== 'number') {
    throw new TypeError('Argument type error. argument 1 must be string or numner, not ' + type + '.');
  }
  this[key] = value;
}


module.exports = new Config(config);
