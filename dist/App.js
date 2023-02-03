import React__default, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Sendbird from './SendbirdProvider.js';
import { u as useMediaQueryContext } from './MediaQueryContext-0ce6633d.js';
import ChannelList from './ChannelList.js';
import Channel from './Channel.js';
import ChannelSettings from './ChannelSettings.js';
import MessageSearchPannel from './MessageSearch.js';
import Thread from './Thread.js';
import { GroupChannelHandler } from '@sendbird/chat/groupChannel';
import useSendbirdStateContext from './useSendbirdStateContext.js';
import { u as uuidv4 } from './uuid-392016d0.js';
import './_rollupPluginBabelHelpers-fe256514.js';
import './withSendbird.js';
import '@sendbird/chat';
import '@sendbird/chat/openChannel';
import './actionTypes-35c63e84.js';
import './index-105a85f4.js';
import './tslib.es6-75bd0528.js';
import './utils/message/getOutgoingMessageState.js';
import 'css-vars-ponyfill';
import './LocalizationContext-e5f35d14.js';
import './stringSet-42c0e16e.js';
import './index-5dcd7e0f.js';
import './ChannelListProvider-41d1c19d.js';
import './topics-0560d548.js';
import './utils-8a4a2ff6.js';
import './UserProfileContext-517994e3.js';
import './ChannelList/components/ChannelListUI.js';
import './ChannelList/components/ChannelListHeader.js';
import './index-f60cbf08.js';
import './ui/Avatar.js';
import './ui/ImageRenderer.js';
import './ui/Icon.js';
import './ChannelList/components/AddChannel.js';
import './ui/IconButton.js';
import './CreateChannel.js';
import './CreateChannel/components/CreateChannelUI.js';
import './CreateChannelProvider-e9f3d260.js';
import './sendbirdSelectors.js';
import './CreateChannel/components/InviteUsers.js';
import './ui/Modal.js';
import 'react-dom';
import './index-5ab5d8fe.js';
import './ui/Button.js';
import './ui/UserListItem.js';
import './ui/MutedAvatarOverlay.js';
import './ui/Checkbox.js';
import './ui/UserProfile.js';
import './ui/ContextMenu.js';
import './ui/SortByRow.js';
import './CreateChannel/components/SelectChannelType.js';
import './ChannelList/components/ChannelPreview.js';
import './ui/ChannelAvatar.js';
import './utils-13fa0336.js';
import './ui/Badge.js';
import './index-1cb2692d.js';
import './index-229a0736.js';
import './ui/Loader.js';
import './index-05bd476f.js';
import './index-81d63e09.js';
import './ui/MentionUserLabel.js';
import './ui/TextButton.js';
import './color-52d916b6.js';
import './Channel/components/TypingIndicator.js';
import './ChannelProvider-3f08837d.js';
import './compareIds-fd8fd31e.js';
import './const-03d71a8a.js';
import '@sendbird/chat/message';
import './ui/ReactionButton.js';
import './useLongPress-ee44c5c3.js';
import './ChannelList/components/ChannelPreviewAction.js';
import './EditUserProfile.js';
import './index-481d7de2.js';
import './ui/Input.js';
import './index-88c5a220.js';
import './Channel/components/ChannelUI.js';
import './ui/ConnectionStatus.js';
import './Channel/components/ChannelHeader.js';
import './utils-5cd54b1d.js';
import './Channel/components/MessageList.js';
import './Channel/components/Message.js';
import './Channel/components/SuggestedMentionList.js';
import './const-fcaed0ae.js';
import './ThreadProvider-5ccbbc4b.js';
import './Thread/context/types.js';
import './ui/DateSeparator.js';
import './ui/MessageInput.js';
import 'react-dom/server';
import './ui/MessageContent.js';
import './ui/MessageItemMenu.js';
import './ui/MessageItemReactionMenu.js';
import './ui/EmojiReactions.js';
import './ui/Tooltip.js';
import './ui/TooltipWrapper.js';
import './ui/ReactionBadge.js';
import './ui/AdminMessage.js';
import './ui/TextMessageItemBody.js';
import './ui/Word.js';
import './ui/LinkLabel.js';
import './ui/MentionLabel.js';
import './ui/FileMessageItemBody.js';
import './ui/ThumbnailMessageItemBody.js';
import './ui/OGMessageItemBody.js';
import './ui/UnknownMessageItemBody.js';
import './ui/QuoteMessage.js';
import './ui/BottomSheet.js';
import './ui/ThreadReplies.js';
import './Channel/components/FileViewer.js';
import './Channel/components/RemoveMessageModal.js';
import './Channel/components/FrozenNotification.js';
import './Channel/components/UnreadCount.js';
import './Channel/components/MessageInput.js';
import './ui/QuoteMessageInput.js';
import './ChannelSettings/components/ChannelSettingsUI.js';
import './ChannelSettings/context.js';
import './ChannelSettings/components/ChannelProfile.js';
import './ChannelSettings/components/EditDetailsModal.js';
import './ChannelSettings/components/ModerationPanel.js';
import './ui/Accordion.js';
import './ui/AccordionGroup.js';
import './context-57341fcc.js';
import './ChannelSettings/components/UserListItem.js';
import './MemberList-e6061e27.js';
import './ChannelSettings/components/LeaveChannel.js';
import './ChannelSettings/components/UserPanel.js';
import './MessageSearch/components/MessageSearchUI.js';
import './MessageSearch/context.js';
import './ui/MessageSearchItem.js';
import './ui/MessageSearchFileItem.js';
import './Thread/components/ThreadUI.js';
import './Thread/components/ParentMessageInfo.js';
import './RemoveMessageModal-6f5adba5.js';
import './Thread/components/ParentMessageInfoItem.js';
import './ui/FileViewer.js';
import './Thread/components/ThreadHeader.js';
import './Thread/components/ThreadList.js';
import './Thread/components/ThreadListItem.js';
import 'date-fns';
import './Thread/components/ThreadMessageInput.js';

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

  var _a = useState(null),
      animatedMessageId = _a[0],
      setAnimatedMessageId = _a[1];

  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-app__wrap"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-app__channellist-wrap"
  }, /*#__PURE__*/React__default.createElement(ChannelList, {
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
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "\n          ".concat(showSettings ? 'sendbird-app__conversation--settings-open' : '', "\n          ").concat(showSearch ? 'sendbird-app__conversation--search-open' : '', "\n          sendbird-app__conversation-wrap\n        ")
  }, /*#__PURE__*/React__default.createElement(Channel, {
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
  })), showSettings && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-app__settingspanel-wrap"
  }, /*#__PURE__*/React__default.createElement(ChannelSettings, {
    className: "sendbird-channel-settings",
    channelUrl: (currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url) || '',
    onCloseClick: function () {
      setShowSettings(false);
    }
  })), showSearch && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-app__searchpanel-wrap"
  }, /*#__PURE__*/React__default.createElement(MessageSearchPannel, {
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
  })), showThread && /*#__PURE__*/React__default.createElement(Thread, {
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

  var _d = useState(PANELS === null || PANELS === void 0 ? void 0 : PANELS.CHANNEL_LIST),
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

  useEffect(function () {
    if (panel !== (PANELS === null || PANELS === void 0 ? void 0 : PANELS.CHANNEL)) {
      goToMessage();
    }
  }, [panel]);
  useEffect(function () {
    var _a, _b;

    var handlerId = uuidv4();

    if ((_a = sdk === null || sdk === void 0 ? void 0 : sdk.groupChannel) === null || _a === void 0 ? void 0 : _a.addGroupChannelHandler) {
      var handler = new GroupChannelHandler({
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
  return /*#__PURE__*/React__default.createElement("div", null, panel === (PANELS === null || PANELS === void 0 ? void 0 : PANELS.CHANNEL_LIST) && /*#__PURE__*/React__default.createElement("div", {
    className: "sb_mobile__panelwrap"
  }, /*#__PURE__*/React__default.createElement(ChannelList, {
    onProfileEditSuccess: onProfileEditSuccess,
    onChannelSelect: function (channel) {
      setCurrentChannel(channel);
      setPanel(PANELS.CHANNEL);
    },
    allowProfileEdit: allowProfileEdit // this condition must be true for mobile
    ,
    disableAutoSelect: true
  })), panel === (PANELS === null || PANELS === void 0 ? void 0 : PANELS.CHANNEL) && /*#__PURE__*/React__default.createElement("div", {
    className: "sb_mobile__panelwrap"
  }, /*#__PURE__*/React__default.createElement(Channel, {
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
  })), panel === (PANELS === null || PANELS === void 0 ? void 0 : PANELS.CHANNEL_SETTINGS) && /*#__PURE__*/React__default.createElement("div", {
    className: "sb_mobile__panelwrap"
  }, /*#__PURE__*/React__default.createElement(ChannelSettings, {
    channelUrl: currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url,
    onCloseClick: function () {
      setPanel(PANELS.CHANNEL);
    },
    onLeaveChannel: function () {
      setPanel(PANELS.CHANNEL_LIST);
    }
  })), panel === (PANELS === null || PANELS === void 0 ? void 0 : PANELS.MESSAGE_SEARCH) && /*#__PURE__*/React__default.createElement("div", {
    className: "sb_mobile__panelwrap"
  }, /*#__PURE__*/React__default.createElement(MessageSearchPannel, {
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

  var _a = useState(false),
      showThread = _a[0],
      setShowThread = _a[1];

  var _b = useState(null),
      threadTargetMessage = _b[0],
      setThreadTargetMessage = _b[1];

  var _c = useState(false),
      showSettings = _c[0],
      setShowSettings = _c[1];

  var _d = useState(false),
      showSearch = _d[0],
      setShowSearch = _d[1];

  var _e = useState(null),
      highlightedMessage = _e[0],
      setHighlightedMessage = _e[1];

  var _f = useState(null),
      startingPoint = _f[0],
      setStartingPoint = _f[1];

  var isMobile = useMediaQueryContext().isMobile;
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, isMobile ? /*#__PURE__*/React__default.createElement(MobileLayout, {
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
  }) : /*#__PURE__*/React__default.createElement(DesktopLayout, {
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
  const [currentChannel, setCurrentChannel] = useState(null);
  return /*#__PURE__*/React__default.createElement(Sendbird, {
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
  }, /*#__PURE__*/React__default.createElement(AppLayout, {
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
  appId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  accessToken: PropTypes.string,
  customApiHost: PropTypes.string,
  customWebSocketHost: PropTypes.string,
  theme: PropTypes.string,
  userListQuery: PropTypes.func,
  nickname: PropTypes.string,
  profileUrl: PropTypes.string,
  mediaQueryBreakPoint: PropTypes.string,
  allowProfileEdit: PropTypes.bool,
  disableUserProfile: PropTypes.bool,
  disableMarkAsDelivered: PropTypes.bool,
  renderUserProfile: PropTypes.func,
  onProfileEditSuccess: PropTypes.func,
  dateLocale: PropTypes.shape({}),
  config: PropTypes.shape({
    // None Error Warning Info 'All/Debug'
    logLevel: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    isREMUnitEnabled: PropTypes.bool
  }),
  isReactionEnabled: PropTypes.bool,
  replyType: PropTypes.oneOf(['NONE', 'QUOTE_REPLY', 'THREAD']),
  showSearchIcon: PropTypes.bool,
  isMessageGroupingEnabled: PropTypes.bool,
  stringSet: PropTypes.objectOf(PropTypes.string),
  colorSet: PropTypes.objectOf(PropTypes.string),
  imageCompression: PropTypes.shape({
    compressionRate: PropTypes.number,
    resizingWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    resizingHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }),
  disableAutoSelect: PropTypes.bool,
  isMentionEnabled: PropTypes.bool,
  isTypingIndicatorEnabledOnChannelList: PropTypes.bool,
  isMessageReceiptStatusEnabledOnChannelList: PropTypes.bool
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

export { App as default };
//# sourceMappingURL=App.js.map
