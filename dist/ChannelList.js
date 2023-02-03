import React__default from 'react';
import { C as ChannelListProvider } from './ChannelListProvider-41d1c19d.js';
import ChannelListUI from './ChannelList/components/ChannelListUI.js';
import './tslib.es6-75bd0528.js';
import '@sendbird/chat/groupChannel';
import './topics-0560d548.js';
import './uuid-392016d0.js';
import './utils-8a4a2ff6.js';
import './UserProfileContext-517994e3.js';
import 'prop-types';
import './useSendbirdStateContext.js';
import './withSendbird.js';
import './_rollupPluginBabelHelpers-fe256514.js';
import './index-105a85f4.js';
import './utils/message/getOutgoingMessageState.js';
import './ChannelList/components/ChannelListHeader.js';
import './LocalizationContext-e5f35d14.js';
import './stringSet-42c0e16e.js';
import './index-5dcd7e0f.js';
import './index-f60cbf08.js';
import './ui/Avatar.js';
import './ui/ImageRenderer.js';
import './ui/Icon.js';
import './ChannelList/components/AddChannel.js';
import './ui/IconButton.js';
import './CreateChannel.js';
import './CreateChannel/components/CreateChannelUI.js';
import './CreateChannelProvider-e9f3d260.js';
import './sendbirdSelectors.js';
import './CreateChannel/components/InviteUsers.js';
import './ui/Modal.js';
import 'react-dom';
import './index-5ab5d8fe.js';
import './ui/Button.js';
import './MediaQueryContext-0ce6633d.js';
import './ui/UserListItem.js';
import './ui/MutedAvatarOverlay.js';
import './ui/Checkbox.js';
import './ui/UserProfile.js';
import './ui/ContextMenu.js';
import './ui/SortByRow.js';
import './CreateChannel/components/SelectChannelType.js';
import './ChannelList/components/ChannelPreview.js';
import './ui/ChannelAvatar.js';
import './utils-13fa0336.js';
import './ui/Badge.js';
import './index-1cb2692d.js';
import './index-229a0736.js';
import './ui/Loader.js';
import './index-05bd476f.js';
import './index-81d63e09.js';
import './ui/MentionUserLabel.js';
import './ui/TextButton.js';
import './color-52d916b6.js';
import './Channel/components/TypingIndicator.js';
import './ChannelProvider-3f08837d.js';
import './compareIds-fd8fd31e.js';
import './const-03d71a8a.js';
import '@sendbird/chat/message';
import './ui/ReactionButton.js';
import './useLongPress-ee44c5c3.js';
import './ChannelList/components/ChannelPreviewAction.js';
import './EditUserProfile.js';
import './index-481d7de2.js';
import './ui/Input.js';
import './actionTypes-35c63e84.js';
import './index-88c5a220.js';

var ChannelList = function (props) {
  return /*#__PURE__*/React__default.createElement(ChannelListProvider, {
    className: props === null || props === void 0 ? void 0 : props.className,
    disableUserProfile: props === null || props === void 0 ? void 0 : props.disableUserProfile,
    allowProfileEdit: props === null || props === void 0 ? void 0 : props.allowProfileEdit,
    onBeforeCreateChannel: props === null || props === void 0 ? void 0 : props.onBeforeCreateChannel,
    onThemeChange: props === null || props === void 0 ? void 0 : props.onThemeChange,
    overrideInviteUser: props === null || props === void 0 ? void 0 : props.overrideInviteUser,
    onProfileEditSuccess: props === null || props === void 0 ? void 0 : props.onProfileEditSuccess,
    onChannelSelect: props === null || props === void 0 ? void 0 : props.onChannelSelect,
    sortChannelList: props === null || props === void 0 ? void 0 : props.sortChannelList,
    queries: props === null || props === void 0 ? void 0 : props.queries,
    disableAutoSelect: props === null || props === void 0 ? void 0 : props.disableAutoSelect,
    isTypingIndicatorEnabled: props === null || props === void 0 ? void 0 : props.isTypingIndicatorEnabled,
    isMessageReceiptStatusEnabled: props === null || props === void 0 ? void 0 : props.isMessageReceiptStatusEnabled
  }, /*#__PURE__*/React__default.createElement(ChannelListUI, {
    renderChannelPreview: props === null || props === void 0 ? void 0 : props.renderChannelPreview,
    renderUserProfile: props === null || props === void 0 ? void 0 : props.renderUserProfile,
    renderHeader: props === null || props === void 0 ? void 0 : props.renderHeader,
    renderPlaceHolderEmptyList: props === null || props === void 0 ? void 0 : props.renderPlaceHolderEmptyList,
    renderPlaceHolderError: props === null || props === void 0 ? void 0 : props.renderPlaceHolderError,
    renderPlaceHolderLoading: props === null || props === void 0 ? void 0 : props.renderPlaceHolderLoading
  }));
};

export { ChannelList as default };
//# sourceMappingURL=ChannelList.js.map
