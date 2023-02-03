'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var stringSet = require('./stringSet-2dfd148b.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

const Typography = {
  H_1: 'H_1',
  H_2: 'H_2',
  SUBTITLE_1: 'SUBTITLE_1',
  SUBTITLE_2: 'SUBTITLE_2',
  BODY_1: 'BODY_1',
  BODY_2: 'BODY_2',
  BUTTON_1: 'BUTTON_1',
  BUTTON_2: 'BUTTON_2',
  CAPTION_1: 'CAPTION_1',
  CAPTION_2: 'CAPTION_2',
  CAPTION_3: 'CAPTION_3'
};
const Colors = {
  ONBACKGROUND_1: 'ONBACKGROUND_1',
  ONBACKGROUND_2: 'ONBACKGROUND_2',
  ONBACKGROUND_3: 'ONBACKGROUND_3',
  ONBACKGROUND_4: 'ONBACKGROUND_4',
  ONCONTENT_1: 'ONCONTENT_1',
  ONCONTENT_2: 'ONCONTENT_2',
  PRIMARY: 'PRIMARY',
  ERROR: 'ERROR',
  SECONDARY_3: 'SECONDARY_3'
};

function changeTypographyToClassName(type) {
  switch (type) {
    case Typography.H_1:
      return 'sendbird-label--h-1';

    case Typography.H_2:
      return 'sendbird-label--h-2';

    case Typography.SUBTITLE_1:
      return 'sendbird-label--subtitle-1';

    case Typography.SUBTITLE_2:
      return 'sendbird-label--subtitle-2';

    case Typography.BODY_1:
      return 'sendbird-label--body-1';

    case Typography.BODY_2:
      return 'sendbird-label--body-2';

    case Typography.BUTTON_1:
      return 'sendbird-label--button-1';

    case Typography.BUTTON_2:
      return 'sendbird-label--button-2';

    case Typography.CAPTION_1:
      return 'sendbird-label--caption-1';

    case Typography.CAPTION_2:
      return 'sendbird-label--caption-2';

    case Typography.CAPTION_3:
      return 'sendbird-label--caption-3';

    default:
      return '';
  }
}
function changeColorToClassName(color) {
  switch (color) {
    case Colors.ONBACKGROUND_1:
      return 'sendbird-label--color-onbackground-1';

    case Colors.ONBACKGROUND_2:
      return 'sendbird-label--color-onbackground-2';

    case Colors.ONBACKGROUND_3:
      return 'sendbird-label--color-onbackground-3';

    case Colors.ONBACKGROUND_4:
      return 'sendbird-label--color-onbackground-4';

    case Colors.ONCONTENT_1:
      return 'sendbird-label--color-oncontent-1';

    case Colors.ONCONTENT_2:
      return 'sendbird-label--color-oncontent-2';

    case Colors.PRIMARY:
      return 'sendbird-label--color-primary';
    // should be Primary-3 fix me

    case Colors.ERROR:
      return 'sendbird-label--color-error';

    case Colors.SECONDARY_3:
      return 'sendbird-label--color-secondary-3';

    default:
      return '';
  }
}

function Label(_ref) {
  let {
    className,
    type,
    color,
    children
  } = _ref;
  return /*#__PURE__*/React__default["default"].createElement("span", {
    className: [...(Array.isArray(className) ? className : [className]), 'sendbird-label', type ? changeTypographyToClassName(type) : '', color ? changeColorToClassName(color) : ''].join(' ')
  }, children);
}
Label.propTypes = {
  className: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].arrayOf(PropTypes__default["default"].string)]),
  type: PropTypes__default["default"].string,
  color: PropTypes__default["default"].string,
  children: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number, PropTypes__default["default"].element, PropTypes__default["default"].any])
};
Label.defaultProps = {
  className: [],
  type: '',
  color: '',
  children: null
};
const LabelTypography = Typography;
const LabelColors = Colors;
const LabelStringSet = stringSet.getStringSet('en');

exports.Label = Label;
exports.LabelColors = LabelColors;
exports.LabelStringSet = LabelStringSet;
exports.LabelTypography = LabelTypography;
exports.changeColorToClassName = changeColorToClassName;
//# sourceMappingURL=index-4197d014.js.map
