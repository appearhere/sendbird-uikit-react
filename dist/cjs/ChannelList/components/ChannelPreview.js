'use strict';

var _rollupPluginBabelHelpers = require('../../_rollupPluginBabelHelpers-597f5cf8.js');
var tslib_es6 = require('../../tslib.es6-d6068b10.js');
var React = require('react');
var ui_ChannelAvatar = require('../../ui/ChannelAvatar.js');
var ui_Badge = require('../../ui/Badge.js');
var ui_Icon = require('../../ui/Icon.js');
var ui_Label = require('../../index-4197d014.js');
var ui_MessageStatus = require('../../index-daac2dae.js');
var useSendbirdStateContext = require('../../useSendbirdStateContext.js');
var LocalizationContext = require('../../LocalizationContext-f4281153.js');
var ui_MentionUserLabel = require('../../ui/MentionUserLabel.js');
var ui_Modal = require('../../ui/Modal.js');
var ui_TextButton = require('../../ui/TextButton.js');
var ChannelList_context = require('../../ChannelListProvider-05beb013.js');
var Channel_components_TypingIndicator = require('../../Channel/components/TypingIndicator.js');
var index = require('../../index-d05a5cae.js');
var MediaQueryContext = require('../../MediaQueryContext-9a5566fc.js');
var useLongPress = require('../../useLongPress-2f4ee82c.js');
require('../../ui/Avatar.js');
require('../../ui/ImageRenderer.js');
require('../../uuid-2f4916c1.js');
require('../../utils-6eb1ca73.js');
require('prop-types');
require('../../stringSet-2dfd148b.js');
require('../../index-5977bdd5.js');
require('../../index-d4bc012c.js');
require('../../ui/Loader.js');
require('../../utils/message/getOutgoingMessageState.js');
require('../../index-661b02a2.js');
require('../../index-fb9d8ec0.js');
require('../../withSendbird.js');
require('react-dom');
require('../../index-1b132096.js');
require('../../ui/Button.js');
require('../../ui/IconButton.js');
require('../../color-0fae7c8e.js');
require('@sendbird/chat/groupChannel');
require('../../topics-085b5602.js');
require('../../utils-a9158c72.js');
require('../../UserProfileContext-fd00d1bd.js');
require('../../ChannelProvider-4d043480.js');
require('../../compareIds-5d186d0d.js');
require('../../const-43cebab9.js');
require('@sendbird/chat/message');
require('../../ui/ContextMenu.js');
require('../../ui/SortByRow.js');
require('../../ui/ReactionButton.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var ChannelPreview = function (_a) {
  var _b, _c, _d, _e, _f, _g, _h, _j, _k;

  var channel = _a.channel,
      _l = _a.isActive,
      isActive = _l === void 0 ? false : _l,
      _m = _a.isTyping,
      isTyping = _m === void 0 ? false : _m,
      renderChannelAction = _a.renderChannelAction,
      onLeaveChannel = _a.onLeaveChannel,
      onClick = _a.onClick,
      tabIndex = _a.tabIndex;
  var sbState = useSendbirdStateContext();

  var _o = ChannelList_context.useChannelListContext(),
      _p = _o.isTypingIndicatorEnabled,
      isTypingIndicatorEnabled = _p === void 0 ? false : _p,
      _q = _o.isMessageReceiptStatusEnabled,
      isMessageReceiptStatusEnabled = _q === void 0 ? false : _q;

  var _r = LocalizationContext.useLocalization(),
      dateLocale = _r.dateLocale,
      stringSet = _r.stringSet;

  var isMobile = MediaQueryContext.useMediaQueryContext().isMobile;

  var _s = React.useState(false),
      showMobileLeave = _s[0],
      setShowMobileLeave = _s[1];

  var userId = (_d = (_c = (_b = sbState === null || sbState === void 0 ? void 0 : sbState.stores) === null || _b === void 0 ? void 0 : _b.userStore) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.userId;
  var theme = (_e = sbState === null || sbState === void 0 ? void 0 : sbState.config) === null || _e === void 0 ? void 0 : _e.theme;
  var isMentionEnabled = (_f = sbState === null || sbState === void 0 ? void 0 : sbState.config) === null || _f === void 0 ? void 0 : _f.isMentionEnabled;
  var isFrozen = (channel === null || channel === void 0 ? void 0 : channel.isFrozen) || false;
  var isBroadcast = (channel === null || channel === void 0 ? void 0 : channel.isBroadcast) || false;
  var isChannelTyping = isTypingIndicatorEnabled && isTyping;
  var isMessageStatusEnabled = isMessageReceiptStatusEnabled && (((_g = channel === null || channel === void 0 ? void 0 : channel.lastMessage) === null || _g === void 0 ? void 0 : _g.messageType) === 'user' || ((_h = channel === null || channel === void 0 ? void 0 : channel.lastMessage) === null || _h === void 0 ? void 0 : _h.messageType) === 'file') && ((_k = (_j = channel === null || channel === void 0 ? void 0 : channel.lastMessage) === null || _j === void 0 ? void 0 : _j.sender) === null || _k === void 0 ? void 0 : _k.userId) === userId;
  var onLongPress = useLongPress.useLongPress({
    onLongPress: function () {
      if (isMobile) {
        setShowMobileLeave(true);
      }
    },
    onClick: onClick
  }, {
    delay: 1000
  });
  var channelName = ui_MessageStatus.getChannelTitle(channel, userId, stringSet);
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("div", _rollupPluginBabelHelpers._extends({
    className: ['sendbird-channel-preview', isActive ? 'sendbird-channel-preview--active' : ''].join(' '),
    role: "link",
    tabIndex: tabIndex
  }, isMobile ? tslib_es6.__assign({}, onLongPress) : {
    onClick: onClick
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-channel-preview__avatar"
  }, /*#__PURE__*/React__default["default"].createElement(ui_ChannelAvatar, {
    channel: channel,
    userId: userId,
    theme: theme
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-channel-preview__content"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-channel-preview__content__upper"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-channel-preview__content__upper__header"
  }, isBroadcast && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-channel-preview__content__upper__header__broadcast-icon"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.BROADCAST,
    fillColor: ui_Icon.IconColors.SECONDARY,
    height: "16px",
    width: "16px"
  })), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-channel-preview__content__upper__header__channel-name",
    type: ui_Label.LabelTypography.SUBTITLE_2,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, /*#__PURE__*/React__default["default"].createElement("div", null, channelName)), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-channel-preview__content__upper__header__total-members",
    type: ui_Label.LabelTypography.CAPTION_2,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, ui_MessageStatus.getTotalMembers(channel)), isFrozen && /*#__PURE__*/React__default["default"].createElement("div", {
    title: "Frozen",
    className: "sendbird-channel-preview__content__upper__header__frozen-icon"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.FREEZE,
    fillColor: ui_Icon.IconColors.PRIMARY,
    height: 12,
    width: 12
  }))), isMessageStatusEnabled ? /*#__PURE__*/React__default["default"].createElement(ui_MessageStatus.MessageStatus, {
    className: "sendbird-channel-preview__content__upper__last-message-at",
    channel: channel,
    message: channel === null || channel === void 0 ? void 0 : channel.lastMessage,
    isDateSeparatorConsidered: false
  }) : /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-channel-preview__content__upper__last-message-at",
    type: ui_Label.LabelTypography.CAPTION_3,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, ui_MessageStatus.getLastMessageCreatedAt({
    channel: channel,
    locale: dateLocale,
    stringSet: stringSet
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-channel-preview__content__lower"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-channel-preview__content__lower__last-message",
    type: ui_Label.LabelTypography.BODY_2,
    color: ui_Label.LabelColors.ONBACKGROUND_3
  }, isChannelTyping && /*#__PURE__*/React__default["default"].createElement(Channel_components_TypingIndicator.TypingIndicatorText, {
    members: channel === null || channel === void 0 ? void 0 : channel.getTypingUsers()
  }), !isChannelTyping && ui_MessageStatus.getLastMessage(channel) + (index.isEditedMessage(channel === null || channel === void 0 ? void 0 : channel.lastMessage) ? " ".concat(stringSet.MESSAGE_EDITED) : '')), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-channel-preview__content__lower__unread-message-count"
  }, isMentionEnabled && (channel === null || channel === void 0 ? void 0 : channel.unreadMentionCount) > 0 ? /*#__PURE__*/React__default["default"].createElement(ui_MentionUserLabel, {
    className: "sendbird-channel-preview__content__lower__unread-message-count__mention",
    color: "purple"
  }, '@') : null, ui_MessageStatus.getChannelUnreadMessageCount(channel) // return number
  ? /*#__PURE__*/React__default["default"].createElement(ui_Badge, {
    count: ui_MessageStatus.getChannelUnreadMessageCount(channel)
  }) : null))), !isMobile && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-channel-preview__action"
  }, renderChannelAction({
    channel: channel
  }))), showMobileLeave && isMobile && /*#__PURE__*/React__default["default"].createElement(ui_Modal["default"], {
    className: "sendbird-channel-preview__leave--mobile",
    titleText: channelName,
    hideFooter: true,
    isCloseOnClickOutside: true,
    onCancel: function () {
      return setShowMobileLeave(false);
    }
  }, /*#__PURE__*/React__default["default"].createElement(ui_TextButton, {
    onClick: function () {
      onLeaveChannel();
      setShowMobileLeave(false);
    },
    className: "sendbird-channel-preview__leave-label--mobile"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.SUBTITLE_1,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, stringSet.CHANNEL_PREVIEW_MOBILE_LEAVE))));
};

module.exports = ChannelPreview;
//# sourceMappingURL=ChannelPreview.js.map
