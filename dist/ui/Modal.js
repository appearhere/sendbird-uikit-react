import React__default, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { M as MODAL_ROOT } from '../index-5ab5d8fe.js';
import { a as LocalizationContext } from '../LocalizationContext-e5f35d14.js';
import Button, { ButtonTypes } from './Button.js';
import Icon, { IconTypes, IconColors } from './Icon.js';
import IconButton from './IconButton.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../index-f60cbf08.js';
import { u as useMediaQueryContext } from '../MediaQueryContext-0ce6633d.js';
import '../stringSet-42c0e16e.js';
import '../index-5dcd7e0f.js';
import '../tslib.es6-75bd0528.js';
import 'prop-types';

var ModalHeader = function (_a) {
  var titleText = _a.titleText;
  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-modal__header"
  }, /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.H_1,
    color: LabelColors.ONBACKGROUND_1
  }, titleText));
};
var ModalBody = function (_a) {
  var children = _a.children;
  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-modal__body"
  }, /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.SUBTITLE_1,
    color: LabelColors.ONBACKGROUND_2
  }, children));
};
var ModalFooter = function (_a) {
  var submitText = _a.submitText,
      _b = _a.disabled,
      disabled = _b === void 0 ? false : _b,
      _c = _a.type,
      type = _c === void 0 ? ButtonTypes.DANGER : _c,
      onSubmit = _a.onSubmit,
      onCancel = _a.onCancel;
  var stringSet = useContext(LocalizationContext).stringSet;
  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-modal__footer"
  }, /*#__PURE__*/React__default.createElement(Button, {
    type: ButtonTypes.SECONDARY,
    onClick: onCancel
  }, /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.BUTTON_1,
    color: LabelColors.ONBACKGROUND_1
  }, stringSet.BUTTON__CANCEL)), /*#__PURE__*/React__default.createElement(Button, {
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
      type = _g === void 0 ? ButtonTypes.DANGER : _g,
      _h = props.onCancel,
      onCancel = _h === void 0 ? function () {} : _h,
      _j = props.onSubmit,
      onSubmit = _j === void 0 ? function () {} : _j,
      renderHeader = props.renderHeader;
  var isMobile = useMediaQueryContext().isMobile;
  return /*#__PURE__*/createPortal( /*#__PURE__*/React__default.createElement("div", {
    className: "\n      sendbird-modal ".concat(className, "\n      ").concat(isFullScreenOnMobile && isMobile ? 'sendbird-modal--full-mobile' : '', "\n    ")
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-modal__content"
  }, (renderHeader === null || renderHeader === void 0 ? void 0 : renderHeader()) || /*#__PURE__*/React__default.createElement(ModalHeader, {
    titleText: titleText
  }), /*#__PURE__*/React__default.createElement(ModalBody, null, children), !hideFooter && /*#__PURE__*/React__default.createElement(ModalFooter, {
    disabled: disabled,
    onCancel: onCancel,
    onSubmit: onSubmit,
    submitText: submitText,
    type: type
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-modal__close"
  }, /*#__PURE__*/React__default.createElement(IconButton, {
    width: "32px",
    height: "32px",
    onClick: onCancel
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.CLOSE,
    fillColor: IconColors.DEFAULT,
    width: "24px",
    height: "24px"
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: "\n          sendbird-modal__backdrop\n          ".concat(isCloseOnClickOutside && 'sendbird-modal__backdrop--clickoutside', "\n        "),
    onClick: function (e) {
      e === null || e === void 0 ? void 0 : e.stopPropagation();

      if (isCloseOnClickOutside) {
        onCancel();
      }
    }
  })), document.getElementById(MODAL_ROOT));
}

export { ModalBody, ModalFooter, ModalHeader, Modal as default };
//# sourceMappingURL=Modal.js.map
