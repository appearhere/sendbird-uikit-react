'use strict';

var React = require('react');
var useSendbirdStateContext = require('../../useSendbirdStateContext.js');
var ChannelSettings_context = require('../context.js');
var ui_PlaceHolder = require('../../index-6b9230ae.js');
var ui_Label = require('../../index-4197d014.js');
var LocalizationContext = require('../../LocalizationContext-f4281153.js');
var ui_Icon = require('../../ui/Icon.js');
var ui_IconButton = require('../../ui/IconButton.js');
var ChannelSettings_components_ChannelProfile = require('./ChannelProfile.js');
var ChannelSettings_components_ModerationPanel = require('./ModerationPanel.js');
var ChannelSettings_components_LeaveChannel = require('./LeaveChannel.js');
var ChannelSettings_components_UserPanel = require('./UserPanel.js');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('../../UserProfileContext-fd00d1bd.js');
require('prop-types');
require('../../uuid-2f4916c1.js');
require('../../tslib.es6-d6068b10.js');
require('../../ui/Loader.js');
require('../../stringSet-2dfd148b.js');
require('../../index-d4bc012c.js');
require('../../ui/ChannelAvatar.js');
require('../../ui/Avatar.js');
require('../../ui/ImageRenderer.js');
require('../../utils-6eb1ca73.js');
require('../../ui/TextButton.js');
require('../../color-0fae7c8e.js');
require('./EditDetailsModal.js');
require('../../ui/Modal.js');
require('react-dom');
require('../../index-1b132096.js');
require('../../ui/Button.js');
require('../../MediaQueryContext-9a5566fc.js');
require('../../ui/Input.js');
require('../../ui/Accordion.js');
require('../../ui/AccordionGroup.js');
require('../../context-4e494ce5.js');
require('../../utils-a9158c72.js');
require('../../ui/Badge.js');
require('../../ui/ContextMenu.js');
require('../../ui/SortByRow.js');
require('../../index-d05a5cae.js');
require('../../utils/message/getOutgoingMessageState.js');
require('./UserListItem.js');
require('../../ui/MutedAvatarOverlay.js');
require('../../ui/UserProfile.js');
require('../../sendbirdSelectors.js');
require('../../topics-085b5602.js');
require('../../ui/UserListItem.js');
require('../../ui/Checkbox.js');
require('@sendbird/chat/groupChannel');
require('../../MemberList-8ba5ffba.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var ChannelSettingsUI = function (props) {
  var _a, _b;

  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  var state = useSendbirdStateContext();
  var channelSettingStore = ChannelSettings_context.useChannelSettingsContext();

  var _c = React.useState(false),
      showLeaveChannelModal = _c[0],
      setShowLeaveChannelModal = _c[1];

  var isOnline = (_a = state === null || state === void 0 ? void 0 : state.config) === null || _a === void 0 ? void 0 : _a.isOnline;
  var logger = (_b = state === null || state === void 0 ? void 0 : state.config) === null || _b === void 0 ? void 0 : _b.logger;
  var channel = channelSettingStore.channel,
      invalidChannel = channelSettingStore.invalidChannel,
      onCloseClick = channelSettingStore.onCloseClick;
  var renderPlaceholderError = props.renderPlaceholderError,
      renderChannelProfile = props.renderChannelProfile,
      renderModerationPanel = props.renderModerationPanel,
      renderLeaveChannel = props.renderLeaveChannel;

  if (!channel || invalidChannel) {
    return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "sendbird-channel-settings__header"
    }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
      type: ui_Label.LabelTypography.H_2,
      color: ui_Label.LabelColors.ONBACKGROUND_1
    }, stringSet.CHANNEL_SETTING__HEADER__TITLE), /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
      className: "sendbird-channel-settings__close-icon",
      type: ui_Icon.IconTypes.CLOSE,
      height: "24px",
      width: "24px",
      onClick: function () {
        logger.info('ChannelSettings: Click close');
        onCloseClick === null || onCloseClick === void 0 ? void 0 : onCloseClick();
      }
    })), /*#__PURE__*/React__default["default"].createElement("div", null, renderPlaceholderError ? renderPlaceholderError() : /*#__PURE__*/React__default["default"].createElement(ui_PlaceHolder.PlaceHolder, {
      type: ui_PlaceHolder.PlaceHolderTypes.WRONG
    })));
  }

  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-channel-settings__header"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.H_2,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, stringSet.CHANNEL_SETTING__HEADER__TITLE), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-channel-settings__header-icon"
  }, /*#__PURE__*/React__default["default"].createElement(ui_IconButton, {
    width: "32px",
    height: "32px",
    onClick: function () {
      logger.info('ChannelSettings: Click close');
      onCloseClick === null || onCloseClick === void 0 ? void 0 : onCloseClick();
    }
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: "sendbird-channel-settings__close-icon",
    type: ui_Icon.IconTypes.CLOSE,
    height: "22px",
    width: "22px"
  })))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-channel-settings__scroll-area"
  }, (renderChannelProfile === null || renderChannelProfile === void 0 ? void 0 : renderChannelProfile()) || /*#__PURE__*/React__default["default"].createElement(ChannelSettings_components_ChannelProfile, null), (renderModerationPanel === null || renderModerationPanel === void 0 ? void 0 : renderModerationPanel()) || ((channel === null || channel === void 0 ? void 0 : channel.myRole) === 'operator' ? /*#__PURE__*/React__default["default"].createElement(ChannelSettings_components_ModerationPanel, null) : /*#__PURE__*/React__default["default"].createElement(ChannelSettings_components_UserPanel, null)), (renderLeaveChannel === null || renderLeaveChannel === void 0 ? void 0 : renderLeaveChannel()) || /*#__PURE__*/React__default["default"].createElement("div", {
    className: ['sendbird-channel-settings__panel-item', 'sendbird-channel-settings__leave-channel', !isOnline ? 'sendbird-channel-settings__panel-item__disabled' : ''].join(' '),
    role: "button",
    onKeyDown: function () {
      if (!isOnline) {
        return;
      }

      setShowLeaveChannelModal(true);
    },
    onClick: function () {
      if (!isOnline) {
        return;
      }

      setShowLeaveChannelModal(true);
    },
    tabIndex: 0
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: ['sendbird-channel-settings__panel-icon-left', 'sendbird-channel-settings__panel-icon__leave'].join(' '),
    type: ui_Icon.IconTypes.LEAVE,
    fillColor: ui_Icon.IconColors.ERROR,
    height: "24px",
    width: "24px"
  }), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.SUBTITLE_1,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, stringSet.CHANNEL_SETTING__LEAVE_CHANNEL__TITLE)), showLeaveChannelModal && /*#__PURE__*/React__default["default"].createElement(ChannelSettings_components_LeaveChannel, {
    onCancel: function () {
      setShowLeaveChannelModal(false);
    },
    onSubmit: function () {
      setShowLeaveChannelModal(false);
      onCloseClick === null || onCloseClick === void 0 ? void 0 : onCloseClick();
    }
  })));
};

module.exports = ChannelSettingsUI;
//# sourceMappingURL=ChannelSettingsUI.js.map
