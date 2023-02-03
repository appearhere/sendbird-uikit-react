'use strict';

var React = require('react');
var useSendbirdStateContext = require('../../useSendbirdStateContext.js');
var LocalizationContext = require('../../LocalizationContext-f4281153.js');
var utils = require('../../utils-88ce8023.js');
var Thread_context = require('../../ThreadProvider-5c14e997.js');
var Thread_components_ParentMessageInfo = require('./ParentMessageInfo.js');
var Thread_components_ThreadHeader = require('./ThreadHeader.js');
var Thread_components_ThreadList = require('./ThreadList.js');
var Thread_components_ThreadMessageInput = require('./ThreadMessageInput.js');
var Thread_context_types = require('../context/types.js');
var ui_PlaceHolder = require('../../index-6b9230ae.js');
var ui_Label = require('../../index-4197d014.js');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('../../stringSet-2dfd148b.js');
require('../../index-d4bc012c.js');
require('../../index-5977bdd5.js');
require('../../utils/message/getOutgoingMessageState.js');
require('../../UserProfileContext-fd00d1bd.js');
require('prop-types');
require('../../tslib.es6-d6068b10.js');
require('@sendbird/chat');
require('../../topics-085b5602.js');
require('@sendbird/chat/groupChannel');
require('../../uuid-2f4916c1.js');
require('@sendbird/chat/message');
require('../../RemoveMessageModal-4d250f7d.js');
require('../../ui/Modal.js');
require('react-dom');
require('../../index-1b132096.js');
require('../../ui/Button.js');
require('../../ui/Icon.js');
require('../../ui/IconButton.js');
require('../../MediaQueryContext-9a5566fc.js');
require('./ParentMessageInfoItem.js');
require('../../index-d05a5cae.js');
require('../../ui/Word.js');
require('../../ui/LinkLabel.js');
require('../../ui/MentionLabel.js');
require('../../ui/ContextMenu.js');
require('../../ui/SortByRow.js');
require('../../ui/UserProfile.js');
require('../../sendbirdSelectors.js');
require('../../utils-a9158c72.js');
require('../../ui/Avatar.js');
require('../../ui/ImageRenderer.js');
require('../../ui/TextButton.js');
require('../../color-0fae7c8e.js');
require('../../ui/EmojiReactions.js');
require('../../ui/Tooltip.js');
require('../../ui/TooltipWrapper.js');
require('../../ui/ReactionBadge.js');
require('../../ui/ReactionButton.js');
require('../../Channel/components/SuggestedMentionList.js');
require('../../ChannelProvider-4d043480.js');
require('../../compareIds-5d186d0d.js');
require('../../const-43cebab9.js');
require('../../const-28829306.js');
require('../../ui/FileViewer.js');
require('../../ui/MessageItemMenu.js');
require('../../ui/MessageItemReactionMenu.js');
require('../../ui/MessageInput.js');
require('react-dom/server');
require('../../ui/MentionUserLabel.js');
require('./ThreadListItem.js');
require('../../ui/DateSeparator.js');
require('../../index-daac2dae.js');
require('../../ui/Loader.js');
require('../../index-661b02a2.js');
require('../../index-fb9d8ec0.js');
require('../../ui/TextMessageItemBody.js');
require('../../ui/OGMessageItemBody.js');
require('../../ui/FileMessageItemBody.js');
require('../../ui/ThumbnailMessageItemBody.js');
require('../../ui/UnknownMessageItemBody.js');
require('date-fns');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var useMemorizedHeader = function (_a) {
  var renderHeader = _a.renderHeader;
  return React.useMemo(function () {
    if (typeof renderHeader === 'function') {
      return renderHeader();
    }

    return null;
  }, [renderHeader]);
};

