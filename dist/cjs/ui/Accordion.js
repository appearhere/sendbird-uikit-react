'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../tslib.es6-d6068b10.js');
var React = require('react');
var ui_Icon = require('./Icon.js');
var ui_AccordionGroup = require('./AccordionGroup.js');
var context = require('../context-4e494ce5.js');
require('prop-types');
require('../utils-a9158c72.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function Accordion(_a) {
  var className = _a.className,
      id = _a.id,
      renderTitle = _a.renderTitle,
      renderContent = _a.renderContent,
      renderFooter = _a.renderFooter;

  var _b = React.useState(false),
      showAccordion = _b[0],
      setShowAccordion = _b[1];

  return /*#__PURE__*/React__default["default"].createElement(context.Consumer, null, // Function is considered like a react component
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

    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("div", {
      className: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-accordion__panel-header'], false).join(' '),
      id: id,
      role: "switch",
      "aria-checked": false,
      onClick: handleClick,
      onKeyDown: handleClick,
      tabIndex: 0
    }, renderTitle(), /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
      type: ui_Icon.IconTypes.CHEVRON_RIGHT,
      className: ['sendbird-accordion__panel-icon-right', 'sendbird-accordion__panel-icon--chevron', showAccordion ? 'sendbird-accordion__panel-icon--open' : ''].join(' '),
      height: "24px",
      width: "24px"
    })), showAccordion && /*#__PURE__*/React__default["default"].createElement("div", {
      className: "sendbird-accordion"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "sendbird-accordion__list"
    }, renderContent()), renderFooter && /*#__PURE__*/React__default["default"].createElement("div", {
      className: "sendbird-accordion__footer"
    }, renderFooter())));
  });
}
var AccordionGroup = ui_AccordionGroup;

exports.AccordionGroup = AccordionGroup;
exports["default"] = Accordion;
//# sourceMappingURL=Accordion.js.map
