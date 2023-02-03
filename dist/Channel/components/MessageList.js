import React__default, { useState, useMemo } from 'react';
import { i as isSameDay } from '../../index-81d63e09.js';
import { u as useChannelContext, c as compareMessagesForGrouping, i as isAboutSame } from '../../ChannelProvider-3f08837d.js';
import { P as PlaceHolder, a as PlaceHolderTypes } from '../../index-88c5a220.js';
import Icon, { IconTypes, IconColors } from '../../ui/Icon.js';
import Message from './Message.js';
import { u as uuidv4 } from '../../uuid-392016d0.js';
import '../../index-229a0736.js';
import '../../index-5dcd7e0f.js';
import '../../UserProfileContext-517994e3.js';
import 'prop-types';
import '../../useSendbirdStateContext.js';
import '../../withSendbird.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import '../../topics-0560d548.js';
import '../../index-105a85f4.js';
import '../../tslib.es6-75bd0528.js';
import '../../utils/message/getOutgoingMessageState.js';
import '../../compareIds-fd8fd31e.js';
import '../../const-03d71a8a.js';
import '@sendbird/chat/groupChannel';
import '@sendbird/chat/message';
import '../../ui/ContextMenu.js';
import 'react-dom';
import '../../ui/SortByRow.js';
import '../../index-f60cbf08.js';
import '../../stringSet-42c0e16e.js';
import '../../ui/ReactionButton.js';
import '../../ui/ImageRenderer.js';
import '../../LocalizationContext-e5f35d14.js';
import '../../ui/Loader.js';
import './SuggestedMentionList.js';
import '../../ui/Avatar.js';
import '../../const-fcaed0ae.js';
import '../../ThreadProvider-5ccbbc4b.js';
import '../../Thread/context/types.js';
import '@sendbird/chat';
import '../../ui/DateSeparator.js';
import '../../color-52d916b6.js';
import '../../ui/MessageInput.js';
import 'react-dom/server';
import '../../ui/IconButton.js';
import '../../ui/Button.js';
import '../../ui/MentionUserLabel.js';
import '../../ui/MessageContent.js';
import '../../ui/UserProfile.js';
import '../../sendbirdSelectors.js';
import '../../utils-8a4a2ff6.js';
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
import '../../MediaQueryContext-0ce6633d.js';
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

var SCROLL_REF_CLASS_NAME = '.sendbird-msg--scroll-ref';

