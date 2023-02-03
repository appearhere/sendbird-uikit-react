import { a as __spreadArray } from '../tslib.es6-75bd0528.js';
import React__default from 'react';
import { L as Label, a as LabelTypography, b as LabelColors } from '../index-f60cbf08.js';
import 'prop-types';
import '../stringSet-42c0e16e.js';

function AdminMessage(_a) {
  var _b;

  var _c = _a.className,
      className = _c === void 0 ? '' : _c,
      message = _a.message;

  if (!((message === null || message === void 0 ? void 0 : message.isAdminMessage) || (message === null || message === void 0 ? void 0 : message.messageType)) || !((_b = message === null || message === void 0 ? void 0 : message.isAdminMessage) === null || _b === void 0 ? void 0 : _b.call(message)) || (message === null || message === void 0 ? void 0 : message.messageType) !== 'admin') {
    return null;
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: __spreadArray(__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-admin-message'], false).join(' ')
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-admin-message__text",
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, message === null || message === void 0 ? void 0 : message.message));
}

export { AdminMessage as default };
//# sourceMappingURL=AdminMessage.js.map
