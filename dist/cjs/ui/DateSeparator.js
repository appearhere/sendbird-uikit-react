'use strict';

var tslib_es6 = require('../tslib.es6-d6068b10.js');
var React = require('react');
var color = require('../color-0fae7c8e.js');
var ui_Label = require('../index-4197d014.js');
require('prop-types');
require('../stringSet-2dfd148b.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var DateSeparator = function (_a) {
  var _b = _a.children,
      children = _b === void 0 ? null : _b,
      _c = _a.className,
      className = _c === void 0 ? '' : _c,
      _d = _a.separatorColor,
      separatorColor = _d === void 0 ? color.Colors.ONBACKGROUND_4 : _d;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-separator'], false).join(' ')
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: ['sendbird-separator__left', "".concat(color.changeColorToClassName(separatorColor), "--background-color")].join(' ')
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-separator__text"
  }, children || /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.CAPTION_2,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, "Date Separator")), /*#__PURE__*/React__default["default"].createElement("div", {
    className: ['sendbird-separator__right', "".concat(color.changeColorToClassName(separatorColor), "--background-color")].join(' ')
  }));
};

module.exports = DateSeparator;
//# sourceMappingURL=DateSeparator.js.map
