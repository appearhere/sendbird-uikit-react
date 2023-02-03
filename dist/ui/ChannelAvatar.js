import React__default, { useMemo } from 'react';
import Avatar from './Avatar.js';
import Icon, { IconTypes, IconColors } from './Icon.js';
import { g as generateDefaultAvatar, a as getChannelAvatarSource } from '../utils-13fa0336.js';
import '../tslib.es6-75bd0528.js';
import './ImageRenderer.js';
import '../uuid-392016d0.js';
import 'prop-types';

function ChannelAvatar(_a) {
  var channel = _a.channel,
      userId = _a.userId,
      theme = _a.theme,
      _b = _a.width,
      width = _b === void 0 ? 56 : _b,
      _c = _a.height,
      height = _c === void 0 ? 56 : _c;
  var isBroadcast = channel === null || channel === void 0 ? void 0 : channel.isBroadcast;
  var memoizedAvatar = useMemo(function () {
    return isBroadcast ? generateDefaultAvatar(channel) ? /*#__PURE__*/React__default.createElement("div", {
      className: "sendbird-chat-header--default-avatar",
      style: {
        width: width,
        height: height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React__default.createElement(Icon, {
      type: IconTypes.BROADCAST,
      fillColor: IconColors.CONTENT,
      width: width * 0.575,
      height: height * 0.575
    })) : /*#__PURE__*/React__default.createElement(Avatar, {
      className: "sendbird-chat-header--avatar--broadcast-channel",
      src: getChannelAvatarSource(channel, userId),
      width: width,
      height: height,
      alt: channel === null || channel === void 0 ? void 0 : channel.name
    }) : /*#__PURE__*/React__default.createElement(Avatar, {
      className: "sendbird-chat-header--avatar--group-channel",
      src: getChannelAvatarSource(channel, userId),
      width: "".concat(width, "px"),
      height: "".concat(height, "px"),
      alt: channel === null || channel === void 0 ? void 0 : channel.name
    });
  }, [channel === null || channel === void 0 ? void 0 : channel.members, channel === null || channel === void 0 ? void 0 : channel.coverUrl, theme]);
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, memoizedAvatar);
}

export { ChannelAvatar as default };
//# sourceMappingURL=ChannelAvatar.js.map
