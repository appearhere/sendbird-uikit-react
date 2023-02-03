import React__default, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { a as LocalizationContext } from '../LocalizationContext-e5f35d14.js';
import { M as MODAL_ROOT } from '../index-5ab5d8fe.js';
import { D as isSupportedFileView, E as isVideo, F as isImage } from '../index-105a85f4.js';
import Avatar from './Avatar.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../index-f60cbf08.js';
import Icon, { IconTypes, IconColors } from './Icon.js';
import '../stringSet-42c0e16e.js';
import '../index-5dcd7e0f.js';
import '../tslib.es6-75bd0528.js';
import '../utils/message/getOutgoingMessageState.js';
import './ImageRenderer.js';
import '../uuid-392016d0.js';
import 'prop-types';

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
  var stringSet = useContext(LocalizationContext).stringSet;
  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-fileviewer"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-fileviewer__header"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-fileviewer__header__left"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-fileviewer__header__left__avatar"
  }, /*#__PURE__*/React__default.createElement(Avatar, {
    height: "32px",
    width: "32px",
    src: profileUrl
  })), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-fileviewer__header__left__filename",
    type: LabelTypography.H_2,
    color: LabelColors.ONBACKGROUND_1
  }, name), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-fileviewer__header__left__sender-name",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_2
  }, nickname)), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-fileviewer__header__right"
  }, isSupportedFileView(type) && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-fileviewer__header__right__actions"
  }, /*#__PURE__*/React__default.createElement("a", {
    className: "sendbird-fileviewer__header__right__actions__download",
    rel: "noopener noreferrer",
    href: url,
    target: "_blank"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.DOWNLOAD,
    fillColor: IconColors.ON_BACKGROUND_1,
    height: "24px",
    width: "24px"
  })), onDelete && isByMe && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-fileviewer__header__right__actions__delete"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    className: disableDelete ? 'disabled' : '',
    type: IconTypes.DELETE,
    fillColor: disableDelete ? IconColors.GRAY : IconColors.ON_BACKGROUND_1,
    height: "24px",
    width: "24px",
    onClick: function (e) {
      if (!disableDelete) {
        onDelete === null || onDelete === void 0 ? void 0 : onDelete(e);
      }
    }
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-fileviewer__header__right__actions__close"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.CLOSE,
    fillColor: IconColors.ON_BACKGROUND_1,
    height: "24px",
    width: "24px",
    onClick: function (e) {
      return onClose === null || onClose === void 0 ? void 0 : onClose(e);
    }
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-fileviewer__content"
  }, isVideo(type) && /*#__PURE__*/React__default.createElement("video", {
    controls: true,
    className: "sendbird-fileviewer__content__video"
  }, /*#__PURE__*/React__default.createElement("source", {
    src: url,
    type: type
  })), isImage(type) && /*#__PURE__*/React__default.createElement("img", {
    src: url,
    alt: name,
    className: "sendbird-fileviewer__content__img"
  }), !isSupportedFileView(type) && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-fileviewer__content__unsupported"
  }, /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.H_1,
    color: LabelColors.ONBACKGROUND_1
  }, (stringSet === null || stringSet === void 0 ? void 0 : stringSet.UI__FILE_VIEWER__UNSUPPORT) || 'Unsupported message'))));
};
function FileViewer(_a) {
  var _b, _c, _d;

  var message = _a.message,
      _e = _a.isByMe,
      isByMe = _e === void 0 ? false : _e,
      onClose = _a.onClose,
      onDelete = _a.onDelete;
  return /*#__PURE__*/createPortal( /*#__PURE__*/React__default.createElement(FileViewerComponent, {
    profileUrl: (_b = message === null || message === void 0 ? void 0 : message.sender) === null || _b === void 0 ? void 0 : _b.profileUrl,
    nickname: (_c = message === null || message === void 0 ? void 0 : message.sender) === null || _c === void 0 ? void 0 : _c.nickname,
    name: message === null || message === void 0 ? void 0 : message.name,
    type: message === null || message === void 0 ? void 0 : message.type,
    url: message === null || message === void 0 ? void 0 : message.url,
    isByMe: isByMe,
    disableDelete: ((_d = message === null || message === void 0 ? void 0 : message.threadInfo) === null || _d === void 0 ? void 0 : _d.replyCount) > 0,
    onClose: onClose,
    onDelete: onDelete
  }), document.getElementById(MODAL_ROOT));
}

export { FileViewerComponent, FileViewer as default };
//# sourceMappingURL=FileViewer.js.map
