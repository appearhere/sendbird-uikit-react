'use strict';

var React = require('react');
var reactDom = require('react-dom');
var index = require('../index-1b132096.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var BottomSheet = function (props) {
  var _a = props.className,
      className = _a === void 0 ? '' : _a,
      children = props.children,
      onBackdropClick = props.onBackdropClick; // https://github.com/testing-library/react-testing-library/issues/62#issuecomment-438653348

  var portalRoot = React.useRef();
  portalRoot.current = document.getElementById(index.MODAL_ROOT);

  if (!portalRoot.current) {
    portalRoot.current = document.createElement('div');
    portalRoot.current.setAttribute('id', index.MODAL_ROOT);
    document.body.appendChild(portalRoot.current);
  }

  return /*#__PURE__*/reactDom.createPortal( /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(className, " sendbird-bottomsheet")
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: 'sendbird-bottomsheet__content',
    role: "dialog",
    "aria-modal": "true",
    "aria-expanded": "true"
  }, children), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "\n          sendbird-bottomsheet__backdrop\n        ",
    onClick: function (e) {
      e === null || e === void 0 ? void 0 : e.stopPropagation();
      onBackdropClick();
    }
  })), portalRoot.current);
};

module.exports = BottomSheet;
//# sourceMappingURL=BottomSheet.js.map
