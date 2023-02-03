import React__default, { useMemo } from 'react';
import ThreadListItem from './ThreadListItem.js';
import { u as useThreadContext, c as compareMessagesForGrouping } from '../../ThreadProvider-5ccbbc4b.js';
import useSendbirdStateContext from '../../useSendbirdStateContext.js';
import { isSameDay } from 'date-fns';
import '../../tslib.es6-75bd0528.js';
import '../../index-229a0736.js';
import '../../index-5dcd7e0f.js';
import '../../LocalizationContext-e5f35d14.js';
import '../../stringSet-42c0e16e.js';
import '../../ui/DateSeparator.js';
import '../../color-52d916b6.js';
import '../../index-f60cbf08.js';
import 'prop-types';
import '../../RemoveMessageModal-6f5adba5.js';
import '../../ui/Modal.js';
import 'react-dom';
import '../../index-5ab5d8fe.js';
import '../../ui/Button.js';
import '../../ui/Icon.js';
import '../../ui/IconButton.js';
import '../../MediaQueryContext-0ce6633d.js';
import '../../ui/FileViewer.js';
import '../../index-105a85f4.js';
import '../../utils/message/getOutgoingMessageState.js';
import '../../ui/Avatar.js';
import '../../ui/ImageRenderer.js';
import '../../uuid-392016d0.js';
import '../../Channel/components/SuggestedMentionList.js';
import '../../ChannelProvider-3f08837d.js';
import '../../UserProfileContext-517994e3.js';
import '../../topics-0560d548.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import '../../compareIds-fd8fd31e.js';
import '../../const-03d71a8a.js';
import '@sendbird/chat/groupChannel';
import '@sendbird/chat/message';
import '../../ui/ContextMenu.js';
import '../../ui/SortByRow.js';
import '../../ui/ReactionButton.js';
import '../../const-fcaed0ae.js';
import '../../withSendbird.js';
import '../context/types.js';
import '@sendbird/chat';
import '../../ui/MessageInput.js';
import 'react-dom/server';
import '../../ui/MentionUserLabel.js';
import '../../ui/UserProfile.js';
import '../../sendbirdSelectors.js';
import '../../utils-8a4a2ff6.js';
import '../../ui/MessageItemMenu.js';
import '../../ui/MessageItemReactionMenu.js';
import '../../index-1cb2692d.js';
import '../../ui/Loader.js';
import '../../index-05bd476f.js';
import '../../index-81d63e09.js';
import '../../ui/EmojiReactions.js';
import '../../ui/Tooltip.js';
import '../../ui/TooltipWrapper.js';
import '../../ui/ReactionBadge.js';
import '../../ui/TextMessageItemBody.js';
import '../../ui/Word.js';
import '../../ui/LinkLabel.js';
import '../../ui/MentionLabel.js';
import '../../ui/OGMessageItemBody.js';
import '../../ui/FileMessageItemBody.js';
import '../../ui/TextButton.js';
import '../../ui/ThumbnailMessageItemBody.js';
import '../../ui/UnknownMessageItemBody.js';

function ThreadList(_a) {
  var className = _a.className,
      allThreadMessages = _a.allThreadMessages,
      renderMessage = _a.renderMessage,
      renderCustomSeparator = _a.renderCustomSeparator,
      scrollRef = _a.scrollRef,
      scrollBottom = _a.scrollBottom;
  var config = useSendbirdStateContext().config;
  var replyType = config.replyType;
  var currentChannel = useThreadContext().currentChannel;
  var MemorizedMessage = useMemo(function () {
    return function (_a) {
      var message = _a.message,
          chainTop = _a.chainTop,
          chainBottom = _a.chainBottom,
          hasSeparator = _a.hasSeparator;

      if (typeof renderMessage === 'function') {
        return renderMessage({
          message: message,
          chainTop: chainTop,
          chainBottom: chainBottom,
          hasSeparator: hasSeparator
        });
      }

      return null;
    };
  }, [renderMessage]);
  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-thread-list ".concat(className)
  }, allThreadMessages.map(function (message, idx) {
    var prevMessage = allThreadMessages[idx - 1];
    var nextMessage = allThreadMessages[idx + 1];

    var _a = compareMessagesForGrouping(prevMessage, message, nextMessage, currentChannel, replyType) ,
        chainTop = _a[0],
        chainBottom = _a[1];

    var hasSeparator = !((prevMessage === null || prevMessage === void 0 ? void 0 : prevMessage.createdAt) > 0 && isSameDay(message === null || message === void 0 ? void 0 : message.createdAt, prevMessage === null || prevMessage === void 0 ? void 0 : prevMessage.createdAt));

    var handleScroll = function () {
      var current = scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current;

      if (current) {
        var bottom = current.scrollHeight - current.scrollTop - current.offsetHeight;

        if (scrollBottom < bottom) {
          current.scrollTop += bottom - scrollBottom;
        }
      }
    };

    return MemorizedMessage({
      message: message,
      chainTop: chainTop,
      chainBottom: chainBottom,
      hasSeparator: hasSeparator
    }) || /*#__PURE__*/React__default.createElement(ThreadListItem, {
      message: message,
      chainTop: chainTop,
      chainBottom: chainBottom,
      hasSeparator: hasSeparator,
      renderCustomSeparator: renderCustomSeparator,
      handleScroll: handleScroll
    });
  }));
}

export { ThreadList as default };
//# sourceMappingURL=ThreadList.js.map
