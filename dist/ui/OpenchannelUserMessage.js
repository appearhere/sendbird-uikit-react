import { a as _extends } from '../_rollupPluginBabelHelpers-fe256514.js';
import { a as __spreadArray, _ as __assign } from '../tslib.es6-75bd0528.js';
import React__default, { useContext, useRef, useState, useEffect } from 'react';
import { f as format } from '../index-229a0736.js';
import Avatar from './Avatar.js';
import ContextMenu, { MenuItems, MenuItem } from './ContextMenu.js';
import Icon, { IconTypes, IconColors } from './Icon.js';
import IconButton from './IconButton.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../index-f60cbf08.js';
import Loader from './Loader.js';
import UserProfile from './UserProfile.js';
import { a as UserProfileContext } from '../UserProfileContext-517994e3.js';
import { u as useLocalization } from '../LocalizationContext-e5f35d14.js';
import { c as copyToClipboard } from '../utils-8271be8c.js';
import { u as uuidv4 } from '../uuid-392016d0.js';
import { g as getSenderFromMessage, s as showMenuTrigger, i as isFineCopy, a as isFineEdit, b as isFineResend, c as isFineDelete, O as OpenChannelMobileMenu, d as checkIsPending, e as checkIsFailed } from '../index-f8bdb205.js';
import { u as useMediaQueryContext } from '../MediaQueryContext-0ce6633d.js';
import { u as useLongPress } from '../useLongPress-ee44c5c3.js';
import { d as isEditedMessage } from '../index-105a85f4.js';
import '../index-5dcd7e0f.js';
import './ImageRenderer.js';
import 'prop-types';
import 'react-dom';
import './SortByRow.js';
import '../utils/message/getOutgoingMessageState.js';
import '../stringSet-42c0e16e.js';
import '../sendbirdSelectors.js';
import '../topics-0560d548.js';
import '../utils-8a4a2ff6.js';
import './Button.js';
import '../useSendbirdStateContext.js';
import '../withSendbird.js';

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


  var _b = useLocalization(),
      stringSet = _b.stringSet,
      dateLocale = _b.dateLocale;

  var _c = useContext(UserProfileContext),
      disableUserProfile = _c.disableUserProfile,
      renderUserProfile = _c.renderUserProfile;

  var messageRef = useRef(null);
  var avatarRef = useRef(null);
  var contextMenuRef = useRef(null);
  var mobileMenuRef = useRef(null);

  var _d = useState({}),
      contextStyle = _d[0],
      setContextStyle = _d[1];

  var _e = useState(false),
      contextMenu = _e[0],
      setContextMenu = _e[1]; // consts


  var status = message === null || message === void 0 ? void 0 : message.sendingStatus;
  var isPending = checkIsPending(status);
  var isFailed = checkIsFailed(status);
  var sender = getSenderFromMessage(message); // place context menu top depending clientHeight of message component

  useEffect(function () {
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
  var onLongPress = useLongPress({
    onLongPress: function () {
      setContextMenu(true);
    }
  });
  var isMobile = useMediaQueryContext().isMobile;
  return /*#__PURE__*/React__default.createElement("div", {
    className: __spreadArray(__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-openchannel-user-message'], false).join(' '),
    ref: messageRef
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-user-message__left"
  }, !chainTop && /*#__PURE__*/React__default.createElement(ContextMenu, {
    menuTrigger: function (toggleDropdown) {
      return /*#__PURE__*/React__default.createElement(Avatar, {
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
    className: "sendbird-openchannel-user-message__right"
  }, !chainTop && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-user-message__right__top"
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-openchannel-user-message__right__top__sender-name",
    type: LabelTypography.CAPTION_2,
    color: isOperator ? LabelColors.SECONDARY_3 : LabelColors.ONBACKGROUND_2
  }, sender && (sender.friendName || sender.nickname || sender.userId)), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-openchannel-user-message__right__top__sent-at",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_3
  }, (message === null || message === void 0 ? void 0 : message.createdAt) && format(message === null || message === void 0 ? void 0 : message.createdAt, 'p', {
    locale: dateLocale
  }))), /*#__PURE__*/React__default.createElement("div", _extends({}, isMobile ? __assign({}, onLongPress) : {}, {
    className: "sendbird-openchannel-user-message__right__bottom",
    ref: mobileMenuRef
  }), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-openchannel-user-message__right__bottom__message",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_1
  }, message === null || message === void 0 ? void 0 : message.message, isEditedMessage(message) && /*#__PURE__*/React__default.createElement(Label, {
    key: uuidv4(),
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_2,
    calssName: "sendbird-openchannel-user-message-word"
  }, " ".concat(stringSet.MESSAGE_EDITED, " ")))), (isPending || isFailed) && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-user-message__right__tail"
  }, isPending && /*#__PURE__*/React__default.createElement(Loader, {
    width: "16px",
    height: "16px"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-openchannel-user-message__right__tail__pending",
    type: IconTypes.SPINNER,
    fillColor: IconColors.PRIMARY,
    width: "16px",
    height: "16px"
  })), isFailed && /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-openchannel-user-message__right__tail__failed",
    type: IconTypes.ERROR,
    fillColor: IconColors.ERROR,
    width: "16px",
    height: "16px"
  }))), !isMobile && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-user-message__context-menu",
    ref: contextMenuRef,
    style: contextStyle
  }, /*#__PURE__*/React__default.createElement(ContextMenu, {
    menuTrigger: function (toggleDropdown) {
      return showMenuTrigger({
        message: message,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default.createElement(IconButton, {
        className: "sendbird-openchannel-user-message__context-menu--icon",
        width: "32px",
        height: "32px",
        onClick: function () {
          toggleDropdown();
        }
      }, /*#__PURE__*/React__default.createElement(Icon, {
        type: IconTypes.MORE,
        fillColor: IconColors.CONTENT_INVERSE,
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
      }, isFineCopy({
        message: message,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default.createElement(MenuItem, {
        className: "sendbird-openchannel-user-message__context-menu__copy",
        onClick: function () {
          copyToClipboard(message.message);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__COPY), isFineEdit({
        message: message,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default.createElement(MenuItem, {
        className: "sendbird-openchannel-user-message__context-menu__edit",
        onClick: function () {
          if (disabled) {
            return;
          }

          showEdit(true);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__EDIT), isFineResend({
        message: message,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default.createElement(MenuItem, {
        className: "sendbird-openchannel-user-message__context-menu__resend",
        onClick: function () {
          resendMessage(message);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__RESEND), isFineDelete({
        message: message,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default.createElement(MenuItem, {
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
  })), contextMenu && /*#__PURE__*/React__default.createElement(OpenChannelMobileMenu, {
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
      copyToClipboard(message === null || message === void 0 ? void 0 : message.message);
    },
    resendMessage: function () {
      setContextMenu(false);
      resendMessage(message);
    }
  }));
}

export { OpenchannelUserMessage as default };
//# sourceMappingURL=OpenchannelUserMessage.js.map
