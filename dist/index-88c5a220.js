import { a as __spreadArray } from './tslib.es6-75bd0528.js';
import React__default, { useContext } from 'react';
import { a as LocalizationContext } from './LocalizationContext-e5f35d14.js';
import Icon, { IconTypes, IconColors } from './ui/Icon.js';
import { L as Label, a as LabelTypography, b as LabelColors } from './index-f60cbf08.js';
import Loader from './ui/Loader.js';

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
  var stringSet = useContext(LocalizationContext).stringSet;
  return /*#__PURE__*/React__default.createElement("div", {
    className: __spreadArray(__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-place-holder'], false).join(' ')
  }, type === PlaceHolderTypes.LOADING && /*#__PURE__*/React__default.createElement(Loader, {
    width: iconSize || "48px",
    height: iconSize || "48px"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.SPINNER,
    fillColor: IconColors.PRIMARY,
    width: iconSize || "48px",
    height: iconSize || "48px"
  })), (type === PlaceHolderTypes.NO_CHANNELS || type === PlaceHolderTypes.NO_MESSAGES || type === PlaceHolderTypes.WRONG) && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-place-holder__body"
  }, type === PlaceHolderTypes.NO_CHANNELS && /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-place-holder__body__icon",
    type: IconTypes.CHAT,
    fillColor: IconColors.ON_BACKGROUND_3,
    width: iconSize || "64px",
    height: iconSize || "64px"
  }), type === PlaceHolderTypes.WRONG && /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-place-holder__body__icon",
    type: IconTypes.ERROR,
    fillColor: IconColors.ON_BACKGROUND_3,
    width: iconSize || "64px",
    height: iconSize || "64px"
  }), type === PlaceHolderTypes.NO_MESSAGES && /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-place-holder__body__icon",
    type: IconTypes.MESSAGE,
    fillColor: IconColors.ON_BACKGROUND_3,
    width: iconSize || "64px",
    height: iconSize || "64px"
  }), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-place-holder__body__text",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_2
  }, type === PlaceHolderTypes.NO_CHANNELS && stringSet.PLACE_HOLDER__NO_CHANNEL, type === PlaceHolderTypes.WRONG && stringSet.PLACE_HOLDER__WRONG, type === PlaceHolderTypes.NO_MESSAGES && stringSet.PLACE_HOLDER__NO_MESSAGES), retryToConnect && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-place-holder__body__reconnect",
    role: "button",
    onClick: retryToConnect,
    onKeyPress: retryToConnect,
    tabIndex: 0
  }, /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-place-holder__body__reconnect__icon",
    type: IconTypes.REFRESH,
    fillColor: IconColors.PRIMARY,
    width: "20px",
    height: "20px"
  }), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-place-holder__body__reconnect__text",
    type: LabelTypography.BUTTON_1,
    color: LabelColors.PRIMARY
  }, stringSet.PLACE_HOLDER__RETRY_TO_CONNECT))), (type === PlaceHolderTypes.NO_RESULTS || type === PlaceHolderTypes.SEARCH_IN || type === PlaceHolderTypes.SEARCHING) && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-place-holder__body--align-top"
  }, type === PlaceHolderTypes.SEARCH_IN && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-place-holder__body--align-top__text"
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-place-holder__body--align-top__text__search-in",
    type: LabelTypography.BUTTON_2,
    color: LabelColors.ONBACKGROUND_2
  }, stringSet.SEARCH_IN), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-place-holder__body--align-top__text__channel-name",
    type: LabelTypography.BUTTON_2,
    color: LabelColors.PRIMARY
  }, "'".concat(searchInString)), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-place-holder__body--align-top__text__quote",
    type: LabelTypography.BUTTON_2,
    color: LabelColors.PRIMARY
  }, '\'')), type === PlaceHolderTypes.SEARCHING && /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-place-hlder__body--align-top__searching",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_2
  }, stringSet.SEARCHING), type === PlaceHolderTypes.NO_RESULTS && /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-place-hlder__body--align-top__no-result",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_2
  }, stringSet.NO_SEARCHED_MESSAGE)));
}

export { PlaceHolder as P, PlaceHolderTypes as a, PlaceHolderTypes$1 as b };
//# sourceMappingURL=index-88c5a220.js.map
