'use strict';

var React = require('react');
var ui_Modal = require('./ui/Modal.js');
var ui_Button = require('./ui/Button.js');
var LocalizationContext = require('./LocalizationContext-f4281153.js');
var Thread_context = require('./ThreadProvider-5c14e997.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var RemoveMessage = function (props) {
  var _a;

  var onCancel = props.onCancel,
      onSubmit = props.onSubmit,
      message = props.message;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  var deleteMessage = Thread_context.useThreadContext().deleteMessage;
  return /*#__PURE__*/React__default["default"].createElement(ui_Modal["default"], {
    type: ui_Button.ButtonTypes.DANGER,
    disabled: ((_a = message === null || message === void 0 ? void 0 : message.threadInfo) === null || _a === void 0 ? void 0 : _a.replyCount) > 0,
    onCancel: onCancel,
    onSubmit: function () {
      deleteMessage(message).then(function () {
        onCancel === null || onCancel === void 0 ? void 0 : onCancel();
        onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit();
      });
    },
    submitText: stringSet.MESSAGE_MENU__DELETE,
    titleText: stringSet.MODAL__DELETE_MESSAGE__TITLE
  });
};

exports.RemoveMessage = RemoveMessage;
//# sourceMappingURL=RemoveMessageModal-4d250f7d.js.map
