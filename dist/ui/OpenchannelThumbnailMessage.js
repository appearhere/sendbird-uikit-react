import { a as _extends } from '../_rollupPluginBabelHelpers-fe256514.js';
import { a as __spreadArray, _ as __assign } from '../tslib.es6-75bd0528.js';
import React__default, { useContext, useState, useRef, useMemo, useEffect } from 'react';
import { f as format } from '../index-229a0736.js';
import { u as useLocalization } from '../LocalizationContext-e5f35d14.js';
import Avatar from './Avatar.js';
import ContextMenu, { MenuItems, MenuItem } from './ContextMenu.js';
import Icon, { IconColors, IconTypes } from './Icon.js';
import IconButton from './IconButton.js';
import ImageRenderer from './ImageRenderer.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../index-f60cbf08.js';
import Loader from './Loader.js';
import UserProfile from './UserProfile.js';
import { a as UserProfileContext } from '../UserProfileContext-517994e3.js';
import { g as getSenderFromMessage, s as showMenuTrigger, b as isFineResend, c as isFineDelete, O as OpenChannelMobileMenu, f as checkIsSent, d as checkIsPending, e as checkIsFailed } from '../index-f8bdb205.js';
import { u as useMediaQueryContext } from '../MediaQueryContext-0ce6633d.js';
import { u as useLongPress } from '../useLongPress-ee44c5c3.js';
import '../index-5dcd7e0f.js';
import '../stringSet-42c0e16e.js';
import '../uuid-392016d0.js';
import 'prop-types';
import 'react-dom';
import './SortByRow.js';
import '../index-105a85f4.js';
import '../utils/message/getOutgoingMessageState.js';
import '../sendbirdSelectors.js';
import '../topics-0560d548.js';
import '../utils-8a4a2ff6.js';
import './Button.js';
import '../useSendbirdStateContext.js';
import '../withSendbird.js';

var SUPPORTING_TYPES = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  UNSUPPORTED: 'UNSUPPORTED'
};
var SUPPORTED_MIMES = {
  IMAGE: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  VIDEO: ['video/mpeg', 'video/ogg', 'video/webm', 'video/mp4']
};
var getSupportingFileType = function (type) {
  if (SUPPORTED_MIMES.IMAGE.indexOf(type) >= 0) {
    return SUPPORTING_TYPES.IMAGE;
  }

  if (SUPPORTED_MIMES.VIDEO.indexOf(type) >= 0) {
    return SUPPORTING_TYPES.VIDEO;
  }

  return SUPPORTING_TYPES.UNSUPPORTED;
};

