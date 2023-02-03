'use strict';

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-597f5cf8.js');
var tslib_es6 = require('../tslib.es6-d6068b10.js');
var React = require('react');
var index$1 = require('../index-5977bdd5.js');
var ui_Avatar = require('./Avatar.js');
var ui_ContextMenu = require('./ContextMenu.js');
var ui_Icon = require('./Icon.js');
var ui_IconButton = require('./IconButton.js');
var ui_ImageRenderer = require('./ImageRenderer.js');
var ui_LinkLabel = require('./LinkLabel.js');
var ui_Label = require('../index-4197d014.js');
var ui_Loader = require('./Loader.js');
var ui_UserProfile = require('./UserProfile.js');
var ui_Word = require('./Word.js');
var UserProfileContext = require('../UserProfileContext-fd00d1bd.js');
var uuid = require('../uuid-2f4916c1.js');
var utils = require('../utils-3e8b8da5.js');
var LocalizationContext = require('../LocalizationContext-f4281153.js');
var index = require('../index-4469abc4.js');
var useSendbirdStateContext = require('../useSendbirdStateContext.js');
var MediaQueryContext = require('../MediaQueryContext-9a5566fc.js');
var useLongPress = require('../useLongPress-2f4ee82c.js');
require('../index-d4bc012c.js');
require('prop-types');
require('react-dom');
require('./SortByRow.js');
require('../index-d05a5cae.js');
require('../utils/message/getOutgoingMessageState.js');
require('../stringSet-2dfd148b.js');
require('../sendbirdSelectors.js');
require('../topics-085b5602.js');
require('../utils-a9158c72.js');
require('./Button.js');
require('./MentionLabel.js');
require('../withSendbird.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var checkOGIsEnalbed = function (message) {
  var ogMetaData = message.ogMetaData;

  if (!ogMetaData) {
    return false;
  }

  var url = ogMetaData.url;

  if (!url) {
    return false;
  }

  return true;
};

