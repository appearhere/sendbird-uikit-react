import React__default, { useRef, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { u as useLocalization, a as LocalizationContext } from '../../LocalizationContext-e5f35d14.js';
import ContextMenu, { MenuItems, MenuItem } from '../../ui/ContextMenu.js';
import IconButton from '../../ui/IconButton.js';
import Icon, { IconTypes, IconColors } from '../../ui/Icon.js';
import useSendbirdStateContext from '../../useSendbirdStateContext.js';
import { n as noop } from '../../utils-8a4a2ff6.js';
import Modal from '../../ui/Modal.js';
import { u as useChannelListContext } from '../../ChannelListProvider-41d1c19d.js';
import '../../stringSet-42c0e16e.js';
import '../../index-5dcd7e0f.js';
import '../../tslib.es6-75bd0528.js';
import 'react-dom';
import '../../ui/SortByRow.js';
import '../../uuid-392016d0.js';
import '../../index-105a85f4.js';
import '../../utils/message/getOutgoingMessageState.js';
import '../../index-f60cbf08.js';
import '../../withSendbird.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import '../../index-5ab5d8fe.js';
import '../../ui/Button.js';
import '../../MediaQueryContext-0ce6633d.js';
import '@sendbird/chat/groupChannel';
import '../../topics-0560d548.js';
import '../../UserProfileContext-517994e3.js';

var LeaveChannel = function (props) {
  var _a, _b, _c;

  var _d = props.channel,
      channel = _d === void 0 ? null : _d,
      _e = props.onSubmit,
      onSubmit = _e === void 0 ? noop : _e,
      _f = props.onCancel,
      onCancel = _f === void 0 ? noop : _f;
  var channelFromContext = (_a = useChannelListContext()) === null || _a === void 0 ? void 0 : _a.currentChannel;
  var leavingChannel = channel || channelFromContext;
  var state = useSendbirdStateContext();
  var stringSet = useLocalization().stringSet;
  var logger = (_b = state === null || state === void 0 ? void 0 : state.config) === null || _b === void 0 ? void 0 : _b.logger;
  var isOnline = (_c = state === null || state === void 0 ? void 0 : state.config) === null || _c === void 0 ? void 0 : _c.isOnline;

  if (leavingChannel) {
    return /*#__PURE__*/React__default.createElement(Modal, {
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
  const parentRef = useRef(null);
  const parentContainerRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const {
    stringSet
  } = useContext(LocalizationContext);
  return /*#__PURE__*/React__default.createElement("div", {
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
  }, /*#__PURE__*/React__default.createElement(ContextMenu, {
    menuTrigger: toggleDropdown => /*#__PURE__*/React__default.createElement(IconButton, {
      ref: parentRef,
      onClick: toggleDropdown,
      height: "32px",
      width: "32px"
    }, /*#__PURE__*/React__default.createElement(Icon, {
      type: IconTypes.MORE,
      fillColor: IconColors.PRIMARY,
      width: "24px",
      height: "24px"
    })),
    menuItems: closeDropdown => /*#__PURE__*/React__default.createElement(MenuItems, {
      parentRef: parentRef,
      parentContainRef: parentContainerRef,
      closeDropdown: closeDropdown
    }, /*#__PURE__*/React__default.createElement(MenuItem, {
      onClick: () => {
        if (disabled) {
          return;
        }

        setShowModal(true);
        closeDropdown();
      }
    }, stringSet.CHANNEL_SETTING__LEAVE_CHANNEL__TITLE))
  }), showModal && /*#__PURE__*/React__default.createElement(LeaveChannel, {
    channel: channel,
    onSubmit: () => {
      setShowModal(false);
      onLeaveChannel();
    },
    onCancel: () => setShowModal(false)
  }));
}
ChannelPreviewAction.propTypes = {
  disabled: PropTypes.bool,
  onLeaveChannel: PropTypes.func.isRequired,
  channel: PropTypes.shape({})
};
ChannelPreviewAction.defaultProps = {
  disabled: false,
  channel: null
};

export { ChannelPreviewAction as default };
//# sourceMappingURL=ChannelPreviewAction.js.map
