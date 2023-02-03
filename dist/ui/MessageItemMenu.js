import React__default, { useContext, useRef } from 'react';
import ContextMenu, { MenuItems, MenuItem } from './ContextMenu.js';
import Icon, { IconTypes, IconColors } from './Icon.js';
import IconButton from './IconButton.js';
import { r as isUserMessage, s as isSentMessage, u as isFailedMessage, v as isPendingMessage, h as getClassName, w as copyToClipboard } from '../index-105a85f4.js';
import { a as LocalizationContext } from '../LocalizationContext-e5f35d14.js';
import '../tslib.es6-75bd0528.js';
import 'react-dom';
import './SortByRow.js';
import '../uuid-392016d0.js';
import '../index-f60cbf08.js';
import 'prop-types';
import '../stringSet-42c0e16e.js';
import '../utils/message/getOutgoingMessageState.js';
import '../index-5dcd7e0f.js';

function MessageItemMenu(_a) {
  var _b;

  var className = _a.className,
      message = _a.message,
      channel = _a.channel,
      _c = _a.isByMe,
      isByMe = _c === void 0 ? false : _c,
      _d = _a.disabled,
      disabled = _d === void 0 ? false : _d,
      replyType = _a.replyType,
      _e = _a.disableDeleteMessage,
      disableDeleteMessage = _e === void 0 ? null : _e,
      showEdit = _a.showEdit,
      showRemove = _a.showRemove,
      resendMessage = _a.resendMessage,
      setQuoteMessage = _a.setQuoteMessage,
      setSupposedHover = _a.setSupposedHover,
      onReplyInThread = _a.onReplyInThread,
      _f = _a.onMoveToParentMessage,
      onMoveToParentMessage = _f === void 0 ? null : _f;
  var stringSet = useContext(LocalizationContext).stringSet;
  var triggerRef = useRef(null);
  var containerRef = useRef(null);
  var showMenuItemCopy = isUserMessage(message);
  var showMenuItemEdit = isUserMessage(message) && isSentMessage(message) && isByMe;
  var showMenuItemResend = isFailedMessage(message) && (message === null || message === void 0 ? void 0 : message.isResendable) && isByMe;
  var showMenuItemDelete = !isPendingMessage(message) && isByMe;
  var showMenuItemOpenInChannel = onMoveToParentMessage !== null;
  /**
   * TODO: Manage timing issue
   * User delete pending message -> Sending message success
   */

  var isReplyTypeEnabled = !isFailedMessage(message) && !isPendingMessage(message) && ((_b = channel === null || channel === void 0 ? void 0 : channel.isGroupChannel) === null || _b === void 0 ? void 0 : _b.call(channel)) && !(channel === null || channel === void 0 ? void 0 : channel.isBroadcast);
  var showMenuItemReply = isReplyTypeEnabled && replyType === 'QUOTE_REPLY';
  var showMenuItemThread = isReplyTypeEnabled && replyType === 'THREAD' && !(message === null || message === void 0 ? void 0 : message.parentMessageId) && onReplyInThread;

  if (!(showMenuItemCopy || showMenuItemReply || showMenuItemThread || showMenuItemOpenInChannel || showMenuItemEdit || showMenuItemResend || showMenuItemDelete)) {
    return null;
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: getClassName([className, 'sendbird-message-item-menu']),
    ref: containerRef
  }, /*#__PURE__*/React__default.createElement(ContextMenu, {
    menuTrigger: function (toggleDropdown) {
      return /*#__PURE__*/React__default.createElement(IconButton, {
        className: "sendbird-message-item-menu__trigger",
        ref: triggerRef,
        width: "32px",
        height: "32px",
        onClick: function () {
          toggleDropdown();
          setSupposedHover(true);
        },
        onBlur: function () {
          setSupposedHover(false);
        }
      }, /*#__PURE__*/React__default.createElement(Icon, {
        className: "sendbird-message-item-menu__trigger__icon",
        type: IconTypes.MORE,
        fillColor: IconColors.CONTENT_INVERSE,
        width: "24px",
        height: "24px"
      }));
    },
    menuItems: function (close) {
      var _a;

      var closeDropdown = function () {
        close();
        setSupposedHover(false);
      };

      return /*#__PURE__*/React__default.createElement(MenuItems, {
        className: "sendbird-message-item-menu__list",
        parentRef: triggerRef,
        parentContainRef: containerRef,
        closeDropdown: closeDropdown,
        openLeft: isByMe
      }, showMenuItemCopy && /*#__PURE__*/React__default.createElement(MenuItem, {
        className: "sendbird-message-item-menu__list__menu-item menu-item-copy",
        onClick: function () {
          copyToClipboard(message === null || message === void 0 ? void 0 : message.message);
          closeDropdown();
        }
      }, stringSet.MESSAGE_MENU__COPY), showMenuItemReply && /*#__PURE__*/React__default.createElement(MenuItem, {
        className: "sendbird-message-item-menu__list__menu-item menu-item-reply",
        onClick: function () {
          setQuoteMessage(message);
          closeDropdown();
        },
        disable: (message === null || message === void 0 ? void 0 : message.parentMessageId) > 0
      }, stringSet.MESSAGE_MENU__REPLY), showMenuItemThread && /*#__PURE__*/React__default.createElement(MenuItem, {
        className: "sendbird-message-item-menu__list__menu-item menu-item-thread",
        onClick: function () {
          onReplyInThread === null || onReplyInThread === void 0 ? void 0 : onReplyInThread({
            message: message
          });
          closeDropdown();
        }
      }, stringSet.MESSAGE_MENU__THREAD), showMenuItemOpenInChannel && /*#__PURE__*/React__default.createElement(MenuItem, {
        className: "sendbird-message-item-menu__list__menu-item menu-item-open-channel",
        onClick: function () {
          onMoveToParentMessage === null || onMoveToParentMessage === void 0 ? void 0 : onMoveToParentMessage();
          closeDropdown();
        }
      }, stringSet.MESSAGE_MENU__OPEN_IN_CHANNEL), showMenuItemEdit && /*#__PURE__*/React__default.createElement(MenuItem, {
        className: "sendbird-message-item-menu__list__menu-item menu-item-edit",
        onClick: function () {
          if (!disabled) {
            showEdit(true);
            closeDropdown();
          }
        }
      }, stringSet.MESSAGE_MENU__EDIT), showMenuItemResend && /*#__PURE__*/React__default.createElement(MenuItem, {
        className: "sendbird-message-item-menu__list__menu-item menu-item-resend",
        onClick: function () {
          if (!disabled) {
            resendMessage(message);
            closeDropdown();
          }
        }
      }, stringSet.MESSAGE_MENU__RESEND), showMenuItemDelete && /*#__PURE__*/React__default.createElement(MenuItem, {
        className: "sendbird-message-item-menu__list__menu-item menu-item-delete",
        onClick: function () {
          if (!disabled) {
            showRemove(true);
            closeDropdown();
          }
        },
        disable: typeof disableDeleteMessage === 'boolean' ? disableDeleteMessage : ((_a = message === null || message === void 0 ? void 0 : message.threadInfo) === null || _a === void 0 ? void 0 : _a.replyCount) > 0
      }, stringSet.MESSAGE_MENU__DELETE));
    }
  }));
}

export { MessageItemMenu as default };
//# sourceMappingURL=MessageItemMenu.js.map
