import React__default from 'react';
import OpenChannelUI from './OpenChannelSettings/components/OpenChannelSettingsUI.js';
import { OpenChannelSettingsProvider } from './OpenChannelSettings/context.js';
import './useSendbirdStateContext.js';
import './withSendbird.js';
import './_rollupPluginBabelHelpers-fe256514.js';
import './UserProfileContext-517994e3.js';
import 'prop-types';
import './LocalizationContext-e5f35d14.js';
import './stringSet-42c0e16e.js';
import './index-5dcd7e0f.js';
import './index-f60cbf08.js';
import './ui/Icon.js';
import './index-88c5a220.js';
import './tslib.es6-75bd0528.js';
import './ui/Loader.js';
import './OpenChannelSettings/components/OperatorUI.js';
import './OpenChannelSettings/components/OpenChannelProfile.js';
import './ui/TextButton.js';
import './color-52d916b6.js';
import './ui/OpenChannelAvatar.js';
import './ui/Avatar.js';
import './ui/ImageRenderer.js';
import './uuid-392016d0.js';
import './utils-13fa0336.js';
import './OpenChannelSettings/components/EditDetailsModal.js';
import './topics-0560d548.js';
import './ui/Modal.js';
import 'react-dom';
import './index-5ab5d8fe.js';
import './ui/Button.js';
import './ui/IconButton.js';
import './MediaQueryContext-0ce6633d.js';
import './ui/Input.js';
import './index-88678962.js';
import './ui/ContextMenu.js';
import './ui/SortByRow.js';
import './index-105a85f4.js';
import './utils/message/getOutgoingMessageState.js';
import './context-57341fcc.js';
import './utils-8a4a2ff6.js';
import './ui/UserProfile.js';
import './sendbirdSelectors.js';
import '@sendbird/chat/openChannel';
import './ui/UserListItem.js';
import './ui/MutedAvatarOverlay.js';
import './ui/Checkbox.js';
import './ui/Accordion.js';
import './ui/AccordionGroup.js';

var OpenChannelSetting = function (props) {
  return /*#__PURE__*/React__default.createElement(OpenChannelSettingsProvider, {
    channelUrl: props === null || props === void 0 ? void 0 : props.channelUrl,
    onCloseClick: props === null || props === void 0 ? void 0 : props.onCloseClick,
    onBeforeUpdateChannel: props === null || props === void 0 ? void 0 : props.onBeforeUpdateChannel,
    onChannelModified: props === null || props === void 0 ? void 0 : props.onChannelModified,
    onDeleteChannel: props === null || props === void 0 ? void 0 : props.onDeleteChannel,
    disableUserProfile: props === null || props === void 0 ? void 0 : props.disableUserProfile,
    renderUserProfile: props === null || props === void 0 ? void 0 : props.renderUserProfile
  }, /*#__PURE__*/React__default.createElement(OpenChannelUI, {
    renderOperatorUI: props === null || props === void 0 ? void 0 : props.renderOperatorUI,
    renderParticipantList: props === null || props === void 0 ? void 0 : props.renderParticipantList
  }));
};

export { OpenChannelSetting as default };
//# sourceMappingURL=OpenChannelSettings.js.map