var useMemorizedParentMessageInfo = function (_a) {
  var parentMessage = _a.parentMessage,
      parentMessageState = _a.parentMessageState,
      renderParentMessageInfo = _a.renderParentMessageInfo,
      renderParentMessageInfoPlaceholder = _a.renderParentMessageInfoPlaceholder;
  return React.useMemo(function () {
    if (parentMessageState === Thread_context_types.ParentMessageStateTypes.NIL || parentMessageState === Thread_context_types.ParentMessageStateTypes.LOADING || parentMessageState === Thread_context_types.ParentMessageStateTypes.INVALID) {
      if (typeof renderParentMessageInfoPlaceholder === 'function') {
        return renderParentMessageInfoPlaceholder(parentMessageState);
      }

      switch (parentMessageState) {
        case Thread_context_types.ParentMessageStateTypes.NIL:
          {
            return /*#__PURE__*/React__default["default"].createElement(ui_PlaceHolder.PlaceHolder, {
              className: "sendbird-thread-ui__parent-message-info placeholder-nil",
              type: ui_PlaceHolder.PlaceHolderTypes.NO_RESULTS,
              iconSize: "64px"
            });
          }

        case Thread_context_types.ParentMessageStateTypes.LOADING:
          {
            return /*#__PURE__*/React__default["default"].createElement(ui_PlaceHolder.PlaceHolder, {
              className: "sendbird-thread-ui__parent-message-info placeholder-loading",
              type: ui_PlaceHolder.PlaceHolderTypes.LOADING,
              iconSize: "64px"
            });
          }

        case Thread_context_types.ParentMessageStateTypes.INVALID:
          {
            return /*#__PURE__*/React__default["default"].createElement(ui_PlaceHolder.PlaceHolder, {
              className: "sendbird-thread-ui__parent-message-info placeholder-invalid",
              type: ui_PlaceHolder.PlaceHolderTypes.WRONG,
              iconSize: "64px"
            });
          }

        default:
          {
            return null;
          }
      }
    } else if (parentMessageState === Thread_context_types.ParentMessageStateTypes.INITIALIZED) {
      if (typeof renderParentMessageInfo === 'function') {
        return renderParentMessageInfo();
      }
    }

    return null;
  }, [parentMessage, parentMessageState, renderParentMessageInfo, renderParentMessageInfoPlaceholder]);
};

var useMemorizedThreadList = function (_a) {
  var threadListState = _a.threadListState,
      renderThreadListPlaceHolder = _a.renderThreadListPlaceHolder;
  return React.useMemo(function () {
    if (threadListState === Thread_context_types.ThreadListStateTypes.NIL || threadListState === Thread_context_types.ThreadListStateTypes.LOADING || threadListState === Thread_context_types.ThreadListStateTypes.INVALID) {
      if (typeof renderThreadListPlaceHolder === 'function') {
        return renderThreadListPlaceHolder(threadListState);
      }

      switch (threadListState) {
        case Thread_context_types.ThreadListStateTypes.LOADING:
          {
            return /*#__PURE__*/React__default["default"].createElement(ui_PlaceHolder.PlaceHolder, {
              className: "sendbird-thread-ui__thread-list placeholder-loading",
              type: ui_PlaceHolder.PlaceHolderTypes.LOADING,
              iconSize: "64px"
            });
          }

        case Thread_context_types.ThreadListStateTypes.INVALID:
          {
            return /*#__PURE__*/React__default["default"].createElement(ui_PlaceHolder.PlaceHolder, {
              className: "sendbird-thread-ui__thread-list placeholder-invalid",
              type: ui_PlaceHolder.PlaceHolderTypes.WRONG,
              iconSize: "64px"
            });
          }

        case Thread_context_types.ThreadListStateTypes.NIL:
          {
            return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null);
          }

        default:
          {
            return null;
          }
      }
    }

    return null;
  }, [threadListState, renderThreadListPlaceHolder]);
};

