import React__default, { useMemo } from 'react';
import IconButton from '../../ui/IconButton.js';
import Icon, { IconTypes, IconColors } from '../../ui/Icon.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../../index-f60cbf08.js';
import TextButton from '../../ui/TextButton.js';
import { u as useLocalization } from '../../LocalizationContext-e5f35d14.js';
import '../../tslib.es6-75bd0528.js';
import 'prop-types';
import '../../stringSet-42c0e16e.js';
import '../../color-52d916b6.js';
import '../../index-5dcd7e0f.js';

function ThreadHeader(_a) {
  var className = _a.className,
      channelName = _a.channelName,
      renderActionIcon = _a.renderActionIcon,
      onActionIconClick = _a.onActionIconClick,
      onChannelNameClick = _a.onChannelNameClick;
  var stringSet = useLocalization().stringSet;
  var MemoizedActionIcon = useMemo(function () {
    if (typeof renderActionIcon === 'function') {
      return renderActionIcon({
        onActionIconClick: onActionIconClick
      });
    }

    return null;
  }, [renderActionIcon]);
  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-thread-header ".concat(className)
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-thread-header__title",
    type: LabelTypography.H_2,
    color: LabelColors.ONBACKGROUND_1
  }, stringSet.THREAD__HEADER_TITLE), /*#__PURE__*/React__default.createElement(TextButton, {
    onClick: function (e) {
      return onChannelNameClick(e);
    },
    disableUnderline: true
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-thread-header__channel-name",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, channelName)), MemoizedActionIcon || /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-thread-header__action"
  }, /*#__PURE__*/React__default.createElement(IconButton, {
    width: "32px",
    height: "32px",
    onClick: function (e) {
      return onActionIconClick(e);
    }
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.CLOSE,
    fillColor: IconColors.ON_BACKGROUND_1,
    width: "22px",
    height: "22px"
  }))));
}

export { ThreadHeader as default };
//# sourceMappingURL=ThreadHeader.js.map
