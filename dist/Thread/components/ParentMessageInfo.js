import { a as __spreadArray } from '../../tslib.es6-75bd0528.js';
import React__default, { useState, useRef, useEffect, useContext } from 'react';
import { f as format } from '../../index-229a0736.js';
import { Role } from '@sendbird/chat';
import { R as RemoveMessage } from '../../RemoveMessageModal-6f5adba5.js';
import ParentMessageInfoItem from './ParentMessageInfoItem.js';
import { z as getSenderName } from '../../index-105a85f4.js';
import { u as useLocalization } from '../../LocalizationContext-e5f35d14.js';
import useSendbirdStateContext from '../../useSendbirdStateContext.js';
import { u as useThreadContext } from '../../ThreadProvider-5ccbbc4b.js';
import { a as UserProfileContext } from '../../UserProfileContext-517994e3.js';
import SuggestedMentionList from '../../Channel/components/SuggestedMentionList.js';
import Avatar from '../../ui/Avatar.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../../index-f60cbf08.js';
import FileViewer from '../../ui/FileViewer.js';
import MessageItemMenu from '../../ui/MessageItemMenu.js';
import MessageItemReactionMenu from '../../ui/MessageItemReactionMenu.js';
import ContextMenu, { MenuItems } from '../../ui/ContextMenu.js';
import UserProfile from '../../ui/UserProfile.js';
import MessageInput from '../../ui/MessageInput.js';
import { M as MessageInputKeys } from '../../const-fcaed0ae.js';
import '../../index-5dcd7e0f.js';
import '../../ui/Modal.js';
import 'react-dom';
import '../../index-5ab5d8fe.js';
import '../../ui/Button.js';
import 'prop-types';
import '../../stringSet-42c0e16e.js';
import '../../ui/Icon.js';
import '../../ui/IconButton.js';
import '../../MediaQueryContext-0ce6633d.js';
import '../../uuid-392016d0.js';
import '../../ui/Word.js';
import '../../ui/LinkLabel.js';
import '../../ui/MentionLabel.js';
import '../../ui/ImageRenderer.js';
import '../../ui/TextButton.js';
import '../../color-52d916b6.js';
import '../../ui/EmojiReactions.js';
import '../../ui/Tooltip.js';
import '../../ui/TooltipWrapper.js';
import '../../ui/ReactionBadge.js';
import '../../ui/ReactionButton.js';
import '../../utils/message/getOutgoingMessageState.js';
import '../../withSendbird.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import '../context/types.js';
import '../../topics-0560d548.js';
import '@sendbird/chat/groupChannel';
import '@sendbird/chat/message';
import '../../ChannelProvider-3f08837d.js';
import '../../compareIds-fd8fd31e.js';
import '../../const-03d71a8a.js';
import '../../ui/SortByRow.js';
import '../../sendbirdSelectors.js';
import '../../utils-8a4a2ff6.js';
import 'react-dom/server';
import '../../ui/MentionUserLabel.js';

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
  var dateLocale = (useLocalization === null || useLocalization === void 0 ? void 0 : useLocalization()).dateLocale;

  var _j = useThreadContext(),
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

  var _k = useState(false),
      showRemove = _k[0],
      setShowRemove = _k[1];

  var _l = useState(false),
      supposedHover = _l[0],
      setSupposedHover = _l[1];

  var _m = useState(false),
      showFileViewer = _m[0],
      setShowFileViewer = _m[1];

  var usingReaction = isReactionEnabled && !(currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.isSuper) && !(currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.isBroadcast); // Edit message

  var _o = useState(false),
      showEditInput = _o[0],
      setShowEditInput = _o[1];

  var disabled = !isOnline || isMuted || isChannelFrozen && !((currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.myRole) === Role.OPERATOR); // Mention

  var editMessageInputRef = useRef(null);

  var _p = useState(''),
      mentionNickname = _p[0],
      setMentionNickname = _p[1];

  var _q = useState([]),
      mentionedUsers = _q[0],
      setMentionedUsers = _q[1];

  var _r = useState([]),
      mentionedUserIds = _r[0],
      setMentionedUserIds = _r[1];

  var _s = useState(null),
      messageInputEvent = _s[0],
      setMessageInputEvent = _s[1];

  var _t = useState(null),
      selectedUser = _t[0],
      setSelectedUser = _t[1];

  var _u = useState([]),
      mentionSuggestedUsers = _u[0],
      setMentionSuggestedUsers = _u[1];

  var _v = useState(true),
      ableMention = _v[0],
      setAbleMention = _v[1];

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
  }, [mentionedUserIds]); // User Profile

  var avatarRef = useRef(null);

  var _w = useContext(UserProfileContext),
      disableUserProfile = _w.disableUserProfile,
      renderUserProfile = _w.renderUserProfile;

  if (showEditInput && ((_d = parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.isUserMessage) === null || _d === void 0 ? void 0 : _d.call(parentMessage))) {
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, displaySuggestedMentionList && /*#__PURE__*/React__default.createElement(SuggestedMentionList, {
      className: "parent-message-info--suggested-mention-list",
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
        if (displaySuggestedMentionList && (mentionSuggestedUsers === null || mentionSuggestedUsers === void 0 ? void 0 : mentionSuggestedUsers.length) > 0 && (e.key === MessageInputKeys.Enter && ableMention || e.key === MessageInputKeys.ArrowUp || e.key === MessageInputKeys.ArrowDown)) {
          setMessageInputEvent(e);
          return true;
        }

        return false;
      }
    }));
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-parent-message-info ".concat(className)
  }, /*#__PURE__*/React__default.createElement(ContextMenu, {
    menuTrigger: function (toggleDropdown) {
      var _a, _b, _c;

      return /*#__PURE__*/React__default.createElement(Avatar, {
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
      return /*#__PURE__*/React__default.createElement(MenuItems, {
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
      }) : /*#__PURE__*/React__default.createElement(UserProfile, {
        user: parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.sender,
        currentUserId: userId,
        onSuccess: closeDropdown
      }));
    }
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-parent-message-info__content"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-parent-message-info__content__info"
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-parent-message-info__content__info__sender-name".concat(usingReaction ? '--use-reaction' : ''),
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, ((_f = (_e = currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.members) === null || _e === void 0 ? void 0 : _e.find(function (member) {
    var _a;

    return (member === null || member === void 0 ? void 0 : member.userId) === ((_a = parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.sender) === null || _a === void 0 ? void 0 : _a.userId);
  })) === null || _f === void 0 ? void 0 : _f.nickname) || (getSenderName === null || getSenderName === void 0 ? void 0 : getSenderName(parentMessage))), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-parent-message-info__content__info__sent-at",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, format((parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.createdAt) || 0, 'p', {
    locale: dateLocale
  }))), /*#__PURE__*/React__default.createElement(ParentMessageInfoItem, {
    message: parentMessage,
    showFileViewer: setShowFileViewer
  })), /*#__PURE__*/React__default.createElement(MessageItemMenu, {
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
  }), usingReaction && /*#__PURE__*/React__default.createElement(MessageItemReactionMenu, {
    className: "sendbird-parent-message-info__reaction-menu ".concat(supposedHover ? 'sendbird-mouse-hover' : ''),
    message: parentMessage,
    userId: userId,
    emojiContainer: emojiContainer,
    toggleReaction: toggleReaction,
    setSupposedHover: setSupposedHover
  }), showRemove && /*#__PURE__*/React__default.createElement(RemoveMessage, {
    onCancel: function () {
      return setShowRemove(false);
    },
    onSubmit: function () {
      onHeaderActionClick === null || onHeaderActionClick === void 0 ? void 0 : onHeaderActionClick();
    },
    message: parentMessage
  }), showFileViewer && /*#__PURE__*/React__default.createElement(FileViewer, {
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

export { ParentMessageInfo as default };
//# sourceMappingURL=ParentMessageInfo.js.map
