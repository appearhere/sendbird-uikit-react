import React__default, { useContext } from 'react';
import Avatar from '../../ui/Avatar.js';
import Icon, { IconColors, IconTypes } from '../../ui/Icon.js';
import IconButton from '../../ui/IconButton.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../../index-f60cbf08.js';
import { a as LocalizationContext } from '../../LocalizationContext-e5f35d14.js';
import { u as useOpenChannelContext, k as kFormatter } from '../../OpenChannelProvider-104ab716.js';
import { u as useMediaQueryContext } from '../../MediaQueryContext-0ce6633d.js';
import '../../tslib.es6-75bd0528.js';
import '../../ui/ImageRenderer.js';
import '../../uuid-392016d0.js';
import 'prop-types';
import '../../stringSet-42c0e16e.js';
import '../../index-5dcd7e0f.js';
import '../../index-229a0736.js';
import '../../UserProfileContext-517994e3.js';
import '../../compareIds-fd8fd31e.js';
import '../../topics-0560d548.js';
import '@sendbird/chat';
import '@sendbird/chat/openChannel';
import '../../useSendbirdStateContext.js';
import '../../withSendbird.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';

function OpenchannelConversationHeader() {
  var stringSet = useContext(LocalizationContext).stringSet;

  var _a = useOpenChannelContext(),
      currentOpenChannel = _a.currentOpenChannel,
      onChatHeaderActionClick = _a.onChatHeaderActionClick,
      amIOperator = _a.amIOperator,
      onBackClick = _a.onBackClick;

  var title = currentOpenChannel === null || currentOpenChannel === void 0 ? void 0 : currentOpenChannel.name;
  var subTitle = "".concat(kFormatter(currentOpenChannel === null || currentOpenChannel === void 0 ? void 0 : currentOpenChannel.participantCount), " ").concat(stringSet.OPEN_CHANNEL_CONVERSATION__TITLE_PARTICIPANTS);
  var coverImage = currentOpenChannel === null || currentOpenChannel === void 0 ? void 0 : currentOpenChannel.coverUrl;
  var isMobile = useMediaQueryContext().isMobile;
  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-conversation-header"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-conversation-header__left"
  }, isMobile && /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-oepnchannel-header__icon_back",
    onClick: onBackClick,
    fillColor: IconColors.PRIMARY,
    width: "24px",
    height: "24px",
    type: IconTypes.ARROW_LEFT
  }), coverImage ? /*#__PURE__*/React__default.createElement(Avatar, {
    className: "sendbird-openchannel-conversation-header__left__cover-image",
    src: coverImage,
    alt: "channel cover image",
    width: "32px",
    height: "32px"
  }) : /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-conversation-header__left__cover-image--icon",
    style: {
      width: 32,
      height: 32
    }
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.CHANNELS,
    fillColor: IconColors.CONTENT,
    width: "18px",
    height: "18px"
  })), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-openchannel-conversation-header__left__title",
    type: LabelTypography.H_2,
    color: LabelColors.ONBACKGROUND_1
  }, title || stringSet.NO_TITLE), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-openchannel-conversation-header__left__sub-title",
    type: LabelTypography.BODY_2,
    color: LabelColors.ONBACKGROUND_2
  }, subTitle || stringSet.NO_TITLE)), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-openchannel-conversation-header__right"
  }, /*#__PURE__*/React__default.createElement(IconButton, {
    className: "sendbird-openchannel-conversation-header__right__trigger",
    width: "32px",
    height: "32px",
    onClick: onChatHeaderActionClick
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: amIOperator ? IconTypes.INFO : IconTypes.MEMBERS,
    fillColor: IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  }))));
}

export { OpenchannelConversationHeader as default };
//# sourceMappingURL=OpenChannelHeader.js.map
