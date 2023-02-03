'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var LocalizationContext = require('../../LocalizationContext-f4281153.js');
var ui_ContextMenu = require('../../ui/ContextMenu.js');
var ui_IconButton = require('../../ui/IconButton.js');
var ui_Icon = require('../../ui/Icon.js');
var useSendbirdStateContext = require('../../useSendbirdStateContext.js');
var utils = require('../../utils-a9158c72.js');
var ui_Modal = require('../../ui/Modal.js');
var ChannelList_context = require('../../ChannelListProvider-05beb013.js');
require('../../stringSet-2dfd148b.js');
require('../../index-d4bc012c.js');
require('../../tslib.es6-d6068b10.js');
require('react-dom');
require('../../ui/SortByRow.js');
require('../../uuid-2f4916c1.js');
require('../../index-d05a5cae.js');
require('../../utils/message/getOutgoingMessageState.js');
require('../../index-4197d014.js');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('../../index-1b132096.js');
require('../../ui/Button.js');
require('../../MediaQueryContext-9a5566fc.js');
require('@sendbird/chat/groupChannel');
require('../../topics-085b5602.js');
require('../../UserProfileContext-fd00d1bd.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

var LeaveChannel = function (props) {
  var _a, _b, _c;

  var _d = props.channel,
      channel = _d === void 0 ? null : _d,
      _e = props.onSubmit,
      onSubmit = _e === void 0 ? utils.noop : _e,
      _f = props.onCancel,
      onCancel = _f === void 0 ? utils.noop : _f;
  var channelFromContext = (_a = ChannelList_context.useChannelListContext()) === null || _a === void 0 ? void 0 : _a.currentChannel;
  var leavingChannel = channel || channelFromContext;
  var state = useSendbirdStateContext();
  var stringSet = LocalizationContext.useLocalization().stringSet;
  var logger = (_b = state === null || state === void 0 ? void 0 : state.config) === null || _b === void 0 ? void 0 : _b.logger;
  var isOnline = (_c = state === null || state === void 0 ? void 0 : state.config) === null || _c === void 0 ? void 0 : _c.isOnline;

  if (leavingChannel) {
    return /*#__PURE__*/React__default["default"].createElement(ui_Modal["default"], {
      disabled: !isOnline,
      onCancel: onCancel,
      onSubmit: function () {
        logger.info('ChannelSettings: Leaving channel', leavingChannel);
        leavingChannel === null || leavingChannel === void 0 ? void 0 : leavingChannel.leave().then(function () {
          logger.info('ChannelSettings: Leaving channel successful!', leavingChannel);
          onSubmit();
        });
      },
      submitText: stringSet.MODAL__LEAVE_CHANNEL__FOOTER,
      titleText: stringSet.MODAL__LEAVE_CHANNEL__TITLE
    });
  }
};

function ChannelPreviewAction(_ref) {
  let {
    channel,
    disabled,
    onLeaveChannel
  } = _ref;
  const parentRef = React.useRef(null);
  const parentContainerRef = React.useRef(null);
  const [showModal, setShowModal] = React.useState(false);
  const {
    stringSet
  } = React.useContext(LocalizationContext.LocalizationContext);
  return /*#__PURE__*/React__default["default"].createElement("div", {
    role: "button",
    style: {
      display: 'inline-block'
    },
    onKeyDown: e => {
      e.stopPropagation();
    },
    tabIndex: 0,
    onClick: e => {
      e.stopPropagation();
    },
    ref: parentContainerRef
  }, /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu["default"], {
    menuTrigger: toggleDropdown => /*#__PURE__*/React__default["default"].createElement(ui_IconButton, {
      ref: parentRef,
      onClick: toggleDropdown,
      height: "32px",
      width: "32px"
    }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
      type: ui_Icon.IconTypes.MORE,
      fillColor: ui_Icon.IconColors.PRIMARY,
      width: "24px",
      height: "24px"
    })),
    menuItems: closeDropdown => /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItems, {
      parentRef: parentRef,
      parentContainRef: parentContainerRef,
      closeDropdown: closeDropdown
    }, /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
      onClick: () => {
        if (disabled) {
          return;
        }

        setShowModal(true);
        closeDropdown();
      }
    }, stringSet.CHANNEL_SETTING__LEAVE_CHANNEL__TITLE))
  }), showModal && /*#__PURE__*/React__default["default"].createElement(LeaveChannel, {
    channel: channel,
    onSubmit: () => {
      setShowModal(false);
      onLeaveChannel();
    },
    onCancel: () => setShowModal(false)
  }));
}
ChannelPreviewAction.propTypes = {
  disabled: PropTypes__default["default"].bool,
  onLeaveChannel: PropTypes__default["default"].func.isRequired,
  channel: PropTypes__default["default"].shape({})
};
ChannelPreviewAction.defaultProps = {
  disabled: false,
  channel: null
};

module.exports = ChannelPreviewAction;
//# sourceMappingURL=ChannelPreviewAction.js.map
