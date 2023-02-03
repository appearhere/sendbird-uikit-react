import React__default, { useRef, useState, useMemo } from 'react';
import { i as isSameDay } from '../../index-81d63e09.js';
import Icon, { IconTypes, IconColors } from '../../ui/Icon.js';
import { P as PlaceHolder, a as PlaceHolderTypes } from '../../index-88c5a220.js';
import { u as useOpenChannelContext, c as compareMessagesForGrouping } from '../../OpenChannelProvider-104ab716.js';
import MessagOpenChannelMessageeHoc from './OpenChannelMessage.js';
import '../../index-229a0736.js';
import '../../index-5dcd7e0f.js';
import 'prop-types';
import '../../tslib.es6-75bd0528.js';
import '../../LocalizationContext-e5f35d14.js';
import '../../stringSet-42c0e16e.js';
import '../../index-f60cbf08.js';
import '../../ui/Loader.js';
import '../../UserProfileContext-517994e3.js';
import '../../compareIds-fd8fd31e.js';
import '../../topics-0560d548.js';
import '@sendbird/chat';
import '@sendbird/chat/openChannel';
import '../../uuid-392016d0.js';
import '../../useSendbirdStateContext.js';
import '../../withSendbird.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import '../../ui/OpenchannelUserMessage.js';
import '../../ui/Avatar.js';
import '../../ui/ImageRenderer.js';
import '../../ui/ContextMenu.js';
import 'react-dom';
import '../../ui/SortByRow.js';
import '../../index-105a85f4.js';
import '../../utils/message/getOutgoingMessageState.js';
import '../../ui/IconButton.js';
import '../../ui/UserProfile.js';
import '../../sendbirdSelectors.js';
import '../../utils-8a4a2ff6.js';
import '../../ui/Button.js';
import '../../utils-8271be8c.js';
import '../../index-f8bdb205.js';
import '../../MediaQueryContext-0ce6633d.js';
import '../../useLongPress-ee44c5c3.js';
import '../../ui/OpenChannelAdminMessage.js';
import '../../ui/OpenchannelOGMessage.js';
import '../../ui/LinkLabel.js';
import '../../ui/Word.js';
import '../../ui/MentionLabel.js';
import '../../ui/OpenchannelThumbnailMessage.js';
import '../../ui/OpenchannelFileMessage.js';
import '../../ui/TextButton.js';
import '../../color-52d916b6.js';
import '../../ui/DateSeparator.js';
import '../../ui/MessageInput.js';
import 'react-dom/server';
import '../../const-fcaed0ae.js';
import '../../const-03d71a8a.js';
import '../../ui/MentionUserLabel.js';
import '../../ui/FileViewer.js';
import '../../index-5ab5d8fe.js';
import '../../ui/Modal.js';

function OpenchannelMessageList(props, ref) {
  var _a = useOpenChannelContext(),
      _b = _a.isMessageGroupingEnabled,
      isMessageGroupingEnabled = _b === void 0 ? true : _b,
      allMessages = _a.allMessages,
      hasMore = _a.hasMore,
      onScroll = _a.onScroll;

  var scrollRef = ref || useRef(null);

  var _c = useState(false),
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

  var memoizedMessageList = useMemo(function () {
    var _a;

    if (allMessages.length > 0) {
      return allMessages.map(function (message, index) {
        var previousMessage = allMessages[index - 1];
        var nextMessage = allMessages[index - 1];
        var previousMessageCreatedAt = previousMessage && previousMessage.createdAt;
        var currentCreatedAt = message === null || message === void 0 ? void 0 : message.createdAt; // https://stackoverflow.com/a/41855608

        var hasSeparator = !(previousMessageCreatedAt && isSameDay(currentCreatedAt, previousMessageCreatedAt));

        var _a = isMessageGroupingEnabled ? compareMessagesForGrouping(previousMessage, message, nextMessage) : [false, false],
            chainTop = _a[0],
            chainBottom = _a[1];

        return /*#__PURE__*/React__default.createElement(MessagOpenChannelMessageeHoc, {
          key: (message === null || message === void 0 ? void 0 : message.messageId) || (message === null || message === void 0 ? void 0 : message.reqId),
          message: message,
          chainTop: chainTop,
          chainBottom: chainBottom,
          hasSeparator: hasSeparator,
          renderMessage: props === null || props === void 0 ? void 0 : props.renderMessage
        });
      });
    }

    return ((_a = props === null || props === void 0 ? void 0 : props.renderPlaceHolderEmptyList) === null || _a === void 0 ? void 0 : _a.call(props)) || /*#__PURE__*/React__default.createElement(PlaceHolder, {
      className: "sendbird-openchannel-conversation-scroll__container__place-holder",
      type: PlaceHolderTypes.NO_MESSAGES
    });
  }, [allMessages]);
  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-conversation-scroll"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-conversation-scroll__container"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-conversation-scroll__container__padding"
  }), /*#__PURE__*/React__default.createElement("div", {
    className: ['sendbird-openchannel-conversation-scroll__container__item-container', allMessages.length > 0 ? '' : 'no-messages'].join(' '),
    onScroll: handleOnScroll,
    ref: scrollRef
  }, memoizedMessageList)), showScrollDownButton && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-conversation-scroll__container__scroll-bottom-button",
    onClick: scrollToBottom,
    onKeyDown: scrollToBottom,
    tabIndex: 0,
    role: "button"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    width: "24px",
    height: "24px",
    type: IconTypes.CHEVRON_DOWN,
    fillColor: IconColors.CONTENT
  })));
}

var OpenChannelMessageList = /*#__PURE__*/React__default.forwardRef(OpenchannelMessageList);

export { OpenChannelMessageList as default };
//# sourceMappingURL=OpenChannelMessageList.js.map
