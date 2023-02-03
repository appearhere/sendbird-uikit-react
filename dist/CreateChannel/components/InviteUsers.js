import { a as __spreadArray, _ as __assign } from '../../tslib.es6-75bd0528.js';
import React__default, { useState, useContext, useEffect } from 'react';
import { a as LocalizationContext } from '../../LocalizationContext-e5f35d14.js';
import { u as useCreateChannelContext } from '../../CreateChannelProvider-e9f3d260.js';
import useSendbirdStateContext from '../../useSendbirdStateContext.js';
import Modal from '../../ui/Modal.js';
import { L as Label, b as LabelColors, a as LabelTypography } from '../../index-f60cbf08.js';
import { ButtonTypes } from '../../ui/Button.js';
import UserListItem from '../../ui/UserListItem.js';
import '../../stringSet-42c0e16e.js';
import '../../index-5dcd7e0f.js';
import '../../sendbirdSelectors.js';
import '../../topics-0560d548.js';
import '../../utils-8a4a2ff6.js';
import '../../withSendbird.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import 'react-dom';
import '../../index-5ab5d8fe.js';
import '../../ui/Icon.js';
import 'prop-types';
import '../../ui/IconButton.js';
import '../../MediaQueryContext-0ce6633d.js';
import '../../UserProfileContext-517994e3.js';
import '../../ui/Avatar.js';
import '../../ui/ImageRenderer.js';
import '../../uuid-392016d0.js';
import '../../ui/MutedAvatarOverlay.js';
import '../../ui/Checkbox.js';
import '../../ui/UserProfile.js';
import '../../ui/ContextMenu.js';
import '../../ui/SortByRow.js';
import '../../index-105a85f4.js';
import '../../utils/message/getOutgoingMessageState.js';

var filterUser = function (idsToFilter) {
  return function (currentId) {
    return idsToFilter === null || idsToFilter === void 0 ? void 0 : idsToFilter.includes(currentId);
  };
};
var setChannelType = function (params, type) {
  if (type === 'broadcast') {
    // eslint-disable-next-line no-param-reassign
    params.isBroadcast = true;
  }

  if (type === 'supergroup') {
    // eslint-disable-next-line no-param-reassign
    params.isSuper = true;
  }

  return params;
};
var createDefaultUserListQuery = function (_a) {
  var sdk = _a.sdk,
      userFilledApplicationUserListQuery = _a.userFilledApplicationUserListQuery;

  if (sdk === null || sdk === void 0 ? void 0 : sdk.createApplicationUserListQuery) {
    var params_1 = sdk === null || sdk === void 0 ? void 0 : sdk.createApplicationUserListQuery();

    if (userFilledApplicationUserListQuery) {
      Object.keys(userFilledApplicationUserListQuery).forEach(function (key) {
        params_1[key] = userFilledApplicationUserListQuery[key];
      });
    }

    return params_1;
  }
};

var appHeight = function () {
  try {
    var doc = document.documentElement;
    doc.style.setProperty('--sendbird-vh', window.innerHeight * .01 + 'px');
  } catch (_a) {}
};

