'use strict';

var React = require('react');
var useSendbirdStateContext = require('../../useSendbirdStateContext.js');
var Channel_context = require('../../ChannelProvider-4d043480.js');
var ui_PlaceHolder = require('../../index-6b9230ae.js');
var ui_ConnectionStatus = require('../../ui/ConnectionStatus.js');
var Channel_components_ChannelHeader = require('./ChannelHeader.js');
var Channel_components_MessageList = require('./MessageList.js');
var Channel_components_TypingIndicator = require('./TypingIndicator.js');
var Channel_components_FrozenNotification = require('./FrozenNotification.js');
var Channel_components_UnreadCount = require('./UnreadCount.js');
var Channel_components_MessageInput = require('./MessageInput.js');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('../../UserProfileContext-fd00d1bd.js');
require('prop-types');
require('../../index-5977bdd5.js');
require('../../index-d4bc012c.js');
require('../../topics-085b5602.js');
require('../../index-d05a5cae.js');
require('../../tslib.es6-d6068b10.js');
require('../../utils/message/getOutgoingMessageState.js');
require('../../compareIds-5d186d0d.js');
require('../../const-43cebab9.js');
require('@sendbird/chat/groupChannel');
require('../../uuid-2f4916c1.js');
require('@sendbird/chat/message');
require('../../ui/ContextMenu.js');
require('react-dom');
require('../../ui/SortByRow.js');
require('../../index-4197d014.js');
require('../../stringSet-2dfd148b.js');
require('../../ui/ReactionButton.js');
require('../../ui/ImageRenderer.js');
require('../../ui/Icon.js');
require('../../LocalizationContext-f4281153.js');
require('../../ui/Loader.js');
require('../../utils-88ce8023.js');
require('../../ui/IconButton.js');
require('../../ui/ChannelAvatar.js');
require('../../ui/Avatar.js');
require('../../utils-6eb1ca73.js');
require('../../MediaQueryContext-9a5566fc.js');
require('../../utils-a9158c72.js');
require('../../index-fb9d8ec0.js');
require('./Message.js');
require('./SuggestedMentionList.js');
require('../../const-28829306.js');
require('../../ThreadProvider-5c14e997.js');
require('../../Thread/context/types.js');
require('@sendbird/chat');
require('../../ui/DateSeparator.js');
require('../../color-0fae7c8e.js');
require('../../ui/MessageInput.js');
require('react-dom/server');
require('../../ui/Button.js');
require('../../ui/MentionUserLabel.js');
require('../../ui/MessageContent.js');
require('../../ui/UserProfile.js');
require('../../sendbirdSelectors.js');
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
require('../../ui/QuoteMessageInput.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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

  var _f = Channel_context.useChannelContext(),
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

  var _g = React.useState(0),
      unreadCount = _g[0],
      setUnreadCount = _g[1];

  React.useEffect(function () {
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
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "sendbird-conversation"
    }, (renderPlaceholderLoader === null || renderPlaceholderLoader === void 0 ? void 0 : renderPlaceholderLoader()) || /*#__PURE__*/React__default["default"].createElement(ui_PlaceHolder.PlaceHolder, {
      type: ui_PlaceHolder.PlaceHolderTypes.LOADING
    }));
  }

  if (!channelUrl) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "sendbird-conversation"
    }, (renderPlaceholderInvalid === null || renderPlaceholderInvalid === void 0 ? void 0 : renderPlaceholderInvalid()) || /*#__PURE__*/React__default["default"].createElement(ui_PlaceHolder.PlaceHolder, {
      type: ui_PlaceHolder.PlaceHolderTypes.NO_CHANNELS
    }));
  }

  if (isInvalid) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "sendbird-conversation"
    }, (renderPlaceholderInvalid === null || renderPlaceholderInvalid === void 0 ? void 0 : renderPlaceholderInvalid()) || /*#__PURE__*/React__default["default"].createElement(ui_PlaceHolder.PlaceHolder, {
      type: ui_PlaceHolder.PlaceHolderTypes.WRONG
    }));
  }

  if (sdkError) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "sendbird-conversation"
    }, (renderPlaceholderInvalid === null || renderPlaceholderInvalid === void 0 ? void 0 : renderPlaceholderInvalid()) || /*#__PURE__*/React__default["default"].createElement(ui_PlaceHolder.PlaceHolder, {
      type: ui_PlaceHolder.PlaceHolderTypes.WRONG,
      retryToConnect: function () {
        logger.info('Channel: reconnecting'); // reconnect();
      }
    }));
  }

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-conversation"
  }, (renderChannelHeader === null || renderChannelHeader === void 0 ? void 0 : renderChannelHeader()) || /*#__PURE__*/React__default["default"].createElement(Channel_components_ChannelHeader, null), (currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.isFrozen) && /*#__PURE__*/React__default["default"].createElement(Channel_components_FrozenNotification, null), unreadCount > 0 && /*#__PURE__*/React__default["default"].createElement(Channel_components_UnreadCount, {
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
          type: Channel_context.MARK_AS_READ,
          payload: {
            channel: currentGroupChannel
          }
        });
      }

      setInitialTimeStamp(null);
      setAnimatedMessageId(null);
      setHighLightedMessageId(null);
    }
  }), loading ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-conversation"
  }, (renderPlaceholderLoader === null || renderPlaceholderLoader === void 0 ? void 0 : renderPlaceholderLoader()) || /*#__PURE__*/React__default["default"].createElement(ui_PlaceHolder.PlaceHolder, {
    type: ui_PlaceHolder.PlaceHolderTypes.LOADING
  })) : /*#__PURE__*/React__default["default"].createElement(Channel_components_MessageList, {
    renderMessage: renderMessage,
    renderPlaceholderEmpty: renderPlaceholderEmpty,
    renderCustomSeparator: renderCustomSeparator
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-conversation__footer"
  }, (renderMessageInput === null || renderMessageInput === void 0 ? void 0 : renderMessageInput()) || /*#__PURE__*/React__default["default"].createElement(Channel_components_MessageInput, null), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-conversation__footer__typing-indicator"
  }, (renderTypingIndicator === null || renderTypingIndicator === void 0 ? void 0 : renderTypingIndicator()) || /*#__PURE__*/React__default["default"].createElement(Channel_components_TypingIndicator["default"], null), !isOnline && /*#__PURE__*/React__default["default"].createElement(ui_ConnectionStatus, null))));
};

module.exports = ChannelUI;
//# sourceMappingURL=ChannelUI.js.map
