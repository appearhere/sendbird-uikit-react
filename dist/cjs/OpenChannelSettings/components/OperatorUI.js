'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var LocalizationContext = require('../../LocalizationContext-f4281153.js');
var ui_Label = require('../../index-4197d014.js');
var ui_Icon = require('../../ui/Icon.js');
var OpenChannelSettings_context = require('../context.js');
var OpenChannelSettings_components_OpenChannelProfile = require('./OpenChannelProfile.js');
var ui_Modal = require('../../ui/Modal.js');
var useSendbirdStateContext = require('../../useSendbirdStateContext.js');
var OpenChannelSettings_components_ParticipantUI = require('../../index-0d57689d.js');
var ui_Accordion = require('../../ui/Accordion.js');
var ui_Button = require('../../ui/Button.js');
var ui_ContextMenu = require('../../ui/ContextMenu.js');
var ui_IconButton = require('../../ui/IconButton.js');
var tslib_es6 = require('../../tslib.es6-d6068b10.js');
var ui_UserListItem = require('../../ui/UserListItem.js');
var utils = require('../../utils-a9158c72.js');
require('../../stringSet-2dfd148b.js');
require('../../index-d4bc012c.js');
require('prop-types');
require('@sendbird/chat/openChannel');
require('../../UserProfileContext-fd00d1bd.js');
require('../../uuid-2f4916c1.js');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('../../ui/TextButton.js');
require('../../color-0fae7c8e.js');
require('../../ui/OpenChannelAvatar.js');
require('../../ui/Avatar.js');
require('../../ui/ImageRenderer.js');
require('../../utils-6eb1ca73.js');
require('./EditDetailsModal.js');
require('../../topics-085b5602.js');
require('../../ui/Input.js');
require('react-dom');
require('../../index-1b132096.js');
require('../../MediaQueryContext-9a5566fc.js');
require('../../context-4e494ce5.js');
require('../../ui/UserProfile.js');
require('../../sendbirdSelectors.js');
require('../../ui/AccordionGroup.js');
require('../../ui/SortByRow.js');
require('../../index-d05a5cae.js');
require('../../utils/message/getOutgoingMessageState.js');
require('../../ui/MutedAvatarOverlay.js');
require('../../ui/Checkbox.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function DeleteChannel() {
  var _a, _b;

  var _c = React.useState(false),
      showDeleteChannelModal = _c[0],
      setShowDeleteChannelModal = _c[1];

  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  var globalState = useSendbirdStateContext();
  var isOnline = (_a = globalState === null || globalState === void 0 ? void 0 : globalState.config) === null || _a === void 0 ? void 0 : _a.isOnline;
  var logger = (_b = globalState === null || globalState === void 0 ? void 0 : globalState.config) === null || _b === void 0 ? void 0 : _b.logger;

  var _d = OpenChannelSettings_context.useOpenChannelSettingsContext(),
      channel = _d.channel,
      onDeleteChannel = _d.onDeleteChannel;

  var deleteChannel = function () {
    channel === null || channel === void 0 ? void 0 : channel.delete().then(function (response) {
      logger.info('OpenChannelSettings: Delete channel success', response);

      if (onDeleteChannel) {
        onDeleteChannel(channel);
      }
    }).catch(function (error) {
      logger.warning('OpenChannelSettings: Delete channel failed', error);
    });
  };

  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-settings__panel-item\n          sendbird-openchannel-settings__delete-channel\n            ".concat(!isOnline ? 'sendbird-openchannel-settings__panel-item__disabled' : ''),
    role: "button",
    tabIndex: 0,
    onKeyDown: function () {
      if (!isOnline) {
        return;
      }

      setShowDeleteChannelModal(true);
    },
    onClick: function () {
      if (!isOnline) {
        return;
      }

      setShowDeleteChannelModal(true);
    }
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.DELETE,
    fillColor: ui_Icon.IconColors.ERROR,
    className: ['sendbird-openchannel-settings__panel-icon-left', 'sendbird-openchannel-settings__panel-icon__delete'].join(' '),
    height: "24px",
    width: "24px"
  }), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.SUBTITLE_1,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, stringSet.OPEN_CHANNEL_SETTINGS__DELETE_CHANNEL_PANEL)), showDeleteChannelModal && /*#__PURE__*/React__default["default"].createElement(ui_Modal["default"], {
    isFullScreenOnMobile: true,
    onCancel: function () {
      setShowDeleteChannelModal(false);
    },
    onSubmit: function () {
      deleteChannel();
    },
    titleText: stringSet.OPEN_CHANNEL_SETTINGS__DELETE_CHANNEL_TITLE,
    submitText: stringSet.OPEN_CHANNEL_SETTINGS__DELETE_CHANNEL_SUBMIT
  }, stringSet.OPEN_CHANNEL_SETTINGS__DELETE_CHANNEL_CONTEXT));
}

