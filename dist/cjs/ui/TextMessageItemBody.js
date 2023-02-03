'use strict';

var React = require('react');
var ui_Label = require('../index-4197d014.js');
var index = require('../index-d05a5cae.js');
var LocalizationContext = require('../LocalizationContext-f4281153.js');
var uuid = require('../uuid-2f4916c1.js');
var ui_Word = require('./Word.js');
require('prop-types');
require('../stringSet-2dfd148b.js');
require('../tslib.es6-d6068b10.js');
require('../utils/message/getOutgoingMessageState.js');
require('../index-d4bc012c.js');
require('./LinkLabel.js');
require('./MentionLabel.js');
require('./ContextMenu.js');
require('react-dom');
require('./SortByRow.js');
require('./UserProfile.js');
require('../UserProfileContext-fd00d1bd.js');
require('../sendbirdSelectors.js');
require('../topics-085b5602.js');
require('../utils-a9158c72.js');
require('./Avatar.js');
require('./ImageRenderer.js');
require('./Icon.js');
require('./Button.js');
require('../useSendbirdStateContext.js');
require('../withSendbird.js');
require('../_rollupPluginBabelHelpers-597f5cf8.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function TextMessageItemBody(_a) {
  var _b, _c, _d;

  var className = _a.className,
      message = _a.message,
      _e = _a.isByMe,
      isByMe = _e === void 0 ? false : _e,
      _f = _a.mouseHover,
      mouseHover = _f === void 0 ? false : _f,
      _g = _a.isMentionEnabled,
      isMentionEnabled = _g === void 0 ? false : _g,
      _h = _a.isReactionEnabled,
      isReactionEnabled = _h === void 0 ? false : _h;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  var isMessageMentioned = isMentionEnabled && ((_b = message === null || message === void 0 ? void 0 : message.mentionedMessageTemplate) === null || _b === void 0 ? void 0 : _b.length) > 0 && ((_c = message === null || message === void 0 ? void 0 : message.mentionedUsers) === null || _c === void 0 ? void 0 : _c.length) > 0;
  var sentences = React.useMemo(function () {
    var _a, _b;

    if (isMessageMentioned) {
      return (_a = message === null || message === void 0 ? void 0 : message.mentionedMessageTemplate) === null || _a === void 0 ? void 0 : _a.split(/\n/).map(function (sentence) {
        return sentence.split(/\s/);
      });
    }

    return (_b = message === null || message === void 0 ? void 0 : message.message) === null || _b === void 0 ? void 0 : _b.split(/\n/).map(function (sentence) {
      return sentence.split(/\s/);
    });
  }, [message === null || message === void 0 ? void 0 : message.mentionedMessageTemplate]);
  return /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.BODY_1,
    color: isByMe ? ui_Label.LabelColors.ONCONTENT_1 : ui_Label.LabelColors.ONBACKGROUND_1
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName([className, 'sendbird-text-message-item-body', isByMe ? 'outgoing' : 'incoming', mouseHover ? 'mouse-hover' : '', isReactionEnabled && ((_d = message === null || message === void 0 ? void 0 : message.reactions) === null || _d === void 0 ? void 0 : _d.length) > 0 ? 'reactions' : ''])
  }, sentences.map(function (sentence, index) {
    return [sentence.map(function (word) {
      return /*#__PURE__*/React__default["default"].createElement(ui_Word, {
        key: uuid.uuidv4(),
        word: word,
        message: message,
        isByMe: isByMe
      });
    }), (sentences === null || sentences === void 0 ? void 0 : sentences[index + 1]) ? /*#__PURE__*/React__default["default"].createElement("br", null) : null];
  }), index.isEditedMessage(message) && /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-text-message-item-body__message edited",
    type: ui_Label.LabelTypography.BODY_1,
    color: isByMe ? ui_Label.LabelColors.ONCONTENT_2 : ui_Label.LabelColors.ONBACKGROUND_2
  }, " ".concat(stringSet.MESSAGE_EDITED, " "))));
}

module.exports = TextMessageItemBody;
//# sourceMappingURL=TextMessageItemBody.js.map
