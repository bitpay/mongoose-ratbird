Mongoose Ratbird Preferences
============================

Extend your [Mongoose](http://mongoosejs.com/) schemas with
[Ratbird](https://github.com/murder0tic/ratbird) notifier preferences.

## Usage

Install with Node Package Manager:

```
npm install mongoose-ratbird
```

Invoke in you Mongoose schema:

```js
var User = new mongoose.Schema({
  // ...
});

User.plugin(require('mongoose-ratbird'));
```

Now your mongoose `Document`s will have notification preferences that can be
fed to the `dispatch()` method of an instance of `ratbird.Notifier`.

```js
var notifier = ratbird.createNotifier(config);
// ...
notifier.dispatch({
  title: 'Some Notification',
  content: 'Something <em>really</em> important just happened!'
}, user._notifications);
```
