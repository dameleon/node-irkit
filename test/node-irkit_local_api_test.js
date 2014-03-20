'use strict';

var path = require('path');
var fs = require('fs');
var localApi = require('../lib/local_api.js');
var fixturesDir = path.join(__dirname, 'fixtures');

exports['localApi'] = {
  setUp: function(done) {
    var irkitJsonPath = path.join(fixturesDir, 'irkit.json');

    if (!fs.existsSync(irkitJsonPath)) {
      throw new Error('node-irkit_test needs "fixtures/irkit.json" file.');
    }
    this.irkitSetting = JSON.parse(fs.readFileSync(irkitJsonPath));
    this.irData = JSON.parse(fs.readFileSync(path.join(fixturesDir, 'irdata.json')));
    this.api = localApi.getApi('http://' + this.irkitSetting.localip);
    done();
  },
  'test getApi': function(test) {
    test.equal(this.api.constructor.name, 'LocalApi', 'check constructor name');
    test.done();
  },
  'test postMessages': function(test) {
    test.expect(1);
    this.api.postMessages(this.irData, function(err) {
      if (!err) {
        test.ok(true, 'check no error');
      }
      test.done();
    });
  },
  'test getMessages': function(test) {
    this.api.getMessages(function(err, json) {
      if (!err) {
        test.ok(true, 'check no error');
      }
      if (json) {
        test.ok(!!json.message, 'check receive message');
      }
      test.done();
    });
  },
  'test postKeys': function(test) {
    test.expect(2);
    this.api.postKeys(function(err, json) {
      if (!err) {
        test.ok(true, 'check no error');
      }
      test.ok(!!json.clienttoken, 'check receive deviceid');
      test.done();
    });
  },
  // TODO: postWifi needs serialized wifi setting data
  // 'test postWifi': function() {
  //   var setting = this.irkitSetting;

  //   this.api.postWifi(data, function(err, json) {
  //     if (!err) {
  //       test.ok(true, 'check no error');
  //     }
  //     test.done();
  //   });
  // },
};
