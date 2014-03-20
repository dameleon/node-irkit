var _        = require('lodash-node');
var webApi   = require('./web_api.js');
var localApi = require('./local_api.js');

/**
 * setting を元に IRKit を操作するためのメソッド群
 * local か webapi を意識せずに、(get|post)Messages できるように
 *
 * @param {Object} setting 各パラメータを入れたオブジェクト
 * @param {String} setting.clienttoken
 * @param {String} setting.clientkey
 * @param {String} setting.deviceid
 * @param {String} setting.hostname
 * @param {String} setting.localip
 * @param {String} [setting.ip]
 */
function IRKit(setting) {
  // copy setting
  _.extend(this, setting);

  this.webApi = __loadWebApi(this);
  this.localApi = __loadLocalApi(this);
}

IRKit.prototype = {
  constructor  : IRKit,
  getMessages  : _getMessages,
  postMessages : _postMessages,
};

module.exports = {
  createInstance: function(setting) {
    return new IRKit(setting);
  }
};

function _getMessages(callback) {
  if (this.localApi) {
    this.localApi.getMessages(callback);
  } else if (this.webApi) {
    this.webApi.getMessages(this.clientkey, 1, callback);
  }
}

function _postMessages(message) {
  if (this.localApi) {
    this.localApi.postMessages(message);
  } else if (this.webApi) {
    this.webApi.postMessages(this.clientkey, this.deviceid, message);
  }
}


function __loadWebApi(context) {
  if (!(context.clientkey && context.deviceid)) {
    return null;
  }
  return webApi.getApi();
}

function __loadLocalApi(context) {
  // localip が設定されていなければここで返る
  if (!context.localip) {
    return null;
  }
  return localApi.getApi('http://' + context.localip);
}
