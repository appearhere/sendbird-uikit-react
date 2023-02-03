import React__default, { useContext } from 'react';
import { a as LocalizationContext } from '../../LocalizationContext-e5f35d14.js';
import MessageInput from '../../ui/MessageInput.js';
import { u as useOpenChannelContext } from '../../OpenChannelProvider-104ab716.js';
import '../../stringSet-42c0e16e.js';
import '../../index-5dcd7e0f.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import 'react-dom/server';
import 'prop-types';
import '../../const-fcaed0ae.js';
import '../../const-03d71a8a.js';
import '../../ui/IconButton.js';
import '../../tslib.es6-75bd0528.js';
import '../../ui/Button.js';
import '../../index-f60cbf08.js';
import '../../ui/MentionUserLabel.js';
import '../../ui/Icon.js';
import '../../index-105a85f4.js';
import '../../utils/message/getOutgoingMessageState.js';
import '../../index-229a0736.js';
import '../../UserProfileContext-517994e3.js';
import '../../compareIds-fd8fd31e.js';
import '../../topics-0560d548.js';
import '@sendbird/chat';
import '@sendbird/chat/openChannel';
import '../../uuid-392016d0.js';
import '../../useSendbirdStateContext.js';
import '../../withSendbird.js';

var MessageInputWrapper = function (props, ref) {
  var _a = useOpenChannelContext(),
      currentOpenChannel = _a.currentOpenChannel,
      disabled = _a.disabled,
      handleSendMessage = _a.handleSendMessage,
      handleFileUpload = _a.handleFileUpload;

  var channel = currentOpenChannel;

  if (!channel) {
    return;
  }

  var stringSet = useContext(LocalizationContext).stringSet;
  var value = props.value;
  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-footer"
  }, /*#__PURE__*/React__default.createElement(MessageInput, {
    ref: ref,
    value: value,
    disabled: disabled,
    onSendMessage: handleSendMessage,
    onFileUpload: handleFileUpload,
    placeholder: disabled && stringSet.MESSAGE_INPUT__PLACE_HOLDER__DISABLED // add disabled because of muted state

  }));
};

var OpenChannelInput = /*#__PURE__*/React__default.forwardRef(MessageInputWrapper);

export { OpenChannelInput as default };
//# sourceMappingURL=OpenChannelInput.js.map
