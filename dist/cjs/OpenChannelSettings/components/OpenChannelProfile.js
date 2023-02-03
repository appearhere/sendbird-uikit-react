'use strict';

var React = require('react');
var LocalizationContext = require('../../LocalizationContext-f4281153.js');
var ui_Label = require('../../index-4197d014.js');
var ui_TextButton = require('../../ui/TextButton.js');
var ui_OpenChannelAvatar = require('../../ui/OpenChannelAvatar.js');
var OpenChannelSettings_components_EditDetailsModal = require('./EditDetailsModal.js');
var useSendbirdStateContext = require('../../useSendbirdStateContext.js');
var OpenChannelSettings_context = require('../context.js');
require('../../stringSet-2dfd148b.js');
require('../../index-d4bc012c.js');
require('prop-types');
require('../../tslib.es6-d6068b10.js');
require('../../color-0fae7c8e.js');
require('../../ui/Avatar.js');
require('../../ui/ImageRenderer.js');
require('../../ui/Icon.js');
require('../../uuid-2f4916c1.js');
require('../../utils-6eb1ca73.js');
require('../../topics-085b5602.js');
require('../../ui/Modal.js');
require('react-dom');
require('../../index-1b132096.js');
require('../../ui/Button.js');
require('../../ui/IconButton.js');
require('../../MediaQueryContext-9a5566fc.js');
require('../../ui/Input.js');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('@sendbird/chat/openChannel');
require('../../UserProfileContext-fd00d1bd.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function ChannelProfile() {
  var _a, _b;

  var globalState = useSendbirdStateContext();
  var disabled = !((_a = globalState === null || globalState === void 0 ? void 0 : globalState.config) === null || _a === void 0 ? void 0 : _a.isOnline);
  var theme = (_b = globalState === null || globalState === void 0 ? void 0 : globalState.config) === null || _b === void 0 ? void 0 : _b.theme;
  var channel = OpenChannelSettings_context.useOpenChannelSettingsContext().channel;
  var title = channel === null || channel === void 0 ? void 0 : channel.name;

  var _c = React.useState(false),
      showModal = _c[0],
      setShowModal = _c[1];

  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-profile"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-profile--inner"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-profile__avatar"
  }, /*#__PURE__*/React__default["default"].createElement(ui_OpenChannelAvatar, {
    channel: channel,
    theme: theme,
    height: 80,
    width: 80
  })), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.SUBTITLE_2,
    color: ui_Label.LabelColors.ONBACKGROUND_1,
    className: "sendbird-openchannel-profile__title"
  }, title || stringSet.OPEN_CHANNEL_SETTINGS__NO_TITLE), /*#__PURE__*/React__default["default"].createElement(ui_TextButton, {
    disabled: disabled,
    className: "sendbird-openchannel-profile__edit",
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
  }, stringSet.CHANNEL_SETTING__PROFILE__EDIT)), showModal && /*#__PURE__*/React__default["default"].createElement(OpenChannelSettings_components_EditDetailsModal, {
    onCancel: function () {
      return setShowModal(false);
    }
  })));
}

module.exports = ChannelProfile;
//# sourceMappingURL=OpenChannelProfile.js.map
