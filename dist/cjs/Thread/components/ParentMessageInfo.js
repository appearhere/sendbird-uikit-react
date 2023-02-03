'use strict';

var tslib_es6 = require('../../tslib.es6-d6068b10.js');
var React = require('react');
var index$1 = require('../../index-5977bdd5.js');
var SendbirdChat = require('@sendbird/chat');
var RemoveMessageModal = require('../../RemoveMessageModal-4d250f7d.js');
var Thread_components_ParentMessageInfoItem = require('./ParentMessageInfoItem.js');
var index = require('../../index-d05a5cae.js');
var LocalizationContext = require('../../LocalizationContext-f4281153.js');
var useSendbirdStateContext = require('../../useSendbirdStateContext.js');
var Thread_context = require('../../ThreadProvider-5c14e997.js');
var UserProfileContext = require('../../UserProfileContext-fd00d1bd.js');
var Channel_components_SuggestedMentionList = require('../../Channel/components/SuggestedMentionList.js');
var ui_Avatar = require('../../ui/Avatar.js');
var ui_Label = require('../../index-4197d014.js');
var ui_FileViewer = require('../../ui/FileViewer.js');
var ui_MessageItemMenu = require('../../ui/MessageItemMenu.js');
var ui_MessageItemReactionMenu = require('../../ui/MessageItemReactionMenu.js');
var ui_ContextMenu = require('../../ui/ContextMenu.js');
var ui_UserProfile = require('../../ui/UserProfile.js');
var ui_MessageInput = require('../../ui/MessageInput.js');
var _const = require('../../const-28829306.js');
require('../../index-d4bc012c.js');
require('../../ui/Modal.js');
require('react-dom');
require('../../index-1b132096.js');
require('../../ui/Button.js');
require('prop-types');
require('../../stringSet-2dfd148b.js');
require('../../ui/Icon.js');
require('../../ui/IconButton.js');
require('../../MediaQueryContext-9a5566fc.js');
require('../../uuid-2f4916c1.js');
require('../../ui/Word.js');
require('../../ui/LinkLabel.js');
require('../../ui/MentionLabel.js');
require('../../ui/ImageRenderer.js');
require('../../ui/TextButton.js');
require('../../color-0fae7c8e.js');
require('../../ui/EmojiReactions.js');
require('../../ui/Tooltip.js');
require('../../ui/TooltipWrapper.js');
require('../../ui/ReactionBadge.js');
require('../../ui/ReactionButton.js');
require('../../utils/message/getOutgoingMessageState.js');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('../context/types.js');
require('../../topics-085b5602.js');
require('@sendbird/chat/groupChannel');
require('@sendbird/chat/message');
require('../../ChannelProvider-4d043480.js');
require('../../compareIds-5d186d0d.js');
require('../../const-43cebab9.js');
require('../../ui/SortByRow.js');
require('../../sendbirdSelectors.js');
require('../../utils-a9158c72.js');
require('react-dom/server');
require('../../ui/MentionUserLabel.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function ParentMessageInfo(_a) {
  var _b, _c, _d, _e, _f, _g;

  var className = _a.className;

  var _h = useSendbirdStateContext(),
      stores = _h.stores,
      config = _h.config;

  var isMentionEnabled = config.isMentionEnabled,
      isReactionEnabled = config.isReactionEnabled,
      replyType = config.replyType,
      isOnline = config.isOnline,
      userMention = config.userMention;
  var userId = (_c = (_b = stores === null || stores === void 0 ? void 0 : stores.userStore) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.userId;
  var dateLocale = (LocalizationContext.useLocalization === null || LocalizationContext.useLocalization === void 0 ? void 0 : LocalizationContext.useLocalization()).dateLocale;

  var _j = Thread_context.useThreadContext(),
      currentChannel = _j.currentChannel,
      parentMessage = _j.parentMessage,
      allThreadMessages = _j.allThreadMessages,
      emojiContainer = _j.emojiContainer,
      toggleReaction = _j.toggleReaction,
      updateMessage = _j.updateMessage,
      deleteMessage = _j.deleteMessage,
      onMoveToParentMessage = _j.onMoveToParentMessage,
      onHeaderActionClick = _j.onHeaderActionClick,
      isMuted = _j.isMuted,
      isChannelFrozen = _j.isChannelFrozen;

  var _k = React.useState(false),
      showRemove = _k[0],
      setShowRemove = _k[1];

  var _l = React.useState(false),
      supposedHover = _l[0],
      setSupposedHover = _l[1];

  var _m = React.useState(false),
      showFileViewer = _m[0],
      setShowFileViewer = _m[1];

  var usingReaction = isReactionEnabled && !(currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.isSuper) && !(currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.isBroadcast); // Edit message

  var _o = React.useState(false),
      showEditInput = _o[0],
      setShowEditInput = _o[1];

  var disabled = !isOnline || isMuted || isChannelFrozen && !((currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.myRole) === SendbirdChat.Role.OPERATOR); // Mention

  var editMessageInputRef = React.useRef(null);

  var _p = React.useState(''),
      mentionNickname = _p[0],
      setMentionNickname = _p[1];

  var _q = React.useState([]),
      mentionedUsers = _q[0],
      setMentionedUsers = _q[1];

  var _r = React.useState([]),
      mentionedUserIds = _r[0],
      setMentionedUserIds = _r[1];

  var _s = React.useState(null),
      messageInputEvent = _s[0],
      setMessageInputEvent = _s[1];

  var _t = React.useState(null),
      selectedUser = _t[0],
      setSelectedUser = _t[1];

  var _u = React.useState([]),
      mentionSuggestedUsers = _u[0],
      setMentionSuggestedUsers = _u[1];

  var _v = React.useState(true),
      ableMention = _v[0],
      setAbleMention = _v[1];

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
  }, [mentionedUserIds]); // User Profile

  var avatarRef = React.useRef(null);

  var _w = React.useContext(UserProfileContext.UserProfileContext),
      disableUserProfile = _w.disableUserProfile,
      renderUserProfile = _w.renderUserProfile;

  if (showEditInput && ((_d = parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.isUserMessage) === null || _d === void 0 ? void 0 : _d.call(parentMessage))) {
    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, displaySuggestedMentionList && /*#__PURE__*/React__default["default"].createElement(Channel_components_SuggestedMentionList, {
      className: "parent-message-info--suggested-mention-list",
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
      message: parentMessage,
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
        setShowEditInput(false);
        (_b = currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.endTyping) === null || _b === void 0 ? void 0 : _b.call(currentChannel);
      },
      onCancelEdit: function () {
        var _a;

        setMentionNickname('');
        setMentionedUsers([]);
        setMentionedUserIds([]);
        setMentionSuggestedUsers([]);
        setShowEditInput(false);
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
    className: "sendbird-parent-message-info ".concat(className)
  }, /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu["default"], {
    menuTrigger: function (toggleDropdown) {
      var _a, _b, _c;

      return /*#__PURE__*/React__default["default"].createElement(ui_Avatar["default"], {
        className: "sendbird-parent-message-info__sender",
        ref: avatarRef,
        src: ((_b = (_a = currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.members) === null || _a === void 0 ? void 0 : _a.find(function (m) {
          var _a;

          return (m === null || m === void 0 ? void 0 : m.userId) === ((_a = parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.sender) === null || _a === void 0 ? void 0 : _a.userId);
        })) === null || _b === void 0 ? void 0 : _b.profileUrl) || ((_c = parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.sender) === null || _c === void 0 ? void 0 : _c.profileUrl),
        alt: "thread message sender",
        width: "40px",
        height: "40px",
        onClick: function () {
          if (!disableUserProfile) {
            toggleDropdown();
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
        user: parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.sender,
        close: closeDropdown
      }) : /*#__PURE__*/React__default["default"].createElement(ui_UserProfile, {
        user: parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.sender,
        currentUserId: userId,
        onSuccess: closeDropdown
      }));
    }
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-parent-message-info__content"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-parent-message-info__content__info"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-parent-message-info__content__info__sender-name".concat(usingReaction ? '--use-reaction' : ''),
    type: ui_Label.LabelTypography.CAPTION_2,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, ((_f = (_e = currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.members) === null || _e === void 0 ? void 0 : _e.find(function (member) {
    var _a;

    return (member === null || member === void 0 ? void 0 : member.userId) === ((_a = parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.sender) === null || _a === void 0 ? void 0 : _a.userId);
  })) === null || _f === void 0 ? void 0 : _f.nickname) || (index.getSenderName === null || index.getSenderName === void 0 ? void 0 : index.getSenderName(parentMessage))), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-parent-message-info__content__info__sent-at",
    type: ui_Label.LabelTypography.CAPTION_3,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, index$1.format((parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.createdAt) || 0, 'p', {
    locale: dateLocale
  }))), /*#__PURE__*/React__default["default"].createElement(Thread_components_ParentMessageInfoItem, {
    message: parentMessage,
    showFileViewer: setShowFileViewer
  })), /*#__PURE__*/React__default["default"].createElement(ui_MessageItemMenu, {
    className: "sendbird-parent-message-info__context-menu ".concat(usingReaction ? 'use-reaction' : '', " ").concat(supposedHover ? 'sendbird-mouse-hover' : ''),
    channel: currentChannel,
    message: parentMessage,
    isByMe: userId === ((_g = parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.sender) === null || _g === void 0 ? void 0 : _g.userId),
    disableDeleteMessage: allThreadMessages.length > 0,
    replyType: replyType,
    showEdit: setShowEditInput,
    showRemove: setShowRemove,
    setSupposedHover: setSupposedHover,
    onMoveToParentMessage: function () {
      onMoveToParentMessage({
        message: parentMessage,
        channel: currentChannel
      });
    }
  }), usingReaction && /*#__PURE__*/React__default["default"].createElement(ui_MessageItemReactionMenu, {
    className: "sendbird-parent-message-info__reaction-menu ".concat(supposedHover ? 'sendbird-mouse-hover' : ''),
    message: parentMessage,
    userId: userId,
    emojiContainer: emojiContainer,
    toggleReaction: toggleReaction,
    setSupposedHover: setSupposedHover
  }), showRemove && /*#__PURE__*/React__default["default"].createElement(RemoveMessageModal.RemoveMessage, {
    onCancel: function () {
      return setShowRemove(false);
    },
    onSubmit: function () {
      onHeaderActionClick === null || onHeaderActionClick === void 0 ? void 0 : onHeaderActionClick();
    },
    message: parentMessage
  }), showFileViewer && /*#__PURE__*/React__default["default"].createElement(ui_FileViewer["default"], {
    message: parentMessage,
    onClose: function () {
      return setShowFileViewer(false);
    },
    onDelete: function () {
      deleteMessage(parentMessage).then(function () {
        setShowFileViewer(false);
      });
    }
  }));
}

module.exports = ParentMessageInfo;
//# sourceMappingURL=ParentMessageInfo.js.map
