'use strict';

var tslib_es6 = require('../tslib.es6-d6068b10.js');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var SPACE_FROM_TRIGGER = 8;
function TooltipWrapper(_a) {
  var _b = _a.className,
      className = _b === void 0 ? '' : _b,
      children = _a.children,
      hoverTooltip = _a.hoverTooltip;

  var _c = React.useState(false),
      showHoverTooltip = _c[0],
      setShowHoverTooltip = _c[1];

  var childrenRef = React.useRef(null);
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-tooltip-wrapper'], false).join(' '),
    onMouseOver: function () {
      setShowHoverTooltip(true);
    },
    onFocus: function () {
      setShowHoverTooltip(true);
    },
    onMouseOut: function () {
      setShowHoverTooltip(false);
    },
    onBlur: function () {
      setShowHoverTooltip(false);
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-tooltip-wrapper__children",
    ref: childrenRef
  }, children), showHoverTooltip && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-tooltip-wrapper__hover-tooltip",
    style: {
      bottom: "calc(100% + ".concat(SPACE_FROM_TRIGGER, "px)")
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-tooltip-wrapper__hover-tooltip__inner"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-tooltip-wrapper__hover-tooltip__inner__tooltip-container",
    style: {
      left: childrenRef.current && "calc(".concat(childrenRef.current.offsetWidth / 2, "px - 50%)")
    }
  }, hoverTooltip))));
}

module.exports = TooltipWrapper;
//# sourceMappingURL=TooltipWrapper.js.map
