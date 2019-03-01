/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

(function() {
'use strict';

/**
 * 'settings-default-brave-shields-page' is the settings page containing brave's
 * default shields.
 */
Polymer({
  is: 'settings-default-brave-shields-page',

  properties: {
    adControlTypes_: {
      readOnly: true,
      type: Array,
      value: function() {
        return [
          {value: 'block', name: loadTimeData.getString('blockAds')},
          {value: 'allow', name: loadTimeData.getString('allowAdsAndTracking')}
        ]
      }
    },

    cookieControlTypes_: {
      readOnly: true,
      type: Array,
      value: function() {
        return [
          {value: '3p', name: loadTimeData.getString('block3rdPartyCookies')},
          {value: 'block', name: loadTimeData.getString('blockAllCookies')},
          {value: 'allow', name: loadTimeData.getString('allowAllCookies')}
        ]
      }
    },

    fingerprintingControlTypes_: {
      readOnly: true,
      type: Array,
      value: function() {
        return [
          {value: '3p', name: loadTimeData.getString('block3rdPartyFingerprinting')},
          {value: 'block', name: loadTimeData.getString('blockAllFingerprinting')},
          {value: 'allow', name: loadTimeData.getString('allowAllFingerprinting')}
        ]
      }
    },

    adControlType_: String,
    cookieControlType_: String,
    fingerprintingControlType_: String,
  },

  /** @private {?settings.DefaultBraveShieldsBrowserProxy} */
  browserProxy_: null,

  /** @override */
  created: function() {
    this.browserProxy_ = settings.DefaultBraveShieldsBrowserProxyImpl.getInstance();
  },

  /** @override */
  ready: function() {
    this.onAdControlChange_= this.onAdControlChange_.bind(this)
    this.onCookieControlChange_ = this.onCookieControlChange_.bind(this)
    this.onFingerprintingControlChange_ = this.onFingerprintingControlChange_.bind(this)
    this.onHTTPSEverywhereControlChange_ = this.onHTTPSEverywhereControlChange_.bind(this)
    this.onNoScriptControlChange_ = this.onNoScriptControlChange_.bind(this)
    this.onFBLoginControlChange_ = this.onFBLoginControlChange_.bind(this)
    this.onGoogleLoginControlChange_ = this.onGoogleLoginControlChange_.bind(this)
    this.onFBEmbedControlChange_ = this.onFBEmbedControlChange_.bind(this)
    this.onTwitterEmbedControlChange_ = this.onTwitterEmbedControlChange_.bind(this)
    this.onLinkedInEmbedControlChange_ = this.onLinkedInEmbedControlChange_.bind(this)

    this.browserProxy_.getAdControlType().then(value => {
      this.adControlType_= value;
    });
    this.browserProxy_.getCookieControlType().then(value => {
      this.cookieControlType_ = value;
    });
    this.browserProxy_.getFingerprintingControlType().then(value => {
      this.fingerprintingControlType_ = value;
    });
  },

  /**
   * @param {string} value
   * @param {string} value
   * @return {boolean}
   * @private
   */
  controlEqual: function(val1, val2) {
    return val1 === val2;
  },

  onAdControlChange_: function() {
    this.browserProxy_.setAdControlType(this.$.adControlType.value);
  },
  onCookieControlChange_: function() {
    this.browserProxy_.setCookieControlType(this.$.cookieControlType.value);
  },
  onFingerprintingControlChange_: function() {
    this.browserProxy_.setFingerprintingControlType(this.$.fingerprintingControlType.value);
  },
  onHTTPSEverywhereControlChange_: function() {
    this.browserProxy_.setHTTPSEverywhereControlType(this.$.httpsEverywhereControlType.checked);
  },
  onNoScriptControlChange_: function() {
    this.browserProxy_.setNoScriptControlType(this.$.noScriptControlType.checked);
  },
  onFBLoginControlChange_: function() {
    this.browserProxy_.setFBLoginControlType(this.$.fbLoginControlType.checked);
  },
  onGoogleLoginControlChange_: function() {
    this.browserProxy_.setGoogleLoginControlType(this.$.googleLoginControlType.checked);
  },
  onFBEmbedControlChange_: function() {
    this.browserProxy_.setFBEmbedControlType(this.$.fbEmbedControlType.checked);
  },
  onTwitterEmbedControlChange_: function() {
    this.browserProxy_.setTwitterEmbedControlType(this.$.twitterEmbedControlType.checked);
  },
  onLinkedInEmbedControlChange_: function() {
    this.browserProxy_.setLinkedInEmbedControlType(this.$.linkedInEmbedControlType.checked);
  }
});
})();
