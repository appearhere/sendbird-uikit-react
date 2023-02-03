'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var SendbirdProvider = require('./SendbirdProvider.js');
var MediaQueryContext = require('./MediaQueryContext-9a5566fc.js');
var ChannelList = require('./ChannelList.js');
var Channel = require('./Channel.js');
var ChannelSettings = require('./ChannelSettings.js');
var MessageSearch = require('./MessageSearch.js');
var Thread = require('./Thread.js');
var groupChannel = require('@sendbird/chat/groupChannel');
var useSendbirdStateContext = require('./useSendbirdStateContext.js');
var uuid = require('./uuid-2f4916c1.js');
require('./_rollupPluginBabelHelpers-597f5cf8.js');
require('./withSendbird.js');
require('@sendbird/chat');
require('@sendbird/chat/openChannel');
require('./actionTypes-4d28a480.js');
require('./index-d05a5cae.js');
require('./tslib.es6-d6068b10.js');
require('./utils/message/getOutgoingMessageState.js');
require('css-vars-ponyfill');
require('./LocalizationContext-f4281153.js');
require('./stringSet-2dfd148b.js');
require('./index-d4bc012c.js');
require('./ChannelListProvider-05beb013.js');
require('./topics-085b5602.js');
require('./utils-a9158c72.js');
require('./UserProfileContext-fd00d1bd.js');
require('./ChannelList/components/ChannelListUI.js');
require('./ChannelList/components/ChannelListHeader.js');
require('./index-4197d014.js');
require('./ui/Avatar.js');
require('./ui/ImageRenderer.js');
require('./ui/Icon.js');
require('./ChannelList/components/AddChannel.js');
require('./ui/IconButton.js');
require('./CreateChannel.js');
require('./CreateChannel/components/CreateChannelUI.js');
require('./CreateChannelProvider-9629e09e.js');
require('./sendbirdSelectors.js');
require('./CreateChannel/components/InviteUsers.js');
require('./ui/Modal.js');
require('react-dom');
require('./index-1b132096.js');
require('./ui/Button.js');
require('./ui/UserListItem.js');
require('./ui/MutedAvatarOverlay.js');
require('./ui/Checkbox.js');
require('./ui/UserProfile.js');
require('./ui/ContextMenu.js');
require('./ui/SortByRow.js');
require('./CreateChannel/components/SelectChannelType.js');
require('./ChannelList/components/ChannelPreview.js');
require('./ui/ChannelAvatar.js');
require('./utils-6eb1ca73.js');
require('./ui/Badge.js');
require('./index-daac2dae.js');
require('./index-5977bdd5.js');
require('./ui/Loader.js');
require('./index-661b02a2.js');
require('./index-fb9d8ec0.js');
require('./ui/MentionUserLabel.js');
require('./ui/TextButton.js');
require('./color-0fae7c8e.js');
require('./Channel/components/TypingIndicator.js');
require('./ChannelProvider-4d043480.js');
require('./compareIds-5d186d0d.js');
require('./const-43cebab9.js');
require('@sendbird/chat/message');
require('./ui/ReactionButton.js');
require('./useLongPress-2f4ee82c.js');
require('./ChannelList/components/ChannelPreviewAction.js');
require('./EditUserProfile.js');
require('./index-4de278b6.js');
require('./ui/Input.js');
require('./index-6b9230ae.js');
require('./Channel/components/ChannelUI.js');
require('./ui/ConnectionStatus.js');
require('./Channel/components/ChannelHeader.js');
require('./utils-88ce8023.js');
require('./Channel/components/MessageList.js');
require('./Channel/components/Message.js');
require('./Channel/components/SuggestedMentionList.js');
require('./const-28829306.js');
require('./ThreadProvider-5c14e997.js');
require('./Thread/context/types.js');
require('./ui/DateSeparator.js');
require('./ui/MessageInput.js');
require('react-dom/server');
require('./ui/MessageContent.js');
require('./ui/MessageItemMenu.js');
require('./ui/MessageItemReactionMenu.js');
require('./ui/EmojiReactions.js');
require('./ui/Tooltip.js');
require('./ui/TooltipWrapper.js');
require('./ui/ReactionBadge.js');
require('./ui/AdminMessage.js');
require('./ui/TextMessageItemBody.js');
require('./ui/Word.js');
require('./ui/LinkLabel.js');
require('./ui/MentionLabel.js');
require('./ui/FileMessageItemBody.js');
require('./ui/ThumbnailMessageItemBody.js');
require('./ui/OGMessageItemBody.js');
require('./ui/UnknownMessageItemBody.js');
require('./ui/QuoteMessage.js');
require('./ui/BottomSheet.js');
require('./ui/ThreadReplies.js');
require('./Channel/components/FileViewer.js');
require('./Channel/components/RemoveMessageModal.js');
require('./Channel/components/FrozenNotification.js');
require('./Channel/components/UnreadCount.js');
require('./Channel/components/MessageInput.js');
require('./ui/QuoteMessageInput.js');
require('./ChannelSettings/components/ChannelSettingsUI.js');
require('./ChannelSettings/context.js');
require('./ChannelSettings/components/ChannelProfile.js');
require('./ChannelSettings/components/EditDetailsModal.js');
require('./ChannelSettings/components/ModerationPanel.js');
require('./ui/Accordion.js');
require('./ui/AccordionGroup.js');
require('./context-4e494ce5.js');
require('./ChannelSettings/components/UserListItem.js');
require('./MemberList-8ba5ffba.js');
require('./ChannelSettings/components/LeaveChannel.js');
require('./ChannelSettings/components/UserPanel.js');
require('./MessageSearch/components/MessageSearchUI.js');
require('./MessageSearch/context.js');
require('./ui/MessageSearchItem.js');
require('./ui/MessageSearchFileItem.js');
require('./Thread/components/ThreadUI.js');
require('./Thread/components/ParentMessageInfo.js');
require('./RemoveMessageModal-4d250f7d.js');
require('./Thread/components/ParentMessageInfoItem.js');
require('./ui/FileViewer.js');
require('./Thread/components/ThreadHeader.js');
require('./Thread/components/ThreadList.js');
require('./Thread/components/ThreadListItem.js');
require('date-fns');
require('./Thread/components/ThreadMessageInput.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

var DesktopLayout = function (props) {
  var isReactionEnabled = props.isReactionEnabled,
      replyType = props.replyType,
      isMessageGroupingEnabled = props.isMessageGroupingEnabled,
      allowProfileEdit = props.allowProfileEdit,
      showSearchIcon = props.showSearchIcon,
      onProfileEditSuccess = props.onProfileEditSuccess,
      disableAutoSelect = props.disableAutoSelect,
      currentChannel = props.currentChannel,
      setCurrentChannel = props.setCurrentChannel,
      showSettings = props.showSettings,
      setShowSettings = props.setShowSettings,
      showSearch = props.showSearch,
      setShowSearch = props.setShowSearch,
      highlightedMessage = props.highlightedMessage,
      setHighlightedMessage = props.setHighlightedMessage,
      startingPoint = props.startingPoint,
      setStartingPoint = props.setStartingPoint,
      showThread = props.showThread,
      setShowThread = props.setShowThread,
      threadTargetMessage = props.threadTargetMessage,
      setThreadTargetMessage = props.setThreadTargetMessage;

  var _a = React.useState(null),
      animatedMessageId = _a[0],
      setAnimatedMessageId = _a[1];

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-app__wrap"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-app__channellist-wrap"
  }, /*#__PURE__*/React__default["default"].createElement(ChannelList, {
    allowProfileEdit: allowProfileEdit,
    onProfileEditSuccess: onProfileEditSuccess,
    disableAutoSelect: disableAutoSelect,
    onChannelSelect: function (channel) {
      setStartingPoint(null);
      setHighlightedMessage(null);

      if (channel) {
        setCurrentChannel(channel);
      } else {
        setCurrentChannel(null);
      }
    }
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "\n          ".concat(showSettings ? 'sendbird-app__conversation--settings-open' : '', "\n          ").concat(showSearch ? 'sendbird-app__conversation--search-open' : '', "\n          sendbird-app__conversation-wrap\n        ")
  }, /*#__PURE__*/React__default["default"].createElement(Channel, {
    channelUrl: (currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url) || '',
    onChatHeaderActionClick: function () {
      setShowSearch(false);
      setShowThread(false);
      setShowSettings(!showSettings);
    },
    onSearchClick: function () {
      setShowSettings(false);
      setShowThread(false);
      setShowSearch(!showSearch);
    },
    onReplyInThread: function (_a) {
      var message = _a.message;
      setShowSettings(false);
      setShowSearch(false);

      if (replyType === 'THREAD') {
        setThreadTargetMessage({
          parentMessage: message,
          parentMessageId: message === null || message === void 0 ? void 0 : message.messageId
        });
        setShowThread(true);
      }
    },
    onQuoteMessageClick: function (_a) {
      var message = _a.message;
      setShowSettings(false);
      setShowSearch(false);

      if (replyType === 'THREAD') {
        setThreadTargetMessage(message);
        setShowThread(true);
      }
    },
    onMessageAnimated: function () {
      setAnimatedMessageId(null);
    },
    onMessageHighlighted: function () {
      setHighlightedMessage(null);
    },
    showSearchIcon: showSearchIcon,
    startingPoint: startingPoint,
    animatedMessage: animatedMessageId,
    highlightedMessage: highlightedMessage,
    isReactionEnabled: isReactionEnabled,
    replyType: replyType,
    isMessageGroupingEnabled: isMessageGroupingEnabled
  })), showSettings && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-app__settingspanel-wrap"
  }, /*#__PURE__*/React__default["default"].createElement(ChannelSettings, {
    className: "sendbird-channel-settings",
    channelUrl: (currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url) || '',
    onCloseClick: function () {
      setShowSettings(false);
    }
  })), showSearch && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-app__searchpanel-wrap"
  }, /*#__PURE__*/React__default["default"].createElement(MessageSearch, {
    channelUrl: (currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url) || '',
    onResultClick: function (message) {
      if (message.messageId === highlightedMessage) {
        setHighlightedMessage(null);
        setTimeout(function () {
          setHighlightedMessage(message.messageId);
        });
      } else {
        setStartingPoint(message.createdAt);
        setHighlightedMessage(message.messageId);
      }
    },
    onCloseClick: function () {
      setShowSearch(false);
    }
  })), showThread && /*#__PURE__*/React__default["default"].createElement(Thread, {
    className: "sendbird-app__thread",
    channelUrl: (currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url) || '',
    message: threadTargetMessage,
    onHeaderActionClick: function () {
      setShowThread(false);
    },
    onMoveToParentMessage: function (_a) {
      var message = _a.message,
          channel = _a.channel;

      if ((channel === null || channel === void 0 ? void 0 : channel.url) !== (currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url)) {
        setCurrentChannel(channel);
      }

      if ((message === null || message === void 0 ? void 0 : message.messageId) !== animatedMessageId) {
        setStartingPoint(message === null || message === void 0 ? void 0 : message.createdAt);
      }

      setTimeout(function () {
        setAnimatedMessageId(message === null || message === void 0 ? void 0 : message.messageId);
      }, 500);
    }
  }));
};

