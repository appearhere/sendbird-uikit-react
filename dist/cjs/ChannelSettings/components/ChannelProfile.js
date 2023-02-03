'use strict';

var React = require('react');
var LocalizationContext = require('../../LocalizationContext-f4281153.js');
var useSendbirdStateContext = require('../../useSendbirdStateContext.js');
var ChannelSettings_context = require('../context.js');
var ui_ChannelAvatar = require('../../ui/ChannelAvatar.js');
var ui_TextButton = require('../../ui/TextButton.js');
var ui_Label = require('../../index-4197d014.js');
var ChannelSettings_components_EditDetailsModal = require('./EditDetailsModal.js');
require('../../stringSet-2dfd148b.js');
require('../../index-d4bc012c.js');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('../../UserProfileContext-fd00d1bd.js');
require('prop-types');
require('../../uuid-2f4916c1.js');
require('../../ui/Avatar.js');
require('../../tslib.es6-d6068b10.js');
require('../../ui/ImageRenderer.js');
require('../../ui/Icon.js');
require('../../utils-6eb1ca73.js');
require('../../color-0fae7c8e.js');
require('../../ui/Modal.js');
require('react-dom');
require('../../index-1b132096.js');
require('../../ui/Button.js');
require('../../ui/IconButton.js');
require('../../MediaQueryContext-9a5566fc.js');
require('../../ui/Input.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var ChannelProfile = function () {
  var _a, _b, _c;

  var state = useSendbirdStateContext();
  var channelSettingStore = ChannelSettings_context.useChannelSettingsContext();
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;

  var _d = React.useState(false),
      showModal = _d[0],
      setShowModal = _d[1];

  var userId = (_a = state === null || state === void 0 ? void 0 : state.config) === null || _a === void 0 ? void 0 : _a.userId;
  var theme = ((_b = state === null || state === void 0 ? void 0 : state.config) === null || _b === void 0 ? void 0 : _b.theme) || 'light';
  var isOnline = (_c = state === null || state === void 0 ? void 0 : state.config) === null || _c === void 0 ? void 0 : _c.isOnline;
  var disabled = !isOnline;
  var channel = channelSettingStore.channel;

  var getChannelName = function () {
    if ((channel === null || channel === void 0 ? void 0 : channel.name) && (channel === null || channel === void 0 ? void 0 : channel.name) !== 'Group Channel') {
      return channel.name;
    }

    if ((channel === null || channel === void 0 ? void 0 : channel.name) === 'Group Channel' || !(channel === null || channel === void 0 ? void 0 : channel.name)) {
      return ((channel === null || channel === void 0 ? void 0 : channel.members) || []).map(function (member) {
        return member.nickname || stringSet.NO_NAME;
      }).join(', ');
    }

    return stringSet.NO_TITLE;
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-channel-profile"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-channel-profile--inner"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-channel-profile__avatar"
  }, /*#__PURE__*/React__default["default"].createElement(ui_ChannelAvatar, {
    channel: channel,
    userId: userId,
    theme: theme,
    width: 80,
    height: 80
  })), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-channel-profile__title",
    type: ui_Label.LabelTypography.SUBTITLE_2,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, getChannelName()), /*#__PURE__*/React__default["default"].createElement(ui_TextButton, {
    disabled: disabled,
    className: "sendbird-channel-profile__edit",
    onClick: function () {
      if (disabled) {
        return;
      }

      setShowModal(true);
    },
    disableUnderline: true
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.BUTTON_1,
    color: disabled ? ui_Label.LabelColors.ONBACKGROUND_2 : ui_Label.LabelColors.PRIMARY
  }, stringSet.CHANNEL_SETTING__PROFILE__EDIT)), showModal && /*#__PURE__*/React__default["default"].createElement(ChannelSettings_components_EditDetailsModal, {
    onCancel: function () {
      return setShowModal(false);
    },
    onSubmit: function () {
      return setShowModal(false);
    }
  })));
};

module.exports = ChannelProfile;
//# sourceMappingURL=ChannelProfile.js.map
