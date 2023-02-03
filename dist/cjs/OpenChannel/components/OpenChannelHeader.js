'use strict';

var React = require('react');
var ui_Avatar = require('../../ui/Avatar.js');
var ui_Icon = require('../../ui/Icon.js');
var ui_IconButton = require('../../ui/IconButton.js');
var ui_Label = require('../../index-4197d014.js');
var LocalizationContext = require('../../LocalizationContext-f4281153.js');
var OpenChannel_context = require('../../OpenChannelProvider-b1de2e4c.js');
var MediaQueryContext = require('../../MediaQueryContext-9a5566fc.js');
require('../../tslib.es6-d6068b10.js');
require('../../ui/ImageRenderer.js');
require('../../uuid-2f4916c1.js');
require('prop-types');
require('../../stringSet-2dfd148b.js');
require('../../index-d4bc012c.js');
require('../../index-5977bdd5.js');
require('../../UserProfileContext-fd00d1bd.js');
require('../../compareIds-5d186d0d.js');
require('../../topics-085b5602.js');
require('@sendbird/chat');
require('@sendbird/chat/openChannel');
require('../../useSendbirdStateContext.js');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function OpenchannelConversationHeader() {
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;

  var _a = OpenChannel_context.useOpenChannelContext(),
      currentOpenChannel = _a.currentOpenChannel,
      onChatHeaderActionClick = _a.onChatHeaderActionClick,
      amIOperator = _a.amIOperator,
      onBackClick = _a.onBackClick;

  var title = currentOpenChannel === null || currentOpenChannel === void 0 ? void 0 : currentOpenChannel.name;
  var subTitle = "".concat(OpenChannel_context.kFormatter(currentOpenChannel === null || currentOpenChannel === void 0 ? void 0 : currentOpenChannel.participantCount), " ").concat(stringSet.OPEN_CHANNEL_CONVERSATION__TITLE_PARTICIPANTS);
  var coverImage = currentOpenChannel === null || currentOpenChannel === void 0 ? void 0 : currentOpenChannel.coverUrl;
  var isMobile = MediaQueryContext.useMediaQueryContext().isMobile;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-conversation-header"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-conversation-header__left"
  }, isMobile && /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: "sendbird-oepnchannel-header__icon_back",
    onClick: onBackClick,
    fillColor: ui_Icon.IconColors.PRIMARY,
    width: "24px",
    height: "24px",
    type: ui_Icon.IconTypes.ARROW_LEFT
  }), coverImage ? /*#__PURE__*/React__default["default"].createElement(ui_Avatar["default"], {
    className: "sendbird-openchannel-conversation-header__left__cover-image",
    src: coverImage,
    alt: "channel cover image",
    width: "32px",
    height: "32px"
  }) : /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-conversation-header__left__cover-image--icon",
    style: {
      width: 32,
      height: 32
    }
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.CHANNELS,
    fillColor: ui_Icon.IconColors.CONTENT,
    width: "18px",
    height: "18px"
  })), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-openchannel-conversation-header__left__title",
    type: ui_Label.LabelTypography.H_2,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, title || stringSet.NO_TITLE), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-openchannel-conversation-header__left__sub-title",
    type: ui_Label.LabelTypography.BODY_2,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, subTitle || stringSet.NO_TITLE)), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-conversation-header__right"
  }, /*#__PURE__*/React__default["default"].createElement(ui_IconButton, {
    className: "sendbird-openchannel-conversation-header__right__trigger",
    width: "32px",
    height: "32px",
    onClick: onChatHeaderActionClick
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: amIOperator ? ui_Icon.IconTypes.INFO : ui_Icon.IconTypes.MEMBERS,
    fillColor: ui_Icon.IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  }))));
}

module.exports = OpenchannelConversationHeader;
//# sourceMappingURL=OpenChannelHeader.js.map
