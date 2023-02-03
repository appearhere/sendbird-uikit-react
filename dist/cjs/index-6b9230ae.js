'use strict';

var tslib_es6 = require('./tslib.es6-d6068b10.js');
var React = require('react');
var LocalizationContext = require('./LocalizationContext-f4281153.js');
var ui_Icon = require('./ui/Icon.js');
var ui_Label = require('./index-4197d014.js');
var ui_Loader = require('./ui/Loader.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function Types() {
  return {
    LOADING: 'LOADING',
    NO_CHANNELS: 'NO_CHANNELS',
    NO_MESSAGES: 'NO_MESSAGES',
    WRONG: 'WRONG',
    SEARCH_IN: 'SEARCH_IN',
    SEARCHING: 'SEARCHING',
    NO_RESULTS: 'NO_RESULTS'
  };
}

var PlaceHolderTypes$1 = Types();

var PlaceHolderTypes = PlaceHolderTypes$1;
function PlaceHolder(_a) {
  var _b = _a.className,
      className = _b === void 0 ? '' : _b,
      type = _a.type,
      iconSize = _a.iconSize,
      _c = _a.searchInString,
      searchInString = _c === void 0 ? '' : _c,
      _d = _a.retryToConnect,
      retryToConnect = _d === void 0 ? null : _d;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-place-holder'], false).join(' ')
  }, type === PlaceHolderTypes.LOADING && /*#__PURE__*/React__default["default"].createElement(ui_Loader, {
    width: iconSize || "48px",
    height: iconSize || "48px"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.SPINNER,
    fillColor: ui_Icon.IconColors.PRIMARY,
    width: iconSize || "48px",
    height: iconSize || "48px"
  })), (type === PlaceHolderTypes.NO_CHANNELS || type === PlaceHolderTypes.NO_MESSAGES || type === PlaceHolderTypes.WRONG) && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-place-holder__body"
  }, type === PlaceHolderTypes.NO_CHANNELS && /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: "sendbird-place-holder__body__icon",
    type: ui_Icon.IconTypes.CHAT,
    fillColor: ui_Icon.IconColors.ON_BACKGROUND_3,
    width: iconSize || "64px",
    height: iconSize || "64px"
  }), type === PlaceHolderTypes.WRONG && /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: "sendbird-place-holder__body__icon",
    type: ui_Icon.IconTypes.ERROR,
    fillColor: ui_Icon.IconColors.ON_BACKGROUND_3,
    width: iconSize || "64px",
    height: iconSize || "64px"
  }), type === PlaceHolderTypes.NO_MESSAGES && /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: "sendbird-place-holder__body__icon",
    type: ui_Icon.IconTypes.MESSAGE,
    fillColor: ui_Icon.IconColors.ON_BACKGROUND_3,
    width: iconSize || "64px",
    height: iconSize || "64px"
  }), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-place-holder__body__text",
    type: ui_Label.LabelTypography.BODY_1,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, type === PlaceHolderTypes.NO_CHANNELS && stringSet.PLACE_HOLDER__NO_CHANNEL, type === PlaceHolderTypes.WRONG && stringSet.PLACE_HOLDER__WRONG, type === PlaceHolderTypes.NO_MESSAGES && stringSet.PLACE_HOLDER__NO_MESSAGES), retryToConnect && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-place-holder__body__reconnect",
    role: "button",
    onClick: retryToConnect,
    onKeyPress: retryToConnect,
    tabIndex: 0
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: "sendbird-place-holder__body__reconnect__icon",
    type: ui_Icon.IconTypes.REFRESH,
    fillColor: ui_Icon.IconColors.PRIMARY,
    width: "20px",
    height: "20px"
  }), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-place-holder__body__reconnect__text",
    type: ui_Label.LabelTypography.BUTTON_1,
    color: ui_Label.LabelColors.PRIMARY
  }, stringSet.PLACE_HOLDER__RETRY_TO_CONNECT))), (type === PlaceHolderTypes.NO_RESULTS || type === PlaceHolderTypes.SEARCH_IN || type === PlaceHolderTypes.SEARCHING) && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-place-holder__body--align-top"
  }, type === PlaceHolderTypes.SEARCH_IN && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-place-holder__body--align-top__text"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-place-holder__body--align-top__text__search-in",
    type: ui_Label.LabelTypography.BUTTON_2,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, stringSet.SEARCH_IN), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-place-holder__body--align-top__text__channel-name",
    type: ui_Label.LabelTypography.BUTTON_2,
    color: ui_Label.LabelColors.PRIMARY
  }, "'".concat(searchInString)), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-place-holder__body--align-top__text__quote",
    type: ui_Label.LabelTypography.BUTTON_2,
    color: ui_Label.LabelColors.PRIMARY
  }, '\'')), type === PlaceHolderTypes.SEARCHING && /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-place-hlder__body--align-top__searching",
    type: ui_Label.LabelTypography.BODY_1,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, stringSet.SEARCHING), type === PlaceHolderTypes.NO_RESULTS && /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-place-hlder__body--align-top__no-result",
    type: ui_Label.LabelTypography.BODY_1,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, stringSet.NO_SEARCHED_MESSAGE)));
}

exports.PlaceHolder = PlaceHolder;
exports.PlaceHolderTypes = PlaceHolderTypes;
exports.PlaceHolderTypes$1 = PlaceHolderTypes$1;
//# sourceMappingURL=index-6b9230ae.js.map
