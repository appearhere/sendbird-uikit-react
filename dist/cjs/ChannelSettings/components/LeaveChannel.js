'use strict';

var React = require('react');
var useSendbirdStateContext = require('../../useSendbirdStateContext.js');
var ChannelSettings_context = require('../context.js');
var utils = require('../../utils-a9158c72.js');
var ui_Modal = require('../../ui/Modal.js');
var LocalizationContext = require('../../LocalizationContext-f4281153.js');
var MediaQueryContext = require('../../MediaQueryContext-9a5566fc.js');
var ui_TextButton = require('../../ui/TextButton.js');
var ui_Label = require('../../index-4197d014.js');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('../../UserProfileContext-fd00d1bd.js');
require('prop-types');
require('../../uuid-2f4916c1.js');
require('react-dom');
require('../../index-1b132096.js');
require('../../ui/Button.js');
require('../../tslib.es6-d6068b10.js');
require('../../ui/Icon.js');
require('../../ui/IconButton.js');
require('../../stringSet-2dfd148b.js');
require('../../index-d4bc012c.js');
require('../../color-0fae7c8e.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var LeaveChannel = function (props) {
  var _a, _b;

  var _c = props.onSubmit,
      onSubmit = _c === void 0 ? utils.noop : _c,
      _d = props.onCancel,
      onCancel = _d === void 0 ? utils.noop : _d;

  var _e = ChannelSettings_context.useChannelSettingsContext(),
      channel = _e.channel,
      onLeaveChannel = _e.onLeaveChannel;

  var stringSet = LocalizationContext.useLocalization().stringSet;
  var state = useSendbirdStateContext();
  var logger = (_a = state === null || state === void 0 ? void 0 : state.config) === null || _a === void 0 ? void 0 : _a.logger;
  var isOnline = (_b = state === null || state === void 0 ? void 0 : state.config) === null || _b === void 0 ? void 0 : _b.isOnline;
  var isMobile = MediaQueryContext.useMediaQueryContext().isMobile;

  var getChannelName = function (channel) {
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

  if (isMobile) {
    return /*#__PURE__*/React__default["default"].createElement(ui_Modal["default"], {
      className: "sendbird-channel-settings__leave--mobile",
      titleText: getChannelName(channel),
      hideFooter: true,
      isCloseOnClickOutside: true,
      onCancel: onCancel
    }, /*#__PURE__*/React__default["default"].createElement(ui_TextButton, {
      onClick: function () {
        logger.info('ChannelSettings: Leaving channel', channel);
        channel === null || channel === void 0 ? void 0 : channel.leave().then(function () {
          logger.info('ChannelSettings: Leaving channel successful!', channel);
          onLeaveChannel();
        });
      },
      className: "sendbird-channel-settings__leave-label--mobile"
    }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
      type: ui_Label.LabelTypography.SUBTITLE_1,
      color: ui_Label.LabelColors.ONBACKGROUND_1
    }, stringSet.CHANNEL_PREVIEW_MOBILE_LEAVE)));
  }

  return /*#__PURE__*/React__default["default"].createElement(ui_Modal["default"], {
    isFullScreenOnMobile: true,
    disabled: !isOnline,
    onCancel: onCancel,
    onSubmit: function () {
      logger.info('ChannelSettings: Leaving channel', channel);
      channel === null || channel === void 0 ? void 0 : channel.leave().then(function () {
        logger.info('ChannelSettings: Leaving channel successful!', channel); // is for backward compactability

        if (onLeaveChannel) {
          onLeaveChannel();
        } else {
          onSubmit();
        }
      });
    },
    submitText: stringSet.MODAL__LEAVE_CHANNEL__FOOTER,
    titleText: stringSet.MODAL__LEAVE_CHANNEL__TITLE
  });
};

module.exports = LeaveChannel;
//# sourceMappingURL=LeaveChannel.js.map
