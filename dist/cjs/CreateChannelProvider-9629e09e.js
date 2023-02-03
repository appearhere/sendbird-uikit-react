'use strict';

var React = require('react');
var sendbirdSelectors = require('./sendbirdSelectors.js');
var useSendbirdStateContext = require('./useSendbirdStateContext.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

exports.CHANNEL_TYPE = void 0;

(function (CHANNEL_TYPE) {
  CHANNEL_TYPE["GROUP"] = "group";
  CHANNEL_TYPE["SUPERGROUP"] = "supergroup";
  CHANNEL_TYPE["BROADCAST"] = "broadcast";
})(exports.CHANNEL_TYPE || (exports.CHANNEL_TYPE = {}));

var CreateChannelContext = /*#__PURE__*/React__default["default"].createContext(undefined);

var CreateChannelProvider = function (props) {
  var _a;

  var children = props.children,
      onCreateChannel = props.onCreateChannel,
      onBeforeCreateChannel = props.onBeforeCreateChannel,
      overrideInviteUser = props.overrideInviteUser,
      userListQuery = props.userListQuery;
  var store = useSendbirdStateContext();
  var userListQuery_ = (_a = store === null || store === void 0 ? void 0 : store.config) === null || _a === void 0 ? void 0 : _a.userListQuery;
  var createChannel = sendbirdSelectors.getCreateGroupChannel(store);

  var _b = React.useState(0),
      step = _b[0],
      setStep = _b[1];

  var _c = React.useState(exports.CHANNEL_TYPE.GROUP),
      type = _c[0],
      setType = _c[1];

  return /*#__PURE__*/React__default["default"].createElement(CreateChannelContext.Provider, {
    value: {
      onBeforeCreateChannel: onBeforeCreateChannel,
      createChannel: createChannel,
      onCreateChannel: onCreateChannel,
      overrideInviteUser: overrideInviteUser,
      userListQuery: userListQuery || userListQuery_,
      step: step,
      setStep: setStep,
      type: type,
      setType: setType
    }
  }, children);
};

var useCreateChannelContext = function () {
  return React__default["default"].useContext(CreateChannelContext);
};

exports.CreateChannelProvider = CreateChannelProvider;
exports.useCreateChannelContext = useCreateChannelContext;
//# sourceMappingURL=CreateChannelProvider-9629e09e.js.map