function OperatorListModal(_a) {
  var _b;

  var onCancel = _a.onCancel;

  var _c = React.useState([]),
      users = _c[0],
      setUsers = _c[1];

  var _d = React.useState(null),
      operatorQuery = _d[0],
      setOperatorQuery = _d[1];

  var channel = OpenChannelSettings_context.useOpenChannelSettingsContext().channel;
  var state = useSendbirdStateContext();
  var currentUserId = (_b = state === null || state === void 0 ? void 0 : state.config) === null || _b === void 0 ? void 0 : _b.userId;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  React.useEffect(function () {
    var operatorListQuery = channel === null || channel === void 0 ? void 0 : channel.createOperatorListQuery({
      limit: 20
    });
    operatorListQuery.next().then(function (participants) {
      setUsers(participants);
    });
    setOperatorQuery(operatorListQuery);
  }, []);
  return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement(ui_Modal["default"], {
    hideFooter: true,
    isFullScreenOnMobile: true,
    titleText: stringSet.OPEN_CHANNEL_SETTINGS__OPERATORS__TITLE_ALL,
    onCancel: onCancel
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-more-users__popup-scroll",
    onScroll: function (e) {
      var hasNext = operatorQuery.hasNext;
      var target = e.target;
      var fetchMore = target.clientHeight + target.scrollTop === target.scrollHeight;

      if (hasNext && fetchMore) {
        operatorQuery.next().then(function (o) {
          setUsers(tslib_es6.__spreadArray(tslib_es6.__spreadArray([], users, true), o, true));
        });
      }
    }
  }, users.map(function (operator) {
    return /*#__PURE__*/React__default["default"].createElement(ui_UserListItem, {
      currentUser: currentUserId,
      user: operator,
      key: operator.userId,
      action: function (_a) {
        var parentRef = _a.parentRef,
            actionRef = _a.actionRef;
        return currentUserId !== (operator === null || operator === void 0 ? void 0 : operator.userId) ? /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu["default"], {
          menuTrigger: function (toggleDropdown) {
            return /*#__PURE__*/React__default["default"].createElement(ui_IconButton, {
              className: "sendbird-user-message__more__menu",
              width: "32px",
              height: "32px",
              onClick: toggleDropdown
            }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
              width: "24px",
              height: "24px",
              type: ui_Icon.IconTypes.MORE,
              fillColor: ui_Icon.IconColors.CONTENT_INVERSE
            }));
          },
          menuItems: function (closeDropdown) {
            return /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItems, {
              parentContainRef: parentRef,
              parentRef: actionRef,
              closeDropdown: closeDropdown,
              openLeft: true
            }, /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
              onClick: function () {
                channel === null || channel === void 0 ? void 0 : channel.removeOperators([operator.userId]).then(function () {
                  setUsers(users.filter(function (_a) {
                    var userId = _a.userId;
                    return userId !== operator.userId;
                  }));
                });
                closeDropdown();
              }
            }, stringSet.OPEN_CHANNEL_SETTING__MODERATION__UNREGISTER_OPERATOR));
          }
        }) : null;
      }
    });
  }))));
}

