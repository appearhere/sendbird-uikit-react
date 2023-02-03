'use strict';

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-597f5cf8.js');
var React = require('react');
var server = require('react-dom/server');
var PropTypes = require('prop-types');
var _const$1 = require('../const-28829306.js');
var _const = require('../const-43cebab9.js');
var ui_IconButton = require('./IconButton.js');
var ui_Button = require('./Button.js');
var ui_MentionUserLabel = require('./MentionUserLabel.js');
var ui_Icon = require('./Icon.js');
var ui_Label = require('../index-4197d014.js');
var LocalizationContext = require('../LocalizationContext-f4281153.js');
var index = require('../index-d05a5cae.js');
require('../tslib.es6-d6068b10.js');
require('../stringSet-2dfd148b.js');
require('../index-d4bc012c.js');
require('../utils/message/getOutgoingMessageState.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

// https://davidwalsh.name/javascript-debounce-function

const sanitizeString = str => str === null || str === void 0 ? void 0 : str.replace(/[\u00A0-\u9999<>]/gim, i => ''.concat('&#', i.charCodeAt(0), ';'));

const TEXT_FIELD_ID = 'sendbird-message-input-text-field';
const LINE_HEIGHT = 76;

const noop = () => {};

const handleUploadFile = callback => event => {
  if (event.target.files && event.target.files[0]) {
    callback(event.target.files[0]);
  } // eslint-disable-next-line no-param-reassign


  event.target.value = '';
};

const displayCaret = (element, position) => {
  const range = document.createRange();
  const sel = window.getSelection();
  range.setStart(element.childNodes[0], position);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
  element.focus();
};

const resetInput = ref => {
  try {
    ref.current.innerHTML = '';
  } catch (_unused) {//
  }
};

const initialTargetStringInfo = {
  targetString: '',
  startNodeIndex: null,
  startOffsetIndex: null,
  endNodeIndex: null,
  endOffsetIndex: null
};
const MessageInput = /*#__PURE__*/React__default["default"].forwardRef((props, ref) => {
  var _ref$current, _ref$current$innerTex;

  const {
    className,
    messageFieldId,
    isEdit,
    isMentionEnabled,
    disabled,
    message,
    placeholder,
    maxLength,
    onFileUpload,
    onSendMessage,
    onUpdateMessage,
    onCancelEdit,
    onStartTyping,
    channelUrl,
    mentionSelectedUser,
    onUserMentioned,
    onMentionStringChange,
    onMentionedUserIdsUpdated,
    onKeyUp,
    onKeyDown
  } = props;
  const textFieldId = messageFieldId || TEXT_FIELD_ID;
  const {
    stringSet
  } = React.useContext(LocalizationContext.LocalizationContext);
  const fileInputRef = React.useRef(null);
  const [isInput, setIsInput] = React.useState(false);
  const [mentionedUserIds, setMentionedUserIds] = React.useState([]);
  const [targetStringInfo, setTargetStringInfo] = React.useState(_rollupPluginBabelHelpers._objectSpread2({}, initialTargetStringInfo));
  const setHeight = React.useMemo(() => () => {
    try {
      const elem = ref === null || ref === void 0 ? void 0 : ref.current;
      const MAX_HEIGHT = window.document.body.offsetHeight * 0.6;

      if (elem && elem.scrollHeight >= LINE_HEIGHT) {
        if (MAX_HEIGHT < elem.scrollHeight) {
          elem.style.height = 'auto';
          elem.style.height = `${MAX_HEIGHT}px`;
        } else {
          elem.style.height = 'auto';
          elem.style.height = `${elem.scrollHeight}px`;
        }
      } else {
        elem.style.height = '';
      }
    } catch (error) {// error
    }
  }, []); // #Edit mode
  // for easilly initialize input value from outside, but
  // useEffect(_, [channelUrl]) erase it

  const initialValue = props === null || props === void 0 ? void 0 : props.value;
  React.useEffect(() => {
    var _textField$innerText;

    const textField = ref === null || ref === void 0 ? void 0 : ref.current;

    try {
      textField.innerHTML = initialValue;
      displayCaret(textField, initialValue === null || initialValue === void 0 ? void 0 : initialValue.length);
    } catch (_unused2) {}

    setMentionedUserIds([]);
    setIsInput((textField === null || textField === void 0 ? void 0 : (_textField$innerText = textField.innerText) === null || _textField$innerText === void 0 ? void 0 : _textField$innerText.length) > 0);
    setHeight();
  }, [initialValue]); // #Mention | Clear input value when channel changes

  React.useEffect(() => {
    if (!isEdit) {
      setIsInput(false);
      resetInput(ref);
    }
  }, [channelUrl]); // #Mention & #Edit | Fill message input values

  React.useEffect(() => {
    if (isEdit && message !== null && message !== void 0 && message.messageId) {
      var _message$mentionedUse, _message$mentionedMes, _textField$innerText2;

      // const textField = document.getElementById(textFieldId);
      const textField = ref === null || ref === void 0 ? void 0 : ref.current;

      if (isMentionEnabled && (message === null || message === void 0 ? void 0 : (_message$mentionedUse = message.mentionedUsers) === null || _message$mentionedUse === void 0 ? void 0 : _message$mentionedUse.length) > 0 && (message === null || message === void 0 ? void 0 : (_message$mentionedMes = message.mentionedMessageTemplate) === null || _message$mentionedMes === void 0 ? void 0 : _message$mentionedMes.length) > 0) {
        var _message$mentionedMes2;

        /* mention enabled */
        const {
          mentionedUsers = []
        } = message;
        textField.innerHTML = message === null || message === void 0 ? void 0 : (_message$mentionedMes2 = message.mentionedMessageTemplate) === null || _message$mentionedMes2 === void 0 ? void 0 : _message$mentionedMes2.split(' ').map(word => index.convertWordToStringObj(word, mentionedUsers).map(stringObj => {
          const {
            type,
            value,
            userId
          } = stringObj;

          if (type === index.StringObjType.mention && mentionedUsers.some(user => (user === null || user === void 0 ? void 0 : user.userId) === userId)) {
            var _mentionedUsers$find;

            return server.renderToString( /*#__PURE__*/React__default["default"].createElement(ui_MentionUserLabel, {
              userId: userId
            }, `${_const.USER_MENTION_TEMP_CHAR}${((_mentionedUsers$find = mentionedUsers.find(user => (user === null || user === void 0 ? void 0 : user.userId) === userId)) === null || _mentionedUsers$find === void 0 ? void 0 : _mentionedUsers$find.nickname) || value || stringSet.MENTION_NAME__NO_NAME}`));
          }

          return sanitizeString(value);
        }).join('')).join(' ');
      } else {
        /* mention disabled */
        try {
          textField.innerHTML = sanitizeString(message === null || message === void 0 ? void 0 : message.message);
        } catch (_unused3) {}

        setMentionedUserIds([]);
      }

      setIsInput((textField === null || textField === void 0 ? void 0 : (_textField$innerText2 = textField.innerText) === null || _textField$innerText2 === void 0 ? void 0 : _textField$innerText2.length) > 0);
      setHeight();
    }
  }, [isEdit, message]); // #Mention | Detect MentionedLabel modified

  const useMentionedLabelDetection = React.useCallback(() => {
    const textField = ref === null || ref === void 0 ? void 0 : ref.current;

    if (isMentionEnabled) {
      const newMentionedUserIds = [...textField.getElementsByClassName('sendbird-mention-user-label')].map(node => {
        var _node$dataset;

        return node === null || node === void 0 ? void 0 : (_node$dataset = node.dataset) === null || _node$dataset === void 0 ? void 0 : _node$dataset.userid;
      });

      if (!index.arrayEqual(mentionedUserIds, newMentionedUserIds) || newMentionedUserIds.length === 0) {
        onMentionedUserIdsUpdated(newMentionedUserIds);
        setMentionedUserIds(newMentionedUserIds);
      }
    }

    setIsInput(textField.innerText.length > 0);
  }, [targetStringInfo, isMentionEnabled]); // #Mention | Replace selected user nickname to the MentionedUserLabel

  React.useEffect(() => {
    if (isMentionEnabled && mentionSelectedUser) {
      const {
        targetString,
        startNodeIndex,
        startOffsetIndex,
        endNodeIndex,
        endOffsetIndex
      } = targetStringInfo;

      if (targetString && startNodeIndex !== null && startOffsetIndex !== null) {
        var _document, _childNodes$startNode, _document2, _childNodes$endNodeIn;

        // const textField = document.getElementById(textFieldId);
        const textField = ref === null || ref === void 0 ? void 0 : ref.current;
        const childNodes = [...(textField === null || textField === void 0 ? void 0 : textField.childNodes)];
        const frontTextNode = (_document = document) === null || _document === void 0 ? void 0 : _document.createTextNode((_childNodes$startNode = childNodes[startNodeIndex]) === null || _childNodes$startNode === void 0 ? void 0 : _childNodes$startNode.textContent.slice(0, startOffsetIndex));
        const backTextNode = (_document2 = document) === null || _document2 === void 0 ? void 0 : _document2.createTextNode(`\u00A0${(_childNodes$endNodeIn = childNodes[endNodeIndex]) === null || _childNodes$endNodeIn === void 0 ? void 0 : _childNodes$endNodeIn.textContent.slice(endOffsetIndex)}`);
        const mentionLabel = server.renderToString( /*#__PURE__*/React__default["default"].createElement(ui_MentionUserLabel, {
          userId: mentionSelectedUser === null || mentionSelectedUser === void 0 ? void 0 : mentionSelectedUser.userId
        }, `${_const.USER_MENTION_TEMP_CHAR}${(mentionSelectedUser === null || mentionSelectedUser === void 0 ? void 0 : mentionSelectedUser.nickname) || stringSet.MENTION_NAME__NO_NAME}`));
        const div = document.createElement('div');
        div.innerHTML = mentionLabel;
        const newNodes = [...childNodes.slice(0, startNodeIndex), frontTextNode, div.childNodes[0], backTextNode, ...childNodes.slice(endNodeIndex + 1)];
        textField.innerHTML = '';
        newNodes.forEach(newNode => {
          textField.appendChild(newNode);
        });
        onUserMentioned(mentionSelectedUser);

        if (window.getSelection || document.getSelection) {
          // set caret postion
          const selection = window.getSelection() || document.getSelection();
          selection.removeAllRanges();
          const range = new Range();
          range.selectNodeContents(textField);
          range.setStart(textField.childNodes[startNodeIndex + 2], 1);
          range.setEnd(textField.childNodes[startNodeIndex + 2], 1);
          range.collapse(false);
          selection.addRange(range);
          textField.focus();
        }

        setTargetStringInfo(_rollupPluginBabelHelpers._objectSpread2({}, initialTargetStringInfo));
        setHeight();
        useMentionedLabelDetection();
      }
    }
  }, [mentionSelectedUser, isMentionEnabled]); // #Mention | Detect mentioning user nickname

  const useMentionInputDetection = React.useCallback(() => {
    var _window, _window$getSelection, _document3, _document3$getSelecti;

    const selection = ((_window = window) === null || _window === void 0 ? void 0 : (_window$getSelection = _window.getSelection) === null || _window$getSelection === void 0 ? void 0 : _window$getSelection.call(_window)) || ((_document3 = document) === null || _document3 === void 0 ? void 0 : (_document3$getSelecti = _document3.getSelection) === null || _document3$getSelecti === void 0 ? void 0 : _document3$getSelecti.call(_document3));
    const textField = ref === null || ref === void 0 ? void 0 : ref.current;

    if (selection.anchorNode === textField) {
      onMentionStringChange('');
    }

    if (isMentionEnabled && selection && selection.anchorNode === selection.focusNode && selection.anchorOffset === selection.focusOffset) {
      let textStack = '';
      let startNodeIndex = null;
      let startOffsetIndex = null;

      for (let index = 0; index < textField.childNodes.length; index += 1) {
        const currentNode = textField.childNodes[index];

        if (currentNode.nodeType === _const$1.NodeTypes.TextNode) {
          /* text node */
          const textContent = currentNode === selection.anchorNode ? (currentNode === null || currentNode === void 0 ? void 0 : currentNode.textContent.slice(0, selection.anchorOffset)) || '' : (currentNode === null || currentNode === void 0 ? void 0 : currentNode.textContent) || '';

          if (textStack.length > 0) {
            textStack += textContent;
          } else {
            let charLastIndex = textContent.lastIndexOf(_const.USER_MENTION_TEMP_CHAR);

            for (let i = charLastIndex - 1; i > -1; i -= 1) {
              if (textContent[i] === _const.USER_MENTION_TEMP_CHAR) {
                charLastIndex = i;
              } else {
                break;
              }
            }

            if (charLastIndex > -1) {
              textStack = textContent;
              startNodeIndex = index;
              startOffsetIndex = charLastIndex;
            }
          }
        } else {
          /* other nodes */
          textStack = '';
          startNodeIndex = null;
          startOffsetIndex = null;
        }

        if (currentNode === selection.anchorNode) {
          /**
           * targetString could be ''
           * startNodeIndex and startOffsetIndex could be null
           */
          const targetString = textStack ? textStack.slice(startOffsetIndex) : ''; // include template character

          setTargetStringInfo({
            targetString,
            startNodeIndex,
            startOffsetIndex,
            endNodeIndex: index,
            endOffsetIndex: selection.anchorOffset
          });
          onMentionStringChange(targetString);
          return;
        }
      }
    }
  }, [isMentionEnabled]);

  const sendMessage = () => {
    const textField = ref === null || ref === void 0 ? void 0 : ref.current;

    if (!isEdit && textField !== null && textField !== void 0 && textField.innerText) {
      let messageText = '';
      let mentionTemplate = '';
      textField.childNodes.forEach(node => {
        if (node.nodeType === _const$1.NodeTypes.ElementNode && node.nodeName === _const$1.NodeNames.Span) {
          const {
            innerText,
            dataset = {}
          } = node;
          const {
            userid = ''
          } = dataset;
          messageText += innerText;
          mentionTemplate += `${_const.USER_MENTION_TEMP_CHAR}{${userid}}`;
        } else if (node.nodeType === _const$1.NodeTypes.ElementNode && node.nodeName === _const$1.NodeNames.Br) {
          messageText += '\n';
          mentionTemplate += '\n';
        } else {
          // other nodes including text node
          const {
            textContent = ''
          } = node;
          messageText += textContent;
          mentionTemplate += textContent;
        }
      });
      const params = {
        message: messageText,
        mentionTemplate
      };
      onSendMessage(params);
      resetInput(ref);
      setIsInput(false);
      setHeight();
    }
  };

  const isEditDisabled = !(ref !== null && ref !== void 0 && (_ref$current = ref.current) !== null && _ref$current !== void 0 && (_ref$current$innerTex = _ref$current.innerText) !== null && _ref$current$innerTex !== void 0 && _ref$current$innerTex.trim());

  const editMessage = () => {
    const textField = ref === null || ref === void 0 ? void 0 : ref.current;
    const messageId = message === null || message === void 0 ? void 0 : message.messageId;

    if (isEdit && messageId) {
      let messageText = '';
      let mentionTemplate = '';
      textField.childNodes.forEach(node => {
        if (node.nodeType === _const$1.NodeTypes.ElementNode && node.nodeName === _const$1.NodeNames.Span) {
          const {
            innerText,
            dataset = {}
          } = node;
          const {
            userid = ''
          } = dataset;
          messageText += innerText;
          mentionTemplate += `${_const.USER_MENTION_TEMP_CHAR}{${userid}}`;
        } else if (node.nodeType === _const$1.NodeTypes.ElementNode && node.nodeName === _const$1.NodeNames.Span) {
          messageText += '\n';
          mentionTemplate += '\n';
        } else {
          // other nodes including text node
          const {
            textContent = ''
          } = node;
          messageText += textContent;
          mentionTemplate += textContent;
        }
      });
      const params = {
        messageId,
        message: messageText,
        mentionTemplate
      };
      onUpdateMessage(params);
      resetInput(ref);
    }
  };

  return /*#__PURE__*/React__default["default"].createElement("form", {
    className: index.getClassName([className, isEdit ? 'sendbird-message-input__edit' : '', disabled ? 'sendbird-message-input-form__disabled' : ''])
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName(['sendbird-message-input', disabled ? 'sendbird-message-input__disabled' : ''])
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    id: `${textFieldId}${isEdit ? message === null || message === void 0 ? void 0 : message.messageId : ''}`,
    className: `sendbird-message-input--textarea ${textFieldId}`,
    contentEditable: !disabled,
    role: "textbox",
    "aria-label": "Text Input",
    disabled: disabled,
    ref: ref,
    maxLength: maxLength,
    onKeyDown: e => {
      const preventEvent = onKeyDown(e);

      if (preventEvent) {
        e.preventDefault();
      } else {
        var _e$nativeEvent, _ref$current2, _ref$current2$childNo, _ref$current3, _ref$current3$childNo, _ref$current3$childNo2, _ref$current$childNod, _ref$current$childNod2;

        if (!e.shiftKey && e.key === _const$1.MessageInputKeys.Enter && (e === null || e === void 0 ? void 0 : (_e$nativeEvent = e.nativeEvent) === null || _e$nativeEvent === void 0 ? void 0 : _e$nativeEvent.isComposing) !== true) {
          e.preventDefault();
          sendMessage();
        }

        if (e.key === _const$1.MessageInputKeys.Backspace && (ref === null || ref === void 0 ? void 0 : (_ref$current2 = ref.current) === null || _ref$current2 === void 0 ? void 0 : (_ref$current2$childNo = _ref$current2.childNodes) === null || _ref$current2$childNo === void 0 ? void 0 : _ref$current2$childNo.length) === 2 && !(ref !== null && ref !== void 0 && (_ref$current3 = ref.current) !== null && _ref$current3 !== void 0 && (_ref$current3$childNo = _ref$current3.childNodes) !== null && _ref$current3$childNo !== void 0 && (_ref$current3$childNo2 = _ref$current3$childNo[0]) !== null && _ref$current3$childNo2 !== void 0 && _ref$current3$childNo2.textContent) && (ref === null || ref === void 0 ? void 0 : (_ref$current$childNod = ref.current.childNodes) === null || _ref$current$childNod === void 0 ? void 0 : (_ref$current$childNod2 = _ref$current$childNod[1]) === null || _ref$current$childNod2 === void 0 ? void 0 : _ref$current$childNod2.nodeType) === _const$1.NodeTypes.ElementNode) {
          ref === null || ref === void 0 ? void 0 : ref.current.removeChild(ref === null || ref === void 0 ? void 0 : ref.current.childNodes[1]);
        }
      }
    },
    onKeyUp: e => {
      const preventEvent = onKeyUp(e);

      if (preventEvent) {
        e.preventDefault();
      } else {
        useMentionInputDetection();
      }
    },
    onClick: () => {
      useMentionInputDetection();
    },
    onInput: () => {
      var _ref$current4, _ref$current4$innerTe;

      setHeight();
      onStartTyping();
      setIsInput((ref === null || ref === void 0 ? void 0 : (_ref$current4 = ref.current) === null || _ref$current4 === void 0 ? void 0 : (_ref$current4$innerTe = _ref$current4.innerText) === null || _ref$current4$innerTe === void 0 ? void 0 : _ref$current4$innerTe.length) > 0);
      useMentionedLabelDetection();
    },
    onPaste: e => {
      e.preventDefault();
      document.execCommand("insertHTML", false, sanitizeString(e === null || e === void 0 ? void 0 : e.clipboardData.getData('text')));
    }
  }), !isInput && /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-message-input--placeholder",
    type: ui_Label.LabelTypography.BODY_1,
    color: ui_Label.LabelColors.ONBACKGROUND_3
  }, placeholder || stringSet.MESSAGE_INPUT__PLACE_HOLDER), !isEdit && isInput && /*#__PURE__*/React__default["default"].createElement(ui_IconButton, {
    className: "sendbird-message-input--send",
    height: "32px",
    width: "32px",
    onClick: () => sendMessage()
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.SEND,
    fillColor: ui_Icon.IconColors.PRIMARY,
    width: "20px",
    height: "20px"
  })), !isEdit && !isInput && /*#__PURE__*/React__default["default"].createElement(ui_IconButton, {
    className: "sendbird-message-input--attach",
    height: "32px",
    width: "32px",
    onClick: () => {
      var _fileInputRef$current, _fileInputRef$current2;

      // todo: clear previous input
      fileInputRef === null || fileInputRef === void 0 ? void 0 : (_fileInputRef$current = fileInputRef.current) === null || _fileInputRef$current === void 0 ? void 0 : (_fileInputRef$current2 = _fileInputRef$current.click) === null || _fileInputRef$current2 === void 0 ? void 0 : _fileInputRef$current2.call(_fileInputRef$current);
    }
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.ATTACH,
    fillColor: ui_Icon.IconColors.CONTENT_INVERSE,
    width: "20px",
    height: "20px"
  }), /*#__PURE__*/React__default["default"].createElement("input", {
    className: "sendbird-message-input--attach-input",
    type: "file",
    ref: fileInputRef,
    onChange: handleUploadFile(onFileUpload)
  }))), isEdit && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-message-input--edit-action"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Button["default"], {
    className: "sendbird-message-input--edit-action__cancel",
    type: ui_Button.ButtonTypes.SECONDARY,
    size: ui_Button.ButtonSizes.SMALL,
    onClick: onCancelEdit
  }, stringSet.BUTTON__CANCEL), /*#__PURE__*/React__default["default"].createElement(ui_Button["default"], {
    className: "sendbird-message-input--edit-action__save",
    type: ui_Button.ButtonTypes.PRIMARY,
    size: ui_Button.ButtonSizes.SMALL,
    disabled: isEditDisabled,
    onClick: () => editMessage()
  }, stringSet.BUTTON__SAVE)));
});
MessageInput.propTypes = {
  className: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].arrayOf(PropTypes__default["default"].string)]),
  messageFieldId: PropTypes__default["default"].string,
  placeholder: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].bool]),
  value: PropTypes__default["default"].string,
  isEdit: PropTypes__default["default"].bool,
  isMentionEnabled: PropTypes__default["default"].bool,
  message: PropTypes__default["default"].shape({
    messageId: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
    message: PropTypes__default["default"].string,
    mentionedMessageTemplate: PropTypes__default["default"].string,
    mentionedUsers: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape({}))
  }),
  disabled: PropTypes__default["default"].bool,
  maxLength: PropTypes__default["default"].number,
  onFileUpload: PropTypes__default["default"].func,
  onSendMessage: PropTypes__default["default"].func,
  onUpdateMessage: PropTypes__default["default"].func,
  onStartTyping: PropTypes__default["default"].func,
  onCancelEdit: PropTypes__default["default"].func,
  channelUrl: PropTypes__default["default"].string,
  mentionSelectedUser: PropTypes__default["default"].shape({
    userId: PropTypes__default["default"].string,
    nickname: PropTypes__default["default"].string
  }),
  onUserMentioned: PropTypes__default["default"].func,
  onMentionStringChange: PropTypes__default["default"].func,
  onMentionedUserIdsUpdated: PropTypes__default["default"].func,
  onKeyUp: PropTypes__default["default"].func,
  onKeyDown: PropTypes__default["default"].func
};
MessageInput.defaultProps = {
  className: '',
  messageFieldId: '',
  channelUrl: '',
  onSendMessage: noop,
  onUpdateMessage: noop,
  value: null,
  message: null,
  isEdit: false,
  isMentionEnabled: false,
  disabled: false,
  placeholder: '',
  maxLength: 5000,
  onFileUpload: noop,
  onCancelEdit: noop,
  onStartTyping: noop,
  mentionSelectedUser: null,
  onUserMentioned: noop,
  onMentionStringChange: noop,
  onMentionedUserIdsUpdated: noop,
  onKeyUp: noop,
  onKeyDown: noop
};

module.exports = MessageInput;
//# sourceMappingURL=MessageInput.js.map
