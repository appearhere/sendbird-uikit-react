import { a as __spreadArray } from '../tslib.es6-75bd0528.js';
import React__default, { useState } from 'react';
import Icon, { IconTypes } from './Icon.js';
import AccordionGroup$1 from './AccordionGroup.js';
import { C as Consumer } from '../context-57341fcc.js';
import 'prop-types';
import '../utils-8a4a2ff6.js';

function Accordion(_a) {
  var className = _a.className,
      id = _a.id,
      renderTitle = _a.renderTitle,
      renderContent = _a.renderContent,
      renderFooter = _a.renderFooter;

  var _b = useState(false),
      showAccordion = _b[0],
      setShowAccordion = _b[1];

  return /*#__PURE__*/React__default.createElement(Consumer, null, // Function is considered like a react component
  function (value) {
    var opened = value.opened,
        setOpened = value.setOpened; // props from Provider

    if (id === opened) {
      setShowAccordion(true);
    } else {
      setShowAccordion(false);
    }

    var handleClick = function () {
      if (showAccordion) {
        setOpened('');
      } else {
        setOpened(id);
      }
    };

    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
      className: __spreadArray(__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-accordion__panel-header'], false).join(' '),
      id: id,
      role: "switch",
      "aria-checked": false,
      onClick: handleClick,
      onKeyDown: handleClick,
      tabIndex: 0
    }, renderTitle(), /*#__PURE__*/React__default.createElement(Icon, {
      type: IconTypes.CHEVRON_RIGHT,
      className: ['sendbird-accordion__panel-icon-right', 'sendbird-accordion__panel-icon--chevron', showAccordion ? 'sendbird-accordion__panel-icon--open' : ''].join(' '),
      height: "24px",
      width: "24px"
    })), showAccordion && /*#__PURE__*/React__default.createElement("div", {
      className: "sendbird-accordion"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "sendbird-accordion__list"
    }, renderContent()), renderFooter && /*#__PURE__*/React__default.createElement("div", {
      className: "sendbird-accordion__footer"
    }, renderFooter())));
  });
}
var AccordionGroup = AccordionGroup$1;

export { AccordionGroup, Accordion as default };
//# sourceMappingURL=Accordion.js.map
