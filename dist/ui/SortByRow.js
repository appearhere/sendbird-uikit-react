import { a as __spreadArray } from '../tslib.es6-75bd0528.js';
import React__default from 'react';
import { u as uuidv4 } from '../uuid-392016d0.js';

var componentClassName = 'sendbird-sort-by-row';
function SortByRow(_a) {
  var _b = _a.className,
      className = _b === void 0 ? '' : _b,
      maxItemCount = _a.maxItemCount,
      itemWidth = _a.itemWidth,
      itemHeight = _a.itemHeight,
      children = _a.children;

  if (Array.isArray(children) && children.length > maxItemCount) {
    var result = [];

    for (var i = 0; i < children.length; i += maxItemCount) {
      result.push( /*#__PURE__*/React__default.createElement("div", {
        className: __spreadArray(__spreadArray([], Array.isArray(className) ? className : [className], true), [componentClassName], false).join(' '),
        key: uuidv4(),
        style: {
          width: itemWidth * maxItemCount,
          height: itemHeight
        }
      }, children.slice(i, i + maxItemCount)));
    }

    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, result);
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: __spreadArray(__spreadArray([], Array.isArray(className) ? className : [className], true), [componentClassName], false).join(' '),
    style: {
      width: itemWidth * (Array.isArray(children) ? children.length : 1),
      height: itemHeight
    }
  }, children);
}

export { SortByRow as default };
//# sourceMappingURL=SortByRow.js.map
