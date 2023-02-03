'use strict';

var React = require('react');
var LocalizationContext = require('../LocalizationContext-f4281153.js');
var UserProfileContext = require('../UserProfileContext-fd00d1bd.js');
var sendbirdSelectors = require('../sendbirdSelectors.js');
var ui_Avatar = require('./Avatar.js');
var ui_Label = require('../index-4197d014.js');
var ui_Button = require('./Button.js');
var useSendbirdStateContext = require('../useSendbirdStateContext.js');
require('../stringSet-2dfd148b.js');
require('../index-d4bc012c.js');
require('prop-types');
require('../topics-085b5602.js');
require('../utils-a9158c72.js');
require('../tslib.es6-d6068b10.js');
require('./ImageRenderer.js');
require('./Icon.js');
require('../uuid-2f4916c1.js');
require('../withSendbird.js');
require('../_rollupPluginBabelHelpers-597f5cf8.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function UserProfile(_a) {
  var _b, _c;

  var user = _a.user,
      currentUserId = _a.currentUserId,
      _d = _a.disableMessaging,
      disableMessaging = _d === void 0 ? false : _d,
      onSuccess = _a.onSuccess;
  var store = useSendbirdStateContext();
  var createChannel = sendbirdSelectors.getCreateGroupChannel(store);
  var logger = (_b = store === null || store === void 0 ? void 0 : store.config) === null || _b === void 0 ? void 0 : _b.logger;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  var currentUserId_ = currentUserId || ((_c = store === null || store === void 0 ? void 0 : store.config) === null || _c === void 0 ? void 0 : _c.userId); // @ts-ignore

  var onUserProfileMessage = React.useContext(UserProfileContext.UserProfileContext).onUserProfileMessage;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird__user-profile"
  }, /*#__PURE__*/React__default["default"].createElement("section", {
    className: "sendbird__user-profile-avatar"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Avatar["default"], {
    height: "80px",
    width: "80px",
    src: user === null || user === void 0 ? void 0 : user.profileUrl
  })), /*#__PURE__*/React__default["default"].createElement("section", {
    className: "sendbird__user-profile-name"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.H_2,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, (user === null || user === void 0 ? void 0 : user.nickname) || stringSet.NO_NAME)), (user === null || user === void 0 ? void 0 : user.userId) !== currentUserId_ && !disableMessaging && /*#__PURE__*/React__default["default"].createElement("section", {
    className: "sendbird__user-profile-message"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Button["default"], {
    type: ui_Button.ButtonTypes.SECONDARY,
    onClick: function () {
      // Create 1:1 channel
      var params = {
        isDistinct: false,
        invitedUserIds: [user === null || user === void 0 ? void 0 : user.userId],
        operatorUserIds: [currentUserId_]
      };
      onSuccess();
      createChannel(params).then(function (groupChannel) {
        logger.info('UserProfile, channel create', groupChannel);

        if (typeof onUserProfileMessage === 'function') {
          onUserProfileMessage === null || onUserProfileMessage === void 0 ? void 0 : onUserProfileMessage(groupChannel);
        }
      });
    }
  }, stringSet.USER_PROFILE__MESSAGE)), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird__user-profile-separator"
  }), /*#__PURE__*/React__default["default"].createElement("section", {
    className: "sendbird__user-profile-userId"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird__user-profile-userId--label",
    type: ui_Label.LabelTypography.CAPTION_2,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, stringSet.USER_PROFILE__USER_ID), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird__user-profile-userId--value",
    type: ui_Label.LabelTypography.BODY_1,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, user === null || user === void 0 ? void 0 : user.userId)));
}

module.exports = UserProfile;
//# sourceMappingURL=UserProfile.js.map
