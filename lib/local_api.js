var _           = require('lodash-node');
var httpHandler = require('./http_handler.js');

function LocalApi(endpoint) {
  this.endpoint = endpoint;
}

LocalApi.prototype = {
  constructor  : LocalApi,
  getMessages  : _getMessages,
  postMessages : _postMessages,
  postKeys     : _postKeys,
  postWifi     : _postWifi
};

module.exports = {
  getApi: function(endpoint) {
    return new LocalApi(endpoint);
  }
};

function _getMessages(callback) {
  var option = {
    endpoint: this.endpoint,
    method: 'GET',
    path: '/messages'
  };
  httpHandler.request(option, null, callback);
}

function _postMessages(message, callback) {
  if (!(_.isString(message) || _.isObject(message))) {
    throw new TypeError('Argument type error. argument 1 must be string or object.');
  }
  var option = {
    endpoint: this.endpoint,
    method: 'POST',
    path: '/messages'
  };
  var data = _.isObject(message) ? JSON.stringify(message) : message;

  httpHandler.request(option, data, callback);
}

function _postKeys(callback) {
  var option = {
    endpoint: this.endpoint,
    method: 'POST',
    path: '/keys'
  };

  httpHandler.request(option, null, callback);
}

function _postWifi(data, callback) {
  var option = {
    endpoint: this.endpoint,
    method: 'POST',
    path: '/wifi'
  };

  httpHandler.request(option, data, callback);
}

