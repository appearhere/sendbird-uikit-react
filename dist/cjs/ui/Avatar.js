'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../tslib.es6-d6068b10.js');
var React = require('react');
var ui_ImageRenderer = require('./ImageRenderer.js');
var ui_Icon = require('./Icon.js');
var uuid = require('../uuid-2f4916c1.js');
require('prop-types');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var pxToNumber = (function (px) {
  if (typeof px === 'number') {
    return px;
  }

  if (typeof px === 'string') {
    var parsed = Number.parseFloat(px);

    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }

  return null;
});

var imageRendererClassName = 'sendbird-avatar-img';

var DefaultComponent = function (_a) {
  var width = _a.width,
      height = _a.height;
  var iconWidth = pxToNumber(width);
  var iconHeight = pxToNumber(height);

  if (typeof iconWidth === 'number') {
    iconWidth *= 0.575;
  }

  if (typeof iconHeight === 'number') {
    iconHeight *= 0.575;
  }

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-avatar-img--default",
    style: {
      width: width,
      height: height
    }
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.USER,
    fillColor: ui_Icon.IconColors.CONTENT,
    width: iconWidth,
    height: iconHeight
  }));
};

var _defaultComponent = function (_a) {
  var width = _a.width,
      height = _a.height;
  return /*#__PURE__*/React__default["default"].createElement(DefaultComponent, {
    width: width,
    height: height
  });
};

var AvatarInner = function (_a) {
  var _b = _a.src,
      src = _b === void 0 ? '' : _b,
      _c = _a.alt,
      alt = _c === void 0 ? '' : _c,
      height = _a.height,
      width = _a.width,
      customDefaultComponent = _a.customDefaultComponent;

  var defaultComponent = function () {
    return customDefaultComponent ? customDefaultComponent({
      width: width,
      height: height
    }) : _defaultComponent({
      width: width,
      height: height
    });
  };

  if (typeof src === 'string') {
    return /*#__PURE__*/React__default["default"].createElement(ui_ImageRenderer, {
      className: imageRendererClassName,
      url: src,
      height: height,
      width: width,
      alt: alt,
      defaultComponent: defaultComponent
    });
  }

  if (src && src.length) {
    if (src.length === 1) {
      return /*#__PURE__*/React__default["default"].createElement(ui_ImageRenderer, {
        className: imageRendererClassName,
        url: src[0],
        height: height,
        width: width,
        alt: alt,
        defaultComponent: defaultComponent
      });
    }

    if (src.length === 2) {
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "sendbird-avatar--inner__two-child"
      }, /*#__PURE__*/React__default["default"].createElement(ui_ImageRenderer, {
        className: imageRendererClassName,
        url: src[0],
        height: height,
        width: width,
        alt: alt,
        defaultComponent: defaultComponent
      }), /*#__PURE__*/React__default["default"].createElement(ui_ImageRenderer, {
        className: imageRendererClassName,
        url: src[1],
        height: height,
        width: width,
        alt: alt,
        defaultComponent: defaultComponent
      }));
    }

    if (src.length === 3) {
      return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("div", {
        className: "sendbird-avatar--inner__three-child--upper"
      }, /*#__PURE__*/React__default["default"].createElement(ui_ImageRenderer, {
        className: imageRendererClassName,
        url: src[0],
        height: height,
        width: width,
        alt: alt,
        defaultComponent: defaultComponent
      })), /*#__PURE__*/React__default["default"].createElement("div", {
        className: "sendbird-avatar--inner__three-child--lower"
      }, /*#__PURE__*/React__default["default"].createElement(ui_ImageRenderer, {
        className: imageRendererClassName,
        url: src[1],
        height: height,
        width: width,
        alt: alt,
        defaultComponent: defaultComponent
      }), /*#__PURE__*/React__default["default"].createElement(ui_ImageRenderer, {
        className: imageRendererClassName,
        url: src[2],
        height: height,
        width: width,
        alt: alt,
        defaultComponent: defaultComponent
      })));
    }

    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "sendbird-avatar--inner__four-child"
    }, src.slice(0, 4).map(function (i) {
      return /*#__PURE__*/React__default["default"].createElement(ui_ImageRenderer, {
        className: imageRendererClassName,
        url: i,
        height: height,
        width: width,
        alt: alt,
        key: uuid.uuidv4(),
        defaultComponent: defaultComponent
      });
    }));
  } // default img


  return /*#__PURE__*/React__default["default"].createElement(ui_ImageRenderer, {
    className: imageRendererClassName,
    url: "",
    height: height,
    width: width,
    alt: alt,
    defaultComponent: defaultComponent
  });
};

function Avatar(_a, ref) {
  var _b = _a.className,
      className = _b === void 0 ? '' : _b,
      _c = _a.src,
      src = _c === void 0 ? '' : _c,
      _d = _a.alt,
      alt = _d === void 0 ? '' : _d,
      _e = _a.width,
      width = _e === void 0 ? '56px' : _e,
      _f = _a.height,
      height = _f === void 0 ? '56px' : _f,
      onClick = _a.onClick,
      customDefaultComponent = _a.customDefaultComponent;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-avatar'], false).join(' '),
    role: "button",
    ref: ref,
    style: {
      height: height,
      width: width
    },
    onClick: onClick,
    onKeyDown: onClick,
    tabIndex: 0
  }, /*#__PURE__*/React__default["default"].createElement(AvatarInner, {
    src: src,
    width: width,
    height: height,
    alt: alt,
    customDefaultComponent: customDefaultComponent
  }));
}

var Avatar$1 = /*#__PURE__*/React__default["default"].forwardRef(Avatar);

exports.AvatarInner = AvatarInner;
exports["default"] = Avatar$1;
//# sourceMappingURL=Avatar.js.map
