import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll, triggerEvent } from '@ember/test-helpers';
import wait from 'ember-test-helpers/wait';

module('Integration | Component | app notice', function(hooks) {
  setupRenderingTest(hooks);

  test('defaults to error level notice', async function(assert) {
    await render(hbs`{{ember-app-notice}}`);
    assert.ok(find('ember-app-notice').classList.contains('app-notice--error'), 'error modifier class is set');
    assert.ok(this.$('ember-app-notice[role="alert"]'), 'app notice has alert role');
  });

  test('supports optional warning level notice', async function(assert) {
    this.set('dismiss_errors', () => {
      this.set('message', '');
    });
    await render(hbs`{{ember-app-notice noticeLevel='warning' on-dismiss=(action dismiss_errors)}}`);
    assert.ok(find('ember-app-notice').classList.contains('app-notice--warning'), 'warning modifier class is set');
  });

  test('displays message', async function(assert) {
    let msg = 'Server Error';
    this.set('message', msg);
    await render(hbs`{{ember-app-notice message=message}}`);
    assert.ok(find('.app-notice__msg').textContent.match(new RegExp(msg)), 'Error text displayed');
  });

  test('click to dismiss message', async function(assert) {
    let done = assert.async();
    this.set('message', 'Opps there was an error.');

    this.set('dismiss_errors', () => {
      this.set('message', '');
    });

    await render(hbs`
      {{#if message}}
        {{ember-app-notice
          message=message
          on-dismiss=(action dismiss_errors)
        }}
      {{/if}}
    `);

    assert.ok(findAll('ember-app-notice').length === 1, 'Notice displayed.');

    await await click('ember-app-notice');

    return wait().then(() => {
      assert.ok(this.get('message') === '', 'message cleared in context by action');
      assert.ok(findAll('ember-app-notice').length === 0, 'Notice dismissed.');
      done();
    });
  });

  test('notice is dissmissed after delay (0 set in env)', async function(assert) {
    assert.expect(2);
    this.set('message', 'You are now back online yay');

    this.set('dismiss_errors', () => {
      this.set('message', '');
    });

    await render(hbs`
      {{#if message}}
        {{ember-app-notice
          message=message
          noticeLevel='success'
          on-dismiss=(action dismiss_errors)
        }}
      {{/if}}
    `);

    assert.ok(this.get('message') === '', 'message cleared in context by action');
    assert.ok(findAll('ember-app-notice').length === 0, 'Notice dismissed.');
  });
});
