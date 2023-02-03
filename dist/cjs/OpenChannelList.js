'use strict';

var React = require('react');
var OpenChannelList_components_OpenChannelListUI = require('./OpenChannelList/components/OpenChannelListUI.js');
var OpenChannelList_context = require('./OpenChannelListProvider-31d16d2a.js');
require('./OpenChannelList/components/OpenChannelPreview.js');
require('./ui/Avatar.js');
require('./tslib.es6-d6068b10.js');
require('./ui/ImageRenderer.js');
require('./ui/Icon.js');
require('prop-types');
require('./uuid-2f4916c1.js');
require('./index-4197d014.js');
require('./stringSet-2dfd148b.js');
require('./index-6b9230ae.js');
require('./LocalizationContext-f4281153.js');
require('./index-d4bc012c.js');
require('./ui/Loader.js');
require('./ui/IconButton.js');
require('./CreateOpenChannel.js');
require('./CreateOpenChannel/components/CreateOpenChannelUI.js');
require('./ui/Button.js');
require('./ui/Modal.js');
require('react-dom');
require('./index-1b132096.js');
require('./MediaQueryContext-9a5566fc.js');
require('./ui/Input.js');
require('./ui/TextButton.js');
require('./color-0fae7c8e.js');
require('./CreateOpenChannel/context.js');
require('./useSendbirdStateContext.js');
require('./withSendbird.js');
require('./_rollupPluginBabelHelpers-597f5cf8.js');
require('./topics-085b5602.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
  return /*#__PURE__*/React__default["default"].createElement(OpenChannelList_context.OpenChannelListProvider, {
    className: className,
    queries: queries,
    onChannelSelected: onChannelSelected
  }, /*#__PURE__*/React__default["default"].createElement(OpenChannelList_components_OpenChannelListUI, {
    renderHeader: renderHeader,
    renderChannelPreview: renderChannelPreview,
    renderPlaceHolderEmpty: renderPlaceHolderEmpty,
    renderPlaceHolderError: renderPlaceHolderError,
    renderPlaceHolderLoading: renderPlaceHolderLoading
  }));
}

module.exports = OpenChannelList;
//# sourceMappingURL=OpenChannelList.js.map
