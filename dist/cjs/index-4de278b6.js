'use strict';

var React = require('react');
var ui_Modal = require('./ui/Modal.js');
var LocalizationContext = require('./LocalizationContext-f4281153.js');
var useSendbirdStateContext = require('./useSendbirdStateContext.js');
var ui_Input = require('./ui/Input.js');
var ui_Avatar = require('./ui/Avatar.js');
var ui_Icon = require('./ui/Icon.js');
var ui_Button = require('./ui/Button.js');
var ui_Label = require('./index-4197d014.js');
var ui_TextButton = require('./ui/TextButton.js');
var utils = require('./utils-a9158c72.js');
var actionTypes = require('./actionTypes-4d28a480.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var EditUserProfileProviderContext = /*#__PURE__*/React__default["default"].createContext(undefined);

var EditUserProfileProvider = function (props) {
  var children = props.children,
      onEditProfile = props.onEditProfile,
      onCancel = props.onCancel,
      onThemeChange = props.onThemeChange;
  var value = React.useMemo(function () {
    return {
      onEditProfile: onEditProfile,
      onCancel: onCancel,
      onThemeChange: onThemeChange
    };
  }, []);
  return /*#__PURE__*/React__default["default"].createElement(EditUserProfileProviderContext.Provider, {
    value: value
  }, children);
};

var useEditUserProfileContext = function () {
  return React__default["default"].useContext(EditUserProfileProviderContext);
};

function EditUserProfile() {
  var _a, _b, _c, _d, _e, _f, _g;

  var editProfileProps = useEditUserProfileContext();
  var store = useSendbirdStateContext();
  var hiddenInputRef = React.useRef(null);
  var inputRef = React.useRef(null);
  var formRef = React.useRef(null);
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;

  var _h = React.useState(null),
      currentImg = _h[0],
      setCurrentImg = _h[1];

  var _j = React.useState(null),
      newFile = _j[0],
      setNewFile = _j[1];

  var onEditProfile = editProfileProps.onEditProfile,
      onCancel = editProfileProps.onCancel,
      onThemeChange = editProfileProps.onThemeChange;
  var theme = ((_a = store === null || store === void 0 ? void 0 : store.config) === null || _a === void 0 ? void 0 : _a.theme) || 'light';
  var changeTheme = ((_b = store === null || store === void 0 ? void 0 : store.config) === null || _b === void 0 ? void 0 : _b.setCurrenttheme) || utils.noop;
  var user = (_d = (_c = store === null || store === void 0 ? void 0 : store.stores) === null || _c === void 0 ? void 0 : _c.userStore) === null || _d === void 0 ? void 0 : _d.user;
  var sdk = (_f = (_e = store === null || store === void 0 ? void 0 : store.stores) === null || _e === void 0 ? void 0 : _e.sdkStore) === null || _f === void 0 ? void 0 : _f.sdk;
  var userDispatcher = (_g = store === null || store === void 0 ? void 0 : store.dispatchers) === null || _g === void 0 ? void 0 : _g.userDispatcher;
  return /*#__PURE__*/React__default["default"].createElement(ui_Modal["default"], {
    titleText: stringSet.EDIT_PROFILE__TITLE,
    submitText: stringSet.BUTTON__SAVE,
    type: ui_Button.ButtonTypes.PRIMARY,
    onCancel: onCancel,
    isFullScreenOnMobile: true,
    onSubmit: function () {
      var _a;

      if ((user === null || user === void 0 ? void 0 : user.nickname) !== '' && !inputRef.current.value) {
        if (formRef.current.reportValidity) {
          // might not work in explorer
          formRef.current.reportValidity();
        }

        return;
      }

      sdk === null || sdk === void 0 ? void 0 : sdk.updateCurrentUserInfo({
        nickname: (_a = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _a === void 0 ? void 0 : _a.value,
        profileImage: newFile
      }).then(function (updatedUser) {
        userDispatcher({
          type: actionTypes.UPDATE_USER_INFO,
          payload: updatedUser
        });

        if (onEditProfile && typeof onEditProfile === 'function') {
          onEditProfile(updatedUser);
        }
      });
    }
  }, /*#__PURE__*/React__default["default"].createElement("form", {
    className: "sendbird-edit-user-profile",
    ref: formRef,
    onSubmit: function (e) {
      e.preventDefault();
    }
  }, /*#__PURE__*/React__default["default"].createElement("section", {
    className: "sendbird-edit-user-profile__img"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Input.InputLabel, null, stringSet.EDIT_PROFILE__IMAGE_LABEL), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-edit-user-profile__img__avatar"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Avatar["default"], {
    width: "80px",
    height: "80px",
    src: currentImg || (user === null || user === void 0 ? void 0 : user.profileUrl)
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
    className: "sendbird-edit-user-profile__img__avatar-button",
    disableUnderline: true,
    onClick: function () {
      return hiddenInputRef.current.click();
    }
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    type: ui_Label.LabelTypography.BUTTON_1,
    color: ui_Label.LabelColors.PRIMARY
  }, stringSet.EDIT_PROFILE__IMAGE_UPLOAD))), /*#__PURE__*/React__default["default"].createElement("section", {
    className: "sendbird-edit-user-profile__name"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Input.InputLabel, null, stringSet.EDIT_PROFILE__NICKNAME_LABEL), /*#__PURE__*/React__default["default"].createElement(ui_Input["default"], {
    required: (user === null || user === void 0 ? void 0 : user.nickname) !== '',
    name: "sendbird-edit-user-profile__name__input",
    ref: inputRef,
    value: user === null || user === void 0 ? void 0 : user.nickname,
    placeHolder: stringSet.EDIT_PROFILE__NICKNAME_PLACEHOLDER
  })), /*#__PURE__*/React__default["default"].createElement("section", {
    className: "sendbird-edit-user-profile__userid"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Input.InputLabel, null, stringSet.EDIT_PROFILE__USERID_LABEL), /*#__PURE__*/React__default["default"].createElement(ui_Input["default"], {
    disabled: true,
    name: "sendbird-edit-user-profile__userid__input",
    value: user === null || user === void 0 ? void 0 : user.userId
  })), /*#__PURE__*/React__default["default"].createElement("section", {
    className: "sendbird-edit-user-profile__theme"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Input.InputLabel, null, stringSet.EDIT_PROFILE__THEME_LABEL), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-edit-user-profile__theme__theme-icon"
  }, theme === 'dark' ? /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    onClick: function () {
      changeTheme('light');
      onThemeChange === null || onThemeChange === void 0 ? void 0 : onThemeChange('light'); // if (onThemeChange && typeof onThemeChange === 'function') {
      //   onThemeChange('light');
      // }
    },
    type: ui_Icon.IconTypes.TOGGLE_ON,
    width: 44,
    height: 24
  }) : /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    onClick: function () {
      changeTheme('dark');
      onThemeChange === null || onThemeChange === void 0 ? void 0 : onThemeChange('dark'); // if (onThemeChange && typeof onThemeChange === 'function') {
      //   onThemeChange('dark');
      // }
    },
    type: ui_Icon.IconTypes.TOGGLE_OFF,
    width: 44,
    height: 24
  })))));
}

exports.EditUserProfile = EditUserProfile;
exports.EditUserProfileProvider = EditUserProfileProvider;
//# sourceMappingURL=index-4de278b6.js.map
