'use strict';

var tslib_es6 = require('../../tslib.es6-d6068b10.js');
var React = require('react');
var LocalizationContext = require('../../LocalizationContext-f4281153.js');
var CreateChannel_context = require('../../CreateChannelProvider-9629e09e.js');
var useSendbirdStateContext = require('../../useSendbirdStateContext.js');
var ui_Modal = require('../../ui/Modal.js');
var ui_Label = require('../../index-4197d014.js');
var ui_Button = require('../../ui/Button.js');
var ui_UserListItem = require('../../ui/UserListItem.js');
require('../../stringSet-2dfd148b.js');
require('../../index-d4bc012c.js');
require('../../sendbirdSelectors.js');
require('../../topics-085b5602.js');
require('../../utils-a9158c72.js');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('react-dom');
require('../../index-1b132096.js');
require('../../ui/Icon.js');
require('prop-types');
require('../../ui/IconButton.js');
require('../../MediaQueryContext-9a5566fc.js');
require('../../UserProfileContext-fd00d1bd.js');
require('../../ui/Avatar.js');
require('../../ui/ImageRenderer.js');
require('../../uuid-2f4916c1.js');
require('../../ui/MutedAvatarOverlay.js');
require('../../ui/Checkbox.js');
require('../../ui/UserProfile.js');
require('../../ui/ContextMenu.js');
require('../../ui/SortByRow.js');
require('../../index-d05a5cae.js');
require('../../utils/message/getOutgoingMessageState.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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

  var _e = CreateChannel_context.useCreateChannelContext(),
      onBeforeCreateChannel = _e.onBeforeCreateChannel,
      onCreateChannel = _e.onCreateChannel,
      overrideInviteUser = _e.overrideInviteUser,
      createChannel = _e.createChannel,
      type = _e.type;

  var globalStore = useSendbirdStateContext();
  var userId = (_b = globalStore === null || globalStore === void 0 ? void 0 : globalStore.config) === null || _b === void 0 ? void 0 : _b.userId;
  var sdk = (_d = (_c = globalStore === null || globalStore === void 0 ? void 0 : globalStore.stores) === null || _c === void 0 ? void 0 : _c.sdkStore) === null || _d === void 0 ? void 0 : _d.sdk;
  var idsToFilter = [userId];

  var _f = React.useState([]),
      users = _f[0],
      setUsers = _f[1];

  var _g = React.useState({}),
      selectedUsers = _g[0],
      setSelectedUsers = _g[1];

  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;

  var _h = React.useState(null),
      usersDataSource = _h[0],
      setUsersDataSource = _h[1];

  var selectedCount = Object.keys(selectedUsers).length;
  var titleText = stringSet.MODAL__CREATE_CHANNEL__TITLE;
  var submitText = stringSet.BUTTON__CREATE;
  var userQueryCreator = userListQuery ? userListQuery() : createDefaultUserListQuery({
    sdk: sdk
  });
  React.useEffect(function () {
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

  React.useEffect(function () {
    appHeight();
    window.addEventListener('resize', appHeight);
    return function () {
      window.removeEventListener('resize', appHeight);
    };
  }, []);
  return /*#__PURE__*/React__default["default"].createElement(ui_Modal["default"], {
    isFullScreenOnMobile: true,
    titleText: titleText,
    submitText: submitText,
    type: ui_Button.ButtonTypes.PRIMARY,
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
  }, /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    color: selectedCount > 0 ? ui_Label.LabelColors.PRIMARY : ui_Label.LabelColors.ONBACKGROUND_3,
    type: ui_Label.LabelTypography.CAPTION_1
  }, "".concat(selectedCount, " ").concat(stringSet.MODAL__INVITE_MEMBER__SELECTED)), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-create-channel--scroll",
    onScroll: function (e) {
      var eventTarget = e.target;
      var hasNext = usersDataSource.hasNext;
      var fetchMore = eventTarget.clientHeight + eventTarget.scrollTop === eventTarget.scrollHeight;

      if (hasNext && fetchMore) {
        usersDataSource.next().then(function (usersBatch) {
          setUsers(tslib_es6.__spreadArray(tslib_es6.__spreadArray([], users, true), usersBatch, true));
        });
      }
    }
  }, users.map(function (user) {
    return !filterUser(idsToFilter)(user.userId) && /*#__PURE__*/React__default["default"].createElement(ui_UserListItem, {
      key: user.userId,
      user: user,
      checkBox: true,
      checked: selectedUsers[user.userId],
      onChange: function (event) {
        var _a;

        var modifiedSelectedUsers = tslib_es6.__assign(tslib_es6.__assign({}, selectedUsers), (_a = {}, _a[event.target.id] = event.target.checked, _a));

        if (!event.target.checked) {
          delete modifiedSelectedUsers[event.target.id];
        }

        setSelectedUsers(modifiedSelectedUsers);
      }
    });
  }))));
};

module.exports = InviteUsers;
//# sourceMappingURL=InviteUsers.js.map
