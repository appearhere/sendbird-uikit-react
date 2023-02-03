'use strict';

var tslib_es6 = require('../tslib.es6-d6068b10.js');
var React = require('react');
var ui_Icon = require('./Icon.js');
require('prop-types');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function Loader(_a) {
  var _b = _a.className,
      className = _b === void 0 ? '' : _b,
      _c = _a.width,
      width = _c === void 0 ? '26px' : _c,
      _d = _a.height,
      height = _d === void 0 ? '26px' : _d,
      children = _a.children;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-loader'], false).join(' '),
    style: {
      width: typeof width === 'string' ? width : "".concat(width, "px"),
      height: typeof height === 'string' ? height : "".concat(height, "px")
    }
  }, children || /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.SPINNER,
    width: "26px",
    height: "26px"
  }));
}

module.exports = Loader;
//# sourceMappingURL=Loader.js.map
