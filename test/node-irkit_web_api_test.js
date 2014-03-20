'use strict';

exports['webApi'] = {
};

// TODO: create web api mock
/*
var path = require('path');
var fs = require('fs');
var webApi = require('../lib/web_api.js');
var fixturesDir = path.join(__dirname, 'fixtures');

exports['webApi'] = {
  setUp: function(done) {
    var irkitJsonPath = path.join(fixturesDir, 'irkit.json');

    if (!fs.existsSync(irkitJsonPath)) {
      throw new Error('node-irkit_test needs "fixtures/irkit.json" file.');
    }
    this.irkitSetting = JSON.parse(fs.readFileSync(irkitJsonPath));
    this.irData = JSON.parse(fs.readFileSync(path.join(fixturesDir, 'irdata.json')));
    this.api = webApi.getApi();
    done();
  },
  'test getApi': function(test) {
    test.equal(this.api.constructor.name, 'WebApi', 'check constructor name');
    test.done();
  },
  'test postKeys': function(test) {
    var setting = this.irkitSetting;

    test.expect(2);
    this.api.postKeys(setting.clienttoken, setting.clientkey, function(err, json) {
      if (!err) {
        test.ok(true, 'check no error');
      }
      test.ok(!!json.deviceid, 'check deviceid');
      test.ok(!!json.clientkey, 'check clientkey');
      test.done();
    });
  },
  'test postMessages': function(test) {
    var setting = this.irkitSetting;

    test.expect(1);
    this.api.postMessages(setting.clientkey, setting.deviceid, this.irData, function(err, json) {
      if (!err) {
        test.ok(true, 'check no error');
      }
      test.done();
    });
  },
  'test getMessages': function(test) {
    var setting = this.irkitSetting;

    this.api.getMessages(setting.clientkey, function(err, json) {
      if (!err) {
        test.ok(true, 'check no error');
      }
      if (json) {
        test.ok(!!json.message, 'check receive message');
        test.equal(json.deviceid, setting.deviceid, 'check receive deviceid');
        test.equal(json.hostname, setting.hostname, 'check receive hostname');
      }
      test.done();
    });
  },
  'test postDevices': function(test) {
    var setting = this.irkitSetting;

    test.expect(3);
    this.api.postDevices(setting.clientkey, function(err, json) {
      if (!err) {
        test.ok(true, 'check no error');
      }
      test.ok(!!json.devicekey, 'check receive devicekey');
      test.ok(!!json.deviceid, 'check receive deviceid');
      test.done();
    });
  },
  'test postDoor': function() {
    var setting = this.irkitSetting;

    test.expect(2);
    this.api.postDoor(setting.clientkey, setting.deviceid, function(err, json) {
      if (!err) {
        test.ok(true, 'check no error');
      }
      test.ok(!!json.hostname, 'check hostname');
      test.done();
    });
  },
  // TODO: postClients needs api key
  // 'test postClients': function() {
  //   var setting = this.irkitSetting;
  //   this.api.postClients(function() {})
  // },
  // TODO: postApps needs email
  // 'test postApps': function() {
  //   var setting = this.irkitSetting;
  //   this.api.postApps(function() {})
  // },
};
*/
