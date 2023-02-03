import React__default, { useContext } from 'react';
import Modal from './ui/Modal.js';
import { ButtonTypes } from './ui/Button.js';
import { a as LocalizationContext } from './LocalizationContext-e5f35d14.js';
import { u as useThreadContext } from './ThreadProvider-5ccbbc4b.js';

var RemoveMessage = function (props) {
  var _a;

  var onCancel = props.onCancel,
      onSubmit = props.onSubmit,
      message = props.message;
  var stringSet = useContext(LocalizationContext).stringSet;
  var deleteMessage = useThreadContext().deleteMessage;
  return /*#__PURE__*/React__default.createElement(Modal, {
    type: ButtonTypes.DANGER,
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

export { RemoveMessage as R };
//# sourceMappingURL=RemoveMessageModal-6f5adba5.js.map
