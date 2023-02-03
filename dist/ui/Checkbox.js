import React__default, { useState } from 'react';

function Checkbox(_a) {
  var id = _a.id,
      checked = _a.checked,
      disabled = _a.disabled,
      onChange = _a.onChange;

  var _b = useState(checked),
      isChecked = _b[0],
      setIsCheck = _b[1];

  return /*#__PURE__*/React__default.createElement("label", {
    className: ["sendbird-checkbox", disabled ? 'disabled' : ''].join(' '),
    htmlFor: id
  }, /*#__PURE__*/React__default.createElement("input", {
    disabled: disabled,
    id: id,
    type: "checkbox",
    checked: isChecked,
    onClick: function () {
      if (!disabled) setIsCheck(!isChecked);
    },
    onChange: onChange
  }), /*#__PURE__*/React__default.createElement("span", {
    className: ["sendbird-checkbox--checkmark", disabled ? 'disabled' : ''].join(' ')
  }));
}

export { Checkbox as default };
//# sourceMappingURL=Checkbox.js.map
