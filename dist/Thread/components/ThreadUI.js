import React__default, { useMemo, useState, useRef } from 'react';
import useSendbirdStateContext from '../../useSendbirdStateContext.js';
import { u as useLocalization } from '../../LocalizationContext-e5f35d14.js';
import { g as getChannelTitle } from '../../utils-5cd54b1d.js';
import { u as useThreadContext, i as isAboutSame } from '../../ThreadProvider-5ccbbc4b.js';
import ParentMessageInfo from './ParentMessageInfo.js';
import ThreadHeader from './ThreadHeader.js';
import ThreadList from './ThreadList.js';
import ThreadMessageInput from './ThreadMessageInput.js';
import { ParentMessageStateTypes, ThreadListStateTypes } from '../context/types.js';
import { P as PlaceHolder, a as PlaceHolderTypes } from '../../index-88c5a220.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../../index-f60cbf08.js';
import '../../withSendbird.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import '../../stringSet-42c0e16e.js';
import '../../index-5dcd7e0f.js';
import '../../index-229a0736.js';
import '../../utils/message/getOutgoingMessageState.js';
import '../../UserProfileContext-517994e3.js';
import 'prop-types';
import '../../tslib.es6-75bd0528.js';
import '@sendbird/chat';
import '../../topics-0560d548.js';
import '@sendbird/chat/groupChannel';
import '../../uuid-392016d0.js';
import '@sendbird/chat/message';
import '../../RemoveMessageModal-6f5adba5.js';
import '../../ui/Modal.js';
import 'react-dom';
import '../../index-5ab5d8fe.js';
import '../../ui/Button.js';
import '../../ui/Icon.js';
import '../../ui/IconButton.js';
import '../../MediaQueryContext-0ce6633d.js';
import './ParentMessageInfoItem.js';
import '../../index-105a85f4.js';
import '../../ui/Word.js';
import '../../ui/LinkLabel.js';
import '../../ui/MentionLabel.js';
import '../../ui/ContextMenu.js';
import '../../ui/SortByRow.js';
import '../../ui/UserProfile.js';
import '../../sendbirdSelectors.js';
import '../../utils-8a4a2ff6.js';
import '../../ui/Avatar.js';
import '../../ui/ImageRenderer.js';
import '../../ui/TextButton.js';
import '../../color-52d916b6.js';
import '../../ui/EmojiReactions.js';
import '../../ui/Tooltip.js';
import '../../ui/TooltipWrapper.js';
import '../../ui/ReactionBadge.js';
import '../../ui/ReactionButton.js';
import '../../Channel/components/SuggestedMentionList.js';
import '../../ChannelProvider-3f08837d.js';
import '../../compareIds-fd8fd31e.js';
import '../../const-03d71a8a.js';
import '../../const-fcaed0ae.js';
import '../../ui/FileViewer.js';
import '../../ui/MessageItemMenu.js';
import '../../ui/MessageItemReactionMenu.js';
import '../../ui/MessageInput.js';
import 'react-dom/server';
import '../../ui/MentionUserLabel.js';
import './ThreadListItem.js';
import '../../ui/DateSeparator.js';
import '../../index-1cb2692d.js';
import '../../ui/Loader.js';
import '../../index-05bd476f.js';
import '../../index-81d63e09.js';
import '../../ui/TextMessageItemBody.js';
import '../../ui/OGMessageItemBody.js';
import '../../ui/FileMessageItemBody.js';
import '../../ui/ThumbnailMessageItemBody.js';
import '../../ui/UnknownMessageItemBody.js';
import 'date-fns';

