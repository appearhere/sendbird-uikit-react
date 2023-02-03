'use strict';

var React = require('react');
var index = require('../../index-fb9d8ec0.js');
var Channel_context = require('../../ChannelProvider-4d043480.js');
var ui_PlaceHolder = require('../../index-6b9230ae.js');
var ui_Icon = require('../../ui/Icon.js');
var Channel_components_Message = require('./Message.js');
var uuid = require('../../uuid-2f4916c1.js');
require('../../index-5977bdd5.js');
require('../../index-d4bc012c.js');
require('../../UserProfileContext-fd00d1bd.js');
require('prop-types');
require('../../useSendbirdStateContext.js');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('../../topics-085b5602.js');
require('../../index-d05a5cae.js');
require('../../tslib.es6-d6068b10.js');
require('../../utils/message/getOutgoingMessageState.js');
require('../../compareIds-5d186d0d.js');
require('../../const-43cebab9.js');
require('@sendbird/chat/groupChannel');
require('@sendbird/chat/message');
require('../../ui/ContextMenu.js');
require('react-dom');
require('../../ui/SortByRow.js');
require('../../index-4197d014.js');
require('../../stringSet-2dfd148b.js');
require('../../ui/ReactionButton.js');
require('../../ui/ImageRenderer.js');
require('../../LocalizationContext-f4281153.js');
require('../../ui/Loader.js');
require('./SuggestedMentionList.js');
require('../../ui/Avatar.js');
require('../../const-28829306.js');
require('../../ThreadProvider-5c14e997.js');
require('../../Thread/context/types.js');
require('@sendbird/chat');
require('../../ui/DateSeparator.js');
require('../../color-0fae7c8e.js');
require('../../ui/MessageInput.js');
require('react-dom/server');
require('../../ui/IconButton.js');
require('../../ui/Button.js');
require('../../ui/MentionUserLabel.js');
require('../../ui/MessageContent.js');
require('../../ui/UserProfile.js');
require('../../sendbirdSelectors.js');
require('../../utils-a9158c72.js');
require('../../index-daac2dae.js');
require('../../index-661b02a2.js');
require('../../ui/MessageItemMenu.js');
require('../../ui/MessageItemReactionMenu.js');
require('../../ui/EmojiReactions.js');
require('../../ui/Tooltip.js');
require('../../ui/TooltipWrapper.js');
require('../../ui/ReactionBadge.js');
require('../../ui/AdminMessage.js');
require('../../ui/TextMessageItemBody.js');
require('../../ui/Word.js');
require('../../ui/LinkLabel.js');
require('../../ui/MentionLabel.js');
require('../../ui/FileMessageItemBody.js');
require('../../ui/TextButton.js');
require('../../MediaQueryContext-9a5566fc.js');
require('../../ui/ThumbnailMessageItemBody.js');
require('../../ui/OGMessageItemBody.js');
require('../../ui/UnknownMessageItemBody.js');
require('../../ui/QuoteMessage.js');
require('../../useLongPress-2f4ee82c.js');
require('../../ui/BottomSheet.js');
require('../../index-1b132096.js');
require('../../ui/ThreadReplies.js');
require('./FileViewer.js');
require('./RemoveMessageModal.js');
require('../../ui/Modal.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var SCROLL_REF_CLASS_NAME = '.sendbird-msg--scroll-ref';

var MessageList = function (props) {
  var renderMessage = props.renderMessage,
      renderPlaceholderEmpty = props.renderPlaceholderEmpty,
      renderCustomSeparator = props.renderCustomSeparator;

  var _a = Channel_context.useChannelContext(),
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

  var _b = React.useState(0),
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

    if (Channel_context.isAboutSame(clientHeight + scrollTop, scrollHeight, 10)) {
      onScrollDownCallback(function (_a) {
        _a[0];
      });
    } // Save the lastest scroll bottom value


    if (scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current) {
      var current = scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current;
      setScrollBottom(current.scrollHeight - current.scrollTop - current.offsetHeight);
    }

    if (!disableMarkAsRead && Channel_context.isAboutSame(clientHeight + scrollTop, scrollHeight, 10)) {
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


  var memoizedAllMessages = React.useMemo(function () {
    return allMessages.map(function (m, idx) {
      var previousMessage = allMessages[idx - 1];
      var nextMessage = allMessages[idx + 1];

      var _a = isMessageGroupingEnabled ? Channel_context.compareMessagesForGrouping(previousMessage, m, nextMessage, currentGroupChannel, replyType) : [false, false],
          chainTop = _a[0],
          chainBottom = _a[1];

      var previousMessageCreatedAt = previousMessage === null || previousMessage === void 0 ? void 0 : previousMessage.createdAt;
      var currentCreatedAt = m.createdAt; // https://stackoverflow.com/a/41855608

      var hasSeparator = !(previousMessageCreatedAt && index.isSameDay(currentCreatedAt, previousMessageCreatedAt));

      var handleScroll = function () {
        var current = scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current;

        if (current) {
          var bottom = current.scrollHeight - current.scrollTop - current.offsetHeight;

          if (scrollBottom < bottom) {
            current.scrollTop += bottom - scrollBottom;
          }
        }
      };

      return /*#__PURE__*/React__default["default"].createElement(Channel_components_Message, {
        handleScroll: handleScroll,
        renderMessage: renderMessage,
        message: m,
        hasSeparator: hasSeparator,
        chainTop: chainTop,
        chainBottom: chainBottom,
        renderCustomSeparator: renderCustomSeparator,
        key: m.messageId + uuid.uuidv4()
      });
    });
  }, [allMessages]);

  if (allMessages.length < 1) {
    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, (renderPlaceholderEmpty === null || renderPlaceholderEmpty === void 0 ? void 0 : renderPlaceholderEmpty()) || /*#__PURE__*/React__default["default"].createElement(ui_PlaceHolder.PlaceHolder, {
      className: "sendbird-conversation__no-messages",
      type: ui_PlaceHolder.PlaceHolderTypes.NO_MESSAGES
    }));
  }

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-conversation__messages"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-conversation__scroll-container"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-conversation__padding"
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-conversation__messages-padding",
    ref: scrollRef,
    onScroll: onScroll
  }, memoizedAllMessages)), // This flag is an unmatched variable
  scrollBottom > 1 && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-conversation__scroll-bottom-button",
    onClick: onClickScrollBot,
    onKeyDown: onClickScrollBot,
    tabIndex: 0,
    role: "button"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    width: "24px",
    height: "24px",
    type: ui_Icon.IconTypes.CHEVRON_DOWN,
    fillColor: ui_Icon.IconColors.PRIMARY
  })));
};

module.exports = MessageList;
//# sourceMappingURL=MessageList.js.map
