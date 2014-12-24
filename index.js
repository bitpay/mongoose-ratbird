/**
* @module mongoose-ratbird
*/

/**
* Notifier preferences Mongoose plugin
* #exports
* @param {object} schema - mongoose schema
* @param {object} options - optional options dictionary
*/
module.exports = function(schema, options) {
  schema.add({
    _notifications: {
      sms: { disabled: Boolean, tel: Number },
      email: { disabled: Boolean, address: String },
      desktop: { disabled: Boolean },
      http: { disabled: Boolean, url: String },
      dgram: { disabled: Boolean, host: String, port: Number }
    }
  });

  /**
  * Used to set notifier configuration
  * #setNotifierPreference
  * @param {string} transport - notification transport name
  * @param {object} prefs - data to set for preference
  */
  schema.methods.setNotifierPreference = function(transport, prefs) {
    if (!this.getNotifierPreference(transport)) {
      return null;
    }

    for (var prop in prefs) {
      this._notifications[transport][prop] = prefs[prop];
    }

    return this._notifications[transport];
  };

  /**
  * Used to get notifier configuration
  * #getNotifierPreference
  * @param {string} transport - notification transport name
  */
  schema.methods.getNotifierPreference = function(transport) {
    return this._notifications[transport] || null;
  };

  /**
  * Enable a notification transport
  * #enableNotifier
  * @param {string} transport - notification transport name
  */
  schema.methods.enableNotifier = function(transport) {
    return this.setNotifierPreference(transport, { disabled: false });
  };

  /**
  * Disable a notification transport
  * #disableNotifier
  * @param {string} transport - notification transport name
  */
  schema.methods.disableNotifier = function(transport) {
    return this.setNotifierPreference(transport, { disabled: true });
  };
};
