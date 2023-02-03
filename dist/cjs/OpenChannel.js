'use strict';

var React = require('react');
var OpenChannel_components_OpenChannelUI = require('./OpenChannel/components/OpenChannelUI.js');
var OpenChannel_context = require('./OpenChannelProvider-b1de2e4c.js');
require('./OpenChannel/components/OpenChannelInput.js');
require('./LocalizationContext-f4281153.js');
require('./stringSet-2dfd148b.js');
require('./index-d4bc012c.js');
require('./ui/MessageInput.js');
require('./_rollupPluginBabelHelpers-597f5cf8.js');
require('react-dom/server');
require('prop-types');
require('./const-28829306.js');
require('./const-43cebab9.js');
require('./ui/IconButton.js');
require('./tslib.es6-d6068b10.js');
require('./ui/Button.js');
require('./index-4197d014.js');
require('./ui/MentionUserLabel.js');
require('./ui/Icon.js');
require('./index-d05a5cae.js');
require('./utils/message/getOutgoingMessageState.js');
require('./OpenChannel/components/FrozenChannelNotification.js');
require('./OpenChannel/components/OpenChannelHeader.js');
require('./ui/Avatar.js');
require('./ui/ImageRenderer.js');
require('./uuid-2f4916c1.js');
require('./MediaQueryContext-9a5566fc.js');
require('./index-6b9230ae.js');
require('./ui/Loader.js');
require('./OpenChannel/components/OpenChannelMessageList.js');
require('./index-fb9d8ec0.js');
require('./index-5977bdd5.js');
require('./OpenChannel/components/OpenChannelMessage.js');
require('./ui/OpenchannelUserMessage.js');
require('./ui/ContextMenu.js');
require('react-dom');
require('./ui/SortByRow.js');
require('./ui/UserProfile.js');
require('./UserProfileContext-fd00d1bd.js');
require('./sendbirdSelectors.js');
require('./topics-085b5602.js');
require('./utils-a9158c72.js');
require('./useSendbirdStateContext.js');
require('./withSendbird.js');
require('./utils-3e8b8da5.js');
require('./index-4469abc4.js');
require('./useLongPress-2f4ee82c.js');
require('./ui/OpenChannelAdminMessage.js');
require('./ui/OpenchannelOGMessage.js');
require('./ui/LinkLabel.js');
require('./ui/Word.js');
require('./ui/MentionLabel.js');
require('./ui/OpenchannelThumbnailMessage.js');
require('./ui/OpenchannelFileMessage.js');
require('./ui/TextButton.js');
require('./color-0fae7c8e.js');
require('./ui/DateSeparator.js');
require('./ui/FileViewer.js');
require('./index-1b132096.js');
require('./ui/Modal.js');
require('./compareIds-5d186d0d.js');
require('@sendbird/chat');
require('@sendbird/chat/openChannel');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var OpenChannel = function (props) {
  return /*#__PURE__*/React__default["default"].createElement(OpenChannel_context.OpenChannelProvider, {
    channelUrl: props === null || props === void 0 ? void 0 : props.channelUrl,
    isMessageGroupingEnabled: props === null || props === void 0 ? void 0 : props.isMessageGroupingEnabled,
    queries: props === null || props === void 0 ? void 0 : props.queries,
    messageLimit: props === null || props === void 0 ? void 0 : props.messageLimit,
    onBeforeSendUserMessage: props === null || props === void 0 ? void 0 : props.onBeforeSendUserMessage,
    onBeforeSendFileMessage: props === null || props === void 0 ? void 0 : props.onBeforeSendFileMessage,
    onChatHeaderActionClick: props === null || props === void 0 ? void 0 : props.onChatHeaderActionClick,
    disableUserProfile: props === null || props === void 0 ? void 0 : props.disableUserProfile,
    renderUserProfile: props === null || props === void 0 ? void 0 : props.renderUserProfile,
    onBackClick: props === null || props === void 0 ? void 0 : props.onBackClick
  }, /*#__PURE__*/React__default["default"].createElement(OpenChannel_components_OpenChannelUI, {
    renderMessage: props === null || props === void 0 ? void 0 : props.renderMessage,
    renderHeader: props === null || props === void 0 ? void 0 : props.renderHeader,
    renderInput: props === null || props === void 0 ? void 0 : props.renderInput,
    renderPlaceHolderEmptyList: props === null || props === void 0 ? void 0 : props.renderPlaceHolderEmptyList,
    renderPlaceHolderError: props === null || props === void 0 ? void 0 : props.renderPlaceHolderError,
    renderPlaceHolderLoading: props === null || props === void 0 ? void 0 : props.renderPlaceHolderLoading
  }));
};

module.exports = OpenChannel;
//# sourceMappingURL=OpenChannel.js.map
