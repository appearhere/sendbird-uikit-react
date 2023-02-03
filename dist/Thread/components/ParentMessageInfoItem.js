import React__default, { useState } from 'react';
import { u as useLocalization } from '../../LocalizationContext-e5f35d14.js';
import { r as isUserMessage, d as isEditedMessage, l as isFileMessage, n as isThumbnailMessage, J as getUIKitFileType, t as truncateString, s as isSentMessage, q as isVideoMessage, p as isGifMessage, C as getUIKitMessageType, y as getUIKitMessageTypes } from '../../index-105a85f4.js';
import { u as uuidv4 } from '../../uuid-392016d0.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../../index-f60cbf08.js';
import Word from '../../ui/Word.js';
import ImageRenderer from '../../ui/ImageRenderer.js';
import Icon, { IconTypes, IconColors } from '../../ui/Icon.js';
import TextButton from '../../ui/TextButton.js';
import useSendbirdStateContext from '../../useSendbirdStateContext.js';
import EmojiReactions from '../../ui/EmojiReactions.js';
import { u as useThreadContext } from '../../ThreadProvider-5ccbbc4b.js';
import '../../stringSet-42c0e16e.js';
import '../../index-5dcd7e0f.js';
import '../../tslib.es6-75bd0528.js';
import '../../utils/message/getOutgoingMessageState.js';
import 'prop-types';
import '../../ui/LinkLabel.js';
import '../../ui/MentionLabel.js';
import '../../ui/ContextMenu.js';
import 'react-dom';
import '../../ui/SortByRow.js';
import '../../ui/UserProfile.js';
import '../../UserProfileContext-517994e3.js';
import '../../sendbirdSelectors.js';
import '../../topics-0560d548.js';
import '../../utils-8a4a2ff6.js';
import '../../ui/Avatar.js';
import '../../ui/Button.js';
import '../../withSendbird.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import '../../color-52d916b6.js';
import '../../ui/Tooltip.js';
import '../../ui/TooltipWrapper.js';
import '../../ui/ReactionBadge.js';
import '../../ui/ReactionButton.js';
import '../../index-229a0736.js';
import '../context/types.js';
import '@sendbird/chat';
import '@sendbird/chat/groupChannel';
import '@sendbird/chat/message';

