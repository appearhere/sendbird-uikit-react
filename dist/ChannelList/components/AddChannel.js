import React__default, { useState } from 'react';
import IconButton from '../../ui/IconButton.js';
import Icon, { IconTypes, IconColors } from '../../ui/Icon.js';
import CreateChannel from '../../CreateChannel.js';
import useSendbirdStateContext from '../../useSendbirdStateContext.js';
import { u as useChannelListContext } from '../../ChannelListProvider-41d1c19d.js';
import '../../tslib.es6-75bd0528.js';
import 'prop-types';
import '../../CreateChannel/components/CreateChannelUI.js';
import '../../CreateChannelProvider-e9f3d260.js';
import '../../sendbirdSelectors.js';
import '../../topics-0560d548.js';
import '../../utils-8a4a2ff6.js';
import '../../CreateChannel/components/InviteUsers.js';
import '../../LocalizationContext-e5f35d14.js';
import '../../stringSet-42c0e16e.js';
import '../../index-5dcd7e0f.js';
import '../../ui/Modal.js';
import 'react-dom';
import '../../index-5ab5d8fe.js';
import '../../ui/Button.js';
import '../../index-f60cbf08.js';
import '../../MediaQueryContext-0ce6633d.js';
import '../../ui/UserListItem.js';
import '../../UserProfileContext-517994e3.js';
import '../../ui/Avatar.js';
import '../../ui/ImageRenderer.js';
import '../../uuid-392016d0.js';
import '../../ui/MutedAvatarOverlay.js';
import '../../ui/Checkbox.js';
import '../../ui/UserProfile.js';
import '../../ui/ContextMenu.js';
import '../../ui/SortByRow.js';
import '../../index-105a85f4.js';
import '../../utils/message/getOutgoingMessageState.js';
import '../../CreateChannel/components/SelectChannelType.js';
import '../../withSendbird.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import '@sendbird/chat/groupChannel';

var AddChannel = function () {
  var _a;

  var _b = useState(false),
      showModal = _b[0],
      setShowModal = _b[1];

  var state = useSendbirdStateContext();
  var isOnline = (_a = state === null || state === void 0 ? void 0 : state.config) === null || _a === void 0 ? void 0 : _a.isOnline;
  var disabled = !isOnline;
  var overrideInviteUser = useChannelListContext().overrideInviteUser;
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(IconButton, {
    height: "32px",
    width: "32px",
    onClick: function () {
      setShowModal(true);
    },
    disabled: disabled
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.CREATE,
    fillColor: IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  })), showModal && /*#__PURE__*/React__default.createElement(CreateChannel, {
    onCancel: function () {
      setShowModal(false);
    },
    overrideInviteUser: overrideInviteUser,
    onCreateChannel: function () {
      setShowModal(false);
    }
  }));
};

export { AddChannel, AddChannel as default };
//# sourceMappingURL=AddChannel.js.map
