import Mixin from '@ember/object/mixin';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';

export default Mixin.create({
  emberAppNotice: service(),

  init() {
    this._super(...arguments);

    let appNotice = get(this, 'emberAppNotice');
    this._online = appNotice.notifyOnline.bind(appNotice);
    this._offline = appNotice.notifyOffline.bind(appNotice);

    window.addEventListener('offline', this._offline);
    window.addEventListener('online', this._online);
  },

  willDestroy() {
    window.removeEventListener('offline', this._offline);
    window.removeEventListener('online', this._online);
  },

    /**
    Proxy to appNotice handleNotification method

    @method handleNotification
    @param {Error|Object} notice `{message,level}`
  */
  handleNotification(notice) {
    get(this, 'emberAppNotice').handleNotification(notice);
  },

  /**
    Proxy to appNotice service message property

    @property message
    @type String|null
    @default null
  */
  message: reads('emberAppNotice.message'),

  /**
    Proxy to appNotice service message property

    E.g. `error`, `warning`, `success`

    @property level
    @type String|null
    @default null
  */
  level: reads('emberAppNotice.level'),

  /**
    @method dismiss_errors
  */
  actions: {
    dismiss_errors() {
      get(this, 'emberAppNotice').dismiss_errors();
    },
  }
});
