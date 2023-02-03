'use strict';

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-597f5cf8.js');
var tslib_es6 = require('../tslib.es6-d6068b10.js');
var React = require('react');
var index$1 = require('../index-5977bdd5.js');
var ui_Avatar = require('./Avatar.js');
var ui_UserProfile = require('./UserProfile.js');
var ui_MessageStatus = require('../index-daac2dae.js');
var ui_MessageItemMenu = require('./MessageItemMenu.js');
var ui_MessageItemReactionMenu = require('./MessageItemReactionMenu.js');
var ui_ContextMenu = require('./ContextMenu.js');
var ui_Label = require('../index-4197d014.js');
var ui_EmojiReactions = require('./EmojiReactions.js');
var ui_AdminMessage = require('./AdminMessage.js');
var ui_TextMessageItemBody = require('./TextMessageItemBody.js');
var ui_FileMessageItemBody = require('./FileMessageItemBody.js');
var ui_ThumbnailMessageItemBody = require('./ThumbnailMessageItemBody.js');
var ui_OGMessageItemBody = require('./OGMessageItemBody.js');
var ui_UnknownMessageItemBody = require('./UnknownMessageItemBody.js');
var ui_QuoteMessage = require('./QuoteMessage.js');
var index = require('../index-d05a5cae.js');
var UserProfileContext = require('../UserProfileContext-fd00d1bd.js');
var LocalizationContext = require('../LocalizationContext-f4281153.js');
var useSendbirdStateContext = require('../useSendbirdStateContext.js');
var useLongPress = require('../useLongPress-2f4ee82c.js');
var ui_Icon = require('./Icon.js');
var ui_BottomSheet = require('./BottomSheet.js');
var ui_ImageRenderer = require('./ImageRenderer.js');
var ui_ReactionButton = require('./ReactionButton.js');
var MediaQueryContext = require('../MediaQueryContext-9a5566fc.js');
var ui_ThreadReplies = require('./ThreadReplies.js');
var _const = require('../const-43cebab9.js');
require('../index-d4bc012c.js');
require('../uuid-2f4916c1.js');
require('prop-types');
require('../sendbirdSelectors.js');
require('../topics-085b5602.js');
require('../utils-a9158c72.js');
require('./Button.js');
require('../stringSet-2dfd148b.js');
require('./Loader.js');
require('../utils/message/getOutgoingMessageState.js');
require('../index-661b02a2.js');
require('../index-fb9d8ec0.js');
require('./IconButton.js');
require('react-dom');
require('./SortByRow.js');
require('./Tooltip.js');
require('./TooltipWrapper.js');
require('./ReactionBadge.js');
require('./Word.js');
require('./LinkLabel.js');
require('./MentionLabel.js');
require('./TextButton.js');
require('../color-0fae7c8e.js');
require('../withSendbird.js');
require('../index-1b132096.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var MobileContextMenu = function (props) {
  var _a;

  var hideMenu = props.hideMenu,
      channel = props.channel,
      message = props.message,
      replyType = props.replyType,
      userId = props.userId,
      resendMessage = props.resendMessage,
      showEdit = props.showEdit,
      showRemove = props.showRemove,
      setQuoteMessage = props.setQuoteMessage,
      parentRef = props.parentRef;
  var isByMe = ((_a = message === null || message === void 0 ? void 0 : message.sender) === null || _a === void 0 ? void 0 : _a.userId) === userId;
  var stringSet = LocalizationContext.useLocalization().stringSet;
  var showMenuItemCopy = index.isUserMessage(message);
  var showMenuItemEdit = index.isUserMessage(message) && index.isSentMessage(message) && isByMe;
  var showMenuItemResend = index.isFailedMessage(message) && (message === null || message === void 0 ? void 0 : message.isResendable) && isByMe;
  var showMenuItemDelete = !index.isPendingMessage(message) && isByMe;
  var showMenuItemDownload = !index.isPendingMessage(message) && index.isFileMessage(message);
  var showMenuItemReply = replyType === 'QUOTE_REPLY' && !index.isFailedMessage(message) && !index.isPendingMessage(message) && (channel === null || channel === void 0 ? void 0 : channel.isGroupChannel()) && !(channel === null || channel === void 0 ? void 0 : channel.isBroadcast);
  var fileMessage = message;
  return /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu["default"], {
    isOpen: true,
    menuItems: function () {
      var _a;

      return /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItems, {
        className: "sendbird-message__mobile-context-menu",
        parentRef: parentRef,
        parentContainRef: parentRef,
        closeDropdown: hideMenu
      }, showMenuItemCopy && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
        className: "sendbird-message__mobile-context-menu-item menu-item-copy",
        onClick: function () {
          hideMenu();
          index.copyToClipboard(message === null || message === void 0 ? void 0 : message.message);
        }
      }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
        type: ui_Label.LabelTypography.SUBTITLE_1
      }, stringSet === null || stringSet === void 0 ? void 0 : stringSet.MESSAGE_MENU__COPY), /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
        type: ui_Icon.IconTypes.COPY,
        fillColor: ui_Icon.IconColors.PRIMARY,
        width: "24px",
        height: "24px"
      })), showMenuItemReply && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
        className: "sendbird-message__mobile-context-menu-item menu-item-reply",
        onClick: function () {
          hideMenu();
          setQuoteMessage(message);
        },
        disable: (message === null || message === void 0 ? void 0 : message.parentMessageId) > 0
      }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
        type: ui_Label.LabelTypography.SUBTITLE_1
      }, stringSet.MESSAGE_MENU__REPLY), /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
        type: ui_Icon.IconTypes.REPLY,
        fillColor: ui_Icon.IconColors.PRIMARY,
        width: "24px",
        height: "24px"
      })), showMenuItemEdit && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
        className: "sendbird-message__mobile-context-menu-item menu-item-edit",
        onClick: function () {
          hideMenu();
          showEdit(true);
        }
      }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
        type: ui_Label.LabelTypography.SUBTITLE_1
      }, stringSet.MESSAGE_MENU__EDIT), /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
        type: ui_Icon.IconTypes.EDIT,
        fillColor: ui_Icon.IconColors.PRIMARY,
        width: "24px",
        height: "24px"
      })), showMenuItemResend && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
        className: "sendbird-message__mobile-context-menu-item menu-item-resend",
        onClick: function () {
          hideMenu();
          resendMessage(message);
        }
      }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
        type: ui_Label.LabelTypography.SUBTITLE_1
      }, stringSet.MESSAGE_MENU__RESEND), /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
        type: ui_Icon.IconTypes.REFRESH,
        fillColor: ui_Icon.IconColors.PRIMARY,
        width: "24px",
        height: "24px"
      })), showMenuItemDelete && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
        className: "sendbird-message__mobile-context-menu-item menu-item-delete",
        onClick: function () {
          hideMenu();
          showRemove(true);
        },
        disable: ((_a = message === null || message === void 0 ? void 0 : message.threadInfo) === null || _a === void 0 ? void 0 : _a.replyCount) > 0
      }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
        type: ui_Label.LabelTypography.SUBTITLE_1
      }, stringSet.MESSAGE_MENU__DELETE), /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
        type: ui_Icon.IconTypes.DELETE,
        fillColor: ui_Icon.IconColors.PRIMARY,
        width: "24px",
        height: "24px"
      })), showMenuItemDownload && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItem, {
        className: "sendbird-message__mobile-context-menu-item menu-item-save",
        onClick: function () {
          hideMenu();
        }
      }, /*#__PURE__*/React__default["default"].createElement("a", {
        className: "sendbird-message__contextmenu--hyperlink",
        rel: "noopener noreferrer",
        href: fileMessage === null || fileMessage === void 0 ? void 0 : fileMessage.url,
        target: "_blank"
      }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
        type: ui_Label.LabelTypography.SUBTITLE_1
      }, stringSet.MESSAGE_MENU__SAVE), /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
        type: ui_Icon.IconTypes.DOWNLOAD,
        fillColor: ui_Icon.IconColors.PRIMARY,
        width: "24px",
        height: "24px"
      }))));
    }
  });
};

