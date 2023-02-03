'use strict';

var React = require('react');
var Channel_context = require('./ChannelProvider-4d043480.js');
var Channel_components_ChannelUI = require('./Channel/components/ChannelUI.js');
require('./UserProfileContext-fd00d1bd.js');
require('prop-types');
require('./useSendbirdStateContext.js');
require('./withSendbird.js');
require('./_rollupPluginBabelHelpers-597f5cf8.js');
require('./index-5977bdd5.js');
require('./index-d4bc012c.js');
require('./topics-085b5602.js');
require('./index-d05a5cae.js');
require('./tslib.es6-d6068b10.js');
require('./utils/message/getOutgoingMessageState.js');
require('./compareIds-5d186d0d.js');
require('./const-43cebab9.js');
require('@sendbird/chat/groupChannel');
require('./uuid-2f4916c1.js');
require('@sendbird/chat/message');
require('./ui/ContextMenu.js');
require('react-dom');
require('./ui/SortByRow.js');
require('./index-4197d014.js');
require('./stringSet-2dfd148b.js');
require('./ui/ReactionButton.js');
require('./ui/ImageRenderer.js');
require('./ui/Icon.js');
require('./index-6b9230ae.js');
require('./LocalizationContext-f4281153.js');
require('./ui/Loader.js');
require('./ui/ConnectionStatus.js');
require('./Channel/components/ChannelHeader.js');
require('./utils-88ce8023.js');
require('./ui/IconButton.js');
require('./ui/ChannelAvatar.js');
require('./ui/Avatar.js');
require('./utils-6eb1ca73.js');
require('./MediaQueryContext-9a5566fc.js');
require('./utils-a9158c72.js');
require('./Channel/components/MessageList.js');
require('./index-fb9d8ec0.js');
require('./Channel/components/Message.js');
require('./Channel/components/SuggestedMentionList.js');
require('./const-28829306.js');
require('./ThreadProvider-5c14e997.js');
require('./Thread/context/types.js');
require('@sendbird/chat');
require('./ui/DateSeparator.js');
require('./color-0fae7c8e.js');
require('./ui/MessageInput.js');
require('react-dom/server');
require('./ui/Button.js');
require('./ui/MentionUserLabel.js');
require('./ui/MessageContent.js');
require('./ui/UserProfile.js');
require('./sendbirdSelectors.js');
require('./index-daac2dae.js');
require('./index-661b02a2.js');
require('./ui/MessageItemMenu.js');
require('./ui/MessageItemReactionMenu.js');
require('./ui/EmojiReactions.js');
require('./ui/Tooltip.js');
require('./ui/TooltipWrapper.js');
require('./ui/ReactionBadge.js');
require('./ui/AdminMessage.js');
require('./ui/TextMessageItemBody.js');
require('./ui/Word.js');
require('./ui/LinkLabel.js');
require('./ui/MentionLabel.js');
require('./ui/FileMessageItemBody.js');
require('./ui/TextButton.js');
require('./ui/ThumbnailMessageItemBody.js');
require('./ui/OGMessageItemBody.js');
require('./ui/UnknownMessageItemBody.js');
require('./ui/QuoteMessage.js');
require('./useLongPress-2f4ee82c.js');
require('./ui/BottomSheet.js');
require('./index-1b132096.js');
require('./ui/ThreadReplies.js');
require('./Channel/components/FileViewer.js');
require('./Channel/components/RemoveMessageModal.js');
require('./ui/Modal.js');
require('./Channel/components/TypingIndicator.js');
require('./Channel/components/FrozenNotification.js');
require('./Channel/components/UnreadCount.js');
require('./Channel/components/MessageInput.js');
require('./ui/QuoteMessageInput.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Channel = function (props) {
  return /*#__PURE__*/React__default["default"].createElement(Channel_context.ChannelProvider, {
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
  }, /*#__PURE__*/React__default["default"].createElement(Channel_components_ChannelUI, {
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

module.exports = Channel;
//# sourceMappingURL=Channel.js.map
