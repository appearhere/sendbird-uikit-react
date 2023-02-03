'use strict';

var React = require('react');
var LocalizationContext = require('../../LocalizationContext-f4281153.js');
var useSendbirdStateContext = require('../../useSendbirdStateContext.js');
var ui_Label = require('../../index-4197d014.js');
var ui_Avatar = require('../../ui/Avatar.js');
require('../../stringSet-2dfd148b.js');
require('../../index-d4bc012c.js');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('prop-types');
require('../../tslib.es6-d6068b10.js');
require('../../ui/ImageRenderer.js');
require('../../ui/Icon.js');
require('../../uuid-2f4916c1.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var ChannelListHeader = function (_a) {
  var renderHeader = _a.renderHeader,
      renderTitle = _a.renderTitle,
      renderIconButton = _a.renderIconButton,
      onEdit = _a.onEdit,
      allowProfileEdit = _a.allowProfileEdit;

  var _b = useSendbirdStateContext === null || useSendbirdStateContext === void 0 ? void 0 : useSendbirdStateContext(),
      stores = _b.stores,
      config = _b.config;

  var user = (stores === null || stores === void 0 ? void 0 : stores.userStore).user;
  var logger = config.logger;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;

  if (renderHeader) {
    logger === null || logger === void 0 ? void 0 : logger.warning('Recomend to use "renderTitle" instead of "renderHeader". It will be deprecated.');
  } // renderTitle should have higher priority


  var titleRenderer = renderHeader || renderTitle;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: ['sendbird-channel-header', allowProfileEdit ? 'sendbird-channel-header--allow-edit' : ''].join(' ')
  }, (titleRenderer === null || titleRenderer === void 0 ? void 0 : titleRenderer()) || /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-channel-header__title",
    role: "button",
    onClick: function () {
      onEdit === null || onEdit === void 0 ? void 0 : onEdit();
    },
    onKeyDown: function () {
      onEdit === null || onEdit === void 0 ? void 0 : onEdit();
    },
    tabIndex: 0
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-channel-header__title__left"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Avatar["default"], {
    width: "32px",
    height: "32px",
    src: user.profileUrl,
    alt: user.nickname
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-channel-header__title__right"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-channel-header__title__right__name",
    type: ui_Label.LabelTypography.SUBTITLE_2,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, user.nickname || stringSet.NO_NAME), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-channel-header__title__right__user-id",
    type: ui_Label.LabelTypography.BODY_2,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, user.userId))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-channel-header__right-icon"
  }, renderIconButton === null || renderIconButton === void 0 ? void 0 : renderIconButton()));
};

module.exports = ChannelListHeader;
//# sourceMappingURL=ChannelListHeader.js.map