function AddOperatorsModal(_a) {
  var onCancel = _a.onCancel,
      onSubmit = _a.onSubmit;

  var _b = React.useState([]),
      participants = _b[0],
      setParticipants = _b[1];

  var _c = React.useState({}),
      selectedUsers = _c[0],
      setSelectedUsers = _c[1];

  var _d = React.useState(null),
      participantQuery = _d[0],
      setParticipantQuery = _d[1];

  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  var channel = OpenChannelSettings_context.useOpenChannelSettingsContext().channel;
  React.useEffect(function () {
    var participantListQuery = channel === null || channel === void 0 ? void 0 : channel.createParticipantListQuery({
      limit: 20
    });
    participantListQuery.next().then(function (users) {
      setParticipants(users);
    });
    setParticipantQuery(participantListQuery);
  }, []);
  var selectedCount = Object.keys(selectedUsers).filter(function (m) {
    return selectedUsers[m];
  }).length;
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(ui_Modal["default"], {
    isFullScreenOnMobile: true,
    type: ui_Button.ButtonTypes.PRIMARY,
    submitText: stringSet.CHANNEL_SETTING__OPERATORS__ADD_BUTTON,
    onCancel: onCancel,
    onSubmit: function () {
      var users = Object.keys(selectedUsers).filter(function (m) {
        return selectedUsers[m];
      });
      channel === null || channel === void 0 ? void 0 : channel.addOperators(users).then(function () {
        onSubmit(users);
      });
    },
    titleText: stringSet.OPEN_CHANNEL_CONVERSATION__SELECT_PARTICIPANTS
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    color: selectedCount > 0 ? ui_Label.LabelColors.PRIMARY : ui_Label.LabelColors.ONBACKGROUND_3,
    type: ui_Label.LabelTypography.CAPTION_1
  }, "".concat(selectedCount, " ").concat(stringSet.MODAL__INVITE_MEMBER__SELECTED)), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-more-users__popup-scroll",
    onScroll: function (e) {
      var hasNext = participantQuery.hasNext;
      var target = e.target;
      var fetchMore = target.clientHeight + target.scrollTop === target.scrollHeight;

      if (hasNext && fetchMore) {
        participantQuery.next().then(function (o) {
          setParticipants(tslib_es6.__spreadArray(tslib_es6.__spreadArray([], participants, true), o, true));
        });
      }
    }
  }, participants.map(function (participant) {
    var isOperator = (channel === null || channel === void 0 ? void 0 : channel.operators.find(function (operator) {
      return (operator === null || operator === void 0 ? void 0 : operator.userId) === (participant === null || participant === void 0 ? void 0 : participant.userId);
    })) ? true : false;
    return /*#__PURE__*/React__default["default"].createElement(ui_UserListItem, {
      checkBox: true,
      checked: selectedUsers[participant.userId] || isOperator,
      disabled: isOperator,
      isOperator: isOperator,
      onChange: function (event) {
        var _a;

        var modifiedSelectedUsers = tslib_es6.__assign(tslib_es6.__assign({}, selectedUsers), (_a = {}, _a[event.target.id] = event.target.checked, _a));

        if (!event.target.checked) {
          delete modifiedSelectedUsers[event.target.id];
        }

        setSelectedUsers(modifiedSelectedUsers);
      },
      user: participant,
      key: participant.userId
    });
  }))));
}

