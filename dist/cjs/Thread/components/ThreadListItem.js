'use strict';

var tslib_es6 = require('../../tslib.es6-d6068b10.js');
var React = require('react');
var index$1 = require('../../index-5977bdd5.js');
var LocalizationContext = require('../../LocalizationContext-f4281153.js');
var ui_DateSeparator = require('../../ui/DateSeparator.js');
var ui_Label = require('../../index-4197d014.js');
var RemoveMessageModal = require('../../RemoveMessageModal-4d250f7d.js');
var ui_FileViewer = require('../../ui/FileViewer.js');
var Thread_context = require('../../ThreadProvider-5c14e997.js');
var useSendbirdStateContext = require('../../useSendbirdStateContext.js');
var Channel_components_SuggestedMentionList = require('../../Channel/components/SuggestedMentionList.js');
var ui_MessageInput = require('../../ui/MessageInput.js');
var Thread_context_types = require('../context/types.js');
var _const = require('../../const-28829306.js');
var ui_ContextMenu = require('../../ui/ContextMenu.js');
var ui_Avatar = require('../../ui/Avatar.js');
var UserProfileContext = require('../../UserProfileContext-fd00d1bd.js');
var ui_UserProfile = require('../../ui/UserProfile.js');
var ui_MessageItemMenu = require('../../ui/MessageItemMenu.js');
var ui_MessageItemReactionMenu = require('../../ui/MessageItemReactionMenu.js');
var index = require('../../index-d05a5cae.js');
var ui_MessageStatus = require('../../index-daac2dae.js');
var ui_EmojiReactions = require('../../ui/EmojiReactions.js');
var ui_TextMessageItemBody = require('../../ui/TextMessageItemBody.js');
var ui_OGMessageItemBody = require('../../ui/OGMessageItemBody.js');
var ui_FileMessageItemBody = require('../../ui/FileMessageItemBody.js');
var ui_ThumbnailMessageItemBody = require('../../ui/ThumbnailMessageItemBody.js');
var ui_UnknownMessageItemBody = require('../../ui/UnknownMessageItemBody.js');
var SendbirdChat = require('@sendbird/chat');
require('../../index-d4bc012c.js');
require('../../stringSet-2dfd148b.js');
require('../../color-0fae7c8e.js');
require('prop-types');
require('../../ui/Modal.js');
require('react-dom');
require('../../index-1b132096.js');
require('../../ui/Button.js');
require('../../ui/Icon.js');
require('../../ui/IconButton.js');
require('../../MediaQueryContext-9a5566fc.js');
require('../../utils/message/getOutgoingMessageState.js');
require('../../ui/ImageRenderer.js');
require('../../uuid-2f4916c1.js');
require('../../topics-085b5602.js');
require('@sendbird/chat/groupChannel');
require('@sendbird/chat/message');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('../../ChannelProvider-4d043480.js');
require('../../compareIds-5d186d0d.js');
require('../../const-43cebab9.js');
require('../../ui/ReactionButton.js');
require('../../ui/SortByRow.js');
require('react-dom/server');
require('../../ui/MentionUserLabel.js');
require('../../sendbirdSelectors.js');
require('../../utils-a9158c72.js');
require('../../ui/Loader.js');
require('../../index-661b02a2.js');
require('../../index-fb9d8ec0.js');
require('../../ui/Tooltip.js');
require('../../ui/TooltipWrapper.js');
require('../../ui/ReactionBadge.js');
require('../../ui/Word.js');
require('../../ui/LinkLabel.js');
require('../../ui/MentionLabel.js');
require('../../ui/TextButton.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
  var messageTypes = index.getUIKitMessageTypes();
  var dateLocale = LocalizationContext.useLocalization().dateLocale;

  var _m = React.useState(false),
      supposedHover = _m[0],
      setSupposedHover = _m[1];

  var _o = React.useContext(UserProfileContext.UserProfileContext),
      disableUserProfile = _o.disableUserProfile,
      renderUserProfile = _o.renderUserProfile;

  var avatarRef = React.useRef(null);
  var isByMe = userId === ((_b = message === null || message === void 0 ? void 0 : message.sender) === null || _b === void 0 ? void 0 : _b.userId) || (message === null || message === void 0 ? void 0 : message.sendingStatus) === 'pending' || (message === null || message === void 0 ? void 0 : message.sendingStatus) === 'failed';
  var useReplying = !!((replyType === 'QUOTE_REPLY' || replyType === 'THREAD') && (message === null || message === void 0 ? void 0 : message.parentMessageId) && (message === null || message === void 0 ? void 0 : message.parentMessage) && !disableQuoteMessage);
  var supposedHoverClassName = supposedHover ? 'sendbird-mouse-hover' : '';
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-thread-list-item-content ".concat(className, " ").concat(isByMe ? 'outgoing' : 'incoming')
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-thread-list-item-content__left ".concat(isReactionEnabled ? 'use-reaction' : '', " ").concat(isByMe ? 'outgoing' : 'incoming')
  }, !isByMe && !chainBottom && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu["default"], {
    menuTrigger: function (toggleDropdown) {
      var _a, _b, _c;

      return /*#__PURE__*/React__default["default"].createElement(ui_Avatar["default"], {
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
      return /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItems, {
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
      }) : /*#__PURE__*/React__default["default"].createElement(ui_UserProfile, {
        user: message === null || message === void 0 ? void 0 : message.sender,
        onSuccess: closeDropdown
      }));
    }
  }), isByMe && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-thread-list-item-content-menu ".concat(isReactionEnabled ? 'use-reaction' : '', " ").concat(isByMe ? 'outgoing' : 'incoming', " ").concat(supposedHoverClassName)
  }, /*#__PURE__*/React__default["default"].createElement(ui_MessageItemMenu, {
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
  }), isReactionEnabled && /*#__PURE__*/React__default["default"].createElement(ui_MessageItemReactionMenu, {
    className: "sendbird-thread-list-item-content-menu__reaction-menu",
    message: message,
    userId: userId,
    spaceFromTrigger: {},
    emojiContainer: emojiContainer,
    toggleReaction: toggleReaction,
    setSupposedHover: setSupposedHover
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-thread-list-item-content__middle"
  }, !isByMe && !chainTop && !useReplying && /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-thread-list-item-content__middle__sender-name",
    type: ui_Label.LabelTypography.CAPTION_2,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, ((_d = (_c = channel === null || channel === void 0 ? void 0 : channel.members) === null || _c === void 0 ? void 0 : _c.find(function (member) {
    var _a;

    return (member === null || member === void 0 ? void 0 : member.userId) === ((_a = message === null || message === void 0 ? void 0 : message.sender) === null || _a === void 0 ? void 0 : _a.userId);
  })) === null || _d === void 0 ? void 0 : _d.nickname) || index.getSenderName(message) // TODO: Divide getting profileUrl logic to utils
  ), /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName(['sendbird-thread-list-item-content__middle__body-container'])
  }, isByMe && !chainBottom && /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName(['sendbird-thread-list-item-content__middle__body-container__created-at', 'left', supposedHoverClassName])
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-thread-list-item-content__middle__body-container__created-at__component-container"
  }, /*#__PURE__*/React__default["default"].createElement(ui_MessageStatus.MessageStatus, {
    message: message,
    channel: channel
  }))), index.isTextMessage(message) && /*#__PURE__*/React__default["default"].createElement(ui_TextMessageItemBody, {
    className: "sendbird-thread-list-item-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    isMentionEnabled: isMentionEnabled,
    isReactionEnabled: isReactionEnabled
  }), index.isOGMessage(message) && /*#__PURE__*/React__default["default"].createElement(ui_OGMessageItemBody, {
    className: "sendbird-thread-list-item-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    isMentionEnabled: isMentionEnabled,
    isReactionEnabled: isReactionEnabled
  }), index.getUIKitMessageType(message) === messageTypes.FILE && /*#__PURE__*/React__default["default"].createElement(ui_FileMessageItemBody, {
    className: "sendbird-thread-list-item-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    isReactionEnabled: isReactionEnabled,
    truncateLimit: isByMe ? 18 : 14
  }), index.isThumbnailMessage(message) && /*#__PURE__*/React__default["default"].createElement(ui_ThumbnailMessageItemBody, {
    className: "sendbird-thread-list-item-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    isReactionEnabled: isReactionEnabled,
    showFileViewer: showFileViewer,
    style: {
      width: '200px',
      height: '148px'
    }
  }), index.getUIKitMessageType(message) === messageTypes.UNKNOWN && /*#__PURE__*/React__default["default"].createElement(ui_UnknownMessageItemBody, {
    className: "sendbird-thread-list-item-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    isReactionEnabled: isReactionEnabled
  }), isReactionEnabled && ((_e = message === null || message === void 0 ? void 0 : message.reactions) === null || _e === void 0 ? void 0 : _e.length) > 0 && /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName(['sendbird-thread-list-item-content-reactions', !isByMe || index.isThumbnailMessage(message) || index.isOGMessage(message) ? '' : 'primary'])
  }, /*#__PURE__*/React__default["default"].createElement(ui_EmojiReactions, {
    userId: userId,
    message: message,
    isByMe: isByMe,
    emojiContainer: emojiContainer,
    memberNicknamesMap: nicknamesMap,
    toggleReaction: toggleReaction
  })), !isByMe && !chainBottom && /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: index.getClassName(['sendbird-thread-list-item-content__middle__body-container__created-at', 'right', supposedHoverClassName]),
    type: ui_Label.LabelTypography.CAPTION_3,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, index$1.format((message === null || message === void 0 ? void 0 : message.createdAt) || 0, 'p', {
    locale: dateLocale
  })))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-thread-list-item-content__right ".concat(chainTop ? 'chain-top' : '', " ").concat(isByMe ? 'outgoing' : 'incoming')
  }, !isByMe && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-thread-list-item-content-menu ".concat(supposedHoverClassName)
  }, isReactionEnabled && /*#__PURE__*/React__default["default"].createElement(ui_MessageItemReactionMenu, {
    className: "sendbird-thread-list-item-content-menu__reaction-menu",
    message: message,
    userId: userId,
    spaceFromTrigger: {},
    emojiContainer: emojiContainer,
    toggleReaction: toggleReaction,
    setSupposedHover: setSupposedHover
  }), /*#__PURE__*/React__default["default"].createElement(ui_MessageItemMenu, {
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
  var dateLocale = LocalizationContext.useLocalization().dateLocale;
  var threadContext = Thread_context.useThreadContext === null || Thread_context.useThreadContext === void 0 ? void 0 : Thread_context.useThreadContext();
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

  var _g = React.useState(false),
      showEdit = _g[0],
      setShowEdit = _g[1];

  var _h = React.useState(false),
      showRemove = _h[0],
      setShowRemove = _h[1];

  var _j = React.useState(false),
      showFileViewer = _j[0],
      setShowFileViewer = _j[1];

  var usingReaction = isReactionEnabled && !(currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.isSuper) && !(currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.isBroadcast); // Move to message

  var messageScrollRef = React.useRef(null);
  React.useLayoutEffect(function () {
    var _a;

    if ((openingMessage === null || openingMessage === void 0 ? void 0 : openingMessage.messageId) === (message === null || message === void 0 ? void 0 : message.messageId) && (messageScrollRef === null || messageScrollRef === void 0 ? void 0 : messageScrollRef.current)) {
      (_a = messageScrollRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
        block: 'center',
        inline: 'center'
      });
    }
  }, [openingMessage, messageScrollRef === null || messageScrollRef === void 0 ? void 0 : messageScrollRef.current]); // reactions

  React.useLayoutEffect(function () {
    handleScroll === null || handleScroll === void 0 ? void 0 : handleScroll();
  }, [showEdit, (_d = message === null || message === void 0 ? void 0 : message.reactions) === null || _d === void 0 ? void 0 : _d.length]); // mention

  var editMessageInputRef = React.useRef(null);

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

  var displaySuggestedMentionList = isOnline && isMentionEnabled && mentionNickname.length > 0 && !isMuted && !(isChannelFrozen && !(currentChannel.myRole === SendbirdChat.Role.OPERATOR));
  React.useEffect(function () {
    if ((mentionedUsers === null || mentionedUsers === void 0 ? void 0 : mentionedUsers.length) >= (userMention === null || userMention === void 0 ? void 0 : userMention.maxMentionCount)) {
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
  }, [mentionedUserIds]); // edit input

  var disabled = !(threadListState === Thread_context_types.ThreadListStateTypes.INITIALIZED) || !isOnline || isMuted || isChannelFrozen; // memorize

  var MemorizedSeparator = React.useMemo(function () {
    if (typeof renderCustomSeparator === 'function') {
      return renderCustomSeparator === null || renderCustomSeparator === void 0 ? void 0 : renderCustomSeparator({
        message: message
      });
    }
  }, [message, renderCustomSeparator]); // Edit message

  if (showEdit && message.isUserMessage()) {
    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, displaySuggestedMentionList && /*#__PURE__*/React__default["default"].createElement(Channel_components_SuggestedMentionList, {
      targetNickname: mentionNickname,
      inputEvent: messageInputEvent // renderUserMentionItem={renderUserMentionItem}
      ,
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
      maxMentionCount: userMention === null || userMention === void 0 ? void 0 : userMention.maxMentionCount,
      maxSuggestionCount: userMention === null || userMention === void 0 ? void 0 : userMention.maxSuggestionCount
    }), /*#__PURE__*/React__default["default"].createElement(ui_MessageInput, {
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
        if (displaySuggestedMentionList && (mentionSuggestedUsers === null || mentionSuggestedUsers === void 0 ? void 0 : mentionSuggestedUsers.length) > 0 && (e.key === _const.MessageInputKeys.Enter && ableMention || e.key === _const.MessageInputKeys.ArrowUp || e.key === _const.MessageInputKeys.ArrowDown)) {
          setMessageInputEvent(e);
          return true;
        }

        return false;
      }
    }));
  }

  return /*#__PURE__*/React__default["default"].createElement("div", {
    ref: messageScrollRef,
    className: "sendbird-thread-list-item ".concat(className)
  }, hasSeparator && (message === null || message === void 0 ? void 0 : message.createdAt) && (MemorizedSeparator || /*#__PURE__*/React__default["default"].createElement(ui_DateSeparator, null, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.CAPTION_2,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, index$1.format(message === null || message === void 0 ? void 0 : message.createdAt, 'MMM dd, yyyy', {
    locale: dateLocale
  })))), /*#__PURE__*/React__default["default"].createElement(ThreadListItemContent, {
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
  }), showRemove && /*#__PURE__*/React__default["default"].createElement(RemoveMessageModal.RemoveMessage, {
    message: message,
    onCancel: function () {
      return setShowRemove(false);
    }
  }), showFileViewer && /*#__PURE__*/React__default["default"].createElement(ui_FileViewer["default"], {
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

module.exports = ThreadListItem;
//# sourceMappingURL=ThreadListItem.js.map
