import React__default from 'react';
import CreateChannel$1 from './CreateChannel/components/CreateChannelUI.js';
import { C as CreateChannelProvider } from './CreateChannelProvider-e9f3d260.js';
import './CreateChannel/components/InviteUsers.js';
import './tslib.es6-75bd0528.js';
import './LocalizationContext-e5f35d14.js';
import './stringSet-42c0e16e.js';
import './index-5dcd7e0f.js';
import './useSendbirdStateContext.js';
import './withSendbird.js';
import './_rollupPluginBabelHelpers-fe256514.js';
import './ui/Modal.js';
import 'react-dom';
import './index-5ab5d8fe.js';
import './ui/Button.js';
import './index-f60cbf08.js';
import 'prop-types';
import './ui/Icon.js';
import './ui/IconButton.js';
import './MediaQueryContext-0ce6633d.js';
import './ui/UserListItem.js';
import './UserProfileContext-517994e3.js';
import './ui/Avatar.js';
import './ui/ImageRenderer.js';
import './uuid-392016d0.js';
import './ui/MutedAvatarOverlay.js';
import './ui/Checkbox.js';
import './ui/UserProfile.js';
import './sendbirdSelectors.js';
import './topics-0560d548.js';
import './utils-8a4a2ff6.js';
import './ui/ContextMenu.js';
import './ui/SortByRow.js';
import './index-105a85f4.js';
import './utils/message/getOutgoingMessageState.js';
import './CreateChannel/components/SelectChannelType.js';

var CreateChannel = function (props) {
  var onBeforeCreateChannel = props.onBeforeCreateChannel,
      userListQuery = props.userListQuery,
      onCreateChannel = props.onCreateChannel,
      overrideInviteUser = props.overrideInviteUser,
      onCancel = props.onCancel,
      renderStepOne = props.renderStepOne;
  return /*#__PURE__*/React__default.createElement(CreateChannelProvider, {
    onBeforeCreateChannel: onBeforeCreateChannel,
    userListQuery: userListQuery,
    onCreateChannel: onCreateChannel,
    overrideInviteUser: overrideInviteUser
  }, /*#__PURE__*/React__default.createElement(CreateChannel$1, {
    renderStepOne: renderStepOne,
    onCancel: onCancel
  }));
};

export { CreateChannel as default };
//# sourceMappingURL=CreateChannel.js.map
