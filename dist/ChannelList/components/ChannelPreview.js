import { a as _extends } from '../../_rollupPluginBabelHelpers-fe256514.js';
import { _ as __assign } from '../../tslib.es6-75bd0528.js';
import React__default, { useState } from 'react';
import ChannelAvatar from '../../ui/ChannelAvatar.js';
import Badge from '../../ui/Badge.js';
import Icon, { IconTypes, IconColors } from '../../ui/Icon.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../../index-f60cbf08.js';
import { g as getChannelTitle, a as getTotalMembers, M as MessageStatus, b as getLastMessageCreatedAt, c as getLastMessage, d as getChannelUnreadMessageCount } from '../../index-1cb2692d.js';
import useSendbirdStateContext from '../../useSendbirdStateContext.js';
import { u as useLocalization } from '../../LocalizationContext-e5f35d14.js';
import MentionUserLabel from '../../ui/MentionUserLabel.js';
import Modal from '../../ui/Modal.js';
import TextButton from '../../ui/TextButton.js';
import { u as useChannelListContext } from '../../ChannelListProvider-41d1c19d.js';
import { TypingIndicatorText } from '../../Channel/components/TypingIndicator.js';
import { d as isEditedMessage } from '../../index-105a85f4.js';
import { u as useMediaQueryContext } from '../../MediaQueryContext-0ce6633d.js';
import { u as useLongPress } from '../../useLongPress-ee44c5c3.js';
import '../../ui/Avatar.js';
import '../../ui/ImageRenderer.js';
import '../../uuid-392016d0.js';
import '../../utils-13fa0336.js';
import 'prop-types';
import '../../stringSet-42c0e16e.js';
import '../../index-229a0736.js';
import '../../index-5dcd7e0f.js';
import '../../ui/Loader.js';
import '../../utils/message/getOutgoingMessageState.js';
import '../../index-05bd476f.js';
import '../../index-81d63e09.js';
import '../../withSendbird.js';
import 'react-dom';
import '../../index-5ab5d8fe.js';
import '../../ui/Button.js';
import '../../ui/IconButton.js';
import '../../color-52d916b6.js';
import '@sendbird/chat/groupChannel';
import '../../topics-0560d548.js';
import '../../utils-8a4a2ff6.js';
import '../../UserProfileContext-517994e3.js';
import '../../ChannelProvider-3f08837d.js';
import '../../compareIds-fd8fd31e.js';
import '../../const-03d71a8a.js';
import '@sendbird/chat/message';
import '../../ui/ContextMenu.js';
import '../../ui/SortByRow.js';
import '../../ui/ReactionButton.js';

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

  var _o = useChannelListContext(),
      _p = _o.isTypingIndicatorEnabled,
      isTypingIndicatorEnabled = _p === void 0 ? false : _p,
      _q = _o.isMessageReceiptStatusEnabled,
      isMessageReceiptStatusEnabled = _q === void 0 ? false : _q;

  var _r = useLocalization(),
      dateLocale = _r.dateLocale,
      stringSet = _r.stringSet;

  var isMobile = useMediaQueryContext().isMobile;

  var _s = useState(false),
      showMobileLeave = _s[0],
      setShowMobileLeave = _s[1];

  var userId = (_d = (_c = (_b = sbState === null || sbState === void 0 ? void 0 : sbState.stores) === null || _b === void 0 ? void 0 : _b.userStore) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.userId;
  var theme = (_e = sbState === null || sbState === void 0 ? void 0 : sbState.config) === null || _e === void 0 ? void 0 : _e.theme;
  var isMentionEnabled = (_f = sbState === null || sbState === void 0 ? void 0 : sbState.config) === null || _f === void 0 ? void 0 : _f.isMentionEnabled;
  var isFrozen = (channel === null || channel === void 0 ? void 0 : channel.isFrozen) || false;
  var isBroadcast = (channel === null || channel === void 0 ? void 0 : channel.isBroadcast) || false;
  var isChannelTyping = isTypingIndicatorEnabled && isTyping;
  var isMessageStatusEnabled = isMessageReceiptStatusEnabled && (((_g = channel === null || channel === void 0 ? void 0 : channel.lastMessage) === null || _g === void 0 ? void 0 : _g.messageType) === 'user' || ((_h = channel === null || channel === void 0 ? void 0 : channel.lastMessage) === null || _h === void 0 ? void 0 : _h.messageType) === 'file') && ((_k = (_j = channel === null || channel === void 0 ? void 0 : channel.lastMessage) === null || _j === void 0 ? void 0 : _j.sender) === null || _k === void 0 ? void 0 : _k.userId) === userId;
  var onLongPress = useLongPress({
    onLongPress: function () {
      if (isMobile) {
        setShowMobileLeave(true);
      }
    },
    onClick: onClick
  }, {
    delay: 1000
  });
  var channelName = getChannelTitle(channel, userId, stringSet);
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", _extends({
    className: ['sendbird-channel-preview', isActive ? 'sendbird-channel-preview--active' : ''].join(' '),
    role: "link",
    tabIndex: tabIndex
  }, isMobile ? __assign({}, onLongPress) : {
    onClick: onClick
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-channel-preview__avatar"
  }, /*#__PURE__*/React__default.createElement(ChannelAvatar, {
    channel: channel,
    userId: userId,
    theme: theme
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-channel-preview__content"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-channel-preview__content__upper"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-channel-preview__content__upper__header"
  }, isBroadcast && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-channel-preview__content__upper__header__broadcast-icon"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.BROADCAST,
    fillColor: IconColors.SECONDARY,
    height: "16px",
    width: "16px"
  })), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-channel-preview__content__upper__header__channel-name",
    type: LabelTypography.SUBTITLE_2,
    color: LabelColors.ONBACKGROUND_1
  }, /*#__PURE__*/React__default.createElement("div", null, channelName)), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-channel-preview__content__upper__header__total-members",
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, getTotalMembers(channel)), isFrozen && /*#__PURE__*/React__default.createElement("div", {
    title: "Frozen",
    className: "sendbird-channel-preview__content__upper__header__frozen-icon"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.FREEZE,
    fillColor: IconColors.PRIMARY,
    height: 12,
    width: 12
  }))), isMessageStatusEnabled ? /*#__PURE__*/React__default.createElement(MessageStatus, {
    className: "sendbird-channel-preview__content__upper__last-message-at",
    channel: channel,
    message: channel === null || channel === void 0 ? void 0 : channel.lastMessage,
    isDateSeparatorConsidered: false
  }) : /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-channel-preview__content__upper__last-message-at",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, getLastMessageCreatedAt({
    channel: channel,
    locale: dateLocale,
    stringSet: stringSet
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-channel-preview__content__lower"
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-channel-preview__content__lower__last-message",
    type: LabelTypography.BODY_2,
    color: LabelColors.ONBACKGROUND_3
  }, isChannelTyping && /*#__PURE__*/React__default.createElement(TypingIndicatorText, {
    members: channel === null || channel === void 0 ? void 0 : channel.getTypingUsers()
  }), !isChannelTyping && getLastMessage(channel) + (isEditedMessage(channel === null || channel === void 0 ? void 0 : channel.lastMessage) ? " ".concat(stringSet.MESSAGE_EDITED) : '')), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-channel-preview__content__lower__unread-message-count"
  }, isMentionEnabled && (channel === null || channel === void 0 ? void 0 : channel.unreadMentionCount) > 0 ? /*#__PURE__*/React__default.createElement(MentionUserLabel, {
    className: "sendbird-channel-preview__content__lower__unread-message-count__mention",
    color: "purple"
  }, '@') : null, getChannelUnreadMessageCount(channel) // return number
  ? /*#__PURE__*/React__default.createElement(Badge, {
    count: getChannelUnreadMessageCount(channel)
  }) : null))), !isMobile && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-channel-preview__action"
  }, renderChannelAction({
    channel: channel
  }))), showMobileLeave && isMobile && /*#__PURE__*/React__default.createElement(Modal, {
    className: "sendbird-channel-preview__leave--mobile",
    titleText: channelName,
    hideFooter: true,
    isCloseOnClickOutside: true,
    onCancel: function () {
      return setShowMobileLeave(false);
    }
  }, /*#__PURE__*/React__default.createElement(TextButton, {
    onClick: function () {
      onLeaveChannel();
      setShowMobileLeave(false);
    },
    className: "sendbird-channel-preview__leave-label--mobile"
  }, /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.SUBTITLE_1,
    color: LabelColors.ONBACKGROUND_1
  }, stringSet.CHANNEL_PREVIEW_MOBILE_LEAVE))));
};

export { ChannelPreview as default };
//# sourceMappingURL=ChannelPreview.js.map
