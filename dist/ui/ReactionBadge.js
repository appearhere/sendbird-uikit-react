import { a as __spreadArray } from '../tslib.es6-75bd0528.js';
import React__default from 'react';
import { L as Label, a as LabelTypography, b as LabelColors } from '../index-f60cbf08.js';
import 'prop-types';
import '../stringSet-42c0e16e.js';

var ReactionBadge = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
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

  return /*#__PURE__*/React__default.createElement("div", {
    className: __spreadArray(__spreadArray([], Array.isArray(className) ? className : [className], true), ["sendbird-reaction-badge".concat(getClassNameTail())], false).join(' '),
    role: "button",
    ref: ref,
    onClick: onClick,
    onKeyDown: onClick,
    onTouchEnd: onClick,
    tabIndex: 0
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-reaction-badge__inner"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-reaction-badge__inner__icon"
  }, children), /*#__PURE__*/React__default.createElement(Label, {
    className: children && count && 'sendbird-reaction-badge__inner__count',
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_1
  }, count)));
});

export { ReactionBadge as default };
//# sourceMappingURL=ReactionBadge.js.map
