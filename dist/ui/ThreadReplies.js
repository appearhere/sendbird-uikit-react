import React__default from 'react';
import Avatar from './Avatar.js';
import Icon, { IconTypes, IconColors } from './Icon.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../index-f60cbf08.js';
import { u as useLocalization } from '../LocalizationContext-e5f35d14.js';
import { u as uuidv4 } from '../uuid-392016d0.js';
import '../tslib.es6-75bd0528.js';
import './ImageRenderer.js';
import 'prop-types';
import '../stringSet-42c0e16e.js';
import '../index-5dcd7e0f.js';

function ThreadReplies(_a) {
  var _b;

  var className = _a.className,
      threadInfo = _a.threadInfo,
      onClick = _a.onClick;
  var _c = threadInfo.mostRepliedUsers,
      mostRepliedUsers = _c === void 0 ? [] : _c,
      replyCount = threadInfo.replyCount;
  var stringSet = useLocalization().stringSet;
  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-ui-thread-replies ".concat(className),
    role: "button",
    onClick: function (e) {
      onClick(e);
      e === null || e === void 0 ? void 0 : e.stopPropagation();
    },
    onKeyDown: function (e) {
      onClick(e);
      e === null || e === void 0 ? void 0 : e.stopPropagation();
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-ui-thread-replies__user-profiles"
  }, mostRepliedUsers.slice(0, 4).map(function (user) {
    return /*#__PURE__*/React__default.createElement(Avatar, {
      key: uuidv4(),
      className: "sendbird-ui-thread-replies__user-profiles__avatar",
      src: user === null || user === void 0 ? void 0 : user.profileUrl,
      alt: "user profile",
      width: "20px",
      height: "20px"
    });
  }), (mostRepliedUsers === null || mostRepliedUsers === void 0 ? void 0 : mostRepliedUsers.length) >= 5 && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-ui-thread-replies__user-profiles__avatar"
  }, /*#__PURE__*/React__default.createElement(Avatar, {
    className: "sendbird-ui-thread-replies__user-profiles__avatar__image",
    src: (_b = mostRepliedUsers === null || mostRepliedUsers === void 0 ? void 0 : mostRepliedUsers[4]) === null || _b === void 0 ? void 0 : _b.profileUrl,
    alt: "user profile",
    width: "20px",
    height: "20px"
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-ui-thread-replies__user-profiles__avatar__cover"
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-ui-thread-replies__user-profiles__avatar__plus"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.PLUS,
    fillColor: IconColors.WHITE,
    width: "16px",
    height: "16px"
  })))), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-ui-thread-replies__reply-counts",
    type: LabelTypography.CAPTION_2,
    color: LabelColors.PRIMARY
  }, replyCount === 1 ? "".concat(replyCount, " ").concat(stringSet.CHANNEL__THREAD_REPLY) : "".concat(replyCount > 99 ? stringSet.CHANNEL__THREAD_OVER_MAX : replyCount, " ").concat(stringSet.CHANNEL__THREAD_REPLIES)), /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-ui-thread-replies__icon",
    type: IconTypes.CHEVRON_RIGHT,
    fillColor: IconColors.PRIMARY,
    width: "16px",
    height: "16px"
  }));
}

export { ThreadReplies as default };
//# sourceMappingURL=ThreadReplies.js.map
