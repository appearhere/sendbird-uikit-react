'use strict';

var tslib_es6 = require('../tslib.es6-d6068b10.js');
var React = require('react');
var index$1 = require('../index-5977bdd5.js');
var index = require('../index-661b02a2.js');
var ui_Avatar = require('./Avatar.js');
var ui_Label = require('../index-4197d014.js');
var LocalizationContext = require('../LocalizationContext-f4281153.js');
require('../index-d4bc012c.js');
require('../index-fb9d8ec0.js');
require('./ImageRenderer.js');
require('./Icon.js');
require('prop-types');
require('../uuid-2f4916c1.js');
require('../stringSet-2dfd148b.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function getCreatedAt (_a) {
  var createdAt = _a.createdAt,
      locale = _a.locale,
      stringSet = _a.stringSet;
  var optionalParam = locale ? {
    locale: locale
  } : null;

  if (!createdAt) {
    return '';
  }

  if (index.isToday(createdAt)) {
    return index$1.format(createdAt, 'p', optionalParam);
  }

  if (index.isYesterday(createdAt)) {
    return (stringSet === null || stringSet === void 0 ? void 0 : stringSet.MESSAGE_STATUS__YESTERDAY) || 'Yesterday';
  }

  if (index.isThisYear(createdAt)) {
    return index$1.format(createdAt, 'MMM d', optionalParam);
  }

  return index$1.format(createdAt, 'yyyy/M/d', optionalParam);
}

function MessageSearchItem(_a) {
  var className = _a.className,
      message = _a.message,
      selected = _a.selected,
      onClick = _a.onClick;
  var createdAt = message.createdAt;
  var messageText = message.message;
  var sender = message.sender || message._sender;
  var profileUrl = sender.profileUrl,
      nickname = sender.nickname;

  var _b = LocalizationContext.useLocalization(),
      stringSet = _b.stringSet,
      dateLocale = _b.dateLocale;

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-message-search-item', selected ? 'sendbird-message-search-item--selected' : ''], false).join(' '),
    onClick: function (e) {
      e.stopPropagation();
      onClick(message);
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-message-search-item__left"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Avatar["default"], {
    className: "sendbird-message-search-item__left__sender-avatar",
    src: profileUrl,
    alt: "profile image",
    width: "56px",
    height: "56px"
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-message-search-item__right"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-message-search-item__right__sender-name",
    type: ui_Label.LabelTypography.SUBTITLE_2,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, nickname || stringSet.NO_NAME), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-message-search-item__right__message-text",
    type: ui_Label.LabelTypography.BODY_2,
    color: ui_Label.LabelColors.ONBACKGROUND_3
  }, messageText), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-message-search-item__right__message-created-at",
    type: ui_Label.LabelTypography.CAPTION_3,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, getCreatedAt({
    createdAt: createdAt,
    locale: dateLocale,
    stringSet: stringSet
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-message-search-item__right-footer"
  }));
}

module.exports = MessageSearchItem;
//# sourceMappingURL=MessageSearchItem.js.map
