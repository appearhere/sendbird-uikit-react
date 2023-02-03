import React__default from 'react';
import OpenChannelUI from './OpenChannel/components/OpenChannelUI.js';
import { O as OpenChannelProvider } from './OpenChannelProvider-104ab716.js';
import './OpenChannel/components/OpenChannelInput.js';
import './LocalizationContext-e5f35d14.js';
import './stringSet-42c0e16e.js';
import './index-5dcd7e0f.js';
import './ui/MessageInput.js';
import './_rollupPluginBabelHelpers-fe256514.js';
import 'react-dom/server';
import 'prop-types';
import './const-fcaed0ae.js';
import './const-03d71a8a.js';
import './ui/IconButton.js';
import './tslib.es6-75bd0528.js';
import './ui/Button.js';
import './index-f60cbf08.js';
import './ui/MentionUserLabel.js';
import './ui/Icon.js';
import './index-105a85f4.js';
import './utils/message/getOutgoingMessageState.js';
import './OpenChannel/components/FrozenChannelNotification.js';
import './OpenChannel/components/OpenChannelHeader.js';
import './ui/Avatar.js';
import './ui/ImageRenderer.js';
import './uuid-392016d0.js';
import './MediaQueryContext-0ce6633d.js';
import './index-88c5a220.js';
import './ui/Loader.js';
import './OpenChannel/components/OpenChannelMessageList.js';
import './index-81d63e09.js';
import './index-229a0736.js';
import './OpenChannel/components/OpenChannelMessage.js';
import './ui/OpenchannelUserMessage.js';
import './ui/ContextMenu.js';
import 'react-dom';
import './ui/SortByRow.js';
import './ui/UserProfile.js';
import './UserProfileContext-517994e3.js';
import './sendbirdSelectors.js';
import './topics-0560d548.js';
import './utils-8a4a2ff6.js';
import './useSendbirdStateContext.js';
import './withSendbird.js';
import './utils-8271be8c.js';
import './index-f8bdb205.js';
import './useLongPress-ee44c5c3.js';
import './ui/OpenChannelAdminMessage.js';
import './ui/OpenchannelOGMessage.js';
import './ui/LinkLabel.js';
import './ui/Word.js';
import './ui/MentionLabel.js';
import './ui/OpenchannelThumbnailMessage.js';
import './ui/OpenchannelFileMessage.js';
import './ui/TextButton.js';
import './color-52d916b6.js';
import './ui/DateSeparator.js';
import './ui/FileViewer.js';
import './index-5ab5d8fe.js';
import './ui/Modal.js';
import './compareIds-fd8fd31e.js';
import '@sendbird/chat';
import '@sendbird/chat/openChannel';

var OpenChannel = function (props) {
  return /*#__PURE__*/React__default.createElement(OpenChannelProvider, {
    channelUrl: props === null || props === void 0 ? void 0 : props.channelUrl,
    isMessageGroupingEnabled: props === null || props === void 0 ? void 0 : props.isMessageGroupingEnabled,
    queries: props === null || props === void 0 ? void 0 : props.queries,
    messageLimit: props === null || props === void 0 ? void 0 : props.messageLimit,
    onBeforeSendUserMessage: props === null || props === void 0 ? void 0 : props.onBeforeSendUserMessage,
    onBeforeSendFileMessage: props === null || props === void 0 ? void 0 : props.onBeforeSendFileMessage,
    onChatHeaderActionClick: props === null || props === void 0 ? void 0 : props.onChatHeaderActionClick,
    disableUserProfile: props === null || props === void 0 ? void 0 : props.disableUserProfile,
    renderUserProfile: props === null || props === void 0 ? void 0 : props.renderUserProfile,
    onBackClick: props === null || props === void 0 ? void 0 : props.onBackClick
  }, /*#__PURE__*/React__default.createElement(OpenChannelUI, {
    renderMessage: props === null || props === void 0 ? void 0 : props.renderMessage,
    renderHeader: props === null || props === void 0 ? void 0 : props.renderHeader,
    renderInput: props === null || props === void 0 ? void 0 : props.renderInput,
    renderPlaceHolderEmptyList: props === null || props === void 0 ? void 0 : props.renderPlaceHolderEmptyList,
    renderPlaceHolderError: props === null || props === void 0 ? void 0 : props.renderPlaceHolderError,
    renderPlaceHolderLoading: props === null || props === void 0 ? void 0 : props.renderPlaceHolderLoading
  }));
};

export { OpenChannel as default };
//# sourceMappingURL=OpenChannel.js.map
