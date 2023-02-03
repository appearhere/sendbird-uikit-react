import { a as __spreadArray } from '../tslib.es6-75bd0528.js';
import React__default from 'react';
import Avatar from './Avatar.js';
import Icon, { IconTypes, IconColors } from './Icon.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../index-f60cbf08.js';
import { u as useLocalization } from '../LocalizationContext-e5f35d14.js';
import { f as format } from '../index-229a0736.js';
import { i as isToday, a as isYesterday, b as isThisYear } from '../index-05bd476f.js';
import './ImageRenderer.js';
import '../uuid-392016d0.js';
import 'prop-types';
import '../stringSet-42c0e16e.js';
import '../index-5dcd7e0f.js';
import '../index-81d63e09.js';

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
function getIconOfFileType(message) {
  var url = message.url;
  var fileMessageUrl = url;
  var fileExtension = fileMessageUrl.match(/\.([^.]*?)(?=\?|#|$)/)[1];

  if (/(jpg|jpeg|png)$/i.test(fileExtension)) {
    return IconTypes.PHOTO;
  } else if (/mp4$/i.test(fileExtension)) {
    return IconTypes.PLAY;
  } else if (/mp3/i.test(fileExtension)) {
    return IconTypes.FILE_AUDIO;
  } else if (/gif/i.test(fileExtension)) {
    return IconTypes.GIF;
  } else {
    return IconTypes.FILE_DOCUMENT;
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

  var _a = useLocalization(),
      stringSet = _a.stringSet,
      dateLocale = _a.dateLocale;

  return /*#__PURE__*/React__default.createElement("div", {
    className: __spreadArray(__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-message-search-file-item', selected ? 'sendbird-message-search-file-item--selected' : ''], false).join(' '),
    onClick: function (e) {
      e.stopPropagation();
      onClick(message);
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-message-search-file-item__left"
  }, /*#__PURE__*/React__default.createElement(Avatar, {
    className: "sendbird-message-search-file-item__left__sender-avatar",
    src: profileUrl,
    alt: "profile image",
    width: "56px",
    height: "56px"
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-message-search-file-item__right"
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-message-search-file-item__right__sender-name",
    type: LabelTypography.SUBTITLE_2,
    color: LabelColors.ONBACKGROUND_1
  }, nickname || stringSet.NO_NAME), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-message-search-file-item__right__content"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-message-search-file-item__right__content__type-icon"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: getIconOfFileType(message),
    fillColor: IconColors.PRIMARY,
    width: "18px",
    height: "18px"
  })), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-message-search-file-item__right__content__url",
    type: LabelTypography.BODY_2,
    color: LabelColors.ONBACKGROUND_1
  }, name || fileMessageUrl))), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-message-search-file-item__message-created-at",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, getCreatedAt({
    createdAt: createdAt,
    locale: dateLocale,
    stringSet: stringSet
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-message-search-file-item__right-footer"
  }));
}

export { MessageSearchFileItem as default };
//# sourceMappingURL=MessageSearchFileItem.js.map
