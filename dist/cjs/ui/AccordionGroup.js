'use strict';

var React = require('react');
var context = require('../context-4e494ce5.js');
require('../utils-a9158c72.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

// Wraps all the accordions in an accordion set
function AccordionGroup(_a) {
  var children = _a.children,
      _b = _a.className,
      className = _b === void 0 ? '' : _b;

  var _c = React.useState(''),
      opened = _c[0],
      setOpened = _c[1];

  return /*#__PURE__*/React__default["default"].createElement(context.Provider, {
    value: {
      opened: opened,
      setOpened: setOpened
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: className
  }, children));
}

module.exports = AccordionGroup;
//# sourceMappingURL=AccordionGroup.js.map
