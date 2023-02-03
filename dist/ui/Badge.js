import { a as __spreadArray } from '../tslib.es6-75bd0528.js';
import React__default, { useContext } from 'react';
import { L as Label, a as LabelTypography, b as LabelColors } from '../index-f60cbf08.js';
import { a as LocalizationContext } from '../LocalizationContext-e5f35d14.js';
import 'prop-types';
import '../stringSet-42c0e16e.js';
import '../index-5dcd7e0f.js';

function Badge(_a) {
  var count = _a.count,
      _b = _a.maxLevel,
      maxLevel = _b === void 0 ? 2 : _b,
      _c = _a.className,
      className = _c === void 0 ? '' : _c;
  var stringSet = useContext(LocalizationContext).stringSet;
  var maximumNumber = parseInt('9'.repeat(maxLevel > 6 ? 6 : maxLevel), 10);
  return /*#__PURE__*/React__default.createElement("div", {
    className: __spreadArray(__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-badge'], false).join(' ')
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-badge__text"
  }, /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONCONTENT_1
  }, count > maximumNumber ? "".concat(maximumNumber).concat(stringSet.BADGE__OVER) : count)));
}

export { Badge as default };
//# sourceMappingURL=Badge.js.map
