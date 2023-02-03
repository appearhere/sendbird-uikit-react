'use strict';

var React = require('react');
var ui_Avatar = require('../../ui/Avatar.js');
var ui_Icon = require('../../ui/Icon.js');
var ui_Label = require('../../index-4197d014.js');
require('../../tslib.es6-d6068b10.js');
require('../../ui/ImageRenderer.js');
require('../../uuid-2f4916c1.js');
require('prop-types');
require('../../stringSet-2dfd148b.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function OpenChannelPreview(_a) {
  var className = _a.className,
      isSelected = _a.isSelected,
      channel = _a.channel,
      onClick = _a.onClick;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-open-channel-preview ".concat(isSelected ? 'selected' : '', " ").concat(className),
    onClick: onClick
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-open-channel-preview__cover-image"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Avatar["default"], {
    className: "sendbird-open-channel-preview__cover-image__avatar",
    src: channel === null || channel === void 0 ? void 0 : channel.coverUrl,
    alt: "cover-image",
    width: "42px",
    height: "42px",
    customDefaultComponent: function () {
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "sendbird-open-channel-preview__cover-image__avatar--default"
      }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
        type: ui_Icon.IconTypes.CHANNELS,
        fillColor: ui_Icon.IconColors.CONTENT,
        width: "24px",
        height: "24px"
      }));
    }
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-open-channel-preview__context"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-open-channel-preview__context__title"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-open-channel-preview__context__title__channel-name ".concat((channel === null || channel === void 0 ? void 0 : channel.isFrozen) ? 'frozen' : ''),
    type: ui_Label.LabelTypography.SUBTITLE_2,
    color: isSelected ? ui_Label.LabelColors.PRIMARY : ui_Label.LabelColors.ONBACKGROUND_1
  }, channel === null || channel === void 0 ? void 0 : channel.name), (channel === null || channel === void 0 ? void 0 : channel.isFrozen) ? /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: "sendbird-open-channel-preview__context__title__frozen",
    type: ui_Icon.IconTypes.FREEZE,
    fillColor: ui_Icon.IconColors.PRIMARY,
    width: "16px",
    height: "16px"
  }) : ''), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-open-channel-preview__context__participants"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: "sendbird-open-channel-preview__context__participants__icon",
    type: ui_Icon.IconTypes.MEMBERS,
    fillColor: ui_Icon.IconColors.ON_BACKGROUND_2,
    width: "14px",
    height: "14px"
  }), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-open-channel-preview__context__participants__count",
    type: ui_Label.LabelTypography.CAPTION_3,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, (channel === null || channel === void 0 ? void 0 : channel.participantCount) || '0'))));
}

module.exports = OpenChannelPreview;
//# sourceMappingURL=OpenChannelPreview.js.map