var useMemorizedHeader = function (_a) {
  var renderHeader = _a.renderHeader;
  return useMemo(function () {
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
  return useMemo(function () {
    if (parentMessageState === ParentMessageStateTypes.NIL || parentMessageState === ParentMessageStateTypes.LOADING || parentMessageState === ParentMessageStateTypes.INVALID) {
      if (typeof renderParentMessageInfoPlaceholder === 'function') {
        return renderParentMessageInfoPlaceholder(parentMessageState);
      }

      switch (parentMessageState) {
        case ParentMessageStateTypes.NIL:
          {
            return /*#__PURE__*/React__default.createElement(PlaceHolder, {
              className: "sendbird-thread-ui__parent-message-info placeholder-nil",
              type: PlaceHolderTypes.NO_RESULTS,
              iconSize: "64px"
            });
          }

        case ParentMessageStateTypes.LOADING:
          {
            return /*#__PURE__*/React__default.createElement(PlaceHolder, {
              className: "sendbird-thread-ui__parent-message-info placeholder-loading",
              type: PlaceHolderTypes.LOADING,
              iconSize: "64px"
            });
          }

        case ParentMessageStateTypes.INVALID:
          {
            return /*#__PURE__*/React__default.createElement(PlaceHolder, {
              className: "sendbird-thread-ui__parent-message-info placeholder-invalid",
              type: PlaceHolderTypes.WRONG,
              iconSize: "64px"
            });
          }

        default:
          {
            return null;
          }
      }
    } else if (parentMessageState === ParentMessageStateTypes.INITIALIZED) {
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
  return useMemo(function () {
    if (threadListState === ThreadListStateTypes.NIL || threadListState === ThreadListStateTypes.LOADING || threadListState === ThreadListStateTypes.INVALID) {
      if (typeof renderThreadListPlaceHolder === 'function') {
        return renderThreadListPlaceHolder(threadListState);
      }

      switch (threadListState) {
        case ThreadListStateTypes.LOADING:
          {
            return /*#__PURE__*/React__default.createElement(PlaceHolder, {
              className: "sendbird-thread-ui__thread-list placeholder-loading",
              type: PlaceHolderTypes.LOADING,
              iconSize: "64px"
            });
          }

        case ThreadListStateTypes.INVALID:
          {
            return /*#__PURE__*/React__default.createElement(PlaceHolder, {
              className: "sendbird-thread-ui__thread-list placeholder-invalid",
              type: PlaceHolderTypes.WRONG,
              iconSize: "64px"
            });
          }

        case ThreadListStateTypes.NIL:
          {
            return /*#__PURE__*/React__default.createElement(React__default.Fragment, null);
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
  var stringSet = useLocalization().stringSet;

  var _e = useThreadContext(),
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

  var _f = useState(0),
      scrollBottom = _f[0],
      setScrollBottom = _f[1];

  var scrollRef = useRef(null);

  var onScroll = function (e) {
    var element = e.target;
    var scrollTop = element.scrollTop,
        clientHeight = element.clientHeight,
        scrollHeight = element.scrollHeight;
    var threadItemNodes = scrollRef.current.querySelectorAll('.sendbird-thread-list-item');
    var firstNode = threadItemNodes === null || threadItemNodes === void 0 ? void 0 : threadItemNodes[0];

    if (isAboutSame(scrollTop, 0, 10) && hasMorePrev) {
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

    if (isAboutSame(clientHeight + scrollTop, scrollHeight, 10) && hasMoreNext) {
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

  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-thread-ui"
  }, MemorizedHeader || /*#__PURE__*/React__default.createElement(ThreadHeader, {
    className: "sendbird-thread-ui__header",
    channelName: getChannelTitle(currentChannel, currentUserId, stringSet),
    onActionIconClick: onHeaderActionClick,
    onChannelNameClick: function () {
      return onMoveToParentMessage({
        message: parentMessage,
        channel: currentChannel
      });
    }
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-thread-ui--scroll",
    ref: scrollRef,
    onScroll: onScroll
  }, MemorizedParentMessageInfo || /*#__PURE__*/React__default.createElement(ParentMessageInfo, {
    className: "sendbird-thread-ui__parent-message-info"
  }), replyCount > 0 && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-thread-ui__reply-counts"
  }, /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_3
  }, "".concat(replyCount, " ").concat(replyCount > 1 ? stringSet.THREAD__THREAD_REPLIES : stringSet.THREAD__THREAD_REPLY))), MemorizedThreadList || /*#__PURE__*/React__default.createElement(ThreadList, {
    className: "sendbird-thread-ui__thread-list",
    allThreadMessages: allThreadMessages,
    renderMessage: renderMessage,
    renderCustomSeparator: renderCustomSeparator,
    scrollRef: scrollRef,
    scrollBottom: scrollBottom
  }), (renderMessageInput === null || renderMessageInput === void 0 ? void 0 : renderMessageInput()) || /*#__PURE__*/React__default.createElement(ThreadMessageInput, {
    className: "sendbird-thread-ui__message-input"
  })));
};

export { ThreadUI as default };
//# sourceMappingURL=ThreadUI.js.map
