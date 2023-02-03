'use strict';

var tslib_es6 = require('../tslib.es6-d6068b10.js');
var React = require('react');
var ui_Label = require('../index-4197d014.js');
require('prop-types');
require('../stringSet-2dfd148b.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var ReactionBadge = /*#__PURE__*/React__default["default"].forwardRef(function (props, ref) {
  var _a = props.className,
      className = _a === void 0 ? '' : _a,
      children = props.children,
      _b = props.count,
      count = _b === void 0 ? '' : _b,
      _c = props.isAdd,
      isAdd = _c === void 0 ? false : _c,
      _d = props.selected,
      selected = _d === void 0 ? false : _d,
      _e = props.onClick,
      onClick = _e === void 0 ? function () {} : _e;

  var getClassNameTail = function () {
    if (selected && !isAdd) {
      return '--selected';
    }

    if (isAdd) {
      return '--is-add';
    }

    return '';
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], Array.isArray(className) ? className : [className], true), ["sendbird-reaction-badge".concat(getClassNameTail())], false).join(' '),
    role: "button",
    ref: ref,
    onClick: onClick,
    onKeyDown: onClick,
    onTouchEnd: onClick,
    tabIndex: 0
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-reaction-badge__inner"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-reaction-badge__inner__icon"
  }, children), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: children && count && 'sendbird-reaction-badge__inner__count',
    type: ui_Label.LabelTypography.CAPTION_3,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, count)));
});

module.exports = ReactionBadge;
//# sourceMappingURL=ReactionBadge.js.map
