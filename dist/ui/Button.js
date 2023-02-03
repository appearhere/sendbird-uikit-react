import { a as __spreadArray } from '../tslib.es6-75bd0528.js';
import React__default from 'react';
import { L as Label, a as LabelTypography, b as LabelColors } from '../index-f60cbf08.js';
import 'prop-types';
import '../stringSet-42c0e16e.js';

var ButtonTypes$1;

(function (ButtonTypes) {
  ButtonTypes["PRIMARY"] = "PRIMARY";
  ButtonTypes["SECONDARY"] = "SECONDARY";
  ButtonTypes["DANGER"] = "DANGER";
  ButtonTypes["DISABLED"] = "DISABLED";
})(ButtonTypes$1 || (ButtonTypes$1 = {}));

var ButtonSizes$1;

(function (ButtonSizes) {
  ButtonSizes["BIG"] = "BIG";
  ButtonSizes["SMALL"] = "SMALL";
})(ButtonSizes$1 || (ButtonSizes$1 = {}));

function changeTypeToClassName(type) {
  switch (type) {
    case ButtonTypes$1.PRIMARY:
      return 'sendbird-button--primary';

    case ButtonTypes$1.SECONDARY:
      return 'sendbird-button--secondary';

    case ButtonTypes$1.DANGER:
      return 'sendbird-button--danger';

    case ButtonTypes$1.DISABLED:
      return 'sendbird-button--disabled';

    default:
      return null;
  }
}
function changeSizeToClassName(size) {
  switch (size) {
    case ButtonSizes$1.BIG:
      return 'sendbird-button--big';

    case ButtonSizes$1.SMALL:
      return 'sendbird-button--small';

    default:
      return null;
  }
}

var ButtonTypes = ButtonTypes$1;
var ButtonSizes = ButtonSizes$1;
function Button(_a) {
  var className = _a.className,
      _b = _a.type,
      type = _b === void 0 ? ButtonTypes.PRIMARY : _b,
      _c = _a.size,
      size = _c === void 0 ? ButtonSizes.BIG : _c,
      _d = _a.children,
      children = _d === void 0 ? 'Button' : _d,
      _e = _a.disabled,
      disabled = _e === void 0 ? false : _e,
      _f = _a.onClick,
      onClick = _f === void 0 ? function () {} : _f;

  var injectingClassNames = __spreadArray(__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-button', disabled ? 'sendbird-button__disabled' : '', changeTypeToClassName(type), changeSizeToClassName(size)], false).join(' ');

  return /*#__PURE__*/React__default.createElement("button", {
    className: injectingClassNames,
    type: "button",
    onClick: onClick,
    disabled: disabled
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-button__text",
    type: LabelTypography.BUTTON_1,
    color: LabelColors.ONCONTENT_1
  }, children));
}

export { ButtonSizes, ButtonTypes, Button as default };
//# sourceMappingURL=Button.js.map
