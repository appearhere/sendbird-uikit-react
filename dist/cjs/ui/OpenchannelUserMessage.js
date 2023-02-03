'use strict';

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-597f5cf8.js');
var tslib_es6 = require('../tslib.es6-d6068b10.js');
var React = require('react');
var index$1 = require('../index-5977bdd5.js');
var ui_Avatar = require('./Avatar.js');
var ui_ContextMenu = require('./ContextMenu.js');
var ui_Icon = require('./Icon.js');
var ui_IconButton = require('./IconButton.js');
var ui_Label = require('../index-4197d014.js');
var ui_Loader = require('./Loader.js');
var ui_UserProfile = require('./UserProfile.js');
var UserProfileContext = require('../UserProfileContext-fd00d1bd.js');
var LocalizationContext = require('../LocalizationContext-f4281153.js');
var utils = require('../utils-3e8b8da5.js');
var uuid = require('../uuid-2f4916c1.js');
var index = require('../index-4469abc4.js');
var MediaQueryContext = require('../MediaQueryContext-9a5566fc.js');
var useLongPress = require('../useLongPress-2f4ee82c.js');
var index$2 = require('../index-d05a5cae.js');
require('../index-d4bc012c.js');
require('./ImageRenderer.js');
require('prop-types');
require('react-dom');
require('./SortByRow.js');
require('../utils/message/getOutgoingMessageState.js');
require('../stringSet-2dfd148b.js');
require('../sendbirdSelectors.js');
require('../topics-085b5602.js');
require('../utils-a9158c72.js');
require('./Button.js');
require('../useSendbirdStateContext.js');
require('../withSendbird.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function OpenchannelUserMessage(_a) {
  var className = _a.className,
      message = _a.message,
      isOperator = _a.isOperator,
      userId = _a.userId,
      resendMessage = _a.resendMessage,
      disabled = _a.disabled,
      showEdit = _a.showEdit,
      showRemove = _a.showRemove,
      chainTop = _a.chainTop;

  if (!message || message.messageType !== 'user') {
    return null;
  } // hooks


  var _b = LocalizationContext.useLocalization(),
      stringSet = _b.stringSet,
      dateLocale = _b.dateLocale;

  var _c = React.useContext(UserProfileContext.UserProfileContext),
      disableUserProfile = _c.disableUserProfile,
      renderUserProfile = _c.renderUserProfile;

  var messageRef = React.useRef(null);
  var avatarRef = React.useRef(null);
  var contextMenuRef = React.useRef(null);
  var mobileMenuRef = React.useRef(null);

  var _d = React.useState({}),
      contextStyle = _d[0],
      setContextStyle = _d[1];

  var _e = React.useState(false),
      contextMenu = _e[0],
      setContextMenu = _e[1]; // consts


  var status = message === null || message === void 0 ? void 0 : message.sendingStatus;
  var isPending = index.checkIsPending(status);
  var isFailed = index.checkIsFailed(status);
  var sender = index.getSenderFromMessage(message); // place context menu top depending clientHeight of message component

  React.useEffect(function () {
    var _a;

    if (((_a = messageRef === null || messageRef === void 0 ? void 0 : messageRef.current) === null || _a === void 0 ? void 0 : _a.clientHeight) > 36) {
      setContextStyle({
        top: '8px '
      });
    } else {
      setContextStyle({
        top: '2px'
      });
    }
  }, [window.innerWidth]);
  var onLongPress = useLongPress.useLongPress({
    onLongPress: function () {
      setContextMenu(true);
    }
  });
  var isMobile = MediaQueryContext.useMediaQueryContext().isMobile;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-openchannel-user-message'], false).join(' '),
    ref: messageRef
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-user-message__left"
  }, !chainTop && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu["default"], {
    menuTrigger: function (toggleDropdown) {
      return /*#__PURE__*/React__default["default"].createElement(ui_Avatar["default"], {
        className: "sendbird-openchannel-user-message__left__avatar",
        src: sender.profileUrl || '',
        ref: avatarRef,
        width: "28px",
        height: "28px",
        onClick: function () {
          if (!disableUserProfile) {
            toggleDropdown();
          }
        }
      });
    },
    menuItems: function (closeDropdown) {
      return /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItems, {
        parentRef: avatarRef,
        parentContainRef: avatarRef,
        closeDropdown: closeDropdown,
        style: {
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      }, renderUserProfile ? renderUserProfile({
        user: sender,
        close: closeDropdown
      }) : /*#__PURE__*/React__default["default"].createElement(ui_UserProfile, {
        user: sender,
        onSuccess: closeDropdown,
        disableMessaging: true
      }));
    }
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-user-message__right"
  }, !chainTop && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-user-message__right__top"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-openchannel-user-message__right__top__sender-name",
    type: ui_Label.LabelTypography.CAPTION_2,
    color: isOperator ? ui_Label.LabelColors.SECONDARY_3 : ui_Label.LabelColors.ONBACKGROUND_2
  }, sender && (sender.friendName || sender.nickname || sender.userId)), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-openchannel-user-message__right__top__sent-at",
    type: ui_Label.LabelTypography.CAPTION_3,
    color: ui_Label.LabelColors.ONBACKGROUND_3
  }, (message === null || message === void 0 ? void 0 : message.createdAt) && index$1.format(message === null || message === void 0 ? void 0 : message.createdAt, 'p', {
    locale: dateLocale
  }))), /*#__PURE__*/React__default["default"].createElement("div", _rollupPluginBabelHelpers._extends({}, isMobile ? tslib_es6.__assign({}, onLongPress) : {}, {
    className: "sendbird-openchannel-user-message__right__bottom",
    ref: mobileMenuRef
  }), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-openchannel-user-message__right__bottom__message",
    type: ui_Label.LabelTypography.BODY_1,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, message === null || message === void 0 ? void 0 : message.message, index$2.isEditedMessage(message) && /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    key: uuid.uuidv4(),
    type: ui_Label.LabelTypography.BODY_1,
    color: ui_Label.LabelColors.ONBACKGROUND_2,
    calssName: "sendbird-openchannel-user-message-word"
  }, " ".concat(stringSet.MESSAGE_EDITED, " ")))), (isPending || isFailed) && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-user-message__right__tail"
  }, isPending && /*#__PURE__*/React__default["default"].createElement(ui_Loader, {
    width: "16px",
    height: "16px"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: "sendbird-openchannel-user-message__right__tail__pending",
    type: ui_Icon.IconTypes.SPINNER,
    fillColor: ui_Icon.IconColors.PRIMARY,
    width: "16px",
    height: "16px"
  })), isFailed && /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: "sendbird-openchannel-user-message__right__tail__failed",
    type: ui_Icon.IconTypes.ERROR,
    fillColor: ui_Icon.IconColors.ERROR,
    width: "16px",
    height: "16px"
  }))), !isMobile && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-user-message__context-menu",
    ref: contextMenuRef,
    style: contextStyle
  }, /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu["default"], {
    menuTrigger: function (toggleDropdown) {
      return index.showMenuTrigger({
        message: message,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default["default"].createElement(ui_IconButton, {
        className: "sendbird-openchannel-user-message__context-menu--icon",
        width: "32px",
        height: "32px",
        onClick: function () {
          toggleDropdown();
        }
      }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
        type: ui_Icon.IconTypes.MORE,
        fillColor: ui_Icon.IconColors.CONTENT_INVERSE,
        width: "24px",
        height: "24px"
      }));
    },
    menuItems: function (closeDropdown) {
      return /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItems, {
        parentRef: contextMenuRef,
        parentContainRef: contextMenuRef,
        closeDropdown: closeDropdown,
        openLeft: true
      }, index.isFineCopy({
        message: message,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
        className: "sendbird-openchannel-user-message__context-menu__copy",
        onClick: function () {
          utils.copyToClipboard(message.message);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__COPY), index.isFineEdit({
        message: message,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
        className: "sendbird-openchannel-user-message__context-menu__edit",
        onClick: function () {
          if (disabled) {
            return;
          }

          showEdit(true);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__EDIT), index.isFineResend({
        message: message,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
        className: "sendbird-openchannel-user-message__context-menu__resend",
        onClick: function () {
          resendMessage(message);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__RESEND), index.isFineDelete({
        message: message,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
        className: "sendbird-openchannel-user-message__context-menu__delete",
        onClick: function () {
          if (disabled) {
            return;
          }

          showRemove(true);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__DELETE));
    }
  })), contextMenu && /*#__PURE__*/React__default["default"].createElement(index.OpenChannelMobileMenu, {
    message: message,
    parentRef: mobileMenuRef,
    hideMenu: function () {
      setContextMenu(false);
    },
    showRemove: function () {
      setContextMenu(false);
      showRemove(true);
    },
    showEdit: function () {
      setContextMenu(false);
      showEdit(true);
    },
    copyToClipboard: function () {
      setContextMenu(false);
      utils.copyToClipboard(message === null || message === void 0 ? void 0 : message.message);
    },
    resendMessage: function () {
      setContextMenu(false);
      resendMessage(message);
    }
  }));
}

module.exports = OpenchannelUserMessage;
//# sourceMappingURL=OpenchannelUserMessage.js.map
