'use strict';

var React = require('react');
var ui_ContextMenu = require('./ui/ContextMenu.js');
var useSendbirdStateContext = require('./useSendbirdStateContext.js');
var LocalizationContext = require('./LocalizationContext-f4281153.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var OpenChannelMessageStatusTypes = {
  NONE: 'none',
  PENDING: 'pending',
  FAILED: 'failed',
  CANCELED: 'canceled',
  SUCCEEDED: 'succeeded'
};
var getSenderFromMessage = function (message) {
  // @ts-ignore
  return message.sender || message._sender;
};
var checkIsSent = function (status) {
  return status === OpenChannelMessageStatusTypes.SUCCEEDED;
};
var checkIsPending = function (status) {
  return status === OpenChannelMessageStatusTypes.PENDING;
};
var checkIsFailed = function (status) {
  return status === OpenChannelMessageStatusTypes.FAILED;
};
var checkIsByMe = function (message, userId) {
  return getSenderFromMessage(message).userId === userId;
};
var isFineCopy = function (_a) {
  var _b;

  var message = _a.message;
  return (message === null || message === void 0 ? void 0 : message.messageType) === 'user' && ((_b = message === null || message === void 0 ? void 0 : message.message) === null || _b === void 0 ? void 0 : _b.length) > 0;
};
var isFineResend = function (_a) {
  var message = _a.message,
      status = _a.status,
      userId = _a.userId;
  return checkIsByMe(message, userId) && checkIsFailed(status) // @ts-ignore
  && (message === null || message === void 0 ? void 0 : message.isResendable());
};
var isFineEdit = function (_a) {
  var _b;

  var message = _a.message,
      status = _a.status,
      userId = _a.userId;
  return checkIsByMe(message, userId) && checkIsSent(status) && ((_b = message === null || message === void 0 ? void 0 : message.isUserMessage) === null || _b === void 0 ? void 0 : _b.call(message));
};
var isFineDelete = function (_a) {
  var message = _a.message,
      userId = _a.userId;
  return checkIsByMe(message, userId);
};
var isFineDownload = function (_a) {
  var _b;

  var message = _a.message,
      status = _a.status;

  if (((_b = message === null || message === void 0 ? void 0 : message.isFileMessage) === null || _b === void 0 ? void 0 : _b.call(message)) && checkIsSent(status)) {
    return true;
  }

  return false;
};
var showMenuTrigger = function (props) {
  var message = props.message,
      status = props.status,
      userId = props.userId; // @ts-ignore

  if (message.messageType === 'user') {
    return isFineDelete({
      message: message,
      status: status,
      userId: userId
    }) || isFineEdit({
      message: message,
      status: status,
      userId: userId
    }) // @ts-ignore
    || isFineCopy({
      message: message,
      status: status,
      userId: userId
    }) || isFineResend({
      message: message,
      status: status,
      userId: userId
    });
  } else {
    return isFineDelete({
      message: message,
      status: status,
      userId: userId
    }) || isFineResend({
      message: message,
      status: status,
      userId: userId
    });
  }
};

var OpenChannelMobileMenu = function (props) {
  var _a, _b;

  var message = props.message,
      parentRef = props.parentRef,
      resendMessage = props.resendMessage,
      showEdit = props.showEdit,
      showRemove = props.showRemove,
      copyToClipboard = props.copyToClipboard,
      hideMenu = props.hideMenu;
  var userMessage = message;
  var status = message === null || message === void 0 ? void 0 : message.sendingStatus;
  var stringSet = LocalizationContext.useLocalization().stringSet;
  var userId = (_b = (_a = useSendbirdStateContext()) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.userId;
  var fileMessage = message;
  return /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu["default"], {
    isOpen: true,
    menuItems: function () {
      return /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItems, {
        className: "sendbird-openchannel__mobile-menu",
        parentRef: parentRef,
        parentContainRef: parentRef,
        closeDropdown: hideMenu
      }, isFineCopy({
        message: userMessage,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
        className: "sendbird-openchannel-og-message__top__context-menu__copy",
        onClick: function () {
          copyToClipboard();
        }
      }, /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, stringSet.CONTEXT_MENU_DROPDOWN__COPY)), isFineEdit({
        message: message,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
        className: "sendbird-openchannel-og-message__top__context-menu__edit",
        onClick: function () {
          showEdit();
        }
      }, /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, stringSet.CONTEXT_MENU_DROPDOWN__EDIT)), isFineResend({
        message: message,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
        onClick: function () {
          resendMessage();
        }
      }, /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, stringSet.CONTEXT_MENU_DROPDOWN__RESEND)), isFineDelete({
        message: message,
        userId: userId,
        status: status
      }) && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
        onClick: function () {
          showRemove();
        }
      }, /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, stringSet.CONTEXT_MENU_DROPDOWN__DELETE)), isFineDownload({
        message: message,
        status: status
      }) && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
        onClick: function () {
          hideMenu();
        }
      }, /*#__PURE__*/React__default["default"].createElement("a", {
        className: "sendbird-openchannel__mobile-menu-hyperlink",
        rel: "noopener noreferrer",
        href: fileMessage === null || fileMessage === void 0 ? void 0 : fileMessage.url,
        target: "_blank"
      }, stringSet.CONTEXT_MENU_DROPDOWN__SAVE)));
    }
  });
};

exports.OpenChannelMobileMenu = OpenChannelMobileMenu;
exports.checkIsFailed = checkIsFailed;
exports.checkIsPending = checkIsPending;
exports.checkIsSent = checkIsSent;
exports.getSenderFromMessage = getSenderFromMessage;
exports.isFineCopy = isFineCopy;
exports.isFineDelete = isFineDelete;
exports.isFineEdit = isFineEdit;
exports.isFineResend = isFineResend;
exports.showMenuTrigger = showMenuTrigger;
//# sourceMappingURL=index-4469abc4.js.map
