import React__default, { useState } from 'react';
import { P as Provider } from '../context-57341fcc.js';
import '../utils-8a4a2ff6.js';

// Wraps all the accordions in an accordion set
function AccordionGroup(_a) {
  var children = _a.children,
      _b = _a.className,
      className = _b === void 0 ? '' : _b;

  var _c = useState(''),
      opened = _c[0],
      setOpened = _c[1];

  return /*#__PURE__*/React__default.createElement(Provider, {
    value: {
      opened: opened,
      setOpened: setOpened
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: className
  }, children));
}

export { AccordionGroup as default };
//# sourceMappingURL=AccordionGroup.js.map