var PANELS;

(function (PANELS) {
  PANELS["CHANNEL_LIST"] = "CHANNEL_LIST";
  PANELS["CHANNEL"] = "CHANNEL";
  PANELS["CHANNEL_SETTINGS"] = "CHANNEL_SETTINGS";
  PANELS["MESSAGE_SEARCH"] = "MESSAGE_SEARCH";
})(PANELS || (PANELS = {}));

var MobileLayout = function (props) {
  var _a, _b, _c;

  var replyType = props.replyType,
      isMessageGroupingEnabled = props.isMessageGroupingEnabled,
      allowProfileEdit = props.allowProfileEdit,
      isReactionEnabled = props.isReactionEnabled,
      showSearchIcon = props.showSearchIcon,
      onProfileEditSuccess = props.onProfileEditSuccess,
      currentChannel = props.currentChannel,
      setCurrentChannel = props.setCurrentChannel,
      highlightedMessage = props.highlightedMessage,
      setHighlightedMessage = props.setHighlightedMessage,
      startingPoint = props.startingPoint,
      setStartingPoint = props.setStartingPoint;

  var _d = React.useState(PANELS === null || PANELS === void 0 ? void 0 : PANELS.CHANNEL_LIST),
      panel = _d[0],
      setPanel = _d[1];

  var store = useSendbirdStateContext();
  var sdk = (_b = (_a = store === null || store === void 0 ? void 0 : store.stores) === null || _a === void 0 ? void 0 : _a.sdkStore) === null || _b === void 0 ? void 0 : _b.sdk;
  var userId = (_c = store === null || store === void 0 ? void 0 : store.config) === null || _c === void 0 ? void 0 : _c.userId;

  var goToMessage = function (message) {
    setStartingPoint(message === null || message === void 0 ? void 0 : message.createdAt);
    setTimeout(function () {
      setHighlightedMessage(message === null || message === void 0 ? void 0 : message.messageId);
    });
  };

  React.useEffect(function () {
    if (panel !== (PANELS === null || PANELS === void 0 ? void 0 : PANELS.CHANNEL)) {
      goToMessage();
    }
  }, [panel]);
  React.useEffect(function () {
    var _a, _b;

    var handlerId = uuid.uuidv4();

    if ((_a = sdk === null || sdk === void 0 ? void 0 : sdk.groupChannel) === null || _a === void 0 ? void 0 : _a.addGroupChannelHandler) {
      var handler = new groupChannel.GroupChannelHandler({
        onUserBanned: function (groupChannel, user) {
          if (groupChannel.url === (currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url) && (user === null || user === void 0 ? void 0 : user.userId) === userId) {
            setPanel(PANELS.CHANNEL_LIST);
          }
        },
        onChannelDeleted: function (channelUrl) {
          if (channelUrl === (currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url)) {
            setPanel(PANELS.CHANNEL_LIST);
          }
        },
        onUserLeft: function (groupChannel, user) {
          if (groupChannel.url === (currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url) && (user === null || user === void 0 ? void 0 : user.userId) === userId) {
            setPanel(PANELS.CHANNEL_LIST);
          }
        }
      });
      (_b = sdk === null || sdk === void 0 ? void 0 : sdk.groupChannel) === null || _b === void 0 ? void 0 : _b.addGroupChannelHandler(handlerId, handler);
    }

    return function () {
      var _a, _b;

      (_b = (_a = sdk === null || sdk === void 0 ? void 0 : sdk.groupChannel) === null || _a === void 0 ? void 0 : _a.removeGroupChannelHandler) === null || _b === void 0 ? void 0 : _b.call(_a, handlerId);
    };
  }, [sdk]);
  return /*#__PURE__*/React__default["default"].createElement("div", null, panel === (PANELS === null || PANELS === void 0 ? void 0 : PANELS.CHANNEL_LIST) && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sb_mobile__panelwrap"
  }, /*#__PURE__*/React__default["default"].createElement(ChannelList, {
    onProfileEditSuccess: onProfileEditSuccess,
    onChannelSelect: function (channel) {
      setCurrentChannel(channel);
      setPanel(PANELS.CHANNEL);
    },
    allowProfileEdit: allowProfileEdit // this condition must be true for mobile
    ,
    disableAutoSelect: true
  })), panel === (PANELS === null || PANELS === void 0 ? void 0 : PANELS.CHANNEL) && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sb_mobile__panelwrap"
  }, /*#__PURE__*/React__default["default"].createElement(Channel, {
    replyType: replyType,
    channelUrl: currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url,
    onSearchClick: function () {
      setPanel(PANELS.MESSAGE_SEARCH);
    },
    onBackClick: function () {
      setPanel(PANELS.CHANNEL_LIST);
    },
    isReactionEnabled: isReactionEnabled,
    showSearchIcon: showSearchIcon,
    isMessageGroupingEnabled: isMessageGroupingEnabled,
    startingPoint: startingPoint,
    highlightedMessage: highlightedMessage,
    onChatHeaderActionClick: function () {
      setPanel(PANELS.CHANNEL_SETTINGS);
    }
  })), panel === (PANELS === null || PANELS === void 0 ? void 0 : PANELS.CHANNEL_SETTINGS) && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sb_mobile__panelwrap"
  }, /*#__PURE__*/React__default["default"].createElement(ChannelSettings, {
    channelUrl: currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url,
    onCloseClick: function () {
      setPanel(PANELS.CHANNEL);
    },
    onLeaveChannel: function () {
      setPanel(PANELS.CHANNEL_LIST);
    }
  })), panel === (PANELS === null || PANELS === void 0 ? void 0 : PANELS.MESSAGE_SEARCH) && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sb_mobile__panelwrap"
  }, /*#__PURE__*/React__default["default"].createElement(MessageSearch, {
    channelUrl: currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url,
    onCloseClick: function () {
      setPanel(PANELS.CHANNEL);
    },
    onResultClick: function (message) {
      setPanel(PANELS.CHANNEL);
      goToMessage(message);
    }
  })));
};

