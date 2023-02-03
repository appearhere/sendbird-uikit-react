import { a as __spreadArray } from '../../tslib.es6-75bd0528.js';
import React__default, { useState, useRef, useEffect, useLayoutEffect, useMemo } from 'react';
import { f as format } from '../../index-229a0736.js';
import SuggestedMentionList from './SuggestedMentionList.js';
import useSendbirdStateContext from '../../useSendbirdStateContext.js';
import { u as useChannelContext, a as isDisabledBecauseFrozen, b as isDisabledBecauseMuted } from '../../ChannelProvider-3f08837d.js';
import { h as getClassName } from '../../index-105a85f4.js';
import { M as MAX_USER_MENTION_COUNT, a as MAX_USER_SUGGESTION_COUNT } from '../../const-03d71a8a.js';
import DateSeparator from '../../ui/DateSeparator.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../../index-f60cbf08.js';
import MessageInput from '../../ui/MessageInput.js';
import MessageContent from '../../ui/MessageContent.js';
import FileViewer from './FileViewer.js';
import RemoveMessage from './RemoveMessageModal.js';
import { M as MessageInputKeys } from '../../const-fcaed0ae.js';
import { u as useLocalization } from '../../LocalizationContext-e5f35d14.js';
import '../../index-5dcd7e0f.js';
import '../../ui/Icon.js';
import 'prop-types';
import '../../ui/Avatar.js';
import '../../ui/ImageRenderer.js';
import '../../uuid-392016d0.js';
import '../../ThreadProvider-5ccbbc4b.js';
import '../../utils/message/getOutgoingMessageState.js';
import '../../UserProfileContext-517994e3.js';
import '../../Thread/context/types.js';
import '@sendbird/chat';
import '../../topics-0560d548.js';
import '@sendbird/chat/groupChannel';
import '@sendbird/chat/message';
import '../../withSendbird.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import '../../compareIds-fd8fd31e.js';
import '../../ui/ContextMenu.js';
import 'react-dom';
import '../../ui/SortByRow.js';
import '../../stringSet-42c0e16e.js';
import '../../ui/ReactionButton.js';
import '../../color-52d916b6.js';
import 'react-dom/server';
import '../../ui/IconButton.js';
import '../../ui/Button.js';
import '../../ui/MentionUserLabel.js';
import '../../ui/UserProfile.js';
import '../../sendbirdSelectors.js';
import '../../utils-8a4a2ff6.js';
import '../../index-1cb2692d.js';
import '../../ui/Loader.js';
import '../../index-05bd476f.js';
import '../../index-81d63e09.js';
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
import '../../ui/Modal.js';

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
  var dateLocale = useLocalization().dateLocale;
  var globalStore = useSendbirdStateContext();

  var _c = globalStore === null || globalStore === void 0 ? void 0 : globalStore.config,
      userId = _c.userId,
      isOnline = _c.isOnline,
      isMentionEnabled = _c.isMentionEnabled,
      userMention = _c.userMention;

  var maxUserMentionCount = (userMention === null || userMention === void 0 ? void 0 : userMention.maxMentionCount) || MAX_USER_MENTION_COUNT;
  var maxUserSuggestionCount = (userMention === null || userMention === void 0 ? void 0 : userMention.maxSuggestionCount) || MAX_USER_SUGGESTION_COUNT;

  var _d = useChannelContext(),
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

  var _e = useState(false),
      showEdit = _e[0],
      setShowEdit = _e[1];

  var _f = useState(false),
      showRemove = _f[0],
      setShowRemove = _f[1];

  var _g = useState(false),
      showFileViewer = _g[0],
      setShowFileViewer = _g[1];

  var _h = useState(false),
      isAnimated = _h[0],
      setIsAnimated = _h[1];

  var _j = useState(false),
      isHighlighted = _j[0],
      setIsHighlighted = _j[1];

  var _k = useState(''),
      mentionNickname = _k[0],
      setMentionNickname = _k[1];

  var _l = useState([]),
      mentionedUsers = _l[0],
      setMentionedUsers = _l[1];

  var _m = useState([]),
      mentionedUserIds = _m[0],
      setMentionedUserIds = _m[1];

  var _o = useState(null),
      messageInputEvent = _o[0],
      setMessageInputEvent = _o[1];

  var _p = useState(null),
      selectedUser = _p[0],
      setSelectedUser = _p[1];

  var _q = useState([]),
      mentionSuggestedUsers = _q[0],
      setMentionSuggestedUsers = _q[1];

  var _r = useState(true),
      ableMention = _r[0],
      setAbleMention = _r[1];

  var editMessageInputRef = useRef(null);
  var useMessageScrollRef = useRef(null);
  var displaySuggestedMentionList = isOnline && isMentionEnabled && mentionNickname.length > 0 && !isDisabledBecauseFrozen(currentGroupChannel) && !isDisabledBecauseMuted(currentGroupChannel);
  var disabled = !initialized || isDisabledBecauseFrozen(currentGroupChannel) || isDisabledBecauseMuted(currentGroupChannel) || !isOnline;
  useEffect(function () {
    if ((mentionedUsers === null || mentionedUsers === void 0 ? void 0 : mentionedUsers.length) >= maxUserMentionCount) {
      setAbleMention(false);
    } else {
      setAbleMention(true);
    }
  }, [mentionedUsers]);
  useEffect(function () {
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
  useLayoutEffect(function () {
    handleScroll === null || handleScroll === void 0 ? void 0 : handleScroll();
  }, [showEdit, (_a = message === null || message === void 0 ? void 0 : message.reactions) === null || _a === void 0 ? void 0 : _a.length]);
  useLayoutEffect(function () {
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
  useLayoutEffect(function () {
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
  var renderedMessage = useMemo(function () {
    return renderMessage === null || renderMessage === void 0 ? void 0 : renderMessage({
      message: message,
      chainTop: chainTop,
      chainBottom: chainBottom
    });
  }, [message, renderMessage]);
  var renderedCustomSeparator = useMemo(function () {
    if (renderCustomSeparator) {
      return renderCustomSeparator === null || renderCustomSeparator === void 0 ? void 0 : renderCustomSeparator({
        message: message
      });
    }

    return null;
  }, [message, renderCustomSeparator]);

  if (renderedMessage) {
    return /*#__PURE__*/React__default.createElement("div", {
      ref: useMessageScrollRef,
      className: getClassName(['sendbird-msg-hoc sendbird-msg--scroll-ref', isAnimated ? 'sendbird-msg-hoc__animated' : '', isHighlighted ? 'sendbird-msg-hoc__highlighted' : ''])
    }, // TODO: Add message instance as a function parameter
    hasSeparator && (renderedCustomSeparator || /*#__PURE__*/React__default.createElement(DateSeparator, null, /*#__PURE__*/React__default.createElement(Label, {
      type: LabelTypography.CAPTION_2,
      color: LabelColors.ONBACKGROUND_2
    }, format(message.createdAt, 'MMMM dd, yyyy', {
      locale: dateLocale
    })))), renderedMessage);
  }

  if (showEdit && ((_b = message === null || message === void 0 ? void 0 : message.isUserMessage) === null || _b === void 0 ? void 0 : _b.call(message))) {
    return (renderEditInput === null || renderEditInput === void 0 ? void 0 : renderEditInput()) || /*#__PURE__*/React__default.createElement(React__default.Fragment, null, displaySuggestedMentionList && /*#__PURE__*/React__default.createElement(SuggestedMentionList, {
      targetNickname: mentionNickname,
      inputEvent: messageInputEvent,
      renderUserMentionItem: renderUserMentionItem,
      onUserItemClick: function (user) {
        if (user) {
          setMentionedUsers(__spreadArray(__spreadArray([], mentionedUsers, true), [user], false));
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
    }), /*#__PURE__*/React__default.createElement(MessageInput, {
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
        if (displaySuggestedMentionList && (mentionSuggestedUsers === null || mentionSuggestedUsers === void 0 ? void 0 : mentionSuggestedUsers.length) > 0 && (e.key === MessageInputKeys.Enter && ableMention || e.key === MessageInputKeys.ArrowUp || e.key === MessageInputKeys.ArrowDown)) {
          setMessageInputEvent(e);
          return true;
        }

        return false;
      }
    }));
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: getClassName(['sendbird-msg-hoc sendbird-msg--scroll-ref', isAnimated ? 'sendbird-msg-hoc__animated' : '', isHighlighted ? 'sendbird-msg-hoc__highlighted' : '']),
    style: {
      marginBottom: '2px'
    },
    ref: useMessageScrollRef
  }, hasSeparator && (renderedCustomSeparator || /*#__PURE__*/React__default.createElement(DateSeparator, null, /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, format(message.createdAt, 'MMMM dd, yyyy', {
    locale: dateLocale
  })))), (renderMessageContent === null || renderMessageContent === void 0 ? void 0 : renderMessageContent()) || /*#__PURE__*/React__default.createElement(MessageContent, {
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
  }), showRemove && /*#__PURE__*/React__default.createElement(RemoveMessage, {
    message: message,
    onCancel: function () {
      return setShowRemove(false);
    }
  }), showFileViewer && /*#__PURE__*/React__default.createElement(FileViewer, {
    message: message,
    onCancel: function () {
      return setShowFileViewer(false);
    }
  }));
};

export { Message as default };
//# sourceMappingURL=Message.js.map
