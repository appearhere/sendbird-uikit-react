import React__default from 'react';
import { u as useOpenChannelContext } from '../../OpenChannelProvider-104ab716.js';
import OpenChannelInput from './OpenChannelInput.js';
import FrozenNotification from './FrozenChannelNotification.js';
import OpenchannelConversationHeader from './OpenChannelHeader.js';
import { P as PlaceHolder, a as PlaceHolderTypes } from '../../index-88c5a220.js';
import OpenChannelMessageList from './OpenChannelMessageList.js';
import '../../index-229a0736.js';
import '../../index-5dcd7e0f.js';
import '../../UserProfileContext-517994e3.js';
import 'prop-types';
import '../../tslib.es6-75bd0528.js';
import '../../compareIds-fd8fd31e.js';
import '../../topics-0560d548.js';
import '@sendbird/chat';
import '@sendbird/chat/openChannel';
import '../../uuid-392016d0.js';
import '../../useSendbirdStateContext.js';
import '../../withSendbird.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import '../../LocalizationContext-e5f35d14.js';
import '../../stringSet-42c0e16e.js';
import '../../ui/MessageInput.js';
import 'react-dom/server';
import '../../const-fcaed0ae.js';
import '../../const-03d71a8a.js';
import '../../ui/IconButton.js';
import '../../ui/Button.js';
import '../../index-f60cbf08.js';
import '../../ui/MentionUserLabel.js';
import '../../ui/Icon.js';
import '../../index-105a85f4.js';
import '../../utils/message/getOutgoingMessageState.js';
import '../../ui/Avatar.js';
import '../../ui/ImageRenderer.js';
import '../../MediaQueryContext-0ce6633d.js';
import '../../ui/Loader.js';
import '../../index-81d63e09.js';
import './OpenChannelMessage.js';
import '../../ui/OpenchannelUserMessage.js';
import '../../ui/ContextMenu.js';
import 'react-dom';
import '../../ui/SortByRow.js';
import '../../ui/UserProfile.js';
import '../../sendbirdSelectors.js';
import '../../utils-8a4a2ff6.js';
import '../../utils-8271be8c.js';
import '../../index-f8bdb205.js';
import '../../useLongPress-ee44c5c3.js';
import '../../ui/OpenChannelAdminMessage.js';
import '../../ui/OpenchannelOGMessage.js';
import '../../ui/LinkLabel.js';
import '../../ui/Word.js';
import '../../ui/MentionLabel.js';
import '../../ui/OpenchannelThumbnailMessage.js';
import '../../ui/OpenchannelFileMessage.js';
import '../../ui/TextButton.js';
import '../../color-52d916b6.js';
import '../../ui/DateSeparator.js';
import '../../ui/FileViewer.js';
import '../../index-5ab5d8fe.js';
import '../../ui/Modal.js';

var COMPONENT_CLASS_NAME = 'sendbird-openchannel-conversation';

var OpenChannelUI = function (_a) {
  var renderMessage = _a.renderMessage,
      renderHeader = _a.renderHeader,
      renderInput = _a.renderInput,
      renderPlaceHolderEmptyList = _a.renderPlaceHolderEmptyList,
      renderPlaceHolderError = _a.renderPlaceHolderError,
      renderPlaceHolderLoading = _a.renderPlaceHolderLoading;

  var _b = useOpenChannelContext(),
      currentOpenChannel = _b.currentOpenChannel,
      amIBanned = _b.amIBanned,
      loading = _b.loading,
      isInvalid = _b.isInvalid,
      messageInputRef = _b.messageInputRef,
      conversationScrollRef = _b.conversationScrollRef;

  if (!currentOpenChannel || !(currentOpenChannel === null || currentOpenChannel === void 0 ? void 0 : currentOpenChannel.url) || amIBanned) {
    return (renderPlaceHolderError === null || renderPlaceHolderError === void 0 ? void 0 : renderPlaceHolderError()) || /*#__PURE__*/React__default.createElement("div", {
      className: COMPONENT_CLASS_NAME
    }, /*#__PURE__*/React__default.createElement(PlaceHolder, {
      type: PlaceHolderTypes.NO_CHANNELS
    }));
  }

  if (loading) {
    return (renderPlaceHolderLoading === null || renderPlaceHolderLoading === void 0 ? void 0 : renderPlaceHolderLoading()) || /*#__PURE__*/React__default.createElement("div", {
      className: COMPONENT_CLASS_NAME
    }, /*#__PURE__*/React__default.createElement(PlaceHolder, {
      type: PlaceHolderTypes.LOADING
    }));
  }

  if (isInvalid) {
    return (renderPlaceHolderError === null || renderPlaceHolderError === void 0 ? void 0 : renderPlaceHolderError()) || /*#__PURE__*/React__default.createElement("div", {
      className: COMPONENT_CLASS_NAME
    }, /*#__PURE__*/React__default.createElement(PlaceHolder, {
      type: PlaceHolderTypes.WRONG
    }));
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: COMPONENT_CLASS_NAME
  }, (renderHeader === null || renderHeader === void 0 ? void 0 : renderHeader()) || /*#__PURE__*/React__default.createElement(OpenchannelConversationHeader, null), (currentOpenChannel === null || currentOpenChannel === void 0 ? void 0 : currentOpenChannel.isFrozen) && /*#__PURE__*/React__default.createElement(FrozenNotification, null), /*#__PURE__*/React__default.createElement(OpenChannelMessageList, {
    ref: conversationScrollRef,
    renderMessage: renderMessage,
    renderPlaceHolderEmptyList: renderPlaceHolderEmptyList
  }), (renderInput === null || renderInput === void 0 ? void 0 : renderInput()) || /*#__PURE__*/React__default.createElement(OpenChannelInput, {
    ref: messageInputRef
  }));
};

export { OpenChannelUI as default };
//# sourceMappingURL=OpenChannelUI.js.map
