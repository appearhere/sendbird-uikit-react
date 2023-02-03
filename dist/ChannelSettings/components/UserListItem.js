import { a as __spreadArray } from '../../tslib.es6-75bd0528.js';
import React__default, { useRef, useContext } from 'react';
import { a as LocalizationContext } from '../../LocalizationContext-e5f35d14.js';
import { a as UserProfileContext } from '../../UserProfileContext-517994e3.js';
import Avatar from '../../ui/Avatar.js';
import MutedAvatarOverlay from '../../ui/MutedAvatarOverlay.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../../index-f60cbf08.js';
import UserProfile from '../../ui/UserProfile.js';
import ContextMenu, { MenuItems } from '../../ui/ContextMenu.js';
import '../../stringSet-42c0e16e.js';
import '../../index-5dcd7e0f.js';
import 'prop-types';
import '../../ui/ImageRenderer.js';
import '../../ui/Icon.js';
import '../../uuid-392016d0.js';
import '../../sendbirdSelectors.js';
import '../../topics-0560d548.js';
import '../../utils-8a4a2ff6.js';
import '../../ui/Button.js';
import '../../useSendbirdStateContext.js';
import '../../withSendbird.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import 'react-dom';
import '../../ui/SortByRow.js';
import '../../index-105a85f4.js';
import '../../utils/message/getOutgoingMessageState.js';

var COMPONENT_NAME = 'sendbird-user-list-item--small';

var UserListItem = function (_a) {
  var user = _a.user,
      className = _a.className,
      currentUser = _a.currentUser,
      action = _a.action;
  var actionRef = useRef(null);
  var parentRef = useRef(null);
  var avatarRef = useRef(null);
  var stringSet = useContext(LocalizationContext).stringSet;

  var _b = useContext(UserProfileContext),
      disableUserProfile = _b.disableUserProfile,
      renderUserProfile = _b.renderUserProfile;

  var injectingClassNames = Array.isArray(className) ? className : [className];
  return /*#__PURE__*/React__default.createElement("div", {
    ref: parentRef,
    className: __spreadArray([COMPONENT_NAME], injectingClassNames, true).join(' ')
  }, /*#__PURE__*/React__default.createElement(ContextMenu, {
    menuTrigger: function (toggleDropdown) {
      return /*#__PURE__*/React__default.createElement(Avatar, {
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
        user: user,
        currentUserId: currentUser,
        onSuccess: closeDropdown
      }));
    }
  }), user.isMuted && /*#__PURE__*/React__default.createElement(MutedAvatarOverlay, null), /*#__PURE__*/React__default.createElement(Label, {
    className: "".concat(COMPONENT_NAME, "__title"),
    type: LabelTypography.SUBTITLE_1,
    color: LabelColors.ONBACKGROUND_1
  }, user.nickname || stringSet.NO_NAME, currentUser === user.userId && stringSet.CHANNEL_SETTING__MEMBERS__YOU), // if there is now nickname, display userId
  !user.nickname && /*#__PURE__*/React__default.createElement(Label, {
    className: "".concat(COMPONENT_NAME, "__subtitle"),
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, user.userId), user.role === 'operator' && /*#__PURE__*/React__default.createElement(Label, {
    className: "".concat(COMPONENT_NAME, "__operator"),
    type: LabelTypography.SUBTITLE_2,
    color: LabelColors.ONBACKGROUND_2
  }, stringSet.CHANNEL_SETTING__MEMBERS__OPERATOR), action && /*#__PURE__*/React__default.createElement("div", {
    ref: actionRef,
    className: "".concat(COMPONENT_NAME, "__action")
  }, action({
    actionRef: actionRef,
    parentRef: parentRef
  })));
};

export { UserListItem as default };
//# sourceMappingURL=UserListItem.js.map
