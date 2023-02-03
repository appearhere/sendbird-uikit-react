'use strict';

var tslib_es6 = require('../../tslib.es6-d6068b10.js');
var React = require('react');
var SendbirdChat = require('@sendbird/chat');
var groupChannel = require('@sendbird/chat/groupChannel');
var useSendbirdStateContext = require('../../useSendbirdStateContext.js');
var ui_MessageInput = require('../../ui/MessageInput.js');
var _const = require('../../const-28829306.js');
var Channel_components_SuggestedMentionList = require('../../Channel/components/SuggestedMentionList.js');
var Thread_context = require('../../ThreadProvider-5c14e997.js');
var LocalizationContext = require('../../LocalizationContext-f4281153.js');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('react-dom/server');
require('prop-types');
require('../../const-43cebab9.js');
require('../../ui/IconButton.js');
require('../../ui/Button.js');
require('../../index-4197d014.js');
require('../../stringSet-2dfd148b.js');
require('../../ui/MentionUserLabel.js');
require('../../ui/Icon.js');
require('../../index-d05a5cae.js');
require('../../utils/message/getOutgoingMessageState.js');
require('../../index-d4bc012c.js');
require('../../ui/Avatar.js');
require('../../ui/ImageRenderer.js');
require('../../uuid-2f4916c1.js');
require('../../ChannelProvider-4d043480.js');
require('../../UserProfileContext-fd00d1bd.js');
require('../../index-5977bdd5.js');
require('../../topics-085b5602.js');
require('../../compareIds-5d186d0d.js');
require('@sendbird/chat/message');
require('../../ui/ContextMenu.js');
require('react-dom');
require('../../ui/SortByRow.js');
require('../../ui/ReactionButton.js');
require('../context/types.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var ThreadMessageInput = function (props, ref) {
  var className = props.className;
  var config = useSendbirdStateContext().config;
  var stringSet = LocalizationContext.useLocalization().stringSet;
  var isMentionEnabled = config.isMentionEnabled,
      isOnline = config.isOnline,
      userMention = config.userMention;

  var _a = Thread_context.useThreadContext(),
      currentChannel = _a.currentChannel,
      parentMessage = _a.parentMessage,
      sendMessage = _a.sendMessage,
      sendFileMessage = _a.sendFileMessage,
      isMuted = _a.isMuted,
      isChannelFrozen = _a.isChannelFrozen,
      allThreadMessages = _a.allThreadMessages;

  var messageInputRef = React.useRef();
  var disabled = isMuted || !((currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.myRole) === SendbirdChat.Role.OPERATOR) && isChannelFrozen || parentMessage === null; // mention

  var _b = React.useState(''),
      mentionNickname = _b[0],
      setMentionNickname = _b[1];

  var _c = React.useState([]),
      mentionedUsers = _c[0],
      setMentionedUsers = _c[1];

  var _d = React.useState([]),
      mentionedUserIds = _d[0],
      setMentionedUserIds = _d[1];

  var _e = React.useState(null),
      selectedUser = _e[0],
      setSelectedUser = _e[1];

  var _f = React.useState([]),
      mentionSuggestedUsers = _f[0],
      setMentionSuggestedUsers = _f[1];

  var _g = React.useState(true),
      ableMention = _g[0],
      setAbleMention = _g[1];

  var _h = React.useState(null),
      messageInputEvent = _h[0],
      setMessageInputEvent = _h[1];

  var displaySuggestedMentionList = isOnline && isMentionEnabled && mentionNickname.length > 0; // && !utils.isDisabledBecauseFrozen(channel)
  // && !utils.isDisabledBecauseMuted(channel);

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
  }, [mentionedUserIds]);
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-thread-message-input ".concat(className)
  }, displaySuggestedMentionList && /*#__PURE__*/React__default["default"].createElement(Channel_components_SuggestedMentionList, {
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
    className: "sendbird-thread-message-input__message-input",
    messageFieldId: "sendbird-message-input-text-field--thread",
    disabled: disabled,
    channelUrl: currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url,
    mentionSelectedUser: selectedUser,
    isMentionEnabled: isMentionEnabled,
    ref: ref || messageInputRef,
    placeholder: (currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.isFrozen) && !((currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.myRole) === SendbirdChat.Role.OPERATOR) && stringSet.MESSAGE_INPUT__PLACE_HOLDER__DISABLED || (currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.myMutedState) === groupChannel.MutedState.MUTED && stringSet.MESSAGE_INPUT__PLACE_HOLDER__MUTED_SHORT || (allThreadMessages.length > 0 ? stringSet.THREAD__INPUT__REPLY_TO_THREAD : stringSet.THREAD__INPUT__REPLY_IN_THREAD),
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
      if (displaySuggestedMentionList && (mentionSuggestedUsers === null || mentionSuggestedUsers === void 0 ? void 0 : mentionSuggestedUsers.length) > 0 && (e.key === _const.MessageInputKeys.Enter && ableMention || e.key === _const.MessageInputKeys.ArrowUp || e.key === _const.MessageInputKeys.ArrowDown)) {
        setMessageInputEvent(e);
        return true;
      }

      return false;
    }
  }));
};

var ThreadMessageInput$1 = /*#__PURE__*/React__default["default"].forwardRef(ThreadMessageInput);

module.exports = ThreadMessageInput$1;
//# sourceMappingURL=ThreadMessageInput.js.map
