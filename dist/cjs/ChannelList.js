'use strict';

var React = require('react');
var ChannelList_context = require('./ChannelListProvider-05beb013.js');
var ChannelList_components_ChannelListUI = require('./ChannelList/components/ChannelListUI.js');
require('./tslib.es6-d6068b10.js');
require('@sendbird/chat/groupChannel');
require('./topics-085b5602.js');
require('./uuid-2f4916c1.js');
require('./utils-a9158c72.js');
require('./UserProfileContext-fd00d1bd.js');
require('prop-types');
require('./useSendbirdStateContext.js');
require('./withSendbird.js');
require('./_rollupPluginBabelHelpers-597f5cf8.js');
require('./index-d05a5cae.js');
require('./utils/message/getOutgoingMessageState.js');
require('./ChannelList/components/ChannelListHeader.js');
require('./LocalizationContext-f4281153.js');
require('./stringSet-2dfd148b.js');
require('./index-d4bc012c.js');
require('./index-4197d014.js');
require('./ui/Avatar.js');
require('./ui/ImageRenderer.js');
require('./ui/Icon.js');
require('./ChannelList/components/AddChannel.js');
require('./ui/IconButton.js');
require('./CreateChannel.js');
require('./CreateChannel/components/CreateChannelUI.js');
require('./CreateChannelProvider-9629e09e.js');
require('./sendbirdSelectors.js');
require('./CreateChannel/components/InviteUsers.js');
require('./ui/Modal.js');
require('react-dom');
require('./index-1b132096.js');
require('./ui/Button.js');
require('./MediaQueryContext-9a5566fc.js');
require('./ui/UserListItem.js');
require('./ui/MutedAvatarOverlay.js');
require('./ui/Checkbox.js');
require('./ui/UserProfile.js');
require('./ui/ContextMenu.js');
require('./ui/SortByRow.js');
require('./CreateChannel/components/SelectChannelType.js');
require('./ChannelList/components/ChannelPreview.js');
require('./ui/ChannelAvatar.js');
require('./utils-6eb1ca73.js');
require('./ui/Badge.js');
require('./index-daac2dae.js');
require('./index-5977bdd5.js');
require('./ui/Loader.js');
require('./index-661b02a2.js');
require('./index-fb9d8ec0.js');
require('./ui/MentionUserLabel.js');
require('./ui/TextButton.js');
require('./color-0fae7c8e.js');
require('./Channel/components/TypingIndicator.js');
require('./ChannelProvider-4d043480.js');
require('./compareIds-5d186d0d.js');
require('./const-43cebab9.js');
require('@sendbird/chat/message');
require('./ui/ReactionButton.js');
require('./useLongPress-2f4ee82c.js');
require('./ChannelList/components/ChannelPreviewAction.js');
require('./EditUserProfile.js');
require('./index-4de278b6.js');
require('./ui/Input.js');
require('./actionTypes-4d28a480.js');
require('./index-6b9230ae.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var ChannelList = function (props) {
  return /*#__PURE__*/React__default["default"].createElement(ChannelList_context.ChannelListProvider, {
    className: props === null || props === void 0 ? void 0 : props.className,
    disableUserProfile: props === null || props === void 0 ? void 0 : props.disableUserProfile,
    allowProfileEdit: props === null || props === void 0 ? void 0 : props.allowProfileEdit,
    onBeforeCreateChannel: props === null || props === void 0 ? void 0 : props.onBeforeCreateChannel,
    onThemeChange: props === null || props === void 0 ? void 0 : props.onThemeChange,
    overrideInviteUser: props === null || props === void 0 ? void 0 : props.overrideInviteUser,
    onProfileEditSuccess: props === null || props === void 0 ? void 0 : props.onProfileEditSuccess,
    onChannelSelect: props === null || props === void 0 ? void 0 : props.onChannelSelect,
    sortChannelList: props === null || props === void 0 ? void 0 : props.sortChannelList,
    queries: props === null || props === void 0 ? void 0 : props.queries,
    disableAutoSelect: props === null || props === void 0 ? void 0 : props.disableAutoSelect,
    isTypingIndicatorEnabled: props === null || props === void 0 ? void 0 : props.isTypingIndicatorEnabled,
    isMessageReceiptStatusEnabled: props === null || props === void 0 ? void 0 : props.isMessageReceiptStatusEnabled
  }, /*#__PURE__*/React__default["default"].createElement(ChannelList_components_ChannelListUI, {
    renderChannelPreview: props === null || props === void 0 ? void 0 : props.renderChannelPreview,
    renderUserProfile: props === null || props === void 0 ? void 0 : props.renderUserProfile,
    renderHeader: props === null || props === void 0 ? void 0 : props.renderHeader,
    renderPlaceHolderEmptyList: props === null || props === void 0 ? void 0 : props.renderPlaceHolderEmptyList,
    renderPlaceHolderError: props === null || props === void 0 ? void 0 : props.renderPlaceHolderError,
    renderPlaceHolderLoading: props === null || props === void 0 ? void 0 : props.renderPlaceHolderLoading
  }));
};

module.exports = ChannelList;
//# sourceMappingURL=ChannelList.js.map
