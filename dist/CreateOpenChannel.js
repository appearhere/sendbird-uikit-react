import React__default from 'react';
import CreateOpenChannelUI from './CreateOpenChannel/components/CreateOpenChannelUI.js';
import { CreateOpenChannelProvider } from './CreateOpenChannel/context.js';
import './LocalizationContext-e5f35d14.js';
import './stringSet-42c0e16e.js';
import './index-5dcd7e0f.js';
import './ui/Avatar.js';
import './tslib.es6-75bd0528.js';
import './ui/ImageRenderer.js';
import './ui/Icon.js';
import 'prop-types';
import './uuid-392016d0.js';
import './ui/Button.js';
import './index-f60cbf08.js';
import './ui/Modal.js';
import 'react-dom';
import './index-5ab5d8fe.js';
import './ui/IconButton.js';
import './MediaQueryContext-0ce6633d.js';
import './ui/Input.js';
import './ui/TextButton.js';
import './color-52d916b6.js';
import './useSendbirdStateContext.js';
import './withSendbird.js';
import './_rollupPluginBabelHelpers-fe256514.js';

function CreateOpenChannel(_a) {
  var className = _a.className,
      onCreateChannel = _a.onCreateChannel,
      onBeforeCreateChannel = _a.onBeforeCreateChannel,
      closeModal = _a.closeModal,
      renderHeader = _a.renderHeader,
      renderProfileInput = _a.renderProfileInput;
  return /*#__PURE__*/React__default.createElement(CreateOpenChannelProvider, {
    className: className,
    onCreateChannel: onCreateChannel,
    onBeforeCreateChannel: onBeforeCreateChannel
  }, /*#__PURE__*/React__default.createElement(CreateOpenChannelUI, {
    closeModal: closeModal,
    renderHeader: renderHeader,
    renderProfileInput: renderProfileInput
  }));
}

export { CreateOpenChannel as default };
//# sourceMappingURL=CreateOpenChannel.js.map