var OperatorList = function () {
  var _a, _b, _c;

  var _d = React.useState(false),
      showAdd = _d[0],
      setShowAdd = _d[1];

  var _e = React.useState(false),
      showMore = _e[0],
      setShowMore = _e[1];

  var state = useSendbirdStateContext();
  var currentUserId = (_a = state === null || state === void 0 ? void 0 : state.config) === null || _a === void 0 ? void 0 : _a.userId;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  var channel = OpenChannelSettings_context.useOpenChannelSettingsContext().channel;
  return /*#__PURE__*/React__default["default"].createElement("div", null, (_b = channel === null || channel === void 0 ? void 0 : channel.operators) === null || _b === void 0 ? void 0 : _b.slice(0, 10).map(function (operator) {
    return /*#__PURE__*/React__default["default"].createElement(OpenChannelSettings_components_ParticipantUI.UserListItem, {
      key: operator.userId,
      user: operator,
      currentUser: currentUserId,
      action: function (_a) {
        var actionRef = _a.actionRef;
        return currentUserId !== (operator === null || operator === void 0 ? void 0 : operator.userId) ? /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu["default"], {
          menuTrigger: function (toggleDropdown) {
            return /*#__PURE__*/React__default["default"].createElement(ui_IconButton, {
              className: "sendbird-openchannel-operator-list__menu",
              width: "32px",
              height: "32px",
              onClick: toggleDropdown
            }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
              width: "24px",
              height: "24px",
              type: ui_Icon.IconTypes.MORE,
              fillColor: ui_Icon.IconColors.CONTENT_INVERSE
            }));
          },
          menuItems: function (closeDropdown) {
            return /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItems, {
              parentRef: actionRef,
              closeDropdown: closeDropdown,
              openLeft: true
            }, /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
              onClick: function () {
                channel === null || channel === void 0 ? void 0 : channel.removeOperators([operator.userId]).then(function () {
                  closeDropdown();
                });
              }
            }, stringSet.OPEN_CHANNEL_SETTING__MODERATION__UNREGISTER_OPERATOR), /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
              onClick: function () {
                channel === null || channel === void 0 ? void 0 : channel.muteUser(operator).then(function () {
                  closeDropdown();
                });
              }
            }, stringSet.OPEN_CHANNEL_SETTING__MODERATION__MUTE), /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
              onClick: function () {
                channel === null || channel === void 0 ? void 0 : channel.banUser(operator).then(function () {
                  closeDropdown();
                });
              }
            }, stringSet.OPEN_CHANNEL_SETTING__MODERATION__BAN));
          }
        }) : null;
      }
    });
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-operator-list__footer"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Button["default"], {
    type: ui_Button.ButtonTypes.SECONDARY,
    size: ui_Button.ButtonSizes.SMALL,
    onClick: function () {
      setShowAdd(true);
    }
  }, stringSet.OPEN_CHANNEL_SETTINGS__OPERATORS__TITLE_ADD), ((_c = channel === null || channel === void 0 ? void 0 : channel.operators) === null || _c === void 0 ? void 0 : _c.length) > 10 && /*#__PURE__*/React__default["default"].createElement(ui_Button["default"], {
    type: ui_Button.ButtonTypes.SECONDARY,
    size: ui_Button.ButtonSizes.SMALL,
    onClick: function () {
      setShowMore(true);
    }
  }, stringSet.OPEN_CHANNEL_SETTINGS__OPERATORS__TITLE_ALL)), showMore && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(OperatorListModal, {
    onCancel: function () {
      setShowMore(false);
    }
  })), showAdd && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(AddOperatorsModal, {
    onCancel: function () {
      return setShowAdd(false);
    },
    onSubmit: function () {
      setShowAdd(false);
    }
  })));
};

function MutedParticipantsModal(_a) {
  var _b;

  var onCancel = _a.onCancel;

  var _c = React.useState([]),
      mutedUsers = _c[0],
      setMutedUsers = _c[1];

  var _d = React.useState(null),
      userListQuery = _d[0],
      setUserListQuery = _d[1];

  var channel = OpenChannelSettings_context.useOpenChannelSettingsContext().channel;
  var state = useSendbirdStateContext();
  var currentUserId = (_b = state === null || state === void 0 ? void 0 : state.config) === null || _b === void 0 ? void 0 : _b.userId;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  React.useEffect(function () {
    var mutedUserListQuery = channel === null || channel === void 0 ? void 0 : channel.createMutedUserListQuery({
      limit: 10
    });
    mutedUserListQuery.next().then(function (users) {
      setMutedUsers(users);
    });
    setUserListQuery(mutedUserListQuery);
  }, []);
  return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement(ui_Modal["default"], {
    isFullScreenOnMobile: true,
    hideFooter: true,
    onCancel: function () {
      return onCancel();
    },
    onSubmit: utils.noop,
    titleText: stringSet.OPEN_CHANNEL_SETTINGS__MUTED_MEMBERS__TITLE
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-more-members__popup-scroll",
    onScroll: function (e) {
      var hasNext = userListQuery.hasNext;
      var target = e.target;
      var fetchMore = target.clientHeight + target.scrollTop === target.scrollHeight;

      if (hasNext && fetchMore) {
        userListQuery.next().then(function (o) {
          setMutedUsers(tslib_es6.__spreadArray(tslib_es6.__spreadArray([], mutedUsers, true), o, true));
        });
      }
    }
  }, mutedUsers.map(function (mutedUser) {
    return /*#__PURE__*/React__default["default"].createElement(ui_UserListItem, {
      currentUser: currentUserId,
      user: mutedUser,
      key: mutedUser.userId,
      action: function (_a) {
        var actionRef = _a.actionRef;
        return (mutedUser === null || mutedUser === void 0 ? void 0 : mutedUser.userId) !== currentUserId ? /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu["default"], {
          menuTrigger: function (toggleDropdown) {
            return /*#__PURE__*/React__default["default"].createElement(ui_IconButton, {
              className: "sendbird-user-message__more__menu",
              width: "32px",
              height: "32px",
              onClick: toggleDropdown
            }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
              width: "24px",
              height: "24px",
              type: ui_Icon.IconTypes.MORE,
              fillColor: ui_Icon.IconColors.CONTENT_INVERSE
            }));
          },
          menuItems: function (closeDropdown) {
            return /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItems, {
              parentRef: actionRef,
              closeDropdown: closeDropdown,
              openLeft: true
            }, /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
              onClick: function () {
                channel === null || channel === void 0 ? void 0 : channel.unmuteUser(mutedUser).then(function () {
                  closeDropdown();
                  setMutedUsers(mutedUsers.filter(function (u) {
                    return u.userId !== mutedUser.userId;
                  }));
                });
              }
            }, stringSet.OPEN_CHANNEL_SETTING__MODERATION__UNMUTE));
          }
        }) : null;
      }
    });
  }))));
}

