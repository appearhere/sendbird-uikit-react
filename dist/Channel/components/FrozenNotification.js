import React__default, { useContext } from 'react';
import { a as LocalizationContext } from '../../LocalizationContext-e5f35d14.js';
import { L as Label, a as LabelTypography } from '../../index-f60cbf08.js';
import '../../stringSet-42c0e16e.js';
import '../../index-5dcd7e0f.js';
import 'prop-types';

var FrozenNotification = function () {
  var stringSet = useContext(LocalizationContext).stringSet;
  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-notification sendbird-notification--frozen"
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-notification__text",
    type: LabelTypography.CAPTION_2
  }, stringSet.CHANNEL_FROZEN));
};

export { FrozenNotification as default };
//# sourceMappingURL=FrozenNotification.js.map
