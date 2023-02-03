import React__default from 'react';
import { u as useCreateChannelContext } from '../../CreateChannelProvider-e9f3d260.js';
import InviteUsers from './InviteUsers.js';
import SelectChannelType from './SelectChannelType.js';
import '../../sendbirdSelectors.js';
import '../../topics-0560d548.js';
import '../../utils-8a4a2ff6.js';
import '../../useSendbirdStateContext.js';
import '../../withSendbird.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import '../../tslib.es6-75bd0528.js';
import '../../LocalizationContext-e5f35d14.js';
import '../../stringSet-42c0e16e.js';
import '../../index-5dcd7e0f.js';
import '../../ui/Modal.js';
import 'react-dom';
import '../../index-5ab5d8fe.js';
import '../../ui/Button.js';
import '../../index-f60cbf08.js';
import 'prop-types';
import '../../ui/Icon.js';
import '../../ui/IconButton.js';
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

var CreateChannel = function (props) {
  var onCancel = props.onCancel,
      renderStepOne = props.renderStepOne;

  var _a = useCreateChannelContext(),
      step = _a.step,
      setStep = _a.setStep,
      userListQuery = _a.userListQuery;

  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, step === 0 && ((renderStepOne === null || renderStepOne === void 0 ? void 0 : renderStepOne()) || /*#__PURE__*/React__default.createElement(SelectChannelType, {
    onCancel: onCancel
  })), step === 1 && /*#__PURE__*/React__default.createElement(InviteUsers, {
    userListQuery: userListQuery,
    onCancel: function () {
      setStep(0);
      onCancel();
    }
  }));
};

export { CreateChannel as default };
//# sourceMappingURL=CreateChannelUI.js.map