var MutedParticipantList = function () {
  var _a;

  var _b = React.useState([]),
      mutedUsers = _b[0],
      setMutedUsers = _b[1];

  var _c = React.useState(false),
      hasNext = _c[0],
      setHasNext = _c[1];

  var _d = React.useState(false),
      showModal = _d[0],
      setShowModal = _d[1];

  var channel = OpenChannelSettings_context.useOpenChannelSettingsContext().channel;
  var state = useSendbirdStateContext();
  var currentUserId = (_a = state === null || state === void 0 ? void 0 : state.config) === null || _a === void 0 ? void 0 : _a.userId;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  React.useEffect(function () {
    if (!channel) {
      setMutedUsers([]);
      return;
    }

    var mutedUserListQuery = channel === null || channel === void 0 ? void 0 : channel.createMutedUserListQuery({
      limit: 10
    });
    mutedUserListQuery.next().then(function (members) {
      setMutedUsers(members);
      setHasNext(mutedUserListQuery.hasNext);
    });
  }, [channel]);
  var refreshList = React.useCallback(function () {
    if (!channel) {
      setMutedUsers([]);
      return;
    }

    var mutedUserListQuery = channel === null || channel === void 0 ? void 0 : channel.createMutedUserListQuery({
      limit: 10
    });
    mutedUserListQuery.next().then(function (members) {
      setMutedUsers(members);
      setHasNext(mutedUserListQuery.hasNext);
    });
  }, [channel]);
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, mutedUsers.map(function (mutedUser) {
    return /*#__PURE__*/React__default["default"].createElement(OpenChannelSettings_components_ParticipantUI.UserListItem, {
      key: mutedUser.userId,
      user: mutedUser,
      currentUser: currentUserId,
      isOperator: channel === null || channel === void 0 ? void 0 : channel.isOperator(mutedUser.userId),
      action: function (_a) {
        var actionRef = _a.actionRef;
        return (mutedUser === null || mutedUser === void 0 ? void 0 : mutedUser.userId) !== currentUserId ? /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu["default"], {
          menuTrigger: function (toggleDropdown) {
            return /*#__PURE__*/React__default["default"].createElement(ui_IconButton, {
              className: "sendbird-user-message__more__menu",
              width: "32px",
              height: "32px",
              onClick: toggleDropdown
            }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
              width: "24px",
              height: "24px",
              type: ui_Icon.IconTypes.MORE,
              fillColor: ui_Icon.IconColors.CONTENT_INVERSE
            }));
          },
          menuItems: function (closeDropdown) {
            return /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItems, {
              closeDropdown: closeDropdown,
              openLeft: true,
              parentRef: actionRef
            }, /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
              onClick: function () {
                channel === null || channel === void 0 ? void 0 : channel.unmuteUser(mutedUser).then(function () {
                  refreshList();
                  closeDropdown();
                });
              }
            }, stringSet.OPEN_CHANNEL_SETTING__MODERATION__UNMUTE));
          }
        }) : null;
      }
    });
  }), mutedUsers && mutedUsers.length === 0 && /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-channel-settings__empty-list",
    type: ui_Label.LabelTypography.SUBTITLE_2,
    color: ui_Label.LabelColors.ONBACKGROUND_3
  }, stringSet.OPEN_CHANNEL_SETTINGS__MUTED_MEMBERS__NO_ONE), hasNext && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-channel-settings-muted-participant-list__footer"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Button["default"], {
    type: ui_Button.ButtonTypes.SECONDARY,
    size: ui_Button.ButtonSizes.SMALL,
    onClick: function () {
      setShowModal(true);
    }
  }, stringSet.OPEN_CHANNEL_SETTINGS__MUTED_MEMBERS__TITLE_ALL)), showModal && /*#__PURE__*/React__default["default"].createElement(MutedParticipantsModal, {
    onCancel: function () {
      setShowModal(false);
      refreshList();
    }
  }));
};

