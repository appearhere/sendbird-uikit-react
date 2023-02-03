import { a as __spreadArray } from '../../tslib.es6-75bd0528.js';
import React__default, { useState, useContext, useRef, useLayoutEffect, useEffect, useMemo } from 'react';
import { f as format } from '../../index-229a0736.js';
import { u as useLocalization } from '../../LocalizationContext-e5f35d14.js';
import DateSeparator from '../../ui/DateSeparator.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../../index-f60cbf08.js';
import { R as RemoveMessage } from '../../RemoveMessageModal-6f5adba5.js';
import FileViewer from '../../ui/FileViewer.js';
import { u as useThreadContext } from '../../ThreadProvider-5ccbbc4b.js';
import useSendbirdStateContext from '../../useSendbirdStateContext.js';
import SuggestedMentionList from '../../Channel/components/SuggestedMentionList.js';
import MessageInput from '../../ui/MessageInput.js';
import { ThreadListStateTypes } from '../context/types.js';
import { M as MessageInputKeys } from '../../const-fcaed0ae.js';
import ContextMenu, { MenuItems } from '../../ui/ContextMenu.js';
import Avatar from '../../ui/Avatar.js';
import { a as UserProfileContext } from '../../UserProfileContext-517994e3.js';
import UserProfile from '../../ui/UserProfile.js';
import MessageItemMenu from '../../ui/MessageItemMenu.js';
import MessageItemReactionMenu from '../../ui/MessageItemReactionMenu.js';
import { y as getUIKitMessageTypes, z as getSenderName, h as getClassName, A as isTextMessage, B as isOGMessage, C as getUIKitMessageType, n as isThumbnailMessage } from '../../index-105a85f4.js';
import { M as MessageStatus } from '../../index-1cb2692d.js';
import EmojiReactions from '../../ui/EmojiReactions.js';
import TextMessageItemBody from '../../ui/TextMessageItemBody.js';
import OGMessageItemBody from '../../ui/OGMessageItemBody.js';
import FileMessageItemBody from '../../ui/FileMessageItemBody.js';
import ThumbnailMessageItemBody from '../../ui/ThumbnailMessageItemBody.js';
import UnknownMessageItemBody from '../../ui/UnknownMessageItemBody.js';
import { Role } from '@sendbird/chat';
import '../../index-5dcd7e0f.js';
import '../../stringSet-42c0e16e.js';
import '../../color-52d916b6.js';
import 'prop-types';
import '../../ui/Modal.js';
import 'react-dom';
import '../../index-5ab5d8fe.js';
import '../../ui/Button.js';
import '../../ui/Icon.js';
import '../../ui/IconButton.js';
import '../../MediaQueryContext-0ce6633d.js';
import '../../utils/message/getOutgoingMessageState.js';
import '../../ui/ImageRenderer.js';
import '../../uuid-392016d0.js';
import '../../topics-0560d548.js';
import '@sendbird/chat/groupChannel';
import '@sendbird/chat/message';
import '../../withSendbird.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import '../../ChannelProvider-3f08837d.js';
import '../../compareIds-fd8fd31e.js';
import '../../const-03d71a8a.js';
import '../../ui/ReactionButton.js';
import '../../ui/SortByRow.js';
import 'react-dom/server';
import '../../ui/MentionUserLabel.js';
import '../../sendbirdSelectors.js';
import '../../utils-8a4a2ff6.js';
import '../../ui/Loader.js';
import '../../index-05bd476f.js';
import '../../index-81d63e09.js';
import '../../ui/Tooltip.js';
import '../../ui/TooltipWrapper.js';
import '../../ui/ReactionBadge.js';
import '../../ui/Word.js';
import '../../ui/LinkLabel.js';
import '../../ui/MentionLabel.js';
import '../../ui/TextButton.js';

