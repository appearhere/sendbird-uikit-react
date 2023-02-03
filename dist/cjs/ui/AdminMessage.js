'use strict';

var tslib_es6 = require('../tslib.es6-d6068b10.js');
var React = require('react');
var ui_Label = require('../index-4197d014.js');
require('prop-types');
require('../stringSet-2dfd148b.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function AdminMessage(_a) {
  var _b;

  var _c = _a.className,
      className = _c === void 0 ? '' : _c,
      message = _a.message;

  if (!((message === null || message === void 0 ? void 0 : message.isAdminMessage) || (message === null || message === void 0 ? void 0 : message.messageType)) || !((_b = message === null || message === void 0 ? void 0 : message.isAdminMessage) === null || _b === void 0 ? void 0 : _b.call(message)) || (message === null || message === void 0 ? void 0 : message.messageType) !== 'admin') {
    return null;
  }

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-admin-message'], false).join(' ')
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-admin-message__text",
    type: ui_Label.LabelTypography.CAPTION_2,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, message === null || message === void 0 ? void 0 : message.message));
}

module.exports = AdminMessage;
//# sourceMappingURL=AdminMessage.js.map
