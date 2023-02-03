'use strict';

var tslib_es6 = require('../../tslib.es6-d6068b10.js');
var React = require('react');
var index$1 = require('../../index-5977bdd5.js');
var Channel_components_SuggestedMentionList = require('./SuggestedMentionList.js');
var useSendbirdStateContext = require('../../useSendbirdStateContext.js');
var Channel_context = require('../../ChannelProvider-4d043480.js');
var index = require('../../index-d05a5cae.js');
var _const = require('../../const-43cebab9.js');
var ui_DateSeparator = require('../../ui/DateSeparator.js');
var ui_Label = require('../../index-4197d014.js');
var ui_MessageInput = require('../../ui/MessageInput.js');
var ui_MessageContent = require('../../ui/MessageContent.js');
var Channel_components_FileViewer = require('./FileViewer.js');
var Channel_components_RemoveMessageModal = require('./RemoveMessageModal.js');
var _const$1 = require('../../const-28829306.js');
var LocalizationContext = require('../../LocalizationContext-f4281153.js');
require('../../index-d4bc012c.js');
require('../../ui/Icon.js');
require('prop-types');
require('../../ui/Avatar.js');
require('../../ui/ImageRenderer.js');
require('../../uuid-2f4916c1.js');
require('../../ThreadProvider-5c14e997.js');
require('../../utils/message/getOutgoingMessageState.js');
require('../../UserProfileContext-fd00d1bd.js');
require('../../Thread/context/types.js');
require('@sendbird/chat');
require('../../topics-085b5602.js');
require('@sendbird/chat/groupChannel');
require('@sendbird/chat/message');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('../../compareIds-5d186d0d.js');
require('../../ui/ContextMenu.js');
require('react-dom');
require('../../ui/SortByRow.js');
require('../../stringSet-2dfd148b.js');
require('../../ui/ReactionButton.js');
require('../../color-0fae7c8e.js');
require('react-dom/server');
require('../../ui/IconButton.js');
require('../../ui/Button.js');
require('../../ui/MentionUserLabel.js');
require('../../ui/UserProfile.js');
require('../../sendbirdSelectors.js');
require('../../utils-a9158c72.js');
require('../../index-daac2dae.js');
require('../../ui/Loader.js');
require('../../index-661b02a2.js');
require('../../index-fb9d8ec0.js');
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
require('../../ui/Modal.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Message = function (props) {
  var _a, _b;

  var message = props.message,
      hasSeparator = props.hasSeparator,
      chainTop = props.chainTop,
      chainBottom = props.chainBottom,
      handleScroll = props.handleScroll,
      renderCustomSeparator = props.renderCustomSeparator,
      renderEditInput = props.renderEditInput,
      renderMessage = props.renderMessage,
      renderMessageContent = props.renderMessageContent;
  var dateLocale = LocalizationContext.useLocalization().dateLocale;
  var globalStore = useSendbirdStateContext();

  var _c = globalStore === null || globalStore === void 0 ? void 0 : globalStore.config,
      userId = _c.userId,
      isOnline = _c.isOnline,
      isMentionEnabled = _c.isMentionEnabled,
      userMention = _c.userMention;

  var maxUserMentionCount = (userMention === null || userMention === void 0 ? void 0 : userMention.maxMentionCount) || _const.MAX_USER_MENTION_COUNT;
  var maxUserSuggestionCount = (userMention === null || userMention === void 0 ? void 0 : userMention.maxSuggestionCount) || _const.MAX_USER_SUGGESTION_COUNT;

  var _d = Channel_context.useChannelContext(),
      initialized = _d.initialized,
      currentGroupChannel = _d.currentGroupChannel,
      highLightedMessageId = _d.highLightedMessageId,
      setHighLightedMessageId = _d.setHighLightedMessageId,
      animatedMessageId = _d.animatedMessageId,
      setAnimatedMessageId = _d.setAnimatedMessageId,
      updateMessage = _d.updateMessage,
      scrollToMessage = _d.scrollToMessage,
      replyType = _d.replyType,
      threadReplySelectType = _d.threadReplySelectType,
      isReactionEnabled = _d.isReactionEnabled,
      toggleReaction = _d.toggleReaction,
      emojiContainer = _d.emojiContainer,
      nicknamesMap = _d.nicknamesMap,
      setQuoteMessage = _d.setQuoteMessage,
      resendMessage = _d.resendMessage,
      renderUserMentionItem = _d.renderUserMentionItem,
      onReplyInThread = _d.onReplyInThread,
      onQuoteMessageClick = _d.onQuoteMessageClick,
      onMessageAnimated = _d.onMessageAnimated,
      onMessageHighlighted = _d.onMessageHighlighted;

  var _e = React.useState(false),
      showEdit = _e[0],
      setShowEdit = _e[1];

  var _f = React.useState(false),
      showRemove = _f[0],
      setShowRemove = _f[1];

  var _g = React.useState(false),
      showFileViewer = _g[0],
      setShowFileViewer = _g[1];

  var _h = React.useState(false),
      isAnimated = _h[0],
      setIsAnimated = _h[1];

  var _j = React.useState(false),
      isHighlighted = _j[0],
      setIsHighlighted = _j[1];

  var _k = React.useState(''),
      mentionNickname = _k[0],
      setMentionNickname = _k[1];

  var _l = React.useState([]),
      mentionedUsers = _l[0],
      setMentionedUsers = _l[1];

  var _m = React.useState([]),
      mentionedUserIds = _m[0],
      setMentionedUserIds = _m[1];

  var _o = React.useState(null),
      messageInputEvent = _o[0],
      setMessageInputEvent = _o[1];

  var _p = React.useState(null),
      selectedUser = _p[0],
      setSelectedUser = _p[1];

  var _q = React.useState([]),
      mentionSuggestedUsers = _q[0],
      setMentionSuggestedUsers = _q[1];

  var _r = React.useState(true),
      ableMention = _r[0],
      setAbleMention = _r[1];

  var editMessageInputRef = React.useRef(null);
  var useMessageScrollRef = React.useRef(null);
  var displaySuggestedMentionList = isOnline && isMentionEnabled && mentionNickname.length > 0 && !Channel_context.isDisabledBecauseFrozen(currentGroupChannel) && !Channel_context.isDisabledBecauseMuted(currentGroupChannel);
  var disabled = !initialized || Channel_context.isDisabledBecauseFrozen(currentGroupChannel) || Channel_context.isDisabledBecauseMuted(currentGroupChannel) || !isOnline;
  React.useEffect(function () {
    if ((mentionedUsers === null || mentionedUsers === void 0 ? void 0 : mentionedUsers.length) >= maxUserMentionCount) {
      setAbleMention(false);
    } else {
      setAbleMention(true);
    }
  }, [mentionedUsers]);
  React.useEffect(function () {
    setMentionedUsers(mentionedUsers.filter(function (_a) {
      var userId = _a.userId;
      var i = mentionedUserIds.indexOf(userId);

      if (i < 0) {
        return false;
      } else {
        mentionedUserIds.splice(i, 1);
        return true;
      }
    }));
  }, [mentionedUserIds]);
  React.useLayoutEffect(function () {
    handleScroll === null || handleScroll === void 0 ? void 0 : handleScroll();
  }, [showEdit, (_a = message === null || message === void 0 ? void 0 : message.reactions) === null || _a === void 0 ? void 0 : _a.length]);
  React.useLayoutEffect(function () {
    if (highLightedMessageId === message.messageId) {
      if (useMessageScrollRef && useMessageScrollRef.current) {
        useMessageScrollRef.current.scrollIntoView({
          block: 'center',
          inline: 'center'
        });
        setIsAnimated(false);
        setTimeout(function () {
          setIsHighlighted(true);
        }, 500);
        setTimeout(function () {
          setHighLightedMessageId(0);
          onMessageHighlighted === null || onMessageHighlighted === void 0 ? void 0 : onMessageHighlighted();
        }, 1600);
      }
    } else {
      setIsHighlighted(false);
    }
  }, [highLightedMessageId, useMessageScrollRef.current, message.messageId]);
  React.useLayoutEffect(function () {
    if (animatedMessageId === message.messageId) {
      if (useMessageScrollRef && useMessageScrollRef.current) {
        useMessageScrollRef.current.scrollIntoView({
          block: 'center',
          inline: 'center'
        });
        setIsHighlighted(false);
        setTimeout(function () {
          setIsAnimated(true);
        }, 500);
        setTimeout(function () {
          setAnimatedMessageId(0);
          onMessageAnimated === null || onMessageAnimated === void 0 ? void 0 : onMessageAnimated();
        }, 1600);
      }
    } else {
      setIsAnimated(false);
    }
  }, [animatedMessageId, useMessageScrollRef.current, message.messageId, onMessageAnimated]);
  var renderedMessage = React.useMemo(function () {
    return renderMessage === null || renderMessage === void 0 ? void 0 : renderMessage({
      message: message,
      chainTop: chainTop,
      chainBottom: chainBottom
    });
  }, [message, renderMessage]);
  var renderedCustomSeparator = React.useMemo(function () {
    if (renderCustomSeparator) {
      return renderCustomSeparator === null || renderCustomSeparator === void 0 ? void 0 : renderCustomSeparator({
        message: message
      });
    }

    return null;
  }, [message, renderCustomSeparator]);

  if (renderedMessage) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      ref: useMessageScrollRef,
      className: index.getClassName(['sendbird-msg-hoc sendbird-msg--scroll-ref', isAnimated ? 'sendbird-msg-hoc__animated' : '', isHighlighted ? 'sendbird-msg-hoc__highlighted' : ''])
    }, // TODO: Add message instance as a function parameter
    hasSeparator && (renderedCustomSeparator || /*#__PURE__*/React__default["default"].createElement(ui_DateSeparator, null, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
      type: ui_Label.LabelTypography.CAPTION_2,
      color: ui_Label.LabelColors.ONBACKGROUND_2
    }, index$1.format(message.createdAt, 'MMMM dd, yyyy', {
      locale: dateLocale
    })))), renderedMessage);
  }

  if (showEdit && ((_b = message === null || message === void 0 ? void 0 : message.isUserMessage) === null || _b === void 0 ? void 0 : _b.call(message))) {
    return (renderEditInput === null || renderEditInput === void 0 ? void 0 : renderEditInput()) || /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, displaySuggestedMentionList && /*#__PURE__*/React__default["default"].createElement(Channel_components_SuggestedMentionList, {
      targetNickname: mentionNickname,
      inputEvent: messageInputEvent,
      renderUserMentionItem: renderUserMentionItem,
      onUserItemClick: function (user) {
        if (user) {
          setMentionedUsers(tslib_es6.__spreadArray(tslib_es6.__spreadArray([], mentionedUsers, true), [user], false));
        }

        setMentionNickname('');
        setSelectedUser(user);
        setMessageInputEvent(null);
      },
      onFocusItemChange: function () {
        setMessageInputEvent(null);
      },
      onFetchUsers: function (users) {
        setMentionSuggestedUsers(users);
      },
      ableAddMention: ableMention,
      maxMentionCount: maxUserMentionCount,
      maxSuggestionCount: maxUserSuggestionCount
    }), /*#__PURE__*/React__default["default"].createElement(ui_MessageInput, {
      isEdit: true,
      disabled: disabled,
      ref: editMessageInputRef,
      mentionSelectedUser: selectedUser,
      isMentionEnabled: isMentionEnabled,
      message: message,
      onStartTyping: function () {
        var _a;

        (_a = currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.startTyping) === null || _a === void 0 ? void 0 : _a.call(currentGroupChannel);
      },
      onUpdateMessage: function (_a) {
        var _b;

        var messageId = _a.messageId,
            message = _a.message,
            mentionTemplate = _a.mentionTemplate;
        updateMessage({
          messageId: messageId,
          message: message,
          mentionedUsers: mentionedUsers,
          mentionTemplate: mentionTemplate
        });
        setShowEdit(false);
        (_b = currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.endTyping) === null || _b === void 0 ? void 0 : _b.call(currentGroupChannel);
      },
      onCancelEdit: function () {
        var _a;

        setMentionNickname('');
        setMentionedUsers([]);
        setMentionedUserIds([]);
        setMentionSuggestedUsers([]);
        setShowEdit(false);
        (_a = currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.endTyping) === null || _a === void 0 ? void 0 : _a.call(currentGroupChannel);
      },
      onUserMentioned: function (user) {
        if ((selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.userId) === (user === null || user === void 0 ? void 0 : user.userId)) {
          setSelectedUser(null);
          setMentionNickname('');
        }
      },
      onMentionStringChange: function (mentionText) {
        setMentionNickname(mentionText);
      },
      onMentionedUserIdsUpdated: function (userIds) {
        setMentionedUserIds(userIds);
      },
      onKeyDown: function (e) {
        if (displaySuggestedMentionList && (mentionSuggestedUsers === null || mentionSuggestedUsers === void 0 ? void 0 : mentionSuggestedUsers.length) > 0 && (e.key === _const$1.MessageInputKeys.Enter && ableMention || e.key === _const$1.MessageInputKeys.ArrowUp || e.key === _const$1.MessageInputKeys.ArrowDown)) {
          setMessageInputEvent(e);
          return true;
        }

        return false;
      }
    }));
  }

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName(['sendbird-msg-hoc sendbird-msg--scroll-ref', isAnimated ? 'sendbird-msg-hoc__animated' : '', isHighlighted ? 'sendbird-msg-hoc__highlighted' : '']),
    style: {
      marginBottom: '2px'
    },
    ref: useMessageScrollRef
  }, hasSeparator && (renderedCustomSeparator || /*#__PURE__*/React__default["default"].createElement(ui_DateSeparator, null, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.CAPTION_2,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, index$1.format(message.createdAt, 'MMMM dd, yyyy', {
    locale: dateLocale
  })))), (renderMessageContent === null || renderMessageContent === void 0 ? void 0 : renderMessageContent()) || /*#__PURE__*/React__default["default"].createElement(ui_MessageContent, {
    className: "sendbird-message-hoc__message-content",
    userId: userId,
    scrollToMessage: scrollToMessage,
    channel: currentGroupChannel,
    message: message,
    disabled: !isOnline,
    chainTop: chainTop,
    chainBottom: chainBottom,
    isReactionEnabled: isReactionEnabled,
    replyType: replyType,
    threadReplySelectType: threadReplySelectType,
    nicknamesMap: nicknamesMap,
    emojiContainer: emojiContainer,
    showEdit: setShowEdit,
    showRemove: setShowRemove,
    showFileViewer: setShowFileViewer,
    resendMessage: resendMessage,
    toggleReaction: toggleReaction,
    setQuoteMessage: setQuoteMessage,
    onReplyInThread: onReplyInThread,
    onQuoteMessageClick: onQuoteMessageClick
  }), showRemove && /*#__PURE__*/React__default["default"].createElement(Channel_components_RemoveMessageModal, {
    message: message,
    onCancel: function () {
      return setShowRemove(false);
    }
  }), showFileViewer && /*#__PURE__*/React__default["default"].createElement(Channel_components_FileViewer["default"], {
    message: message,
    onCancel: function () {
      return setShowFileViewer(false);
    }
  }));
};

module.exports = Message;
//# sourceMappingURL=Message.js.map
