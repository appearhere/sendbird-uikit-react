'use strict';

var tslib_es6 = require('../tslib.es6-d6068b10.js');
var React = require('react');
var uuid = require('../uuid-2f4916c1.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
      result.push( /*#__PURE__*/React__default["default"].createElement("div", {
        className: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], Array.isArray(className) ? className : [className], true), [componentClassName], false).join(' '),
        key: uuid.uuidv4(),
        style: {
          width: itemWidth * maxItemCount,
          height: itemHeight
        }
      }, children.slice(i, i + maxItemCount)));
    }

    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, result);
  }

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], Array.isArray(className) ? className : [className], true), [componentClassName], false).join(' '),
    style: {
      width: itemWidth * (Array.isArray(children) ? children.length : 1),
      height: itemHeight
    }
  }, children);
}

module.exports = SortByRow;
//# sourceMappingURL=SortByRow.js.map
