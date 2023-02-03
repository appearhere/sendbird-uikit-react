import { a as __spreadArray } from '../../tslib.es6-75bd0528.js';
import React__default, { useRef, useState, useEffect } from 'react';
import { Role } from '@sendbird/chat';
import { MutedState } from '@sendbird/chat/groupChannel';
import useSendbirdStateContext from '../../useSendbirdStateContext.js';
import MessageInput from '../../ui/MessageInput.js';
import { M as MessageInputKeys } from '../../const-fcaed0ae.js';
import SuggestedMentionList from '../../Channel/components/SuggestedMentionList.js';
import { u as useThreadContext } from '../../ThreadProvider-5ccbbc4b.js';
import { u as useLocalization } from '../../LocalizationContext-e5f35d14.js';
import '../../withSendbird.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import 'react-dom/server';
import 'prop-types';
import '../../const-03d71a8a.js';
import '../../ui/IconButton.js';
import '../../ui/Button.js';
import '../../index-f60cbf08.js';
import '../../stringSet-42c0e16e.js';
import '../../ui/MentionUserLabel.js';
import '../../ui/Icon.js';
import '../../index-105a85f4.js';
import '../../utils/message/getOutgoingMessageState.js';
import '../../index-5dcd7e0f.js';
import '../../ui/Avatar.js';
import '../../ui/ImageRenderer.js';
import '../../uuid-392016d0.js';
import '../../ChannelProvider-3f08837d.js';
import '../../UserProfileContext-517994e3.js';
import '../../index-229a0736.js';
import '../../topics-0560d548.js';
import '../../compareIds-fd8fd31e.js';
import '@sendbird/chat/message';
import '../../ui/ContextMenu.js';
import 'react-dom';
import '../../ui/SortByRow.js';
import '../../ui/ReactionButton.js';
import '../context/types.js';

var ThreadMessageInput = function (props, ref) {
  var className = props.className;
  var config = useSendbirdStateContext().config;
  var stringSet = useLocalization().stringSet;
  var isMentionEnabled = config.isMentionEnabled,
      isOnline = config.isOnline,
      userMention = config.userMention;

  var _a = useThreadContext(),
      currentChannel = _a.currentChannel,
      parentMessage = _a.parentMessage,
      sendMessage = _a.sendMessage,
      sendFileMessage = _a.sendFileMessage,
      isMuted = _a.isMuted,
      isChannelFrozen = _a.isChannelFrozen,
      allThreadMessages = _a.allThreadMessages;

  var messageInputRef = useRef();
  var disabled = isMuted || !((currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.myRole) === Role.OPERATOR) && isChannelFrozen || parentMessage === null; // mention

  var _b = useState(''),
      mentionNickname = _b[0],
      setMentionNickname = _b[1];

  var _c = useState([]),
      mentionedUsers = _c[0],
      setMentionedUsers = _c[1];

  var _d = useState([]),
      mentionedUserIds = _d[0],
      setMentionedUserIds = _d[1];

  var _e = useState(null),
      selectedUser = _e[0],
      setSelectedUser = _e[1];

  var _f = useState([]),
      mentionSuggestedUsers = _f[0],
      setMentionSuggestedUsers = _f[1];

  var _g = useState(true),
      ableMention = _g[0],
      setAbleMention = _g[1];

  var _h = useState(null),
      messageInputEvent = _h[0],
      setMessageInputEvent = _h[1];

  var displaySuggestedMentionList = isOnline && isMentionEnabled && mentionNickname.length > 0; // && !utils.isDisabledBecauseFrozen(channel)
  // && !utils.isDisabledBecauseMuted(channel);

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
  }, [mentionedUserIds]);
  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-thread-message-input ".concat(className)
  }, displaySuggestedMentionList && /*#__PURE__*/React__default.createElement(SuggestedMentionList, {
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
    className: "sendbird-thread-message-input__message-input",
    messageFieldId: "sendbird-message-input-text-field--thread",
    disabled: disabled,
    channelUrl: currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url,
    mentionSelectedUser: selectedUser,
    isMentionEnabled: isMentionEnabled,
    ref: ref || messageInputRef,
    placeholder: (currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.isFrozen) && !((currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.myRole) === Role.OPERATOR) && stringSet.MESSAGE_INPUT__PLACE_HOLDER__DISABLED || (currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.myMutedState) === MutedState.MUTED && stringSet.MESSAGE_INPUT__PLACE_HOLDER__MUTED_SHORT || (allThreadMessages.length > 0 ? stringSet.THREAD__INPUT__REPLY_TO_THREAD : stringSet.THREAD__INPUT__REPLY_IN_THREAD),
    onStartTyping: function () {
      var _a;

      (_a = currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.startTyping) === null || _a === void 0 ? void 0 : _a.call(currentChannel);
    },
    onSendMessage: function (_a) {
      var _b;

      var message = _a.message,
          mentionTemplate = _a.mentionTemplate;
      sendMessage({
        message: message,
        mentionedUsers: mentionedUsers,
        mentionTemplate: mentionTemplate,
        quoteMessage: parentMessage
      });
      setMentionNickname('');
      setMentionedUsers([]);
      (_b = currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.endTyping) === null || _b === void 0 ? void 0 : _b.call(currentChannel);
    },
    onFileUpload: function (file) {
      sendFileMessage(file, parentMessage);
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
};

var ThreadMessageInput$1 = /*#__PURE__*/React__default.forwardRef(ThreadMessageInput);

export { ThreadMessageInput$1 as default };
//# sourceMappingURL=ThreadMessageInput.js.map
