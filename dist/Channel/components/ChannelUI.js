import React__default, { useState, useEffect } from 'react';
import useSendbirdStateContext from '../../useSendbirdStateContext.js';
import { u as useChannelContext, M as MARK_AS_READ } from '../../ChannelProvider-3f08837d.js';
import { P as PlaceHolder, a as PlaceHolderTypes } from '../../index-88c5a220.js';
import ConnectionStatus from '../../ui/ConnectionStatus.js';
import ChannelHeader from './ChannelHeader.js';
import MessageList from './MessageList.js';
import TypingIndicator from './TypingIndicator.js';
import FrozenNotification from './FrozenNotification.js';
import UnreadCount from './UnreadCount.js';
import MessageInputWrapper from './MessageInput.js';
import '../../withSendbird.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import '../../UserProfileContext-517994e3.js';
import 'prop-types';
import '../../index-229a0736.js';
import '../../index-5dcd7e0f.js';
import '../../topics-0560d548.js';
import '../../index-105a85f4.js';
import '../../tslib.es6-75bd0528.js';
import '../../utils/message/getOutgoingMessageState.js';
import '../../compareIds-fd8fd31e.js';
import '../../const-03d71a8a.js';
import '@sendbird/chat/groupChannel';
import '../../uuid-392016d0.js';
import '@sendbird/chat/message';
import '../../ui/ContextMenu.js';
import 'react-dom';
import '../../ui/SortByRow.js';
import '../../index-f60cbf08.js';
import '../../stringSet-42c0e16e.js';
import '../../ui/ReactionButton.js';
import '../../ui/ImageRenderer.js';
import '../../ui/Icon.js';
import '../../LocalizationContext-e5f35d14.js';
import '../../ui/Loader.js';
import '../../utils-5cd54b1d.js';
import '../../ui/IconButton.js';
import '../../ui/ChannelAvatar.js';
import '../../ui/Avatar.js';
import '../../utils-13fa0336.js';
import '../../MediaQueryContext-0ce6633d.js';
import '../../utils-8a4a2ff6.js';
import '../../index-81d63e09.js';
import './Message.js';
import './SuggestedMentionList.js';
import '../../const-fcaed0ae.js';
import '../../ThreadProvider-5ccbbc4b.js';
import '../../Thread/context/types.js';
import '@sendbird/chat';
import '../../ui/DateSeparator.js';
import '../../color-52d916b6.js';
import '../../ui/MessageInput.js';
import 'react-dom/server';
import '../../ui/Button.js';
import '../../ui/MentionUserLabel.js';
import '../../ui/MessageContent.js';
import '../../ui/UserProfile.js';
import '../../sendbirdSelectors.js';
import '../../index-1cb2692d.js';
import '../../index-05bd476f.js';
import '../../ui/MessageItemMenu.js';
import '../../ui/MessageItemReactionMenu.js';
import '../../ui/EmojiReactions.js';
import '../../ui/Tooltip.js';
import '../../ui/TooltipWrapper.js';
import '../../ui/ReactionBadge.js';
import '../../ui/AdminMessage.js';
import '../../ui/TextMessageItemBody.js';
import '../../ui/Word.js';
import '../../ui/LinkLabel.js';
import '../../ui/MentionLabel.js';
import '../../ui/FileMessageItemBody.js';
import '../../ui/TextButton.js';
import '../../ui/ThumbnailMessageItemBody.js';
import '../../ui/OGMessageItemBody.js';
import '../../ui/UnknownMessageItemBody.js';
import '../../ui/QuoteMessage.js';
import '../../useLongPress-ee44c5c3.js';
import '../../ui/BottomSheet.js';
import '../../index-5ab5d8fe.js';
import '../../ui/ThreadReplies.js';
import './FileViewer.js';
import './RemoveMessageModal.js';
import '../../ui/Modal.js';
import '../../ui/QuoteMessageInput.js';

