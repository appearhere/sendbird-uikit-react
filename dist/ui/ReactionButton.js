import { a as __spreadArray } from '../tslib.es6-75bd0528.js';
import React__default from 'react';

var ReactionButton = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  var className = props.className,
      width = props.width,
      height = props.height,
      selected = props.selected,
      onClick = props.onClick,
      children = props.children;
  return /*#__PURE__*/React__default.createElement("div", {
    className: __spreadArray(__spreadArray([], Array.isArray(className) ? className : [className], true), ["sendbird-reaction-button".concat(selected ? '--selected' : '')], false).join(' '),
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
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-reaction-button__inner"
  }, children));
});

export { ReactionButton as default };
//# sourceMappingURL=ReactionButton.js.map
