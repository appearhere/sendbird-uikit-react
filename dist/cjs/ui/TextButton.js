'use strict';

var tslib_es6 = require('../tslib.es6-d6068b10.js');
var React = require('react');
var color = require('../color-0fae7c8e.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var TextButton = function (_a) {
  var _b = _a.className,
      className = _b === void 0 ? '' : _b,
      _c = _a.color,
      color$1 = _c === void 0 ? color.Colors.ONBACKGROUND_1 : _c,
      _d = _a.disabled,
      disabled = _d === void 0 ? false : _d,
      _e = _a.disableUnderline,
      disableUnderline = _e === void 0 ? false : _e,
      _f = _a.onClick,
      onClick = _f === void 0 ? function () {} : _f,
      children = _a.children;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], Array.isArray(className) ? className : [className], true), [color.changeColorToClassName(color$1), disableUnderline ? 'sendbird-textbutton--not-underline' : 'sendbird-textbutton', disabled ? 'sendbird-textbutton--disabled' : ''], false).join(' '),
    role: "button",
    tabIndex: 0,
    onClick: function (e) {
      return onClick(e);
    },
    onKeyPress: function (e) {
      return onClick(e);
    }
  }, children);
};

module.exports = TextButton;
//# sourceMappingURL=TextButton.js.map
