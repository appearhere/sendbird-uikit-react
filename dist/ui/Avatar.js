import { a as __spreadArray } from '../tslib.es6-75bd0528.js';
import React__default from 'react';
import ImageRenderer from './ImageRenderer.js';
import Icon, { IconTypes, IconColors } from './Icon.js';
import { u as uuidv4 } from '../uuid-392016d0.js';
import 'prop-types';

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

  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-avatar-img--default",
    style: {
      width: width,
      height: height
    }
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.USER,
    fillColor: IconColors.CONTENT,
    width: iconWidth,
    height: iconHeight
  }));
};

var _defaultComponent = function (_a) {
  var width = _a.width,
      height = _a.height;
  return /*#__PURE__*/React__default.createElement(DefaultComponent, {
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
    return /*#__PURE__*/React__default.createElement(ImageRenderer, {
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
      return /*#__PURE__*/React__default.createElement(ImageRenderer, {
        className: imageRendererClassName,
        url: src[0],
        height: height,
        width: width,
        alt: alt,
        defaultComponent: defaultComponent
      });
    }

    if (src.length === 2) {
      return /*#__PURE__*/React__default.createElement("div", {
        className: "sendbird-avatar--inner__two-child"
      }, /*#__PURE__*/React__default.createElement(ImageRenderer, {
        className: imageRendererClassName,
        url: src[0],
        height: height,
        width: width,
        alt: alt,
        defaultComponent: defaultComponent
      }), /*#__PURE__*/React__default.createElement(ImageRenderer, {
        className: imageRendererClassName,
        url: src[1],
        height: height,
        width: width,
        alt: alt,
        defaultComponent: defaultComponent
      }));
    }

    if (src.length === 3) {
      return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
        className: "sendbird-avatar--inner__three-child--upper"
      }, /*#__PURE__*/React__default.createElement(ImageRenderer, {
        className: imageRendererClassName,
        url: src[0],
        height: height,
        width: width,
        alt: alt,
        defaultComponent: defaultComponent
      })), /*#__PURE__*/React__default.createElement("div", {
        className: "sendbird-avatar--inner__three-child--lower"
      }, /*#__PURE__*/React__default.createElement(ImageRenderer, {
        className: imageRendererClassName,
        url: src[1],
        height: height,
        width: width,
        alt: alt,
        defaultComponent: defaultComponent
      }), /*#__PURE__*/React__default.createElement(ImageRenderer, {
        className: imageRendererClassName,
        url: src[2],
        height: height,
        width: width,
        alt: alt,
        defaultComponent: defaultComponent
      })));
    }

    return /*#__PURE__*/React__default.createElement("div", {
      className: "sendbird-avatar--inner__four-child"
    }, src.slice(0, 4).map(function (i) {
      return /*#__PURE__*/React__default.createElement(ImageRenderer, {
        className: imageRendererClassName,
        url: i,
        height: height,
        width: width,
        alt: alt,
        key: uuidv4(),
        defaultComponent: defaultComponent
      });
    }));
  } // default img


  return /*#__PURE__*/React__default.createElement(ImageRenderer, {
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
  return /*#__PURE__*/React__default.createElement("div", {
    className: __spreadArray(__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-avatar'], false).join(' '),
    role: "button",
    ref: ref,
    style: {
      height: height,
      width: width
    },
    onClick: onClick,
    onKeyDown: onClick,
    tabIndex: 0
  }, /*#__PURE__*/React__default.createElement(AvatarInner, {
    src: src,
    width: width,
    height: height,
    alt: alt,
    customDefaultComponent: customDefaultComponent
  }));
}

var Avatar$1 = /*#__PURE__*/React__default.forwardRef(Avatar);

export { AvatarInner, Avatar$1 as default };
//# sourceMappingURL=Avatar.js.map
