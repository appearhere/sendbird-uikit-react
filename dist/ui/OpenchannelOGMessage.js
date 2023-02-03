import { a as _extends } from '../_rollupPluginBabelHelpers-fe256514.js';
import { a as __spreadArray, _ as __assign } from '../tslib.es6-75bd0528.js';
import React__default, { useContext, useState, useRef, useMemo, useEffect } from 'react';
import { f as format } from '../index-229a0736.js';
import Avatar from './Avatar.js';
import ContextMenu, { MenuItems, MenuItem } from './ContextMenu.js';
import Icon, { IconTypes, IconColors } from './Icon.js';
import IconButton from './IconButton.js';
import ImageRenderer from './ImageRenderer.js';
import LinkLabel from './LinkLabel.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../index-f60cbf08.js';
import Loader from './Loader.js';
import UserProfile from './UserProfile.js';
import Word from './Word.js';
import { a as UserProfileContext } from '../UserProfileContext-517994e3.js';
import { u as uuidv4 } from '../uuid-392016d0.js';
import { c as copyToClipboard } from '../utils-8271be8c.js';
import { u as useLocalization } from '../LocalizationContext-e5f35d14.js';
import { g as getSenderFromMessage, s as showMenuTrigger, i as isFineCopy, a as isFineEdit, b as isFineResend, c as isFineDelete, O as OpenChannelMobileMenu, d as checkIsPending, e as checkIsFailed } from '../index-f8bdb205.js';
import useSendbirdStateContext from '../useSendbirdStateContext.js';
import { u as useMediaQueryContext } from '../MediaQueryContext-0ce6633d.js';
import { u as useLongPress } from '../useLongPress-ee44c5c3.js';
import '../index-5dcd7e0f.js';
import 'prop-types';
import 'react-dom';
import './SortByRow.js';
import '../index-105a85f4.js';
import '../utils/message/getOutgoingMessageState.js';
import '../stringSet-42c0e16e.js';
import '../sendbirdSelectors.js';
import '../topics-0560d548.js';
import '../utils-8a4a2ff6.js';
import './Button.js';
import './MentionLabel.js';
import '../withSendbird.js';

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

  var _e = useLocalization(),
      stringSet = _e.stringSet,
      dateLocale = _e.dateLocale;

  var _f = useContext(UserProfileContext),
      disableUserProfile = _f.disableUserProfile,
      renderUserProfile = _f.renderUserProfile;

  var _g = useState({}),
      contextStyle = _g[0],
      setContextStyle = _g[1];

  var _h = useState(false),
      contextMenu = _h[0],
      setContextMenu = _h[1];

  var onLongPress = useLongPress({
    onLongPress: function () {
      return setContextMenu(true);
    },
    onClick: openLink
  }, {
    delay: 300
  });
  var messageComponentRef = useRef(null);
  var contextMenuRef = useRef(null);
  var mobileMenuRef = useRef(null);
  var avatarRef = useRef(null);
  var isPending = checkIsPending(status);
  var isFailed = checkIsFailed(status);
  var sender = getSenderFromMessage(message);
  var isMobile = useMediaQueryContext().isMobile;
  var MemoizedMessageText = useMemo(function () {
    return function () {
      var wordClassName = 'sendbird-openchannel-og-message--word';
      var splitMessage = message.message.split(' ');
      var matchedMessage = splitMessage.map(function (word) {
        var _a, _b;

        return /*#__PURE__*/React__default.createElement(Word, {
          key: uuidv4(),
          word: word,
          message: message,
          isByMe: ((_a = message === null || message === void 0 ? void 0 : message.sender) === null || _a === void 0 ? void 0 : _a.userId) === ((_b = sdk === null || sdk === void 0 ? void 0 : sdk.currentUser) === null || _b === void 0 ? void 0 : _b.userId)
        });
      });

      if (message.updatedAt > 0) {
        matchedMessage.push( /*#__PURE__*/React__default.createElement(Label, {
          key: uuidv4(),
          className: wordClassName,
          type: LabelTypography.BODY_1,
          color: LabelColors.ONBACKGROUND_2
        }, stringSet.MESSAGE_EDITED));
      }

      return matchedMessage;
    };
  }, [message, message.updatedAt]); // place conxt menu top depending clientHeight of message component

  useEffect(function () {
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
  return /*#__PURE__*/React__default.createElement("div", {
    className: __spreadArray(__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-openchannel-og-message'], false).join(' '),
    ref: messageComponentRef
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-og-message__top"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-og-message__top__left"
  }, !chainTop && /*#__PURE__*/React__default.createElement(ContextMenu, {
    menuTrigger: function (toggleDropdown) {
      return /*#__PURE__*/React__default.createElement(Avatar, {
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
    className: "sendbird-openchannel-og-message__top__right"
  }, !chainTop && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-og-message__top__right__title"
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-openchannel-og-message__top__right__title__sender-name",
    type: LabelTypography.CAPTION_2,
    color: isOperator ? LabelColors.SECONDARY_3 : LabelColors.ONBACKGROUND_2
  }, sender && (sender.friendName || sender.nickname || sender.userId)), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-openchannel-og-message__top__right__title__sent-at",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_3
  }, (message === null || message === void 0 ? void 0 : message.createdAt) && format(message === null || message === void 0 ? void 0 : message.createdAt, 'p', {
    locale: dateLocale
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-og-message__top__right__description"
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-openchannel-og-message__top__right__description__message",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_1
  }, MemoizedMessageText()))), !isMobile && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-og-message__top__context-menu",
    ref: contextMenuRef,
    style: contextStyle
  }, /*#__PURE__*/React__default.createElement(ContextMenu, {
    menuTrigger: function (toggleDropdown) {
      return showMenuTrigger({
        message: message,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default.createElement(IconButton, {
        className: "sendbird-openchannel-og-message__top__context-menu--icon",
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
        className: "sendbird-openchannel-og-message__top__context-menu__copy",
        onClick: function () {
          copyToClipboard(message.message);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__COPY), isFineEdit({
        message: message,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default.createElement(MenuItem, {
        className: "sendbird-openchannel-og-message__top__context-menu__edit",
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
        className: "sendbird-openchannel-og-message__top__context-menu__resend",
        onClick: function () {
          resendMessage(message);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__RESEND), isFineDelete({
        message: message,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default.createElement(MenuItem, {
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
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-og-message__bottom"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-og-message__bottom__og-tag",
    ref: mobileMenuRef
  }, ogMetaData.url && /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-openchannel-og-message__bottom__og-tag__url",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, ogMetaData.url), ogMetaData.title && /*#__PURE__*/React__default.createElement(LinkLabel, {
    className: "sendbird-openchannel-og-message__bottom__og-tag__title",
    src: ogMetaData.url,
    type: LabelTypography.SUBTITLE_2,
    color: LabelColors.PRIMARY
  }, ogMetaData.title), ogMetaData.description && /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-openchannel-og-message__bottom__og-tag__description",
    type: LabelTypography.BODY_2,
    color: LabelColors.ONBACKGROUND_1
  }, ogMetaData.description), ogMetaData.url && /*#__PURE__*/React__default.createElement("div", _extends({
    className: "sendbird-openchannel-og-message__bottom__og-tag__thumbnail",
    role: "button",
    onClick: openLink,
    onKeyDown: openLink,
    tabIndex: 0
  }, isMobile ? __assign({}, onLongPress) : {}), defaultImage && /*#__PURE__*/React__default.createElement(ImageRenderer, {
    className: "sendbird-openchannel-og-message__bottom__og-tag__thumbnail__image",
    url: defaultImage.url || '',
    alt: defaultImage.alt || '',
    height: "189px",
    defaultComponent: /*#__PURE__*/React__default.createElement("div", {
      className: "sendbird-openchannel-og-message__bottom__og-tag__thumbnail__image--placeholder"
    }, /*#__PURE__*/React__default.createElement(Icon, {
      type: IconTypes.THUMBNAIL_NONE,
      width: "56px",
      height: "56px"
    }))
  }))), (isPending || isFailed) && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-og-message__top__right__tail"
  }, isPending && /*#__PURE__*/React__default.createElement(Loader, {
    width: "16px",
    height: "16px"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-openchannel-og-message__top__right__tail__pending",
    type: IconTypes.SPINNER,
    fillColor: IconColors.PRIMARY,
    width: "16px",
    height: "16px"
  })), isFailed && /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-openchannel-og-message__top__right__tail__failed",
    type: IconTypes.ERROR,
    fillColor: IconColors.ERROR,
    width: "16px",
    height: "16px"
  }))), contextMenu && /*#__PURE__*/React__default.createElement(OpenChannelMobileMenu, {
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

export { OpenchannelOGMessage as default };
//# sourceMappingURL=OpenchannelOGMessage.js.map
