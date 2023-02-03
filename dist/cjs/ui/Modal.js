'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactDom = require('react-dom');
var index = require('../index-1b132096.js');
var LocalizationContext = require('../LocalizationContext-f4281153.js');
var ui_Button = require('./Button.js');
var ui_Icon = require('./Icon.js');
var ui_IconButton = require('./IconButton.js');
var ui_Label = require('../index-4197d014.js');
var MediaQueryContext = require('../MediaQueryContext-9a5566fc.js');
require('../stringSet-2dfd148b.js');
require('../index-d4bc012c.js');
require('../tslib.es6-d6068b10.js');
require('prop-types');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var ModalHeader = function (_a) {
  var titleText = _a.titleText;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-modal__header"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.H_1,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, titleText));
};
var ModalBody = function (_a) {
  var children = _a.children;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-modal__body"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.SUBTITLE_1,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, children));
};
var ModalFooter = function (_a) {
  var submitText = _a.submitText,
      _b = _a.disabled,
      disabled = _b === void 0 ? false : _b,
      _c = _a.type,
      type = _c === void 0 ? ui_Button.ButtonTypes.DANGER : _c,
      onSubmit = _a.onSubmit,
      onCancel = _a.onCancel;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-modal__footer"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Button["default"], {
    type: ui_Button.ButtonTypes.SECONDARY,
    onClick: onCancel
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.BUTTON_1,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, stringSet.BUTTON__CANCEL)), /*#__PURE__*/React__default["default"].createElement(ui_Button["default"], {
    type: type,
    disabled: disabled,
    onClick: onSubmit
  }, submitText));
};
function Modal(props) {
  var _a = props.children,
      children = _a === void 0 ? null : _a,
      _b = props.className,
      className = _b === void 0 ? '' : _b,
      _c = props.isCloseOnClickOutside,
      isCloseOnClickOutside = _c === void 0 ? false : _c,
      _d = props.isFullScreenOnMobile,
      isFullScreenOnMobile = _d === void 0 ? false : _d,
      titleText = props.titleText,
      submitText = props.submitText,
      _e = props.disabled,
      disabled = _e === void 0 ? false : _e,
      _f = props.hideFooter,
      hideFooter = _f === void 0 ? false : _f,
      _g = props.type,
      type = _g === void 0 ? ui_Button.ButtonTypes.DANGER : _g,
      _h = props.onCancel,
      onCancel = _h === void 0 ? function () {} : _h,
      _j = props.onSubmit,
      onSubmit = _j === void 0 ? function () {} : _j,
      renderHeader = props.renderHeader;
  var isMobile = MediaQueryContext.useMediaQueryContext().isMobile;
  return /*#__PURE__*/reactDom.createPortal( /*#__PURE__*/React__default["default"].createElement("div", {
    className: "\n      sendbird-modal ".concat(className, "\n      ").concat(isFullScreenOnMobile && isMobile ? 'sendbird-modal--full-mobile' : '', "\n    ")
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-modal__content"
  }, (renderHeader === null || renderHeader === void 0 ? void 0 : renderHeader()) || /*#__PURE__*/React__default["default"].createElement(ModalHeader, {
    titleText: titleText
  }), /*#__PURE__*/React__default["default"].createElement(ModalBody, null, children), !hideFooter && /*#__PURE__*/React__default["default"].createElement(ModalFooter, {
    disabled: disabled,
    onCancel: onCancel,
    onSubmit: onSubmit,
    submitText: submitText,
    type: type
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-modal__close"
  }, /*#__PURE__*/React__default["default"].createElement(ui_IconButton, {
    width: "32px",
    height: "32px",
    onClick: onCancel
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.CLOSE,
    fillColor: ui_Icon.IconColors.DEFAULT,
    width: "24px",
    height: "24px"
  })))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "\n          sendbird-modal__backdrop\n          ".concat(isCloseOnClickOutside && 'sendbird-modal__backdrop--clickoutside', "\n        "),
    onClick: function (e) {
      e === null || e === void 0 ? void 0 : e.stopPropagation();

      if (isCloseOnClickOutside) {
        onCancel();
      }
    }
  })), document.getElementById(index.MODAL_ROOT));
}

exports.ModalBody = ModalBody;
exports.ModalFooter = ModalFooter;
exports.ModalHeader = ModalHeader;
exports["default"] = Modal;
//# sourceMappingURL=Modal.js.map
