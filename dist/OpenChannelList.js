import React__default from 'react';
import OpenChannelListUI from './OpenChannelList/components/OpenChannelListUI.js';
import { O as OpenChannelListProvider } from './OpenChannelListProvider-267577c1.js';
import './OpenChannelList/components/OpenChannelPreview.js';
import './ui/Avatar.js';
import './tslib.es6-75bd0528.js';
import './ui/ImageRenderer.js';
import './ui/Icon.js';
import 'prop-types';
import './uuid-392016d0.js';
import './index-f60cbf08.js';
import './stringSet-42c0e16e.js';
import './index-88c5a220.js';
import './LocalizationContext-e5f35d14.js';
import './index-5dcd7e0f.js';
import './ui/Loader.js';
import './ui/IconButton.js';
import './CreateOpenChannel.js';
import './CreateOpenChannel/components/CreateOpenChannelUI.js';
import './ui/Button.js';
import './ui/Modal.js';
import 'react-dom';
import './index-5ab5d8fe.js';
import './MediaQueryContext-0ce6633d.js';
import './ui/Input.js';
import './ui/TextButton.js';
import './color-52d916b6.js';
import './CreateOpenChannel/context.js';
import './useSendbirdStateContext.js';
import './withSendbird.js';
import './_rollupPluginBabelHelpers-fe256514.js';
import './topics-0560d548.js';

function OpenChannelList(_a) {
  var // provider
  className = _a.className,
      queries = _a.queries,
      onChannelSelected = _a.onChannelSelected,
      // ui
  renderHeader = _a.renderHeader,
      renderChannelPreview = _a.renderChannelPreview,
      renderPlaceHolderEmpty = _a.renderPlaceHolderEmpty,
      renderPlaceHolderError = _a.renderPlaceHolderError,
      renderPlaceHolderLoading = _a.renderPlaceHolderLoading;
  return /*#__PURE__*/React__default.createElement(OpenChannelListProvider, {
    className: className,
    queries: queries,
    onChannelSelected: onChannelSelected
  }, /*#__PURE__*/React__default.createElement(OpenChannelListUI, {
    renderHeader: renderHeader,
    renderChannelPreview: renderChannelPreview,
    renderPlaceHolderEmpty: renderPlaceHolderEmpty,
    renderPlaceHolderError: renderPlaceHolderError,
    renderPlaceHolderLoading: renderPlaceHolderLoading
  }));
}

export { OpenChannelList as default };
//# sourceMappingURL=OpenChannelList.js.map
