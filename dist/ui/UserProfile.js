import React__default, { useContext } from 'react';
import { a as LocalizationContext } from '../LocalizationContext-e5f35d14.js';
import { a as UserProfileContext } from '../UserProfileContext-517994e3.js';
import { getCreateGroupChannel } from '../sendbirdSelectors.js';
import Avatar from './Avatar.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../index-f60cbf08.js';
import Button, { ButtonTypes } from './Button.js';
import useSendbirdStateContext from '../useSendbirdStateContext.js';
import '../stringSet-42c0e16e.js';
import '../index-5dcd7e0f.js';
import 'prop-types';
import '../topics-0560d548.js';
import '../utils-8a4a2ff6.js';
import '../tslib.es6-75bd0528.js';
import './ImageRenderer.js';
import './Icon.js';
import '../uuid-392016d0.js';
import '../withSendbird.js';
import '../_rollupPluginBabelHelpers-fe256514.js';

function UserProfile(_a) {
  var _b, _c;

  var user = _a.user,
      currentUserId = _a.currentUserId,
      _d = _a.disableMessaging,
      disableMessaging = _d === void 0 ? false : _d,
      onSuccess = _a.onSuccess;
  var store = useSendbirdStateContext();
  var createChannel = getCreateGroupChannel(store);
  var logger = (_b = store === null || store === void 0 ? void 0 : store.config) === null || _b === void 0 ? void 0 : _b.logger;
  var stringSet = useContext(LocalizationContext).stringSet;
  var currentUserId_ = currentUserId || ((_c = store === null || store === void 0 ? void 0 : store.config) === null || _c === void 0 ? void 0 : _c.userId); // @ts-ignore

  var onUserProfileMessage = useContext(UserProfileContext).onUserProfileMessage;
  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird__user-profile"
  }, /*#__PURE__*/React__default.createElement("section", {
    className: "sendbird__user-profile-avatar"
  }, /*#__PURE__*/React__default.createElement(Avatar, {
    height: "80px",
    width: "80px",
    src: user === null || user === void 0 ? void 0 : user.profileUrl
  })), /*#__PURE__*/React__default.createElement("section", {
    className: "sendbird__user-profile-name"
  }, /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.H_2,
    color: LabelColors.ONBACKGROUND_1
  }, (user === null || user === void 0 ? void 0 : user.nickname) || stringSet.NO_NAME)), (user === null || user === void 0 ? void 0 : user.userId) !== currentUserId_ && !disableMessaging && /*#__PURE__*/React__default.createElement("section", {
    className: "sendbird__user-profile-message"
  }, /*#__PURE__*/React__default.createElement(Button, {
    type: ButtonTypes.SECONDARY,
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
  }, stringSet.USER_PROFILE__MESSAGE)), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird__user-profile-separator"
  }), /*#__PURE__*/React__default.createElement("section", {
    className: "sendbird__user-profile-userId"
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird__user-profile-userId--label",
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, stringSet.USER_PROFILE__USER_ID), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird__user-profile-userId--value",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_1
  }, user === null || user === void 0 ? void 0 : user.userId)));
}

export { UserProfile as default };
//# sourceMappingURL=UserProfile.js.map
