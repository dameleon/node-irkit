var _           = require('lodash-node');
var httpHandler = require('./http_handler.js');
var config      = require('./config.js');

function WebApi(endpoint) {
  this.endpoint = endpoint;
}

WebApi.prototype = {
  constructor  : WebApi,
  postKeys     : _postKeys,
  postMessages : _postMessages,
  getMessages  : _getMessages,
  postClients  : _postClients,
  postDevices  : _postDevices,
  postDoor     : _postDoor,
  postApps     : _postApps
};

module.exports = {
  getApi: function() {
    return new WebApi(config.apiEndpoint);
  }
};

function _postKeys(token, key, callback) {
  if (!_.isString(token)) {
    throw new TypeError('Argument type error. argument 1 must be string.');
  }
  var option = {
    endpoint: this.endpoint,
    method: 'POST',
    path: '/1/keys'
  };
  var data = {
    clienttoken: token
  };

  if (_.isString(key)) {
    data.clientkey = key;
  }
  httpHandler.request(option, data, callback);
}

function _postMessages(key, deviceid, message, callback) {
  var err = [];

  if (!_.isString(key)) {
    err.push('argument 1 must be string.');
  } else if (!_.isString(deviceid)) {
    err.push('argument 2 must be string.');
  } else if (!(_.isString(message) || _.isObject(message))) {
    err.push('argument 13 must be string or object.');
  }
  if (err.length) {
    throw new TypeError('Argument type error. ' + err.join(' '));
  }
  var option = {
    endpoint: this.endpoint,
    method: 'POST',
    path: '/1/messages'
  };
  var data = {
    clientkey: key,
    deviceid: deviceid,
    message: _.isObject(message) ? JSON.stringify(message) : message
  };

  httpHandler.request(option, data, callback);
}

function _getMessages(key, isClear, callback) {
  if (!_.isString(key)) {
    throw new TypeError('Argument type error. argument 1 must be string.');
  }
  var option = {
    endpoint: this.endpoint,
    method: 'GET',
    path: '/1/messages'
  };
  var data = {
    clientkey: key
  };

  if (isClear) {
    data.clear = 1;
  }
  httpHandler.request(option, data, callback);
}

function _postClients(apikey, callback) {
  if (!_.isString(apikey)) {
    throw new TypeError('Argument type error. argument 1 must be string.');
  }
  var option = {
    endpoint: this.endpoint,
    method: 'POST',
    path: '/1/clients'
  };
  var data = {
    apikey: apikey
  };

  httpHandler.request(option, data, callback);
}

function _postDevices(key, callback) {
  if (!_.isString(key)) {
    throw new TypeError('Argument type error. argument 1 must be string.');
  }
  var option = {
    endpoint: this.endpoint,
    method: 'POST',
    path: '/1/devices'
  };
  var data = {
    clientkey: key
  };

  httpHandler.request(option, data, callback);
}

function _postDoor(key, deviceid, callback) {
  var err = [];

  if (!_.isString(key)) {
    err.push('argument 1 must be string.');
  } else if (!_.isString(deviceid)) {
    err.push('argument 2 must be string.');
  }
  if (err.length) {
    throw new TypeError('Argument type error. ' + err.join(' '));
  }
  var option = {
    endpoint: this.endpoint,
    method: 'POST',
    path: '/1/door'
  };
  var data = {
    clientkey: key,
    deviceid: deviceid
  };

  httpHandler.request(option, data, callback);
}

function _postApps(email, callback) {
  if (!_.isString(email)) {
    throw new TypeError('Argument type error. argument 1 must be string.');
  }
  var option = {
    endpoint: this.endpoint,
    method: 'POST',
    path: '/1/apps'
  };
  var data = {
    email: email
  };

  httpHandler.request(option, data, callback);
}
