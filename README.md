# ember-app-notice

Simple app-notice component I use across multiple apps.  If you find it useful and want something changed, feel free to make an issue or PR!

Uses ES6 classes and decorators

## Usage

import the scss file
```
@import 'ember-app-notice'

// contains overridable variables by setting these before you import `ember-app-notice`

$ember-app-notice--text: white;
$ember-app-notice--orange: #FEB14F;
$ember-app-notice--yellow: #EC8213;
$ember-app-notice--green: #8abf54;
$ember-app-notice--menuHeight: 85px;
```

anywhere in your app, call the service and pass it a message and level
```
/**
  Action that calls the `session.authenticate` method to authenticate the
  user.

  @method signin
*/
signin = task(function * ({ username, password }) {
  try {
    yield get(this, 'session').authenticate('authenticator:jwt', { identification: username, password });
  } catch(e) {
    const appNotice = get(this, 'emberAppNotice');
    appNotice.handleNotification({message: 'login_fail', level: 'error'});
  }
})
```

## Component

in application.hbs to handle other errors you want at the application level
```
{{#if message}}
  {{ember-app-notice
    message=message
    noticeLevel=level
    on-dismiss=(action 'dismiss_errors')
  }}
{{/if}}
```

## Mixin (for offline events)
import EmberAppNoticeMixin from 'ember-app-notice/mixins/ember-app-notice';

```
export default ApplicationController.extends(EmberAppNoticeMixin, {

})
```

## Controller (for offline events)

```
export default class ApplicationController extends EmberAppNoticeController {  
```

## Installation

* `git clone <repository-url>` this repository
* `cd ember-app-notice`
* `npm install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
