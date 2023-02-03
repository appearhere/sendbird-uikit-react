import React__default, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { M as MODAL_ROOT } from '../index-5ab5d8fe.js';

var BottomSheet = function (props) {
  var _a = props.className,
      className = _a === void 0 ? '' : _a,
      children = props.children,
      onBackdropClick = props.onBackdropClick; // https://github.com/testing-library/react-testing-library/issues/62#issuecomment-438653348

  var portalRoot = useRef();
  portalRoot.current = document.getElementById(MODAL_ROOT);

  if (!portalRoot.current) {
    portalRoot.current = document.createElement('div');
    portalRoot.current.setAttribute('id', MODAL_ROOT);
    document.body.appendChild(portalRoot.current);
  }

  return /*#__PURE__*/createPortal( /*#__PURE__*/React__default.createElement("div", {
    className: "".concat(className, " sendbird-bottomsheet")
  }, /*#__PURE__*/React__default.createElement("div", {
    className: 'sendbird-bottomsheet__content',
    role: "dialog",
    "aria-modal": "true",
    "aria-expanded": "true"
  }, children), /*#__PURE__*/React__default.createElement("div", {
    className: "\n          sendbird-bottomsheet__backdrop\n        ",
    onClick: function (e) {
      e === null || e === void 0 ? void 0 : e.stopPropagation();
      onBackdropClick();
    }
  })), portalRoot.current);
};

export { BottomSheet as default };
//# sourceMappingURL=BottomSheet.js.map