var AppLayout = function (props) {
  var isReactionEnabled = props.isReactionEnabled,
      replyType = props.replyType,
      isMessageGroupingEnabled = props.isMessageGroupingEnabled,
      allowProfileEdit = props.allowProfileEdit,
      showSearchIcon = props.showSearchIcon,
      onProfileEditSuccess = props.onProfileEditSuccess,
      disableAutoSelect = props.disableAutoSelect,
      currentChannel = props.currentChannel,
      setCurrentChannel = props.setCurrentChannel;

  var _a = React.useState(false),
      showThread = _a[0],
      setShowThread = _a[1];

  var _b = React.useState(null),
      threadTargetMessage = _b[0],
      setThreadTargetMessage = _b[1];

  var _c = React.useState(false),
      showSettings = _c[0],
      setShowSettings = _c[1];

  var _d = React.useState(false),
      showSearch = _d[0],
      setShowSearch = _d[1];

  var _e = React.useState(null),
      highlightedMessage = _e[0],
      setHighlightedMessage = _e[1];

  var _f = React.useState(null),
      startingPoint = _f[0],
      setStartingPoint = _f[1];

  var isMobile = MediaQueryContext.useMediaQueryContext().isMobile;
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, isMobile ? /*#__PURE__*/React__default["default"].createElement(MobileLayout, {
    replyType: replyType,
    isMessageGroupingEnabled: isMessageGroupingEnabled,
    allowProfileEdit: allowProfileEdit,
    isReactionEnabled: isReactionEnabled,
    showSearchIcon: showSearchIcon,
    onProfileEditSuccess: onProfileEditSuccess,
    currentChannel: currentChannel,
    setCurrentChannel: setCurrentChannel,
    highlightedMessage: highlightedMessage,
    setHighlightedMessage: setHighlightedMessage,
    startingPoint: startingPoint,
    setStartingPoint: setStartingPoint
  }) : /*#__PURE__*/React__default["default"].createElement(DesktopLayout, {
    isReactionEnabled: isReactionEnabled,
    replyType: replyType,
    isMessageGroupingEnabled: isMessageGroupingEnabled,
    allowProfileEdit: allowProfileEdit,
    showSearchIcon: showSearchIcon,
    onProfileEditSuccess: onProfileEditSuccess,
    disableAutoSelect: disableAutoSelect,
    currentChannel: currentChannel,
    setCurrentChannel: setCurrentChannel,
    showThread: showThread,
    setShowThread: setShowThread,
    threadTargetMessage: threadTargetMessage,
    setThreadTargetMessage: setThreadTargetMessage,
    showSettings: showSettings,
    setShowSettings: setShowSettings,
    showSearch: showSearch,
    setShowSearch: setShowSearch,
    highlightedMessage: highlightedMessage,
    setHighlightedMessage: setHighlightedMessage,
    startingPoint: startingPoint,
    setStartingPoint: setStartingPoint
  }));
};

