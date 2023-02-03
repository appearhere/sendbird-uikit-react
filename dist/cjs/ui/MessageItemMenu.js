'use strict';

var React = require('react');
var ui_ContextMenu = require('./ContextMenu.js');
var ui_Icon = require('./Icon.js');
var ui_IconButton = require('./IconButton.js');
var index = require('../index-d05a5cae.js');
var LocalizationContext = require('../LocalizationContext-f4281153.js');
require('../tslib.es6-d6068b10.js');
require('react-dom');
require('./SortByRow.js');
require('../uuid-2f4916c1.js');
require('../index-4197d014.js');
require('prop-types');
require('../stringSet-2dfd148b.js');
require('../utils/message/getOutgoingMessageState.js');
require('../index-d4bc012c.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  var triggerRef = React.useRef(null);
  var containerRef = React.useRef(null);
  var showMenuItemCopy = index.isUserMessage(message);
  var showMenuItemEdit = index.isUserMessage(message) && index.isSentMessage(message) && isByMe;
  var showMenuItemResend = index.isFailedMessage(message) && (message === null || message === void 0 ? void 0 : message.isResendable) && isByMe;
  var showMenuItemDelete = !index.isPendingMessage(message) && isByMe;
  var showMenuItemOpenInChannel = onMoveToParentMessage !== null;
  /**
   * TODO: Manage timing issue
   * User delete pending message -> Sending message success
   */

  var isReplyTypeEnabled = !index.isFailedMessage(message) && !index.isPendingMessage(message) && ((_b = channel === null || channel === void 0 ? void 0 : channel.isGroupChannel) === null || _b === void 0 ? void 0 : _b.call(channel)) && !(channel === null || channel === void 0 ? void 0 : channel.isBroadcast);
  var showMenuItemReply = isReplyTypeEnabled && replyType === 'QUOTE_REPLY';
  var showMenuItemThread = isReplyTypeEnabled && replyType === 'THREAD' && !(message === null || message === void 0 ? void 0 : message.parentMessageId) && onReplyInThread;

  if (!(showMenuItemCopy || showMenuItemReply || showMenuItemThread || showMenuItemOpenInChannel || showMenuItemEdit || showMenuItemResend || showMenuItemDelete)) {
    return null;
  }

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName([className, 'sendbird-message-item-menu']),
    ref: containerRef
  }, /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu["default"], {
    menuTrigger: function (toggleDropdown) {
      return /*#__PURE__*/React__default["default"].createElement(ui_IconButton, {
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
      }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
        className: "sendbird-message-item-menu__trigger__icon",
        type: ui_Icon.IconTypes.MORE,
        fillColor: ui_Icon.IconColors.CONTENT_INVERSE,
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

      return /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItems, {
        className: "sendbird-message-item-menu__list",
        parentRef: triggerRef,
        parentContainRef: containerRef,
        closeDropdown: closeDropdown,
        openLeft: isByMe
      }, showMenuItemCopy && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
        className: "sendbird-message-item-menu__list__menu-item menu-item-copy",
        onClick: function () {
          index.copyToClipboard(message === null || message === void 0 ? void 0 : message.message);
          closeDropdown();
        }
      }, stringSet.MESSAGE_MENU__COPY), showMenuItemReply && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
        className: "sendbird-message-item-menu__list__menu-item menu-item-reply",
        onClick: function () {
          setQuoteMessage(message);
          closeDropdown();
        },
        disable: (message === null || message === void 0 ? void 0 : message.parentMessageId) > 0
      }, stringSet.MESSAGE_MENU__REPLY), showMenuItemThread && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
        className: "sendbird-message-item-menu__list__menu-item menu-item-thread",
        onClick: function () {
          onReplyInThread === null || onReplyInThread === void 0 ? void 0 : onReplyInThread({
            message: message
          });
          closeDropdown();
        }
      }, stringSet.MESSAGE_MENU__THREAD), showMenuItemOpenInChannel && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
        className: "sendbird-message-item-menu__list__menu-item menu-item-open-channel",
        onClick: function () {
          onMoveToParentMessage === null || onMoveToParentMessage === void 0 ? void 0 : onMoveToParentMessage();
          closeDropdown();
        }
      }, stringSet.MESSAGE_MENU__OPEN_IN_CHANNEL), showMenuItemEdit && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
        className: "sendbird-message-item-menu__list__menu-item menu-item-edit",
        onClick: function () {
          if (!disabled) {
            showEdit(true);
            closeDropdown();
          }
        }
      }, stringSet.MESSAGE_MENU__EDIT), showMenuItemResend && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
        className: "sendbird-message-item-menu__list__menu-item menu-item-resend",
        onClick: function () {
          if (!disabled) {
            resendMessage(message);
            closeDropdown();
          }
        }
      }, stringSet.MESSAGE_MENU__RESEND), showMenuItemDelete && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
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

module.exports = MessageItemMenu;
//# sourceMappingURL=MessageItemMenu.js.map
