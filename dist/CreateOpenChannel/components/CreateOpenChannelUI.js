import React__default, { useState, useRef, useContext } from 'react';
import { a as LocalizationContext } from '../../LocalizationContext-e5f35d14.js';
import Avatar from '../../ui/Avatar.js';
import { ButtonTypes } from '../../ui/Button.js';
import Modal from '../../ui/Modal.js';
import Icon, { IconTypes, IconColors } from '../../ui/Icon.js';
import Input, { InputLabel } from '../../ui/Input.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../../index-f60cbf08.js';
import TextButton from '../../ui/TextButton.js';
import { useCreateOpenChannelContext } from '../context.js';
import '../../stringSet-42c0e16e.js';
import '../../index-5dcd7e0f.js';
import '../../tslib.es6-75bd0528.js';
import '../../ui/ImageRenderer.js';
import '../../uuid-392016d0.js';
import 'prop-types';
import 'react-dom';
import '../../index-5ab5d8fe.js';
import '../../ui/IconButton.js';
import '../../MediaQueryContext-0ce6633d.js';
import '../../color-52d916b6.js';
import '../../useSendbirdStateContext.js';
import '../../withSendbird.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';

function CreateOpenChannelUI(_a) {
  var closeModal = _a.closeModal,
      renderHeader = _a.renderHeader,
      renderProfileInput = _a.renderProfileInput;

  var _b = useState(null),
      newFile = _b[0],
      setNewFile = _b[1];

  var _c = useState(null),
      currentImage = _c[0],
      setCurrentImg = _c[1];

  var inputFormRef = useRef(null);
  var inputFileRef = useRef(null);
  var inputTextRef = useRef(null);
  var stringSet = useContext(LocalizationContext).stringSet;

  var _d = useCreateOpenChannelContext(),
      logger = _d.logger,
      createNewOpenChannel = _d.createNewOpenChannel;

  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-create-open-channel-ui"
  }, /*#__PURE__*/React__default.createElement(Modal, {
    isFullScreenOnMobile: true,
    titleText: stringSet.CREATE_OPEN_CHANNEL_LIST__TITLE,
    submitText: stringSet.CREATE_OPEN_CHANNEL_LIST__SUBMIT,
    type: ButtonTypes.PRIMARY,
    onCancel: closeModal,
    renderHeader: renderHeader,
    onSubmit: function () {
      var _a;

      var channelName = (_a = inputTextRef === null || inputTextRef === void 0 ? void 0 : inputTextRef.current) === null || _a === void 0 ? void 0 : _a.value;

      if (!channelName) {
        logger.warning('CreateOpenChannelUI: You should fill the channel name');
        return;
      }

      createNewOpenChannel({
        name: channelName,
        coverUrlOrImage: newFile
      });
      closeModal();
    }
  }, /*#__PURE__*/React__default.createElement(React__default.Fragment, null, (renderProfileInput === null || renderProfileInput === void 0 ? void 0 : renderProfileInput()) || /*#__PURE__*/React__default.createElement("form", {
    className: "sendbird-create-open-channel-ui__profile-input",
    ref: inputFormRef,
    onSubmit: function (e) {
      e.preventDefault();
    }
  }, /*#__PURE__*/React__default.createElement(InputLabel, null, stringSet.CREATE_OPEN_CHANNEL_LIST__SUBTITLE__IMG_SECTION), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-create-open-channel-ui__profile-input__img-section"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-create-open-channel-ui__profile-input__img-section__avatar"
  }, currentImage ? /*#__PURE__*/React__default.createElement(Avatar, {
    width: "80px",
    height: "80px",
    src: currentImage
  }) : /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-create-open-channel-ui__profile-input__img-section__avatar--default"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.CHANNELS,
    fillColor: IconColors.CONTENT,
    width: "46px",
    height: "46px"
  }))), /*#__PURE__*/React__default.createElement("input", {
    className: "sendbird-create-open-channel-ui__profile-input__img-section__input",
    ref: inputFileRef,
    type: "file",
    accept: "image/gif, image/jpeg, image/png",
    style: {
      display: 'none'
    },
    onChange: function (e) {
      setCurrentImg(URL.createObjectURL(e.target.files[0]));
      setNewFile(e.target.files[0]);
      inputFileRef.current.value = '';
    }
  }), /*#__PURE__*/React__default.createElement(TextButton, {
    className: "sendbird-create-open-channel-ui__profile-input__img-section__button",
    onClick: function () {
      return inputFileRef.current.click();
    },
    disableUnderline: true
  }, /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.BUTTON_1,
    color: LabelColors.PRIMARY
  }, stringSet.CREATE_OPEN_CHANNEL_LIST__SUBTITLE__IMG_UPLOAD))), /*#__PURE__*/React__default.createElement("div", {
    style: {
      marginTop: '20px'
    }
  }, /*#__PURE__*/React__default.createElement(InputLabel, null, stringSet.CREATE_OPEN_CHANNEL_LIST__SUBTITLE__TEXT_SECTION)), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-create-open-channel-ui__profile-input__name-section"
  }, /*#__PURE__*/React__default.createElement(Input, {
    name: "sendbird-create-open-channel-ui__profile-input__name-section__input",
    ref: inputTextRef,
    placeHolder: stringSet.CREATE_OPEN_CHANNEL_LIST__SUBTITLE__TEXT_PLACE_HOLDER
  }))))));
}

export { CreateOpenChannelUI as default };
//# sourceMappingURL=CreateOpenChannelUI.js.map
