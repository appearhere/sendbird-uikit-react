import React__default, { useRef, useState, useContext } from 'react';
import { a as LocalizationContext } from '../../LocalizationContext-e5f35d14.js';
import { c as UPDATE_OPEN_CHANNEL } from '../../topics-0560d548.js';
import Modal from '../../ui/Modal.js';
import Input, { InputLabel } from '../../ui/Input.js';
import Avatar from '../../ui/Avatar.js';
import { ButtonTypes } from '../../ui/Button.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../../index-f60cbf08.js';
import TextButton from '../../ui/TextButton.js';
import ChannelAvatar from '../../ui/OpenChannelAvatar.js';
import { useOpenChannelSettingsContext } from '../context.js';
import useSendbirdStateContext from '../../useSendbirdStateContext.js';
import '../../stringSet-42c0e16e.js';
import '../../index-5dcd7e0f.js';
import 'react-dom';
import '../../index-5ab5d8fe.js';
import '../../ui/Icon.js';
import 'prop-types';
import '../../ui/IconButton.js';
import '../../tslib.es6-75bd0528.js';
import '../../MediaQueryContext-0ce6633d.js';
import '../../ui/ImageRenderer.js';
import '../../uuid-392016d0.js';
import '../../color-52d916b6.js';
import '../../utils-13fa0336.js';
import '@sendbird/chat/openChannel';
import '../../UserProfileContext-517994e3.js';
import '../../withSendbird.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';

var EditDetails = function (props) {
  var onCancel = props.onCancel;
  var globalState = useSendbirdStateContext();

  var _a = globalState === null || globalState === void 0 ? void 0 : globalState.config,
      logger = _a.logger,
      theme = _a.theme,
      pubSub = _a.pubSub;

  var _b = useOpenChannelSettingsContext(),
      channel = _b.channel,
      onBeforeUpdateChannel = _b.onBeforeUpdateChannel,
      onChannelModified = _b.onChannelModified,
      setChannel = _b.setChannel;

  var inputRef = useRef(null);
  var formRef = useRef(null);
  var hiddenInputRef = useRef(null);

  var _c = useState(null),
      currentImg = _c[0],
      setCurrentImg = _c[1];

  var _d = useState(null),
      newFile = _d[0],
      setNewFile = _d[1];

  var stringSet = useContext(LocalizationContext).stringSet;
  var title = channel === null || channel === void 0 ? void 0 : channel.name;
  return /*#__PURE__*/React__default.createElement(Modal, {
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
        pubSub === null || pubSub === void 0 ? void 0 : pubSub.publish(UPDATE_OPEN_CHANNEL, updatedChannel);
      }).catch(function (error) {
        logger.error('ChannelSettings: Channel infomation update failed', error);
        setChannel(null);
      });
      onCancel();
    },
    type: ButtonTypes.PRIMARY
  }, /*#__PURE__*/React__default.createElement("form", {
    className: "channel-profile-form",
    ref: formRef,
    onSubmit: function (e) {
      e.preventDefault();
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "channel-profile-form__img-section"
  }, /*#__PURE__*/React__default.createElement(InputLabel, null, stringSet.MODAL__CHANNEL_INFORMATION__CHANNEL_IMAGE), /*#__PURE__*/React__default.createElement("div", {
    className: "channel-profile-form__avatar"
  }, currentImg ? /*#__PURE__*/React__default.createElement(Avatar, {
    height: "80px",
    width: "80px",
    src: currentImg
  }) : /*#__PURE__*/React__default.createElement(ChannelAvatar, {
    height: 80,
    width: 80,
    channel: channel,
    theme: theme
  })), /*#__PURE__*/React__default.createElement("input", {
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
  }), /*#__PURE__*/React__default.createElement(TextButton, {
    className: "channel-profile-form__avatar-button",
    onClick: function () {
      return hiddenInputRef.current.click();
    },
    disableUnderline: true
  }, /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.BUTTON_1,
    color: LabelColors.PRIMARY
  }, stringSet.MODAL__CHANNEL_INFORMATION__UPLOAD))), /*#__PURE__*/React__default.createElement("div", {
    className: "channel-profile-form__name-section"
  }, /*#__PURE__*/React__default.createElement(InputLabel, null, stringSet.MODAL__CHANNEL_INFORMATION__CHANNEL_NAME), /*#__PURE__*/React__default.createElement(Input, {
    required: title !== '',
    name: "channel-profile-form__name",
    ref: inputRef,
    value: title,
    placeHolder: stringSet.MODAL__CHANNEL_INFORMATION__INPUT__PLACE_HOLDER
  }))));
};

export { EditDetails as default };
//# sourceMappingURL=EditDetailsModal.js.map
