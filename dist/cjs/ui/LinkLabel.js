'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropTypes = require('prop-types');
var ui_Label = require('../index-4197d014.js');
require('../stringSet-2dfd148b.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

const http = /https?:\/\//;
function LinkLabel(_ref) {
  let {
    className,
    src,
    type,
    color,
    children
  } = _ref;
  const url = http.test(src) ? src : `http://${src}`;
  return /*#__PURE__*/React__default["default"].createElement("a", {
    className: [...(Array.isArray(className) ? className : [className]), 'sendbird-link-label', color ? ui_Label.changeColorToClassName(color) : ''].join(' '),
    href: url,
    target: "_blank",
    rel: "noopener noreferrer" // for mobile
    ,
    onTouchEnd: e => {
      e.preventDefault();
      e.nativeEvent.stopImmediatePropagation();
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-link-label__label",
    type: type,
    color: color
  }, children));
}
LinkLabel.propTypes = {
  className: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].arrayOf(PropTypes__default["default"].string)]),
  src: PropTypes__default["default"].string.isRequired,
  type: PropTypes__default["default"].string,
  color: PropTypes__default["default"].string,
  children: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].element, PropTypes__default["default"].arrayOf(PropTypes__default["default"].string), PropTypes__default["default"].arrayOf(PropTypes__default["default"].element)]).isRequired
};
LinkLabel.defaultProps = {
  className: '',
  type: '',
  color: ''
};
const LinkLabelTypography = ui_Label.LabelTypography;
const LinkLabelColors = ui_Label.LabelColors;

exports.LinkLabelColors = LinkLabelColors;
exports.LinkLabelTypography = LinkLabelTypography;
exports["default"] = LinkLabel;
//# sourceMappingURL=LinkLabel.js.map
