import React__default, { useContext } from 'react';
import Modal from '../../ui/Modal.js';
import { ButtonTypes } from '../../ui/Button.js';
import { a as LocalizationContext } from '../../LocalizationContext-e5f35d14.js';
import { u as useChannelContext } from '../../ChannelProvider-3f08837d.js';
import 'react-dom';
import '../../index-5ab5d8fe.js';
import '../../ui/Icon.js';
import 'prop-types';
import '../../ui/IconButton.js';
import '../../tslib.es6-75bd0528.js';
import '../../index-f60cbf08.js';
import '../../stringSet-42c0e16e.js';
import '../../MediaQueryContext-0ce6633d.js';
import '../../index-5dcd7e0f.js';
import '../../UserProfileContext-517994e3.js';
import '../../useSendbirdStateContext.js';
import '../../withSendbird.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import '../../index-229a0736.js';
import '../../topics-0560d548.js';
import '../../index-105a85f4.js';
import '../../utils/message/getOutgoingMessageState.js';
import '../../compareIds-fd8fd31e.js';
import '../../const-03d71a8a.js';
import '@sendbird/chat/groupChannel';
import '../../uuid-392016d0.js';
import '@sendbird/chat/message';
import '../../ui/ContextMenu.js';
import '../../ui/SortByRow.js';
import '../../ui/ReactionButton.js';
import '../../ui/ImageRenderer.js';

var RemoveMessage = function (props) {
  var _a;

  var onCancel = props.onCancel,
      message = props.message;
  var stringSet = useContext(LocalizationContext).stringSet;
  var deleteMessage = useChannelContext().deleteMessage;
  return /*#__PURE__*/React__default.createElement(Modal, {
    type: ButtonTypes.DANGER,
    disabled: ((_a = message === null || message === void 0 ? void 0 : message.threadInfo) === null || _a === void 0 ? void 0 : _a.replyCount) > 0,
    onCancel: onCancel,
    onSubmit: function () {
      deleteMessage(message).then(function () {
        onCancel();
      });
    },
    submitText: stringSet.MESSAGE_MENU__DELETE,
    titleText: stringSet.MODAL__DELETE_MESSAGE__TITLE
  });
};

export { RemoveMessage as default };
//# sourceMappingURL=RemoveMessageModal.js.map