function ThreadListItemContent(_a) {
  var _b, _c, _d, _e;

  var className = _a.className,
      userId = _a.userId,
      channel = _a.channel,
      message = _a.message,
      _f = _a.disabled,
      disabled = _f === void 0 ? false : _f,
      _g = _a.chainTop,
      chainTop = _g === void 0 ? false : _g,
      _h = _a.chainBottom,
      chainBottom = _h === void 0 ? false : _h,
      _j = _a.isMentionEnabled,
      isMentionEnabled = _j === void 0 ? false : _j,
      _k = _a.isReactionEnabled,
      isReactionEnabled = _k === void 0 ? false : _k,
      _l = _a.disableQuoteMessage,
      disableQuoteMessage = _l === void 0 ? false : _l,
      replyType = _a.replyType,
      nicknamesMap = _a.nicknamesMap,
      emojiContainer = _a.emojiContainer,
      showEdit = _a.showEdit,
      showRemove = _a.showRemove,
      showFileViewer = _a.showFileViewer,
      resendMessage = _a.resendMessage,
      toggleReaction = _a.toggleReaction,
      onReplyInThread = _a.onReplyInThread;
  var messageTypes = getUIKitMessageTypes();
  var dateLocale = useLocalization().dateLocale;

  var _m = useState(false),
      supposedHover = _m[0],
      setSupposedHover = _m[1];

  var _o = useContext(UserProfileContext),
      disableUserProfile = _o.disableUserProfile,
      renderUserProfile = _o.renderUserProfile;

  var avatarRef = useRef(null);
  var isByMe = userId === ((_b = message === null || message === void 0 ? void 0 : message.sender) === null || _b === void 0 ? void 0 : _b.userId) || (message === null || message === void 0 ? void 0 : message.sendingStatus) === 'pending' || (message === null || message === void 0 ? void 0 : message.sendingStatus) === 'failed';
  var useReplying = !!((replyType === 'QUOTE_REPLY' || replyType === 'THREAD') && (message === null || message === void 0 ? void 0 : message.parentMessageId) && (message === null || message === void 0 ? void 0 : message.parentMessage) && !disableQuoteMessage);
  var supposedHoverClassName = supposedHover ? 'sendbird-mouse-hover' : '';
  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-thread-list-item-content ".concat(className, " ").concat(isByMe ? 'outgoing' : 'incoming')
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-thread-list-item-content__left ".concat(isReactionEnabled ? 'use-reaction' : '', " ").concat(isByMe ? 'outgoing' : 'incoming')
  }, !isByMe && !chainBottom && /*#__PURE__*/React__default.createElement(ContextMenu, {
    menuTrigger: function (toggleDropdown) {
      var _a, _b, _c;

      return /*#__PURE__*/React__default.createElement(Avatar, {
        className: "sendbird-thread-list-item-content__left__avatar",
        src: ((_b = (_a = channel === null || channel === void 0 ? void 0 : channel.members) === null || _a === void 0 ? void 0 : _a.find(function (member) {
          var _a;

          return (member === null || member === void 0 ? void 0 : member.userId) === ((_a = message === null || message === void 0 ? void 0 : message.sender) === null || _a === void 0 ? void 0 : _a.userId);
        })) === null || _b === void 0 ? void 0 : _b.profileUrl) || ((_c = message === null || message === void 0 ? void 0 : message.sender) === null || _c === void 0 ? void 0 : _c.profileUrl) || '',
        ref: avatarRef,
        width: "28px",
        height: "28px",
        onClick: function () {
          if (!disableUserProfile) {
            toggleDropdown === null || toggleDropdown === void 0 ? void 0 : toggleDropdown();
          }
        }
      });
    },
    menuItems: function (closeDropdown) {
      return /*#__PURE__*/React__default.createElement(MenuItems, {
        parentRef: avatarRef,
        parentContainRef: avatarRef,
        closeDropdown: closeDropdown,
        style: {
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      }, renderUserProfile ? renderUserProfile({
        user: message === null || message === void 0 ? void 0 : message.sender,
        close: closeDropdown
      }) : /*#__PURE__*/React__default.createElement(UserProfile, {
        user: message === null || message === void 0 ? void 0 : message.sender,
        onSuccess: closeDropdown
      }));
    }
  }), isByMe && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-thread-list-item-content-menu ".concat(isReactionEnabled ? 'use-reaction' : '', " ").concat(isByMe ? 'outgoing' : 'incoming', " ").concat(supposedHoverClassName)
  }, /*#__PURE__*/React__default.createElement(MessageItemMenu, {
    className: "sendbird-thread-list-item-content-menu__normal-menu",
    channel: channel,
    message: message,
    isByMe: isByMe,
    replyType: replyType,
    disabled: disabled,
    showEdit: showEdit,
    showRemove: showRemove,
    resendMessage: resendMessage,
    setSupposedHover: setSupposedHover,
    onReplyInThread: onReplyInThread
  }), isReactionEnabled && /*#__PURE__*/React__default.createElement(MessageItemReactionMenu, {
    className: "sendbird-thread-list-item-content-menu__reaction-menu",
    message: message,
    userId: userId,
    spaceFromTrigger: {},
    emojiContainer: emojiContainer,
    toggleReaction: toggleReaction,
    setSupposedHover: setSupposedHover
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-thread-list-item-content__middle"
  }, !isByMe && !chainTop && !useReplying && /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-thread-list-item-content__middle__sender-name",
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, ((_d = (_c = channel === null || channel === void 0 ? void 0 : channel.members) === null || _c === void 0 ? void 0 : _c.find(function (member) {
    var _a;

    return (member === null || member === void 0 ? void 0 : member.userId) === ((_a = message === null || message === void 0 ? void 0 : message.sender) === null || _a === void 0 ? void 0 : _a.userId);
  })) === null || _d === void 0 ? void 0 : _d.nickname) || getSenderName(message) // TODO: Divide getting profileUrl logic to utils
  ), /*#__PURE__*/React__default.createElement("div", {
    className: getClassName(['sendbird-thread-list-item-content__middle__body-container'])
  }, isByMe && !chainBottom && /*#__PURE__*/React__default.createElement("div", {
    className: getClassName(['sendbird-thread-list-item-content__middle__body-container__created-at', 'left', supposedHoverClassName])
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-thread-list-item-content__middle__body-container__created-at__component-container"
  }, /*#__PURE__*/React__default.createElement(MessageStatus, {
    message: message,
    channel: channel
  }))), isTextMessage(message) && /*#__PURE__*/React__default.createElement(TextMessageItemBody, {
    className: "sendbird-thread-list-item-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    isMentionEnabled: isMentionEnabled,
    isReactionEnabled: isReactionEnabled
  }), isOGMessage(message) && /*#__PURE__*/React__default.createElement(OGMessageItemBody, {
    className: "sendbird-thread-list-item-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    isMentionEnabled: isMentionEnabled,
    isReactionEnabled: isReactionEnabled
  }), getUIKitMessageType(message) === messageTypes.FILE && /*#__PURE__*/React__default.createElement(FileMessageItemBody, {
    className: "sendbird-thread-list-item-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    isReactionEnabled: isReactionEnabled,
    truncateLimit: isByMe ? 18 : 14
  }), isThumbnailMessage(message) && /*#__PURE__*/React__default.createElement(ThumbnailMessageItemBody, {
    className: "sendbird-thread-list-item-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    isReactionEnabled: isReactionEnabled,
    showFileViewer: showFileViewer,
    style: {
      width: '200px',
      height: '148px'
    }
  }), getUIKitMessageType(message) === messageTypes.UNKNOWN && /*#__PURE__*/React__default.createElement(UnknownMessageItemBody, {
    className: "sendbird-thread-list-item-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    isReactionEnabled: isReactionEnabled
  }), isReactionEnabled && ((_e = message === null || message === void 0 ? void 0 : message.reactions) === null || _e === void 0 ? void 0 : _e.length) > 0 && /*#__PURE__*/React__default.createElement("div", {
    className: getClassName(['sendbird-thread-list-item-content-reactions', !isByMe || isThumbnailMessage(message) || isOGMessage(message) ? '' : 'primary'])
  }, /*#__PURE__*/React__default.createElement(EmojiReactions, {
    userId: userId,
    message: message,
    isByMe: isByMe,
    emojiContainer: emojiContainer,
    memberNicknamesMap: nicknamesMap,
    toggleReaction: toggleReaction
  })), !isByMe && !chainBottom && /*#__PURE__*/React__default.createElement(Label, {
    className: getClassName(['sendbird-thread-list-item-content__middle__body-container__created-at', 'right', supposedHoverClassName]),
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, format((message === null || message === void 0 ? void 0 : message.createdAt) || 0, 'p', {
    locale: dateLocale
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-thread-list-item-content__right ".concat(chainTop ? 'chain-top' : '', " ").concat(isByMe ? 'outgoing' : 'incoming')
  }, !isByMe && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-thread-list-item-content-menu ".concat(supposedHoverClassName)
  }, isReactionEnabled && /*#__PURE__*/React__default.createElement(MessageItemReactionMenu, {
    className: "sendbird-thread-list-item-content-menu__reaction-menu",
    message: message,
    userId: userId,
    spaceFromTrigger: {},
    emojiContainer: emojiContainer,
    toggleReaction: toggleReaction,
    setSupposedHover: setSupposedHover
  }), /*#__PURE__*/React__default.createElement(MessageItemMenu, {
    className: "sendbird-thread-list-item-content-menu__normal-menu",
    channel: channel,
    message: message,
    isByMe: isByMe,
    replyType: replyType,
    disabled: disabled,
    showRemove: showRemove,
    resendMessage: resendMessage,
    setSupposedHover: setSupposedHover,
    onReplyInThread: onReplyInThread
  }))));
}