function OpenchannelThumbnailMessage(_a) {
  var _b;

  var className = _a.className,
      message = _a.message,
      isOperator = _a.isOperator,
      disabled = _a.disabled,
      userId = _a.userId,
      chainTop = _a.chainTop,
      onClick = _a.onClick,
      showRemove = _a.showRemove,
      resendMessage = _a.resendMessage;
  var type = message.type,
      url = message.url,
      thumbnails = message.thumbnails,
      localUrl = message.localUrl;
  var status = message === null || message === void 0 ? void 0 : message.sendingStatus;
  var thumbnailUrl = thumbnails && thumbnails.length > 0 && thumbnails[0].url || null;

  var _c = useLocalization(),
      stringSet = _c.stringSet,
      dateLocale = _c.dateLocale;

  var _d = useContext(UserProfileContext),
      disableUserProfile = _d.disableUserProfile,
      renderUserProfile = _d.renderUserProfile;

  var _e = useState(360),
      messageWidth = _e[0],
      setMessageWidth = _e[1];

  var _f = useState(false),
      contextMenu = _f[0],
      setContextMenu = _f[1];

  var messageRef = useRef(null);
  var mobileMenuRef = useRef(null);
  var contextMenuRef = useRef(null);
  var avatarRef = useRef(null);
  var onLongPress = useLongPress({
    onLongPress: function () {
      setContextMenu(true);
    },
    onClick: function () {
      onClick(true);
    }
  });
  var isMobile = useMediaQueryContext().isMobile;
  var memorizedThumbnailPlaceHolder = useMemo(function () {
    return function (type) {
      return function (_a) {
        var style = _a.style;
        return (
          /*#__PURE__*/
          // eslint-disable-line
          React__default.createElement("div", {
            style: style
          }, /*#__PURE__*/React__default.createElement(Icon, {
            type: type,
            fillColor: IconColors.ON_BACKGROUND_2,
            width: "56px",
            height: "56px"
          }))
        );
      };
    };
  }, []);
  var isMessageSent = checkIsSent(status);
  var isPending = checkIsPending(status);
  var isFailed = checkIsFailed(status);
  var sender = getSenderFromMessage(message);
  useEffect(function () {
    var _a;

    var thumbnailWidth = ((_a = messageRef === null || messageRef === void 0 ? void 0 : messageRef.current) === null || _a === void 0 ? void 0 : _a.clientWidth) - 80;
    setMessageWidth(thumbnailWidth > 360 ? 360 : thumbnailWidth);
  }, []);
  return /*#__PURE__*/React__default.createElement("div", {
    className: __spreadArray(__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-openchannel-thumbnail-message'], false).join(' '),
    ref: messageRef
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-thumbnail-message__left"
  }, !chainTop && /*#__PURE__*/React__default.createElement(ContextMenu, {
    menuTrigger: function (toggleDropdown) {
      return /*#__PURE__*/React__default.createElement(Avatar, {
        className: "sendbird-openchannel-thumbnail-message__left__avatar",
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
    className: "sendbird-openchannel-thumbnail-message__right"
  }, !chainTop && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-thumbnail-message__right__title"
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-openchannel-thumbnail-message__right__title__sender-name",
    type: LabelTypography.CAPTION_2,
    color: isOperator ? LabelColors.SECONDARY_3 : LabelColors.ONBACKGROUND_2
  }, sender && (sender.friendName || sender.nickname || sender.userId)), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-openchannel-thumbnail-message__right__title__sent-at",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_3
  }, (message === null || message === void 0 ? void 0 : message.createdAt) && format(message.createdAt, 'p', {
    locale: dateLocale
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-thumbnail-message__right__body",
    ref: mobileMenuRef
  }, /*#__PURE__*/React__default.createElement("div", _extends({
    className: "sendbird-openchannel-thumbnail-message__right__body__wrap",
    role: "button",
    onClick: function () {
      if (isMessageSent) {
        onClick(true);
      }
    },
    onKeyDown: function () {
      if (isMessageSent) {
        onClick(true);
      }
    },
    tabIndex: 0
  }, isMobile ? __assign({}, onLongPress) : {}), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-thumbnail-message__right__body__wrap__overlay"
  }), (_b = {}, _b[SUPPORTING_TYPES.VIDEO] = url || localUrl ? /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-thumbnail-message__right__body__wrap__video"
  }, thumbnailUrl ? /*#__PURE__*/React__default.createElement(ImageRenderer, {
    className: "sendbird-openchannel-thumbnail-message__right__body__wrap__video",
    url: thumbnailUrl,
    width: messageWidth,
    height: "270px",
    alt: "image",
    placeHolder: memorizedThumbnailPlaceHolder(IconTypes.PLAY)
  }) : /*#__PURE__*/React__default.createElement("video", {
    className: "sendbird-openchannel-thumbnail-message__right__body__wrap__video__video"
  }, /*#__PURE__*/React__default.createElement("source", {
    src: url || localUrl,
    type: type
  })), /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-openchannel-thumbnail-message__right__body__wrap__video__icon",
    type: IconTypes.PLAY,
    fillColor: IconColors.ON_BACKGROUND_2,
    width: "56px",
    height: "56px"
  })) : /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-openchannel-thumbnail-message__right__body__wrap__video--icon",
    type: IconTypes.PHOTO,
    fillColor: IconColors.ON_BACKGROUND_2,
    width: "56px",
    height: "56px"
  }), _b[SUPPORTING_TYPES.IMAGE] = url || localUrl ? /*#__PURE__*/React__default.createElement(ImageRenderer, {
    className: "sendbird-openchannel-thumbnail-message__right__body__wrap__image",
    url: thumbnailUrl || url || localUrl,
    alt: "image",
    width: messageWidth,
    height: "270px",
    placeHolder: memorizedThumbnailPlaceHolder(IconTypes.PHOTO)
  }) : /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-openchannel-thumbnail-message__right__body__wrap__image--icon",
    type: IconTypes.PHOTO,
    fillColor: IconColors.ON_BACKGROUND_2,
    width: "56px",
    height: "56px"
  }), _b[SUPPORTING_TYPES.UNSUPPORTED] = /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-openchannel-thumbnail-message__right__body__wrap__unknown",
    type: IconTypes.PHOTO,
    fillColor: IconColors.ON_BACKGROUND_2,
    width: "56px",
    height: "56px"
  }), _b)[getSupportingFileType(type)])), (isPending || isFailed) && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-thumbnail-message__right__tail"
  }, isPending && /*#__PURE__*/React__default.createElement(Loader, {
    width: "16px",
    height: "16px"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-openchannel-thumbnail-message__right__tail__pending",
    type: IconTypes.SPINNER,
    fillColor: IconColors.PRIMARY,
    width: "16px",
    height: "16px"
  })), isFailed && /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-openchannel-thumbnail-message__right__tail__failed",
    type: IconTypes.ERROR,
    fillColor: IconColors.ERROR,
    width: "16px",
    height: "16px"
  }))), !isMobile && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-thumbnail-message__context-menu",
    ref: contextMenuRef
  }, /*#__PURE__*/React__default.createElement(ContextMenu, {
    menuTrigger: function (toggleDropdown) {
      return showMenuTrigger({
        message: message,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default.createElement(IconButton, {
        className: "sendbird-openchannel-thumbnail-message__context-menu--icon",
        width: "32px",
        height: "32px",
        onClick: toggleDropdown
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
      }, isFineResend({
        message: message,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default.createElement(MenuItem, {
        onClick: function () {
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
    parentRef: mobileMenuRef,
    hideMenu: function () {
      setContextMenu(false);
    },
    showRemove: function () {
      setContextMenu(false);
      showRemove(true);
    },
    resendMessage: function () {
      setContextMenu(false);
      resendMessage(message);
    }
  }));
}

export { OpenchannelThumbnailMessage as default };
//# sourceMappingURL=OpenchannelThumbnailMessage.js.map
