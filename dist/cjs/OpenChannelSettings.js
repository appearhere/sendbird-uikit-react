'use strict';

var React = require('react');
var OpenChannelSettings_components_OpenChannelSettingsUI = require('./OpenChannelSettings/components/OpenChannelSettingsUI.js');
var OpenChannelSettings_context = require('./OpenChannelSettings/context.js');
require('./useSendbirdStateContext.js');
require('./withSendbird.js');
require('./_rollupPluginBabelHelpers-597f5cf8.js');
require('./UserProfileContext-fd00d1bd.js');
require('prop-types');
require('./LocalizationContext-f4281153.js');
require('./stringSet-2dfd148b.js');
require('./index-d4bc012c.js');
require('./index-4197d014.js');
require('./ui/Icon.js');
require('./index-6b9230ae.js');
require('./tslib.es6-d6068b10.js');
require('./ui/Loader.js');
require('./OpenChannelSettings/components/OperatorUI.js');
require('./OpenChannelSettings/components/OpenChannelProfile.js');
require('./ui/TextButton.js');
require('./color-0fae7c8e.js');
require('./ui/OpenChannelAvatar.js');
require('./ui/Avatar.js');
require('./ui/ImageRenderer.js');
require('./uuid-2f4916c1.js');
require('./utils-6eb1ca73.js');
require('./OpenChannelSettings/components/EditDetailsModal.js');
require('./topics-085b5602.js');
require('./ui/Modal.js');
require('react-dom');
require('./index-1b132096.js');
require('./ui/Button.js');
require('./ui/IconButton.js');
require('./MediaQueryContext-9a5566fc.js');
require('./ui/Input.js');
require('./index-0d57689d.js');
require('./ui/ContextMenu.js');
require('./ui/SortByRow.js');
require('./index-d05a5cae.js');
require('./utils/message/getOutgoingMessageState.js');
require('./context-4e494ce5.js');
require('./utils-a9158c72.js');
require('./ui/UserProfile.js');
require('./sendbirdSelectors.js');
require('@sendbird/chat/openChannel');
require('./ui/UserListItem.js');
require('./ui/MutedAvatarOverlay.js');
require('./ui/Checkbox.js');
require('./ui/Accordion.js');
require('./ui/AccordionGroup.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var OpenChannelSetting = function (props) {
  return /*#__PURE__*/React__default["default"].createElement(OpenChannelSettings_context.OpenChannelSettingsProvider, {
    channelUrl: props === null || props === void 0 ? void 0 : props.channelUrl,
    onCloseClick: props === null || props === void 0 ? void 0 : props.onCloseClick,
    onBeforeUpdateChannel: props === null || props === void 0 ? void 0 : props.onBeforeUpdateChannel,
    onChannelModified: props === null || props === void 0 ? void 0 : props.onChannelModified,
    onDeleteChannel: props === null || props === void 0 ? void 0 : props.onDeleteChannel,
    disableUserProfile: props === null || props === void 0 ? void 0 : props.disableUserProfile,
    renderUserProfile: props === null || props === void 0 ? void 0 : props.renderUserProfile
  }, /*#__PURE__*/React__default["default"].createElement(OpenChannelSettings_components_OpenChannelSettingsUI, {
    renderOperatorUI: props === null || props === void 0 ? void 0 : props.renderOperatorUI,
    renderParticipantList: props === null || props === void 0 ? void 0 : props.renderParticipantList
  }));
};

module.exports = OpenChannelSetting;
//# sourceMappingURL=OpenChannelSettings.js.map