var ChannelUI = function (_a) {
  var _b, _c, _d, _e;

  var isLoading = _a.isLoading,
      renderPlaceholderLoader = _a.renderPlaceholderLoader,
      renderPlaceholderInvalid = _a.renderPlaceholderInvalid,
      renderPlaceholderEmpty = _a.renderPlaceholderEmpty,
      renderChannelHeader = _a.renderChannelHeader,
      renderMessage = _a.renderMessage,
      renderMessageInput = _a.renderMessageInput,
      renderTypingIndicator = _a.renderTypingIndicator,
      renderCustomSeparator = _a.renderCustomSeparator;

  var _f = useChannelContext(),
      currentGroupChannel = _f.currentGroupChannel,
      channelUrl = _f.channelUrl,
      isInvalid = _f.isInvalid,
      unreadSince = _f.unreadSince,
      loading = _f.loading,
      setInitialTimeStamp = _f.setInitialTimeStamp,
      setAnimatedMessageId = _f.setAnimatedMessageId,
      setHighLightedMessageId = _f.setHighLightedMessageId,
      scrollRef = _f.scrollRef,
      messagesDispatcher = _f.messagesDispatcher,
      disableMarkAsRead = _f.disableMarkAsRead;

  var _g = useState(0),
      unreadCount = _g[0],
      setUnreadCount = _g[1];

  useEffect(function () {
    // simple debounce to avoid flicker of UnreadCount badge
    var handler = setTimeout(function () {
      setUnreadCount(currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.unreadMessageCount);
    }, 1000);
    return function () {
      clearTimeout(handler);
    };
  }, [currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.unreadMessageCount]);
  var globalStore = useSendbirdStateContext();
  var sdkError = (_c = (_b = globalStore === null || globalStore === void 0 ? void 0 : globalStore.stores) === null || _b === void 0 ? void 0 : _b.sdkStore) === null || _c === void 0 ? void 0 : _c.error;
  var logger = (_d = globalStore === null || globalStore === void 0 ? void 0 : globalStore.config) === null || _d === void 0 ? void 0 : _d.logger;
  var isOnline = (_e = globalStore === null || globalStore === void 0 ? void 0 : globalStore.config) === null || _e === void 0 ? void 0 : _e.isOnline;

  if (isLoading) {
    return /*#__PURE__*/React__default.createElement("div", {
      className: "sendbird-conversation"
    }, (renderPlaceholderLoader === null || renderPlaceholderLoader === void 0 ? void 0 : renderPlaceholderLoader()) || /*#__PURE__*/React__default.createElement(PlaceHolder, {
      type: PlaceHolderTypes.LOADING
    }));
  }

  if (!channelUrl) {
    return /*#__PURE__*/React__default.createElement("div", {
      className: "sendbird-conversation"
    }, (renderPlaceholderInvalid === null || renderPlaceholderInvalid === void 0 ? void 0 : renderPlaceholderInvalid()) || /*#__PURE__*/React__default.createElement(PlaceHolder, {
      type: PlaceHolderTypes.NO_CHANNELS
    }));
  }

  if (isInvalid) {
    return /*#__PURE__*/React__default.createElement("div", {
      className: "sendbird-conversation"
    }, (renderPlaceholderInvalid === null || renderPlaceholderInvalid === void 0 ? void 0 : renderPlaceholderInvalid()) || /*#__PURE__*/React__default.createElement(PlaceHolder, {
      type: PlaceHolderTypes.WRONG
    }));
  }

  if (sdkError) {
    return /*#__PURE__*/React__default.createElement("div", {
      className: "sendbird-conversation"
    }, (renderPlaceholderInvalid === null || renderPlaceholderInvalid === void 0 ? void 0 : renderPlaceholderInvalid()) || /*#__PURE__*/React__default.createElement(PlaceHolder, {
      type: PlaceHolderTypes.WRONG,
      retryToConnect: function () {
        logger.info('Channel: reconnecting'); // reconnect();
      }
    }));
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-conversation"
  }, (renderChannelHeader === null || renderChannelHeader === void 0 ? void 0 : renderChannelHeader()) || /*#__PURE__*/React__default.createElement(ChannelHeader, null), (currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.isFrozen) && /*#__PURE__*/React__default.createElement(FrozenNotification, null), unreadCount > 0 && /*#__PURE__*/React__default.createElement(UnreadCount, {
    count: unreadCount,
    time: unreadSince,
    onClick: function () {
      var _a, _b, _c;

      setUnreadCount(0);

      if ((_a = scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current) === null || _a === void 0 ? void 0 : _a.scrollTop) {
        scrollRef.current.scrollTop = ((_b = scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current) === null || _b === void 0 ? void 0 : _b.scrollHeight) - ((_c = scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current) === null || _c === void 0 ? void 0 : _c.offsetHeight);
      }

      if (!disableMarkAsRead) {
        try {
          currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.markAsRead();
        } catch (_d) {//
        }

        messagesDispatcher({
          type: MARK_AS_READ,
          payload: {
            channel: currentGroupChannel
          }
        });
      }

      setInitialTimeStamp(null);
      setAnimatedMessageId(null);
      setHighLightedMessageId(null);
    }
  }), loading ? /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-conversation"
  }, (renderPlaceholderLoader === null || renderPlaceholderLoader === void 0 ? void 0 : renderPlaceholderLoader()) || /*#__PURE__*/React__default.createElement(PlaceHolder, {
    type: PlaceHolderTypes.LOADING
  })) : /*#__PURE__*/React__default.createElement(MessageList, {
    renderMessage: renderMessage,
    renderPlaceholderEmpty: renderPlaceholderEmpty,
    renderCustomSeparator: renderCustomSeparator
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-conversation__footer"
  }, (renderMessageInput === null || renderMessageInput === void 0 ? void 0 : renderMessageInput()) || /*#__PURE__*/React__default.createElement(MessageInputWrapper, null), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-conversation__footer__typing-indicator"
  }, (renderTypingIndicator === null || renderTypingIndicator === void 0 ? void 0 : renderTypingIndicator()) || /*#__PURE__*/React__default.createElement(TypingIndicator, null), !isOnline && /*#__PURE__*/React__default.createElement(ConnectionStatus, null))));
};

export { ChannelUI as default };
//# sourceMappingURL=ChannelUI.js.map
