import React__default, { useContext, useState, useEffect } from 'react';
import { GroupChannelHandler } from '@sendbird/chat/groupChannel';
import { a as LocalizationContext } from '../../LocalizationContext-e5f35d14.js';
import { u as uuidv4 } from '../../uuid-392016d0.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../../index-f60cbf08.js';
import { u as useChannelContext } from '../../ChannelProvider-3f08837d.js';
import useSendbirdStateContext from '../../useSendbirdStateContext.js';
import '../../stringSet-42c0e16e.js';
import '../../index-5dcd7e0f.js';
import 'prop-types';
import '../../UserProfileContext-517994e3.js';
import '../../index-229a0736.js';
import '../../topics-0560d548.js';
import '../../index-105a85f4.js';
import '../../tslib.es6-75bd0528.js';
import '../../utils/message/getOutgoingMessageState.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import '../../compareIds-fd8fd31e.js';
import '../../const-03d71a8a.js';
import '@sendbird/chat/message';
import '../../ui/ContextMenu.js';
import 'react-dom';
import '../../ui/SortByRow.js';
import '../../ui/ReactionButton.js';
import '../../ui/ImageRenderer.js';
import '../../ui/Icon.js';
import '../../withSendbird.js';

var TypingIndicatorText = function (_a) {
  var members = _a.members;
  var stringSet = useContext(LocalizationContext).stringSet;

  if (!members || members.length === 0) {
    return '';
  }

  if (members && members.length === 1) {
    return "".concat(members[0].nickname, " ").concat(stringSet.TYPING_INDICATOR__IS_TYPING);
  }

  if (members && members.length === 2) {
    return "".concat(members[0].nickname, " ").concat(stringSet.TYPING_INDICATOR__AND, " ").concat(members[1].nickname, " ").concat(stringSet.TYPING_INDICATOR__ARE_TYPING);
  }

  return stringSet.TYPING_INDICATOR__MULTIPLE_TYPING;
};

var TypingIndicator = function () {
  var _a, _b, _c;

  var channelUrl = useChannelContext().channelUrl;
  var globalStore = useSendbirdStateContext();
  var sb = (_b = (_a = globalStore === null || globalStore === void 0 ? void 0 : globalStore.stores) === null || _a === void 0 ? void 0 : _a.sdkStore) === null || _b === void 0 ? void 0 : _b.sdk;
  var logger = (_c = globalStore === null || globalStore === void 0 ? void 0 : globalStore.config) === null || _c === void 0 ? void 0 : _c.logger;

  var _d = useState(uuidv4()),
      handlerId = _d[0],
      setHandlerId = _d[1];

  var _e = useState([]),
      typingMembers = _e[0],
      setTypingMembers = _e[1];

  useEffect(function () {
    var _a;

    if ((_a = sb === null || sb === void 0 ? void 0 : sb.groupChannel) === null || _a === void 0 ? void 0 : _a.addGroupChannelHandler) {
      sb.groupChannel.removeGroupChannelHandler(handlerId);
      var newHandlerId = uuidv4();
      var handler = new GroupChannelHandler({
        onTypingStatusUpdated: function (groupChannel) {
          // there is a possible warning in here - setState called after unmount
          logger.info('Channel > Typing Indicator: onTypingStatusUpdated', groupChannel);

          if (groupChannel.url === channelUrl) {
            var members = groupChannel.getTypingUsers();
            setTypingMembers(members);
          }
        }
      });
      sb.groupChannel.addGroupChannelHandler(newHandlerId, handler);
      setHandlerId(newHandlerId);
    }

    return function () {
      var _a;

      setTypingMembers([]);

      if ((_a = sb === null || sb === void 0 ? void 0 : sb.groupChannel) === null || _a === void 0 ? void 0 : _a.removeGroupChannelHandler) {
        sb.groupChannel.removeGroupChannelHandler(handlerId);
      }
    };
  }, [channelUrl]);
  return /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-conversation__footer__typing-indicator__text",
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, /*#__PURE__*/React__default.createElement(TypingIndicatorText, {
    members: typingMembers
  }));
};

export { TypingIndicatorText, TypingIndicator as default };
//# sourceMappingURL=TypingIndicator.js.map
