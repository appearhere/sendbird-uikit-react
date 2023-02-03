'use strict';

var React = require('react');
var LocalizationContext = require('../../LocalizationContext-f4281153.js');
var ui_Label = require('../../index-4197d014.js');
var ui_Icon = require('../../ui/Icon.js');
var ui_Badge = require('../../ui/Badge.js');
var MemberList = require('../../MemberList-8ba5ffba.js');
var ChannelSettings_context = require('../context.js');
require('../../stringSet-2dfd148b.js');
require('../../index-d4bc012c.js');
require('prop-types');
require('../../tslib.es6-d6068b10.js');
require('../../ui/Button.js');
require('../../ui/IconButton.js');
require('../../ui/ContextMenu.js');
require('react-dom');
require('../../ui/SortByRow.js');
require('../../uuid-2f4916c1.js');
require('../../index-d05a5cae.js');
require('../../utils/message/getOutgoingMessageState.js');
require('./UserListItem.js');
require('../../UserProfileContext-fd00d1bd.js');
require('../../ui/Avatar.js');
require('../../ui/ImageRenderer.js');
require('../../ui/MutedAvatarOverlay.js');
require('../../ui/UserProfile.js');
require('../../sendbirdSelectors.js');
require('../../topics-085b5602.js');
require('../../utils-a9158c72.js');
require('../../useSendbirdStateContext.js');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('../../ui/Modal.js');
require('../../index-1b132096.js');
require('../../MediaQueryContext-9a5566fc.js');
require('../../ui/UserListItem.js');
require('../../ui/Checkbox.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var kFormatter = function (num) {
  return Math.abs(num) > 999 ? "".concat((Math.abs(num) / 1000).toFixed(1), "K") : num;
};

var UserPanel = function () {
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;

  var _a = React.useState(false),
      showAccordion = _a[0],
      setShowAccordion = _a[1];

  var channel = ChannelSettings_context.useChannelSettingsContext().channel;
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("div", {
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
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: "sendbird-channel-settings__panel-icon-left",
    type: ui_Icon.IconTypes.MEMBERS,
    fillColor: ui_Icon.IconColors.PRIMARY,
    height: "24px",
    width: "24px"
  }), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.SUBTITLE_1,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, stringSet.CHANNEL_SETTING__MEMBERS__TITLE, /*#__PURE__*/React__default["default"].createElement(ui_Badge, {
    count: kFormatter(channel === null || channel === void 0 ? void 0 : channel.memberCount)
  })), /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: ['sendbird-channel-settings__panel-icon-right', 'sendbird-channel-settings__panel-icon--chevron', showAccordion ? 'sendbird-channel-settings__panel-icon--open' : ''].join(' '),
    type: ui_Icon.IconTypes.CHEVRON_RIGHT,
    height: "24px",
    width: "24px"
  })), showAccordion && /*#__PURE__*/React__default["default"].createElement(MemberList.MemberList, null));
};

module.exports = UserPanel;
//# sourceMappingURL=UserPanel.js.map
