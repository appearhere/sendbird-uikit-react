'use strict';

var tslib_es6 = require('../tslib.es6-d6068b10.js');
var React = require('react');
var ui_Label = require('../index-4197d014.js');
var LocalizationContext = require('../LocalizationContext-f4281153.js');
require('prop-types');
require('../stringSet-2dfd148b.js');
require('../index-d4bc012c.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function Badge(_a) {
  var count = _a.count,
      _b = _a.maxLevel,
      maxLevel = _b === void 0 ? 2 : _b,
      _c = _a.className,
      className = _c === void 0 ? '' : _c;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  var maximumNumber = parseInt('9'.repeat(maxLevel > 6 ? 6 : maxLevel), 10);
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-badge'], false).join(' ')
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-badge__text"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.CAPTION_2,
    color: ui_Label.LabelColors.ONCONTENT_1
  }, count > maximumNumber ? "".concat(maximumNumber).concat(stringSet.BADGE__OVER) : count)));
}

module.exports = Badge;
//# sourceMappingURL=Badge.js.map
