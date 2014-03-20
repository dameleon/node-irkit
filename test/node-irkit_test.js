'use strict';

var path = require('path');
var fs = require('fs');
var nodeIrkit = require('../lib/index.js');

exports['index'] = {
  setUp: function(done) {
    var irkitJsonPath = path.join(__dirname, 'fixtures', 'irkit.json');

    if (!fs.existsSync(irkitJsonPath)) {
      throw new Error('node-irkit_test needs "fixtures/irkit.json" file.');
    }
    this.irkitSetting = JSON.parse(fs.readFileSync(irkitJsonPath));
    done();
  },
  'test set': function(test) {
    var config = require(path.join(__dirname, '..', 'lib', 'config.js'));

    nodeIrkit.set('__test_key', 1);
    nodeIrkit.set(0, 1);
    test.equal(config.__test_key, 1, 'check string key');
    test.equal(config[0], 1, 'check number key');
    test.done();
  },
  'test getIRKitInstance': function(test) {
    var IRKit = nodeIrkit.getIRKitInstance(this.irkitSetting);

    test.ok(!!IRKit.deviceid,  'check deviceid');
    test.ok(!!IRKit.clientkey, 'check clientkey');
    test.ok(!!IRKit.hostname,  'check hostname');
    test.ok(!!IRKit.localip,   'check localip');
    test.ok(!!IRKit.webApi,    'check webApi');
    test.ok(!!IRKit.localApi,  'check localApi');
    test.done();
  },
  'test getIRKitInstanceWithToken': function(test) {
    test.expect(4);
    nodeIrkit.getIRKitInstanceWithToken(this.irkitSetting.clienttoken, function(err, IRKit) {
      if (!err) {
        test.ok(true, 'created irkit instance');
      }
      test.ok(!!IRKit.deviceid,  'check deviceid');
      test.ok(!!IRKit.clientkey, 'check clientkey');
      test.ok(!!IRKit.hostname,  'check hostname');
      test.done();
    });
  },
};