var InviteUsers = function (_a) {
  var _b, _c, _d;

  var onCancel = _a.onCancel,
      userListQuery = _a.userListQuery;

  var _e = useCreateChannelContext(),
      onBeforeCreateChannel = _e.onBeforeCreateChannel,
      onCreateChannel = _e.onCreateChannel,
      overrideInviteUser = _e.overrideInviteUser,
      createChannel = _e.createChannel,
      type = _e.type;

  var globalStore = useSendbirdStateContext();
  var userId = (_b = globalStore === null || globalStore === void 0 ? void 0 : globalStore.config) === null || _b === void 0 ? void 0 : _b.userId;
  var sdk = (_d = (_c = globalStore === null || globalStore === void 0 ? void 0 : globalStore.stores) === null || _c === void 0 ? void 0 : _c.sdkStore) === null || _d === void 0 ? void 0 : _d.sdk;
  var idsToFilter = [userId];

  var _f = useState([]),
      users = _f[0],
      setUsers = _f[1];

  var _g = useState({}),
      selectedUsers = _g[0],
      setSelectedUsers = _g[1];

  var stringSet = useContext(LocalizationContext).stringSet;

  var _h = useState(null),
      usersDataSource = _h[0],
      setUsersDataSource = _h[1];

  var selectedCount = Object.keys(selectedUsers).length;
  var titleText = stringSet.MODAL__CREATE_CHANNEL__TITLE;
  var submitText = stringSet.BUTTON__CREATE;
  var userQueryCreator = userListQuery ? userListQuery() : createDefaultUserListQuery({
    sdk: sdk
  });
  useEffect(function () {
    var applicationUserListQuery = userQueryCreator;
    setUsersDataSource(applicationUserListQuery); // @ts-ignore

    if (!(applicationUserListQuery === null || applicationUserListQuery === void 0 ? void 0 : applicationUserListQuery.isLoading)) {
      applicationUserListQuery.next().then(function (users_) {
        setUsers(users_);
      });
    }
  }, []); // https://stackoverflow.com/a/70302463
  // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/#css-custom-properties-the-trick-to-correct-sizing
  // to fix navbar break in mobile

  useEffect(function () {
    appHeight();
    window.addEventListener('resize', appHeight);
    return function () {
      window.removeEventListener('resize', appHeight);
    };
  }, []);
  return /*#__PURE__*/React__default.createElement(Modal, {
    isFullScreenOnMobile: true,
    titleText: titleText,
    submitText: submitText,
    type: ButtonTypes.PRIMARY,
    disabled: Object.keys(selectedUsers).length === 0,
    onCancel: onCancel,
    onSubmit: function () {
      var selectedUserList = Object.keys(selectedUsers);

      if (typeof overrideInviteUser === 'function') {
        overrideInviteUser({
          users: selectedUserList,
          onClose: onCancel,
          channelType: type
        });
        return;
      }

      if (selectedUserList.length > 0) {
        if (onBeforeCreateChannel) {
          var params = onBeforeCreateChannel(selectedUserList);
          setChannelType(params, type);
          createChannel(params).then(function (channel) {
            onCreateChannel(channel);
          });
        } else {
          var params = {};
          params.invitedUserIds = selectedUserList;
          params.isDistinct = false;

          if (userId) {
            params.operatorUserIds = [userId];
          }

          setChannelType(params, type); // do not have custom params

          createChannel(params).then(function (channel) {
            onCreateChannel(channel);
          });
        }

        onCancel();
      }
    }
  }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(Label, {
    color: selectedCount > 0 ? LabelColors.PRIMARY : LabelColors.ONBACKGROUND_3,
    type: LabelTypography.CAPTION_1
  }, "".concat(selectedCount, " ").concat(stringSet.MODAL__INVITE_MEMBER__SELECTED)), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-create-channel--scroll",
    onScroll: function (e) {
      var eventTarget = e.target;
      var hasNext = usersDataSource.hasNext;
      var fetchMore = eventTarget.clientHeight + eventTarget.scrollTop === eventTarget.scrollHeight;

      if (hasNext && fetchMore) {
        usersDataSource.next().then(function (usersBatch) {
          setUsers(__spreadArray(__spreadArray([], users, true), usersBatch, true));
        });
      }
    }
  }, users.map(function (user) {
    return !filterUser(idsToFilter)(user.userId) && /*#__PURE__*/React__default.createElement(UserListItem, {
      key: user.userId,
      user: user,
      checkBox: true,
      checked: selectedUsers[user.userId],
      onChange: function (event) {
        var _a;

        var modifiedSelectedUsers = __assign(__assign({}, selectedUsers), (_a = {}, _a[event.target.id] = event.target.checked, _a));

        if (!event.target.checked) {
          delete modifiedSelectedUsers[event.target.id];
        }

        setSelectedUsers(modifiedSelectedUsers);
      }
    });
  }))));
};

export { InviteUsers as default };
//# sourceMappingURL=InviteUsers.js.map
