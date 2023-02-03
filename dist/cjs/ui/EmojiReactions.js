'use strict';

var React = require('react');
var ui_Tooltip = require('./Tooltip.js');
var ui_TooltipWrapper = require('./TooltipWrapper.js');
var ui_ReactionBadge = require('./ReactionBadge.js');
var ui_ReactionButton = require('./ReactionButton.js');
var ui_ImageRenderer = require('./ImageRenderer.js');
var ui_Icon = require('./Icon.js');
var ui_ContextMenu = require('./ContextMenu.js');
var index = require('../index-d05a5cae.js');
var LocalizationContext = require('../LocalizationContext-f4281153.js');
require('../tslib.es6-d6068b10.js');
require('../index-4197d014.js');
require('prop-types');
require('../stringSet-2dfd148b.js');
require('react-dom');
require('./SortByRow.js');
require('../uuid-2f4916c1.js');
require('../utils/message/getOutgoingMessageState.js');
require('../index-d4bc012c.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  var emojisMap = index.getEmojiMapAll(emojiContainer);
  var addReactionRef = React.useRef(null);
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName([className, 'sendbird-emoji-reactions', isByMe ? 'outgoing' : 'incoming'])
  }, ((_b = message === null || message === void 0 ? void 0 : message.reactions) === null || _b === void 0 ? void 0 : _b.length) > 0 && message.reactions.map(function (reaction) {
    var _a, _b;

    var reactedByMe = index.isReactedBy(userId, reaction);
    return /*#__PURE__*/React__default["default"].createElement(ui_TooltipWrapper, {
      className: "sendbird-emoji-reactions__reaction-badge",
      key: reaction === null || reaction === void 0 ? void 0 : reaction.key,
      hoverTooltip: ((_a = reaction === null || reaction === void 0 ? void 0 : reaction.userIds) === null || _a === void 0 ? void 0 : _a.length) > 0 && /*#__PURE__*/React__default["default"].createElement(ui_Tooltip, null, index.getEmojiTooltipString(reaction, userId, memberNicknamesMap, stringSet))
    }, /*#__PURE__*/React__default["default"].createElement(ui_ReactionBadge, {
      count: reaction.userIds.length,
      selected: reactedByMe,
      onClick: function (e) {
        var _a;

        toggleReaction(message, reaction.key, reactedByMe);
        (_a = e === null || e === void 0 ? void 0 : e.stopPropagation) === null || _a === void 0 ? void 0 : _a.call(e);
      }
    }, /*#__PURE__*/React__default["default"].createElement(ui_ImageRenderer, {
      circle: true,
      url: ((_b = emojisMap.get(reaction === null || reaction === void 0 ? void 0 : reaction.key)) === null || _b === void 0 ? void 0 : _b.url) || '',
      width: "20px",
      height: "20px",
      defaultComponent: /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
        width: "20px",
        height: "20px",
        type: ui_Icon.IconTypes.QUESTION
      })
    })));
  }), ((_c = message === null || message === void 0 ? void 0 : message.reactions) === null || _c === void 0 ? void 0 : _c.length) < emojisMap.size && /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu["default"], {
    menuTrigger: function (toggleDropdown) {
      return /*#__PURE__*/React__default["default"].createElement(ui_ReactionBadge, {
        className: "sendbird-emoji-reactions__add-reaction-badge",
        ref: addReactionRef,
        isAdd: true,
        onClick: function (e) {
          var _a;

          toggleDropdown();
          (_a = e === null || e === void 0 ? void 0 : e.stopPropagation) === null || _a === void 0 ? void 0 : _a.call(e);
        }
      }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
        type: ui_Icon.IconTypes.EMOJI_MORE,
        fillColor: ui_Icon.IconColors.ON_BACKGROUND_3,
        width: "20px",
        height: "20px"
      }));
    },
    menuItems: function (closeDropdown) {
      return /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.EmojiListItems, {
        parentRef: addReactionRef,
        parentContainRef: addReactionRef,
        closeDropdown: closeDropdown,
        spacefromTrigger: spaceFromTrigger
      }, index.getEmojiListAll(emojiContainer).map(function (emoji) {
        var _a, _b, _c;

        var isReacted = (_c = (_b = (_a = message === null || message === void 0 ? void 0 : message.reactions) === null || _a === void 0 ? void 0 : _a.find(function (reaction) {
          return reaction.key === emoji.key;
        })) === null || _b === void 0 ? void 0 : _b.userIds) === null || _c === void 0 ? void 0 : _c.some(function (reactorId) {
          return reactorId === userId;
        });
        return /*#__PURE__*/React__default["default"].createElement(ui_ReactionButton, {
          key: emoji.key,
          width: "36px",
          height: "36px",
          selected: isReacted,
          onClick: function (e) {
            closeDropdown();
            toggleReaction(message, emoji.key, isReacted);
            e === null || e === void 0 ? void 0 : e.stopPropagation();
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
      }));
    }
  }));
};

module.exports = EmojiReactions;
//# sourceMappingURL=EmojiReactions.js.map
