'use strict';

var React = require('react');
var ui_Label = require('../index-4197d014.js');
var ui_LinkLabel = require('./LinkLabel.js');
var uuid = require('../uuid-2f4916c1.js');
var index = require('../index-d05a5cae.js');
var ui_MentionLabel = require('./MentionLabel.js');
require('prop-types');
require('../stringSet-2dfd148b.js');
require('../tslib.es6-d6068b10.js');
require('../utils/message/getOutgoingMessageState.js');
require('./ContextMenu.js');
require('react-dom');
require('./SortByRow.js');
require('./UserProfile.js');
require('../LocalizationContext-f4281153.js');
require('../index-d4bc012c.js');
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

  return /*#__PURE__*/React__default["default"].createElement("span", {
    className: "sendbird-word"
  }, index.convertWordToStringObj(word, message === null || message === void 0 ? void 0 : message.mentionedUsers).map(function (stringObj) {
    var _a;

    var type = (stringObj === null || stringObj === void 0 ? void 0 : stringObj.type) || '';
    var value = (stringObj === null || stringObj === void 0 ? void 0 : stringObj.value) || '';
    var userId = (stringObj === null || stringObj === void 0 ? void 0 : stringObj.userId) || '';

    if (renderString && typeof renderString === 'function') {
      return renderString(stringObj);
    }

    if (type === index.StringObjType.mention) {
      return /*#__PURE__*/React__default["default"].createElement(ui_MentionLabel, {
        mentionTemplate: mentionTemplate,
        mentionedUserId: userId,
        mentionedUserNickname: value,
        key: uuid.uuidv4(),
        isByMe: isByMe
      });
    } else if (type === index.StringObjType.url) {
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
        return [stringUrl.front ? stringUrl.front : '', stringUrl.url ? /*#__PURE__*/React__default["default"].createElement(ui_LinkLabel["default"], {
          className: "sendbird-word__url",
          key: uuid.uuidv4(),
          src: stringUrl.url,
          type: ui_Label.LabelTypography.BODY_1
        }, stringUrl.url) : null, stringUrl.back ? stringUrl.back : ''];
      }

      return /*#__PURE__*/React__default["default"].createElement(ui_LinkLabel["default"], {
        className: "sendbird-word__url",
        key: uuid.uuidv4(),
        src: word,
        type: ui_Label.LabelTypography.BODY_1
      }, value);
    } else {
      return value;
    }
  }));
}

module.exports = Word;
//# sourceMappingURL=Word.js.map
