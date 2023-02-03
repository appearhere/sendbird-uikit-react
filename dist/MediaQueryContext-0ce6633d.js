import React__default, { useState, useEffect } from 'react';

var DEFAULT_MOBILE = '0px';
var MOBILE_CLASSNAME = 'sendbird--mobile-mode';
var MediaQueryContext = /*#__PURE__*/React__default.createContext({
  mediaQueryBreakPoint: DEFAULT_MOBILE,
  isMobile: false
});

var addClassNameToBody = function () {
  try {
    var body = document.querySelector('body');
    body.classList.add(MOBILE_CLASSNAME);
  } catch (_a) {// noop
  }
};

var removeClassNameFromBody = function () {
  try {
    var body = document.querySelector('body');
    body.classList.remove(MOBILE_CLASSNAME);
  } catch (_a) {// noop
  }
};

var MediaQueryProvider = function (props) {
  var children = props.children,
      logger = props.logger;
  var mediaQueryBreakPoint = (props === null || props === void 0 ? void 0 : props.mediaQueryBreakPoint) || DEFAULT_MOBILE;

  var _a = useState(false),
      isMobile = _a[0],
      setIsMobile = _a[1];

  useEffect(function () {
    var _a;

    var updateSize = function () {
      var _a, _b, _c, _d, _e;

      if (typeof mediaQueryBreakPoint === 'boolean') {
        setIsMobile(mediaQueryBreakPoint);

        if (mediaQueryBreakPoint) {
          (_a = logger === null || logger === void 0 ? void 0 : logger.info) === null || _a === void 0 ? void 0 : _a.call(logger, "MediaQueryProvider: isMobile: true");
          addClassNameToBody();
        } else {
          (_b = logger === null || logger === void 0 ? void 0 : logger.info) === null || _b === void 0 ? void 0 : _b.call(logger, "MediaQueryProvider: isMobile: false");
          removeClassNameFromBody();
        }
      } else {
        var mq = window.matchMedia("(max-width: ".concat(mediaQueryBreakPoint, ")"));
        (_c = logger === null || logger === void 0 ? void 0 : logger.info) === null || _c === void 0 ? void 0 : _c.call(logger, "MediaQueryProvider: Screensize updated to ".concat(mediaQueryBreakPoint));

        if (mq.matches) {
          setIsMobile(true);
          addClassNameToBody();
          (_d = logger === null || logger === void 0 ? void 0 : logger.info) === null || _d === void 0 ? void 0 : _d.call(logger, "MediaQueryProvider: isMobile: true");
        } else {
          setIsMobile(false);
          removeClassNameFromBody();
          (_e = logger === null || logger === void 0 ? void 0 : logger.info) === null || _e === void 0 ? void 0 : _e.call(logger, "MediaQueryProvider: isMobile: false");
        }
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    (_a = logger === null || logger === void 0 ? void 0 : logger.info) === null || _a === void 0 ? void 0 : _a.call(logger, "MediaQueryProvider: addEventListener", updateSize);
    return function () {
      var _a;

      window.removeEventListener('resize', updateSize);
      (_a = logger === null || logger === void 0 ? void 0 : logger.info) === null || _a === void 0 ? void 0 : _a.call(logger, "MediaQueryProvider: removeEventListener", updateSize);
    };
  }, [mediaQueryBreakPoint]);
  return /*#__PURE__*/React__default.createElement(MediaQueryContext.Provider, {
    value: {
      mediaQueryBreakPoint: mediaQueryBreakPoint,
      isMobile: isMobile
    }
  }, children);
};

var useMediaQueryContext = function () {
  return React__default.useContext(MediaQueryContext);
};

export { MediaQueryProvider as M, useMediaQueryContext as u };
//# sourceMappingURL=MediaQueryContext-0ce6633d.js.map