var EMOJI_SIZE = 38;

var MobileBottomSheet = function (props) {
  var _a;

  var hideMenu = props.hideMenu,
      channel = props.channel,
      emojiContainer = props.emojiContainer,
      message = props.message,
      replyType = props.replyType,
      userId = props.userId,
      resendMessage = props.resendMessage,
      toggleReaction = props.toggleReaction,
      isReactionEnabled = props.isReactionEnabled,
      showEdit = props.showEdit,
      showRemove = props.showRemove,
      setQuoteMessage = props.setQuoteMessage;
  var isByMe = ((_a = message === null || message === void 0 ? void 0 : message.sender) === null || _a === void 0 ? void 0 : _a.userId) === userId;
  var stringSet = LocalizationContext.useLocalization().stringSet;
  var showMenuItemCopy = index.isUserMessage(message);
  var showMenuItemEdit = index.isUserMessage(message) && index.isSentMessage(message) && isByMe;
  var showMenuItemResend = index.isFailedMessage(message) && (message === null || message === void 0 ? void 0 : message.isResendable) && isByMe;
  var showMenuItemDelete = !index.isPendingMessage(message) && isByMe;
  var showMenuItemDownload = !index.isPendingMessage(message) && index.isFileMessage(message);
  var showReaction = !index.isFailedMessage(message) && !index.isPendingMessage(message) && isReactionEnabled;
  var showMenuItemReply = replyType === 'QUOTE_REPLY' && !index.isFailedMessage(message) && !index.isPendingMessage(message) && (channel === null || channel === void 0 ? void 0 : channel.isGroupChannel()) && !(channel === null || channel === void 0 ? void 0 : channel.isBroadcast);
  var disableReaction = (message === null || message === void 0 ? void 0 : message.parentMessageId) > 0;
  var fileMessage = message;
  var maxEmojisPerRow = Math.floor((window === null || window === void 0 ? void 0 : window.innerWidth) / EMOJI_SIZE) - 1;

  var _b = React.useState(false),
      showEmojisOnly = _b[0],
      setShowEmojisOnly = _b[1];

  var emojis = index.getEmojiListAll(emojiContainer); // calculate max emojis that can be shown in screen

  var visibleEmojis = showEmojisOnly ? emojis : emojis === null || emojis === void 0 ? void 0 : emojis.slice(0, maxEmojisPerRow);
  var canShowMoreEmojis = emojis.length > maxEmojisPerRow;
  return /*#__PURE__*/React__default["default"].createElement(ui_BottomSheet, {
    onBackdropClick: hideMenu
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-message__bottomsheet"
  }, showReaction && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-message__bottomsheet-reactions"
  }, /*#__PURE__*/React__default["default"].createElement("ul", {
    className: "sendbird-message__bottomsheet-reaction-bar"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "\n                    sendbird-message__bottomsheet-reaction-bar__row\n                    ".concat(showEmojisOnly ? 'sendbird-message__bottomsheet-reaction-bar__all' : '', "\n                  ")
  }, visibleEmojis.map(function (emoji) {
    var _a, _b, _c;

    var isReacted = (_c = (_b = (_a = message === null || message === void 0 ? void 0 : message.reactions) === null || _a === void 0 ? void 0 : _a.filter(function (reaction) {
      return reaction.key === emoji.key;
    })[0]) === null || _b === void 0 ? void 0 : _b.userIds) === null || _c === void 0 ? void 0 : _c.some(function (reactorId) {
      return reactorId === userId;
    });
    return /*#__PURE__*/React__default["default"].createElement(ui_ReactionButton, {
      key: emoji.key,
      width: "".concat(EMOJI_SIZE, "px"),
      height: "".concat(EMOJI_SIZE, "px"),
      selected: isReacted,
      onClick: function () {
        hideMenu();
        toggleReaction(message, emoji.key, isReacted);
      }
    }, /*#__PURE__*/React__default["default"].createElement(ui_ImageRenderer, {
      url: (emoji === null || emoji === void 0 ? void 0 : emoji.url) || '',
      width: "28px",
      height: "28px",
      placeHolder: function (style) {
        return /*#__PURE__*/React__default["default"].createElement("div", {
          style: style
        }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
          type: ui_Icon.IconTypes.QUESTION,
          fillColor: ui_Icon.IconColors.ON_BACKGROUND_3,
          width: "28px",
          height: "28px"
        }));
      }
    }));
  }), canShowMoreEmojis && !showEmojisOnly && /*#__PURE__*/React__default["default"].createElement(ui_ReactionButton, {
    key: "emoji_more",
    width: "38px",
    height: "38px",
    onClick: function () {
      setShowEmojisOnly(true);
    }
  }, /*#__PURE__*/React__default["default"].createElement(ui_ImageRenderer, {
    url: '',
    width: "28px",
    height: "28px",
    placeHolder: function (style) {
      return /*#__PURE__*/React__default["default"].createElement("div", {
        style: style
      }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
        type: ui_Icon.IconTypes.EMOJI_MORE,
        fillColor: ui_Icon.IconColors.ON_BACKGROUND_3,
        width: "28px",
        height: "28px"
      }));
    }
  }))))), !showEmojisOnly && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-message__bottomsheet--actions"
  }, showMenuItemCopy && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-message__bottomsheet--action",
    onClick: function () {
      hideMenu();
      index.copyToClipboard(message === null || message === void 0 ? void 0 : message.message);
    }
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.COPY,
    fillColor: ui_Icon.IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  }), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.SUBTITLE_1
  }, stringSet === null || stringSet === void 0 ? void 0 : stringSet.MESSAGE_MENU__COPY)), showMenuItemEdit && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-message__bottomsheet--action",
    onClick: function () {
      hideMenu();
      showEdit(true);
    }
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.EDIT,
    fillColor: ui_Icon.IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  }), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.SUBTITLE_1
  }, stringSet === null || stringSet === void 0 ? void 0 : stringSet.MESSAGE_MENU__EDIT)), showMenuItemResend && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-message__bottomsheet--action",
    onClick: function () {
      hideMenu();
      resendMessage(message);
    }
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.REFRESH,
    fillColor: ui_Icon.IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  }), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.SUBTITLE_1
  }, stringSet === null || stringSet === void 0 ? void 0 : stringSet.MESSAGE_MENU__RESEND)), showMenuItemReply && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-message__bottomsheet--action\n                      ".concat(disableReaction ? 'sendbird-message__bottomsheet--action-disabled' : '', "\n                    "),
    role: "menuitem",
    "aria-disabled": disableReaction ? true : false,
    onClick: function () {
      if (!disableReaction) {
        hideMenu();
        setQuoteMessage(message);
      }
    }
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.REPLY,
    fillColor: disableReaction ? ui_Icon.IconColors.ON_BACKGROUND_3 : ui_Icon.IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  }), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.SUBTITLE_1,
    color: disableReaction && ui_Label.LabelColors.ONBACKGROUND_4
  }, stringSet === null || stringSet === void 0 ? void 0 : stringSet.MESSAGE_MENU__REPLY)), showMenuItemDelete && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-message__bottomsheet--action",
    onClick: function () {
      hideMenu();
      showRemove(true);
    }
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.DELETE,
    fillColor: ui_Icon.IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  }), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.SUBTITLE_1
  }, stringSet === null || stringSet === void 0 ? void 0 : stringSet.MESSAGE_MENU__DELETE)), showMenuItemDownload && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-message__bottomsheet--action",
    onClick: function () {
      hideMenu();
    }
  }, /*#__PURE__*/React__default["default"].createElement("a", {
    className: "sendbird-message__bottomsheet--hyperlink",
    rel: "noopener noreferrer",
    href: fileMessage === null || fileMessage === void 0 ? void 0 : fileMessage.url,
    target: "_blank"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.DOWNLOAD,
    fillColor: ui_Icon.IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  }), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.SUBTITLE_1
  }, stringSet === null || stringSet === void 0 ? void 0 : stringSet.MESSAGE_MENU__SAVE))))));
};

