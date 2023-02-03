import React__default from 'react';
import { T as ThreadProvider } from './ThreadProvider-5ccbbc4b.js';
import ThreadUI from './Thread/components/ThreadUI.js';
import './index-229a0736.js';
import './index-5dcd7e0f.js';
import './utils/message/getOutgoingMessageState.js';
import './UserProfileContext-517994e3.js';
import 'prop-types';
import './useSendbirdStateContext.js';
import './withSendbird.js';
import './_rollupPluginBabelHelpers-fe256514.js';
import './tslib.es6-75bd0528.js';
import './Thread/context/types.js';
import '@sendbird/chat';
import './topics-0560d548.js';
import '@sendbird/chat/groupChannel';
import './uuid-392016d0.js';
import '@sendbird/chat/message';
import './LocalizationContext-e5f35d14.js';
import './stringSet-42c0e16e.js';
import './utils-5cd54b1d.js';
import './index-f60cbf08.js';
import './Thread/components/ParentMessageInfo.js';
import './RemoveMessageModal-6f5adba5.js';
import './ui/Modal.js';
import 'react-dom';
import './index-5ab5d8fe.js';
import './ui/Button.js';
import './ui/Icon.js';
import './ui/IconButton.js';
import './MediaQueryContext-0ce6633d.js';
import './Thread/components/ParentMessageInfoItem.js';
import './index-105a85f4.js';
import './ui/Word.js';
import './ui/LinkLabel.js';
import './ui/MentionLabel.js';
import './ui/ContextMenu.js';
import './ui/SortByRow.js';
import './ui/UserProfile.js';
import './sendbirdSelectors.js';
import './utils-8a4a2ff6.js';
import './ui/Avatar.js';
import './ui/ImageRenderer.js';
import './ui/TextButton.js';
import './color-52d916b6.js';
import './ui/EmojiReactions.js';
import './ui/Tooltip.js';
import './ui/TooltipWrapper.js';
import './ui/ReactionBadge.js';
import './ui/ReactionButton.js';
import './Channel/components/SuggestedMentionList.js';
import './ChannelProvider-3f08837d.js';
import './compareIds-fd8fd31e.js';
import './const-03d71a8a.js';
import './const-fcaed0ae.js';
import './ui/FileViewer.js';
import './ui/MessageItemMenu.js';
import './ui/MessageItemReactionMenu.js';
import './ui/MessageInput.js';
import 'react-dom/server';
import './ui/MentionUserLabel.js';
import './Thread/components/ThreadHeader.js';
import './Thread/components/ThreadList.js';
import './Thread/components/ThreadListItem.js';
import './ui/DateSeparator.js';
import './index-1cb2692d.js';
import './ui/Loader.js';
import './index-05bd476f.js';
import './index-81d63e09.js';
import './ui/TextMessageItemBody.js';
import './ui/OGMessageItemBody.js';
import './ui/FileMessageItemBody.js';
import './ui/ThumbnailMessageItemBody.js';
import './ui/UnknownMessageItemBody.js';
import 'date-fns';
import './Thread/components/ThreadMessageInput.js';
import './index-88c5a220.js';

var Thread = function (props) {
  var // props
  className = props.className,
      // ThreadProviderProps
  channelUrl = props.channelUrl,
      message = props.message,
      onHeaderActionClick = props.onHeaderActionClick,
      onMoveToParentMessage = props.onMoveToParentMessage,
      // ThreadUIProps
  renderHeader = props.renderHeader,
      renderParentMessageInfo = props.renderParentMessageInfo,
      renderMessage = props.renderMessage,
      renderMessageInput = props.renderMessageInput,
      renderCustomSeparator = props.renderCustomSeparator,
      renderParentMessageInfoPlaceholder = props.renderParentMessageInfoPlaceholder,
      renderThreadListPlaceHolder = props.renderThreadListPlaceHolder;
  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-thread ".concat(className)
  }, /*#__PURE__*/React__default.createElement(ThreadProvider, {
    channelUrl: channelUrl,
    message: message,
    onHeaderActionClick: onHeaderActionClick,
    onMoveToParentMessage: onMoveToParentMessage
  }, /*#__PURE__*/React__default.createElement(ThreadUI, {
    renderHeader: renderHeader,
    renderParentMessageInfo: renderParentMessageInfo,
    renderMessage: renderMessage,
    renderMessageInput: renderMessageInput,
    renderCustomSeparator: renderCustomSeparator,
    renderParentMessageInfoPlaceholder: renderParentMessageInfoPlaceholder,
    renderThreadListPlaceHolder: renderThreadListPlaceHolder
  })));
};

export { Thread as default };
//# sourceMappingURL=Thread.js.map
