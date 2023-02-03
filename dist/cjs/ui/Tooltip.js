'use strict';

var tslib_es6 = require('../tslib.es6-d6068b10.js');
var React = require('react');
var ui_Label = require('../index-4197d014.js');
require('prop-types');
require('../stringSet-2dfd148b.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function Tooltip(_a) {
  var _b = _a.className,
      className = _b === void 0 ? '' : _b,
      _c = _a.children,
      children = _c === void 0 ? '' : _c;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-tooltip'], false).join(' ')
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-tooltip__text",
    type: ui_Label.LabelTypography.CAPTION_2,
    color: ui_Label.LabelColors.ONCONTENT_1
  }, children));
}

module.exports = Tooltip;
//# sourceMappingURL=Tooltip.js.map
