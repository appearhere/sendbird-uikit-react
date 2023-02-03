'use strict';

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-597f5cf8.js');
var tslib_es6 = require('../tslib.es6-d6068b10.js');
var React = require('react');
var index$1 = require('../index-5977bdd5.js');
var ui_Avatar = require('./Avatar.js');
var ui_ContextMenu = require('./ContextMenu.js');
var ui_Label = require('../index-4197d014.js');
var ui_Loader = require('./Loader.js');
var ui_Icon = require('./Icon.js');
var ui_IconButton = require('./IconButton.js');
var ui_TextButton = require('./TextButton.js');
var ui_UserProfile = require('./UserProfile.js');
var UserProfileContext = require('../UserProfileContext-fd00d1bd.js');
var LocalizationContext = require('../LocalizationContext-f4281153.js');
var index = require('../index-4469abc4.js');
var MediaQueryContext = require('../MediaQueryContext-9a5566fc.js');
var useLongPress = require('../useLongPress-2f4ee82c.js');
require('../index-d4bc012c.js');
require('./ImageRenderer.js');
require('../uuid-2f4916c1.js');
require('prop-types');
require('react-dom');
require('./SortByRow.js');
require('../index-d05a5cae.js');
require('../utils/message/getOutgoingMessageState.js');
require('../stringSet-2dfd148b.js');
require('../color-0fae7c8e.js');
require('../sendbirdSelectors.js');
require('../topics-085b5602.js');
require('../utils-a9158c72.js');
require('./Button.js');
require('../useSendbirdStateContext.js');
require('../withSendbird.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var checkFileType = function (fileUrl) {
  var audioFile = /(\.mp3)$/i;
  var gifFile = /(\.gif)$/i;

  if (audioFile.test(fileUrl)) {
    return ui_Icon.IconTypes.FILE_AUDIO;
  }

  if (gifFile.test(fileUrl)) {
    return ui_Icon.IconTypes.GIF;
  }

  return ui_Icon.IconTypes.FILE_DOCUMENT;
};
var truncate = function (fullStr, strLen) {
  if (fullStr === null || fullStr === undefined) return '';
  if (fullStr.length <= strLen) return fullStr;
  var separator = '...';
  var sepLen = separator.length;
  var charsToShow = strLen - sepLen;
  var frontChars = Math.ceil(charsToShow / 2);
  var backChars = Math.floor(charsToShow / 2);
  return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars);
};

function OpenchannelFileMessage(_a) {
  var className = _a.className,
      message = _a.message,
      isOperator = _a.isOperator,
      userId = _a.userId,
      disabled = _a.disabled,
      chainTop = _a.chainTop,
      showRemove = _a.showRemove,
      resendMessage = _a.resendMessage;
  var status = message === null || message === void 0 ? void 0 : message.sendingStatus;

  var _b = LocalizationContext.useLocalization(),
      dateLocale = _b.dateLocale,
      stringSet = _b.stringSet;

  var contextMenuRef = React.useRef(null);
  var mobileMenuRef = React.useRef(null);
  var avatarRef = React.useRef(null);

  var _c = React.useContext(UserProfileContext.UserProfileContext),
      disableUserProfile = _c.disableUserProfile,
      renderUserProfile = _c.renderUserProfile;

  var isMobile = MediaQueryContext.useMediaQueryContext().isMobile;

  var openFileUrl = function () {
    window.open(message.url);
  };

  var isPending = index.checkIsPending(status);
  var isFailed = index.checkIsFailed(status);
  var sender = index.getSenderFromMessage(message);

  var _d = React.useState(false),
      contextMenu = _d[0],
      setContextMenu = _d[1];

  var longPress = useLongPress.useLongPress({
    onLongPress: function () {
      if (isMobile) {
        setContextMenu(true);
      }
    },
    onClick: openFileUrl
  }, {
    delay: 300
  });
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-openchannel-file-message'], false).join(' '),
    ref: mobileMenuRef
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-file-message__left"
  }, !chainTop && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu["default"], {
    menuTrigger: function (toggleDropdown) {
      return /*#__PURE__*/React__default["default"].createElement(ui_Avatar["default"], {
        className: "sendbird-openchannel-file-message__left__avatar",
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
    className: "sendbird-openchannel-file-message__right"
  }, !chainTop && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-file-message__right__title"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-openchannel-file-message__right__title__sender-name",
    type: ui_Label.LabelTypography.CAPTION_2,
    color: isOperator ? ui_Label.LabelColors.SECONDARY_3 : ui_Label.LabelColors.ONBACKGROUND_2
  }, sender && (sender.friendName || sender.nickname || sender.userId)), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-openchannel-file-message__right__title__sent-at",
    type: ui_Label.LabelTypography.CAPTION_3,
    color: ui_Label.LabelColors.ONBACKGROUND_3
  }, (message === null || message === void 0 ? void 0 : message.createdAt) && index$1.format(message.createdAt, 'p', {
    locale: dateLocale
  }))), /*#__PURE__*/React__default["default"].createElement("div", _rollupPluginBabelHelpers._extends({
    className: "sendbird-openchannel-file-message__right__body"
  }, isMobile ? tslib_es6.__assign({}, longPress) : {}), checkFileType(message.url) && /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: "sendbird-openchannel-file-message__right__body__icon",
    type: checkFileType(message.url),
    fillColor: ui_Icon.IconColors.PRIMARY,
    width: "48px",
    height: "48px"
  }), /*#__PURE__*/React__default["default"].createElement(ui_TextButton, {
    className: "sendbird-openchannel-file-message__right__body__file-name",
    onClick: openFileUrl
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.BODY_1,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, truncate(message.name || message.url, 40)))), (isPending || isFailed) && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-file-message__right__tail"
  }, isPending && /*#__PURE__*/React__default["default"].createElement(ui_Loader, {
    width: "16px",
    height: "16px"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: "sendbird-openchannel-file-message__right__tail__pending",
    type: ui_Icon.IconTypes.SPINNER,
    fillColor: ui_Icon.IconColors.PRIMARY,
    width: "16px",
    height: "16px"
  })), isFailed && /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: "sendbird-openchannel-file-message__right__tail__failed",
    type: ui_Icon.IconTypes.ERROR,
    fillColor: ui_Icon.IconColors.ERROR,
    width: "16px",
    height: "16px"
  }))), !isMobile && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-file-message__context-menu",
    ref: contextMenuRef
  }, /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu["default"], {
    menuTrigger: function (toggleDropdown) {
      return index.showMenuTrigger({
        message: message,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default["default"].createElement(ui_IconButton, {
        className: "sendbird-openchannel-file-message__context-menu__icon",
        width: "32px",
        height: "32px",
        onClick: toggleDropdown
      }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
        type: ui_Icon.IconTypes.MORE,
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
      }, index.isFineResend({
        message: message,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
        onClick: function () {
          if (disabled) {
            return;
          }

          resendMessage(message);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__RESEND), index.isFineDelete({
        message: message,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
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
    hideMenu: function () {
      setContextMenu(false);
    },
    parentRef: mobileMenuRef,
    showRemove: function () {
      setContextMenu(false);
      showRemove(true);
    }
  }));
}

module.exports = OpenchannelFileMessage;
//# sourceMappingURL=OpenchannelFileMessage.js.map
