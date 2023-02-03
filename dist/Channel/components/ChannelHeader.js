import React__default, { useContext } from 'react';
import { g as getChannelTitle } from '../../utils-5cd54b1d.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../../index-f60cbf08.js';
import Icon, { IconColors, IconTypes } from '../../ui/Icon.js';
import IconButton from '../../ui/IconButton.js';
import ChannelAvatar from '../../ui/ChannelAvatar.js';
import { a as LocalizationContext } from '../../LocalizationContext-e5f35d14.js';
import useSendbirdStateContext from '../../useSendbirdStateContext.js';
import { u as useChannelContext } from '../../ChannelProvider-3f08837d.js';
import { u as useMediaQueryContext } from '../../MediaQueryContext-0ce6633d.js';
import { n as noop } from '../../utils-8a4a2ff6.js';
import 'prop-types';
import '../../stringSet-42c0e16e.js';
import '../../tslib.es6-75bd0528.js';
import '../../ui/Avatar.js';
import '../../ui/ImageRenderer.js';
import '../../uuid-392016d0.js';
import '../../utils-13fa0336.js';
import '../../index-5dcd7e0f.js';
import '../../withSendbird.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import '../../UserProfileContext-517994e3.js';
import '../../index-229a0736.js';
import '../../topics-0560d548.js';
import '../../index-105a85f4.js';
import '../../utils/message/getOutgoingMessageState.js';
import '../../compareIds-fd8fd31e.js';
import '../../const-03d71a8a.js';
import '@sendbird/chat/groupChannel';
import '@sendbird/chat/message';
import '../../ui/ContextMenu.js';
import 'react-dom';
import '../../ui/SortByRow.js';
import '../../ui/ReactionButton.js';

var ChannelHeader = function () {
  var _a, _b, _c;

  var globalStore = useSendbirdStateContext();
  var userId = (_a = globalStore === null || globalStore === void 0 ? void 0 : globalStore.config) === null || _a === void 0 ? void 0 : _a.userId;
  var theme = (_b = globalStore === null || globalStore === void 0 ? void 0 : globalStore.config) === null || _b === void 0 ? void 0 : _b.theme;
  var channelStore = useChannelContext();
  var isMobile = useMediaQueryContext().isMobile;
  var currentGroupChannel = channelStore.currentGroupChannel,
      showSearchIcon = channelStore.showSearchIcon,
      onSearchClick = channelStore.onSearchClick,
      onChatHeaderActionClick = channelStore.onChatHeaderActionClick,
      _d = channelStore.onBackClick,
      onBackClick = _d === void 0 ? noop : _d;
  var subTitle = (currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.members) && ((_c = currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.members) === null || _c === void 0 ? void 0 : _c.length) !== 2;
  var isMuted = (currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.myMutedState) === "muted";
  var stringSet = useContext(LocalizationContext).stringSet;
  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-chat-header"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-chat-header__left"
  }, isMobile && /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-chat-header__icon_back",
    onClick: onBackClick,
    fillColor: IconColors.PRIMARY,
    width: "24px",
    height: "24px",
    type: IconTypes.ARROW_LEFT
  }), /*#__PURE__*/React__default.createElement(ChannelAvatar, {
    theme: theme,
    channel: currentGroupChannel,
    userId: userId,
    height: 32,
    width: 32
  }), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-chat-header__left__title",
    type: LabelTypography.H_2,
    color: LabelColors.ONBACKGROUND_1
  }, getChannelTitle(currentGroupChannel, userId, stringSet)), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-chat-header__left__subtitle",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_2
  }, subTitle)), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-chat-header__right"
  }, (typeof isMuted === 'string' && isMuted === 'true' || typeof isMuted === 'boolean' && isMuted) && /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-chat-header__right__mute",
    type: IconTypes.NOTIFICATIONS_OFF_FILLED,
    width: "24px",
    height: "24px"
  }), showSearchIcon && /*#__PURE__*/React__default.createElement(IconButton, {
    className: "sendbird-chat-header__right__search",
    width: "32px",
    height: "32px",
    onClick: onSearchClick
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.SEARCH,
    fillColor: IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  })), /*#__PURE__*/React__default.createElement(IconButton, {
    className: "sendbird-chat-header__right__info",
    width: "32px",
    height: "32px",
    onClick: onChatHeaderActionClick
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.INFO,
    fillColor: IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  }))));
};

export { ChannelHeader as default };
//# sourceMappingURL=ChannelHeader.js.map
