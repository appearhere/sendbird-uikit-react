import { a as __spreadArray } from './tslib.es6-75bd0528.js';
import React__default from 'react';
import { f as format } from './index-229a0736.js';
import Icon, { IconTypes, IconColors } from './ui/Icon.js';
import { c as LabelStringSet, L as Label, a as LabelTypography, b as LabelColors } from './index-f60cbf08.js';
import Loader from './ui/Loader.js';
import { t as truncateString, e as isSentStatus } from './index-105a85f4.js';
import { getOutgoingMessageState, OutgoingMessageStates } from './utils/message/getOutgoingMessageState.js';
import { i as isToday, a as isYesterday, b as isThisYear } from './index-05bd476f.js';
import { u as useLocalization } from './LocalizationContext-e5f35d14.js';

const getChannelTitle = function () {
  var _channel$members;

  let channel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let currentUserId = arguments.length > 1 ? arguments[1] : undefined;
  let stringSet = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : LabelStringSet;

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

  if (isToday(createdAt)) {
    return format(createdAt, 'p', optionalParam);
  }

  if (isYesterday(createdAt)) {
    return (stringSet === null || stringSet === void 0 ? void 0 : stringSet.MESSAGE_STATUS__YESTERDAY) || 'Yesterday';
  }

  if (isThisYear(createdAt)) {
    return format(createdAt, 'MMM d', optionalParam);
  }

  return format(createdAt, 'yyyy/M/d', optionalParam);
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
    return truncateString(name, MAXLEN);
  }

  return message.message;
};

const getLastMessage = channel => channel !== null && channel !== void 0 && channel.lastMessage ? getPrettyLastMessage(channel.lastMessage) : '';
const getChannelUnreadMessageCount = channel => channel !== null && channel !== void 0 && channel.unreadMessageCount ? channel.unreadMessageCount : 0;

var MessageStatusTypes = OutgoingMessageStates;
function MessageStatus(_a) {
  var _b, _c;

  var _d;

  var className = _a.className,
      message = _a.message,
      channel = _a.channel,
      _e = _a.isDateSeparatorConsidered,
      isDateSeparatorConsidered = _e === void 0 ? true : _e;

  var _f = useLocalization(),
      stringSet = _f.stringSet,
      dateLocale = _f.dateLocale;

  var status = getOutgoingMessageState(channel, message);
  var hideMessageStatusIcon = ((_d = channel === null || channel === void 0 ? void 0 : channel.isGroupChannel) === null || _d === void 0 ? void 0 : _d.call(channel)) && (channel.isSuper || channel.isPublic || channel.isBroadcast) && !(status === OutgoingMessageStates.PENDING || status === OutgoingMessageStates.FAILED);
  var iconType = (_b = {}, _b[OutgoingMessageStates.SENT] = IconTypes.DONE, _b[OutgoingMessageStates.DELIVERED] = IconTypes.DONE_ALL, _b[OutgoingMessageStates.READ] = IconTypes.DONE_ALL, _b[OutgoingMessageStates.FAILED] = IconTypes.ERROR, _b);
  var iconColor = (_c = {}, _c[OutgoingMessageStates.SENT] = IconColors.SENT, _c[OutgoingMessageStates.DELIVERED] = IconColors.SENT, _c[OutgoingMessageStates.READ] = IconColors.READ, _c[OutgoingMessageStates.FAILED] = IconColors.ERROR, _c);
  return /*#__PURE__*/React__default.createElement("div", {
    className: __spreadArray(__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-message-status'], false).join(' ')
  }, status === OutgoingMessageStates.PENDING ? /*#__PURE__*/React__default.createElement(Loader, {
    className: "sendbird-message-status__icon",
    width: "16px",
    height: "16px"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.SPINNER,
    fillColor: IconColors.PRIMARY,
    width: "16px",
    height: "16px"
  })) : /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-message-status__icon ".concat(hideMessageStatusIcon ? 'hide-icon' : '', " ").concat(status === OutgoingMessageStates.FAILED ? '' : 'sendbird-message-status--sent'),
    type: iconType[status] || IconTypes.ERROR,
    fillColor: iconColor[status],
    width: "16px",
    height: "16px"
  }), isSentStatus(status) && /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-message-status__text",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, isDateSeparatorConsidered ? format((message === null || message === void 0 ? void 0 : message.createdAt) || 0, 'p', {
    locale: dateLocale
  }) : getLastMessageCreatedAt({
    channel: channel,
    locale: dateLocale,
    stringSet: stringSet
  })));
}

export { MessageStatus as M, getTotalMembers as a, getLastMessageCreatedAt as b, getLastMessage as c, getChannelUnreadMessageCount as d, MessageStatusTypes as e, getChannelTitle as g };
//# sourceMappingURL=index-1cb2692d.js.map