var MessageList = function (props) {
  var renderMessage = props.renderMessage,
      renderPlaceholderEmpty = props.renderPlaceholderEmpty,
      renderCustomSeparator = props.renderCustomSeparator;

  var _a = useChannelContext(),
      allMessages = _a.allMessages,
      hasMorePrev = _a.hasMorePrev,
      setInitialTimeStamp = _a.setInitialTimeStamp,
      setAnimatedMessageId = _a.setAnimatedMessageId,
      setHighLightedMessageId = _a.setHighLightedMessageId,
      isMessageGroupingEnabled = _a.isMessageGroupingEnabled,
      scrollRef = _a.scrollRef,
      onScrollCallback = _a.onScrollCallback,
      onScrollDownCallback = _a.onScrollDownCallback,
      messagesDispatcher = _a.messagesDispatcher,
      messageActionTypes = _a.messageActionTypes,
      currentGroupChannel = _a.currentGroupChannel,
      disableMarkAsRead = _a.disableMarkAsRead,
      replyType = _a.replyType;

  var _b = useState(0),
      scrollBottom = _b[0],
      setScrollBottom = _b[1];

  var onScroll = function (e) {
    var element = e.target;
    var scrollTop = element.scrollTop,
        clientHeight = element.clientHeight,
        scrollHeight = element.scrollHeight;

    if (scrollTop === 0) {
      if (!hasMorePrev) {
        return;
      }

      var nodes = scrollRef.current.querySelectorAll(SCROLL_REF_CLASS_NAME);
      var first_1 = nodes && nodes[0];
      onScrollCallback(function (_a) {
        var messages = _a[0];

        if (messages) {
          // https://github.com/scabbiaza/react-scroll-position-on-updating-dom
          // Set block to nearest to prevent unexpected scrolling from outer components
          try {
            first_1.scrollIntoView({
              block: "start",
              inline: "nearest"
            });
          } catch (error) {//
          }
        }
      });
    }

    if (isAboutSame(clientHeight + scrollTop, scrollHeight, 10)) {
      onScrollDownCallback(function (_a) {
        _a[0];
      });
    } // Save the lastest scroll bottom value


    if (scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current) {
      var current = scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current;
      setScrollBottom(current.scrollHeight - current.scrollTop - current.offsetHeight);
    }

    if (!disableMarkAsRead && isAboutSame(clientHeight + scrollTop, scrollHeight, 10)) {
      // Mark as read if scroll is at end
      setTimeout(function () {
        var _a;

        messagesDispatcher({
          type: messageActionTypes.MARK_AS_READ,
          payload: {
            channel: currentGroupChannel
          }
        });

        try {
          (_a = currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.markAsRead) === null || _a === void 0 ? void 0 : _a.call(currentGroupChannel);
        } catch (_b) {//
        }
      }, 500);
    }
  };

  var onClickScrollBot = function () {
    var _a, _b, _c;

    setInitialTimeStamp === null || setInitialTimeStamp === void 0 ? void 0 : setInitialTimeStamp(null);
    setAnimatedMessageId === null || setAnimatedMessageId === void 0 ? void 0 : setAnimatedMessageId(null);
    setHighLightedMessageId === null || setHighLightedMessageId === void 0 ? void 0 : setHighLightedMessageId(null);

    if (((_a = scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current) === null || _a === void 0 ? void 0 : _a.scrollTop) > -1) {
      scrollRef.current.scrollTop = ((_b = scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current) === null || _b === void 0 ? void 0 : _b.scrollHeight) - ((_c = scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current) === null || _c === void 0 ? void 0 : _c.offsetHeight);
    }
  }; // Because every message components are re-rendered everytime by every scroll events


  var memoizedAllMessages = useMemo(function () {
    return allMessages.map(function (m, idx) {
      var previousMessage = allMessages[idx - 1];
      var nextMessage = allMessages[idx + 1];

      var _a = isMessageGroupingEnabled ? compareMessagesForGrouping(previousMessage, m, nextMessage, currentGroupChannel, replyType) : [false, false],
          chainTop = _a[0],
          chainBottom = _a[1];

      var previousMessageCreatedAt = previousMessage === null || previousMessage === void 0 ? void 0 : previousMessage.createdAt;
      var currentCreatedAt = m.createdAt; // https://stackoverflow.com/a/41855608

      var hasSeparator = !(previousMessageCreatedAt && isSameDay(currentCreatedAt, previousMessageCreatedAt));

      var handleScroll = function () {
        var current = scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current;

        if (current) {
          var bottom = current.scrollHeight - current.scrollTop - current.offsetHeight;

          if (scrollBottom < bottom) {
            current.scrollTop += bottom - scrollBottom;
          }
        }
      };

      return /*#__PURE__*/React__default.createElement(Message, {
        handleScroll: handleScroll,
        renderMessage: renderMessage,
        message: m,
        hasSeparator: hasSeparator,
        chainTop: chainTop,
        chainBottom: chainBottom,
        renderCustomSeparator: renderCustomSeparator,
        key: m.messageId + uuidv4()
      });
    });
  }, [allMessages]);

  if (allMessages.length < 1) {
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, (renderPlaceholderEmpty === null || renderPlaceholderEmpty === void 0 ? void 0 : renderPlaceholderEmpty()) || /*#__PURE__*/React__default.createElement(PlaceHolder, {
      className: "sendbird-conversation__no-messages",
      type: PlaceHolderTypes.NO_MESSAGES
    }));
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-conversation__messages"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-conversation__scroll-container"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-conversation__padding"
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-conversation__messages-padding",
    ref: scrollRef,
    onScroll: onScroll
  }, memoizedAllMessages)), // This flag is an unmatched variable
  scrollBottom > 1 && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-conversation__scroll-bottom-button",
    onClick: onClickScrollBot,
    onKeyDown: onClickScrollBot,
    tabIndex: 0,
    role: "button"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    width: "24px",
    height: "24px",
    type: IconTypes.CHEVRON_DOWN,
    fillColor: IconColors.PRIMARY
  })));
};

export { MessageList as default };
//# sourceMappingURL=MessageList.js.map
