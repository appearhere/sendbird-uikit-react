import React__default, { useContext, useState } from 'react';
import useSendbirdStateContext from '../../useSendbirdStateContext.js';
import { useChannelSettingsContext } from '../context.js';
import { P as PlaceHolder, a as PlaceHolderTypes } from '../../index-88c5a220.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../../index-f60cbf08.js';
import { a as LocalizationContext } from '../../LocalizationContext-e5f35d14.js';
import Icon, { IconTypes, IconColors } from '../../ui/Icon.js';
import IconButton from '../../ui/IconButton.js';
import ChannelProfile from './ChannelProfile.js';
import AdminPannel from './ModerationPanel.js';
import LeaveChannel from './LeaveChannel.js';
import UserPanel from './UserPanel.js';
import '../../withSendbird.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import '../../UserProfileContext-517994e3.js';
import 'prop-types';
import '../../uuid-392016d0.js';
import '../../tslib.es6-75bd0528.js';
import '../../ui/Loader.js';
import '../../stringSet-42c0e16e.js';
import '../../index-5dcd7e0f.js';
import '../../ui/ChannelAvatar.js';
import '../../ui/Avatar.js';
import '../../ui/ImageRenderer.js';
import '../../utils-13fa0336.js';
import '../../ui/TextButton.js';
import '../../color-52d916b6.js';
import './EditDetailsModal.js';
import '../../ui/Modal.js';
import 'react-dom';
import '../../index-5ab5d8fe.js';
import '../../ui/Button.js';
import '../../MediaQueryContext-0ce6633d.js';
import '../../ui/Input.js';
import '../../ui/Accordion.js';
import '../../ui/AccordionGroup.js';
import '../../context-57341fcc.js';
import '../../utils-8a4a2ff6.js';
import '../../ui/Badge.js';
import '../../ui/ContextMenu.js';
import '../../ui/SortByRow.js';
import '../../index-105a85f4.js';
import '../../utils/message/getOutgoingMessageState.js';
import './UserListItem.js';
import '../../ui/MutedAvatarOverlay.js';
import '../../ui/UserProfile.js';
import '../../sendbirdSelectors.js';
import '../../topics-0560d548.js';
import '../../ui/UserListItem.js';
import '../../ui/Checkbox.js';
import '@sendbird/chat/groupChannel';
import '../../MemberList-e6061e27.js';

var ChannelSettingsUI = function (props) {
  var _a, _b;

  var stringSet = useContext(LocalizationContext).stringSet;
  var state = useSendbirdStateContext();
  var channelSettingStore = useChannelSettingsContext();

  var _c = useState(false),
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
    return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
      className: "sendbird-channel-settings__header"
    }, /*#__PURE__*/React__default.createElement(Label, {
      type: LabelTypography.H_2,
      color: LabelColors.ONBACKGROUND_1
    }, stringSet.CHANNEL_SETTING__HEADER__TITLE), /*#__PURE__*/React__default.createElement(Icon, {
      className: "sendbird-channel-settings__close-icon",
      type: IconTypes.CLOSE,
      height: "24px",
      width: "24px",
      onClick: function () {
        logger.info('ChannelSettings: Click close');
        onCloseClick === null || onCloseClick === void 0 ? void 0 : onCloseClick();
      }
    })), /*#__PURE__*/React__default.createElement("div", null, renderPlaceholderError ? renderPlaceholderError() : /*#__PURE__*/React__default.createElement(PlaceHolder, {
      type: PlaceHolderTypes.WRONG
    })));
  }

  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-channel-settings__header"
  }, /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.H_2,
    color: LabelColors.ONBACKGROUND_1
  }, stringSet.CHANNEL_SETTING__HEADER__TITLE), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-channel-settings__header-icon"
  }, /*#__PURE__*/React__default.createElement(IconButton, {
    width: "32px",
    height: "32px",
    onClick: function () {
      logger.info('ChannelSettings: Click close');
      onCloseClick === null || onCloseClick === void 0 ? void 0 : onCloseClick();
    }
  }, /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-channel-settings__close-icon",
    type: IconTypes.CLOSE,
    height: "22px",
    width: "22px"
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-channel-settings__scroll-area"
  }, (renderChannelProfile === null || renderChannelProfile === void 0 ? void 0 : renderChannelProfile()) || /*#__PURE__*/React__default.createElement(ChannelProfile, null), (renderModerationPanel === null || renderModerationPanel === void 0 ? void 0 : renderModerationPanel()) || ((channel === null || channel === void 0 ? void 0 : channel.myRole) === 'operator' ? /*#__PURE__*/React__default.createElement(AdminPannel, null) : /*#__PURE__*/React__default.createElement(UserPanel, null)), (renderLeaveChannel === null || renderLeaveChannel === void 0 ? void 0 : renderLeaveChannel()) || /*#__PURE__*/React__default.createElement("div", {
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
  }, /*#__PURE__*/React__default.createElement(Icon, {
    className: ['sendbird-channel-settings__panel-icon-left', 'sendbird-channel-settings__panel-icon__leave'].join(' '),
    type: IconTypes.LEAVE,
    fillColor: IconColors.ERROR,
    height: "24px",
    width: "24px"
  }), /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.SUBTITLE_1,
    color: LabelColors.ONBACKGROUND_1
  }, stringSet.CHANNEL_SETTING__LEAVE_CHANNEL__TITLE)), showLeaveChannelModal && /*#__PURE__*/React__default.createElement(LeaveChannel, {
    onCancel: function () {
      setShowLeaveChannelModal(false);
    },
    onSubmit: function () {
      setShowLeaveChannelModal(false);
      onCloseClick === null || onCloseClick === void 0 ? void 0 : onCloseClick();
    }
  })));
};

export { ChannelSettingsUI as default };
//# sourceMappingURL=ChannelSettingsUI.js.map
