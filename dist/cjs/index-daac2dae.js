'use strict';

var tslib_es6 = require('./tslib.es6-d6068b10.js');
var React = require('react');
var index$1 = require('./index-5977bdd5.js');
var ui_Icon = require('./ui/Icon.js');
var ui_Label = require('./index-4197d014.js');
var ui_Loader = require('./ui/Loader.js');
var index$2 = require('./index-d05a5cae.js');
var utils_message_getOutgoingMessageState = require('./utils/message/getOutgoingMessageState.js');
var index = require('./index-661b02a2.js');
var LocalizationContext = require('./LocalizationContext-f4281153.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const getChannelTitle = function () {
  var _channel$members;

  let channel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let currentUserId = arguments.length > 1 ? arguments[1] : undefined;
  let stringSet = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ui_Label.LabelStringSet;

  if (!(channel !== null && channel !== void 0 && channel.name) && !(channel !== null && channel !== void 0 && channel.members)) {
    return stringSet.NO_TITLE;
  }

  if (channel !== null && channel !== void 0 && channel.name && channel.name !== 'Group Channel') {
    return channel.name;
  }

  if ((channel === null || channel === void 0 ? void 0 : (_channel$members = channel.members) === null || _channel$members === void 0 ? void 0 : _channel$members.length) === 1) {
    return stringSet.NO_MEMBERS;
  }

  return ((channel === null || channel === void 0 ? void 0 : channel.members) || []).filter(_ref => {
    let {
      userId
    } = _ref;
    return userId !== currentUserId;
  }).map(_ref2 => {
    let {
      nickname
    } = _ref2;
    return nickname || stringSet.NO_NAME;
  }).join(', ');
};
const getLastMessageCreatedAt = _ref3 => {
  var _channel$lastMessage;

  let {
    channel,
    locale,
    stringSet
  } = _ref3;
  const createdAt = channel === null || channel === void 0 ? void 0 : (_channel$lastMessage = channel.lastMessage) === null || _channel$lastMessage === void 0 ? void 0 : _channel$lastMessage.createdAt;
  const optionalParam = locale ? {
    locale
  } : null;

  if (!createdAt) {
    return '';
  }

  if (index.isToday(createdAt)) {
    return index$1.format(createdAt, 'p', optionalParam);
  }

  if (index.isYesterday(createdAt)) {
    return (stringSet === null || stringSet === void 0 ? void 0 : stringSet.MESSAGE_STATUS__YESTERDAY) || 'Yesterday';
  }

  if (index.isThisYear(createdAt)) {
    return index$1.format(createdAt, 'MMM d', optionalParam);
  }

  return index$1.format(createdAt, 'yyyy/M/d', optionalParam);
};
const getTotalMembers = channel => channel !== null && channel !== void 0 && channel.memberCount ? channel.memberCount : 0;

const getPrettyLastMessage = function () {
  let message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const MAXLEN = 30;
  const {
    messageType,
    name
  } = message;

  if (messageType === 'file') {
    return index$2.truncateString(name, MAXLEN);
  }

  return message.message;
};

const getLastMessage = channel => channel !== null && channel !== void 0 && channel.lastMessage ? getPrettyLastMessage(channel.lastMessage) : '';
const getChannelUnreadMessageCount = channel => channel !== null && channel !== void 0 && channel.unreadMessageCount ? channel.unreadMessageCount : 0;

var MessageStatusTypes = utils_message_getOutgoingMessageState.OutgoingMessageStates;
function MessageStatus(_a) {
  var _b, _c;

  var _d;

  var className = _a.className,
      message = _a.message,
      channel = _a.channel,
      _e = _a.isDateSeparatorConsidered,
      isDateSeparatorConsidered = _e === void 0 ? true : _e;

  var _f = LocalizationContext.useLocalization(),
      stringSet = _f.stringSet,
      dateLocale = _f.dateLocale;

  var status = utils_message_getOutgoingMessageState.getOutgoingMessageState(channel, message);
  var hideMessageStatusIcon = ((_d = channel === null || channel === void 0 ? void 0 : channel.isGroupChannel) === null || _d === void 0 ? void 0 : _d.call(channel)) && (channel.isSuper || channel.isPublic || channel.isBroadcast) && !(status === utils_message_getOutgoingMessageState.OutgoingMessageStates.PENDING || status === utils_message_getOutgoingMessageState.OutgoingMessageStates.FAILED);
  var iconType = (_b = {}, _b[utils_message_getOutgoingMessageState.OutgoingMessageStates.SENT] = ui_Icon.IconTypes.DONE, _b[utils_message_getOutgoingMessageState.OutgoingMessageStates.DELIVERED] = ui_Icon.IconTypes.DONE_ALL, _b[utils_message_getOutgoingMessageState.OutgoingMessageStates.READ] = ui_Icon.IconTypes.DONE_ALL, _b[utils_message_getOutgoingMessageState.OutgoingMessageStates.FAILED] = ui_Icon.IconTypes.ERROR, _b);
  var iconColor = (_c = {}, _c[utils_message_getOutgoingMessageState.OutgoingMessageStates.SENT] = ui_Icon.IconColors.SENT, _c[utils_message_getOutgoingMessageState.OutgoingMessageStates.DELIVERED] = ui_Icon.IconColors.SENT, _c[utils_message_getOutgoingMessageState.OutgoingMessageStates.READ] = ui_Icon.IconColors.READ, _c[utils_message_getOutgoingMessageState.OutgoingMessageStates.FAILED] = ui_Icon.IconColors.ERROR, _c);
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-message-status'], false).join(' ')
  }, status === utils_message_getOutgoingMessageState.OutgoingMessageStates.PENDING ? /*#__PURE__*/React__default["default"].createElement(ui_Loader, {
    className: "sendbird-message-status__icon",
    width: "16px",
    height: "16px"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.SPINNER,
    fillColor: ui_Icon.IconColors.PRIMARY,
    width: "16px",
    height: "16px"
  })) : /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: "sendbird-message-status__icon ".concat(hideMessageStatusIcon ? 'hide-icon' : '', " ").concat(status === utils_message_getOutgoingMessageState.OutgoingMessageStates.FAILED ? '' : 'sendbird-message-status--sent'),
    type: iconType[status] || ui_Icon.IconTypes.ERROR,
    fillColor: iconColor[status],
    width: "16px",
    height: "16px"
  }), index$2.isSentStatus(status) && /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-message-status__text",
    type: ui_Label.LabelTypography.CAPTION_3,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, isDateSeparatorConsidered ? index$1.format((message === null || message === void 0 ? void 0 : message.createdAt) || 0, 'p', {
    locale: dateLocale
  }) : getLastMessageCreatedAt({
    channel: channel,
    locale: dateLocale,
    stringSet: stringSet
  })));
}

exports.MessageStatus = MessageStatus;
exports.MessageStatusTypes = MessageStatusTypes;
exports.getChannelTitle = getChannelTitle;
exports.getChannelUnreadMessageCount = getChannelUnreadMessageCount;
exports.getLastMessage = getLastMessage;
exports.getLastMessageCreatedAt = getLastMessageCreatedAt;
exports.getTotalMembers = getTotalMembers;
//# sourceMappingURL=index-daac2dae.js.map