var ThreadUI = function (_a) {
  var _b, _c, _d;

  var renderHeader = _a.renderHeader,
      renderParentMessageInfo = _a.renderParentMessageInfo,
      renderMessage = _a.renderMessage,
      renderMessageInput = _a.renderMessageInput,
      renderCustomSeparator = _a.renderCustomSeparator,
      renderParentMessageInfoPlaceholder = _a.renderParentMessageInfoPlaceholder,
      renderThreadListPlaceHolder = _a.renderThreadListPlaceHolder;
  var stores = useSendbirdStateContext().stores;
  var currentUserId = (_d = (_c = (_b = stores === null || stores === void 0 ? void 0 : stores.sdkStore) === null || _b === void 0 ? void 0 : _b.sdk) === null || _c === void 0 ? void 0 : _c.currentUser) === null || _d === void 0 ? void 0 : _d.userId;
  var stringSet = LocalizationContext.useLocalization().stringSet;

  var _e = Thread_context.useThreadContext(),
      currentChannel = _e.currentChannel,
      allThreadMessages = _e.allThreadMessages,
      parentMessage = _e.parentMessage,
      parentMessageState = _e.parentMessageState,
      threadListState = _e.threadListState,
      hasMorePrev = _e.hasMorePrev,
      hasMoreNext = _e.hasMoreNext,
      fetchPrevThreads = _e.fetchPrevThreads,
      fetchNextThreads = _e.fetchNextThreads,
      onHeaderActionClick = _e.onHeaderActionClick,
      onMoveToParentMessage = _e.onMoveToParentMessage;

  var replyCount = allThreadMessages.length; // Memoized custom components

  var MemorizedHeader = useMemorizedHeader({
    renderHeader: renderHeader
  });
  var MemorizedParentMessageInfo = useMemorizedParentMessageInfo({
    parentMessage: parentMessage,
    parentMessageState: parentMessageState,
    renderParentMessageInfo: renderParentMessageInfo,
    renderParentMessageInfoPlaceholder: renderParentMessageInfoPlaceholder
  });
  var MemorizedThreadList = useMemorizedThreadList({
    threadListState: threadListState,
    renderThreadListPlaceHolder: renderThreadListPlaceHolder
  }); // scroll

  var _f = React.useState(0),
      scrollBottom = _f[0],
      setScrollBottom = _f[1];

  var scrollRef = React.useRef(null);

  var onScroll = function (e) {
    var element = e.target;
    var scrollTop = element.scrollTop,
        clientHeight = element.clientHeight,
        scrollHeight = element.scrollHeight;
    var threadItemNodes = scrollRef.current.querySelectorAll('.sendbird-thread-list-item');
    var firstNode = threadItemNodes === null || threadItemNodes === void 0 ? void 0 : threadItemNodes[0];

    if (Thread_context.isAboutSame(scrollTop, 0, 10) && hasMorePrev) {
      fetchPrevThreads(function (messages) {
        var _a;

        if (messages) {
          try {
            (_a = firstNode === null || firstNode === void 0 ? void 0 : firstNode.scrollIntoView) === null || _a === void 0 ? void 0 : _a.call(firstNode, {
              block: 'start',
              inline: 'nearest'
            });
          } catch (error) {//
          }
        }
      });
    }

    if (Thread_context.isAboutSame(clientHeight + scrollTop, scrollHeight, 10) && hasMoreNext) {
      var scrollTop_1 = scrollTop;
      fetchNextThreads(function (messages) {
        if (messages) {
          try {
            element.scrollTop = scrollTop_1;
            scrollRef.current.scrollTop = scrollTop_1;
          } catch (error) {//
          }
        }
      });
    } // save the lastest scroll bottom value


    if (scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current) {
      var current = scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current;
      setScrollBottom(current.scrollHeight - current.scrollTop - current.offsetHeight);
    }
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-thread-ui"
  }, MemorizedHeader || /*#__PURE__*/React__default["default"].createElement(Thread_components_ThreadHeader, {
    className: "sendbird-thread-ui__header",
    channelName: utils.getChannelTitle(currentChannel, currentUserId, stringSet),
    onActionIconClick: onHeaderActionClick,
    onChannelNameClick: function () {
      return onMoveToParentMessage({
        message: parentMessage,
        channel: currentChannel
      });
    }
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-thread-ui--scroll",
    ref: scrollRef,
    onScroll: onScroll
  }, MemorizedParentMessageInfo || /*#__PURE__*/React__default["default"].createElement(Thread_components_ParentMessageInfo, {
    className: "sendbird-thread-ui__parent-message-info"
  }), replyCount > 0 && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-thread-ui__reply-counts"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.BODY_1,
    color: ui_Label.LabelColors.ONBACKGROUND_3
  }, "".concat(replyCount, " ").concat(replyCount > 1 ? stringSet.THREAD__THREAD_REPLIES : stringSet.THREAD__THREAD_REPLY))), MemorizedThreadList || /*#__PURE__*/React__default["default"].createElement(Thread_components_ThreadList, {
    className: "sendbird-thread-ui__thread-list",
    allThreadMessages: allThreadMessages,
    renderMessage: renderMessage,
    renderCustomSeparator: renderCustomSeparator,
    scrollRef: scrollRef,
    scrollBottom: scrollBottom
  }), (renderMessageInput === null || renderMessageInput === void 0 ? void 0 : renderMessageInput()) || /*#__PURE__*/React__default["default"].createElement(Thread_components_ThreadMessageInput, {
    className: "sendbird-thread-ui__message-input"
  })));
};

module.exports = ThreadUI;
//# sourceMappingURL=ThreadUI.js.map
