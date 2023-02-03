'use strict';

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function MentionUserLabel(_a) {
  var _b = _a.className,
      className = _b === void 0 ? '' : _b,
      children = _a.children,
      _c = _a.isReverse,
      isReverse = _c === void 0 ? false : _c,
      color = _a.color,
      userId = _a.userId;
  return /*#__PURE__*/React__default["default"].createElement("span", {
    className: "sendbird-mention-user-label ".concat(className, " ").concat(isReverse ? 'reverse' : '', " ").concat(color),
    contentEditable: false,
    "data-userid": userId
  }, children);
}

module.exports = MentionUserLabel;
//# sourceMappingURL=MentionUserLabel.js.map
