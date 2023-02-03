'use strict';

var React = require('react');
var ui_ContextMenu = require('./ContextMenu.js');
var ui_Icon = require('./Icon.js');
var ui_IconButton = require('./IconButton.js');
var ui_ImageRenderer = require('./ImageRenderer.js');
var ui_ReactionButton = require('./ReactionButton.js');
var index = require('../index-d05a5cae.js');
require('../tslib.es6-d6068b10.js');
require('react-dom');
require('./SortByRow.js');
require('../uuid-2f4916c1.js');
require('../index-4197d014.js');
require('prop-types');
require('../stringSet-2dfd148b.js');
require('../utils/message/getOutgoingMessageState.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function MessageItemReactionMenu(_a) {
  var className = _a.className,
      message = _a.message,
      userId = _a.userId,
      _b = _a.spaceFromTrigger,
      spaceFromTrigger = _b === void 0 ? {} : _b,
      emojiContainer = _a.emojiContainer,
      toggleReaction = _a.toggleReaction,
      setSupposedHover = _a.setSupposedHover;
  var triggerRef = React.useRef(null);
  var containerRef = React.useRef(null);

  if (index.isPendingMessage(message) || index.isFailedMessage(message)) {
    return null;
  }

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName([className, 'sendbird-message-item-reaction-menu']),
    ref: containerRef
  }, /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu["default"], {
    menuTrigger: function (toggleDropdown) {
      return /*#__PURE__*/React__default["default"].createElement(ui_IconButton, {
        className: "sendbird-message-item-reaction-menu__trigger",
        ref: triggerRef,
        width: "32px",
        height: "32px",
        onClick: function () {
          toggleDropdown();
          setSupposedHover(true);
        },
        onBlur: function () {
          setSupposedHover(false);
        }
      }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
        className: "sendbird-message-item-reaction-menu__trigger__icon",
        type: ui_Icon.IconTypes.EMOJI_MORE,
        fillColor: ui_Icon.IconColors.CONTENT_INVERSE,
        width: "24px",
        height: "24px"
      }));
    },
    menuItems: function (close) {
      var closeDropdown = function () {
        close();
        setSupposedHover(false);
      };

      return /*#__PURE__*/React__default["default"].createElement(ui_ContextMenu.EmojiListItems, {
        parentRef: triggerRef,
        parentContainRef: containerRef,
        closeDropdown: closeDropdown,
        spaceFromTrigger: spaceFromTrigger
      }, index.getEmojiListAll(emojiContainer).map(function (emoji) {
        var _a, _b, _c;

        var isReacted = (_c = (_b = (_a = message === null || message === void 0 ? void 0 : message.reactions) === null || _a === void 0 ? void 0 : _a.filter(function (reaction) {
          return reaction.key === emoji.key;
        })[0]) === null || _b === void 0 ? void 0 : _b.userIds) === null || _c === void 0 ? void 0 : _c.some(function (reactorId) {
          return reactorId === userId;
        });
        return /*#__PURE__*/React__default["default"].createElement(ui_ReactionButton, {
          key: emoji.key,
          width: "36px",
          height: "36px",
          selected: isReacted,
          onClick: function () {
            closeDropdown();
            toggleReaction(message, emoji.key, isReacted);
          }
        }, /*#__PURE__*/React__default["default"].createElement(ui_ImageRenderer, {
          url: emoji.url,
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
}

module.exports = MessageItemReactionMenu;
//# sourceMappingURL=MessageItemReactionMenu.js.map
