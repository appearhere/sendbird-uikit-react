import React__default, { useState } from 'react';
import Icon, { IconTypes, IconColors } from './Icon.js';
import ImageRenderer from './ImageRenderer.js';
import { h as getClassName, s as isSentMessage, q as isVideoMessage, p as isGifMessage } from '../index-105a85f4.js';
import 'prop-types';
import '../tslib.es6-75bd0528.js';
import '../utils/message/getOutgoingMessageState.js';

function ThumbnailMessageItemBody(_a) {
  var _b, _c;

  var className = _a.className,
      message = _a.message,
      _d = _a.isByMe,
      isByMe = _d === void 0 ? false : _d,
      _e = _a.mouseHover,
      mouseHover = _e === void 0 ? false : _e,
      _f = _a.isReactionEnabled,
      isReactionEnabled = _f === void 0 ? false : _f,
      showFileViewer = _a.showFileViewer,
      _g = _a.style,
      style = _g === void 0 ? {} : _g;
  var _h = message.thumbnails,
      thumbnails = _h === void 0 ? [] : _h;
  var thumbnailUrl = thumbnails.length > 0 ? (_b = thumbnails[0]) === null || _b === void 0 ? void 0 : _b.url : '';

  var _j = useState(false),
      imageRendered = _j[0],
      setImageRendered = _j[1];

  return /*#__PURE__*/React__default.createElement("div", {
    className: getClassName([className, 'sendbird-thumbnail-message-item-body', isByMe ? 'outgoing' : 'incoming', mouseHover ? 'mouse-hover' : '', isReactionEnabled && ((_c = message === null || message === void 0 ? void 0 : message.reactions) === null || _c === void 0 ? void 0 : _c.length) > 0 ? 'reactions' : '']),
    onClick: function () {
      if (isSentMessage(message)) {
        showFileViewer(true);
      }
    }
  }, /*#__PURE__*/React__default.createElement(ImageRenderer, {
    className: "sendbird-thumbnail-message-item-body__thumbnail",
    url: thumbnailUrl || (message === null || message === void 0 ? void 0 : message.url),
    alt: message === null || message === void 0 ? void 0 : message.type,
    width: (style === null || style === void 0 ? void 0 : style.width) || "360px",
    height: (style === null || style === void 0 ? void 0 : style.height) || "270px",
    onLoad: function () {
      setImageRendered(true);
    },
    placeHolder: function (style_) {
      return /*#__PURE__*/React__default.createElement("div", {
        className: "sendbird-thumbnail-message-item-body__placeholder",
        style: style_
      }, /*#__PURE__*/React__default.createElement("div", {
        className: "sendbird-thumbnail-message-item-body__placeholder__icon"
      }, /*#__PURE__*/React__default.createElement(Icon, {
        type: isVideoMessage(message) ? IconTypes.PLAY : IconTypes.PHOTO,
        fillColor: IconColors.ON_BACKGROUND_2,
        width: "34px",
        height: "34px"
      })));
    }
  }), isVideoMessage(message) && !thumbnailUrl && !imageRendered && /*#__PURE__*/React__default.createElement("video", {
    className: "sendbird-thumbnail-message-item-body__video"
  }, /*#__PURE__*/React__default.createElement("source", {
    src: message === null || message === void 0 ? void 0 : message.url,
    type: message === null || message === void 0 ? void 0 : message.type
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-thumbnail-message-item-body__image-cover"
  }), (isVideoMessage(message) || isGifMessage(message)) && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-thumbnail-message-item-body__icon-wrapper"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-thumbnail-message-item-body__icon-wrapper__icon"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: isVideoMessage(message) ? IconTypes.PLAY : IconTypes.GIF,
    fillColor: IconColors.GRAY,
    width: "34px",
    height: "34px"
  }))));
}

export { ThumbnailMessageItemBody as default };
//# sourceMappingURL=ThumbnailMessageItemBody.js.map
