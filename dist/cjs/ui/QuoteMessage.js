'use strict';

var React = require('react');
var ui_Icon = require('./Icon.js');
var ui_Label = require('../index-4197d014.js');
var ui_ImageRenderer = require('./ImageRenderer.js');
var LocalizationContext = require('../LocalizationContext-f4281153.js');
var index = require('../index-d05a5cae.js');
require('prop-types');
require('../stringSet-2dfd148b.js');
require('../tslib.es6-d6068b10.js');
require('../index-d4bc012c.js');
require('../utils/message/getOutgoingMessageState.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function QuoteMessage(_a) {
  var _b;

  var _c, _d, _e, _f;

  var message = _a.message,
      _g = _a.userId,
      userId = _g === void 0 ? '' : _g,
      _h = _a.isByMe,
      isByMe = _h === void 0 ? false : _h,
      className = _a.className,
      _j = _a.isUnavailable,
      isUnavailable = _j === void 0 ? false : _j,
      onClick = _a.onClick;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  var parentMessage = message.parentMessage;
  var parentMessageSender = parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.sender;
  var parentMessageSenderNickname = userId === (parentMessageSender === null || parentMessageSender === void 0 ? void 0 : parentMessageSender.userId) ? stringSet.QUOTED_MESSAGE__CURRENT_USER : parentMessageSender === null || parentMessageSender === void 0 ? void 0 : parentMessageSender.nickname;
  var parentMessageUrl = (parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.url) || '';
  var parentMessageType = parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.type;
  var currentMessageSenderNickname = userId === ((_c = message === null || message === void 0 ? void 0 : message.sender) === null || _c === void 0 ? void 0 : _c.userId) ? stringSet.QUOTED_MESSAGE__CURRENT_USER : (_d = message === null || message === void 0 ? void 0 : message.sender) === null || _d === void 0 ? void 0 : _d.nickname;

  var _k = React.useState(false),
      isThumbnailLoaded = _k[0],
      setThumbnailLoaded = _k[1];

  var uikitFileTypes = index.getUIKitFileTypes();
  var splitFileName = (parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.name) ? parentMessage.name.split('/') : parentMessageUrl.split('/');
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName([className, 'sendbird-quote-message', isByMe ? 'outgoing' : 'incoming', isUnavailable ? 'unavailable' : '']),
    key: parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.messageId,
    onClick: function () {
      if (!isUnavailable && onClick) {
        onClick();
      }
    },
    onTouchEnd: function () {
      if (!isUnavailable && onClick) {
        onClick();
      }
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-quote-message__replied-to"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: "sendbird-quote-message__replied-to__icon",
    type: ui_Icon.IconTypes.REPLY,
    fillColor: ui_Icon.IconColors.ON_BACKGROUND_3,
    width: "12px",
    height: "12px"
  }), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-quote-message__replied-to__text",
    type: ui_Label.LabelTypography.CAPTION_2,
    color: ui_Label.LabelColors.ONBACKGROUND_3
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    className: "sendbird-quote-message__replied-to__text__nickname"
  }, currentMessageSenderNickname), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "sendbird-quote-message__replied-to__text__text"
  }, stringSet.QUOTED_MESSAGE__REPLIED_TO), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "sendbird-quote-message__replied-to__text__nickname"
  }, parentMessageSenderNickname))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-quote-message__replied-message"
  }, isUnavailable && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-quote-message__replied-message__text-message"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-quote-message__replied-message__text-message__word",
    type: ui_Label.LabelTypography.BODY_2,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, stringSet.QUOTED_MESSAGE__UNAVAILABLE)), index.isUserMessage(parentMessage) && ((_e = parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.message) === null || _e === void 0 ? void 0 : _e.length) > 0 && !isUnavailable && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-quote-message__replied-message__text-message"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-quote-message__replied-message__text-message__word",
    type: ui_Label.LabelTypography.BODY_2,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.message)), index.isThumbnailMessage(parentMessage) && parentMessageUrl && !isUnavailable && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-quote-message__replied-message__thumbnail-message"
  }, /*#__PURE__*/React__default["default"].createElement(ui_ImageRenderer, {
    className: "sendbird-quote-message__replied-message__thumbnail-message__image",
    url: parentMessageUrl,
    alt: parentMessageType,
    width: "144px",
    height: "108px",
    onLoad: function () {
      return setThumbnailLoaded(true);
    },
    defaultComponent: /*#__PURE__*/React__default["default"].createElement("div", {
      className: "sendbird-quote-message__replied-message__thumbnail-message__placeholder"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "sendbird-quote-message__replied-message__thumbnail-message__placeholder__icon"
    }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
      type: index.isVideo(parentMessageType) ? ui_Icon.IconTypes.PLAY : ui_Icon.IconTypes.PHOTO,
      fillColor: ui_Icon.IconColors.ON_BACKGROUND_2,
      width: "22px",
      height: "22px"
    })))
  }), index.isVideo(parentMessageType) && !(((_f = parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.thumbnails) === null || _f === void 0 ? void 0 : _f.length) > 0) && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("video", {
    className: "sendbird-quote-message__replied-message__thumbnail-message__video"
  }, /*#__PURE__*/React__default["default"].createElement("source", {
    src: parentMessageUrl,
    type: parentMessageType
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-quote-message__replied-message__thumbnail-message__cover"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-quote-message__replied-message__thumbnail-message__cover__icon"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.PLAY,
    fillColor: ui_Icon.IconColors.GRAY,
    width: "14px",
    height: "14px"
  })))), isThumbnailLoaded && index.isGif(parentMessageType) && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-quote-message__replied-message__thumbnail-message__cover"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-quote-message__replied-message__thumbnail-message__cover__icon"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.GIF,
    fillColor: ui_Icon.IconColors.GRAY,
    width: "14px",
    height: "14px"
  })))), index.isFileMessage(parentMessage) && !index.isSupportedFileView(parentMessage.type) && parentMessageUrl && !isUnavailable && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-quote-message__replied-message__file-message"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: "sendbird-quote-message__replied-message__file-message__type-icon",
    type: (_b = {}, _b[uikitFileTypes.IMAGE] = ui_Icon.IconTypes.PHOTO, _b[uikitFileTypes.VIDEO] = ui_Icon.IconTypes.PLAY, _b[uikitFileTypes.AUDIO] = ui_Icon.IconTypes.FILE_AUDIO, _b[uikitFileTypes.GIF] = ui_Icon.IconTypes.GIF, _b[uikitFileTypes.OTHERS] = ui_Icon.IconTypes.FILE_DOCUMENT, _b)[index.getUIKitFileType(parentMessageType)],
    fillColor: ui_Icon.IconColors.ON_BACKGROUND_3,
    width: "16px",
    height: "16px"
  }), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-quote-message__replied-message__file-message__file-name",
    type: ui_Label.LabelTypography.BODY_2,
    color: ui_Label.LabelColors.ONBACKGROUND_3
  }, index.truncateString(splitFileName[splitFileName.length - 1])))));
}

module.exports = QuoteMessage;
//# sourceMappingURL=QuoteMessage.js.map
