'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var groupChannel = require('@sendbird/chat/groupChannel');
var LocalizationContext = require('../../LocalizationContext-f4281153.js');
var uuid = require('../../uuid-2f4916c1.js');
var ui_Label = require('../../index-4197d014.js');
var Channel_context = require('../../ChannelProvider-4d043480.js');
var useSendbirdStateContext = require('../../useSendbirdStateContext.js');
require('../../stringSet-2dfd148b.js');
require('../../index-d4bc012c.js');
require('prop-types');
require('../../UserProfileContext-fd00d1bd.js');
require('../../index-5977bdd5.js');
require('../../topics-085b5602.js');
require('../../index-d05a5cae.js');
require('../../tslib.es6-d6068b10.js');
require('../../utils/message/getOutgoingMessageState.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('../../compareIds-5d186d0d.js');
require('../../const-43cebab9.js');
require('@sendbird/chat/message');
require('../../ui/ContextMenu.js');
require('react-dom');
require('../../ui/SortByRow.js');
require('../../ui/ReactionButton.js');
require('../../ui/ImageRenderer.js');
require('../../ui/Icon.js');
require('../../withSendbird.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var TypingIndicatorText = function (_a) {
  var members = _a.members;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;

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

  var channelUrl = Channel_context.useChannelContext().channelUrl;
  var globalStore = useSendbirdStateContext();
  var sb = (_b = (_a = globalStore === null || globalStore === void 0 ? void 0 : globalStore.stores) === null || _a === void 0 ? void 0 : _a.sdkStore) === null || _b === void 0 ? void 0 : _b.sdk;
  var logger = (_c = globalStore === null || globalStore === void 0 ? void 0 : globalStore.config) === null || _c === void 0 ? void 0 : _c.logger;

  var _d = React.useState(uuid.uuidv4()),
      handlerId = _d[0],
      setHandlerId = _d[1];

  var _e = React.useState([]),
      typingMembers = _e[0],
      setTypingMembers = _e[1];

  React.useEffect(function () {
    var _a;

    if ((_a = sb === null || sb === void 0 ? void 0 : sb.groupChannel) === null || _a === void 0 ? void 0 : _a.addGroupChannelHandler) {
      sb.groupChannel.removeGroupChannelHandler(handlerId);
      var newHandlerId = uuid.uuidv4();
      var handler = new groupChannel.GroupChannelHandler({
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
  return /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-conversation__footer__typing-indicator__text",
    type: ui_Label.LabelTypography.CAPTION_2,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, /*#__PURE__*/React__default["default"].createElement(TypingIndicatorText, {
    members: typingMembers
  }));
};

exports.TypingIndicatorText = TypingIndicatorText;
exports["default"] = TypingIndicator;
//# sourceMappingURL=TypingIndicator.js.map