function OpenchannelOGMessage(_a) {
  var _b, _c, _d;

  var message = _a.message,
      isOperator = _a.isOperator,
      className = _a.className,
      disabled = _a.disabled,
      showEdit = _a.showEdit,
      showRemove = _a.showRemove,
      resendMessage = _a.resendMessage,
      chainTop = _a.chainTop,
      userId = _a.userId;

  if (!message || message.messageType !== 'user') {
    return null;
  }

  var openLink = function () {
    if (checkOGIsEnalbed(message)) {
      var url = ogMetaData.url;
      window.open(url);
    }
  };

  var status = message === null || message === void 0 ? void 0 : message.sendingStatus;
  var ogMetaData = message.ogMetaData;
  var defaultImage = ogMetaData.defaultImage;
  var sdk = (_d = (_c = (_b = useSendbirdStateContext === null || useSendbirdStateContext === void 0 ? void 0 : useSendbirdStateContext()) === null || _b === void 0 ? void 0 : _b.stores) === null || _c === void 0 ? void 0 : _c.sdkStore) === null || _d === void 0 ? void 0 : _d.sdk;

  var _e = LocalizationContext.useLocalization(),
      stringSet = _e.stringSet,
      dateLocale = _e.dateLocale;

  var _f = React.useContext(UserProfileContext.UserProfileContext),
      disableUserProfile = _f.disableUserProfile,
      renderUserProfile = _f.renderUserProfile;

  var _g = React.useState({}),
      contextStyle = _g[0],
      setContextStyle = _g[1];

  var _h = React.useState(false),
      contextMenu = _h[0],
      setContextMenu = _h[1];

  var onLongPress = useLongPress.useLongPress({
    onLongPress: function () {
      return setContextMenu(true);
    },
    onClick: openLink
  }, {
    delay: 300
  });
  var messageComponentRef = React.useRef(null);
  var contextMenuRef = React.useRef(null);
  var mobileMenuRef = React.useRef(null);
  var avatarRef = React.useRef(null);
  var isPending = index.checkIsPending(status);
  var isFailed = index.checkIsFailed(status);
  var sender = index.getSenderFromMessage(message);
  var isMobile = MediaQueryContext.useMediaQueryContext().isMobile;
  var MemoizedMessageText = React.useMemo(function () {
    return function () {
      var wordClassName = 'sendbird-openchannel-og-message--word';
      var splitMessage = message.message.split(' ');
      var matchedMessage = splitMessage.map(function (word) {
        var _a, _b;

        return /*#__PURE__*/React__default["default"].createElement(ui_Word, {
          key: uuid.uuidv4(),
          word: word,
          message: message,
          isByMe: ((_a = message === null || message === void 0 ? void 0 : message.sender) === null || _a === void 0 ? void 0 : _a.userId) === ((_b = sdk === null || sdk === void 0 ? void 0 : sdk.currentUser) === null || _b === void 0 ? void 0 : _b.userId)
        });
      });

      if (message.updatedAt > 0) {
        matchedMessage.push( /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
          key: uuid.uuidv4(),
          className: wordClassName,
          type: ui_Label.LabelTypography.BODY_1,
          color: ui_Label.LabelColors.ONBACKGROUND_2
        }, stringSet.MESSAGE_EDITED));
      }

      return matchedMessage;
    };
  }, [message, message.updatedAt]); // place conxt menu top depending clientHeight of message component

  React.useEffect(function () {
    var _a;

    if (((_a = messageComponentRef === null || messageComponentRef === void 0 ? void 0 : messageComponentRef.current) === null || _a === void 0 ? void 0 : _a.clientHeight) > 36) {
      setContextStyle({
        top: '8px '
      });
    } else {
      setContextStyle({
        top: '2px'
      });
    }
  }, [window.innerWidth]);
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-openchannel-og-message'], false).join(' '),
    ref: messageComponentRef
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-og-message__top"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-og-message__top__left"
  }, !chainTop && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu["default"], {
    menuTrigger: function (toggleDropdown) {
      return /*#__PURE__*/React__default["default"].createElement(ui_Avatar["default"], {
        className: "sendbird-openchannel-og-message__top__left__avatar",
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
    className: "sendbird-openchannel-og-message__top__right"
  }, !chainTop && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-og-message__top__right__title"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-openchannel-og-message__top__right__title__sender-name",
    type: ui_Label.LabelTypography.CAPTION_2,
    color: isOperator ? ui_Label.LabelColors.SECONDARY_3 : ui_Label.LabelColors.ONBACKGROUND_2
  }, sender && (sender.friendName || sender.nickname || sender.userId)), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-openchannel-og-message__top__right__title__sent-at",
    type: ui_Label.LabelTypography.CAPTION_3,
    color: ui_Label.LabelColors.ONBACKGROUND_3
  }, (message === null || message === void 0 ? void 0 : message.createdAt) && index$1.format(message === null || message === void 0 ? void 0 : message.createdAt, 'p', {
    locale: dateLocale
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-og-message__top__right__description"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-openchannel-og-message__top__right__description__message",
    type: ui_Label.LabelTypography.BODY_1,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, MemoizedMessageText()))), !isMobile && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-og-message__top__context-menu",
    ref: contextMenuRef,
    style: contextStyle
  }, /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu["default"], {
    menuTrigger: function (toggleDropdown) {
      return index.showMenuTrigger({
        message: message,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default["default"].createElement(ui_IconButton, {
        className: "sendbird-openchannel-og-message__top__context-menu--icon",
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
        className: "sendbird-openchannel-og-message__top__context-menu__copy",
        onClick: function () {
          utils.copyToClipboard(message.message);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__COPY), index.isFineEdit({
        message: message,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
        className: "sendbird-openchannel-og-message__top__context-menu__edit",
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
        className: "sendbird-openchannel-og-message__top__context-menu__resend",
        onClick: function () {
          resendMessage(message);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__RESEND), index.isFineDelete({
        message: message,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
        className: "sendbird-openchannel-og-message__top__context-menu__delete",
        onClick: function () {
          if (disabled) {
            return;
          }

          showRemove(true);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__DELETE));
    }
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-og-message__bottom"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-og-message__bottom__og-tag",
    ref: mobileMenuRef
  }, ogMetaData.url && /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-openchannel-og-message__bottom__og-tag__url",
    type: ui_Label.LabelTypography.CAPTION_3,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, ogMetaData.url), ogMetaData.title && /*#__PURE__*/React__default["default"].createElement(ui_LinkLabel["default"], {
    className: "sendbird-openchannel-og-message__bottom__og-tag__title",
    src: ogMetaData.url,
    type: ui_Label.LabelTypography.SUBTITLE_2,
    color: ui_Label.LabelColors.PRIMARY
  }, ogMetaData.title), ogMetaData.description && /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-openchannel-og-message__bottom__og-tag__description",
    type: ui_Label.LabelTypography.BODY_2,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, ogMetaData.description), ogMetaData.url && /*#__PURE__*/React__default["default"].createElement("div", _rollupPluginBabelHelpers._extends({
    className: "sendbird-openchannel-og-message__bottom__og-tag__thumbnail",
    role: "button",
    onClick: openLink,
    onKeyDown: openLink,
    tabIndex: 0
  }, isMobile ? tslib_es6.__assign({}, onLongPress) : {}), defaultImage && /*#__PURE__*/React__default["default"].createElement(ui_ImageRenderer, {
    className: "sendbird-openchannel-og-message__bottom__og-tag__thumbnail__image",
    url: defaultImage.url || '',
    alt: defaultImage.alt || '',
    height: "189px",
    defaultComponent: /*#__PURE__*/React__default["default"].createElement("div", {
      className: "sendbird-openchannel-og-message__bottom__og-tag__thumbnail__image--placeholder"
    }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
      type: ui_Icon.IconTypes.THUMBNAIL_NONE,
      width: "56px",
      height: "56px"
    }))
  }))), (isPending || isFailed) && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-og-message__top__right__tail"
  }, isPending && /*#__PURE__*/React__default["default"].createElement(ui_Loader, {
    width: "16px",
    height: "16px"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: "sendbird-openchannel-og-message__top__right__tail__pending",
    type: ui_Icon.IconTypes.SPINNER,
    fillColor: ui_Icon.IconColors.PRIMARY,
    width: "16px",
    height: "16px"
  })), isFailed && /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: "sendbird-openchannel-og-message__top__right__tail__failed",
    type: ui_Icon.IconTypes.ERROR,
    fillColor: ui_Icon.IconColors.ERROR,
    width: "16px",
    height: "16px"
  }))), contextMenu && /*#__PURE__*/React__default["default"].createElement(index.OpenChannelMobileMenu, {
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

module.exports = OpenchannelOGMessage;
//# sourceMappingURL=OpenchannelOGMessage.js.map
