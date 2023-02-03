'use strict';

var React = require('react');
var EditUserProfile_components_EditUserProfileUI = require('./index-4de278b6.js');
require('./ui/Modal.js');
require('react-dom');
require('./index-1b132096.js');
require('./LocalizationContext-f4281153.js');
require('./stringSet-2dfd148b.js');
require('./index-d4bc012c.js');
require('./ui/Button.js');
require('./tslib.es6-d6068b10.js');
require('./index-4197d014.js');
require('prop-types');
require('./ui/Icon.js');
require('./ui/IconButton.js');
require('./MediaQueryContext-9a5566fc.js');
require('./useSendbirdStateContext.js');
require('./withSendbird.js');
require('./_rollupPluginBabelHelpers-597f5cf8.js');
require('./ui/Input.js');
require('./ui/Avatar.js');
require('./ui/ImageRenderer.js');
require('./uuid-2f4916c1.js');
require('./ui/TextButton.js');
require('./color-0fae7c8e.js');
require('./utils-a9158c72.js');
require('./actionTypes-4d28a480.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var EditProfile = function (props) {
  var onEditProfile = props.onEditProfile,
      onCancel = props.onCancel,
      onThemeChange = props.onThemeChange;
  return /*#__PURE__*/React__default["default"].createElement(EditUserProfile_components_EditUserProfileUI.EditUserProfileProvider, {
    onEditProfile: onEditProfile,
    onCancel: onCancel,
    onThemeChange: onThemeChange
  }, /*#__PURE__*/React__default["default"].createElement(EditUserProfile_components_EditUserProfileUI.EditUserProfile, null));
};

module.exports = EditProfile;
//# sourceMappingURL=EditUserProfile.js.map
