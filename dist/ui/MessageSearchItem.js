import { a as __spreadArray } from '../tslib.es6-75bd0528.js';
import React__default from 'react';
import { f as format } from '../index-229a0736.js';
import { i as isToday, a as isYesterday, b as isThisYear } from '../index-05bd476f.js';
import Avatar from './Avatar.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../index-f60cbf08.js';
import { u as useLocalization } from '../LocalizationContext-e5f35d14.js';
import '../index-5dcd7e0f.js';
import '../index-81d63e09.js';
import './ImageRenderer.js';
import './Icon.js';
import 'prop-types';
import '../uuid-392016d0.js';
import '../stringSet-42c0e16e.js';

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

  if (isToday(createdAt)) {
    return format(createdAt, 'p', optionalParam);
  }

  if (isYesterday(createdAt)) {
    return (stringSet === null || stringSet === void 0 ? void 0 : stringSet.MESSAGE_STATUS__YESTERDAY) || 'Yesterday';
  }

  if (isThisYear(createdAt)) {
    return format(createdAt, 'MMM d', optionalParam);
  }

  return format(createdAt, 'yyyy/M/d', optionalParam);
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

  var _b = useLocalization(),
      stringSet = _b.stringSet,
      dateLocale = _b.dateLocale;

  return /*#__PURE__*/React__default.createElement("div", {
    className: __spreadArray(__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-message-search-item', selected ? 'sendbird-message-search-item--selected' : ''], false).join(' '),
    onClick: function (e) {
      e.stopPropagation();
      onClick(message);
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-message-search-item__left"
  }, /*#__PURE__*/React__default.createElement(Avatar, {
    className: "sendbird-message-search-item__left__sender-avatar",
    src: profileUrl,
    alt: "profile image",
    width: "56px",
    height: "56px"
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-message-search-item__right"
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-message-search-item__right__sender-name",
    type: LabelTypography.SUBTITLE_2,
    color: LabelColors.ONBACKGROUND_1
  }, nickname || stringSet.NO_NAME), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-message-search-item__right__message-text",
    type: LabelTypography.BODY_2,
    color: LabelColors.ONBACKGROUND_3
  }, messageText), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-message-search-item__right__message-created-at",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, getCreatedAt({
    createdAt: createdAt,
    locale: dateLocale,
    stringSet: stringSet
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-message-search-item__right-footer"
  }));
}

export { MessageSearchItem as default };
//# sourceMappingURL=MessageSearchItem.js.map
