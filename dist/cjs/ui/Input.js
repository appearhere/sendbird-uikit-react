'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var ui_Label = require('../index-4197d014.js');
require('prop-types');
require('../stringSet-2dfd148b.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var InputLabel = function (_a) {
  var children = _a.children;
  return /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-input-label",
    type: ui_Label.LabelTypography.CAPTION_3,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, children);
};
var Input = /*#__PURE__*/React__default["default"].forwardRef(function (props, ref) {
  var name = props.name,
      required = props.required,
      disabled = props.disabled,
      value = props.value,
      placeHolder = props.placeHolder;

  var _a = React.useState(value),
      inputValue = _a[0],
      setInputValue = _a[1];

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-input"
  }, /*#__PURE__*/React__default["default"].createElement("input", {
    className: "sendbird-input__input",
    ref: ref,
    name: name,
    required: required,
    disabled: disabled,
    value: inputValue,
    onChange: function (e) {
      setInputValue(e.target.value);
    }
  }), placeHolder && !inputValue && /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-input__placeholder",
    type: ui_Label.LabelTypography.BODY_1,
    color: ui_Label.LabelColors.ONBACKGROUND_3
  }, placeHolder));
});

exports.InputLabel = InputLabel;
exports["default"] = Input;
//# sourceMappingURL=Input.js.map
