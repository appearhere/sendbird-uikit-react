import { a as __spreadArray } from '../tslib.es6-75bd0528.js';
import React__default, { useState, useMemo } from 'react';

var ImageRenderer = function (_a) {
  var _b = _a.className,
      className = _b === void 0 ? '' : _b,
      url = _a.url,
      _c = _a.alt,
      alt = _c === void 0 ? '' : _c,
      _d = _a.width,
      width = _d === void 0 ? null : _d,
      _e = _a.height,
      height = _e === void 0 ? null : _e,
      _f = _a.circle,
      circle = _f === void 0 ? false : _f,
      _g = _a.fixedSize,
      fixedSize = _g === void 0 ? false : _g,
      _h = _a.placeHolder,
      placeHolder = _h === void 0 ? null : _h,
      _j = _a.defaultComponent,
      defaultComponent = _j === void 0 ? null : _j,
      _k = _a.onLoad,
      onLoad = _k === void 0 ? function () {} : _k,
      _l = _a.onError,
      onError = _l === void 0 ? function () {} : _l;

  var _m = useState(false),
      showDefaultComponent = _m[0],
      setShowDefaultComponent = _m[1];

  var _o = useState(true),
      showPlaceHolder = _o[0],
      setShowPlaceHolder = _o[1];

  var DefaultComponent = useMemo(function () {
    return typeof defaultComponent === 'function' ? defaultComponent() : defaultComponent;
  }, [defaultComponent]);
  var PlaceHolder = useMemo(function () {
    return placeHolder && typeof placeHolder === 'function' ? placeHolder({
      style: {
        width: '100%',
        minWidth: width,
        maxWidth: fixedSize ? width : '400px',
        height: height,
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }) : null;
  }, [placeHolder]);
  var HiddenImageLoader = useMemo(function () {
    setShowDefaultComponent(false); // reset the state when url is changed

    return /*#__PURE__*/React__default.createElement("img", {
      className: "sendbird-image-renderer__hidden-image-loader",
      src: url,
      alt: alt,
      onLoad: function () {
        setShowPlaceHolder(false);
        onLoad();
      },
      onError: function () {
        setShowDefaultComponent(true);
        onError();
      }
    });
  }, [url]);
  return /*#__PURE__*/React__default.createElement("div", {
    className: __spreadArray(__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-image-renderer'], false).join(' '),
    style: {
      width: '100%',
      minWidth: width,
      maxWidth: fixedSize ? width : '400px',
      height: height
    }
  }, showPlaceHolder && PlaceHolder, showDefaultComponent ? DefaultComponent : /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-image-renderer__image",
    style: {
      width: '100%',
      minWidth: width,
      maxWidth: fixedSize ? width : '400px',
      height: height,
      position: 'absolute',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundImage: "url(".concat(url, ")"),
      borderRadius: circle ? '50%' : null
    }
  }), HiddenImageLoader);
};

export { ImageRenderer as default };
//# sourceMappingURL=ImageRenderer.js.map
