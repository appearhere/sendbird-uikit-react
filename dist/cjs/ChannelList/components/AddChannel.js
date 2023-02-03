'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var ui_IconButton = require('../../ui/IconButton.js');
var ui_Icon = require('../../ui/Icon.js');
var CreateChannel = require('../../CreateChannel.js');
var useSendbirdStateContext = require('../../useSendbirdStateContext.js');
var ChannelList_context = require('../../ChannelListProvider-05beb013.js');
require('../../tslib.es6-d6068b10.js');
require('prop-types');
require('../../CreateChannel/components/CreateChannelUI.js');
require('../../CreateChannelProvider-9629e09e.js');
require('../../sendbirdSelectors.js');
require('../../topics-085b5602.js');
require('../../utils-a9158c72.js');
require('../../CreateChannel/components/InviteUsers.js');
require('../../LocalizationContext-f4281153.js');
require('../../stringSet-2dfd148b.js');
require('../../index-d4bc012c.js');
require('../../ui/Modal.js');
require('react-dom');
require('../../index-1b132096.js');
require('../../ui/Button.js');
require('../../index-4197d014.js');
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
require('../../CreateChannel/components/SelectChannelType.js');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('@sendbird/chat/groupChannel');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var AddChannel = function () {
  var _a;

  var _b = React.useState(false),
      showModal = _b[0],
      setShowModal = _b[1];

  var state = useSendbirdStateContext();
  var isOnline = (_a = state === null || state === void 0 ? void 0 : state.config) === null || _a === void 0 ? void 0 : _a.isOnline;
  var disabled = !isOnline;
  var overrideInviteUser = ChannelList_context.useChannelListContext().overrideInviteUser;
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(ui_IconButton, {
    height: "32px",
    width: "32px",
    onClick: function () {
      setShowModal(true);
    },
    disabled: disabled
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.CREATE,
    fillColor: ui_Icon.IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  })), showModal && /*#__PURE__*/React__default["default"].createElement(CreateChannel, {
    onCancel: function () {
      setShowModal(false);
    },
    overrideInviteUser: overrideInviteUser,
    onCreateChannel: function () {
      setShowModal(false);
    }
  }));
};

exports.AddChannel = AddChannel;
exports["default"] = AddChannel;
//# sourceMappingURL=AddChannel.js.map
