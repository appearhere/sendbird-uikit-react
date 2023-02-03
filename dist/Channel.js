import React__default from 'react';
import { C as ChannelProvider } from './ChannelProvider-3f08837d.js';
import ChannelUI from './Channel/components/ChannelUI.js';
import './UserProfileContext-517994e3.js';
import 'prop-types';
import './useSendbirdStateContext.js';
import './withSendbird.js';
import './_rollupPluginBabelHelpers-fe256514.js';
import './index-229a0736.js';
import './index-5dcd7e0f.js';
import './topics-0560d548.js';
import './index-105a85f4.js';
import './tslib.es6-75bd0528.js';
import './utils/message/getOutgoingMessageState.js';
import './compareIds-fd8fd31e.js';
import './const-03d71a8a.js';
import '@sendbird/chat/groupChannel';
import './uuid-392016d0.js';
import '@sendbird/chat/message';
import './ui/ContextMenu.js';
import 'react-dom';
import './ui/SortByRow.js';
import './index-f60cbf08.js';
import './stringSet-42c0e16e.js';
import './ui/ReactionButton.js';
import './ui/ImageRenderer.js';
import './ui/Icon.js';
import './index-88c5a220.js';
import './LocalizationContext-e5f35d14.js';
import './ui/Loader.js';
import './ui/ConnectionStatus.js';
import './Channel/components/ChannelHeader.js';
import './utils-5cd54b1d.js';
import './ui/IconButton.js';
import './ui/ChannelAvatar.js';
import './ui/Avatar.js';
import './utils-13fa0336.js';
import './MediaQueryContext-0ce6633d.js';
import './utils-8a4a2ff6.js';
import './Channel/components/MessageList.js';
import './index-81d63e09.js';
import './Channel/components/Message.js';
import './Channel/components/SuggestedMentionList.js';
import './const-fcaed0ae.js';
import './ThreadProvider-5ccbbc4b.js';
import './Thread/context/types.js';
import '@sendbird/chat';
import './ui/DateSeparator.js';
import './color-52d916b6.js';
import './ui/MessageInput.js';
import 'react-dom/server';
import './ui/Button.js';
import './ui/MentionUserLabel.js';
import './ui/MessageContent.js';
import './ui/UserProfile.js';
import './sendbirdSelectors.js';
import './index-1cb2692d.js';
import './index-05bd476f.js';
import './ui/MessageItemMenu.js';
import './ui/MessageItemReactionMenu.js';
import './ui/EmojiReactions.js';
import './ui/Tooltip.js';
import './ui/TooltipWrapper.js';
import './ui/ReactionBadge.js';
import './ui/AdminMessage.js';
import './ui/TextMessageItemBody.js';
import './ui/Word.js';
import './ui/LinkLabel.js';
import './ui/MentionLabel.js';
import './ui/FileMessageItemBody.js';
import './ui/TextButton.js';
import './ui/ThumbnailMessageItemBody.js';
import './ui/OGMessageItemBody.js';
import './ui/UnknownMessageItemBody.js';
import './ui/QuoteMessage.js';
import './useLongPress-ee44c5c3.js';
import './ui/BottomSheet.js';
import './index-5ab5d8fe.js';
import './ui/ThreadReplies.js';
import './Channel/components/FileViewer.js';
import './Channel/components/RemoveMessageModal.js';
import './ui/Modal.js';
import './Channel/components/TypingIndicator.js';
import './Channel/components/FrozenNotification.js';
import './Channel/components/UnreadCount.js';
import './Channel/components/MessageInput.js';
import './ui/QuoteMessageInput.js';

var Channel = function (props) {
  return /*#__PURE__*/React__default.createElement(ChannelProvider, {
    channelUrl: props === null || props === void 0 ? void 0 : props.channelUrl,
    isReactionEnabled: props === null || props === void 0 ? void 0 : props.isReactionEnabled,
    isMessageGroupingEnabled: props === null || props === void 0 ? void 0 : props.isMessageGroupingEnabled,
    showSearchIcon: props === null || props === void 0 ? void 0 : props.showSearchIcon,
    animatedMessage: props === null || props === void 0 ? void 0 : props.animatedMessage,
    highlightedMessage: props === null || props === void 0 ? void 0 : props.highlightedMessage,
    startingPoint: props === null || props === void 0 ? void 0 : props.startingPoint,
    onBeforeSendUserMessage: props === null || props === void 0 ? void 0 : props.onBeforeSendUserMessage,
    onBeforeSendFileMessage: props === null || props === void 0 ? void 0 : props.onBeforeSendFileMessage,
    onBeforeUpdateUserMessage: props === null || props === void 0 ? void 0 : props.onBeforeUpdateUserMessage,
    onChatHeaderActionClick: props === null || props === void 0 ? void 0 : props.onChatHeaderActionClick,
    onSearchClick: props === null || props === void 0 ? void 0 : props.onSearchClick,
    onBackClick: props === null || props === void 0 ? void 0 : props.onBackClick,
    replyType: props === null || props === void 0 ? void 0 : props.replyType,
    threadReplySelectType: props === null || props === void 0 ? void 0 : props.threadReplySelectType,
    queries: props === null || props === void 0 ? void 0 : props.queries,
    renderUserProfile: props === null || props === void 0 ? void 0 : props.renderUserProfile,
    disableUserProfile: props === null || props === void 0 ? void 0 : props.disableUserProfile,
    disableMarkAsRead: props === null || props === void 0 ? void 0 : props.disableMarkAsRead,
    onReplyInThread: props === null || props === void 0 ? void 0 : props.onReplyInThread,
    onQuoteMessageClick: props === null || props === void 0 ? void 0 : props.onQuoteMessageClick,
    onMessageAnimated: props === null || props === void 0 ? void 0 : props.onMessageAnimated,
    onMessageHighlighted: props === null || props === void 0 ? void 0 : props.onMessageHighlighted
  }, /*#__PURE__*/React__default.createElement(ChannelUI, {
    isLoading: props === null || props === void 0 ? void 0 : props.isLoading,
    renderPlaceholderLoader: props === null || props === void 0 ? void 0 : props.renderPlaceholderLoader,
    renderPlaceholderInvalid: props === null || props === void 0 ? void 0 : props.renderPlaceholderInvalid,
    renderPlaceholderEmpty: props === null || props === void 0 ? void 0 : props.renderPlaceholderEmpty,
    renderChannelHeader: props === null || props === void 0 ? void 0 : props.renderChannelHeader,
    renderMessage: props === null || props === void 0 ? void 0 : props.renderMessage,
    renderMessageInput: props === null || props === void 0 ? void 0 : props.renderMessageInput,
    renderTypingIndicator: props === null || props === void 0 ? void 0 : props.renderTypingIndicator,
    renderCustomSeparator: props === null || props === void 0 ? void 0 : props.renderCustomSeparator
  }));
};

export { Channel as default };
//# sourceMappingURL=Channel.js.map
