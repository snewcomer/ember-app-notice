import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | app notice', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.service = this.owner.lookup('service:ember-app-notice');
  });
  hooks.afterEach(function() {
    this.service.set('message', null);
    this.service.set('level', null);
  });

  test('can set "message" and "level"', function(assert) {
    assert.equal(this.service.get('message'), null, 'message is null');
    assert.equal(this.service.get('level'), null, 'level is null');

    this.service.set('message', 'hello');
    this.service.set('level', 'world');

    assert.equal(this.service.get('message'), 'hello', 'message is hello');
    assert.equal(this.service.get('level'), 'world', 'level is world');
  });

  test('it can update "message" and "level" via the updateNotification method', function(assert) {
    assert.equal(this.service.get('message'), null, 'message is null');
    assert.equal(this.service.get('level'), null, 'level is null');

    // update value via handleNotification method
    this.service.handleNotification({ message: 'hello', level: 'world' });

    assert.equal(this.service.get('message'), 'hello', 'message is hello');
    assert.equal(this.service.get('level'), 'world', 'level is world');
  });

  test('notifyOnline and notifyOffline update "message" and "level" appropriately', function(assert) {
    assert.equal(this.service.get('message'), null, 'message is null');
    assert.equal(this.service.get('level'), null, 'level is null');

    this.service.notifyOffline();

    assert.equal(this.service.get('message'), 'notices.offline', 'message is notices.offline');
    assert.equal(this.service.get('level'), 'warning', 'level is warning');

    this.service.notifyOnline();

    assert.equal(this.service.get('message'), 'notices.online', 'message is notices.online');
    assert.equal(this.service.get('level'), 'success', 'level is success');
  });

  test('it can reset values to null via dismiss_errors method', function(assert) {
    this.service.set('message', 'hello');
    this.service.set('level', 'world');

    assert.equal(this.service.get('message'), 'hello', 'message is not null');
    assert.equal(this.service.get('level'), 'world', 'level is not null');

    // reset value via dismiss_errors method
    this.service.dismiss_errors();

    assert.equal(this.service.get('message'), null, 'message is null');
    assert.equal(this.service.get('level'), null, 'level is null');
  });
});
