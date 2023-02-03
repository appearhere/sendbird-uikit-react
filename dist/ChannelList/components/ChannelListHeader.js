import React__default, { useContext } from 'react';
import { a as LocalizationContext } from '../../LocalizationContext-e5f35d14.js';
import useSendbirdStateContext from '../../useSendbirdStateContext.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../../index-f60cbf08.js';
import Avatar from '../../ui/Avatar.js';
import '../../stringSet-42c0e16e.js';
import '../../index-5dcd7e0f.js';
import '../../withSendbird.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import 'prop-types';
import '../../tslib.es6-75bd0528.js';
import '../../ui/ImageRenderer.js';
import '../../ui/Icon.js';
import '../../uuid-392016d0.js';

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
  var stringSet = useContext(LocalizationContext).stringSet;

  if (renderHeader) {
    logger === null || logger === void 0 ? void 0 : logger.warning('Recomend to use "renderTitle" instead of "renderHeader". It will be deprecated.');
  } // renderTitle should have higher priority


  var titleRenderer = renderHeader || renderTitle;
  return /*#__PURE__*/React__default.createElement("div", {
    className: ['sendbird-channel-header', allowProfileEdit ? 'sendbird-channel-header--allow-edit' : ''].join(' ')
  }, (titleRenderer === null || titleRenderer === void 0 ? void 0 : titleRenderer()) || /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-channel-header__title",
    role: "button",
    onClick: function () {
      onEdit === null || onEdit === void 0 ? void 0 : onEdit();
    },
    onKeyDown: function () {
      onEdit === null || onEdit === void 0 ? void 0 : onEdit();
    },
    tabIndex: 0
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-channel-header__title__left"
  }, /*#__PURE__*/React__default.createElement(Avatar, {
    width: "32px",
    height: "32px",
    src: user.profileUrl,
    alt: user.nickname
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-channel-header__title__right"
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-channel-header__title__right__name",
    type: LabelTypography.SUBTITLE_2,
    color: LabelColors.ONBACKGROUND_1
  }, user.nickname || stringSet.NO_NAME), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-channel-header__title__right__user-id",
    type: LabelTypography.BODY_2,
    color: LabelColors.ONBACKGROUND_2
  }, user.userId))), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-channel-header__right-icon"
  }, renderIconButton === null || renderIconButton === void 0 ? void 0 : renderIconButton()));
};

export { ChannelListHeader as default };
//# sourceMappingURL=ChannelListHeader.js.map
