'use strict';

var React = require('react');
var LocalizationContext = require('../../LocalizationContext-f4281153.js');
var ui_MessageInput = require('../../ui/MessageInput.js');
var OpenChannel_context = require('../../OpenChannelProvider-b1de2e4c.js');
require('../../stringSet-2dfd148b.js');
require('../../index-d4bc012c.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('react-dom/server');
require('prop-types');
require('../../const-28829306.js');
require('../../const-43cebab9.js');
require('../../ui/IconButton.js');
require('../../tslib.es6-d6068b10.js');
require('../../ui/Button.js');
require('../../index-4197d014.js');
require('../../ui/MentionUserLabel.js');
require('../../ui/Icon.js');
require('../../index-d05a5cae.js');
require('../../utils/message/getOutgoingMessageState.js');
require('../../index-5977bdd5.js');
require('../../UserProfileContext-fd00d1bd.js');
require('../../compareIds-5d186d0d.js');
require('../../topics-085b5602.js');
require('@sendbird/chat');
require('@sendbird/chat/openChannel');
require('../../uuid-2f4916c1.js');
require('../../useSendbirdStateContext.js');
require('../../withSendbird.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var MessageInputWrapper = function (props, ref) {
  var _a = OpenChannel_context.useOpenChannelContext(),
      currentOpenChannel = _a.currentOpenChannel,
      disabled = _a.disabled,
      handleSendMessage = _a.handleSendMessage,
      handleFileUpload = _a.handleFileUpload;

  var channel = currentOpenChannel;

  if (!channel) {
    return;
  }

  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  var value = props.value;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-openchannel-footer"
  }, /*#__PURE__*/React__default["default"].createElement(ui_MessageInput, {
    ref: ref,
    value: value,
    disabled: disabled,
    onSendMessage: handleSendMessage,
    onFileUpload: handleFileUpload,
    placeholder: disabled && stringSet.MESSAGE_INPUT__PLACE_HOLDER__DISABLED // add disabled because of muted state

  }));
};

var OpenChannelInput = /*#__PURE__*/React__default["default"].forwardRef(MessageInputWrapper);

module.exports = OpenChannelInput;
//# sourceMappingURL=OpenChannelInput.js.map
