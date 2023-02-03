'use strict';

var React = require('react');
var index = require('../index-d05a5cae.js');
var ui_Icon = require('./Icon.js');
var ui_Label = require('../index-4197d014.js');
var LocalizationContext = require('../LocalizationContext-f4281153.js');
var ui_ImageRenderer = require('./ImageRenderer.js');
require('../tslib.es6-d6068b10.js');
require('../utils/message/getOutgoingMessageState.js');
require('prop-types');
require('../stringSet-2dfd148b.js');
require('../index-d4bc012c.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var componentClassname = 'sendbird-quote_message_input__avatar';
function QuoteMessageThumbnail(_a) {
  var message = _a.message;

  if (!index.isFileMessage(message)) {
    return null;
  }

  var thumbnailUrl = message.thumbnails && message.thumbnails.length > 0 && message.thumbnails[0].url || index.isImageMessage(message) && message.url;

  if (index.isThumbnailMessage(message) && thumbnailUrl) {
    return /*#__PURE__*/React__default["default"].createElement(ui_ImageRenderer, {
      className: componentClassname,
      url: thumbnailUrl,
      alt: message.type,
      width: "44px",
      height: "44px",
      fixedSize: true
    });
  } else if (index.isAudioMessage(message)) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: componentClassname
    }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
      type: ui_Icon.IconTypes.FILE_AUDIO,
      fillColor: ui_Icon.IconColors.ON_BACKGROUND_2,
      width: "24px",
      height: "24px"
    }));
  } else {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: componentClassname
    }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
      type: ui_Icon.IconTypes.FILE_DOCUMENT,
      fillColor: ui_Icon.IconColors.ON_BACKGROUND_2,
      width: "24px",
      height: "24px"
    }));
  }
}

function QuoteMessageInput(_a) {
  var className = _a.className,
      replyingMessage = _a.replyingMessage,
      onClose = _a.onClose;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  var fileMessage = replyingMessage;
  var sender = replyingMessage === null || replyingMessage === void 0 ? void 0 : replyingMessage.sender;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName(['sendbird-quote_message_input', className])
  }, /*#__PURE__*/React__default["default"].createElement(QuoteMessageThumbnail, {
    message: fileMessage
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-quote_message_input__body",
    style: {
      width: "calc(100% - ".concat((fileMessage === null || fileMessage === void 0 ? void 0 : fileMessage.isFileMessage()) ? '164px' : '120px', ")"),
      left: (fileMessage === null || fileMessage === void 0 ? void 0 : fileMessage.isFileMessage()) ? '92px' : '40px'
    }
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-quote_message_input__body__sender-name",
    type: ui_Label.LabelTypography.CAPTION_1,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, "".concat(stringSet.QUOTE_MESSAGE_INPUT__REPLY_TO, " ").concat(sender && sender.nickname ? sender.nickname : stringSet.NO_NAME)), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-quote_message_input__body__message-content",
    type: ui_Label.LabelTypography.BODY_2,
    color: ui_Label.LabelColors.ONBACKGROUND_3
  }, index.isImageMessage(fileMessage) && !index.isGifMessage(fileMessage) && stringSet.QUOTE_MESSAGE_INPUT__FILE_TYPE_IMAGE, index.isVideoMessage(fileMessage) && stringSet.QUOTE_MESSAGE_INPUT__FILE_TYPE__VIDEO, index.isGifMessage(fileMessage) && stringSet.QUOTE_MESSAGE_INPUT__FILE_TYPE_GIF, index.isUserMessage(replyingMessage) && replyingMessage.message, index.isFileMessage(fileMessage) && !index.isThumbnailMessage(fileMessage) && fileMessage.name)), /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: "sendbird-quote_message_input__close-button",
    type: ui_Icon.IconTypes.CLOSE,
    fillColor: ui_Icon.IconColors.ON_BACKGROUND_2,
    width: "24px",
    height: "24px",
    onClick: function () {
      return onClose(replyingMessage);
    }
  }));
}

module.exports = QuoteMessageInput;
//# sourceMappingURL=QuoteMessageInput.js.map
