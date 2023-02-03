'use strict';

var React = require('react');
var CreateOpenChannel_components_CreateOpenChannelUI = require('./CreateOpenChannel/components/CreateOpenChannelUI.js');
var CreateOpenChannel_context = require('./CreateOpenChannel/context.js');
require('./LocalizationContext-f4281153.js');
require('./stringSet-2dfd148b.js');
require('./index-d4bc012c.js');
require('./ui/Avatar.js');
require('./tslib.es6-d6068b10.js');
require('./ui/ImageRenderer.js');
require('./ui/Icon.js');
require('prop-types');
require('./uuid-2f4916c1.js');
require('./ui/Button.js');
require('./index-4197d014.js');
require('./ui/Modal.js');
require('react-dom');
require('./index-1b132096.js');
require('./ui/IconButton.js');
require('./MediaQueryContext-9a5566fc.js');
require('./ui/Input.js');
require('./ui/TextButton.js');
require('./color-0fae7c8e.js');
require('./useSendbirdStateContext.js');
require('./withSendbird.js');
require('./_rollupPluginBabelHelpers-597f5cf8.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function CreateOpenChannel(_a) {
  var className = _a.className,
      onCreateChannel = _a.onCreateChannel,
      onBeforeCreateChannel = _a.onBeforeCreateChannel,
      closeModal = _a.closeModal,
      renderHeader = _a.renderHeader,
      renderProfileInput = _a.renderProfileInput;
  return /*#__PURE__*/React__default["default"].createElement(CreateOpenChannel_context.CreateOpenChannelProvider, {
    className: className,
    onCreateChannel: onCreateChannel,
    onBeforeCreateChannel: onBeforeCreateChannel
  }, /*#__PURE__*/React__default["default"].createElement(CreateOpenChannel_components_CreateOpenChannelUI, {
    closeModal: closeModal,
    renderHeader: renderHeader,
    renderProfileInput: renderProfileInput
  }));
}

module.exports = CreateOpenChannel;
//# sourceMappingURL=CreateOpenChannel.js.map