function ParentMessageInfoItem(_a) {
  var _b, _c, _d, _e, _f, _g, _h, _j;

  var className = _a.className,
      message = _a.message,
      showFileViewer = _a.showFileViewer;

  var _k = useSendbirdStateContext(),
      stores = _k.stores,
      config = _k.config;

  var replyType = config.replyType,
      isMentionEnabled = config.isMentionEnabled,
      isReactionEnabled = config.isReactionEnabled;
  var currentUserId = (_c = (_b = stores === null || stores === void 0 ? void 0 : stores.userStore) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.userId;
  var stringSet = useLocalization().stringSet;

  var _l = useThreadContext(),
      currentChannel = _l.currentChannel,
      emojiContainer = _l.emojiContainer,
      nicknamesMap = _l.nicknamesMap,
      toggleReaction = _l.toggleReaction;

  var isMentionedMessage = isMentionEnabled && ((_d = message === null || message === void 0 ? void 0 : message.mentionedMessageTemplate) === null || _d === void 0 ? void 0 : _d.length) > 0 && ((_e = message === null || message === void 0 ? void 0 : message.mentionedUsers) === null || _e === void 0 ? void 0 : _e.length) > 0; // Emoji reactions

  var isReactionActivated = isReactionEnabled && replyType === 'THREAD' && !(currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.isSuper) && !(currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.isBroadcast) && ((_f = message === null || message === void 0 ? void 0 : message.reactions) === null || _f === void 0 ? void 0 : _f.length) > 0; // OG message
  // const openUrl = () => {
  //   if (isOGMessage(message) && message?.ogMetaData?.url) {
  //     window.open(message.ogMetaData.url);
  //   }
  // };
  // Thumbnail mesage

  var _m = useState(false),
      isImageRendered = _m[0],
      setImageRendered = _m[1];

  var thumbnailUrl = ((_g = message === null || message === void 0 ? void 0 : message.thumbnails) === null || _g === void 0 ? void 0 : _g.length) > 0 ? (_h = message === null || message === void 0 ? void 0 : message.thumbnails[0]) === null || _h === void 0 ? void 0 : _h.url : '';
  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-parent-message-info-item ".concat(className)
  }, isUserMessage(message) && /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-parent-message-info-item__text-message",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_1
  }, isMentionedMessage ? message.mentionedMessageTemplate.split(' ').map(function (word) {
    return /*#__PURE__*/React__default.createElement(Word, {
      key: uuidv4(),
      word: word,
      message: message
    });
  }) : message === null || message === void 0 ? void 0 : message.message.split(' ').map(function (word) {
    return /*#__PURE__*/React__default.createElement(Word, {
      key: uuidv4(),
      word: word,
      message: message
    });
  }), isEditedMessage(message) && /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-parent-message-info-item__text-message edited",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_2
  }, " ".concat(stringSet.MESSAGE_EDITED, " "))), isFileMessage(message) && !isThumbnailMessage(message) && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-parent-message-info-item__file-message"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-parent-message-info-item__file-message__file-icon"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-parent-message-info-item__file-message__file-icon__icon",
    type: {
      IMAGE: IconTypes.PHOTO,
      VIDEO: IconTypes.PLAY,
      AUDIO: IconTypes.FILE_AUDIO,
      GIF: IconTypes.GIF,
      OTHERS: IconTypes.FILE_DOCUMENT
    }[getUIKitFileType(message === null || message === void 0 ? void 0 : message.type)],
    fillColor: IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  })), /*#__PURE__*/React__default.createElement(TextButton, {
    className: "sendbird-parent-message-info-item__file-message__file-name",
    onClick: function () {
      window.open(message === null || message === void 0 ? void 0 : message.url);
    },
    color: LabelColors.ONBACKGROUND_1
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-parent-message-info-item__file-message__file-name__text",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_1
  }, truncateString((message === null || message === void 0 ? void 0 : message.name) || (message === null || message === void 0 ? void 0 : message.url), 30)))), isThumbnailMessage(message) && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-parent-message-info-item__thumbnail-message",
    onClick: function () {
      if (isSentMessage(message)) {
        showFileViewer(true);
      }
    }
  }, /*#__PURE__*/React__default.createElement(ImageRenderer, {
    className: "sendbird-parent-message-info-item__thumbnail-message__thumbnail",
    url: thumbnailUrl || (message === null || message === void 0 ? void 0 : message.url) || (message === null || message === void 0 ? void 0 : message.plainUrl),
    alt: message === null || message === void 0 ? void 0 : message.type,
    width: "200px",
    height: "148px",
    onLoad: function () {
      setImageRendered(true);
    },
    placeHolder: function (style_) {
      return /*#__PURE__*/React__default.createElement("div", {
        className: "sendbird-parent-message-info-item__thumbnail-message__placeholder",
        style: style_
      }, /*#__PURE__*/React__default.createElement("div", {
        className: "sendbird-parent-message-info-item__thumbnail-message__placeholder__icon"
      }, /*#__PURE__*/React__default.createElement(Icon, {
        type: isVideoMessage(message) ? IconTypes.PLAY : IconTypes.PHOTO,
        fillColor: IconColors.ON_BACKGROUND_2,
        width: "34px",
        height: "34px"
      })));
    }
  }), isVideoMessage(message) && !thumbnailUrl && !isImageRendered && /*#__PURE__*/React__default.createElement("video", {
    className: "sendbird-parent-message-info-item__thumbnail-message__video"
  }, /*#__PURE__*/React__default.createElement("source", {
    src: (message === null || message === void 0 ? void 0 : message.url) || (message === null || message === void 0 ? void 0 : message.plainUrl),
    type: message === null || message === void 0 ? void 0 : message.type
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-parent-message-info-item__thumbnail-message__image-cover"
  }), (isVideoMessage(message) || isGifMessage(message)) && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-parent-message-info-item__thumbnail-message__icon-wrapper"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-parent-message-info-item__thumbnail-message__icon-wrapper__icon"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: isVideoMessage(message) ? IconTypes.PLAY : IconTypes.GIF,
    fillColor: IconColors.GRAY,
    width: "34px",
    height: "34px"
  })))), getUIKitMessageType(message) === ((_j = getUIKitMessageTypes === null || getUIKitMessageTypes === void 0 ? void 0 : getUIKitMessageTypes()) === null || _j === void 0 ? void 0 : _j.UNKNOWN) && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-parent-message-info-item__unknown-message"
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-parent-message-info-item__unknown-message__header",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_1
  }, stringSet.UNKNOWN__UNKNOWN_MESSAGE_TYPE), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-parent-message-info-item__unknown-message__description",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_2
  }, stringSet.UNKNOWN__CANNOT_READ_MESSAGE)), isReactionActivated && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-parent-message-info__reactions"
  }, /*#__PURE__*/React__default.createElement(EmojiReactions, {
    userId: currentUserId,
    message: message,
    isByMe: false,
    emojiContainer: emojiContainer,
    memberNicknamesMap: nicknamesMap,
    toggleReaction: toggleReaction
  })));
}

export { ParentMessageInfoItem as default };
//# sourceMappingURL=ParentMessageInfoItem.js.map
