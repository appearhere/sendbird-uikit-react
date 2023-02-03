import React__default from 'react';
import ChannelSettingsUI from './ChannelSettings/components/ChannelSettingsUI.js';
import { ChannelSettingsProvider } from './ChannelSettings/context.js';
import './useSendbirdStateContext.js';
import './withSendbird.js';
import './_rollupPluginBabelHelpers-fe256514.js';
import './index-88c5a220.js';
import './tslib.es6-75bd0528.js';
import './LocalizationContext-e5f35d14.js';
import './stringSet-42c0e16e.js';
import './index-5dcd7e0f.js';
import './ui/Icon.js';
import 'prop-types';
import './index-f60cbf08.js';
import './ui/Loader.js';
import './ui/IconButton.js';
import './ChannelSettings/components/ChannelProfile.js';
import './ui/ChannelAvatar.js';
import './ui/Avatar.js';
import './ui/ImageRenderer.js';
import './uuid-392016d0.js';
import './utils-13fa0336.js';
import './ui/TextButton.js';
import './color-52d916b6.js';
import './ChannelSettings/components/EditDetailsModal.js';
import './ui/Modal.js';
import 'react-dom';
import './index-5ab5d8fe.js';
import './ui/Button.js';
import './MediaQueryContext-0ce6633d.js';
import './ui/Input.js';
import './ChannelSettings/components/ModerationPanel.js';
import './ui/Accordion.js';
import './ui/AccordionGroup.js';
import './context-57341fcc.js';
import './utils-8a4a2ff6.js';
import './ui/Badge.js';
import './ui/ContextMenu.js';
import './ui/SortByRow.js';
import './index-105a85f4.js';
import './utils/message/getOutgoingMessageState.js';
import './ChannelSettings/components/UserListItem.js';
import './UserProfileContext-517994e3.js';
import './ui/MutedAvatarOverlay.js';
import './ui/UserProfile.js';
import './sendbirdSelectors.js';
import './topics-0560d548.js';
import './ui/UserListItem.js';
import './ui/Checkbox.js';
import '@sendbird/chat/groupChannel';
import './MemberList-e6061e27.js';
import './ChannelSettings/components/LeaveChannel.js';
import './ChannelSettings/components/UserPanel.js';

var ChannelSettings = function (props) {
  return /*#__PURE__*/React__default.createElement(ChannelSettingsProvider, {
    overrideInviteUser: props === null || props === void 0 ? void 0 : props.overrideInviteUser,
    channelUrl: props.channelUrl,
    onCloseClick: props === null || props === void 0 ? void 0 : props.onCloseClick,
    onLeaveChannel: props === null || props === void 0 ? void 0 : props.onLeaveChannel,
    onChannelModified: props === null || props === void 0 ? void 0 : props.onChannelModified,
    onBeforeUpdateChannel: props === null || props === void 0 ? void 0 : props.onBeforeUpdateChannel,
    queries: props === null || props === void 0 ? void 0 : props.queries,
    className: props === null || props === void 0 ? void 0 : props.className,
    disableUserProfile: props === null || props === void 0 ? void 0 : props.disableUserProfile,
    renderUserProfile: props === null || props === void 0 ? void 0 : props.renderChannelProfile
  }, /*#__PURE__*/React__default.createElement(ChannelSettingsUI, {
    renderPlaceholderError: props === null || props === void 0 ? void 0 : props.renderPlaceholderError,
    renderChannelProfile: props === null || props === void 0 ? void 0 : props.renderChannelProfile,
    renderModerationPanel: props === null || props === void 0 ? void 0 : props.renderModerationPanel,
    renderLeaveChannel: props === null || props === void 0 ? void 0 : props.renderLeaveChannel
  }));
};

export { ChannelSettings as default };
//# sourceMappingURL=ChannelSettings.js.map
