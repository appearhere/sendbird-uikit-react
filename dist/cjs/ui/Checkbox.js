'use strict';

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function Checkbox(_a) {
  var id = _a.id,
      checked = _a.checked,
      disabled = _a.disabled,
      onChange = _a.onChange;

  var _b = React.useState(checked),
      isChecked = _b[0],
      setIsCheck = _b[1];

  return /*#__PURE__*/React__default["default"].createElement("label", {
    className: ["sendbird-checkbox", disabled ? 'disabled' : ''].join(' '),
    htmlFor: id
  }, /*#__PURE__*/React__default["default"].createElement("input", {
    disabled: disabled,
    id: id,
    type: "checkbox",
    checked: isChecked,
    onClick: function () {
      if (!disabled) setIsCheck(!isChecked);
    },
    onChange: onChange
  }), /*#__PURE__*/React__default["default"].createElement("span", {
    className: ["sendbird-checkbox--checkmark", disabled ? 'disabled' : ''].join(' ')
  }));
}

module.exports = Checkbox;
//# sourceMappingURL=Checkbox.js.map
