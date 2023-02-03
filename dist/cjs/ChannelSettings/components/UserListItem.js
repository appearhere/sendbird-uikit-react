'use strict';

var tslib_es6 = require('../../tslib.es6-d6068b10.js');
var React = require('react');
var LocalizationContext = require('../../LocalizationContext-f4281153.js');
var UserProfileContext = require('../../UserProfileContext-fd00d1bd.js');
var ui_Avatar = require('../../ui/Avatar.js');
var ui_MutedAvatarOverlay = require('../../ui/MutedAvatarOverlay.js');
var ui_Label = require('../../index-4197d014.js');
var ui_UserProfile = require('../../ui/UserProfile.js');
var ui_ContextMenu = require('../../ui/ContextMenu.js');
require('../../stringSet-2dfd148b.js');
require('../../index-d4bc012c.js');
require('prop-types');
require('../../ui/ImageRenderer.js');
require('../../ui/Icon.js');
require('../../uuid-2f4916c1.js');
require('../../sendbirdSelectors.js');
require('../../topics-085b5602.js');
require('../../utils-a9158c72.js');
require('../../ui/Button.js');
require('../../useSendbirdStateContext.js');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('react-dom');
require('../../ui/SortByRow.js');
require('../../index-d05a5cae.js');
require('../../utils/message/getOutgoingMessageState.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var COMPONENT_NAME = 'sendbird-user-list-item--small';

var UserListItem = function (_a) {
  var user = _a.user,
      className = _a.className,
      currentUser = _a.currentUser,
      action = _a.action;
  var actionRef = React.useRef(null);
  var parentRef = React.useRef(null);
  var avatarRef = React.useRef(null);
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;

  var _b = React.useContext(UserProfileContext.UserProfileContext),
      disableUserProfile = _b.disableUserProfile,
      renderUserProfile = _b.renderUserProfile;

  var injectingClassNames = Array.isArray(className) ? className : [className];
  return /*#__PURE__*/React__default["default"].createElement("div", {
    ref: parentRef,
    className: tslib_es6.__spreadArray([COMPONENT_NAME], injectingClassNames, true).join(' ')
  }, /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu["default"], {
    menuTrigger: function (toggleDropdown) {
      return /*#__PURE__*/React__default["default"].createElement(ui_Avatar["default"], {
        onClick: function () {
          if (!disableUserProfile) {
            toggleDropdown();
          }
        },
        ref: avatarRef,
        className: "".concat(COMPONENT_NAME, "__avatar"),
        src: user.profileUrl,
        width: 24,
        height: 24
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
        user: user,
        currentUserId: currentUser,
        onSuccess: closeDropdown
      }));
    }
  }), user.isMuted && /*#__PURE__*/React__default["default"].createElement(ui_MutedAvatarOverlay, null), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "".concat(COMPONENT_NAME, "__title"),
    type: ui_Label.LabelTypography.SUBTITLE_1,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, user.nickname || stringSet.NO_NAME, currentUser === user.userId && stringSet.CHANNEL_SETTING__MEMBERS__YOU), // if there is now nickname, display userId
  !user.nickname && /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "".concat(COMPONENT_NAME, "__subtitle"),
    type: ui_Label.LabelTypography.CAPTION_3,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, user.userId), user.role === 'operator' && /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "".concat(COMPONENT_NAME, "__operator"),
    type: ui_Label.LabelTypography.SUBTITLE_2,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, stringSet.CHANNEL_SETTING__MEMBERS__OPERATOR), action && /*#__PURE__*/React__default["default"].createElement("div", {
    ref: actionRef,
    className: "".concat(COMPONENT_NAME, "__action")
  }, action({
    actionRef: actionRef,
    parentRef: parentRef
  })));
};

module.exports = UserListItem;
//# sourceMappingURL=UserListItem.js.map
