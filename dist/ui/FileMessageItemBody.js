import React__default from 'react';
import { L as Label, a as LabelTypography, b as LabelColors } from '../index-f60cbf08.js';
import Icon, { IconTypes, IconColors } from './Icon.js';
import TextButton from './TextButton.js';
import { h as getClassName, J as getUIKitFileType, t as truncateString } from '../index-105a85f4.js';
import { C as Colors } from '../color-52d916b6.js';
import { u as useMediaQueryContext } from '../MediaQueryContext-0ce6633d.js';
import 'prop-types';
import '../stringSet-42c0e16e.js';
import '../tslib.es6-75bd0528.js';
import '../utils/message/getOutgoingMessageState.js';

function FileMessageItemBody(_a) {
  var _b;

  var className = _a.className,
      message = _a.message,
      _c = _a.isByMe,
      isByMe = _c === void 0 ? false : _c,
      _d = _a.mouseHover,
      mouseHover = _d === void 0 ? false : _d,
      _e = _a.isReactionEnabled,
      isReactionEnabled = _e === void 0 ? false : _e,
      _f = _a.truncateLimit,
      truncateLimit = _f === void 0 ? null : _f;
  var isMobile = useMediaQueryContext().isMobile;
  var truncateMaxNum = truncateLimit || (isMobile ? 20 : null);
  return /*#__PURE__*/React__default.createElement("div", {
    className: getClassName([className, 'sendbird-file-message-item-body', isByMe ? 'outgoing' : 'incoming', mouseHover ? 'mouse-hover' : '', isReactionEnabled && ((_b = message === null || message === void 0 ? void 0 : message.reactions) === null || _b === void 0 ? void 0 : _b.length) > 0 ? 'reactions' : ''])
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-file-message-item-body__file-icon"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-file-message-item-body__file-icon__icon",
    type: {
      IMAGE: IconTypes.PHOTO,
      VIDEO: IconTypes.PLAY,
      AUDIO: IconTypes.FILE_AUDIO,
      GIF: IconTypes.GIF,
      OTHERS: IconTypes.FILE_DOCUMENT
    }[getUIKitFileType(message === null || message === void 0 ? void 0 : message.type)],
    fillColor: IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  })), /*#__PURE__*/React__default.createElement(TextButton, {
    className: "sendbird-file-message-item-body__file-name",
    onClick: function () {
      window.open(message === null || message === void 0 ? void 0 : message.url);
    },
    color: isByMe ? Colors.ONCONTENT_1 : Colors.ONBACKGROUND_1
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-file-message-item-body__file-name__text",
    type: LabelTypography.BODY_1,
    color: isByMe ? LabelColors.ONCONTENT_1 : LabelColors.ONBACKGROUND_1
  }, truncateString((message === null || message === void 0 ? void 0 : message.name) || (message === null || message === void 0 ? void 0 : message.url), truncateMaxNum))));
}

export { FileMessageItemBody as default };
//# sourceMappingURL=FileMessageItemBody.js.map
