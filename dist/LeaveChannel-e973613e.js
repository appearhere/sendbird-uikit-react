import React__default, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { L as Label, a as LabelTypography, b as LabelColors } from './index-ba41c814.js';
import { b as LocalizationContext, a as _objectSpread2 } from './LocalizationContext-4f84414a.js';
import { M as Modal, T as Type } from './index-38ea17f7.js';
import { U as UserListItem } from './index-880f789f.js';

function Badge(_ref) {
  let {
    count,
    maxLevel,
    className
  } = _ref;
  const {
    stringSet
  } = useContext(LocalizationContext);
  const maximumNumber = parseInt('9'.repeat(maxLevel > 6 ? 6 : maxLevel), 10);
  return /*#__PURE__*/React__default.createElement("div", {
    className: [...(Array.isArray(className) ? className : [className]), 'sendbird-badge'].join(' ')
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-badge__text"
  }, /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONCONTENT_1
  }, count > maximumNumber ? `${maximumNumber}${stringSet.BADGE__OVER}` : count)));
}
Badge.propTypes = {
  count: PropTypes.number.isRequired,
  maxLevel: PropTypes.number,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
};
Badge.defaultProps = {
  maxLevel: 2,
  className: []
};

const filterUser = idsToFilter => currentId => idsToFilter.includes(currentId);

const InviteMembers = props => {
  const {
    userQueryCreator,
    closeModal,
    onSubmit,
    submitText,
    titleText,
    idsToFilter,
    swapParams
  } = props;
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState({});
  const {
    stringSet
  } = useContext(LocalizationContext);
  const [usersDataSource, setUsersDataSource] = useState({});
  const selectedCount = Object.keys(selectedUsers).length;
  useEffect(() => {
    const applicationUserListQuery = userQueryCreator();
    setUsersDataSource(applicationUserListQuery);
    applicationUserListQuery.next((res, err) => {
      // eslint-disable-next-line no-underscore-dangle
      let users_ = res;
      let error = err;

      if (swapParams) {
        users_ = err;
        error = users_;
      }

      if (error) {
        return;
      }

      setUsers(users_);
    });
  }, []);
  return /*#__PURE__*/React__default.createElement(Modal, {
    titleText: titleText,
    submitText: submitText,
    type: Type.PRIMARY,
    onCancel: closeModal,
    onSubmit: () => {
      const selectedUserList = Object.keys(selectedUsers);

      if (selectedUserList.length > 0) {
        onSubmit(selectedUserList);
        closeModal();
      }
    }
  }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(Label, {
    color: selectedCount > 0 ? LabelColors.PRIMARY : LabelColors.ONBACKGROUND_3,
    type: LabelTypography.CAPTION_1
  }, `${selectedCount} ${stringSet.MODAL__INVITE_MEMBER__SELECTEC}`), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-create-channel--scroll",
    onScroll: e => {
      const {
        hasNext
      } = usersDataSource;
      const fetchMore = e.target.clientHeight + e.target.scrollTop === e.target.scrollHeight;

      if (hasNext && fetchMore) {
        usersDataSource.next((usersBatch, error) => {
          if (error) {
            return;
          }

          setUsers([...users, ...usersBatch]);
        });
      }
    }
  }, users.map(user => !filterUser(idsToFilter)(user.userId) && /*#__PURE__*/React__default.createElement(UserListItem, {
    key: user.userId,
    user: user,
    checkBox: true,
    checked: selectedUsers[user.userId],
    onChange: event => {
      const modifiedSelectedUsers = _objectSpread2(_objectSpread2({}, selectedUsers), {}, {
        [event.target.id]: event.target.checked
      });

      if (!event.target.checked) {
        delete modifiedSelectedUsers[event.target.id];
      }

      setSelectedUsers(modifiedSelectedUsers);
    }
  })))));
};

InviteMembers.propTypes = {
  idsToFilter: PropTypes.arrayOf(PropTypes.string),
  swapParams: PropTypes.bool,
  userQueryCreator: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string,
  titleText: PropTypes.string
};
InviteMembers.defaultProps = {
  swapParams: false,
  submitText: 'create',
  titleText: 'Create new channel',
  idsToFilter: []
};

const createDefaultUserListQuery = _ref => {
  let {
    sdk,
    userFilledApplicationUserListQuery = {}
  } = _ref;
  const params = sdk.createApplicationUserListQuery();

  if (userFilledApplicationUserListQuery) {
    Object.keys(userFilledApplicationUserListQuery).forEach(key => {
      params[key] = userFilledApplicationUserListQuery[key];
    });
  }

  return params;
};

const getApplicationAttributes = function () {
  let sdk = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    appInfo = {}
  } = sdk;
  const {
    applicationAttributes = []
  } = appInfo;
  return applicationAttributes;
};

const isBroadcastChannelEnabled = function () {
  let sdk = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const ALLOW_BROADCAST_CHANNEL = 'allow_broadcast_channel';
  const applicationAttributes = getApplicationAttributes(sdk);

  if (Array.isArray(applicationAttributes)) {
    return applicationAttributes.includes(ALLOW_BROADCAST_CHANNEL);
  }

  return false;
};
const isSuperGroupChannelEnabled = function () {
  let sdk = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const ALLOW_SUPER_GROUP_CHANNEL = 'allow_super_group_channel';
  const applicationAttributes = getApplicationAttributes(sdk);

  if (Array.isArray(applicationAttributes)) {
    return applicationAttributes.includes(ALLOW_SUPER_GROUP_CHANNEL);
  }

  return false;
};
const setChannelType = (params, type) => {
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
const createChannel = function (sdk, selectedUsers, onBeforeCreateChannel, userId) {
  let type = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'group';
  return new Promise((resolve, reject) => {
    // have custom params
    if (onBeforeCreateChannel) {
      const params = onBeforeCreateChannel(selectedUsers);
      setChannelType(params, type);
      sdk.GroupChannel.createChannel(params, (response, error) => {
        const swapParams = sdk.getErrorFirstCallback();
        let groupChannel = response;
        let err = error;

        if (swapParams) {
          groupChannel = error;
          err = response;
        }

        if (err) {
          reject(err);
        }

        resolve(groupChannel);
      });
      return;
    }

    const params = new sdk.GroupChannelParams();
    params.addUserIds(selectedUsers);
    params.isDistinct = false;

    if (userId) {
      params.operatorUserIds = [userId];
    }

    setChannelType(params, type); // do not have custom params

    sdk.GroupChannel.createChannel(params, (response, error) => {
      const swapParams = sdk.getErrorFirstCallback();
      let groupChannel = response;
      let err = error;

      if (swapParams) {
        groupChannel = error;
        err = response;
      }

      if (err) {
        reject(err);
      }

      resolve(groupChannel);
    });
  });
};

const LeaveChannel = props => {
  const {
    onCloseModal,
    onLeaveChannel
  } = props;
  return /*#__PURE__*/React__default.createElement(Modal, {
    onCancel: onCloseModal,
    onSubmit: onLeaveChannel,
    submitText: "Leave",
    titleText: "Leave this channel?"
  });
};

LeaveChannel.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  onLeaveChannel: PropTypes.func.isRequired
};

export { Badge as B, InviteMembers as I, LeaveChannel as L, isSuperGroupChannelEnabled as a, createChannel as b, createDefaultUserListQuery as c, isBroadcastChannelEnabled as i };
//# sourceMappingURL=LeaveChannel-e973613e.js.map
