'use strict';

var React = require('react');
var utils = require('../../utils-88ce8023.js');
var ui_Label = require('../../index-4197d014.js');
var ui_Icon = require('../../ui/Icon.js');
var ui_IconButton = require('../../ui/IconButton.js');
var ui_ChannelAvatar = require('../../ui/ChannelAvatar.js');
var LocalizationContext = require('../../LocalizationContext-f4281153.js');
var useSendbirdStateContext = require('../../useSendbirdStateContext.js');
var Channel_context = require('../../ChannelProvider-4d043480.js');
var MediaQueryContext = require('../../MediaQueryContext-9a5566fc.js');
var utils$1 = require('../../utils-a9158c72.js');
require('prop-types');
require('../../stringSet-2dfd148b.js');
require('../../tslib.es6-d6068b10.js');
require('../../ui/Avatar.js');
require('../../ui/ImageRenderer.js');
require('../../uuid-2f4916c1.js');
require('../../utils-6eb1ca73.js');
require('../../index-d4bc012c.js');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('../../UserProfileContext-fd00d1bd.js');
require('../../index-5977bdd5.js');
require('../../topics-085b5602.js');
require('../../index-d05a5cae.js');
require('../../utils/message/getOutgoingMessageState.js');
require('../../compareIds-5d186d0d.js');
require('../../const-43cebab9.js');
require('@sendbird/chat/groupChannel');
require('@sendbird/chat/message');
require('../../ui/ContextMenu.js');
require('react-dom');
require('../../ui/SortByRow.js');
require('../../ui/ReactionButton.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var ChannelHeader = function () {
  var _a, _b, _c;

  var globalStore = useSendbirdStateContext();
  var userId = (_a = globalStore === null || globalStore === void 0 ? void 0 : globalStore.config) === null || _a === void 0 ? void 0 : _a.userId;
  var theme = (_b = globalStore === null || globalStore === void 0 ? void 0 : globalStore.config) === null || _b === void 0 ? void 0 : _b.theme;
  var channelStore = Channel_context.useChannelContext();
  var isMobile = MediaQueryContext.useMediaQueryContext().isMobile;
  var currentGroupChannel = channelStore.currentGroupChannel,
      showSearchIcon = channelStore.showSearchIcon,
      onSearchClick = channelStore.onSearchClick,
      onChatHeaderActionClick = channelStore.onChatHeaderActionClick,
      _d = channelStore.onBackClick,
      onBackClick = _d === void 0 ? utils$1.noop : _d;
  var subTitle = (currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.members) && ((_c = currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.members) === null || _c === void 0 ? void 0 : _c.length) !== 2;
  var isMuted = (currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.myMutedState) === "muted";
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-chat-header"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-chat-header__left"
  }, isMobile && /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: "sendbird-chat-header__icon_back",
    onClick: onBackClick,
    fillColor: ui_Icon.IconColors.PRIMARY,
    width: "24px",
    height: "24px",
    type: ui_Icon.IconTypes.ARROW_LEFT
  }), /*#__PURE__*/React__default["default"].createElement(ui_ChannelAvatar, {
    theme: theme,
    channel: currentGroupChannel,
    userId: userId,
    height: 32,
    width: 32
  }), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-chat-header__left__title",
    type: ui_Label.LabelTypography.H_2,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, utils.getChannelTitle(currentGroupChannel, userId, stringSet)), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-chat-header__left__subtitle",
    type: ui_Label.LabelTypography.BODY_1,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, subTitle)), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-chat-header__right"
  }, (typeof isMuted === 'string' && isMuted === 'true' || typeof isMuted === 'boolean' && isMuted) && /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: "sendbird-chat-header__right__mute",
    type: ui_Icon.IconTypes.NOTIFICATIONS_OFF_FILLED,
    width: "24px",
    height: "24px"
  }), showSearchIcon && /*#__PURE__*/React__default["default"].createElement(ui_IconButton, {
    className: "sendbird-chat-header__right__search",
    width: "32px",
    height: "32px",
    onClick: onSearchClick
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.SEARCH,
    fillColor: ui_Icon.IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  })), /*#__PURE__*/React__default["default"].createElement(ui_IconButton, {
    className: "sendbird-chat-header__right__info",
    width: "32px",
    height: "32px",
    onClick: onChatHeaderActionClick
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.INFO,
    fillColor: ui_Icon.IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  }))));
};

module.exports = ChannelHeader;
//# sourceMappingURL=ChannelHeader.js.map
