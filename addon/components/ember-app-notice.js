import Component from '@ember/component';
import layout from '../templates/components/ember-app-notice';
import { timeout } from 'ember-concurrency';
import { get } from '@ember/object';
import { run } from '@ember/runloop';
import { action } from 'ember-decorators/object';
import { attribute } from 'ember-decorators/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { classNames, className, tagName } from 'ember-decorators/component';
import { equal } from 'ember-decorators/object/computed';
import { computed } from 'ember-decorators/object';
import Ember from 'ember';

const { testing } = Ember;

const TIMEOUT = testing ? 0 : 5000;

@tagName('ember-app-notice')
@classNames('animated-fast')
export default class AppNotice extends Component {

  @attribute role = 'alert';

  @className('app-notice--error') isError = false;
  @className('app-notice--warning') isWarning = false;
  @className('app-notice--success') isSuccess = false;
  @className('slideOutUp') slideOutUp = false;
  @className('slideInDown') slideInDown = true;
  @equal('noticeLevel', 'error') isError;
  @equal('noticeLevel', 'warning') isWarning;
  @equal('noticeLevel', 'success') isSuccess;

  constructor() {
    super();
    this.__noticeLevel = 'error';
    this.layout = layout;
  }

  /*
    Type of notice, e.g. error, warning, success

    @property noticeLevel
    @type String
  */
  @computed
  get noticeLevel() {
    return this[`__noticeLevel`];
  }
  set noticeLevel(value) {
    get(this, 'dismissTask').perform();
    this['__noticeLevel'] = value;
  }

  @computed('noticeLevel')
  get faIcon() {
    const notice = get(this, 'noticeLevel');
    return iconMap[notice];
  }

  click() {
    this.toggleProperty('slideOutUp');
    this.toggleProperty('slideInDown');
    run.later(this, 'send', 'dismiss', TIMEOUT);
  }

  @restartableTask
  dismissTask = function * () {
    yield timeout(TIMEOUT);
    const isSuccess = get(this, 'isSuccess');
    if (isSuccess) {
      this.toggleProperty('slideOutUp');
      run.later(this, 'send', 'dismiss', TIMEOUT);
    }
  }

  /**
   * @method dismiss
   */
  @action
  dismiss() {
    get(this, 'on-dismiss')();
  }
}

// Font Awesome icon names…
let iconMap = Object.create(null);

iconMap['error'] = 'exclamation-circle';
iconMap['warning'] = 'exclamation-circle';
iconMap['success'] = 'thumbs-up';

Object.freeze(iconMap);