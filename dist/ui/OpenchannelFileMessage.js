import { a as _extends } from '../_rollupPluginBabelHelpers-fe256514.js';
import { a as __spreadArray, _ as __assign } from '../tslib.es6-75bd0528.js';
import React__default, { useRef, useContext, useState } from 'react';
import { f as format } from '../index-229a0736.js';
import Avatar from './Avatar.js';
import ContextMenu, { MenuItems, MenuItem } from './ContextMenu.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../index-f60cbf08.js';
import Loader from './Loader.js';
import Icon, { IconTypes, IconColors } from './Icon.js';
import IconButton from './IconButton.js';
import TextButton from './TextButton.js';
import UserProfile from './UserProfile.js';
import { a as UserProfileContext } from '../UserProfileContext-517994e3.js';
import { u as useLocalization } from '../LocalizationContext-e5f35d14.js';
import { g as getSenderFromMessage, s as showMenuTrigger, b as isFineResend, c as isFineDelete, O as OpenChannelMobileMenu, d as checkIsPending, e as checkIsFailed } from '../index-f8bdb205.js';
import { u as useMediaQueryContext } from '../MediaQueryContext-0ce6633d.js';
import { u as useLongPress } from '../useLongPress-ee44c5c3.js';
import '../index-5dcd7e0f.js';
import './ImageRenderer.js';
import '../uuid-392016d0.js';
import 'prop-types';
import 'react-dom';
import './SortByRow.js';
import '../index-105a85f4.js';
import '../utils/message/getOutgoingMessageState.js';
import '../stringSet-42c0e16e.js';
import '../color-52d916b6.js';
import '../sendbirdSelectors.js';
import '../topics-0560d548.js';
import '../utils-8a4a2ff6.js';
import './Button.js';
import '../useSendbirdStateContext.js';
import '../withSendbird.js';

var checkFileType = function (fileUrl) {
  var audioFile = /(\.mp3)$/i;
  var gifFile = /(\.gif)$/i;

  if (audioFile.test(fileUrl)) {
    return IconTypes.FILE_AUDIO;
  }

  if (gifFile.test(fileUrl)) {
    return IconTypes.GIF;
  }

  return IconTypes.FILE_DOCUMENT;
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

  var _b = useLocalization(),
      dateLocale = _b.dateLocale,
      stringSet = _b.stringSet;

  var contextMenuRef = useRef(null);
  var mobileMenuRef = useRef(null);
  var avatarRef = useRef(null);

  var _c = useContext(UserProfileContext),
      disableUserProfile = _c.disableUserProfile,
      renderUserProfile = _c.renderUserProfile;

  var isMobile = useMediaQueryContext().isMobile;

  var openFileUrl = function () {
    window.open(message.url);
  };

  var isPending = checkIsPending(status);
  var isFailed = checkIsFailed(status);
  var sender = getSenderFromMessage(message);

  var _d = useState(false),
      contextMenu = _d[0],
      setContextMenu = _d[1];

  var longPress = useLongPress({
    onLongPress: function () {
      if (isMobile) {
        setContextMenu(true);
      }
    },
    onClick: openFileUrl
  }, {
    delay: 300
  });
  return /*#__PURE__*/React__default.createElement("div", {
    className: __spreadArray(__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-openchannel-file-message'], false).join(' '),
    ref: mobileMenuRef
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-file-message__left"
  }, !chainTop && /*#__PURE__*/React__default.createElement(ContextMenu, {
    menuTrigger: function (toggleDropdown) {
      return /*#__PURE__*/React__default.createElement(Avatar, {
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
      return /*#__PURE__*/React__default.createElement(MenuItems, {
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
      }) : /*#__PURE__*/React__default.createElement(UserProfile, {
        user: sender,
        onSuccess: closeDropdown,
        disableMessaging: true
      }));
    }
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-file-message__right"
  }, !chainTop && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-file-message__right__title"
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-openchannel-file-message__right__title__sender-name",
    type: LabelTypography.CAPTION_2,
    color: isOperator ? LabelColors.SECONDARY_3 : LabelColors.ONBACKGROUND_2
  }, sender && (sender.friendName || sender.nickname || sender.userId)), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-openchannel-file-message__right__title__sent-at",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_3
  }, (message === null || message === void 0 ? void 0 : message.createdAt) && format(message.createdAt, 'p', {
    locale: dateLocale
  }))), /*#__PURE__*/React__default.createElement("div", _extends({
    className: "sendbird-openchannel-file-message__right__body"
  }, isMobile ? __assign({}, longPress) : {}), checkFileType(message.url) && /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-openchannel-file-message__right__body__icon",
    type: checkFileType(message.url),
    fillColor: IconColors.PRIMARY,
    width: "48px",
    height: "48px"
  }), /*#__PURE__*/React__default.createElement(TextButton, {
    className: "sendbird-openchannel-file-message__right__body__file-name",
    onClick: openFileUrl
  }, /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_1
  }, truncate(message.name || message.url, 40)))), (isPending || isFailed) && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-file-message__right__tail"
  }, isPending && /*#__PURE__*/React__default.createElement(Loader, {
    width: "16px",
    height: "16px"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-openchannel-file-message__right__tail__pending",
    type: IconTypes.SPINNER,
    fillColor: IconColors.PRIMARY,
    width: "16px",
    height: "16px"
  })), isFailed && /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-openchannel-file-message__right__tail__failed",
    type: IconTypes.ERROR,
    fillColor: IconColors.ERROR,
    width: "16px",
    height: "16px"
  }))), !isMobile && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-file-message__context-menu",
    ref: contextMenuRef
  }, /*#__PURE__*/React__default.createElement(ContextMenu, {
    menuTrigger: function (toggleDropdown) {
      return showMenuTrigger({
        message: message,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default.createElement(IconButton, {
        className: "sendbird-openchannel-file-message__context-menu__icon",
        width: "32px",
        height: "32px",
        onClick: toggleDropdown
      }, /*#__PURE__*/React__default.createElement(Icon, {
        type: IconTypes.MORE,
        width: "24px",
        height: "24px"
      }));
    },
    menuItems: function (closeDropdown) {
      return /*#__PURE__*/React__default.createElement(MenuItems, {
        parentRef: contextMenuRef,
        parentContainRef: contextMenuRef,
        closeDropdown: closeDropdown,
        openLeft: true
      }, isFineResend({
        message: message,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default.createElement(MenuItem, {
        onClick: function () {
          if (disabled) {
            return;
          }

          resendMessage(message);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__RESEND), isFineDelete({
        message: message,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default.createElement(MenuItem, {
        onClick: function () {
          if (disabled) {
            return;
          }

          showRemove(true);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__DELETE));
    }
  })), contextMenu && /*#__PURE__*/React__default.createElement(OpenChannelMobileMenu, {
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

export { OpenchannelFileMessage as default };
//# sourceMappingURL=OpenchannelFileMessage.js.map
