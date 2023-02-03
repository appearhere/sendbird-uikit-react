'use strict';

var tslib_es6 = require('../tslib.es6-d6068b10.js');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var ReactionButton = /*#__PURE__*/React__default["default"].forwardRef(function (props, ref) {
  var className = props.className,
      width = props.width,
      height = props.height,
      selected = props.selected,
      onClick = props.onClick,
      children = props.children;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], Array.isArray(className) ? className : [className], true), ["sendbird-reaction-button".concat(selected ? '--selected' : '')], false).join(' '),
    ref: ref,
    role: "button",
    style: {
      width: width,
      height: height
    },
    onClick: function (e) {
      return onClick(e);
    },
    onKeyDown: function (e) {
      return onClick(e);
    },
    onTouchEnd: function (e) {
      onClick(e); // to stop longpress

      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    },
    tabIndex: 0
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-reaction-button__inner"
  }, children));
});

module.exports = ReactionButton;
//# sourceMappingURL=ReactionButton.js.map
