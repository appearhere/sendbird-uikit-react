import React__default from 'react';
import { a as LabelTypography } from '../index-f60cbf08.js';
import LinkLabel from './LinkLabel.js';
import { u as uuidv4 } from '../uuid-392016d0.js';
import { j as convertWordToStringObj, S as StringObjType } from '../index-105a85f4.js';
import MentionLabel from './MentionLabel.js';
import 'prop-types';
import '../stringSet-42c0e16e.js';
import '../tslib.es6-75bd0528.js';
import '../utils/message/getOutgoingMessageState.js';
import './ContextMenu.js';
import 'react-dom';
import './SortByRow.js';
import './UserProfile.js';
import '../LocalizationContext-e5f35d14.js';
import '../index-5dcd7e0f.js';
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

function Word(props) {
  var word = props.word,
      message = props.message,
      _a = props.isByMe,
      isByMe = _a === void 0 ? false : _a,
      _b = props.mentionTemplate,
      mentionTemplate = _b === void 0 ? '@' : _b,
      _c = props.renderString,
      renderString = _c === void 0 ? null : _c;

  if (word === '') {
    return null;
  }

  return /*#__PURE__*/React__default.createElement("span", {
    className: "sendbird-word"
  }, convertWordToStringObj(word, message === null || message === void 0 ? void 0 : message.mentionedUsers).map(function (stringObj) {
    var _a;

    var type = (stringObj === null || stringObj === void 0 ? void 0 : stringObj.type) || '';
    var value = (stringObj === null || stringObj === void 0 ? void 0 : stringObj.value) || '';
    var userId = (stringObj === null || stringObj === void 0 ? void 0 : stringObj.userId) || '';

    if (renderString && typeof renderString === 'function') {
      return renderString(stringObj);
    }

    if (type === StringObjType.mention) {
      return /*#__PURE__*/React__default.createElement(MentionLabel, {
        mentionTemplate: mentionTemplate,
        mentionedUserId: userId,
        mentionedUserNickname: value,
        key: uuidv4(),
        isByMe: isByMe
      });
    } else if (type === StringObjType.url) {
      var urlRegex = new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?");
      var targetUrl = (_a = urlRegex.exec(value)) === null || _a === void 0 ? void 0 : _a[0];
      var stringUrl = {
        front: '',
        url: '',
        back: ''
      };

      if (targetUrl) {
        var targetUrlIndex = value.indexOf(targetUrl);

        if (targetUrlIndex > 0) {
          stringUrl.front = value.slice(0, targetUrlIndex);
        }

        stringUrl.url = value.slice(targetUrlIndex, targetUrlIndex + targetUrl.length);

        if (targetUrlIndex + targetUrl.length < value.length) {
          stringUrl.back = value.slice(targetUrlIndex + targetUrl.length);
        }
      }

      if (targetUrl) {
        return [stringUrl.front ? stringUrl.front : '', stringUrl.url ? /*#__PURE__*/React__default.createElement(LinkLabel, {
          className: "sendbird-word__url",
          key: uuidv4(),
          src: stringUrl.url,
          type: LabelTypography.BODY_1
        }, stringUrl.url) : null, stringUrl.back ? stringUrl.back : ''];
      }

      return /*#__PURE__*/React__default.createElement(LinkLabel, {
        className: "sendbird-word__url",
        key: uuidv4(),
        src: word,
        type: LabelTypography.BODY_1
      }, value);
    } else {
      return value;
    }
  }));
}

export { Word as default };
//# sourceMappingURL=Word.js.map
