'use strict';

var React = require('react');
var LocalizationContext = require('../../LocalizationContext-f4281153.js');
var ui_Avatar = require('../../ui/Avatar.js');
var ui_Button = require('../../ui/Button.js');
var ui_Modal = require('../../ui/Modal.js');
var ui_Icon = require('../../ui/Icon.js');
var ui_Input = require('../../ui/Input.js');
var ui_Label = require('../../index-4197d014.js');
var ui_TextButton = require('../../ui/TextButton.js');
var CreateOpenChannel_context = require('../context.js');
require('../../stringSet-2dfd148b.js');
require('../../index-d4bc012c.js');
require('../../tslib.es6-d6068b10.js');
require('../../ui/ImageRenderer.js');
require('../../uuid-2f4916c1.js');
require('prop-types');
require('react-dom');
require('../../index-1b132096.js');
require('../../ui/IconButton.js');
require('../../MediaQueryContext-9a5566fc.js');
require('../../color-0fae7c8e.js');
require('../../useSendbirdStateContext.js');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function CreateOpenChannelUI(_a) {
  var closeModal = _a.closeModal,
      renderHeader = _a.renderHeader,
      renderProfileInput = _a.renderProfileInput;

  var _b = React.useState(null),
      newFile = _b[0],
      setNewFile = _b[1];

  var _c = React.useState(null),
      currentImage = _c[0],
      setCurrentImg = _c[1];

  var inputFormRef = React.useRef(null);
  var inputFileRef = React.useRef(null);
  var inputTextRef = React.useRef(null);
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;

  var _d = CreateOpenChannel_context.useCreateOpenChannelContext(),
      logger = _d.logger,
      createNewOpenChannel = _d.createNewOpenChannel;

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-create-open-channel-ui"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Modal["default"], {
    isFullScreenOnMobile: true,
    titleText: stringSet.CREATE_OPEN_CHANNEL_LIST__TITLE,
    submitText: stringSet.CREATE_OPEN_CHANNEL_LIST__SUBMIT,
    type: ui_Button.ButtonTypes.PRIMARY,
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
  }, /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, (renderProfileInput === null || renderProfileInput === void 0 ? void 0 : renderProfileInput()) || /*#__PURE__*/React__default["default"].createElement("form", {
    className: "sendbird-create-open-channel-ui__profile-input",
    ref: inputFormRef,
    onSubmit: function (e) {
      e.preventDefault();
    }
  }, /*#__PURE__*/React__default["default"].createElement(ui_Input.InputLabel, null, stringSet.CREATE_OPEN_CHANNEL_LIST__SUBTITLE__IMG_SECTION), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-create-open-channel-ui__profile-input__img-section"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-create-open-channel-ui__profile-input__img-section__avatar"
  }, currentImage ? /*#__PURE__*/React__default["default"].createElement(ui_Avatar["default"], {
    width: "80px",
    height: "80px",
    src: currentImage
  }) : /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-create-open-channel-ui__profile-input__img-section__avatar--default"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.CHANNELS,
    fillColor: ui_Icon.IconColors.CONTENT,
    width: "46px",
    height: "46px"
  }))), /*#__PURE__*/React__default["default"].createElement("input", {
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
  }), /*#__PURE__*/React__default["default"].createElement(ui_TextButton, {
    className: "sendbird-create-open-channel-ui__profile-input__img-section__button",
    onClick: function () {
      return inputFileRef.current.click();
    },
    disableUnderline: true
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.BUTTON_1,
    color: ui_Label.LabelColors.PRIMARY
  }, stringSet.CREATE_OPEN_CHANNEL_LIST__SUBTITLE__IMG_UPLOAD))), /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      marginTop: '20px'
    }
  }, /*#__PURE__*/React__default["default"].createElement(ui_Input.InputLabel, null, stringSet.CREATE_OPEN_CHANNEL_LIST__SUBTITLE__TEXT_SECTION)), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-create-open-channel-ui__profile-input__name-section"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Input["default"], {
    name: "sendbird-create-open-channel-ui__profile-input__name-section__input",
    ref: inputTextRef,
    placeHolder: stringSet.CREATE_OPEN_CHANNEL_LIST__SUBTITLE__TEXT_PLACE_HOLDER
  }))))));
}

module.exports = CreateOpenChannelUI;
//# sourceMappingURL=CreateOpenChannelUI.js.map
