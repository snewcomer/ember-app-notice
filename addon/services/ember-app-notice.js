import Service from '@ember/service';
import { get, setProperties } from "@ember/object";

/**
  Maintains state for app-wide error notifications

  @class AppNotice
  @extends Service
*/
export default class AppNotice extends Service {
  init(...args) {
    super.init(...args);

    /**
      Message for display at the application level for notices

      @property message
      @type String|null
      @default null
    */
    this.message = null;

    /**
      Level of notice to display for application level for messages.

      E.g. `error`, `warning`, `success`

      @property level
      @type String|null
      @default null
    */
    this.level = null;
  }

  /**
    Notification properties to display app wide error or notices.

    @method handleNotification
    @param {Error|Object} notice `{message,level}`
  */
  handleNotification(notice) {
    if (get(this, 'isDestroying') || get(this, 'isDestroyed')) {
      return;
    }
    setProperties(this, { message: notice.message, level: notice.level });
  }

  /**
    Update notification to display offline error messaging

    @method notifyOnline
  */
  notifyOnline() {
    this.handleNotification({ message: 'notices.online', level: 'success' });
  }

  /**
    Update notification to display offline error messaging

    @method notifyOffline
  */
  notifyOffline() {
    this.handleNotification({ message: 'notices.offline', level: 'warning' });
  }

  /**
    Nullify notification properties

    @method dismiss_errors
  */
  dismiss_errors() {
    this.setProperties({'message': null, 'level': null});
  }
}