function BannedUsersModal(_a) {
  var _b;

  var onCancel = _a.onCancel;

  var _c = React.useState([]),
      bannedUsers = _c[0],
      setBannedUsers = _c[1];

  var _d = React.useState(null),
      userListQuery = _d[0],
      setUserListQuery = _d[1];

  var channel = OpenChannelSettings_context.useOpenChannelSettingsContext().channel;
  var state = useSendbirdStateContext();
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  var currentUserId = (_b = state === null || state === void 0 ? void 0 : state.config) === null || _b === void 0 ? void 0 : _b.userId;
  React.useEffect(function () {
    var bannedUserListQuery = channel === null || channel === void 0 ? void 0 : channel.createBannedUserListQuery();
    bannedUserListQuery.next().then(function (users) {
      setBannedUsers(users);
    });
    setUserListQuery(bannedUserListQuery);
  }, []);
  return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement(ui_Modal["default"], {
    hideFooter: true,
    isFullScreenOnMobile: true,
    onCancel: function () {
      return onCancel();
    },
    onSubmit: utils.noop,
    titleText: stringSet.OPEN_CHANNEL_SETTINGS__MUTED_MEMBERS__TITLE
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-more-members__popup-scroll",
    onScroll: function (e) {
      var hasNext = userListQuery.hasNext;
      var target = e.target;
      var fetchMore = target.clientHeight + target.scrollTop === target.scrollHeight;

      if (hasNext && fetchMore) {
        userListQuery.next().then(function (o) {
          setBannedUsers(tslib_es6.__spreadArray(tslib_es6.__spreadArray([], bannedUsers, true), o, true));
        });
      }
    }
  }, bannedUsers.map(function (bannedUser) {
    return /*#__PURE__*/React__default["default"].createElement(ui_UserListItem, {
      user: bannedUser,
      key: bannedUser.userId,
      action: function (_a) {
        var actionRef = _a.actionRef;
        return (bannedUser === null || bannedUser === void 0 ? void 0 : bannedUser.userId) !== currentUserId ? /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu["default"], {
          menuTrigger: function (toggleDropdown) {
            return /*#__PURE__*/React__default["default"].createElement(ui_IconButton, {
              className: "sendbird-user-message__more__menu",
              width: "32px",
              height: "32px",
              onClick: toggleDropdown
            }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
              width: "24px",
              height: "24px",
              type: ui_Icon.IconTypes.MORE,
              fillColor: ui_Icon.IconColors.CONTENT_INVERSE
            }));
          },
          menuItems: function (closeDropdown) {
            return /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItems, {
              parentRef: actionRef,
              closeDropdown: closeDropdown,
              openLeft: true
            }, /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
              onClick: function () {
                channel === null || channel === void 0 ? void 0 : channel.unbanUser(bannedUser).then(function () {
                  closeDropdown();
                  setBannedUsers(bannedUsers.filter(function (u) {
                    return u.userId !== bannedUser.userId;
                  }));
                });
              }
            }, stringSet.OPEN_CHANNEL_SETTING__MODERATION__UNBAN));
          }
        }) : null;
      }
    });
  }))));
}

