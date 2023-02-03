import React__default from 'react';
import Avatar from '../../ui/Avatar.js';
import Icon, { IconTypes, IconColors } from '../../ui/Icon.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../../index-f60cbf08.js';
import '../../tslib.es6-75bd0528.js';
import '../../ui/ImageRenderer.js';
import '../../uuid-392016d0.js';
import 'prop-types';
import '../../stringSet-42c0e16e.js';

function OpenChannelPreview(_a) {
  var className = _a.className,
      isSelected = _a.isSelected,
      channel = _a.channel,
      onClick = _a.onClick;
  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-open-channel-preview ".concat(isSelected ? 'selected' : '', " ").concat(className),
    onClick: onClick
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-open-channel-preview__cover-image"
  }, /*#__PURE__*/React__default.createElement(Avatar, {
    className: "sendbird-open-channel-preview__cover-image__avatar",
    src: channel === null || channel === void 0 ? void 0 : channel.coverUrl,
    alt: "cover-image",
    width: "42px",
    height: "42px",
    customDefaultComponent: function () {
      return /*#__PURE__*/React__default.createElement("div", {
        className: "sendbird-open-channel-preview__cover-image__avatar--default"
      }, /*#__PURE__*/React__default.createElement(Icon, {
        type: IconTypes.CHANNELS,
        fillColor: IconColors.CONTENT,
        width: "24px",
        height: "24px"
      }));
    }
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-open-channel-preview__context"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-open-channel-preview__context__title"
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-open-channel-preview__context__title__channel-name ".concat((channel === null || channel === void 0 ? void 0 : channel.isFrozen) ? 'frozen' : ''),
    type: LabelTypography.SUBTITLE_2,
    color: isSelected ? LabelColors.PRIMARY : LabelColors.ONBACKGROUND_1
  }, channel === null || channel === void 0 ? void 0 : channel.name), (channel === null || channel === void 0 ? void 0 : channel.isFrozen) ? /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-open-channel-preview__context__title__frozen",
    type: IconTypes.FREEZE,
    fillColor: IconColors.PRIMARY,
    width: "16px",
    height: "16px"
  }) : ''), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-open-channel-preview__context__participants"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-open-channel-preview__context__participants__icon",
    type: IconTypes.MEMBERS,
    fillColor: IconColors.ON_BACKGROUND_2,
    width: "14px",
    height: "14px"
  }), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-open-channel-preview__context__participants__count",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, (channel === null || channel === void 0 ? void 0 : channel.participantCount) || '0'))));
}

export { OpenChannelPreview as default };
//# sourceMappingURL=OpenChannelPreview.js.map