function ThreadListItem(_a) {
  var _b, _c, _d, _e;

  var className = _a.className,
      message = _a.message,
      chainTop = _a.chainTop,
      chainBottom = _a.chainBottom,
      hasSeparator = _a.hasSeparator,
      renderCustomSeparator = _a.renderCustomSeparator,
      handleScroll = _a.handleScroll;

  var _f = useSendbirdStateContext(),
      stores = _f.stores,
      config = _f.config;

  var isReactionEnabled = config.isReactionEnabled,
      isMentionEnabled = config.isMentionEnabled,
      isOnline = config.isOnline,
      replyType = config.replyType,
      userMention = config.userMention;
  var userId = (_c = (_b = stores === null || stores === void 0 ? void 0 : stores.userStore) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.userId;
  var dateLocale = useLocalization().dateLocale;
  var threadContext = useThreadContext === null || useThreadContext === void 0 ? void 0 : useThreadContext();
  var currentChannel = threadContext.currentChannel,
      nicknamesMap = threadContext.nicknamesMap,
      emojiContainer = threadContext.emojiContainer,
      toggleReaction = threadContext.toggleReaction,
      threadListState = threadContext.threadListState,
      updateMessage = threadContext.updateMessage,
      resendMessage = threadContext.resendMessage,
      deleteMessage = threadContext.deleteMessage,
      isMuted = threadContext.isMuted,
      isChannelFrozen = threadContext.isChannelFrozen;
  var openingMessage = threadContext === null || threadContext === void 0 ? void 0 : threadContext.message;

  var _g = useState(false),
      showEdit = _g[0],
      setShowEdit = _g[1];

  var _h = useState(false),
      showRemove = _h[0],
      setShowRemove = _h[1];

  var _j = useState(false),
      showFileViewer = _j[0],
      setShowFileViewer = _j[1];

  var usingReaction = isReactionEnabled && !(currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.isSuper) && !(currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.isBroadcast); // Move to message

  var messageScrollRef = useRef(null);
  useLayoutEffect(function () {
    var _a;

    if ((openingMessage === null || openingMessage === void 0 ? void 0 : openingMessage.messageId) === (message === null || message === void 0 ? void 0 : message.messageId) && (messageScrollRef === null || messageScrollRef === void 0 ? void 0 : messageScrollRef.current)) {
      (_a = messageScrollRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
        block: 'center',
        inline: 'center'
      });
    }
  }, [openingMessage, messageScrollRef === null || messageScrollRef === void 0 ? void 0 : messageScrollRef.current]); // reactions

  useLayoutEffect(function () {
    handleScroll === null || handleScroll === void 0 ? void 0 : handleScroll();
  }, [showEdit, (_d = message === null || message === void 0 ? void 0 : message.reactions) === null || _d === void 0 ? void 0 : _d.length]); // mention

  var editMessageInputRef = useRef(null);

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

  var displaySuggestedMentionList = isOnline && isMentionEnabled && mentionNickname.length > 0 && !isMuted && !(isChannelFrozen && !(currentChannel.myRole === Role.OPERATOR));
  useEffect(function () {
    if ((mentionedUsers === null || mentionedUsers === void 0 ? void 0 : mentionedUsers.length) >= (userMention === null || userMention === void 0 ? void 0 : userMention.maxMentionCount)) {
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
  }, [mentionedUserIds]); // edit input

  var disabled = !(threadListState === ThreadListStateTypes.INITIALIZED) || !isOnline || isMuted || isChannelFrozen; // memorize

  var MemorizedSeparator = useMemo(function () {
    if (typeof renderCustomSeparator === 'function') {
      return renderCustomSeparator === null || renderCustomSeparator === void 0 ? void 0 : renderCustomSeparator({
        message: message
      });
    }
  }, [message, renderCustomSeparator]); // Edit message

  if (showEdit && message.isUserMessage()) {
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, displaySuggestedMentionList && /*#__PURE__*/React__default.createElement(SuggestedMentionList, {
      targetNickname: mentionNickname,
      inputEvent: messageInputEvent // renderUserMentionItem={renderUserMentionItem}
      ,
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
      maxMentionCount: userMention === null || userMention === void 0 ? void 0 : userMention.maxMentionCount,
      maxSuggestionCount: userMention === null || userMention === void 0 ? void 0 : userMention.maxSuggestionCount
    }), /*#__PURE__*/React__default.createElement(MessageInput, {
      isEdit: true,
      disabled: disabled,
      ref: editMessageInputRef,
      mentionSelectedUser: selectedUser,
      isMentionEnabled: isMentionEnabled,
      message: message,
      onStartTyping: function () {
        var _a;

        (_a = currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.startTyping) === null || _a === void 0 ? void 0 : _a.call(currentChannel);
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
        (_b = currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.endTyping) === null || _b === void 0 ? void 0 : _b.call(currentChannel);
      },
      onCancelEdit: function () {
        var _a;

        setMentionNickname('');
        setMentionedUsers([]);
        setMentionedUserIds([]);
        setMentionSuggestedUsers([]);
        setShowEdit(false);
        (_a = currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.endTyping) === null || _a === void 0 ? void 0 : _a.call(currentChannel);
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
    ref: messageScrollRef,
    className: "sendbird-thread-list-item ".concat(className)
  }, hasSeparator && (message === null || message === void 0 ? void 0 : message.createdAt) && (MemorizedSeparator || /*#__PURE__*/React__default.createElement(DateSeparator, null, /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, format(message === null || message === void 0 ? void 0 : message.createdAt, 'MMM dd, yyyy', {
    locale: dateLocale
  })))), /*#__PURE__*/React__default.createElement(ThreadListItemContent, {
    userId: userId,
    channel: currentChannel,
    message: message,
    chainTop: chainTop,
    chainBottom: chainBottom,
    isReactionEnabled: usingReaction,
    isMentionEnabled: isMentionEnabled,
    disableQuoteMessage: true,
    replyType: replyType,
    nicknamesMap: nicknamesMap,
    emojiContainer: emojiContainer,
    resendMessage: resendMessage,
    showRemove: setShowRemove,
    showFileViewer: setShowFileViewer,
    toggleReaction: toggleReaction,
    showEdit: setShowEdit
  }), showRemove && /*#__PURE__*/React__default.createElement(RemoveMessage, {
    message: message,
    onCancel: function () {
      return setShowRemove(false);
    }
  }), showFileViewer && /*#__PURE__*/React__default.createElement(FileViewer, {
    message: message,
    isByMe: ((_e = message === null || message === void 0 ? void 0 : message.sender) === null || _e === void 0 ? void 0 : _e.userId) === userId,
    onClose: function () {
      return setShowFileViewer(false);
    },
    onDelete: function () {
      deleteMessage(message);
      setShowFileViewer(false);
    }
  }));
}

export { ThreadListItem as default };
//# sourceMappingURL=ThreadListItem.js.map
