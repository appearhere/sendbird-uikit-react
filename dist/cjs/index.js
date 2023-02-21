'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var SendbirdProvider = require('./SendbirdProvider.js');
var App = require('./App.js');
var ChannelSettings = require('./ChannelSettings.js');
var ChannelList = require('./ChannelList.js');
var Channel = require('./Channel.js');
var LocalizationContext = require('./LocalizationContext-aa91c4ff.js');
var OpenChannel = require('./OpenChannel.js');
var OpenChannelSettings = require('./OpenChannelSettings.js');
var MessageSearch = require('./MessageSearch.js');
var index = require('./index-ba87405c.js');
var React = require('react');
require('prop-types');
require('sendbird');
require('./actionTypes-8115bc5e.js');
require('./index-8a6239b5.js');
require('css-vars-ponyfill');
require('./index-bb47b529.js');
require('./LeaveChannel-94fedbcc.js');
require('./index-0bbfe651.js');
require('./index-23bbc017.js');
require('./utils-07b40c15.js');
require('./index-9566a205.js');
require('./index-8adc20af.js');
require('./index-418284a2.js');
require('./index-e317aa01.js');
require('react-dom');

/**
 * Example:
 * const MyComponent = () => {
 *  const context = useSendbirdStateContext();
 *  const sdk = sendbirdSelectors.getSdk(context);
 *  return (<div>...</div>);
 * }
 */

function useSendbirdStateContext() {
  var context = React.useContext(LocalizationContext.SendbirdSdkContext);
  return context;
}

exports.SendBirdProvider = SendbirdProvider;
exports.App = App;
exports.ChannelSettings = ChannelSettings;
exports.ChannelList = ChannelList;
exports.Channel = Channel["default"];
exports.getAllEmojisFromEmojiContainer = Channel.getAllEmojisFromEmojiContainer;
exports.getEmojiCategoriesFromEmojiContainer = Channel.getEmojiCategoriesFromEmojiContainer;
exports.getEmojisFromEmojiContainer = Channel.getEmojisFromEmojiContainer;
exports.getStringSet = LocalizationContext.getStringSet;
exports.withSendBird = LocalizationContext.withSendbirdContext;
exports.OpenChannel = OpenChannel["default"];
exports.OpenChannelSettings = OpenChannelSettings;
exports.MessageSearch = MessageSearch;
exports.sendBirdSelectors = index.selectors;
exports.useSendbirdStateContext = useSendbirdStateContext;
//# sourceMappingURL=index.js.map
