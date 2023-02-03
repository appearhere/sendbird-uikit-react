'use strict';

var tslib_es6 = require('../tslib.es6-d6068b10.js');
var React = require('react');
var ui_Avatar = require('./Avatar.js');
var ui_Icon = require('./Icon.js');
var ui_Label = require('../index-4197d014.js');
var LocalizationContext = require('../LocalizationContext-f4281153.js');
var index$1 = require('../index-5977bdd5.js');
var index = require('../index-661b02a2.js');
require('./ImageRenderer.js');
require('../uuid-2f4916c1.js');
require('prop-types');
require('../stringSet-2dfd148b.js');
require('../index-d4bc012c.js');
require('../index-fb9d8ec0.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function getCreatedAt(_a) {
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
function getIconOfFileType(message) {
  var url = message.url;
  var fileMessageUrl = url;
  var fileExtension = fileMessageUrl.match(/\.([^.]*?)(?=\?|#|$)/)[1];

  if (/(jpg|jpeg|png)$/i.test(fileExtension)) {
    return ui_Icon.IconTypes.PHOTO;
  } else if (/mp4$/i.test(fileExtension)) {
    return ui_Icon.IconTypes.PLAY;
  } else if (/mp3/i.test(fileExtension)) {
    return ui_Icon.IconTypes.FILE_AUDIO;
  } else if (/gif/i.test(fileExtension)) {
    return ui_Icon.IconTypes.GIF;
  } else {
    return ui_Icon.IconTypes.FILE_DOCUMENT;
  }
}

function MessageSearchFileItem(props) {
  var className = props.className,
      message = props.message,
      selected = props.selected,
      onClick = props.onClick;
  var createdAt = message.createdAt,
      url = message.url,
      name = message.name;
  var fileMessageUrl = url; // @ts-ignore

  var sender = message.sender || message._sender;
  var profileUrl = sender.profileUrl,
      nickname = sender.nickname;

  var _a = LocalizationContext.useLocalization(),
      stringSet = _a.stringSet,
      dateLocale = _a.dateLocale;

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-message-search-file-item', selected ? 'sendbird-message-search-file-item--selected' : ''], false).join(' '),
    onClick: function (e) {
      e.stopPropagation();
      onClick(message);
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-message-search-file-item__left"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Avatar["default"], {
    className: "sendbird-message-search-file-item__left__sender-avatar",
    src: profileUrl,
    alt: "profile image",
    width: "56px",
    height: "56px"
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-message-search-file-item__right"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-message-search-file-item__right__sender-name",
    type: ui_Label.LabelTypography.SUBTITLE_2,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, nickname || stringSet.NO_NAME), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-message-search-file-item__right__content"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-message-search-file-item__right__content__type-icon"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: getIconOfFileType(message),
    fillColor: ui_Icon.IconColors.PRIMARY,
    width: "18px",
    height: "18px"
  })), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-message-search-file-item__right__content__url",
    type: ui_Label.LabelTypography.BODY_2,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, name || fileMessageUrl))), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-message-search-file-item__message-created-at",
    type: ui_Label.LabelTypography.CAPTION_3,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, getCreatedAt({
    createdAt: createdAt,
    locale: dateLocale,
    stringSet: stringSet
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-message-search-file-item__right-footer"
  }));
}

module.exports = MessageSearchFileItem;
//# sourceMappingURL=MessageSearchFileItem.js.map
