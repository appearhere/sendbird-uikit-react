'use strict';

var React = require('react');
var Thread_components_ThreadListItem = require('./ThreadListItem.js');
var Thread_context = require('../../ThreadProvider-5c14e997.js');
var useSendbirdStateContext = require('../../useSendbirdStateContext.js');
var dateFns = require('date-fns');
require('../../tslib.es6-d6068b10.js');
require('../../index-5977bdd5.js');
require('../../index-d4bc012c.js');
require('../../LocalizationContext-f4281153.js');
require('../../stringSet-2dfd148b.js');
require('../../ui/DateSeparator.js');
require('../../color-0fae7c8e.js');
require('../../index-4197d014.js');
require('prop-types');
require('../../RemoveMessageModal-4d250f7d.js');
require('../../ui/Modal.js');
require('react-dom');
require('../../index-1b132096.js');
require('../../ui/Button.js');
require('../../ui/Icon.js');
require('../../ui/IconButton.js');
require('../../MediaQueryContext-9a5566fc.js');
require('../../ui/FileViewer.js');
require('../../index-d05a5cae.js');
require('../../utils/message/getOutgoingMessageState.js');
require('../../ui/Avatar.js');
require('../../ui/ImageRenderer.js');
require('../../uuid-2f4916c1.js');
require('../../Channel/components/SuggestedMentionList.js');
require('../../ChannelProvider-4d043480.js');
require('../../UserProfileContext-fd00d1bd.js');
require('../../topics-085b5602.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('../../compareIds-5d186d0d.js');
require('../../const-43cebab9.js');
require('@sendbird/chat/groupChannel');
require('@sendbird/chat/message');
require('../../ui/ContextMenu.js');
require('../../ui/SortByRow.js');
require('../../ui/ReactionButton.js');
require('../../const-28829306.js');
require('../../withSendbird.js');
require('../context/types.js');
require('@sendbird/chat');
require('../../ui/MessageInput.js');
require('react-dom/server');
require('../../ui/MentionUserLabel.js');
require('../../ui/UserProfile.js');
require('../../sendbirdSelectors.js');
require('../../utils-a9158c72.js');
require('../../ui/MessageItemMenu.js');
require('../../ui/MessageItemReactionMenu.js');
require('../../index-daac2dae.js');
require('../../ui/Loader.js');
require('../../index-661b02a2.js');
require('../../index-fb9d8ec0.js');
require('../../ui/EmojiReactions.js');
require('../../ui/Tooltip.js');
require('../../ui/TooltipWrapper.js');
require('../../ui/ReactionBadge.js');
require('../../ui/TextMessageItemBody.js');
require('../../ui/Word.js');
require('../../ui/LinkLabel.js');
require('../../ui/MentionLabel.js');
require('../../ui/OGMessageItemBody.js');
require('../../ui/FileMessageItemBody.js');
require('../../ui/TextButton.js');
require('../../ui/ThumbnailMessageItemBody.js');
require('../../ui/UnknownMessageItemBody.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function ThreadList(_a) {
  var className = _a.className,
      allThreadMessages = _a.allThreadMessages,
      renderMessage = _a.renderMessage,
      renderCustomSeparator = _a.renderCustomSeparator,
      scrollRef = _a.scrollRef,
      scrollBottom = _a.scrollBottom;
  var config = useSendbirdStateContext().config;
  var replyType = config.replyType;
  var currentChannel = Thread_context.useThreadContext().currentChannel;
  var MemorizedMessage = React.useMemo(function () {
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
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-thread-list ".concat(className)
  }, allThreadMessages.map(function (message, idx) {
    var prevMessage = allThreadMessages[idx - 1];
    var nextMessage = allThreadMessages[idx + 1];

    var _a = Thread_context.compareMessagesForGrouping(prevMessage, message, nextMessage, currentChannel, replyType) ,
        chainTop = _a[0],
        chainBottom = _a[1];

    var hasSeparator = !((prevMessage === null || prevMessage === void 0 ? void 0 : prevMessage.createdAt) > 0 && dateFns.isSameDay(message === null || message === void 0 ? void 0 : message.createdAt, prevMessage === null || prevMessage === void 0 ? void 0 : prevMessage.createdAt));

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
    }) || /*#__PURE__*/React__default["default"].createElement(Thread_components_ThreadListItem, {
      message: message,
      chainTop: chainTop,
      chainBottom: chainBottom,
      hasSeparator: hasSeparator,
      renderCustomSeparator: renderCustomSeparator,
      handleScroll: handleScroll
    });
  }));
}

module.exports = ThreadList;
//# sourceMappingURL=ThreadList.js.map
