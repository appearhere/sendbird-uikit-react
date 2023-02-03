'use strict';

var React = require('react');
var Thread_context = require('./ThreadProvider-5c14e997.js');
var Thread_components_ThreadUI = require('./Thread/components/ThreadUI.js');
require('./index-5977bdd5.js');
require('./index-d4bc012c.js');
require('./utils/message/getOutgoingMessageState.js');
require('./UserProfileContext-fd00d1bd.js');
require('prop-types');
require('./useSendbirdStateContext.js');
require('./withSendbird.js');
require('./_rollupPluginBabelHelpers-597f5cf8.js');
require('./tslib.es6-d6068b10.js');
require('./Thread/context/types.js');
require('@sendbird/chat');
require('./topics-085b5602.js');
require('@sendbird/chat/groupChannel');
require('./uuid-2f4916c1.js');
require('@sendbird/chat/message');
require('./LocalizationContext-f4281153.js');
require('./stringSet-2dfd148b.js');
require('./utils-88ce8023.js');
require('./index-4197d014.js');
require('./Thread/components/ParentMessageInfo.js');
require('./RemoveMessageModal-4d250f7d.js');
require('./ui/Modal.js');
require('react-dom');
require('./index-1b132096.js');
require('./ui/Button.js');
require('./ui/Icon.js');
require('./ui/IconButton.js');
require('./MediaQueryContext-9a5566fc.js');
require('./Thread/components/ParentMessageInfoItem.js');
require('./index-d05a5cae.js');
require('./ui/Word.js');
require('./ui/LinkLabel.js');
require('./ui/MentionLabel.js');
require('./ui/ContextMenu.js');
require('./ui/SortByRow.js');
require('./ui/UserProfile.js');
require('./sendbirdSelectors.js');
require('./utils-a9158c72.js');
require('./ui/Avatar.js');
require('./ui/ImageRenderer.js');
require('./ui/TextButton.js');
require('./color-0fae7c8e.js');
require('./ui/EmojiReactions.js');
require('./ui/Tooltip.js');
require('./ui/TooltipWrapper.js');
require('./ui/ReactionBadge.js');
require('./ui/ReactionButton.js');
require('./Channel/components/SuggestedMentionList.js');
require('./ChannelProvider-4d043480.js');
require('./compareIds-5d186d0d.js');
require('./const-43cebab9.js');
require('./const-28829306.js');
require('./ui/FileViewer.js');
require('./ui/MessageItemMenu.js');
require('./ui/MessageItemReactionMenu.js');
require('./ui/MessageInput.js');
require('react-dom/server');
require('./ui/MentionUserLabel.js');
require('./Thread/components/ThreadHeader.js');
require('./Thread/components/ThreadList.js');
require('./Thread/components/ThreadListItem.js');
require('./ui/DateSeparator.js');
require('./index-daac2dae.js');
require('./ui/Loader.js');
require('./index-661b02a2.js');
require('./index-fb9d8ec0.js');
require('./ui/TextMessageItemBody.js');
require('./ui/OGMessageItemBody.js');
require('./ui/FileMessageItemBody.js');
require('./ui/ThumbnailMessageItemBody.js');
require('./ui/UnknownMessageItemBody.js');
require('date-fns');
require('./Thread/components/ThreadMessageInput.js');
require('./index-6b9230ae.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-thread ".concat(className)
  }, /*#__PURE__*/React__default["default"].createElement(Thread_context.ThreadProvider, {
    channelUrl: channelUrl,
    message: message,
    onHeaderActionClick: onHeaderActionClick,
    onMoveToParentMessage: onMoveToParentMessage
  }, /*#__PURE__*/React__default["default"].createElement(Thread_components_ThreadUI, {
    renderHeader: renderHeader,
    renderParentMessageInfo: renderParentMessageInfo,
    renderMessage: renderMessage,
    renderMessageInput: renderMessageInput,
    renderCustomSeparator: renderCustomSeparator,
    renderParentMessageInfoPlaceholder: renderParentMessageInfoPlaceholder,
    renderThreadListPlaceHolder: renderThreadListPlaceHolder
  })));
};

module.exports = Thread;
//# sourceMappingURL=Thread.js.map
