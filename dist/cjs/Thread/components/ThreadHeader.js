'use strict';

var React = require('react');
var ui_IconButton = require('../../ui/IconButton.js');
var ui_Icon = require('../../ui/Icon.js');
var ui_Label = require('../../index-4197d014.js');
var ui_TextButton = require('../../ui/TextButton.js');
var LocalizationContext = require('../../LocalizationContext-f4281153.js');
require('../../tslib.es6-d6068b10.js');
require('prop-types');
require('../../stringSet-2dfd148b.js');
require('../../color-0fae7c8e.js');
require('../../index-d4bc012c.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function ThreadHeader(_a) {
  var className = _a.className,
      channelName = _a.channelName,
      renderActionIcon = _a.renderActionIcon,
      onActionIconClick = _a.onActionIconClick,
      onChannelNameClick = _a.onChannelNameClick;
  var stringSet = LocalizationContext.useLocalization().stringSet;
  var MemoizedActionIcon = React.useMemo(function () {
    if (typeof renderActionIcon === 'function') {
      return renderActionIcon({
        onActionIconClick: onActionIconClick
      });
    }

    return null;
  }, [renderActionIcon]);
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-thread-header ".concat(className)
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-thread-header__title",
    type: ui_Label.LabelTypography.H_2,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, stringSet.THREAD__HEADER_TITLE), /*#__PURE__*/React__default["default"].createElement(ui_TextButton, {
    onClick: function (e) {
      return onChannelNameClick(e);
    },
    disableUnderline: true
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-thread-header__channel-name",
    type: ui_Label.LabelTypography.CAPTION_3,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, channelName)), MemoizedActionIcon || /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-thread-header__action"
  }, /*#__PURE__*/React__default["default"].createElement(ui_IconButton, {
    width: "32px",
    height: "32px",
    onClick: function (e) {
      return onActionIconClick(e);
    }
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.CLOSE,
    fillColor: ui_Icon.IconColors.ON_BACKGROUND_1,
    width: "22px",
    height: "22px"
  }))));
}

module.exports = ThreadHeader;
//# sourceMappingURL=ThreadHeader.js.map
