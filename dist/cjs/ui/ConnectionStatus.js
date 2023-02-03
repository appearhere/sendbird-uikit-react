'use strict';

var React = require('react');
var ui_Icon = require('./Icon.js');
var ui_Label = require('../index-4197d014.js');
var LocalizationContext = require('../LocalizationContext-f4281153.js');
require('prop-types');
require('../stringSet-2dfd148b.js');
require('../index-d4bc012c.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function ConnectionStatus() {
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-connection-status"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.BODY_2,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, stringSet.TRYING_TO_CONNECT), /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.DISCONNECTED,
    fillColor: ui_Icon.IconColors.SENT,
    width: "14px",
    height: "14px"
  }));
}

module.exports = ConnectionStatus;
//# sourceMappingURL=ConnectionStatus.js.map
