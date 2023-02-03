import React__default, { useContext, useRef } from 'react';
import Tooltip from './Tooltip.js';
import TooltipWrapper from './TooltipWrapper.js';
import ReactionBadge from './ReactionBadge.js';
import ReactionButton from './ReactionButton.js';
import ImageRenderer from './ImageRenderer.js';
import Icon, { IconTypes, IconColors } from './Icon.js';
import ContextMenu, { EmojiListItems } from './ContextMenu.js';
import { G as getEmojiMapAll, h as getClassName, H as isReactedBy, I as getEmojiTooltipString, x as getEmojiListAll } from '../index-105a85f4.js';
import { a as LocalizationContext } from '../LocalizationContext-e5f35d14.js';
import '../tslib.es6-75bd0528.js';
import '../index-f60cbf08.js';
import 'prop-types';
import '../stringSet-42c0e16e.js';
import 'react-dom';
import './SortByRow.js';
import '../uuid-392016d0.js';
import '../utils/message/getOutgoingMessageState.js';
import '../index-5dcd7e0f.js';

var EmojiReactions = function (_a) {
  var _b, _c;

  var className = _a.className,
      userId = _a.userId,
      message = _a.message,
      emojiContainer = _a.emojiContainer,
      memberNicknamesMap = _a.memberNicknamesMap,
      _d = _a.spaceFromTrigger,
      spaceFromTrigger = _d === void 0 ? {
    x: 0,
    y: 0
  } : _d,
      _e = _a.isByMe,
      isByMe = _e === void 0 ? false : _e,
      toggleReaction = _a.toggleReaction;
  var stringSet = useContext(LocalizationContext).stringSet;
  var emojisMap = getEmojiMapAll(emojiContainer);
  var addReactionRef = useRef(null);
  return /*#__PURE__*/React__default.createElement("div", {
    className: getClassName([className, 'sendbird-emoji-reactions', isByMe ? 'outgoing' : 'incoming'])
  }, ((_b = message === null || message === void 0 ? void 0 : message.reactions) === null || _b === void 0 ? void 0 : _b.length) > 0 && message.reactions.map(function (reaction) {
    var _a, _b;

    var reactedByMe = isReactedBy(userId, reaction);
    return /*#__PURE__*/React__default.createElement(TooltipWrapper, {
      className: "sendbird-emoji-reactions__reaction-badge",
      key: reaction === null || reaction === void 0 ? void 0 : reaction.key,
      hoverTooltip: ((_a = reaction === null || reaction === void 0 ? void 0 : reaction.userIds) === null || _a === void 0 ? void 0 : _a.length) > 0 && /*#__PURE__*/React__default.createElement(Tooltip, null, getEmojiTooltipString(reaction, userId, memberNicknamesMap, stringSet))
    }, /*#__PURE__*/React__default.createElement(ReactionBadge, {
      count: reaction.userIds.length,
      selected: reactedByMe,
      onClick: function (e) {
        var _a;

        toggleReaction(message, reaction.key, reactedByMe);
        (_a = e === null || e === void 0 ? void 0 : e.stopPropagation) === null || _a === void 0 ? void 0 : _a.call(e);
      }
    }, /*#__PURE__*/React__default.createElement(ImageRenderer, {
      circle: true,
      url: ((_b = emojisMap.get(reaction === null || reaction === void 0 ? void 0 : reaction.key)) === null || _b === void 0 ? void 0 : _b.url) || '',
      width: "20px",
      height: "20px",
      defaultComponent: /*#__PURE__*/React__default.createElement(Icon, {
        width: "20px",
        height: "20px",
        type: IconTypes.QUESTION
      })
    })));
  }), ((_c = message === null || message === void 0 ? void 0 : message.reactions) === null || _c === void 0 ? void 0 : _c.length) < emojisMap.size && /*#__PURE__*/React__default.createElement(ContextMenu, {
    menuTrigger: function (toggleDropdown) {
      return /*#__PURE__*/React__default.createElement(ReactionBadge, {
        className: "sendbird-emoji-reactions__add-reaction-badge",
        ref: addReactionRef,
        isAdd: true,
        onClick: function (e) {
          var _a;

          toggleDropdown();
          (_a = e === null || e === void 0 ? void 0 : e.stopPropagation) === null || _a === void 0 ? void 0 : _a.call(e);
        }
      }, /*#__PURE__*/React__default.createElement(Icon, {
        type: IconTypes.EMOJI_MORE,
        fillColor: IconColors.ON_BACKGROUND_3,
        width: "20px",
        height: "20px"
      }));
    },
    menuItems: function (closeDropdown) {
      return /*#__PURE__*/React__default.createElement(EmojiListItems, {
        parentRef: addReactionRef,
        parentContainRef: addReactionRef,
        closeDropdown: closeDropdown,
        spacefromTrigger: spaceFromTrigger
      }, getEmojiListAll(emojiContainer).map(function (emoji) {
        var _a, _b, _c;

        var isReacted = (_c = (_b = (_a = message === null || message === void 0 ? void 0 : message.reactions) === null || _a === void 0 ? void 0 : _a.find(function (reaction) {
          return reaction.key === emoji.key;
        })) === null || _b === void 0 ? void 0 : _b.userIds) === null || _c === void 0 ? void 0 : _c.some(function (reactorId) {
          return reactorId === userId;
        });
        return /*#__PURE__*/React__default.createElement(ReactionButton, {
          key: emoji.key,
          width: "36px",
          height: "36px",
          selected: isReacted,
          onClick: function (e) {
            closeDropdown();
            toggleReaction(message, emoji.key, isReacted);
            e === null || e === void 0 ? void 0 : e.stopPropagation();
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
      }));
    }
  }));
};

export { EmojiReactions as default };
//# sourceMappingURL=EmojiReactions.js.map