/**
 * This is a drop in Chat solution
 * Can also be used as an example for creating
 * default chat apps
 */
function App(props) {
  const {
    appId,
    userId,
    accessToken,
    customApiHost,
    customWebSocketHost,
    mediaQueryBreakPoint,
    theme,
    userListQuery,
    nickname,
    profileUrl,
    dateLocale,
    config = {},
    isReactionEnabled,
    isMentionEnabled,
    replyType,
    isMessageGroupingEnabled,
    colorSet,
    stringSet,
    allowProfileEdit,
    disableUserProfile,
    disableMarkAsDelivered,
    renderUserProfile,
    showSearchIcon,
    onProfileEditSuccess,
    imageCompression,
    disableAutoSelect,
    isTypingIndicatorEnabledOnChannelList,
    isMessageReceiptStatusEnabledOnChannelList
  } = props;
  const [currentChannel, setCurrentChannel] = React.useState(null);
  return /*#__PURE__*/React__default["default"].createElement(SendbirdProvider, {
    stringSet: stringSet,
    appId: appId,
    userId: userId,
    accessToken: accessToken,
    customApiHost: customApiHost,
    customWebSocketHost: customWebSocketHost,
    mediaQueryBreakPoint: mediaQueryBreakPoint,
    theme: theme,
    nickname: nickname,
    profileUrl: profileUrl,
    dateLocale: dateLocale,
    userListQuery: userListQuery,
    config: config,
    colorSet: colorSet,
    disableUserProfile: disableUserProfile,
    disableMarkAsDelivered: disableMarkAsDelivered,
    renderUserProfile: renderUserProfile,
    imageCompression: imageCompression,
    isReactionEnabled: isReactionEnabled,
    isMentionEnabled: isMentionEnabled,
    onUserProfileMessage: channel => {
      setCurrentChannel(channel);
    },
    isTypingIndicatorEnabledOnChannelList: isTypingIndicatorEnabledOnChannelList,
    isMessageReceiptStatusEnabledOnChannelList: isMessageReceiptStatusEnabledOnChannelList,
    replyType: replyType
  }, /*#__PURE__*/React__default["default"].createElement(AppLayout, {
    currentChannel: currentChannel,
    setCurrentChannel: setCurrentChannel,
    isReactionEnabled: isReactionEnabled,
    replyType: replyType,
    isMessageGroupingEnabled: isMessageGroupingEnabled,
    allowProfileEdit: allowProfileEdit,
    showSearchIcon: showSearchIcon,
    onProfileEditSuccess: onProfileEditSuccess,
    disableAutoSelect: disableAutoSelect
  }));
}
App.propTypes = {
  appId: PropTypes__default["default"].string.isRequired,
  userId: PropTypes__default["default"].string.isRequired,
  accessToken: PropTypes__default["default"].string,
  customApiHost: PropTypes__default["default"].string,
  customWebSocketHost: PropTypes__default["default"].string,
  theme: PropTypes__default["default"].string,
  userListQuery: PropTypes__default["default"].func,
  nickname: PropTypes__default["default"].string,
  profileUrl: PropTypes__default["default"].string,
  mediaQueryBreakPoint: PropTypes__default["default"].string,
  allowProfileEdit: PropTypes__default["default"].bool,
  disableUserProfile: PropTypes__default["default"].bool,
  disableMarkAsDelivered: PropTypes__default["default"].bool,
  renderUserProfile: PropTypes__default["default"].func,
  onProfileEditSuccess: PropTypes__default["default"].func,
  dateLocale: PropTypes__default["default"].shape({}),
  config: PropTypes__default["default"].shape({
    // None Error Warning Info 'All/Debug'
    logLevel: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].arrayOf(PropTypes__default["default"].string)]),
    isREMUnitEnabled: PropTypes__default["default"].bool
  }),
  isReactionEnabled: PropTypes__default["default"].bool,
  replyType: PropTypes__default["default"].oneOf(['NONE', 'QUOTE_REPLY', 'THREAD']),
  showSearchIcon: PropTypes__default["default"].bool,
  isMessageGroupingEnabled: PropTypes__default["default"].bool,
  stringSet: PropTypes__default["default"].objectOf(PropTypes__default["default"].string),
  colorSet: PropTypes__default["default"].objectOf(PropTypes__default["default"].string),
  imageCompression: PropTypes__default["default"].shape({
    compressionRate: PropTypes__default["default"].number,
    resizingWidth: PropTypes__default["default"].oneOfType([PropTypes__default["default"].number, PropTypes__default["default"].string]),
    resizingHeight: PropTypes__default["default"].oneOfType([PropTypes__default["default"].number, PropTypes__default["default"].string])
  }),
  disableAutoSelect: PropTypes__default["default"].bool,
  isMentionEnabled: PropTypes__default["default"].bool,
  isTypingIndicatorEnabledOnChannelList: PropTypes__default["default"].bool,
  isMessageReceiptStatusEnabledOnChannelList: PropTypes__default["default"].bool
};
App.defaultProps = {
  accessToken: '',
  customApiHost: '',
  customWebSocketHost: '',
  theme: 'light',
  nickname: '',
  profileUrl: '',
  userListQuery: null,
  mediaQueryBreakPoint: null,
  dateLocale: null,
  allowProfileEdit: false,
  onProfileEditSuccess: null,
  disableUserProfile: false,
  disableMarkAsDelivered: false,
  showSearchIcon: false,
  renderUserProfile: null,
  config: {},
  isReactionEnabled: true,
  isMentionEnabled: false,
  replyType: 'NONE',
  isMessageGroupingEnabled: true,
  stringSet: null,
  colorSet: null,
  imageCompression: {},
  disableAutoSelect: false,
  isTypingIndicatorEnabledOnChannelList: false,
  isMessageReceiptStatusEnabledOnChannelList: false
};

module.exports = App;
//# sourceMappingURL=App.js.map
