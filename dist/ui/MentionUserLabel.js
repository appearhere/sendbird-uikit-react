import React__default from 'react';

function MentionUserLabel(_a) {
  var _b = _a.className,
      className = _b === void 0 ? '' : _b,
      children = _a.children,
      _c = _a.isReverse,
      isReverse = _c === void 0 ? false : _c,
      color = _a.color,
      userId = _a.userId;
  return /*#__PURE__*/React__default.createElement("span", {
    className: "sendbird-mention-user-label ".concat(className, " ").concat(isReverse ? 'reverse' : '', " ").concat(color),
    contentEditable: false,
    "data-userid": userId
  }, children);
}

export { MentionUserLabel as default };
//# sourceMappingURL=MentionUserLabel.js.map
