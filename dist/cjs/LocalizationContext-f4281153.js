'use strict';

var React = require('react');
var stringSet = require('./stringSet-2dfd148b.js');
var index = require('./index-d4bc012c.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var LocalizationContext = /*#__PURE__*/React__default["default"].createContext({
  stringSet: stringSet.getStringSet('en'),
  dateLocale: index.defaultLocale
});

var LocalizationProvider = function (props) {
  var children = props.children;
  return /*#__PURE__*/React__default["default"].createElement(LocalizationContext.Provider, {
    value: props
  }, children);
};

var useLocalization = function () {
  return React__default["default"].useContext(LocalizationContext);
};

exports.LocalizationContext = LocalizationContext;
exports.LocalizationProvider = LocalizationProvider;
exports.useLocalization = useLocalization;
//# sourceMappingURL=LocalizationContext-f4281153.js.map
