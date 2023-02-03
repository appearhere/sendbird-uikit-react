'use strict';

var React = require('react');
var CreateChannel_context = require('../../CreateChannelProvider-9629e09e.js');
var CreateChannel_components_InviteUsers = require('./InviteUsers.js');
var CreateChannel_components_SelectChannelType = require('./SelectChannelType.js');
require('../../sendbirdSelectors.js');
require('../../topics-085b5602.js');
require('../../utils-a9158c72.js');
require('../../useSendbirdStateContext.js');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('../../tslib.es6-d6068b10.js');
require('../../LocalizationContext-f4281153.js');
require('../../stringSet-2dfd148b.js');
require('../../index-d4bc012c.js');
require('../../ui/Modal.js');
require('react-dom');
require('../../index-1b132096.js');
require('../../ui/Button.js');
require('../../index-4197d014.js');
require('prop-types');
require('../../ui/Icon.js');
require('../../ui/IconButton.js');
require('../../MediaQueryContext-9a5566fc.js');
require('../../ui/UserListItem.js');
require('../../UserProfileContext-fd00d1bd.js');
require('../../ui/Avatar.js');
require('../../ui/ImageRenderer.js');
require('../../uuid-2f4916c1.js');
require('../../ui/MutedAvatarOverlay.js');
require('../../ui/Checkbox.js');
require('../../ui/UserProfile.js');
require('../../ui/ContextMenu.js');
require('../../ui/SortByRow.js');
require('../../index-d05a5cae.js');
require('../../utils/message/getOutgoingMessageState.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var CreateChannel = function (props) {
  var onCancel = props.onCancel,
      renderStepOne = props.renderStepOne;

  var _a = CreateChannel_context.useCreateChannelContext(),
      step = _a.step,
      setStep = _a.setStep,
      userListQuery = _a.userListQuery;

  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, step === 0 && ((renderStepOne === null || renderStepOne === void 0 ? void 0 : renderStepOne()) || /*#__PURE__*/React__default["default"].createElement(CreateChannel_components_SelectChannelType, {
    onCancel: onCancel
  })), step === 1 && /*#__PURE__*/React__default["default"].createElement(CreateChannel_components_InviteUsers, {
    userListQuery: userListQuery,
    onCancel: function () {
      setStep(0);
      onCancel();
    }
  }));
};

module.exports = CreateChannel;
//# sourceMappingURL=CreateChannelUI.js.map
