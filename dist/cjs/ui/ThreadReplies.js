'use strict';

var React = require('react');
var ui_Avatar = require('./Avatar.js');
var ui_Icon = require('./Icon.js');
var ui_Label = require('../index-4197d014.js');
var LocalizationContext = require('../LocalizationContext-f4281153.js');
var uuid = require('../uuid-2f4916c1.js');
require('../tslib.es6-d6068b10.js');
require('./ImageRenderer.js');
require('prop-types');
require('../stringSet-2dfd148b.js');
require('../index-d4bc012c.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function ThreadReplies(_a) {
  var _b;

  var className = _a.className,
      threadInfo = _a.threadInfo,
      onClick = _a.onClick;
  var _c = threadInfo.mostRepliedUsers,
      mostRepliedUsers = _c === void 0 ? [] : _c,
      replyCount = threadInfo.replyCount;
  var stringSet = LocalizationContext.useLocalization().stringSet;
  return /*#__PURE__*/React__default["default"].createElement("div", {
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
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-ui-thread-replies__user-profiles"
  }, mostRepliedUsers.slice(0, 4).map(function (user) {
    return /*#__PURE__*/React__default["default"].createElement(ui_Avatar["default"], {
      key: uuid.uuidv4(),
      className: "sendbird-ui-thread-replies__user-profiles__avatar",
      src: user === null || user === void 0 ? void 0 : user.profileUrl,
      alt: "user profile",
      width: "20px",
      height: "20px"
    });
  }), (mostRepliedUsers === null || mostRepliedUsers === void 0 ? void 0 : mostRepliedUsers.length) >= 5 && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-ui-thread-replies__user-profiles__avatar"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Avatar["default"], {
    className: "sendbird-ui-thread-replies__user-profiles__avatar__image",
    src: (_b = mostRepliedUsers === null || mostRepliedUsers === void 0 ? void 0 : mostRepliedUsers[4]) === null || _b === void 0 ? void 0 : _b.profileUrl,
    alt: "user profile",
    width: "20px",
    height: "20px"
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-ui-thread-replies__user-profiles__avatar__cover"
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-ui-thread-replies__user-profiles__avatar__plus"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.PLUS,
    fillColor: ui_Icon.IconColors.WHITE,
    width: "16px",
    height: "16px"
  })))), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-ui-thread-replies__reply-counts",
    type: ui_Label.LabelTypography.CAPTION_2,
    color: ui_Label.LabelColors.PRIMARY
  }, replyCount === 1 ? "".concat(replyCount, " ").concat(stringSet.CHANNEL__THREAD_REPLY) : "".concat(replyCount > 99 ? stringSet.CHANNEL__THREAD_OVER_MAX : replyCount, " ").concat(stringSet.CHANNEL__THREAD_REPLIES)), /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: "sendbird-ui-thread-replies__icon",
    type: ui_Icon.IconTypes.CHEVRON_RIGHT,
    fillColor: ui_Icon.IconColors.PRIMARY,
    width: "16px",
    height: "16px"
  }));
}

module.exports = ThreadReplies;
//# sourceMappingURL=ThreadReplies.js.map
