import React__default, { useContext, useMemo } from 'react';
import { L as Label, a as LabelTypography, b as LabelColors } from '../index-f60cbf08.js';
import { h as getClassName, d as isEditedMessage } from '../index-105a85f4.js';
import { a as LocalizationContext } from '../LocalizationContext-e5f35d14.js';
import { u as uuidv4 } from '../uuid-392016d0.js';
import Word from './Word.js';
import 'prop-types';
import '../stringSet-42c0e16e.js';
import '../tslib.es6-75bd0528.js';
import '../utils/message/getOutgoingMessageState.js';
import '../index-5dcd7e0f.js';
import './LinkLabel.js';
import './MentionLabel.js';
import './ContextMenu.js';
import 'react-dom';
import './SortByRow.js';
import './UserProfile.js';
import '../UserProfileContext-517994e3.js';
import '../sendbirdSelectors.js';
import '../topics-0560d548.js';
import '../utils-8a4a2ff6.js';
import './Avatar.js';
import './ImageRenderer.js';
import './Icon.js';
import './Button.js';
import '../useSendbirdStateContext.js';
import '../withSendbird.js';
import '../_rollupPluginBabelHelpers-fe256514.js';

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
  var stringSet = useContext(LocalizationContext).stringSet;
  var isMessageMentioned = isMentionEnabled && ((_b = message === null || message === void 0 ? void 0 : message.mentionedMessageTemplate) === null || _b === void 0 ? void 0 : _b.length) > 0 && ((_c = message === null || message === void 0 ? void 0 : message.mentionedUsers) === null || _c === void 0 ? void 0 : _c.length) > 0;
  var sentences = useMemo(function () {
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
  return /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.BODY_1,
    color: isByMe ? LabelColors.ONCONTENT_1 : LabelColors.ONBACKGROUND_1
  }, /*#__PURE__*/React__default.createElement("div", {
    className: getClassName([className, 'sendbird-text-message-item-body', isByMe ? 'outgoing' : 'incoming', mouseHover ? 'mouse-hover' : '', isReactionEnabled && ((_d = message === null || message === void 0 ? void 0 : message.reactions) === null || _d === void 0 ? void 0 : _d.length) > 0 ? 'reactions' : ''])
  }, sentences.map(function (sentence, index) {
    return [sentence.map(function (word) {
      return /*#__PURE__*/React__default.createElement(Word, {
        key: uuidv4(),
        word: word,
        message: message,
        isByMe: isByMe
      });
    }), (sentences === null || sentences === void 0 ? void 0 : sentences[index + 1]) ? /*#__PURE__*/React__default.createElement("br", null) : null];
  }), isEditedMessage(message) && /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-text-message-item-body__message edited",
    type: LabelTypography.BODY_1,
    color: isByMe ? LabelColors.ONCONTENT_2 : LabelColors.ONBACKGROUND_2
  }, " ".concat(stringSet.MESSAGE_EDITED, " "))));
}

export { TextMessageItemBody as default };
//# sourceMappingURL=TextMessageItemBody.js.map
