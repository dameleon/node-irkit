var _           = require('lodash-node');
var https       = require('https');
var http        = require('http');
var querystring = require('querystring');
// var config      = require('./config.js');
var endpoints   = {};

module.exports = {
  request: _request
};

function _request(option, data, callback) {
  var endpointInfo = __getEndPointInfo(option.endpoint);
  var client = endpointInfo.isSsl ? https : http;
  var setting = __createRequestSetting(endpointInfo, option);
  var _callback = function(err, data) {
    callback && callback(err, data);
  };

  if (data) {
    if (_.isObject(data)) {
      data = querystring.stringify(data);
    }
    setting.headers || (setting.headers = {});
    setting.headers['Content-Length'] = Buffer.byteLength(data);
  }

  var req = client.request(setting, function(res) {
    var data = '';

    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      data += chunk;
    });
    res.on('end', function() {
      if (data) {
        var json;

        try {
          json = JSON.parse(data);
          _callback(null, json);
        } catch (e) {
          _callback(e, null);
        }
      } else {
        _callback(null, {});
      }
    });
  });

  // req.on('socket', function(socket) {
  //   socket.setTimeout(config.timeout);
  //   socket.on('timeout', function() {
  //     req.abort();
  //     callback && callback('timeout', null);
  //   });
  // });
  req.on('error', function(e) {
    _callback(e, null);
  });
  data && req.write(data);
  req.end();
}

function __createRequestSetting(endpointInfo, option) {
  return {
    hostname : endpointInfo.hostname,
    port     : option.port || endpointInfo.port,
    path     : endpointInfo.pathPrefix + (option.path || ''),
    method   : option.method || 'GET',
    headers  : {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
}

function __getEndPointInfo(endpoint) {
  // use cache
  if (endpoints[endpoint]) {
    return endpoints[endpoint];
  }
  var res = {};
  var hostname = endpoint.split('//').pop();
  var url = hostname.split('/');
  var pathPrefix;

  hostname = url.shift();
  pathPrefix = url.length ? ('/' + url.join('/')) : '';
  res.isSsl = /https/.test(endpoint);
  res.port = res.isSsl ? 443 : 80;
  res.hostname = hostname;
  res.pathPrefix = pathPrefix;
  return endpoints[endpoint] = res;
}
