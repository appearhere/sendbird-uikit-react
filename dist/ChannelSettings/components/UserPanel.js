import React__default, { useContext, useState } from 'react';
import { a as LocalizationContext } from '../../LocalizationContext-e5f35d14.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../../index-f60cbf08.js';
import Icon, { IconTypes, IconColors } from '../../ui/Icon.js';
import Badge from '../../ui/Badge.js';
import { M as MemberList } from '../../MemberList-e6061e27.js';
import { useChannelSettingsContext } from '../context.js';
import '../../stringSet-42c0e16e.js';
import '../../index-5dcd7e0f.js';
import 'prop-types';
import '../../tslib.es6-75bd0528.js';
import '../../ui/Button.js';
import '../../ui/IconButton.js';
import '../../ui/ContextMenu.js';
import 'react-dom';
import '../../ui/SortByRow.js';
import '../../uuid-392016d0.js';
import '../../index-105a85f4.js';
import '../../utils/message/getOutgoingMessageState.js';
import './UserListItem.js';
import '../../UserProfileContext-517994e3.js';
import '../../ui/Avatar.js';
import '../../ui/ImageRenderer.js';
import '../../ui/MutedAvatarOverlay.js';
import '../../ui/UserProfile.js';
import '../../sendbirdSelectors.js';
import '../../topics-0560d548.js';
import '../../utils-8a4a2ff6.js';
import '../../useSendbirdStateContext.js';
import '../../withSendbird.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import '../../ui/Modal.js';
import '../../index-5ab5d8fe.js';
import '../../MediaQueryContext-0ce6633d.js';
import '../../ui/UserListItem.js';
import '../../ui/Checkbox.js';

var kFormatter = function (num) {
  return Math.abs(num) > 999 ? "".concat((Math.abs(num) / 1000).toFixed(1), "K") : num;
};

var UserPanel = function () {
  var stringSet = useContext(LocalizationContext).stringSet;

  var _a = useState(false),
      showAccordion = _a[0],
      setShowAccordion = _a[1];

  var channel = useChannelSettingsContext().channel;
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: ['sendbird-channel-settings__panel-item', 'sendbird-channel-settings__members'].join(' '),
    role: "switch",
    "aria-checked": showAccordion,
    onKeyDown: function () {
      return setShowAccordion(!showAccordion);
    },
    onClick: function () {
      return setShowAccordion(!showAccordion);
    },
    tabIndex: 0
  }, /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-channel-settings__panel-icon-left",
    type: IconTypes.MEMBERS,
    fillColor: IconColors.PRIMARY,
    height: "24px",
    width: "24px"
  }), /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.SUBTITLE_1,
    color: LabelColors.ONBACKGROUND_1
  }, stringSet.CHANNEL_SETTING__MEMBERS__TITLE, /*#__PURE__*/React__default.createElement(Badge, {
    count: kFormatter(channel === null || channel === void 0 ? void 0 : channel.memberCount)
  })), /*#__PURE__*/React__default.createElement(Icon, {
    className: ['sendbird-channel-settings__panel-icon-right', 'sendbird-channel-settings__panel-icon--chevron', showAccordion ? 'sendbird-channel-settings__panel-icon--open' : ''].join(' '),
    type: IconTypes.CHEVRON_RIGHT,
    height: "24px",
    width: "24px"
  })), showAccordion && /*#__PURE__*/React__default.createElement(MemberList, null));
};

export { UserPanel as default };
//# sourceMappingURL=UserPanel.js.map