var BannedUserList = function () {
  var _a;

  var _b = React.useState([]),
      bannedUsers = _b[0],
      setBannedUsers = _b[1];

  var _c = React.useState(false),
      hasNext = _c[0],
      setHasNext = _c[1];

  var _d = React.useState(false),
      showModal = _d[0],
      setShowModal = _d[1];

  var channel = OpenChannelSettings_context.useOpenChannelSettingsContext().channel;
  var state = useSendbirdStateContext();
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  var currentUserId = (_a = state === null || state === void 0 ? void 0 : state.config) === null || _a === void 0 ? void 0 : _a.userId;
  React.useEffect(function () {
    if (!channel) {
      setBannedUsers([]);
      return;
    }

    var bannedUserListQuery = channel === null || channel === void 0 ? void 0 : channel.createBannedUserListQuery();
    bannedUserListQuery.next().then(function (users) {
      setBannedUsers(users);
      setHasNext(bannedUserListQuery.hasNext);
    });
  }, [channel]);
  var refreshList = React.useCallback(function () {
    if (!channel) {
      setBannedUsers([]);
      return;
    }

    var bannedUserListQuery = channel === null || channel === void 0 ? void 0 : channel.createBannedUserListQuery();
    bannedUserListQuery.next().then(function (users) {
      setBannedUsers(users);
      setHasNext(bannedUserListQuery.hasNext);
    });
  }, [channel]);
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, bannedUsers.map(function (bannedUser) {
    return /*#__PURE__*/React__default["default"].createElement(OpenChannelSettings_components_ParticipantUI.UserListItem, {
      key: bannedUser.userId,
      user: bannedUser,
      isOperator: channel === null || channel === void 0 ? void 0 : channel.isOperator(bannedUser.userId),
      action: function (_a) {
        var actionRef = _a.actionRef;
        return (bannedUser === null || bannedUser === void 0 ? void 0 : bannedUser.userId) !== currentUserId ? /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu["default"], {
          menuTrigger: function (toggleDropdown) {
            return /*#__PURE__*/React__default["default"].createElement(ui_IconButton, {
              className: "sendbird-user-message__more__menu",
              width: "32px",
              height: "32px",
              onClick: toggleDropdown
            }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
              width: "24px",
              height: "24px",
              type: ui_Icon.IconTypes.MORE,
              fillColor: ui_Icon.IconColors.CONTENT_INVERSE
            }));
          },
          menuItems: function (closeDropdown) {
            return /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItems, {
              parentRef: actionRef,
              closeDropdown: closeDropdown,
              openLeft: true
            }, /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
              onClick: function () {
                channel === null || channel === void 0 ? void 0 : channel.unbanUser(bannedUser).then(function () {
                  closeDropdown();
                  refreshList();
                });
              }
            }, stringSet.OPEN_CHANNEL_SETTING__MODERATION__UNBAN));
          }
        }) : null;
      }
    });
  }), bannedUsers && bannedUsers.length === 0 && /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-channel-settings__empty-list",
    type: ui_Label.LabelTypography.SUBTITLE_2,
    color: ui_Label.LabelColors.ONBACKGROUND_3
  }, stringSet.OPEN_CHANNEL_SETTINGS__BANNED_MEMBERS__NO_ONE), hasNext && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-channel-settings-banned-user-list__footer"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Button["default"], {
    type: ui_Button.ButtonTypes.SECONDARY,
    size: ui_Button.ButtonSizes.SMALL,
    onClick: function () {
      setShowModal(true);
    }
  }, stringSet.OPEN_CHANNEL_SETTINGS__BANNED_MEMBERS__TITLE_ALL)), showModal && /*#__PURE__*/React__default["default"].createElement(BannedUsersModal, {
    onCancel: function () {
      setShowModal(false);
      refreshList();
    }
  }));
};

