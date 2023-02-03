'use strict';

var React = require('react');
var ui_Modal = require('../../ui/Modal.js');
var ui_Button = require('../../ui/Button.js');
var LocalizationContext = require('../../LocalizationContext-f4281153.js');
var Channel_context = require('../../ChannelProvider-4d043480.js');
require('react-dom');
require('../../index-1b132096.js');
require('../../ui/Icon.js');
require('prop-types');
require('../../ui/IconButton.js');
require('../../tslib.es6-d6068b10.js');
require('../../index-4197d014.js');
require('../../stringSet-2dfd148b.js');
require('../../MediaQueryContext-9a5566fc.js');
require('../../index-d4bc012c.js');
require('../../UserProfileContext-fd00d1bd.js');
require('../../useSendbirdStateContext.js');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('../../index-5977bdd5.js');
require('../../topics-085b5602.js');
require('../../index-d05a5cae.js');
require('../../utils/message/getOutgoingMessageState.js');
require('../../compareIds-5d186d0d.js');
require('../../const-43cebab9.js');
require('@sendbird/chat/groupChannel');
require('../../uuid-2f4916c1.js');
require('@sendbird/chat/message');
require('../../ui/ContextMenu.js');
require('../../ui/SortByRow.js');
require('../../ui/ReactionButton.js');
require('../../ui/ImageRenderer.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var RemoveMessage = function (props) {
  var _a;

  var onCancel = props.onCancel,
      message = props.message;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  var deleteMessage = Channel_context.useChannelContext().deleteMessage;
  return /*#__PURE__*/React__default["default"].createElement(ui_Modal["default"], {
    type: ui_Button.ButtonTypes.DANGER,
    disabled: ((_a = message === null || message === void 0 ? void 0 : message.threadInfo) === null || _a === void 0 ? void 0 : _a.replyCount) > 0,
    onCancel: onCancel,
    onSubmit: function () {
      deleteMessage(message).then(function () {
        onCancel();
      });
    },
    submitText: stringSet.MESSAGE_MENU__DELETE,
    titleText: stringSet.MODAL__DELETE_MESSAGE__TITLE
  });
};

module.exports = RemoveMessage;
//# sourceMappingURL=RemoveMessageModal.js.map
