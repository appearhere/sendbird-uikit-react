import React__default from 'react';
import PropTypes from 'prop-types';
import { d as changeColorToClassName, L as Label, a as LabelTypography, b as LabelColors } from '../index-f60cbf08.js';
import '../stringSet-42c0e16e.js';

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
  return /*#__PURE__*/React__default.createElement("a", {
    className: [...(Array.isArray(className) ? className : [className]), 'sendbird-link-label', color ? changeColorToClassName(color) : ''].join(' '),
    href: url,
    target: "_blank",
    rel: "noopener noreferrer" // for mobile
    ,
    onTouchEnd: e => {
      e.preventDefault();
      e.nativeEvent.stopImmediatePropagation();
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-link-label__label",
    type: type,
    color: color
  }, children));
}
LinkLabel.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  src: PropTypes.string.isRequired,
  type: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.element)]).isRequired
};
LinkLabel.defaultProps = {
  className: '',
  type: '',
  color: ''
};
const LinkLabelTypography = LabelTypography;
const LinkLabelColors = LabelColors;

export { LinkLabelColors, LinkLabelTypography, LinkLabel as default };
//# sourceMappingURL=LinkLabel.js.map
