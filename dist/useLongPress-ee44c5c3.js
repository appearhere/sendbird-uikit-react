import { _ as __assign } from './tslib.es6-75bd0528.js';
import { useState, useRef, useCallback } from 'react';
import { u as useMediaQueryContext } from './MediaQueryContext-0ce6633d.js';

var DEFAULT_DURATION = 300;

function preventDefault(e) {
  if (!isTouchEvent(e)) {
    return;
  }

  if (e.touches.length < 2 && e.preventDefault) {
    e.preventDefault();
  }
}

function isTouchEvent(e) {
  return e && 'touches' in e;
}
function useLongPress(_a, _b) {
  var onLongPress = _a.onLongPress,
      onClick = _a.onClick;

  var _c = _b === void 0 ? {} : _b,
      _d = _c.delay,
      delay = _d === void 0 ? DEFAULT_DURATION : _d,
      _e = _c.shouldPreventDefault,
      shouldPreventDefault = _e === void 0 ? true : _e;

  var isMobile = useMediaQueryContext().isMobile;

  var _f = useState(false),
      longPressTriggered = _f[0],
      setLongPressTriggered = _f[1];

  var _g = useState(false),
      dragTriggered = _g[0],
      setDragTriggered = _g[1]; // https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype


  var timeout = useRef();
  var target = useRef();
  var start = useCallback(function (e) {
    e.persist();

    var clonedEvent = __assign({}, e);

    setDragTriggered(false);

    if (shouldPreventDefault && e.target) {
      e.target.addEventListener('touchend', preventDefault, {
        passive: false
      });
      target.current = e.target;
    }

    timeout.current = setTimeout(function () {
      onLongPress(clonedEvent);
      setLongPressTriggered(true);
    }, delay);
  }, [onLongPress, delay, shouldPreventDefault, isMobile]);
  var clear = useCallback(function (e, shouldTriggerClick, onDrag) {
    if (shouldTriggerClick === void 0) {
      shouldTriggerClick = true;
    }

    if (onDrag === void 0) {
      onDrag = false;
    }

    if (onDrag) {
      setDragTriggered(true);
    } else {
      setDragTriggered(false);
    }

    if (timeout === null || timeout === void 0 ? void 0 : timeout.current) {
      clearTimeout(timeout.current);
    }

    if (shouldTriggerClick && !longPressTriggered && !dragTriggered) {
      onClick === null || onClick === void 0 ? void 0 : onClick(e);
    }

    setLongPressTriggered(false);

    if (shouldPreventDefault && target.current) {
      target.current.removeEventListener('touchend', preventDefault);
    }
  }, [shouldPreventDefault, onClick, longPressTriggered, dragTriggered]);
  return {
    onMouseDown: function (e) {
      return start(e);
    },
    onMouseUp: function (e) {
      return clear(e);
    },
    onMouseLeave: function (e) {
      return clear(e, false);
    },
    onTouchStart: function (e) {
      return start(e);
    },
    // setDragTriggered as true on touchmove, so that next onTouchEnd is ignored
    // if we dont do it, onClick?.(e) will be triggred, see inside clear()
    onTouchMove: function (e) {
      return clear(e, false, true);
    },
    onTouchEnd: function (e) {
      return clear(e);
    }
  };
}

export { useLongPress as u };
//# sourceMappingURL=useLongPress-ee44c5c3.js.map
