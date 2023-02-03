import React__default from 'react';
import useSendbirdStateContext from '../../useSendbirdStateContext.js';
import { useChannelSettingsContext } from '../context.js';
import { n as noop } from '../../utils-8a4a2ff6.js';
import Modal from '../../ui/Modal.js';
import { u as useLocalization } from '../../LocalizationContext-e5f35d14.js';
import { u as useMediaQueryContext } from '../../MediaQueryContext-0ce6633d.js';
import TextButton from '../../ui/TextButton.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../../index-f60cbf08.js';
import '../../withSendbird.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import '../../UserProfileContext-517994e3.js';
import 'prop-types';
import '../../uuid-392016d0.js';
import 'react-dom';
import '../../index-5ab5d8fe.js';
import '../../ui/Button.js';
import '../../tslib.es6-75bd0528.js';
import '../../ui/Icon.js';
import '../../ui/IconButton.js';
import '../../stringSet-42c0e16e.js';
import '../../index-5dcd7e0f.js';
import '../../color-52d916b6.js';

var LeaveChannel = function (props) {
  var _a, _b;

  var _c = props.onSubmit,
      onSubmit = _c === void 0 ? noop : _c,
      _d = props.onCancel,
      onCancel = _d === void 0 ? noop : _d;

  var _e = useChannelSettingsContext(),
      channel = _e.channel,
      onLeaveChannel = _e.onLeaveChannel;

  var stringSet = useLocalization().stringSet;
  var state = useSendbirdStateContext();
  var logger = (_a = state === null || state === void 0 ? void 0 : state.config) === null || _a === void 0 ? void 0 : _a.logger;
  var isOnline = (_b = state === null || state === void 0 ? void 0 : state.config) === null || _b === void 0 ? void 0 : _b.isOnline;
  var isMobile = useMediaQueryContext().isMobile;

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
    return /*#__PURE__*/React__default.createElement(Modal, {
      className: "sendbird-channel-settings__leave--mobile",
      titleText: getChannelName(channel),
      hideFooter: true,
      isCloseOnClickOutside: true,
      onCancel: onCancel
    }, /*#__PURE__*/React__default.createElement(TextButton, {
      onClick: function () {
        logger.info('ChannelSettings: Leaving channel', channel);
        channel === null || channel === void 0 ? void 0 : channel.leave().then(function () {
          logger.info('ChannelSettings: Leaving channel successful!', channel);
          onLeaveChannel();
        });
      },
      className: "sendbird-channel-settings__leave-label--mobile"
    }, /*#__PURE__*/React__default.createElement(Label, {
      type: LabelTypography.SUBTITLE_1,
      color: LabelColors.ONBACKGROUND_1
    }, stringSet.CHANNEL_PREVIEW_MOBILE_LEAVE)));
  }

  return /*#__PURE__*/React__default.createElement(Modal, {
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

export { LeaveChannel as default };
//# sourceMappingURL=LeaveChannel.js.map
