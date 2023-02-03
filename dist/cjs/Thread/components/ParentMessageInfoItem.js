'use strict';

var React = require('react');
var LocalizationContext = require('../../LocalizationContext-f4281153.js');
var index = require('../../index-d05a5cae.js');
var uuid = require('../../uuid-2f4916c1.js');
var ui_Label = require('../../index-4197d014.js');
var ui_Word = require('../../ui/Word.js');
var ui_ImageRenderer = require('../../ui/ImageRenderer.js');
var ui_Icon = require('../../ui/Icon.js');
var ui_TextButton = require('../../ui/TextButton.js');
var useSendbirdStateContext = require('../../useSendbirdStateContext.js');
var ui_EmojiReactions = require('../../ui/EmojiReactions.js');
var Thread_context = require('../../ThreadProvider-5c14e997.js');
require('../../stringSet-2dfd148b.js');
require('../../index-d4bc012c.js');
require('../../tslib.es6-d6068b10.js');
require('../../utils/message/getOutgoingMessageState.js');
require('prop-types');
require('../../ui/LinkLabel.js');
require('../../ui/MentionLabel.js');
require('../../ui/ContextMenu.js');
require('react-dom');
require('../../ui/SortByRow.js');
require('../../ui/UserProfile.js');
require('../../UserProfileContext-fd00d1bd.js');
require('../../sendbirdSelectors.js');
require('../../topics-085b5602.js');
require('../../utils-a9158c72.js');
require('../../ui/Avatar.js');
require('../../ui/Button.js');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('../../color-0fae7c8e.js');
require('../../ui/Tooltip.js');
require('../../ui/TooltipWrapper.js');
require('../../ui/ReactionBadge.js');
require('../../ui/ReactionButton.js');
require('../../index-5977bdd5.js');
require('../context/types.js');
require('@sendbird/chat');
require('@sendbird/chat/groupChannel');
require('@sendbird/chat/message');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
  var stringSet = LocalizationContext.useLocalization().stringSet;

  var _l = Thread_context.useThreadContext(),
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

  var _m = React.useState(false),
      isImageRendered = _m[0],
      setImageRendered = _m[1];

  var thumbnailUrl = ((_g = message === null || message === void 0 ? void 0 : message.thumbnails) === null || _g === void 0 ? void 0 : _g.length) > 0 ? (_h = message === null || message === void 0 ? void 0 : message.thumbnails[0]) === null || _h === void 0 ? void 0 : _h.url : '';
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-parent-message-info-item ".concat(className)
  }, index.isUserMessage(message) && /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-parent-message-info-item__text-message",
    type: ui_Label.LabelTypography.BODY_1,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, isMentionedMessage ? message.mentionedMessageTemplate.split(' ').map(function (word) {
    return /*#__PURE__*/React__default["default"].createElement(ui_Word, {
      key: uuid.uuidv4(),
      word: word,
      message: message
    });
  }) : message === null || message === void 0 ? void 0 : message.message.split(' ').map(function (word) {
    return /*#__PURE__*/React__default["default"].createElement(ui_Word, {
      key: uuid.uuidv4(),
      word: word,
      message: message
    });
  }), index.isEditedMessage(message) && /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-parent-message-info-item__text-message edited",
    type: ui_Label.LabelTypography.BODY_1,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, " ".concat(stringSet.MESSAGE_EDITED, " "))), index.isFileMessage(message) && !index.isThumbnailMessage(message) && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-parent-message-info-item__file-message"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-parent-message-info-item__file-message__file-icon"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: "sendbird-parent-message-info-item__file-message__file-icon__icon",
    type: {
      IMAGE: ui_Icon.IconTypes.PHOTO,
      VIDEO: ui_Icon.IconTypes.PLAY,
      AUDIO: ui_Icon.IconTypes.FILE_AUDIO,
      GIF: ui_Icon.IconTypes.GIF,
      OTHERS: ui_Icon.IconTypes.FILE_DOCUMENT
    }[index.getUIKitFileType(message === null || message === void 0 ? void 0 : message.type)],
    fillColor: ui_Icon.IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  })), /*#__PURE__*/React__default["default"].createElement(ui_TextButton, {
    className: "sendbird-parent-message-info-item__file-message__file-name",
    onClick: function () {
      window.open(message === null || message === void 0 ? void 0 : message.url);
    },
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-parent-message-info-item__file-message__file-name__text",
    type: ui_Label.LabelTypography.BODY_1,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, index.truncateString((message === null || message === void 0 ? void 0 : message.name) || (message === null || message === void 0 ? void 0 : message.url), 30)))), index.isThumbnailMessage(message) && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-parent-message-info-item__thumbnail-message",
    onClick: function () {
      if (index.isSentMessage(message)) {
        showFileViewer(true);
      }
    }
  }, /*#__PURE__*/React__default["default"].createElement(ui_ImageRenderer, {
    className: "sendbird-parent-message-info-item__thumbnail-message__thumbnail",
    url: thumbnailUrl || (message === null || message === void 0 ? void 0 : message.url) || (message === null || message === void 0 ? void 0 : message.plainUrl),
    alt: message === null || message === void 0 ? void 0 : message.type,
    width: "200px",
    height: "148px",
    onLoad: function () {
      setImageRendered(true);
    },
    placeHolder: function (style_) {
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "sendbird-parent-message-info-item__thumbnail-message__placeholder",
        style: style_
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        className: "sendbird-parent-message-info-item__thumbnail-message__placeholder__icon"
      }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
        type: index.isVideoMessage(message) ? ui_Icon.IconTypes.PLAY : ui_Icon.IconTypes.PHOTO,
        fillColor: ui_Icon.IconColors.ON_BACKGROUND_2,
        width: "34px",
        height: "34px"
      })));
    }
  }), index.isVideoMessage(message) && !thumbnailUrl && !isImageRendered && /*#__PURE__*/React__default["default"].createElement("video", {
    className: "sendbird-parent-message-info-item__thumbnail-message__video"
  }, /*#__PURE__*/React__default["default"].createElement("source", {
    src: (message === null || message === void 0 ? void 0 : message.url) || (message === null || message === void 0 ? void 0 : message.plainUrl),
    type: message === null || message === void 0 ? void 0 : message.type
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-parent-message-info-item__thumbnail-message__image-cover"
  }), (index.isVideoMessage(message) || index.isGifMessage(message)) && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-parent-message-info-item__thumbnail-message__icon-wrapper"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-parent-message-info-item__thumbnail-message__icon-wrapper__icon"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: index.isVideoMessage(message) ? ui_Icon.IconTypes.PLAY : ui_Icon.IconTypes.GIF,
    fillColor: ui_Icon.IconColors.GRAY,
    width: "34px",
    height: "34px"
  })))), index.getUIKitMessageType(message) === ((_j = index.getUIKitMessageTypes === null || index.getUIKitMessageTypes === void 0 ? void 0 : index.getUIKitMessageTypes()) === null || _j === void 0 ? void 0 : _j.UNKNOWN) && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-parent-message-info-item__unknown-message"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-parent-message-info-item__unknown-message__header",
    type: ui_Label.LabelTypography.BODY_1,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, stringSet.UNKNOWN__UNKNOWN_MESSAGE_TYPE), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-parent-message-info-item__unknown-message__description",
    type: ui_Label.LabelTypography.BODY_1,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, stringSet.UNKNOWN__CANNOT_READ_MESSAGE)), isReactionActivated && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-parent-message-info__reactions"
  }, /*#__PURE__*/React__default["default"].createElement(ui_EmojiReactions, {
    userId: currentUserId,
    message: message,
    isByMe: false,
    emojiContainer: emojiContainer,
    memberNicknamesMap: nicknamesMap,
    toggleReaction: toggleReaction
  })));
}

module.exports = ParentMessageInfoItem;
//# sourceMappingURL=ParentMessageInfoItem.js.map
