import { a as __spreadArray } from '../tslib.es6-75bd0528.js';
import React__default, { useContext } from 'react';
import { a as UserProfileContext } from '../UserProfileContext-517994e3.js';
import { a as LocalizationContext } from '../LocalizationContext-e5f35d14.js';
import Avatar from './Avatar.js';
import MutedAvatarOverlay from './MutedAvatarOverlay.js';
import Checkbox from './Checkbox.js';
import UserProfile from './UserProfile.js';
import ContextMenu, { MenuItems } from './ContextMenu.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../index-f60cbf08.js';
import 'prop-types';
import '../stringSet-42c0e16e.js';
import '../index-5dcd7e0f.js';
import './ImageRenderer.js';
import './Icon.js';
import '../uuid-392016d0.js';
import '../sendbirdSelectors.js';
import '../topics-0560d548.js';
import '../utils-8a4a2ff6.js';
import './Button.js';
import '../useSendbirdStateContext.js';
import '../withSendbird.js';
import '../_rollupPluginBabelHelpers-fe256514.js';
import 'react-dom';
import './SortByRow.js';
import '../index-105a85f4.js';
import '../utils/message/getOutgoingMessageState.js';

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
  var actionRef = React__default.useRef(null);
  var parentRef = React__default.useRef(null);
  var avatarRef = React__default.useRef(null);

  var _b = useContext(UserProfileContext),
      disableUserProfile = _b.disableUserProfile,
      renderUserProfile = _b.renderUserProfile;

  var stringSet = useContext(LocalizationContext).stringSet;
  return /*#__PURE__*/React__default.createElement("div", {
    className: __spreadArray(__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-user-list-item'], false).join(' '),
    ref: parentRef
  }, (user === null || user === void 0 ? void 0 : user.isMuted) && /*#__PURE__*/React__default.createElement(MutedAvatarOverlay, {
    height: 40,
    width: 40
  }), /*#__PURE__*/React__default.createElement(ContextMenu, {
    menuTrigger: function (toggleDropdown) {
      return /*#__PURE__*/React__default.createElement(Avatar, {
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
      return /*#__PURE__*/React__default.createElement(MenuItems, {
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
      }) : /*#__PURE__*/React__default.createElement(UserProfile, {
        disableMessaging: disableMessaging,
        user: user,
        currentUserId: currentUser,
        onSuccess: closeDropdown
      }));
    }
  }), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-user-list-item__title",
    type: LabelTypography.SUBTITLE_1,
    color: LabelColors.ONBACKGROUND_1
  }, user.nickname || stringSet.NO_NAME, currentUser === user.userId && ' (You)'), // if there is now nickname, display userId
  !user.nickname && /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-user-list-item__subtitle",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, user.userId), checkBox && /*#__PURE__*/React__default.createElement("label", {
    className: "sendbird-user-list-item__checkbox",
    htmlFor: uniqueKey
  }, /*#__PURE__*/React__default.createElement(Checkbox, {
    id: uniqueKey,
    checked: checked,
    disabled: disabled,
    onChange: function (event) {
      return onChange(event);
    }
  })), isOperator && /*#__PURE__*/React__default.createElement(Label, {
    className: ["sendbird-user-list-item__operator", checkBox ? "checkbox" : ""].join(' '),
    type: LabelTypography.SUBTITLE_2,
    color: LabelColors.ONBACKGROUND_2
  }, "Operator"), action && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-user-list-item__action",
    ref: actionRef
  }, action({
    actionRef: actionRef,
    parentRef: parentRef
  })));
}

export { UserListItem as default };
//# sourceMappingURL=UserListItem.js.map
