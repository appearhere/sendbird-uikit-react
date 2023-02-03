'use strict';

var tslib_es6 = require('../tslib.es6-d6068b10.js');
var React = require('react');
var UserProfileContext = require('../UserProfileContext-fd00d1bd.js');
var LocalizationContext = require('../LocalizationContext-f4281153.js');
var ui_Avatar = require('./Avatar.js');
var ui_MutedAvatarOverlay = require('./MutedAvatarOverlay.js');
var ui_Checkbox = require('./Checkbox.js');
var ui_UserProfile = require('./UserProfile.js');
var ui_ContextMenu = require('./ContextMenu.js');
var ui_Label = require('../index-4197d014.js');
require('prop-types');
require('../stringSet-2dfd148b.js');
require('../index-d4bc012c.js');
require('./ImageRenderer.js');
require('./Icon.js');
require('../uuid-2f4916c1.js');
require('../sendbirdSelectors.js');
require('../topics-085b5602.js');
require('../utils-a9158c72.js');
require('./Button.js');
require('../useSendbirdStateContext.js');
require('../withSendbird.js');
require('../_rollupPluginBabelHelpers-597f5cf8.js');
require('react-dom');
require('./SortByRow.js');
require('../index-d05a5cae.js');
require('../utils/message/getOutgoingMessageState.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function UserListItem(_a) {
  var user = _a.user,
      className = _a.className,
      checked = _a.checked,
      checkBox = _a.checkBox,
      isOperator = _a.isOperator,
      disabled = _a.disabled,
      disableMessaging = _a.disableMessaging,
      currentUser = _a.currentUser,
      action = _a.action,
      onChange = _a.onChange;
  var uniqueKey = user.userId;
  var actionRef = React__default["default"].useRef(null);
  var parentRef = React__default["default"].useRef(null);
  var avatarRef = React__default["default"].useRef(null);

  var _b = React.useContext(UserProfileContext.UserProfileContext),
      disableUserProfile = _b.disableUserProfile,
      renderUserProfile = _b.renderUserProfile;

  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-user-list-item'], false).join(' '),
    ref: parentRef
  }, (user === null || user === void 0 ? void 0 : user.isMuted) && /*#__PURE__*/React__default["default"].createElement(ui_MutedAvatarOverlay, {
    height: 40,
    width: 40
  }), /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu["default"], {
    menuTrigger: function (toggleDropdown) {
      return /*#__PURE__*/React__default["default"].createElement(ui_Avatar["default"], {
        className: "sendbird-user-list-item__avatar",
        ref: avatarRef,
        src: user.profileUrl,
        width: "40px",
        height: "40px",
        onClick: function () {
          if (!disableUserProfile) {
            toggleDropdown();
          }
        }
      });
    },
    menuItems: function (closeDropdown) {
      return /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItems, {
        openLeft: true,
        parentRef: avatarRef // for catching location(x, y) of MenuItems
        ,
        parentContainRef: avatarRef // for toggling more options(menus & reactions)
        ,
        closeDropdown: closeDropdown,
        style: {
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      }, renderUserProfile ? renderUserProfile({
        user: user,
        currentUserId: currentUser,
        close: closeDropdown
      }) : /*#__PURE__*/React__default["default"].createElement(ui_UserProfile, {
        disableMessaging: disableMessaging,
        user: user,
        currentUserId: currentUser,
        onSuccess: closeDropdown
      }));
    }
  }), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-user-list-item__title",
    type: ui_Label.LabelTypography.SUBTITLE_1,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, user.nickname || stringSet.NO_NAME, currentUser === user.userId && ' (You)'), // if there is now nickname, display userId
  !user.nickname && /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-user-list-item__subtitle",
    type: ui_Label.LabelTypography.CAPTION_3,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, user.userId), checkBox && /*#__PURE__*/React__default["default"].createElement("label", {
    className: "sendbird-user-list-item__checkbox",
    htmlFor: uniqueKey
  }, /*#__PURE__*/React__default["default"].createElement(ui_Checkbox, {
    id: uniqueKey,
    checked: checked,
    disabled: disabled,
    onChange: function (event) {
      return onChange(event);
    }
  })), isOperator && /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: ["sendbird-user-list-item__operator", checkBox ? "checkbox" : ""].join(' '),
    type: ui_Label.LabelTypography.SUBTITLE_2,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, "Operator"), action && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-user-list-item__action",
    ref: actionRef
  }, action({
    actionRef: actionRef,
    parentRef: parentRef
  })));
}

module.exports = UserListItem;
//# sourceMappingURL=UserListItem.js.map
