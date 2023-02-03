'use strict';

var React = require('react');
var index = require('../../index-fb9d8ec0.js');
var ui_Icon = require('../../ui/Icon.js');
var ui_PlaceHolder = require('../../index-6b9230ae.js');
var OpenChannel_context = require('../../OpenChannelProvider-b1de2e4c.js');
var OpenChannel_components_OpenChannelMessage = require('./OpenChannelMessage.js');
require('../../index-5977bdd5.js');
require('../../index-d4bc012c.js');
require('prop-types');
require('../../tslib.es6-d6068b10.js');
require('../../LocalizationContext-f4281153.js');
require('../../stringSet-2dfd148b.js');
require('../../index-4197d014.js');
require('../../ui/Loader.js');
require('../../UserProfileContext-fd00d1bd.js');
require('../../compareIds-5d186d0d.js');
require('../../topics-085b5602.js');
require('@sendbird/chat');
require('@sendbird/chat/openChannel');
require('../../uuid-2f4916c1.js');
require('../../useSendbirdStateContext.js');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('../../ui/OpenchannelUserMessage.js');
require('../../ui/Avatar.js');
require('../../ui/ImageRenderer.js');
require('../../ui/ContextMenu.js');
require('react-dom');
require('../../ui/SortByRow.js');
require('../../index-d05a5cae.js');
require('../../utils/message/getOutgoingMessageState.js');
require('../../ui/IconButton.js');
require('../../ui/UserProfile.js');
require('../../sendbirdSelectors.js');
require('../../utils-a9158c72.js');
require('../../ui/Button.js');
require('../../utils-3e8b8da5.js');
require('../../index-4469abc4.js');
require('../../MediaQueryContext-9a5566fc.js');
require('../../useLongPress-2f4ee82c.js');
require('../../ui/OpenChannelAdminMessage.js');
require('../../ui/OpenchannelOGMessage.js');
require('../../ui/LinkLabel.js');
require('../../ui/Word.js');
require('../../ui/MentionLabel.js');
require('../../ui/OpenchannelThumbnailMessage.js');
require('../../ui/OpenchannelFileMessage.js');
require('../../ui/TextButton.js');
require('../../color-0fae7c8e.js');
require('../../ui/DateSeparator.js');
require('../../ui/MessageInput.js');
require('react-dom/server');
require('../../const-28829306.js');
require('../../const-43cebab9.js');
require('../../ui/MentionUserLabel.js');
require('../../ui/FileViewer.js');
require('../../index-1b132096.js');
require('../../ui/Modal.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function OpenchannelMessageList(props, ref) {
  var _a = OpenChannel_context.useOpenChannelContext(),
      _b = _a.isMessageGroupingEnabled,
      isMessageGroupingEnabled = _b === void 0 ? true : _b,
      allMessages = _a.allMessages,
      hasMore = _a.hasMore,
      onScroll = _a.onScroll;

  var scrollRef = ref || React.useRef(null);

  var _c = React.useState(false),
      showScrollDownButton = _c[0],
      setShowScrollDownButton = _c[1];

  var handleOnScroll = function (e) {
    var element = e.target;
    var scrollTop = element.scrollTop,
        scrollHeight = element.scrollHeight,
        clientHeight = element.clientHeight;

    if (scrollHeight > scrollTop + clientHeight + 1) {
      setShowScrollDownButton(true);
    } else {
      setShowScrollDownButton(false);
    }

    if (!hasMore) {
      return;
    }

    if (scrollTop === 0) {
      var nodes = scrollRef.current.querySelectorAll('.sendbird-msg--scroll-ref');
      var first_1 = nodes && nodes[0];
      onScroll(function () {
        try {
          first_1.scrollIntoView();
        } catch (error) {}
      });
    }
  };

  var scrollToBottom = function () {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
      setShowScrollDownButton(false);
    }
  };

  var memoizedMessageList = React.useMemo(function () {
    var _a;

    if (allMessages.length > 0) {
      return allMessages.map(function (message, index$1) {
        var previousMessage = allMessages[index$1 - 1];
        var nextMessage = allMessages[index$1 - 1];
        var previousMessageCreatedAt = previousMessage && previousMessage.createdAt;
        var currentCreatedAt = message === null || message === void 0 ? void 0 : message.createdAt; // https://stackoverflow.com/a/41855608

        var hasSeparator = !(previousMessageCreatedAt && index.isSameDay(currentCreatedAt, previousMessageCreatedAt));

        var _a = isMessageGroupingEnabled ? OpenChannel_context.compareMessagesForGrouping(previousMessage, message, nextMessage) : [false, false],
            chainTop = _a[0],
            chainBottom = _a[1];

        return /*#__PURE__*/React__default["default"].createElement(OpenChannel_components_OpenChannelMessage, {
          key: (message === null || message === void 0 ? void 0 : message.messageId) || (message === null || message === void 0 ? void 0 : message.reqId),
          message: message,
          chainTop: chainTop,
          chainBottom: chainBottom,
          hasSeparator: hasSeparator,
          renderMessage: props === null || props === void 0 ? void 0 : props.renderMessage
        });
      });
    }

    return ((_a = props === null || props === void 0 ? void 0 : props.renderPlaceHolderEmptyList) === null || _a === void 0 ? void 0 : _a.call(props)) || /*#__PURE__*/React__default["default"].createElement(ui_PlaceHolder.PlaceHolder, {
      className: "sendbird-openchannel-conversation-scroll__container__place-holder",
      type: ui_PlaceHolder.PlaceHolderTypes.NO_MESSAGES
    });
  }, [allMessages]);
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-conversation-scroll"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-conversation-scroll__container"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-conversation-scroll__container__padding"
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: ['sendbird-openchannel-conversation-scroll__container__item-container', allMessages.length > 0 ? '' : 'no-messages'].join(' '),
    onScroll: handleOnScroll,
    ref: scrollRef
  }, memoizedMessageList)), showScrollDownButton && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-conversation-scroll__container__scroll-bottom-button",
    onClick: scrollToBottom,
    onKeyDown: scrollToBottom,
    tabIndex: 0,
    role: "button"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    width: "24px",
    height: "24px",
    type: ui_Icon.IconTypes.CHEVRON_DOWN,
    fillColor: ui_Icon.IconColors.CONTENT
  })));
}

var OpenChannelMessageList = /*#__PURE__*/React__default["default"].forwardRef(OpenchannelMessageList);

module.exports = OpenChannelMessageList;
//# sourceMappingURL=OpenChannelMessageList.js.map