var MobileMenu = function (props) {
  var message = props.message,
      hideMenu = props.hideMenu,
      userId = props.userId,
      channel = props.channel,
      _a = props.isReactionEnabled,
      isReactionEnabled = _a === void 0 ? false : _a,
      isByMe = props.isByMe,
      replyType = props.replyType,
      disabled = props.disabled,
      showRemove = props.showRemove,
      showEdit = props.showEdit,
      resendMessage = props.resendMessage,
      setQuoteMessage = props.setQuoteMessage,
      emojiContainer = props.emojiContainer,
      toggleReaction = props.toggleReaction,
      parentRef = props.parentRef;
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, isReactionEnabled ? /*#__PURE__*/React__default["default"].createElement(MobileBottomSheet, {
    channel: channel,
    message: message,
    hideMenu: hideMenu,
    isByMe: isByMe,
    userId: userId,
    replyType: replyType,
    disabled: disabled,
    showRemove: showRemove,
    showEdit: showEdit,
    resendMessage: resendMessage,
    setQuoteMessage: setQuoteMessage,
    emojiContainer: emojiContainer,
    toggleReaction: toggleReaction,
    isReactionEnabled: isReactionEnabled
  }) : /*#__PURE__*/React__default["default"].createElement(MobileContextMenu, {
    channel: channel,
    userId: userId,
    message: message,
    hideMenu: hideMenu,
    isByMe: isByMe,
    showEdit: showEdit,
    replyType: replyType,
    disabled: disabled,
    showRemove: showRemove,
    resendMessage: resendMessage,
    setQuoteMessage: setQuoteMessage,
    parentRef: parentRef
  }));
};

