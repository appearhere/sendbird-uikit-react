'use strict';

var React = require('react');
var LocalizationContext = require('../../LocalizationContext-f4281153.js');
var topics = require('../../topics-085b5602.js');
var ui_Modal = require('../../ui/Modal.js');
var ui_Input = require('../../ui/Input.js');
var ui_Avatar = require('../../ui/Avatar.js');
var ui_Button = require('../../ui/Button.js');
var ui_Label = require('../../index-4197d014.js');
var ui_TextButton = require('../../ui/TextButton.js');
var ui_OpenChannelAvatar = require('../../ui/OpenChannelAvatar.js');
var OpenChannelSettings_context = require('../context.js');
var useSendbirdStateContext = require('../../useSendbirdStateContext.js');
require('../../stringSet-2dfd148b.js');
require('../../index-d4bc012c.js');
require('react-dom');
require('../../index-1b132096.js');
require('../../ui/Icon.js');
require('prop-types');
require('../../ui/IconButton.js');
require('../../tslib.es6-d6068b10.js');
require('../../MediaQueryContext-9a5566fc.js');
require('../../ui/ImageRenderer.js');
require('../../uuid-2f4916c1.js');
require('../../color-0fae7c8e.js');
require('../../utils-6eb1ca73.js');
require('@sendbird/chat/openChannel');
require('../../UserProfileContext-fd00d1bd.js');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var EditDetails = function (props) {
  var onCancel = props.onCancel;
  var globalState = useSendbirdStateContext();

  var _a = globalState === null || globalState === void 0 ? void 0 : globalState.config,
      logger = _a.logger,
      theme = _a.theme,
      pubSub = _a.pubSub;

  var _b = OpenChannelSettings_context.useOpenChannelSettingsContext(),
      channel = _b.channel,
      onBeforeUpdateChannel = _b.onBeforeUpdateChannel,
      onChannelModified = _b.onChannelModified,
      setChannel = _b.setChannel;

  var inputRef = React.useRef(null);
  var formRef = React.useRef(null);
  var hiddenInputRef = React.useRef(null);

  var _c = React.useState(null),
      currentImg = _c[0],
      setCurrentImg = _c[1];

  var _d = React.useState(null),
      newFile = _d[0],
      setNewFile = _d[1];

  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  var title = channel === null || channel === void 0 ? void 0 : channel.name;
  return /*#__PURE__*/React__default["default"].createElement(ui_Modal["default"], {
    isFullScreenOnMobile: true,
    titleText: stringSet.MODAL__CHANNEL_INFORMATION__TITLE,
    submitText: stringSet.BUTTON__SAVE,
    onCancel: onCancel,
    onSubmit: function () {
      if (title !== '' && !inputRef.current.value) {
        if (formRef.current.reportValidity) {
          // might not work in explorer
          formRef.current.reportValidity();
        }

        return;
      }

      var currentTitle = inputRef.current.value;
      var currentImg = newFile;
      logger.info('ChannelSettings: Channel information being updated');
      var params = onBeforeUpdateChannel ? onBeforeUpdateChannel(currentTitle, currentImg, channel === null || channel === void 0 ? void 0 : channel.data) : {
        name: currentTitle,
        coverUrlOrImage: currentImg,
        data: channel === null || channel === void 0 ? void 0 : channel.data
      };
      logger.info('ChannelSettings: Updating channel information', params);
      channel === null || channel === void 0 ? void 0 : channel.updateChannel(params).then(function (updatedChannel) {
        logger.info('ChannelSettings: Channel information update succeeded', updatedChannel);
        onChannelModified === null || onChannelModified === void 0 ? void 0 : onChannelModified(updatedChannel);
        setChannel(updatedChannel);
        pubSub === null || pubSub === void 0 ? void 0 : pubSub.publish(topics.UPDATE_OPEN_CHANNEL, updatedChannel);
      }).catch(function (error) {
        logger.error('ChannelSettings: Channel infomation update failed', error);
        setChannel(null);
      });
      onCancel();
    },
    type: ui_Button.ButtonTypes.PRIMARY
  }, /*#__PURE__*/React__default["default"].createElement("form", {
    className: "channel-profile-form",
    ref: formRef,
    onSubmit: function (e) {
      e.preventDefault();
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "channel-profile-form__img-section"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Input.InputLabel, null, stringSet.MODAL__CHANNEL_INFORMATION__CHANNEL_IMAGE), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "channel-profile-form__avatar"
  }, currentImg ? /*#__PURE__*/React__default["default"].createElement(ui_Avatar["default"], {
    height: "80px",
    width: "80px",
    src: currentImg
  }) : /*#__PURE__*/React__default["default"].createElement(ui_OpenChannelAvatar, {
    height: 80,
    width: 80,
    channel: channel,
    theme: theme
  })), /*#__PURE__*/React__default["default"].createElement("input", {
    ref: hiddenInputRef,
    type: "file",
    accept: "image/gif, image/jpeg, image/png",
    style: {
      display: 'none'
    },
    onChange: function (e) {
      setCurrentImg(URL.createObjectURL(e.target.files[0]));
      setNewFile(e.target.files[0]);
      hiddenInputRef.current.value = '';
    }
  }), /*#__PURE__*/React__default["default"].createElement(ui_TextButton, {
    className: "channel-profile-form__avatar-button",
    onClick: function () {
      return hiddenInputRef.current.click();
    },
    disableUnderline: true
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.BUTTON_1,
    color: ui_Label.LabelColors.PRIMARY
  }, stringSet.MODAL__CHANNEL_INFORMATION__UPLOAD))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "channel-profile-form__name-section"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Input.InputLabel, null, stringSet.MODAL__CHANNEL_INFORMATION__CHANNEL_NAME), /*#__PURE__*/React__default["default"].createElement(ui_Input["default"], {
    required: title !== '',
    name: "channel-profile-form__name",
    ref: inputRef,
    value: title,
    placeHolder: stringSet.MODAL__CHANNEL_INFORMATION__INPUT__PLACE_HOLDER
  }))));
};

module.exports = EditDetails;
//# sourceMappingURL=EditDetailsModal.js.map
