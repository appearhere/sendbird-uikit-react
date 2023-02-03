import React__default, { useContext } from 'react';
import useSendbirdStateContext from '../../useSendbirdStateContext.js';
import { useOpenChannelSettingsContext } from '../context.js';
import { U as UserProfileProvider } from '../../UserProfileContext-517994e3.js';
import { a as LocalizationContext } from '../../LocalizationContext-e5f35d14.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../../index-f60cbf08.js';
import Icon, { IconTypes } from '../../ui/Icon.js';
import { P as PlaceHolder, b as PlaceHolderTypes } from '../../index-88c5a220.js';
import { OperatorUI } from './OperatorUI.js';
import { P as ParticipantList } from '../../index-88678962.js';
import '../../withSendbird.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import '@sendbird/chat/openChannel';
import '../../uuid-392016d0.js';
import 'prop-types';
import '../../stringSet-42c0e16e.js';
import '../../index-5dcd7e0f.js';
import '../../tslib.es6-75bd0528.js';
import '../../ui/Loader.js';
import './OpenChannelProfile.js';
import '../../ui/TextButton.js';
import '../../color-52d916b6.js';
import '../../ui/OpenChannelAvatar.js';
import '../../ui/Avatar.js';
import '../../ui/ImageRenderer.js';
import '../../utils-13fa0336.js';
import './EditDetailsModal.js';
import '../../topics-0560d548.js';
import '../../ui/Modal.js';
import 'react-dom';
import '../../index-5ab5d8fe.js';
import '../../ui/Button.js';
import '../../ui/IconButton.js';
import '../../MediaQueryContext-0ce6633d.js';
import '../../ui/Input.js';
import '../../ui/Accordion.js';
import '../../ui/AccordionGroup.js';
import '../../context-57341fcc.js';
import '../../utils-8a4a2ff6.js';
import '../../ui/ContextMenu.js';
import '../../ui/SortByRow.js';
import '../../index-105a85f4.js';
import '../../utils/message/getOutgoingMessageState.js';
import '../../ui/UserListItem.js';
import '../../ui/MutedAvatarOverlay.js';
import '../../ui/Checkbox.js';
import '../../ui/UserProfile.js';
import '../../sendbirdSelectors.js';

function InvalidChannel(_a) {
  var onCloseClick = _a.onCloseClick;
  var stringSet = useContext(LocalizationContext).stringSet;
  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-settings"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-settings__header"
  }, /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.H_2,
    color: LabelColors.ONBACKGROUND_1
  }, stringSet.CHANNEL_SETTING__HEADER__TITLE), /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.CLOSE,
    className: "sendbird-openchannel-settings__close-icon",
    height: "24px",
    width: "24px",
    onClick: function () {
      onCloseClick();
    }
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-settings__placeholder"
  }, /*#__PURE__*/React__default.createElement(PlaceHolder, {
    type: PlaceHolderTypes.WRONG
  })));
}

var OpenChannelUI = function (_a) {
  var _b, _c, _d;

  var renderOperatorUI = _a.renderOperatorUI,
      renderParticipantList = _a.renderParticipantList;

  var _e = useOpenChannelSettingsContext(),
      channel = _e.channel,
      onCloseClick = _e.onCloseClick,
      isChannelInitialized = _e.isChannelInitialized;

  var globalStore = useSendbirdStateContext();
  var logger = (_b = globalStore === null || globalStore === void 0 ? void 0 : globalStore.config) === null || _b === void 0 ? void 0 : _b.logger;
  var user = (_d = (_c = globalStore === null || globalStore === void 0 ? void 0 : globalStore.stores) === null || _c === void 0 ? void 0 : _c.userStore) === null || _d === void 0 ? void 0 : _d.user;
  var stringSet = useContext(LocalizationContext).stringSet;

  if (isChannelInitialized && !channel) {
    return /*#__PURE__*/React__default.createElement(InvalidChannel, {
      onCloseClick: function () {
        logger.info('OpenChannelSettings: Click close');

        if (onCloseClick) {
          onCloseClick();
        }
      }
    });
  }

  return /*#__PURE__*/React__default.createElement(UserProfileProvider, {
    isOpenChannel: true
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-settings"
  }, (channel === null || channel === void 0 ? void 0 : channel.isOperator(user)) && ((renderOperatorUI === null || renderOperatorUI === void 0 ? void 0 : renderOperatorUI()) || /*#__PURE__*/React__default.createElement(OperatorUI, null)), !(channel === null || channel === void 0 ? void 0 : channel.isOperator(user)) && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-settings__participant"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-settings__header"
  }, /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.H_2,
    color: LabelColors.ONBACKGROUND_1
  }, stringSet.OPEN_CHANNEL_SETTINGS__PARTICIPANTS_TITLE), /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.CLOSE,
    className: "sendbird-openchannel-settings__close-icon",
    height: "24px",
    width: "24px",
    onClick: function () {
      onCloseClick();
    }
  })), (renderParticipantList === null || renderParticipantList === void 0 ? void 0 : renderParticipantList()) || /*#__PURE__*/React__default.createElement(ParticipantList, null))));
};

export { OpenChannelUI as default };
//# sourceMappingURL=OpenChannelSettingsUI.js.map