function MessageContent(_a) {
  var _b, _c, _d, _e, _f, _g, _h, _j, _k;

  var className = _a.className,
      userId = _a.userId,
      channel = _a.channel,
      message = _a.message,
      _l = _a.disabled,
      disabled = _l === void 0 ? false : _l,
      _m = _a.chainTop,
      chainTop = _m === void 0 ? false : _m,
      _o = _a.chainBottom,
      chainBottom = _o === void 0 ? false : _o,
      _p = _a.isReactionEnabled,
      isReactionEnabled = _p === void 0 ? false : _p,
      _q = _a.disableQuoteMessage,
      disableQuoteMessage = _q === void 0 ? false : _q,
      replyType = _a.replyType,
      threadReplySelectType = _a.threadReplySelectType,
      nicknamesMap = _a.nicknamesMap,
      emojiContainer = _a.emojiContainer,
      scrollToMessage = _a.scrollToMessage,
      showEdit = _a.showEdit,
      showRemove = _a.showRemove,
      showFileViewer = _a.showFileViewer,
      resendMessage = _a.resendMessage,
      toggleReaction = _a.toggleReaction,
      setQuoteMessage = _a.setQuoteMessage,
      onReplyInThread = _a.onReplyInThread,
      onQuoteMessageClick = _a.onQuoteMessageClick;
  var messageTypes = index.getUIKitMessageTypes();
  var dateLocale = LocalizationContext.useLocalization().dateLocale;
  var config = ((useSendbirdStateContext === null || useSendbirdStateContext === void 0 ? void 0 : useSendbirdStateContext()) || {}).config;

  var _r = React.useContext(UserProfileContext.UserProfileContext),
      disableUserProfile = _r.disableUserProfile,
      renderUserProfile = _r.renderUserProfile;

  var avatarRef = React.useRef(null);
  var contentRef = React.useRef(null);
  var isMobile = MediaQueryContext.useMediaQueryContext().isMobile;

  var _s = React.useState(false),
      showMenu = _s[0],
      setShowMenu = _s[1];

  var _t = React.useState(false),
      mouseHover = _t[0],
      setMouseHover = _t[1];

  var _u = React.useState(false),
      supposedHover = _u[0],
      setSupposedHover = _u[1];

  var isByMe = userId === ((_b = message === null || message === void 0 ? void 0 : message.sender) === null || _b === void 0 ? void 0 : _b.userId) || (message === null || message === void 0 ? void 0 : message.sendingStatus) === 'pending' || (message === null || message === void 0 ? void 0 : message.sendingStatus) === 'failed';
  var isByMeClassName = isByMe ? 'outgoing' : 'incoming';
  var chainTopClassName = chainTop ? 'chain-top' : '';
  var isReactionEnabledClassName = isReactionEnabled ? 'use-reactions' : '';
  var supposedHoverClassName = supposedHover ? 'sendbird-mouse-hover' : '';
  var useReplying = !!((replyType === 'QUOTE_REPLY' || replyType === 'THREAD') && (message === null || message === void 0 ? void 0 : message.parentMessageId) && (message === null || message === void 0 ? void 0 : message.parentMessage) && !disableQuoteMessage);
  var useReplyingClassName = useReplying ? 'use-quote' : ''; // Thread replies

  var displayThreadReplies = ((_c = message === null || message === void 0 ? void 0 : message.threadInfo) === null || _c === void 0 ? void 0 : _c.replyCount) > 0 && replyType === 'THREAD'; // onMouseDown: (e: React.MouseEvent<T>) => void;
  // onTouchStart: (e: React.TouchEvent<T>) => void;
  // onMouseUp: (e: React.MouseEvent<T>) => void;
  // onMouseLeave: (e: React.MouseEvent<T>) => void;
  // onTouchEnd: (e: React.TouchEvent<T>) => void;

  var longPress = useLongPress.useLongPress({
    onLongPress: function () {
      if (isMobile) {
        setShowMenu(true);
      }
    },
    onClick: function () {
      // @ts-ignore
      if (isMobile && index.isThumbnailMessage(message) && index.isSentMessage(message)) {
        showFileViewer(true);
      }
    }
  }, {
    delay: 300
  });

  if (((_d = message === null || message === void 0 ? void 0 : message.isAdminMessage) === null || _d === void 0 ? void 0 : _d.call(message)) || (message === null || message === void 0 ? void 0 : message.messageType) === 'admin') {
    return /*#__PURE__*/React__default["default"].createElement(ui_AdminMessage, {
      message: message
    });
  }

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName([className, 'sendbird-message-content', isByMeClassName]),
    onMouseOver: function () {
      return setMouseHover(true);
    },
    onMouseLeave: function () {
      return setMouseHover(false);
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName(['sendbird-message-content__left', isReactionEnabledClassName, isByMeClassName, useReplyingClassName])
  }, !isByMe && !chainBottom &&
  /*#__PURE__*/

  /** user profile */
  React__default["default"].createElement(ui_ContextMenu["default"], {
    menuTrigger: function (toggleDropdown) {
      var _a, _b, _c;

      return /*#__PURE__*/React__default["default"].createElement(ui_Avatar["default"], {
        className: "sendbird-message-content__left__avatar ".concat(displayThreadReplies ? 'use-thread-replies' : '') // @ts-ignore
        ,
        src: ((_b = (_a = channel === null || channel === void 0 ? void 0 : channel.members) === null || _a === void 0 ? void 0 : _a.find(function (member) {
          var _a;

          return (member === null || member === void 0 ? void 0 : member.userId) === ((_a = message === null || message === void 0 ? void 0 : message.sender) === null || _a === void 0 ? void 0 : _a.userId);
        })) === null || _b === void 0 ? void 0 : _b.profileUrl) || ((_c = message === null || message === void 0 ? void 0 : message.sender) === null || _c === void 0 ? void 0 : _c.profileUrl) || '' // TODO: Divide getting profileUrl logic to utils
        ,
        ref: avatarRef,
        width: "28px",
        height: "28px",
        onClick: function () {
          if (!disableUserProfile) toggleDropdown();
        }
      });
    },
    menuItems: function (closeDropdown) {
      return /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.MenuItems
      /**
      * parentRef: For catching location(x, y) of MenuItems
      * parentContainRef: For toggling more options(menus & reactions)
      */
      , {
        parentRef: avatarRef,
        parentContainRef: avatarRef,
        closeDropdown: closeDropdown,
        style: {
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      }, renderUserProfile // @ts-ignore
      ? renderUserProfile({
        user: message === null || message === void 0 ? void 0 : message.sender,
        close: closeDropdown
      }) // @ts-ignore
      : /*#__PURE__*/React__default["default"].createElement(ui_UserProfile, {
        user: message.sender,
        onSuccess: closeDropdown
      }));
    }
  }), isByMe && !isMobile && /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName(['sendbird-message-content-menu', isReactionEnabledClassName, supposedHoverClassName, isByMeClassName])
  }, /*#__PURE__*/React__default["default"].createElement(ui_MessageItemMenu, {
    className: "sendbird-message-content-menu__normal-menu",
    channel: channel,
    message: message,
    isByMe: isByMe,
    replyType: replyType,
    disabled: disabled,
    showEdit: showEdit,
    showRemove: showRemove,
    resendMessage: resendMessage,
    setQuoteMessage: setQuoteMessage,
    setSupposedHover: setSupposedHover,
    onReplyInThread: function (_a) {
      var message = _a.message;

      if (threadReplySelectType === _const.ThreadReplySelectType.THREAD) {
        onReplyInThread({
          message: message
        });
      } else if (threadReplySelectType === _const.ThreadReplySelectType.PARENT) {
        scrollToMessage(message.parentMessage.createdAt, message.parentMessageId);
      }
    }
  }), isReactionEnabled && /*#__PURE__*/React__default["default"].createElement(ui_MessageItemReactionMenu, {
    className: "sendbird-message-content-menu__reaction-menu",
    message: message,
    userId: userId,
    spaceFromTrigger: {},
    emojiContainer: emojiContainer,
    toggleReaction: toggleReaction,
    setSupposedHover: setSupposedHover
  }))), /*#__PURE__*/React__default["default"].createElement("div", _rollupPluginBabelHelpers._extends({
    className: "sendbird-message-content__middle"
  }, isMobile ? tslib_es6.__assign({}, longPress) : {}, {
    ref: contentRef
  }), !isByMe && !chainTop && !useReplying && /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-message-content__middle__sender-name",
    type: ui_Label.LabelTypography.CAPTION_2,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, // @ts-ignore
  ((_f = (_e = channel === null || channel === void 0 ? void 0 : channel.members) === null || _e === void 0 ? void 0 : _e.find(function (member) {
    var _a;

    return (member === null || member === void 0 ? void 0 : member.userId) === ((_a = message === null || message === void 0 ? void 0 : message.sender) === null || _a === void 0 ? void 0 : _a.userId);
  })) === null || _f === void 0 ? void 0 : _f.nickname) || index.getSenderName(message) // TODO: Divide getting profileUrl logic to utils
  ), useReplying ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName(['sendbird-message-content__middle__quote-message', isByMe ? 'outgoing' : 'incoming', useReplyingClassName])
  }, /*#__PURE__*/React__default["default"].createElement(ui_QuoteMessage, {
    message: message,
    userId: userId,
    isByMe: isByMe,
    isUnavailable: replyType === 'THREAD' && (channel === null || channel === void 0 ? void 0 : channel.joinedAt) * 1000 > ((_g = message === null || message === void 0 ? void 0 : message.parentMessage) === null || _g === void 0 ? void 0 : _g.createdAt),
    onClick: function () {
      var _a;

      if (replyType === 'THREAD' && threadReplySelectType === _const.ThreadReplySelectType.THREAD) {
        onQuoteMessageClick === null || onQuoteMessageClick === void 0 ? void 0 : onQuoteMessageClick({
          message: message
        });
      }

      if ((replyType === 'QUOTE_REPLY' || replyType === 'THREAD' && threadReplySelectType === _const.ThreadReplySelectType.PARENT) && ((_a = message === null || message === void 0 ? void 0 : message.parentMessage) === null || _a === void 0 ? void 0 : _a.createdAt) && (message === null || message === void 0 ? void 0 : message.parentMessageId)) {
        scrollToMessage(message.parentMessage.createdAt, message.parentMessageId);
      }
    }
  })) : null, /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName(['sendbird-message-content__middle__body-container'])
  }, isByMe && !chainBottom && /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName(['sendbird-message-content__middle__body-container__created-at', 'left', supposedHoverClassName])
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-message-content__middle__body-container__created-at__component-container"
  }, /*#__PURE__*/React__default["default"].createElement(ui_MessageStatus.MessageStatus, {
    message: message,
    channel: channel
  }))), index.isTextMessage(message) && /*#__PURE__*/React__default["default"].createElement(ui_TextMessageItemBody, {
    className: "sendbird-message-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    mouseHover: mouseHover,
    isMentionEnabled: (config === null || config === void 0 ? void 0 : config.isMentionEnabled) || false,
    isReactionEnabled: isReactionEnabled
  }), index.isOGMessage(message) && /*#__PURE__*/React__default["default"].createElement(ui_OGMessageItemBody, {
    className: "sendbird-message-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    mouseHover: mouseHover,
    isMentionEnabled: (config === null || config === void 0 ? void 0 : config.isMentionEnabled) || false,
    isReactionEnabled: isReactionEnabled
  }), index.getUIKitMessageType(message) === messageTypes.FILE && /*#__PURE__*/React__default["default"].createElement(ui_FileMessageItemBody, {
    className: "sendbird-message-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    mouseHover: mouseHover,
    isReactionEnabled: isReactionEnabled
  }), index.isThumbnailMessage(message) && /*#__PURE__*/React__default["default"].createElement(ui_ThumbnailMessageItemBody, {
    className: "sendbird-message-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    mouseHover: mouseHover,
    isReactionEnabled: isReactionEnabled,
    showFileViewer: showFileViewer
  }), index.getUIKitMessageType(message) === messageTypes.UNKNOWN && /*#__PURE__*/React__default["default"].createElement(ui_UnknownMessageItemBody, {
    className: "sendbird-message-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    mouseHover: mouseHover,
    isReactionEnabled: isReactionEnabled
  }), isReactionEnabled && ((_h = message === null || message === void 0 ? void 0 : message.reactions) === null || _h === void 0 ? void 0 : _h.length) > 0 && /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName(['sendbird-message-content-reactions', !isByMe || index.isThumbnailMessage(message) || index.isOGMessage(message) ? '' : 'primary', mouseHover ? 'mouse-hover' : ''])
  }, /*#__PURE__*/React__default["default"].createElement(ui_EmojiReactions, {
    userId: userId,
    message: message,
    isByMe: isByMe,
    emojiContainer: emojiContainer,
    memberNicknamesMap: nicknamesMap,
    toggleReaction: toggleReaction
  })), !isByMe && !chainBottom && /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: index.getClassName(['sendbird-message-content__middle__body-container__created-at', 'right', supposedHoverClassName]),
    type: ui_Label.LabelTypography.CAPTION_3,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, index$1.format((message === null || message === void 0 ? void 0 : message.createdAt) || 0, 'p', {
    locale: dateLocale
  }))), displayThreadReplies && /*#__PURE__*/React__default["default"].createElement(ui_ThreadReplies, {
    className: "sendbird-message-content__middle__thread-replies",
    threadInfo: message === null || message === void 0 ? void 0 : message.threadInfo,
    onClick: function () {
      return onReplyInThread === null || onReplyInThread === void 0 ? void 0 : onReplyInThread({
        message: message
      });
    }
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName(['sendbird-message-content__right', chainTopClassName, isReactionEnabledClassName, useReplyingClassName])
  }, !isByMe && !isMobile && /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName(['sendbird-message-content-menu', chainTopClassName, supposedHoverClassName, isByMeClassName])
  }, isReactionEnabled && /*#__PURE__*/React__default["default"].createElement(ui_MessageItemReactionMenu, {
    className: "sendbird-message-content-menu__reaction-menu",
    message: message,
    userId: userId,
    spaceFromTrigger: {},
    emojiContainer: emojiContainer,
    toggleReaction: toggleReaction,
    setSupposedHover: setSupposedHover
  }), /*#__PURE__*/React__default["default"].createElement(ui_MessageItemMenu, {
    className: "sendbird-message-content-menu__normal-menu",
    channel: channel,
    message: message,
    isByMe: isByMe,
    replyType: replyType,
    disabled: disabled,
    showRemove: showRemove,
    resendMessage: resendMessage,
    setQuoteMessage: setQuoteMessage,
    setSupposedHover: setSupposedHover,
    onReplyInThread: function (_a) {
      var message = _a.message;

      if (threadReplySelectType === _const.ThreadReplySelectType.THREAD) {
        onReplyInThread({
          message: message
        });
      } else if (threadReplySelectType === _const.ThreadReplySelectType.PARENT) {
        scrollToMessage(message.parentMessage.createdAt, message.parentMessageId);
      }
    }
  }))), showMenu && (((_j = message === null || message === void 0 ? void 0 : message.isUserMessage) === null || _j === void 0 ? void 0 : _j.call(message)) || ((_k = message === null || message === void 0 ? void 0 : message.isFileMessage) === null || _k === void 0 ? void 0 : _k.call(message))) && /*#__PURE__*/React__default["default"].createElement(MobileMenu, {
    parentRef: contentRef,
    channel: channel,
    hideMenu: function () {
      setShowMenu(false);
    },
    message: message,
    isReactionEnabled: isReactionEnabled,
    isByMe: isByMe,
    userId: userId,
    replyType: replyType,
    disabled: disabled,
    showRemove: showRemove,
    emojiContainer: emojiContainer,
    resendMessage: resendMessage,
    setQuoteMessage: setQuoteMessage,
    toggleReaction: toggleReaction,
    showEdit: showEdit
  }));
}

module.exports = MessageContent;
//# sourceMappingURL=MessageContent.js.map
