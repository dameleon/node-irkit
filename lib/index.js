/*
 * node-irkit
 * https://github.com/dameleon/node-irkit
 *
 * Copyright (c) 2014 dameleon
 * Licensed under the MIT license.
 */

'use strict';

var async    = require('async');
var config   = require('./config.js');
var IRKit    = require('./irkit.js');
var webApi   = require('./web_api.js');
var localApi = require('./local_api.js');

module.exports = {
  set         : _set,
  getWebApi   : _getWebApi,
  getLocalApi : _getLocalApi,
  getIRKitInstance          : _getIRKitInstance,
  getIRKitInstanceWithToken : _getIRKitInstanceWithToken
};

/**
 * config の各値を変更する
 *
 * @param {String|Number} key 設定するキー名
 * @param {Any} value 設定する値
 */
function _set(key, value) {
  config.set(key, value);
}

/**
 * setting を元に IRKit のインスタンスを生成する
 *
 * @param {Object} setting 各パラメータを入れたオブジェクト
 * @param {String} setting.clienttoken
 * @param {String} setting.clientkey
 * @param {String} setting.deviceid
 * @param {String} setting.hostname
 * @param {String} [setting.ip]
 */
function _getIRKitInstance(setting) {
  return IRKit.createInstance(setting);
}

/**
 * clienttoken を元に API へアクセスし
 * clientkey, deviceid, hostname を準備して IRKit のインスタンスを生成する
 *
 * @async
 * @param {String} token clienttoken
 * @param {Function} callback IRKit のインスタンスを渡す callback
 */
function _getIRKitInstanceWithToken(token, callback) {
  var api = webApi.getApi();

  async.waterfall([
    function(callback) {
      api.postKeys(token, null, function(err, res) {
        if (err) {
          return callback(err);
        }
        callback(null, res);
      });
    },
    function(json, callback) {
      api.postDoor(json.clientkey, json.deviceid, function(err, res) {
        if (err) {
          return callback(err);
        }
        callback(null, {
          clienttoken : token,
          clientkey   : json.clientkey,
          deviceid    : json.deviceid,
          hostname    : res.hostname
        });
      });
    }
  ], function(err, setting) {
    if (err) {
      return callback(err, null);
    }
    callback(null, IRKit.createInstance(setting));
  });
}

/**
 * Web API を返す
 *
 * @return {Object} Web API
 */
function _getWebApi() {
  return webApi.getApi();
}

/**
 * Local API を返す
 *
 * @param {String} endpoint ローカルネットワーク内の IRKit のエンドポイントを指定
 * @return {Object} Local API
 */
function _getLocalApi(endpoint) {
  return localApi.getApi(endpoint);
}
