'use strict';

var React = require('react');
var ChannelSettings_components_ChannelSettingsUI = require('./ChannelSettings/components/ChannelSettingsUI.js');
var ChannelSettings_context = require('./ChannelSettings/context.js');
require('./useSendbirdStateContext.js');
require('./withSendbird.js');
require('./_rollupPluginBabelHelpers-597f5cf8.js');
require('./index-6b9230ae.js');
require('./tslib.es6-d6068b10.js');
require('./LocalizationContext-f4281153.js');
require('./stringSet-2dfd148b.js');
require('./index-d4bc012c.js');
require('./ui/Icon.js');
require('prop-types');
require('./index-4197d014.js');
require('./ui/Loader.js');
require('./ui/IconButton.js');
require('./ChannelSettings/components/ChannelProfile.js');
require('./ui/ChannelAvatar.js');
require('./ui/Avatar.js');
require('./ui/ImageRenderer.js');
require('./uuid-2f4916c1.js');
require('./utils-6eb1ca73.js');
require('./ui/TextButton.js');
require('./color-0fae7c8e.js');
require('./ChannelSettings/components/EditDetailsModal.js');
require('./ui/Modal.js');
require('react-dom');
require('./index-1b132096.js');
require('./ui/Button.js');
require('./MediaQueryContext-9a5566fc.js');
require('./ui/Input.js');
require('./ChannelSettings/components/ModerationPanel.js');
require('./ui/Accordion.js');
require('./ui/AccordionGroup.js');
require('./context-4e494ce5.js');
require('./utils-a9158c72.js');
require('./ui/Badge.js');
require('./ui/ContextMenu.js');
require('./ui/SortByRow.js');
require('./index-d05a5cae.js');
require('./utils/message/getOutgoingMessageState.js');
require('./ChannelSettings/components/UserListItem.js');
require('./UserProfileContext-fd00d1bd.js');
require('./ui/MutedAvatarOverlay.js');
require('./ui/UserProfile.js');
require('./sendbirdSelectors.js');
require('./topics-085b5602.js');
require('./ui/UserListItem.js');
require('./ui/Checkbox.js');
require('@sendbird/chat/groupChannel');
require('./MemberList-8ba5ffba.js');
require('./ChannelSettings/components/LeaveChannel.js');
require('./ChannelSettings/components/UserPanel.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var ChannelSettings = function (props) {
  return /*#__PURE__*/React__default["default"].createElement(ChannelSettings_context.ChannelSettingsProvider, {
    overrideInviteUser: props === null || props === void 0 ? void 0 : props.overrideInviteUser,
    channelUrl: props.channelUrl,
    onCloseClick: props === null || props === void 0 ? void 0 : props.onCloseClick,
    onLeaveChannel: props === null || props === void 0 ? void 0 : props.onLeaveChannel,
    onChannelModified: props === null || props === void 0 ? void 0 : props.onChannelModified,
    onBeforeUpdateChannel: props === null || props === void 0 ? void 0 : props.onBeforeUpdateChannel,
    queries: props === null || props === void 0 ? void 0 : props.queries,
    className: props === null || props === void 0 ? void 0 : props.className,
    disableUserProfile: props === null || props === void 0 ? void 0 : props.disableUserProfile,
    renderUserProfile: props === null || props === void 0 ? void 0 : props.renderChannelProfile
  }, /*#__PURE__*/React__default["default"].createElement(ChannelSettings_components_ChannelSettingsUI, {
    renderPlaceholderError: props === null || props === void 0 ? void 0 : props.renderPlaceholderError,
    renderChannelProfile: props === null || props === void 0 ? void 0 : props.renderChannelProfile,
    renderModerationPanel: props === null || props === void 0 ? void 0 : props.renderModerationPanel,
    renderLeaveChannel: props === null || props === void 0 ? void 0 : props.renderLeaveChannel
  }));
};

module.exports = ChannelSettings;
//# sourceMappingURL=ChannelSettings.js.map
