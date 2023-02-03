'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactDom = require('react-dom');
var LocalizationContext = require('../LocalizationContext-f4281153.js');
var index = require('../index-1b132096.js');
var index$1 = require('../index-d05a5cae.js');
var ui_Avatar = require('./Avatar.js');
var ui_Label = require('../index-4197d014.js');
var ui_Icon = require('./Icon.js');
require('../stringSet-2dfd148b.js');
require('../index-d4bc012c.js');
require('../tslib.es6-d6068b10.js');
require('../utils/message/getOutgoingMessageState.js');
require('./ImageRenderer.js');
require('../uuid-2f4916c1.js');
require('prop-types');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var FileViewerComponent = function (_a) {
  var profileUrl = _a.profileUrl,
      nickname = _a.nickname,
      name = _a.name,
      type = _a.type,
      url = _a.url,
      _b = _a.isByMe,
      isByMe = _b === void 0 ? true : _b,
      _c = _a.disableDelete,
      disableDelete = _c === void 0 ? false : _c,
      onClose = _a.onClose,
      onDelete = _a.onDelete;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-fileviewer"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-fileviewer__header"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-fileviewer__header__left"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-fileviewer__header__left__avatar"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Avatar["default"], {
    height: "32px",
    width: "32px",
    src: profileUrl
  })), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-fileviewer__header__left__filename",
    type: ui_Label.LabelTypography.H_2,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, name), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-fileviewer__header__left__sender-name",
    type: ui_Label.LabelTypography.BODY_1,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, nickname)), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-fileviewer__header__right"
  }, index$1.isSupportedFileView(type) && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-fileviewer__header__right__actions"
  }, /*#__PURE__*/React__default["default"].createElement("a", {
    className: "sendbird-fileviewer__header__right__actions__download",
    rel: "noopener noreferrer",
    href: url,
    target: "_blank"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.DOWNLOAD,
    fillColor: ui_Icon.IconColors.ON_BACKGROUND_1,
    height: "24px",
    width: "24px"
  })), onDelete && isByMe && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-fileviewer__header__right__actions__delete"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: disableDelete ? 'disabled' : '',
    type: ui_Icon.IconTypes.DELETE,
    fillColor: disableDelete ? ui_Icon.IconColors.GRAY : ui_Icon.IconColors.ON_BACKGROUND_1,
    height: "24px",
    width: "24px",
    onClick: function (e) {
      if (!disableDelete) {
        onDelete === null || onDelete === void 0 ? void 0 : onDelete(e);
      }
    }
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-fileviewer__header__right__actions__close"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.CLOSE,
    fillColor: ui_Icon.IconColors.ON_BACKGROUND_1,
    height: "24px",
    width: "24px",
    onClick: function (e) {
      return onClose === null || onClose === void 0 ? void 0 : onClose(e);
    }
  })))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-fileviewer__content"
  }, index$1.isVideo(type) && /*#__PURE__*/React__default["default"].createElement("video", {
    controls: true,
    className: "sendbird-fileviewer__content__video"
  }, /*#__PURE__*/React__default["default"].createElement("source", {
    src: url,
    type: type
  })), index$1.isImage(type) && /*#__PURE__*/React__default["default"].createElement("img", {
    src: url,
    alt: name,
    className: "sendbird-fileviewer__content__img"
  }), !index$1.isSupportedFileView(type) && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-fileviewer__content__unsupported"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.H_1,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, (stringSet === null || stringSet === void 0 ? void 0 : stringSet.UI__FILE_VIEWER__UNSUPPORT) || 'Unsupported message'))));
};
function FileViewer(_a) {
  var _b, _c, _d;

  var message = _a.message,
      _e = _a.isByMe,
      isByMe = _e === void 0 ? false : _e,
      onClose = _a.onClose,
      onDelete = _a.onDelete;
  return /*#__PURE__*/reactDom.createPortal( /*#__PURE__*/React__default["default"].createElement(FileViewerComponent, {
    profileUrl: (_b = message === null || message === void 0 ? void 0 : message.sender) === null || _b === void 0 ? void 0 : _b.profileUrl,
    nickname: (_c = message === null || message === void 0 ? void 0 : message.sender) === null || _c === void 0 ? void 0 : _c.nickname,
    name: message === null || message === void 0 ? void 0 : message.name,
    type: message === null || message === void 0 ? void 0 : message.type,
    url: message === null || message === void 0 ? void 0 : message.url,
    isByMe: isByMe,
    disableDelete: ((_d = message === null || message === void 0 ? void 0 : message.threadInfo) === null || _d === void 0 ? void 0 : _d.replyCount) > 0,
    onClose: onClose,
    onDelete: onDelete
  }), document.getElementById(index.MODAL_ROOT));
}

exports.FileViewerComponent = FileViewerComponent;
exports["default"] = FileViewer;
//# sourceMappingURL=FileViewer.js.map
