'use strict';

var React = require('react');
var OpenChannel_context = require('../../OpenChannelProvider-b1de2e4c.js');
var OpenChannel_components_OpenChannelInput = require('./OpenChannelInput.js');
var OpenChannel_components_FrozenChannelNotification = require('./FrozenChannelNotification.js');
var OpenChannel_components_OpenChannelHeader = require('./OpenChannelHeader.js');
var ui_PlaceHolder = require('../../index-6b9230ae.js');
var OpenChannel_components_OpenChannelMessageList = require('./OpenChannelMessageList.js');
require('../../index-5977bdd5.js');
require('../../index-d4bc012c.js');
require('../../UserProfileContext-fd00d1bd.js');
require('prop-types');
require('../../tslib.es6-d6068b10.js');
require('../../compareIds-5d186d0d.js');
require('../../topics-085b5602.js');
require('@sendbird/chat');
require('@sendbird/chat/openChannel');
require('../../uuid-2f4916c1.js');
require('../../useSendbirdStateContext.js');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('../../LocalizationContext-f4281153.js');
require('../../stringSet-2dfd148b.js');
require('../../ui/MessageInput.js');
require('react-dom/server');
require('../../const-28829306.js');
require('../../const-43cebab9.js');
require('../../ui/IconButton.js');
require('../../ui/Button.js');
require('../../index-4197d014.js');
require('../../ui/MentionUserLabel.js');
require('../../ui/Icon.js');
require('../../index-d05a5cae.js');
require('../../utils/message/getOutgoingMessageState.js');
require('../../ui/Avatar.js');
require('../../ui/ImageRenderer.js');
require('../../MediaQueryContext-9a5566fc.js');
require('../../ui/Loader.js');
require('../../index-fb9d8ec0.js');
require('./OpenChannelMessage.js');
require('../../ui/OpenchannelUserMessage.js');
require('../../ui/ContextMenu.js');
require('react-dom');
require('../../ui/SortByRow.js');
require('../../ui/UserProfile.js');
require('../../sendbirdSelectors.js');
require('../../utils-a9158c72.js');
require('../../utils-3e8b8da5.js');
require('../../index-4469abc4.js');
require('../../useLongPress-2f4ee82c.js');
require('../../ui/OpenChannelAdminMessage.js');
require('../../ui/OpenchannelOGMessage.js');
require('../../ui/LinkLabel.js');
require('../../ui/Word.js');
require('../../ui/MentionLabel.js');
require('../../ui/OpenchannelThumbnailMessage.js');
require('../../ui/OpenchannelFileMessage.js');
require('../../ui/TextButton.js');
require('../../color-0fae7c8e.js');
require('../../ui/DateSeparator.js');
require('../../ui/FileViewer.js');
require('../../index-1b132096.js');
require('../../ui/Modal.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var COMPONENT_CLASS_NAME = 'sendbird-openchannel-conversation';

var OpenChannelUI = function (_a) {
  var renderMessage = _a.renderMessage,
      renderHeader = _a.renderHeader,
      renderInput = _a.renderInput,
      renderPlaceHolderEmptyList = _a.renderPlaceHolderEmptyList,
      renderPlaceHolderError = _a.renderPlaceHolderError,
      renderPlaceHolderLoading = _a.renderPlaceHolderLoading;

  var _b = OpenChannel_context.useOpenChannelContext(),
      currentOpenChannel = _b.currentOpenChannel,
      amIBanned = _b.amIBanned,
      loading = _b.loading,
      isInvalid = _b.isInvalid,
      messageInputRef = _b.messageInputRef,
      conversationScrollRef = _b.conversationScrollRef;

  if (!currentOpenChannel || !(currentOpenChannel === null || currentOpenChannel === void 0 ? void 0 : currentOpenChannel.url) || amIBanned) {
    return (renderPlaceHolderError === null || renderPlaceHolderError === void 0 ? void 0 : renderPlaceHolderError()) || /*#__PURE__*/React__default["default"].createElement("div", {
      className: COMPONENT_CLASS_NAME
    }, /*#__PURE__*/React__default["default"].createElement(ui_PlaceHolder.PlaceHolder, {
      type: ui_PlaceHolder.PlaceHolderTypes.NO_CHANNELS
    }));
  }

  if (loading) {
    return (renderPlaceHolderLoading === null || renderPlaceHolderLoading === void 0 ? void 0 : renderPlaceHolderLoading()) || /*#__PURE__*/React__default["default"].createElement("div", {
      className: COMPONENT_CLASS_NAME
    }, /*#__PURE__*/React__default["default"].createElement(ui_PlaceHolder.PlaceHolder, {
      type: ui_PlaceHolder.PlaceHolderTypes.LOADING
    }));
  }

  if (isInvalid) {
    return (renderPlaceHolderError === null || renderPlaceHolderError === void 0 ? void 0 : renderPlaceHolderError()) || /*#__PURE__*/React__default["default"].createElement("div", {
      className: COMPONENT_CLASS_NAME
    }, /*#__PURE__*/React__default["default"].createElement(ui_PlaceHolder.PlaceHolder, {
      type: ui_PlaceHolder.PlaceHolderTypes.WRONG
    }));
  }

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: COMPONENT_CLASS_NAME
  }, (renderHeader === null || renderHeader === void 0 ? void 0 : renderHeader()) || /*#__PURE__*/React__default["default"].createElement(OpenChannel_components_OpenChannelHeader, null), (currentOpenChannel === null || currentOpenChannel === void 0 ? void 0 : currentOpenChannel.isFrozen) && /*#__PURE__*/React__default["default"].createElement(OpenChannel_components_FrozenChannelNotification, null), /*#__PURE__*/React__default["default"].createElement(OpenChannel_components_OpenChannelMessageList, {
    ref: conversationScrollRef,
    renderMessage: renderMessage,
    renderPlaceHolderEmptyList: renderPlaceHolderEmptyList
  }), (renderInput === null || renderInput === void 0 ? void 0 : renderInput()) || /*#__PURE__*/React__default["default"].createElement(OpenChannel_components_OpenChannelInput, {
    ref: messageInputRef
  }));
};

module.exports = OpenChannelUI;
//# sourceMappingURL=OpenChannelUI.js.map
