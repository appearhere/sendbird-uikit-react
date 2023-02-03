import { a as _extends } from '../_rollupPluginBabelHelpers-fe256514.js';
import { _ as __assign } from '../tslib.es6-75bd0528.js';
import React__default, { useState, useContext, useRef } from 'react';
import { f as format } from '../index-229a0736.js';
import Avatar from './Avatar.js';
import UserProfile from './UserProfile.js';
import { M as MessageStatus } from '../index-1cb2692d.js';
import MessageItemMenu from './MessageItemMenu.js';
import MessageItemReactionMenu from './MessageItemReactionMenu.js';
import ContextMenu, { MenuItems, MenuItem } from './ContextMenu.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../index-f60cbf08.js';
import EmojiReactions from './EmojiReactions.js';
import AdminMessage from './AdminMessage.js';
import TextMessageItemBody from './TextMessageItemBody.js';
import FileMessageItemBody from './FileMessageItemBody.js';
import ThumbnailMessageItemBody from './ThumbnailMessageItemBody.js';
import OGMessageItemBody from './OGMessageItemBody.js';
import UnknownMessageItemBody from './UnknownMessageItemBody.js';
import QuoteMessage from './QuoteMessage.js';
import { r as isUserMessage, s as isSentMessage, u as isFailedMessage, v as isPendingMessage, l as isFileMessage, w as copyToClipboard, x as getEmojiListAll, y as getUIKitMessageTypes, n as isThumbnailMessage, h as getClassName, z as getSenderName, A as isTextMessage, B as isOGMessage, C as getUIKitMessageType } from '../index-105a85f4.js';
import { a as UserProfileContext } from '../UserProfileContext-517994e3.js';
import { u as useLocalization } from '../LocalizationContext-e5f35d14.js';
import useSendbirdStateContext from '../useSendbirdStateContext.js';
import { u as useLongPress } from '../useLongPress-ee44c5c3.js';
import Icon, { IconTypes, IconColors } from './Icon.js';
import BottomSheet from './BottomSheet.js';
import ImageRenderer from './ImageRenderer.js';
import ReactionButton from './ReactionButton.js';
import { u as useMediaQueryContext } from '../MediaQueryContext-0ce6633d.js';
import ThreadReplies from './ThreadReplies.js';
import { T as ThreadReplySelectType } from '../const-03d71a8a.js';
import '../index-5dcd7e0f.js';
import '../uuid-392016d0.js';
import 'prop-types';
import '../sendbirdSelectors.js';
import '../topics-0560d548.js';
import '../utils-8a4a2ff6.js';
import './Button.js';
import '../stringSet-42c0e16e.js';
import './Loader.js';
import '../utils/message/getOutgoingMessageState.js';
import '../index-05bd476f.js';
import '../index-81d63e09.js';
import './IconButton.js';
import 'react-dom';
import './SortByRow.js';
import './Tooltip.js';
import './TooltipWrapper.js';
import './ReactionBadge.js';
import './Word.js';
import './LinkLabel.js';
import './MentionLabel.js';
import './TextButton.js';
import '../color-52d916b6.js';
import '../withSendbird.js';
import '../index-5ab5d8fe.js';

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
  var stringSet = useLocalization().stringSet;
  var showMenuItemCopy = isUserMessage(message);
  var showMenuItemEdit = isUserMessage(message) && isSentMessage(message) && isByMe;
  var showMenuItemResend = isFailedMessage(message) && (message === null || message === void 0 ? void 0 : message.isResendable) && isByMe;
  var showMenuItemDelete = !isPendingMessage(message) && isByMe;
  var showMenuItemDownload = !isPendingMessage(message) && isFileMessage(message);
  var showMenuItemReply = replyType === 'QUOTE_REPLY' && !isFailedMessage(message) && !isPendingMessage(message) && (channel === null || channel === void 0 ? void 0 : channel.isGroupChannel()) && !(channel === null || channel === void 0 ? void 0 : channel.isBroadcast);
  var fileMessage = message;
  return /*#__PURE__*/React__default.createElement(ContextMenu, {
    isOpen: true,
    menuItems: function () {
      var _a;

      return /*#__PURE__*/React__default.createElement(MenuItems, {
        className: "sendbird-message__mobile-context-menu",
        parentRef: parentRef,
        parentContainRef: parentRef,
        closeDropdown: hideMenu
      }, showMenuItemCopy && /*#__PURE__*/React__default.createElement(MenuItem, {
        className: "sendbird-message__mobile-context-menu-item menu-item-copy",
        onClick: function () {
          hideMenu();
          copyToClipboard(message === null || message === void 0 ? void 0 : message.message);
        }
      }, /*#__PURE__*/React__default.createElement(Label, {
        type: LabelTypography.SUBTITLE_1
      }, stringSet === null || stringSet === void 0 ? void 0 : stringSet.MESSAGE_MENU__COPY), /*#__PURE__*/React__default.createElement(Icon, {
        type: IconTypes.COPY,
        fillColor: IconColors.PRIMARY,
        width: "24px",
        height: "24px"
      })), showMenuItemReply && /*#__PURE__*/React__default.createElement(MenuItem, {
        className: "sendbird-message__mobile-context-menu-item menu-item-reply",
        onClick: function () {
          hideMenu();
          setQuoteMessage(message);
        },
        disable: (message === null || message === void 0 ? void 0 : message.parentMessageId) > 0
      }, /*#__PURE__*/React__default.createElement(Label, {
        type: LabelTypography.SUBTITLE_1
      }, stringSet.MESSAGE_MENU__REPLY), /*#__PURE__*/React__default.createElement(Icon, {
        type: IconTypes.REPLY,
        fillColor: IconColors.PRIMARY,
        width: "24px",
        height: "24px"
      })), showMenuItemEdit && /*#__PURE__*/React__default.createElement(MenuItem, {
        className: "sendbird-message__mobile-context-menu-item menu-item-edit",
        onClick: function () {
          hideMenu();
          showEdit(true);
        }
      }, /*#__PURE__*/React__default.createElement(Label, {
        type: LabelTypography.SUBTITLE_1
      }, stringSet.MESSAGE_MENU__EDIT), /*#__PURE__*/React__default.createElement(Icon, {
        type: IconTypes.EDIT,
        fillColor: IconColors.PRIMARY,
        width: "24px",
        height: "24px"
      })), showMenuItemResend && /*#__PURE__*/React__default.createElement(MenuItem, {
        className: "sendbird-message__mobile-context-menu-item menu-item-resend",
        onClick: function () {
          hideMenu();
          resendMessage(message);
        }
      }, /*#__PURE__*/React__default.createElement(Label, {
        type: LabelTypography.SUBTITLE_1
      }, stringSet.MESSAGE_MENU__RESEND), /*#__PURE__*/React__default.createElement(Icon, {
        type: IconTypes.REFRESH,
        fillColor: IconColors.PRIMARY,
        width: "24px",
        height: "24px"
      })), showMenuItemDelete && /*#__PURE__*/React__default.createElement(MenuItem, {
        className: "sendbird-message__mobile-context-menu-item menu-item-delete",
        onClick: function () {
          hideMenu();
          showRemove(true);
        },
        disable: ((_a = message === null || message === void 0 ? void 0 : message.threadInfo) === null || _a === void 0 ? void 0 : _a.replyCount) > 0
      }, /*#__PURE__*/React__default.createElement(Label, {
        type: LabelTypography.SUBTITLE_1
      }, stringSet.MESSAGE_MENU__DELETE), /*#__PURE__*/React__default.createElement(Icon, {
        type: IconTypes.DELETE,
        fillColor: IconColors.PRIMARY,
        width: "24px",
        height: "24px"
      })), showMenuItemDownload && /*#__PURE__*/React__default.createElement(MenuItem, {
        className: "sendbird-message__mobile-context-menu-item menu-item-save",
        onClick: function () {
          hideMenu();
        }
      }, /*#__PURE__*/React__default.createElement("a", {
        className: "sendbird-message__contextmenu--hyperlink",
        rel: "noopener noreferrer",
        href: fileMessage === null || fileMessage === void 0 ? void 0 : fileMessage.url,
        target: "_blank"
      }, /*#__PURE__*/React__default.createElement(Label, {
        type: LabelTypography.SUBTITLE_1
      }, stringSet.MESSAGE_MENU__SAVE), /*#__PURE__*/React__default.createElement(Icon, {
        type: IconTypes.DOWNLOAD,
        fillColor: IconColors.PRIMARY,
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
  var stringSet = useLocalization().stringSet;
  var showMenuItemCopy = isUserMessage(message);
  var showMenuItemEdit = isUserMessage(message) && isSentMessage(message) && isByMe;
  var showMenuItemResend = isFailedMessage(message) && (message === null || message === void 0 ? void 0 : message.isResendable) && isByMe;
  var showMenuItemDelete = !isPendingMessage(message) && isByMe;
  var showMenuItemDownload = !isPendingMessage(message) && isFileMessage(message);
  var showReaction = !isFailedMessage(message) && !isPendingMessage(message) && isReactionEnabled;
  var showMenuItemReply = replyType === 'QUOTE_REPLY' && !isFailedMessage(message) && !isPendingMessage(message) && (channel === null || channel === void 0 ? void 0 : channel.isGroupChannel()) && !(channel === null || channel === void 0 ? void 0 : channel.isBroadcast);
  var disableReaction = (message === null || message === void 0 ? void 0 : message.parentMessageId) > 0;
  var fileMessage = message;
  var maxEmojisPerRow = Math.floor((window === null || window === void 0 ? void 0 : window.innerWidth) / EMOJI_SIZE) - 1;

  var _b = useState(false),
      showEmojisOnly = _b[0],
      setShowEmojisOnly = _b[1];

  var emojis = getEmojiListAll(emojiContainer); // calculate max emojis that can be shown in screen

  var visibleEmojis = showEmojisOnly ? emojis : emojis === null || emojis === void 0 ? void 0 : emojis.slice(0, maxEmojisPerRow);
  var canShowMoreEmojis = emojis.length > maxEmojisPerRow;
  return /*#__PURE__*/React__default.createElement(BottomSheet, {
    onBackdropClick: hideMenu
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-message__bottomsheet"
  }, showReaction && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-message__bottomsheet-reactions"
  }, /*#__PURE__*/React__default.createElement("ul", {
    className: "sendbird-message__bottomsheet-reaction-bar"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "\n                    sendbird-message__bottomsheet-reaction-bar__row\n                    ".concat(showEmojisOnly ? 'sendbird-message__bottomsheet-reaction-bar__all' : '', "\n                  ")
  }, visibleEmojis.map(function (emoji) {
    var _a, _b, _c;

    var isReacted = (_c = (_b = (_a = message === null || message === void 0 ? void 0 : message.reactions) === null || _a === void 0 ? void 0 : _a.filter(function (reaction) {
      return reaction.key === emoji.key;
    })[0]) === null || _b === void 0 ? void 0 : _b.userIds) === null || _c === void 0 ? void 0 : _c.some(function (reactorId) {
      return reactorId === userId;
    });
    return /*#__PURE__*/React__default.createElement(ReactionButton, {
      key: emoji.key,
      width: "".concat(EMOJI_SIZE, "px"),
      height: "".concat(EMOJI_SIZE, "px"),
      selected: isReacted,
      onClick: function () {
        hideMenu();
        toggleReaction(message, emoji.key, isReacted);
      }
    }, /*#__PURE__*/React__default.createElement(ImageRenderer, {
      url: (emoji === null || emoji === void 0 ? void 0 : emoji.url) || '',
      width: "28px",
      height: "28px",
      placeHolder: function (style) {
        return /*#__PURE__*/React__default.createElement("div", {
          style: style
        }, /*#__PURE__*/React__default.createElement(Icon, {
          type: IconTypes.QUESTION,
          fillColor: IconColors.ON_BACKGROUND_3,
          width: "28px",
          height: "28px"
        }));
      }
    }));
  }), canShowMoreEmojis && !showEmojisOnly && /*#__PURE__*/React__default.createElement(ReactionButton, {
    key: "emoji_more",
    width: "38px",
    height: "38px",
    onClick: function () {
      setShowEmojisOnly(true);
    }
  }, /*#__PURE__*/React__default.createElement(ImageRenderer, {
    url: '',
    width: "28px",
    height: "28px",
    placeHolder: function (style) {
      return /*#__PURE__*/React__default.createElement("div", {
        style: style
      }, /*#__PURE__*/React__default.createElement(Icon, {
        type: IconTypes.EMOJI_MORE,
        fillColor: IconColors.ON_BACKGROUND_3,
        width: "28px",
        height: "28px"
      }));
    }
  }))))), !showEmojisOnly && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-message__bottomsheet--actions"
  }, showMenuItemCopy && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-message__bottomsheet--action",
    onClick: function () {
      hideMenu();
      copyToClipboard(message === null || message === void 0 ? void 0 : message.message);
    }
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.COPY,
    fillColor: IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  }), /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.SUBTITLE_1
  }, stringSet === null || stringSet === void 0 ? void 0 : stringSet.MESSAGE_MENU__COPY)), showMenuItemEdit && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-message__bottomsheet--action",
    onClick: function () {
      hideMenu();
      showEdit(true);
    }
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.EDIT,
    fillColor: IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  }), /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.SUBTITLE_1
  }, stringSet === null || stringSet === void 0 ? void 0 : stringSet.MESSAGE_MENU__EDIT)), showMenuItemResend && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-message__bottomsheet--action",
    onClick: function () {
      hideMenu();
      resendMessage(message);
    }
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.REFRESH,
    fillColor: IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  }), /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.SUBTITLE_1
  }, stringSet === null || stringSet === void 0 ? void 0 : stringSet.MESSAGE_MENU__RESEND)), showMenuItemReply && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-message__bottomsheet--action\n                      ".concat(disableReaction ? 'sendbird-message__bottomsheet--action-disabled' : '', "\n                    "),
    role: "menuitem",
    "aria-disabled": disableReaction ? true : false,
    onClick: function () {
      if (!disableReaction) {
        hideMenu();
        setQuoteMessage(message);
      }
    }
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.REPLY,
    fillColor: disableReaction ? IconColors.ON_BACKGROUND_3 : IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  }), /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.SUBTITLE_1,
    color: disableReaction && LabelColors.ONBACKGROUND_4
  }, stringSet === null || stringSet === void 0 ? void 0 : stringSet.MESSAGE_MENU__REPLY)), showMenuItemDelete && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-message__bottomsheet--action",
    onClick: function () {
      hideMenu();
      showRemove(true);
    }
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.DELETE,
    fillColor: IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  }), /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.SUBTITLE_1
  }, stringSet === null || stringSet === void 0 ? void 0 : stringSet.MESSAGE_MENU__DELETE)), showMenuItemDownload && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-message__bottomsheet--action",
    onClick: function () {
      hideMenu();
    }
  }, /*#__PURE__*/React__default.createElement("a", {
    className: "sendbird-message__bottomsheet--hyperlink",
    rel: "noopener noreferrer",
    href: fileMessage === null || fileMessage === void 0 ? void 0 : fileMessage.url,
    target: "_blank"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.DOWNLOAD,
    fillColor: IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  }), /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.SUBTITLE_1
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
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, isReactionEnabled ? /*#__PURE__*/React__default.createElement(MobileBottomSheet, {
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
  }) : /*#__PURE__*/React__default.createElement(MobileContextMenu, {
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
  var messageTypes = getUIKitMessageTypes();
  var dateLocale = useLocalization().dateLocale;
  var config = ((useSendbirdStateContext === null || useSendbirdStateContext === void 0 ? void 0 : useSendbirdStateContext()) || {}).config;

  var _r = useContext(UserProfileContext),
      disableUserProfile = _r.disableUserProfile,
      renderUserProfile = _r.renderUserProfile;

  var avatarRef = useRef(null);
  var contentRef = useRef(null);
  var isMobile = useMediaQueryContext().isMobile;

  var _s = useState(false),
      showMenu = _s[0],
      setShowMenu = _s[1];

  var _t = useState(false),
      mouseHover = _t[0],
      setMouseHover = _t[1];

  var _u = useState(false),
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

  var longPress = useLongPress({
    onLongPress: function () {
      if (isMobile) {
        setShowMenu(true);
      }
    },
    onClick: function () {
      // @ts-ignore
      if (isMobile && isThumbnailMessage(message) && isSentMessage(message)) {
        showFileViewer(true);
      }
    }
  }, {
    delay: 300
  });

  if (((_d = message === null || message === void 0 ? void 0 : message.isAdminMessage) === null || _d === void 0 ? void 0 : _d.call(message)) || (message === null || message === void 0 ? void 0 : message.messageType) === 'admin') {
    return /*#__PURE__*/React__default.createElement(AdminMessage, {
      message: message
    });
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: getClassName([className, 'sendbird-message-content', isByMeClassName]),
    onMouseOver: function () {
      return setMouseHover(true);
    },
    onMouseLeave: function () {
      return setMouseHover(false);
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: getClassName(['sendbird-message-content__left', isReactionEnabledClassName, isByMeClassName, useReplyingClassName])
  }, !isByMe && !chainBottom &&
  /*#__PURE__*/

  /** user profile */
  React__default.createElement(ContextMenu, {
    menuTrigger: function (toggleDropdown) {
      var _a, _b, _c;

      return /*#__PURE__*/React__default.createElement(Avatar, {
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
      return /*#__PURE__*/React__default.createElement(MenuItems
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
      : /*#__PURE__*/React__default.createElement(UserProfile, {
        user: message.sender,
        onSuccess: closeDropdown
      }));
    }
  }), isByMe && !isMobile && /*#__PURE__*/React__default.createElement("div", {
    className: getClassName(['sendbird-message-content-menu', isReactionEnabledClassName, supposedHoverClassName, isByMeClassName])
  }, /*#__PURE__*/React__default.createElement(MessageItemMenu, {
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

      if (threadReplySelectType === ThreadReplySelectType.THREAD) {
        onReplyInThread({
          message: message
        });
      } else if (threadReplySelectType === ThreadReplySelectType.PARENT) {
        scrollToMessage(message.parentMessage.createdAt, message.parentMessageId);
      }
    }
  }), isReactionEnabled && /*#__PURE__*/React__default.createElement(MessageItemReactionMenu, {
    className: "sendbird-message-content-menu__reaction-menu",
    message: message,
    userId: userId,
    spaceFromTrigger: {},
    emojiContainer: emojiContainer,
    toggleReaction: toggleReaction,
    setSupposedHover: setSupposedHover
  }))), /*#__PURE__*/React__default.createElement("div", _extends({
    className: "sendbird-message-content__middle"
  }, isMobile ? __assign({}, longPress) : {}, {
    ref: contentRef
  }), !isByMe && !chainTop && !useReplying && /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-message-content__middle__sender-name",
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, // @ts-ignore
  ((_f = (_e = channel === null || channel === void 0 ? void 0 : channel.members) === null || _e === void 0 ? void 0 : _e.find(function (member) {
    var _a;

    return (member === null || member === void 0 ? void 0 : member.userId) === ((_a = message === null || message === void 0 ? void 0 : message.sender) === null || _a === void 0 ? void 0 : _a.userId);
  })) === null || _f === void 0 ? void 0 : _f.nickname) || getSenderName(message) // TODO: Divide getting profileUrl logic to utils
  ), useReplying ? /*#__PURE__*/React__default.createElement("div", {
    className: getClassName(['sendbird-message-content__middle__quote-message', isByMe ? 'outgoing' : 'incoming', useReplyingClassName])
  }, /*#__PURE__*/React__default.createElement(QuoteMessage, {
    message: message,
    userId: userId,
    isByMe: isByMe,
    isUnavailable: replyType === 'THREAD' && (channel === null || channel === void 0 ? void 0 : channel.joinedAt) * 1000 > ((_g = message === null || message === void 0 ? void 0 : message.parentMessage) === null || _g === void 0 ? void 0 : _g.createdAt),
    onClick: function () {
      var _a;

      if (replyType === 'THREAD' && threadReplySelectType === ThreadReplySelectType.THREAD) {
        onQuoteMessageClick === null || onQuoteMessageClick === void 0 ? void 0 : onQuoteMessageClick({
          message: message
        });
      }

      if ((replyType === 'QUOTE_REPLY' || replyType === 'THREAD' && threadReplySelectType === ThreadReplySelectType.PARENT) && ((_a = message === null || message === void 0 ? void 0 : message.parentMessage) === null || _a === void 0 ? void 0 : _a.createdAt) && (message === null || message === void 0 ? void 0 : message.parentMessageId)) {
        scrollToMessage(message.parentMessage.createdAt, message.parentMessageId);
      }
    }
  })) : null, /*#__PURE__*/React__default.createElement("div", {
    className: getClassName(['sendbird-message-content__middle__body-container'])
  }, isByMe && !chainBottom && /*#__PURE__*/React__default.createElement("div", {
    className: getClassName(['sendbird-message-content__middle__body-container__created-at', 'left', supposedHoverClassName])
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-message-content__middle__body-container__created-at__component-container"
  }, /*#__PURE__*/React__default.createElement(MessageStatus, {
    message: message,
    channel: channel
  }))), isTextMessage(message) && /*#__PURE__*/React__default.createElement(TextMessageItemBody, {
    className: "sendbird-message-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    mouseHover: mouseHover,
    isMentionEnabled: (config === null || config === void 0 ? void 0 : config.isMentionEnabled) || false,
    isReactionEnabled: isReactionEnabled
  }), isOGMessage(message) && /*#__PURE__*/React__default.createElement(OGMessageItemBody, {
    className: "sendbird-message-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    mouseHover: mouseHover,
    isMentionEnabled: (config === null || config === void 0 ? void 0 : config.isMentionEnabled) || false,
    isReactionEnabled: isReactionEnabled
  }), getUIKitMessageType(message) === messageTypes.FILE && /*#__PURE__*/React__default.createElement(FileMessageItemBody, {
    className: "sendbird-message-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    mouseHover: mouseHover,
    isReactionEnabled: isReactionEnabled
  }), isThumbnailMessage(message) && /*#__PURE__*/React__default.createElement(ThumbnailMessageItemBody, {
    className: "sendbird-message-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    mouseHover: mouseHover,
    isReactionEnabled: isReactionEnabled,
    showFileViewer: showFileViewer
  }), getUIKitMessageType(message) === messageTypes.UNKNOWN && /*#__PURE__*/React__default.createElement(UnknownMessageItemBody, {
    className: "sendbird-message-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    mouseHover: mouseHover,
    isReactionEnabled: isReactionEnabled
  }), isReactionEnabled && ((_h = message === null || message === void 0 ? void 0 : message.reactions) === null || _h === void 0 ? void 0 : _h.length) > 0 && /*#__PURE__*/React__default.createElement("div", {
    className: getClassName(['sendbird-message-content-reactions', !isByMe || isThumbnailMessage(message) || isOGMessage(message) ? '' : 'primary', mouseHover ? 'mouse-hover' : ''])
  }, /*#__PURE__*/React__default.createElement(EmojiReactions, {
    userId: userId,
    message: message,
    isByMe: isByMe,
    emojiContainer: emojiContainer,
    memberNicknamesMap: nicknamesMap,
    toggleReaction: toggleReaction
  })), !isByMe && !chainBottom && /*#__PURE__*/React__default.createElement(Label, {
    className: getClassName(['sendbird-message-content__middle__body-container__created-at', 'right', supposedHoverClassName]),
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, format((message === null || message === void 0 ? void 0 : message.createdAt) || 0, 'p', {
    locale: dateLocale
  }))), displayThreadReplies && /*#__PURE__*/React__default.createElement(ThreadReplies, {
    className: "sendbird-message-content__middle__thread-replies",
    threadInfo: message === null || message === void 0 ? void 0 : message.threadInfo,
    onClick: function () {
      return onReplyInThread === null || onReplyInThread === void 0 ? void 0 : onReplyInThread({
        message: message
      });
    }
  })), /*#__PURE__*/React__default.createElement("div", {
    className: getClassName(['sendbird-message-content__right', chainTopClassName, isReactionEnabledClassName, useReplyingClassName])
  }, !isByMe && !isMobile && /*#__PURE__*/React__default.createElement("div", {
    className: getClassName(['sendbird-message-content-menu', chainTopClassName, supposedHoverClassName, isByMeClassName])
  }, isReactionEnabled && /*#__PURE__*/React__default.createElement(MessageItemReactionMenu, {
    className: "sendbird-message-content-menu__reaction-menu",
    message: message,
    userId: userId,
    spaceFromTrigger: {},
    emojiContainer: emojiContainer,
    toggleReaction: toggleReaction,
    setSupposedHover: setSupposedHover
  }), /*#__PURE__*/React__default.createElement(MessageItemMenu, {
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

      if (threadReplySelectType === ThreadReplySelectType.THREAD) {
        onReplyInThread({
          message: message
        });
      } else if (threadReplySelectType === ThreadReplySelectType.PARENT) {
        scrollToMessage(message.parentMessage.createdAt, message.parentMessageId);
      }
    }
  }))), showMenu && (((_j = message === null || message === void 0 ? void 0 : message.isUserMessage) === null || _j === void 0 ? void 0 : _j.call(message)) || ((_k = message === null || message === void 0 ? void 0 : message.isFileMessage) === null || _k === void 0 ? void 0 : _k.call(message))) && /*#__PURE__*/React__default.createElement(MobileMenu, {
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

export { MessageContent as default };
//# sourceMappingURL=MessageContent.js.map
