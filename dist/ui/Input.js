import React__default, { useState } from 'react';
import { L as Label, a as LabelTypography, b as LabelColors } from '../index-f60cbf08.js';
import 'prop-types';
import '../stringSet-42c0e16e.js';

var InputLabel = function (_a) {
  var children = _a.children;
  return /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-input-label",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_1
  }, children);
};
var Input = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  var name = props.name,
      required = props.required,
      disabled = props.disabled,
      value = props.value,
      placeHolder = props.placeHolder;

  var _a = useState(value),
      inputValue = _a[0],
      setInputValue = _a[1];

  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-input"
  }, /*#__PURE__*/React__default.createElement("input", {
    className: "sendbird-input__input",
    ref: ref,
    name: name,
    required: required,
    disabled: disabled,
    value: inputValue,
    onChange: function (e) {
      setInputValue(e.target.value);
    }
  }), placeHolder && !inputValue && /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-input__placeholder",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_3
  }, placeHolder));
});

export { InputLabel, Input as default };
//# sourceMappingURL=Input.js.map