var copyToClipboard = function (text) {
  // @ts-ignore: Unreachable code error
  if (window.clipboardData && window.clipboardData.setData) {
    // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
    // @ts-ignore: Unreachable code error
    return window.clipboardData.setData('Text', text);
  }

  if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
    var textarea = document.createElement('textarea');
    textarea.textContent = text;
    textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in Microsoft Edge.

    document.body.appendChild(textarea);
    textarea.select();

    try {
      return document.execCommand('copy'); // Security exception may be thrown by some browsers.
    } catch (ex) {
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }

  return false;
};
var OperatorUI = function (_a) {
  var renderChannelProfile = _a.renderChannelProfile;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;

  var _b = OpenChannelSettings_context.useOpenChannelSettingsContext(),
      onCloseClick = _b.onCloseClick,
      channel = _b.channel;

  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-settings__header"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.H_2,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, stringSet.CHANNEL_SETTING__HEADER__TITLE), /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: "sendbird-openchannel-settings__close-icon",
    type: ui_Icon.IconTypes.CLOSE,
    height: "24px",
    width: "24px",
    onClick: function () {
      onCloseClick();
    }
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-settings__profile"
  }, (renderChannelProfile === null || renderChannelProfile === void 0 ? void 0 : renderChannelProfile()) || /*#__PURE__*/React__default["default"].createElement(OpenChannelSettings_components_OpenChannelProfile, null)), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-settings__url"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: "sendbird-openchannel-settings__copy-icon",
    type: ui_Icon.IconTypes.COPY,
    height: "22px",
    width: "22px",
    onClick: function () {
      copyToClipboard(channel === null || channel === void 0 ? void 0 : channel.url);
    }
  }), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-openchannel-settings__url-label",
    type: ui_Label.LabelTypography.CAPTION_2,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, stringSet.OPEN_CHANNEL_SETTINGS__OPERATOR_URL), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-openchannel-settings__url-value",
    type: ui_Label.LabelTypography.SUBTITLE_2
  }, channel === null || channel === void 0 ? void 0 : channel.url)), /*#__PURE__*/React__default["default"].createElement(ui_Accordion.AccordionGroup, null, /*#__PURE__*/React__default["default"].createElement(ui_Accordion["default"], {
    className: "sendbird-openchannel-settings__operators-list",
    id: "operators",
    renderTitle: function () {
      return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
        className: "sendbird-openchannel-settings__operator-accordion-icon",
        type: ui_Icon.IconTypes.OPERATOR,
        fillColor: ui_Icon.IconColors.PRIMARY,
        width: "24px",
        height: "24px"
      }), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
        type: ui_Label.LabelTypography.SUBTITLE_1,
        color: ui_Label.LabelColors.ONBACKGROUND_1
      }, stringSet.OPEN_CHANNEL_SETTINGS__OPERATORS_TITLE));
    },
    renderContent: function () {
      return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(OperatorList, null));
    }
  }), /*#__PURE__*/React__default["default"].createElement(ui_Accordion["default"], {
    className: "sendbird-channel-settings__operators-list",
    id: "participants",
    renderTitle: function () {
      return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
        type: ui_Icon.IconTypes.MEMBERS,
        fillColor: ui_Icon.IconColors.PRIMARY,
        width: 24,
        height: 24,
        className: "sendbird-openchannel-settings__operator-accordion-icon"
      }), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
        type: ui_Label.LabelTypography.SUBTITLE_1,
        color: ui_Label.LabelColors.ONBACKGROUND_1
      }, stringSet.OPEN_CHANNEL_SETTINGS__PARTICIPANTS_ACCORDION_TITLE));
    },
    renderContent: function () {
      return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(OpenChannelSettings_components_ParticipantUI.ParticipantList, {
        isOperatorView: true
      }));
    }
  }), /*#__PURE__*/React__default["default"].createElement(ui_Accordion["default"], {
    className: "sendbird-channel-settings__operators-list",
    id: "mutedMembers",
    renderTitle: function () {
      return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
        className: "sendbird-openchannel-settings__operator-accordion-icon",
        type: ui_Icon.IconTypes.MUTE,
        fillColor: ui_Icon.IconColors.PRIMARY,
        width: "24px",
        height: "24px"
      }), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
        type: ui_Label.LabelTypography.SUBTITLE_1,
        color: ui_Label.LabelColors.ONBACKGROUND_1
      }, stringSet.OPEN_CHANNEL_SETTINGS__MUTED_MEMBERS__TITLE));
    },
    renderContent: function () {
      return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(MutedParticipantList, null));
    }
  }), /*#__PURE__*/React__default["default"].createElement(ui_Accordion["default"], {
    className: "sendbird-channel-settings__operators-list",
    id: "bannedUsers",
    renderTitle: function () {
      return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
        className: "sendbird-openchannel-settings__operator-accordion-icon",
        type: ui_Icon.IconTypes.BAN,
        fillColor: ui_Icon.IconColors.PRIMARY,
        width: "24px",
        height: "24px"
      }), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
        type: ui_Label.LabelTypography.SUBTITLE_1,
        color: ui_Label.LabelColors.ONBACKGROUND_1
      }, stringSet.OPEN_CHANNEL_SETTINGS__BANNED_MEMBERS__TITLE));
    },
    renderContent: function () {
      return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(BannedUserList, null));
    }
  })), /*#__PURE__*/React__default["default"].createElement(DeleteChannel, null));
};

exports.OperatorUI = OperatorUI;
exports.copyToClipboard = copyToClipboard;
exports["default"] = OperatorUI;
//# sourceMappingURL=OperatorUI.js.map
