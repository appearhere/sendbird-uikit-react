'use strict';

var React = require('react');
var index = require('./index-5977bdd5.js');
var utils_message_getOutgoingMessageState = require('./utils/message/getOutgoingMessageState.js');
var UserProfileContext = require('./UserProfileContext-fd00d1bd.js');
var useSendbirdStateContext = require('./useSendbirdStateContext.js');
var tslib_es6 = require('./tslib.es6-d6068b10.js');
var Thread_context_types = require('./Thread/context/types.js');
var SendbirdChat = require('@sendbird/chat');
var topics = require('./topics-085b5602.js');
var groupChannel = require('@sendbird/chat/groupChannel');
var uuid = require('./uuid-2f4916c1.js');
var message = require('@sendbird/chat/message');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var getNicknamesMapFromMembers = function (members) {
  if (members === void 0) {
    members = [];
  }

  var nicknamesMap = new Map();

  for (var memberIndex = 0; memberIndex < members.length; memberIndex += 1) {
    var _a = members[memberIndex],
        userId = _a.userId,
        nickname = _a.nickname;
    nicknamesMap.set(userId, nickname);
  }

  return nicknamesMap;
};
var isAboutSame = function (a, b, px) {
  return Math.abs(a - b) <= px;
};
var isEmpty = function (val) {
  return val === null || val === undefined;
}; // Some Ids return string and number inconsistently
// only use to comapre IDs

function compareIds(a, b) {
  if (isEmpty(a) || isEmpty(b)) {
    return false;
  }

  var aString = a.toString();
  var bString = b.toString();
  return aString === bString;
}
var getMessageCreatedAt = function (message) {
  return index.format(message.createdAt, 'p');
};
var isReadMessage = function (channel, message) {
  return utils_message_getOutgoingMessageState.getOutgoingMessageState(channel, message) === utils_message_getOutgoingMessageState.OutgoingMessageStates.READ;
};
var isSameGroup = function (message, comparingMessage, currentChannel) {
  var _a, _b, _c, _d;

  if (!(message && comparingMessage && message.messageType && message.messageType !== 'admin' && comparingMessage.messageType && (comparingMessage === null || comparingMessage === void 0 ? void 0 : comparingMessage.messageType) !== 'admin' && (message === null || message === void 0 ? void 0 : message.sender) && (comparingMessage === null || comparingMessage === void 0 ? void 0 : comparingMessage.sender) && (message === null || message === void 0 ? void 0 : message.createdAt) && (comparingMessage === null || comparingMessage === void 0 ? void 0 : comparingMessage.createdAt) && ((_a = message === null || message === void 0 ? void 0 : message.sender) === null || _a === void 0 ? void 0 : _a.userId) && ((_b = comparingMessage === null || comparingMessage === void 0 ? void 0 : comparingMessage.sender) === null || _b === void 0 ? void 0 : _b.userId))) {
    return false;
  }

  return (message === null || message === void 0 ? void 0 : message.sendingStatus) === (comparingMessage === null || comparingMessage === void 0 ? void 0 : comparingMessage.sendingStatus) && ((_c = message === null || message === void 0 ? void 0 : message.sender) === null || _c === void 0 ? void 0 : _c.userId) === ((_d = comparingMessage === null || comparingMessage === void 0 ? void 0 : comparingMessage.sender) === null || _d === void 0 ? void 0 : _d.userId) && getMessageCreatedAt(message) === getMessageCreatedAt(comparingMessage) && isReadMessage(currentChannel, message) === isReadMessage(currentChannel, comparingMessage);
};
var compareMessagesForGrouping = function (prevMessage, currMessage, nextMessage, currentChannel, replyType) {
  if (replyType === 'THREAD' && (currMessage === null || currMessage === void 0 ? void 0 : currMessage.threadInfo)) {
    return [false, false];
  }

  var sendingStatus = (currMessage === null || currMessage === void 0 ? void 0 : currMessage.sendingStatus) || '';
  var isAcceptable = sendingStatus !== 'pending' && sendingStatus !== 'failed';
  return [isSameGroup(prevMessage, currMessage, currentChannel) && isAcceptable, isSameGroup(currMessage, nextMessage, currentChannel) && isAcceptable];
};
var scrollIntoLast = function (intialTry) {
  if (intialTry === void 0) {
    intialTry = 0;
  }

  var MAX_TRIES = 10;
  var currentTry = intialTry;

  if (currentTry > MAX_TRIES) {
    return;
  }

  try {
    var scrollDOM = document.querySelector('.sendbird-thread-ui--scroll'); // eslint-disable-next-line no-multi-assign

    scrollDOM.scrollTop = scrollDOM.scrollHeight;
  } catch (error) {
    setTimeout(function () {
      scrollIntoLast(currentTry + 1);
    }, 500 * currentTry);
  }
};

var PREV_THREADS_FETCH_SIZE = 30;
var NEXT_THREADS_FETCH_SIZE = 30;

var ThreadContextActionTypes;

(function (ThreadContextActionTypes) {
  // initialize
  ThreadContextActionTypes["INIT_USER_ID"] = "INIT_USER_ID"; // channel

  ThreadContextActionTypes["GET_CHANNEL_START"] = "GET_CHANNEL_START";
  ThreadContextActionTypes["GET_CHANNEL_SUCCESS"] = "GET_CHANNEL_SUCCESS";
  ThreadContextActionTypes["GET_CHANNEL_FAILURE"] = "GET_CHANNEL_FAILURE"; // emojis

  ThreadContextActionTypes["SET_EMOJI_CONTAINER"] = "SET_EMOJI_CONTAINER"; // parent message

  ThreadContextActionTypes["GET_PARENT_MESSAGE_START"] = "GET_PARENT_MESSAGE_START";
  ThreadContextActionTypes["GET_PARENT_MESSAGE_SUCCESS"] = "GET_PARENT_MESSAGE_SUCCESS";
  ThreadContextActionTypes["GET_PARENT_MESSAGE_FAILURE"] = "GET_PARENT_MESSAGE_FAILURE"; // fetch threads

  ThreadContextActionTypes["INITIALIZE_THREAD_LIST_START"] = "INITIALIZE_THREAD_LIST_START";
  ThreadContextActionTypes["INITIALIZE_THREAD_LIST_SUCCESS"] = "INITIALIZE_THREAD_LIST_SUCCESS";
  ThreadContextActionTypes["INITIALIZE_THREAD_LIST_FAILURE"] = "INITIALIZE_THREAD_LIST_FAILURE";
  ThreadContextActionTypes["GET_PREV_MESSAGES_START"] = "GET_PREV_MESSAGES_START";
  ThreadContextActionTypes["GET_PREV_MESSAGES_SUCESS"] = "GET_PREV_MESSAGES_SUCESS";
  ThreadContextActionTypes["GET_PREV_MESSAGES_FAILURE"] = "GET_PREV_MESSAGES_FAILURE";
  ThreadContextActionTypes["GET_NEXT_MESSAGES_START"] = "GET_NEXT_MESSAGES_START";
  ThreadContextActionTypes["GET_NEXT_MESSAGES_SUCESS"] = "GET_NEXT_MESSAGES_SUCESS";
  ThreadContextActionTypes["GET_NEXT_MESSAGES_FAILURE"] = "GET_NEXT_MESSAGES_FAILURE"; // handle messages

  ThreadContextActionTypes["SEND_MESSAGE_START"] = "SEND_MESSAGE_START";
  ThreadContextActionTypes["SEND_MESSAGE_SUCESS"] = "SEND_MESSAGE_SUCESS";
  ThreadContextActionTypes["SEND_MESSAGE_FAILURE"] = "SEND_MESSAGE_FAILURE";
  ThreadContextActionTypes["RESEND_MESSAGE_START"] = "RESEND_MESSAGE_START";
  ThreadContextActionTypes["ON_MESSAGE_DELETED_BY_REQ_ID"] = "ON_MESSAGE_DELETED_BY_REQ_ID"; // event handlers - message status change

  ThreadContextActionTypes["ON_MESSAGE_RECEIVED"] = "ON_MESSAGE_RECEIVED";
  ThreadContextActionTypes["ON_MESSAGE_UPDATED"] = "ON_MESSAGE_UPDATED";
  ThreadContextActionTypes["ON_MESSAGE_DELETED"] = "ON_MESSAGE_DELETED";
  ThreadContextActionTypes["ON_REACTION_UPDATED"] = "ON_REACTION_UPDATED"; // event handlers - user status change

  ThreadContextActionTypes["ON_USER_MUTED"] = "ON_USER_MUTED";
  ThreadContextActionTypes["ON_USER_UNMUTED"] = "ON_USER_UNMUTED";
  ThreadContextActionTypes["ON_USER_BANNED"] = "ON_USER_BANNED";
  ThreadContextActionTypes["ON_USER_UNBANNED"] = "ON_USER_UNBANNED";
  ThreadContextActionTypes["ON_USER_LEFT"] = "ON_USER_LEFT"; // event handler - channel status change

  ThreadContextActionTypes["ON_CHANNEL_FROZEN"] = "ON_CHANNEL_FROZEN";
  ThreadContextActionTypes["ON_CHANNEL_UNFROZEN"] = "ON_CHANNEL_UNFROZEN";
  ThreadContextActionTypes["ON_OPERATOR_UPDATED"] = "ON_OPERATOR_UPDATED";
})(ThreadContextActionTypes || (ThreadContextActionTypes = {}));

function reducer(state, action) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;

  switch (action.type) {
    // initialize
    case ThreadContextActionTypes.INIT_USER_ID:
      {
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          currentUserId: action.payload
        });
      }

    case ThreadContextActionTypes.GET_CHANNEL_START:
      {
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          channelState: Thread_context_types.ChannelStateTypes.LOADING,
          currentChannel: null
        });
      }

    case ThreadContextActionTypes.GET_CHANNEL_SUCCESS:
      {
        var groupChannel = action.payload.groupChannel;
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          channelState: Thread_context_types.ChannelStateTypes.INITIALIZED,
          currentChannel: groupChannel,
          // only support in normal group channel
          isMuted: ((_b = (_a = groupChannel === null || groupChannel === void 0 ? void 0 : groupChannel.members) === null || _a === void 0 ? void 0 : _a.find(function (member) {
            return (member === null || member === void 0 ? void 0 : member.userId) === state.currentUserId;
          })) === null || _b === void 0 ? void 0 : _b.isMuted) || false,
          isChannelFrozen: (groupChannel === null || groupChannel === void 0 ? void 0 : groupChannel.isFrozen) || false
        });
      }

    case ThreadContextActionTypes.GET_CHANNEL_FAILURE:
      {
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          channelState: Thread_context_types.ChannelStateTypes.INVALID,
          currentChannel: null
        });
      }

    case ThreadContextActionTypes.SET_EMOJI_CONTAINER:
      {
        var emojiContainer = action.payload.emojiContainer;
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          emojiContainer: emojiContainer
        });
      }

    case ThreadContextActionTypes.GET_PARENT_MESSAGE_START:
      {
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          parentMessageState: Thread_context_types.ParentMessageStateTypes.LOADING,
          parentMessage: null
        });
      }

    case ThreadContextActionTypes.GET_PARENT_MESSAGE_SUCCESS:
      {
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          parentMessageState: Thread_context_types.ParentMessageStateTypes.INITIALIZED,
          parentMessage: action.payload.parentMessage
        });
      }

    case ThreadContextActionTypes.GET_PARENT_MESSAGE_FAILURE:
      {
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          parentMessageState: Thread_context_types.ParentMessageStateTypes.INVALID,
          parentMessage: null
        });
      }
    // fetch threads

    case ThreadContextActionTypes.INITIALIZE_THREAD_LIST_START:
      {
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          threadListState: Thread_context_types.ThreadListStateTypes.LOADING,
          allThreadMessages: []
        });
      }

    case ThreadContextActionTypes.INITIALIZE_THREAD_LIST_SUCCESS:
      {
        var _v = action.payload,
            parentMessage = _v.parentMessage,
            anchorMessage = _v.anchorMessage,
            threadedMessages = _v.threadedMessages;
        var anchorMessageCreatedAt_1 = !(anchorMessage === null || anchorMessage === void 0 ? void 0 : anchorMessage.messageId) ? parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.createdAt : anchorMessage === null || anchorMessage === void 0 ? void 0 : anchorMessage.createdAt;
        var anchorIndex = threadedMessages.findIndex(function (message) {
          return (message === null || message === void 0 ? void 0 : message.createdAt) > anchorMessageCreatedAt_1;
        });
        var prevThreadMessages = anchorIndex > -1 ? threadedMessages.slice(0, anchorIndex) : threadedMessages;
        var anchorThreadMessage = (anchorMessage === null || anchorMessage === void 0 ? void 0 : anchorMessage.messageId) ? [anchorMessage] : [];
        var nextThreadMessages = anchorIndex > -1 ? threadedMessages.slice(anchorIndex) : [];
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          threadListState: Thread_context_types.ThreadListStateTypes.INITIALIZED,
          hasMorePrev: anchorIndex === -1 || anchorIndex === PREV_THREADS_FETCH_SIZE,
          hasMoreNext: threadedMessages.length - anchorIndex === NEXT_THREADS_FETCH_SIZE,
          allThreadMessages: [prevThreadMessages, anchorThreadMessage, nextThreadMessages].flat()
        });
      }

    case ThreadContextActionTypes.INITIALIZE_THREAD_LIST_FAILURE:
      {
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          threadListState: Thread_context_types.ThreadListStateTypes.INVALID,
          allThreadMessages: []
        });
      }

    case ThreadContextActionTypes.GET_NEXT_MESSAGES_START:
      {
        return tslib_es6.__assign({}, state);
      }

    case ThreadContextActionTypes.GET_NEXT_MESSAGES_SUCESS:
      {
        var threadedMessages = action.payload.threadedMessages;
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          hasMoreNext: threadedMessages.length === NEXT_THREADS_FETCH_SIZE,
          allThreadMessages: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], state.allThreadMessages, true), threadedMessages, true)
        });
      }

    case ThreadContextActionTypes.GET_NEXT_MESSAGES_FAILURE:
      {
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          hasMoreNext: false
        });
      }

    case ThreadContextActionTypes.GET_PREV_MESSAGES_START:
      {
        return tslib_es6.__assign({}, state);
      }

    case ThreadContextActionTypes.GET_PREV_MESSAGES_SUCESS:
      {
        var threadedMessages = action.payload.threadedMessages;
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          hasMorePrev: threadedMessages.length === PREV_THREADS_FETCH_SIZE,
          allThreadMessages: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], threadedMessages, true), state.allThreadMessages, true)
        });
      }

    case ThreadContextActionTypes.GET_PREV_MESSAGES_FAILURE:
      {
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          hasMorePrev: false
        });
      }
    // event handlers - message status change

    case ThreadContextActionTypes.ON_MESSAGE_RECEIVED:
      {
        var _w = action.payload,
            channel = _w.channel,
            message_1 = _w.message;

        if (((_c = state.currentChannel) === null || _c === void 0 ? void 0 : _c.url) !== (channel === null || channel === void 0 ? void 0 : channel.url) || state.hasMoreNext || ((_d = message_1 === null || message_1 === void 0 ? void 0 : message_1.parentMessage) === null || _d === void 0 ? void 0 : _d.messageId) !== ((_e = state === null || state === void 0 ? void 0 : state.parentMessage) === null || _e === void 0 ? void 0 : _e.messageId)) {
          return state;
        }

        var isAlreadyReceived = state.allThreadMessages.findIndex(function (m) {
          return m.messageId === message_1.messageId;
        }) > -1;
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          parentMessage: ((_f = state.parentMessage) === null || _f === void 0 ? void 0 : _f.messageId) === (message_1 === null || message_1 === void 0 ? void 0 : message_1.messageId) ? message_1 : state.parentMessage,
          allThreadMessages: isAlreadyReceived ? state.allThreadMessages.map(function (m) {
            return m.messageId === message_1.messageId ? message_1 : m;
          }) : tslib_es6.__spreadArray(tslib_es6.__spreadArray([], state.allThreadMessages.filter(function (m) {
            return (m === null || m === void 0 ? void 0 : m.reqId) !== (message_1 === null || message_1 === void 0 ? void 0 : message_1.reqId);
          }), true), [message_1], false)
        });
      }

    case ThreadContextActionTypes.ON_MESSAGE_UPDATED:
      {
        var _x = action.payload,
            channel = _x.channel,
            message_2 = _x.message;

        if (((_g = state.currentChannel) === null || _g === void 0 ? void 0 : _g.url) !== (channel === null || channel === void 0 ? void 0 : channel.url)) {
          return state;
        }

        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          parentMessage: ((_h = state.parentMessage) === null || _h === void 0 ? void 0 : _h.messageId) === (message_2 === null || message_2 === void 0 ? void 0 : message_2.messageId) ? message_2 : state.parentMessage,
          allThreadMessages: (_j = state.allThreadMessages) === null || _j === void 0 ? void 0 : _j.map(function (msg) {
            return (msg === null || msg === void 0 ? void 0 : msg.messageId) === (message_2 === null || message_2 === void 0 ? void 0 : message_2.messageId) ? message_2 : msg;
          })
        });
      }

    case ThreadContextActionTypes.ON_MESSAGE_DELETED:
      {
        var _y = action.payload,
            channel = _y.channel,
            messageId_1 = _y.messageId;

        if (((_k = state.currentChannel) === null || _k === void 0 ? void 0 : _k.url) !== (channel === null || channel === void 0 ? void 0 : channel.url)) {
          return state;
        }

        if (((_l = state === null || state === void 0 ? void 0 : state.parentMessage) === null || _l === void 0 ? void 0 : _l.messageId) === messageId_1) {
          return tslib_es6.__assign(tslib_es6.__assign({}, state), {
            parentMessage: null,
            parentMessageState: Thread_context_types.ParentMessageStateTypes.NIL,
            allThreadMessages: []
          });
        }

        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          allThreadMessages: (_m = state.allThreadMessages) === null || _m === void 0 ? void 0 : _m.filter(function (msg) {
            return (msg === null || msg === void 0 ? void 0 : msg.messageId) !== messageId_1;
          })
        });
      }

    case ThreadContextActionTypes.ON_MESSAGE_DELETED_BY_REQ_ID:
      {
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          allThreadMessages: state.allThreadMessages.filter(function (m) {
            return !compareIds(m.reqId, action.payload);
          })
        });
      }

    case ThreadContextActionTypes.ON_REACTION_UPDATED:
      {
        var reactionEvent_1 = (_o = action.payload) === null || _o === void 0 ? void 0 : _o.reactionEvent;

        if (((_p = state === null || state === void 0 ? void 0 : state.parentMessage) === null || _p === void 0 ? void 0 : _p.messageId) === (reactionEvent_1 === null || reactionEvent_1 === void 0 ? void 0 : reactionEvent_1.messageId)) {
          (_r = (_q = state.parentMessage) === null || _q === void 0 ? void 0 : _q.applyReactionEvent) === null || _r === void 0 ? void 0 : _r.call(_q, reactionEvent_1);
        }

        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          allThreadMessages: state.allThreadMessages.map(function (m) {
            var _a;

            if ((reactionEvent_1 === null || reactionEvent_1 === void 0 ? void 0 : reactionEvent_1.messageId) === (m === null || m === void 0 ? void 0 : m.messageId)) {
              (_a = m === null || m === void 0 ? void 0 : m.applyReactionEvent) === null || _a === void 0 ? void 0 : _a.call(m, reactionEvent_1);
              return m;
            }

            return m;
          })
        });
      }
    // event handlers - user status change

    case ThreadContextActionTypes.ON_USER_MUTED:
      {
        var _z = action.payload,
            channel = _z.channel,
            user = _z.user;

        if (((_s = state.currentChannel) === null || _s === void 0 ? void 0 : _s.url) !== (channel === null || channel === void 0 ? void 0 : channel.url) || state.currentUserId !== (user === null || user === void 0 ? void 0 : user.userId)) {
          return state;
        }

        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          isMuted: true
        });
      }

    case ThreadContextActionTypes.ON_USER_UNMUTED:
      {
        var _0 = action.payload,
            channel = _0.channel,
            user = _0.user;

        if (((_t = state.currentChannel) === null || _t === void 0 ? void 0 : _t.url) !== (channel === null || channel === void 0 ? void 0 : channel.url) || state.currentUserId !== (user === null || user === void 0 ? void 0 : user.userId)) {
          return state;
        }

        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          isMuted: false
        });
      }

    case ThreadContextActionTypes.ON_USER_BANNED:
      {
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          channelState: Thread_context_types.ChannelStateTypes.NIL,
          threadListState: Thread_context_types.ThreadListStateTypes.NIL,
          parentMessageState: Thread_context_types.ParentMessageStateTypes.NIL,
          currentChannel: null,
          parentMessage: null,
          allThreadMessages: [],
          hasMorePrev: false,
          hasMoreNext: false
        });
      }

    case ThreadContextActionTypes.ON_USER_UNBANNED:
      {
        return tslib_es6.__assign({}, state);
      }

    case ThreadContextActionTypes.ON_USER_LEFT:
      {
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          channelState: Thread_context_types.ChannelStateTypes.NIL,
          threadListState: Thread_context_types.ThreadListStateTypes.NIL,
          parentMessageState: Thread_context_types.ParentMessageStateTypes.NIL,
          currentChannel: null,
          parentMessage: null,
          allThreadMessages: [],
          hasMorePrev: false,
          hasMoreNext: false
        });
      }
    // event handler - channel status change

    case ThreadContextActionTypes.ON_CHANNEL_FROZEN:
      {
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          isChannelFrozen: true
        });
      }

    case ThreadContextActionTypes.ON_CHANNEL_UNFROZEN:
      {
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          isChannelFrozen: false
        });
      }

    case ThreadContextActionTypes.ON_OPERATOR_UPDATED:
      {
        var channel = action.payload.channel;

        if ((channel === null || channel === void 0 ? void 0 : channel.url) === ((_u = state.currentChannel) === null || _u === void 0 ? void 0 : _u.url)) {
          return tslib_es6.__assign(tslib_es6.__assign({}, state), {
            currentChannel: channel
          });
        }

        return state;
      }
    // message

    case ThreadContextActionTypes.SEND_MESSAGE_START:
      {
        var message = action.payload.message;
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          allThreadMessages: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], state.allThreadMessages, true), [message], false)
        });
      }

    case ThreadContextActionTypes.SEND_MESSAGE_SUCESS:
      {
        var message_3 = action.payload.message;
        var filteredThreadMessages = state.allThreadMessages.filter(function (m) {
          return !compareIds(m === null || m === void 0 ? void 0 : m.reqId, message_3 === null || message_3 === void 0 ? void 0 : message_3.reqId);
        });
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          allThreadMessages: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], filteredThreadMessages, true), [message_3], false)
        });
      }

    case ThreadContextActionTypes.SEND_MESSAGE_FAILURE:
      {
        var message_4 = action.payload.message;
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          allThreadMessages: state.allThreadMessages.map(function (m) {
            return compareIds(m === null || m === void 0 ? void 0 : m.reqId, message_4 === null || message_4 === void 0 ? void 0 : message_4.reqId) ? message_4 : m;
          })
        });
      }

    case ThreadContextActionTypes.RESEND_MESSAGE_START:
      {
        return tslib_es6.__assign({}, state);
      }

    default:
      {
        return state;
      }
  }
}

var initialState = {
  currentChannel: null,
  allThreadMessages: [],
  parentMessage: null,
  channelState: Thread_context_types.ChannelStateTypes.NIL,
  parentMessageState: Thread_context_types.ParentMessageStateTypes.NIL,
  threadListState: Thread_context_types.ThreadListStateTypes.NIL,
  hasMorePrev: false,
  hasMoreNext: false,
  emojiContainer: {},
  isMuted: false,
  isChannelFrozen: false,
  currentUserId: ''
};

function useGetChannel(_a, _b) {
  var channelUrl = _a.channelUrl,
      sdkInit = _a.sdkInit,
      message = _a.message;
  var sdk = _b.sdk,
      logger = _b.logger,
      threadDispatcher = _b.threadDispatcher;
  React.useEffect(function () {
    var _a, _b; // validation check


    if (sdkInit && channelUrl && (sdk === null || sdk === void 0 ? void 0 : sdk.groupChannel)) {
      threadDispatcher({
        type: ThreadContextActionTypes.GET_CHANNEL_START,
        payload: null
      });
      (_b = (_a = sdk.groupChannel).getChannel) === null || _b === void 0 ? void 0 : _b.call(_a, channelUrl).then(function (groupChannel) {
        logger.info('Thread | useInitialize: Get channel succeeded', groupChannel);
        threadDispatcher({
          type: ThreadContextActionTypes.GET_CHANNEL_SUCCESS,
          payload: {
            groupChannel: groupChannel
          }
        });
      }).catch(function (error) {
        logger.info('Thread | useInitialize: Get channel failed', error);
        threadDispatcher({
          type: ThreadContextActionTypes.GET_CHANNEL_FAILURE,
          payload: error
        });
      });
    }
  }, [message, sdkInit]);
  /**
   * We don't use channelUrl here,
   * because Thread must operate independently of the channel.
   */
}

function useGetAllEmoji(_a, _b) {
  var sdk = _a.sdk;
  var logger = _b.logger,
      threadDispatcher = _b.threadDispatcher;
  React.useEffect(function () {
    if (sdk === null || sdk === void 0 ? void 0 : sdk.getAllEmoji) {
      // validation check
      sdk === null || sdk === void 0 ? void 0 : sdk.getAllEmoji().then(function (emojiContainer) {
        logger.info('Thread | useGetAllEmoji: Getting emojis succeeded.', emojiContainer);
        threadDispatcher({
          type: ThreadContextActionTypes.SET_EMOJI_CONTAINER,
          payload: {
            emojiContainer: emojiContainer
          }
        });
      }).catch(function (error) {
        logger.info('Thread | useGetAllEmoji: Getting emojis failed.', error);
      });
    }
  }, [sdk]);
}

function useGetThreadList(_a, _b) {
  var sdkInit = _a.sdkInit,
      parentMessage = _a.parentMessage,
      anchorMessage = _a.anchorMessage,
      isReactionEnabled = _a.isReactionEnabled;
  var logger = _b.logger,
      threadDispatcher = _b.threadDispatcher;
  React.useEffect(function () {
    var _a; // validation check


    if (sdkInit && (parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.getThreadedMessagesByTimestamp)) {
      threadDispatcher({
        type: ThreadContextActionTypes.INITIALIZE_THREAD_LIST_START,
        payload: null
      });
      var timeStamp = (anchorMessage === null || anchorMessage === void 0 ? void 0 : anchorMessage.createdAt) || 0;
      var params = {
        prevResultSize: PREV_THREADS_FETCH_SIZE,
        nextResultSize: NEXT_THREADS_FETCH_SIZE,
        includeReactions: isReactionEnabled
      };
      logger.info('Thread | useGetThreadList: Initialize thread list start.', {
        timeStamp: timeStamp,
        params: params
      });
      (_a = parentMessage.getThreadedMessagesByTimestamp) === null || _a === void 0 ? void 0 : _a.call(parentMessage, timeStamp, params).then(function (_a) {
        var parentMessage = _a.parentMessage,
            threadedMessages = _a.threadedMessages;
        logger.info('Thread | useGetThreadList: Initialize thread list succeeded.', {
          parentMessage: parentMessage,
          threadedMessages: threadedMessages
        });
        threadDispatcher({
          type: ThreadContextActionTypes.INITIALIZE_THREAD_LIST_SUCCESS,
          payload: {
            parentMessage: parentMessage,
            anchorMessage: anchorMessage,
            threadedMessages: threadedMessages
          }
        });
      }).catch(function (error) {
        logger.info('Therad | useGetThreadList: Initialize thread list failed.', error);
        threadDispatcher({
          type: ThreadContextActionTypes.INITIALIZE_THREAD_LIST_FAILURE,
          payload: error
        });
      });
    }
  }, [sdkInit, parentMessage, anchorMessage]);
}

function useGetParentMessage(_a, _b) {
  var _this = this;

  var channelUrl = _a.channelUrl,
      parentMessageId = _a.parentMessageId,
      sdkInit = _a.sdkInit,
      parentMessage = _a.parentMessage;
  var sdk = _b.sdk,
      logger = _b.logger,
      threadDispatcher = _b.threadDispatcher;
  React.useEffect(function () {
    var _a; // validation check


    if (sdkInit && ((_a = sdk === null || sdk === void 0 ? void 0 : sdk.message) === null || _a === void 0 ? void 0 : _a.getMessage)) {
      threadDispatcher({
        type: ThreadContextActionTypes.GET_PARENT_MESSAGE_START,
        payload: null
      });
      var params_1 = {
        channelUrl: channelUrl,
        channelType: SendbirdChat.ChannelType.GROUP,
        messageId: parentMessageId,
        includeMetaArray: true,
        includeReactions: true,
        includeThreadInfo: true,
        includePollDetails: true,
        includeParentMessageInfo: true
      };
      logger.info('Thread | useGetParentMessage: Get parent message start.', params_1);

      var fetchParentMessage = function () {
        return tslib_es6.__awaiter(_this, void 0, void 0, function () {
          var data;

          var _a, _b;

          return tslib_es6.__generator(this, function (_c) {
            switch (_c.label) {
              case 0:
                return [4
                /*yield*/
                , (_b = (_a = sdk.message).getMessage) === null || _b === void 0 ? void 0 : _b.call(_a, params_1)];

              case 1:
                data = _c.sent();
                return [2
                /*return*/
                , data];
            }
          });
        });
      };

      fetchParentMessage().then(function (parentMsg) {
        logger.info('Thread | useGetParentMessage: Get parent message succeeded.', parentMessage);
        parentMsg.ogMetaData = parentMessage.ogMetaData; // ogMetaData is not included for now

        threadDispatcher({
          type: ThreadContextActionTypes.GET_PARENT_MESSAGE_SUCCESS,
          payload: {
            parentMessage: parentMsg
          }
        });
      }).catch(function (error) {
        logger.info('Thread | useGetParentMessage: Get parent message failed.', error);
        threadDispatcher({
          type: ThreadContextActionTypes.GET_PARENT_MESSAGE_FAILURE,
          payload: error
        });
      });
    }
  }, [sdkInit, parentMessageId]);
  /**
   * We don't use channelUrl here,
   * because Thread must operate independently of the channel.
   */
}

function useHandlePubsubEvents(_a, _b) {
  var sdkInit = _a.sdkInit,
      currentChannel = _a.currentChannel,
      parentMessage = _a.parentMessage;
  var pubSub = _b.pubSub,
      threadDispatcher = _b.threadDispatcher;
  React.useEffect(function () {
    var pubSubHandler = function () {
      var subscriber = new Map();

      if (!pubSub || !pubSub.subscribe) {
        return subscriber;
      }

      subscriber.set(topics.SEND_USER_MESSAGE, pubSub.subscribe(topics.SEND_USER_MESSAGE, function (props) {
        var channel = props.channel,
            message = props.message;

        if ((currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url) === (channel === null || channel === void 0 ? void 0 : channel.url) && (message === null || message === void 0 ? void 0 : message.parentMessageId) === (parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.messageId)) {
          threadDispatcher({
            type: ThreadContextActionTypes.SEND_MESSAGE_SUCESS,
            payload: {
              message: message
            }
          });
        }

        scrollIntoLast === null || scrollIntoLast === void 0 ? void 0 : scrollIntoLast();
      }));
      subscriber.set(topics.SEND_FILE_MESSAGE, pubSub.subscribe(topics.SEND_FILE_MESSAGE, function (props) {
        var channel = props.channel,
            message = props.message;

        if ((currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url) === (channel === null || channel === void 0 ? void 0 : channel.url)) {
          threadDispatcher({
            type: ThreadContextActionTypes.SEND_MESSAGE_SUCESS,
            payload: {
              message: message
            }
          });
        }

        scrollIntoLast === null || scrollIntoLast === void 0 ? void 0 : scrollIntoLast();
      }));
      subscriber.set(topics.UPDATE_USER_MESSAGE, pubSub.subscribe(topics.UPDATE_USER_MESSAGE, function (msg) {
        var channel = msg.channel,
            message = msg.message;

        if ((currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url) === (channel === null || channel === void 0 ? void 0 : channel.url)) {
          threadDispatcher({
            type: ThreadContextActionTypes.ON_MESSAGE_UPDATED,
            payload: {
              channel: channel,
              message: message
            }
          });
        }
      }));
      subscriber.set(topics.DELETE_MESSAGE, pubSub.subscribe(topics.DELETE_MESSAGE, function (msg) {
        var channel = msg.channel,
            messageId = msg.messageId;

        if ((currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url) === (channel === null || channel === void 0 ? void 0 : channel.url)) {
          threadDispatcher({
            type: ThreadContextActionTypes.ON_MESSAGE_DELETED,
            payload: {
              messageId: messageId
            }
          });
        }
      }));
    };

    var subscriber = pubSubHandler();
    return function () {
      subscriber === null || subscriber === void 0 ? void 0 : subscriber.forEach(function (s) {
        try {
          s === null || s === void 0 ? void 0 : s.remove();
        } catch (_a) {//
        }
      });
    };
  }, [sdkInit, currentChannel]);
}

function useHandleChannelEvents(_a, _b) {
  var sdk = _a.sdk,
      currentChannel = _a.currentChannel;
  var logger = _b.logger,
      threadDispatcher = _b.threadDispatcher;
  React.useEffect(function () {
    var _a, _b, _c;

    var handlerId = uuid.uuidv4(); // validation check

    if (((_a = sdk === null || sdk === void 0 ? void 0 : sdk.groupChannel) === null || _a === void 0 ? void 0 : _a.addGroupChannelHandler) && currentChannel) {
      var channelHandlerParams = {
        // message status change
        onMessageReceived: function (channel, message) {
          logger.info('Thread | useHandleChannelEvents: onMessageReceived', {
            channel: channel,
            message: message
          });
          threadDispatcher({
            type: ThreadContextActionTypes.ON_MESSAGE_RECEIVED,
            payload: {
              channel: channel,
              message: message
            }
          });
        },
        onMessageUpdated: function (channel, message) {
          logger.info('Thread | useHandleChannelEvents: onMessageUpdated', {
            channel: channel,
            message: message
          });
          threadDispatcher({
            type: ThreadContextActionTypes.ON_MESSAGE_UPDATED,
            payload: {
              channel: channel,
              message: message
            }
          });
        },
        onMessageDeleted: function (channel, messageId) {
          logger.info('Thread | useHandleChannelEvents: onMessageDeleted', {
            channel: channel,
            messageId: messageId
          });
          threadDispatcher({
            type: ThreadContextActionTypes.ON_MESSAGE_DELETED,
            payload: {
              channel: channel,
              messageId: messageId
            }
          });
        },
        onReactionUpdated: function (channel, reactionEvent) {
          logger.info('Thread | useHandleChannelEvents: onReactionUpdated', {
            channel: channel,
            reactionEvent: reactionEvent
          });
          threadDispatcher({
            type: ThreadContextActionTypes.ON_REACTION_UPDATED,
            payload: {
              channel: channel,
              reactionEvent: reactionEvent
            }
          });
        },
        // user status change
        onUserMuted: function (channel, user) {
          logger.info('Thread | useHandleChannelEvents: onUserMuted', {
            channel: channel,
            user: user
          });
          threadDispatcher({
            type: ThreadContextActionTypes.ON_USER_MUTED,
            payload: {
              channel: channel,
              user: user
            }
          });
        },
        onUserUnmuted: function (channel, user) {
          logger.info('Thread | useHandleChannelEvents: onUserUnmuted', {
            channel: channel,
            user: user
          });
          threadDispatcher({
            type: ThreadContextActionTypes.ON_USER_UNMUTED,
            payload: {
              channel: channel,
              user: user
            }
          });
        },
        onUserBanned: function (channel, user) {
          logger.info('Thread | useHandleChannelEvents: onUserBanned', {
            channel: channel,
            user: user
          });
          threadDispatcher({
            type: ThreadContextActionTypes.ON_USER_BANNED,
            payload: {
              channel: channel,
              user: user
            }
          });
        },
        onUserUnbanned: function (channel, user) {
          logger.info('Thread | useHandleChannelEvents: onUserUnbanned', {
            channel: channel,
            user: user
          });
          threadDispatcher({
            type: ThreadContextActionTypes.ON_USER_UNBANNED,
            payload: {
              channel: channel,
              user: user
            }
          });
        },
        onUserLeft: function (channel, user) {
          logger.info('Thread | useHandleChannelEvents: onUserLeft', {
            channel: channel,
            user: user
          });
          threadDispatcher({
            type: ThreadContextActionTypes.ON_USER_LEFT,
            payload: {
              channel: channel,
              user: user
            }
          });
        },
        // channel status change
        onChannelFrozen: function (channel) {
          logger.info('Thread | useHandleChannelEvents: onChannelFrozen', {
            channel: channel
          });
          threadDispatcher({
            type: ThreadContextActionTypes.ON_CHANNEL_FROZEN,
            payload: {
              channel: channel
            }
          });
        },
        onChannelUnfrozen: function (channel) {
          logger.info('Thread | useHandleChannelEvents: onChannelUnfrozen', {
            channel: channel
          });
          threadDispatcher({
            type: ThreadContextActionTypes.ON_CHANNEL_UNFROZEN,
            payload: {
              channel: channel
            }
          });
        },
        onOperatorUpdated: function (channel, users) {
          logger.info('Thread | useHandleChannelEvents: onOperatorUpdated', {
            channel: channel,
            users: users
          });
          threadDispatcher({
            type: ThreadContextActionTypes.ON_OPERATOR_UPDATED,
            payload: {
              channel: channel,
              users: users
            }
          });
        }
      };
      var channelHandler = new groupChannel.GroupChannelHandler(channelHandlerParams);
      (_c = (_b = sdk.groupChannel).addGroupChannelHandler) === null || _c === void 0 ? void 0 : _c.call(_b, handlerId, channelHandler);
      logger.info('Thread | useHandleChannelEvents: Added channelHandler in Thread', {
        handlerId: handlerId,
        channelHandler: channelHandler
      });
    }

    return function () {
      var _a, _b, _c; // validation check


      if (handlerId && ((_a = sdk === null || sdk === void 0 ? void 0 : sdk.groupChannel) === null || _a === void 0 ? void 0 : _a.removeGroupChannelHandler)) {
        (_c = (_b = sdk.groupChannel).removeGroupChannelHandler) === null || _c === void 0 ? void 0 : _c.call(_b, handlerId);
        logger.info('Thread | useHandleChannelEvents: Removed channelHandler in Thread.', handlerId);
      }
    };
  }, [sdk === null || sdk === void 0 ? void 0 : sdk.groupChannel, currentChannel]);
}

function useSendFileMessageCallback(_a, _b) {
  var currentChannel = _a.currentChannel;
  var logger = _b.logger,
      pubSub = _b.pubSub,
      threadDispatcher = _b.threadDispatcher;
  var sendMessage = React.useCallback(function (file, quoteMessage) {
    var createParamsDefault = function () {
      var params = {};
      params.file = file;

      if (quoteMessage) {
        params.isReplyToChannel = true;
        params.parentMessageId = quoteMessage.messageId;
      }

      return params;
    };

    var params = createParamsDefault();
    logger.info('Thread | useSendFileMessageCallback: Sending file message start.', params);
    currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.sendFileMessage(params).onPending(function (pendingMessage) {
      threadDispatcher({
        type: ThreadContextActionTypes.SEND_MESSAGE_START,
        payload: {
          /* pubSub is used instead of messagesDispatcher
          to avoid redundantly calling `messageActionTypes.SEND_MESSAGEGE_START` */
          message: tslib_es6.__assign(tslib_es6.__assign({}, pendingMessage), {
            url: URL.createObjectURL(file),
            // pending thumbnail message seems to be failed
            requestState: 'pending'
          })
        }
      });
      setTimeout(function () {
        return scrollIntoLast();
      }, 1000);
    }).onFailed(function (error, message) {
      message.localUrl = URL.createObjectURL(file);
      message.file = file;
      logger.info('Thread | useSendFileMessageCallback: Sending file message failed.', {
        message: message,
        error: error
      });
      threadDispatcher({
        type: ThreadContextActionTypes.SEND_MESSAGE_FAILURE,
        payload: {
          message: message,
          error: error
        }
      });
    }).onSucceeded(function (message) {
      logger.info('Thread | useSendFileMessageCallback: Sending file message succeeded.', message);
      pubSub.publish(topics.SEND_FILE_MESSAGE, {
        channel: currentChannel,
        message: message
      });
    });
  }, [currentChannel]);
  return sendMessage;
}

function useUpdateMessageCallback(_a, _b) {
  var currentChannel = _a.currentChannel,
      isMentionEnabled = _a.isMentionEnabled;
  var logger = _b.logger,
      pubSub = _b.pubSub,
      threadDispatcher = _b.threadDispatcher;
  return React.useCallback(function (props) {
    var _a;

    var messageId = props.messageId,
        message = props.message,
        mentionedUsers = props.mentionedUsers,
        mentionTemplate = props.mentionTemplate;

    var createParamsDefault = function () {
      var params = {};
      params.message = message;

      if (isMentionEnabled && (mentionedUsers === null || mentionedUsers === void 0 ? void 0 : mentionedUsers.length) > 0) {
        params.mentionedUsers = mentionedUsers;
      }

      if (isMentionEnabled && mentionTemplate) {
        params.mentionedMessageTemplate = mentionTemplate;
      } else {
        params.mentionedMessageTemplate = message;
      }

      return params;
    };

    var params = createParamsDefault();
    logger.info('Thread | useUpdateMessageCallback: Message update start.', params);
    (_a = currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.updateUserMessage) === null || _a === void 0 ? void 0 : _a.call(currentChannel, messageId, params).then(function (message) {
      logger.info('Thread | useUpdateMessageCallback: Message update succeeded.', message);
      threadDispatcher({
        type: ThreadContextActionTypes.ON_MESSAGE_UPDATED,
        payload: {
          channel: currentChannel,
          message: message
        }
      });
      pubSub.publish(topics.UPDATE_USER_MESSAGE, {
        fromSelector: true,
        channel: currentChannel,
        message: message
      });
    });
  }, [currentChannel, isMentionEnabled]);
}

function useDeleteMessageCallback(_a, _b) {
  var currentChannel = _a.currentChannel,
      threadDispatcher = _a.threadDispatcher;
  var logger = _b.logger;
  return React.useCallback(function (message) {
    logger.info('Thread | useDeleteMessageCallback: Deleting message.', message);
    var sendingStatus = message.sendingStatus;
    return new Promise(function (resolve, reject) {
      var _a;

      logger.info('Thread | useDeleteMessageCallback: Deleting message requestState:', sendingStatus); // Message is only on local

      if (sendingStatus === 'failed' || sendingStatus === 'pending') {
        logger.info('Thread | useDeleteMessageCallback: Deleted message from local:', message);
        threadDispatcher({
          type: ThreadContextActionTypes.ON_MESSAGE_DELETED_BY_REQ_ID,
          payload: message.reqId
        });
        resolve(message);
      }

      logger.info('Thread | useDeleteMessageCallback: Deleting message from remote:', sendingStatus);
      (_a = currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.deleteMessage) === null || _a === void 0 ? void 0 : _a.call(currentChannel, message).then(function () {
        logger.info('Thread | useDeleteMessageCallback: Deleting message success!', message);
        threadDispatcher({
          type: ThreadContextActionTypes.ON_MESSAGE_DELETED,
          payload: {
            message: message,
            channel: currentChannel
          }
        });
        resolve(message);
      }).catch(function (err) {
        logger.warning('Thread | useDeleteMessageCallback: Deleting message failed!', err);
        reject(err);
      });
    });
  }, [currentChannel]);
}

function useGetPrevThreadsCallback(_a, _b) {
  var hasMorePrev = _a.hasMorePrev,
      parentMessage = _a.parentMessage,
      threadListState = _a.threadListState,
      oldestMessageTimeStamp = _a.oldestMessageTimeStamp,
      isReactionEnabled = _a.isReactionEnabled;
  var logger = _b.logger,
      threadDispatcher = _b.threadDispatcher;
  return React.useCallback(function (callback) {
    var _a; // validation check


    if (threadListState === Thread_context_types.ThreadListStateTypes.INITIALIZED && (parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.getThreadedMessagesByTimestamp) && oldestMessageTimeStamp !== 0) {
      threadDispatcher({
        type: ThreadContextActionTypes.GET_PREV_MESSAGES_START,
        payload: null
      });
      (_a = parentMessage.getThreadedMessagesByTimestamp) === null || _a === void 0 ? void 0 : _a.call(parentMessage, oldestMessageTimeStamp, {
        prevResultSize: PREV_THREADS_FETCH_SIZE,
        nextResultSize: 0,
        includeReactions: isReactionEnabled
      }).then(function (_a) {
        var parentMessage = _a.parentMessage,
            threadedMessages = _a.threadedMessages;
        logger.info('Thread | useGetPrevThreadsCallback: Fetch prev threads succeeded.', {
          parentMessage: parentMessage,
          threadedMessages: threadedMessages
        });
        threadDispatcher({
          type: ThreadContextActionTypes.GET_PREV_MESSAGES_SUCESS,
          payload: {
            parentMessage: parentMessage,
            threadedMessages: threadedMessages
          }
        });
        callback(threadedMessages);
      }).catch(function (error) {
        logger.info('Thread | useGetPrevThreadsCallback: Fetch prev threads failed.', error);
        threadDispatcher({
          type: ThreadContextActionTypes.GET_PREV_MESSAGES_FAILURE,
          payload: error
        });
      });
    }
  }, [hasMorePrev, parentMessage, threadListState, oldestMessageTimeStamp]);
}

function useGetNextThreadsCallback(_a, _b) {
  var hasMoreNext = _a.hasMoreNext,
      parentMessage = _a.parentMessage,
      threadListState = _a.threadListState,
      latestMessageTimeStamp = _a.latestMessageTimeStamp,
      isReactionEnabled = _a.isReactionEnabled;
  var logger = _b.logger,
      threadDispatcher = _b.threadDispatcher;
  return React.useCallback(function (callback) {
    var _a; // validation check


    if (threadListState === Thread_context_types.ThreadListStateTypes.INITIALIZED && (parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.getThreadedMessagesByTimestamp) && latestMessageTimeStamp !== 0) {
      threadDispatcher({
        type: ThreadContextActionTypes.GET_NEXT_MESSAGES_START,
        payload: null
      });
      (_a = parentMessage.getThreadedMessagesByTimestamp) === null || _a === void 0 ? void 0 : _a.call(parentMessage, latestMessageTimeStamp, {
        prevResultSize: 0,
        nextResultSize: NEXT_THREADS_FETCH_SIZE,
        includeReactions: isReactionEnabled
      }).then(function (_a) {
        var parentMessage = _a.parentMessage,
            threadedMessages = _a.threadedMessages;
        logger.info('Thread | useGetNextThreadsCallback: Fetch next threads succeeded.', {
          parentMessage: parentMessage,
          threadedMessages: threadedMessages
        });
        threadDispatcher({
          type: ThreadContextActionTypes.GET_NEXT_MESSAGES_SUCESS,
          payload: {
            parentMessage: parentMessage,
            threadedMessages: threadedMessages
          }
        });
        callback(threadedMessages);
      }).catch(function (error) {
        logger.info('Thread | useGetNextThreadsCallback: Fetch next threads failed.', error);
        threadDispatcher({
          type: ThreadContextActionTypes.GET_NEXT_MESSAGES_FAILURE,
          payload: error
        });
      });
    }
  }, [hasMoreNext, parentMessage, threadListState, latestMessageTimeStamp]);
}

function useToggleReactionCallback(_a, _b) {
  var currentChannel = _a.currentChannel;
  var logger = _b.logger;
  return React.useCallback(function (message, key, isReacted) {
    var _a, _b;

    if (isReacted) {
      (_a = currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.deleteReaction) === null || _a === void 0 ? void 0 : _a.call(currentChannel, message, key).then(function (res) {
        logger.info('Thread | useToggleReactionsCallback: Delete reaction succeeded.', res);
      }).catch(function (err) {
        logger.warning('Thread | useToggleReactionsCallback: Delete reaction failed.', err);
      });
      return;
    }

    (_b = currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.addReaction) === null || _b === void 0 ? void 0 : _b.call(currentChannel, message, key).then(function (res) {
      logger.info('Thread | useToggleReactionsCallback: Add reaction succeeded.', res);
    }).catch(function (err) {
      logger.warning('Thread | useToggleReactionsCallback: Add reaction failed.', err);
    });
  }, [currentChannel]);
}

function useSendUserMessageCallback(_a, _b) {
  var isMentionEnabled = _a.isMentionEnabled,
      currentChannel = _a.currentChannel;
  var logger = _b.logger,
      pubSub = _b.pubSub,
      threadDispatcher = _b.threadDispatcher;
  var sendMessage = React.useCallback(function (props) {
    var message = props.message,
        _a = props.quoteMessage,
        quoteMessage = _a === void 0 ? null : _a,
        mentionTemplate = props.mentionTemplate,
        mentionedUsers = props.mentionedUsers;

    var createDefaultParams = function () {
      var params = {};
      params.message = (message === null || message === void 0 ? void 0 : message.trim()) || message;

      if (isMentionEnabled && (mentionedUsers === null || mentionedUsers === void 0 ? void 0 : mentionedUsers.length) > 0) {
        params.mentionedUsers = mentionedUsers;
      }

      if (isMentionEnabled && mentionTemplate && (mentionedUsers === null || mentionedUsers === void 0 ? void 0 : mentionedUsers.length) > 0) {
        params.mentionedMessageTemplate = (mentionTemplate === null || mentionTemplate === void 0 ? void 0 : mentionTemplate.trim()) || mentionTemplate;
      }

      if (quoteMessage) {
        params.isReplyToChannel = true;
        params.parentMessageId = quoteMessage.messageId;
      }

      return params;
    };

    var params = createDefaultParams();
    logger.info('Thread | useSendUserMessageCallback: Sending user message start.', params);

    if (currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.sendUserMessage) {
      currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.sendUserMessage(params).onPending(function (pendingMessage) {
        threadDispatcher({
          type: ThreadContextActionTypes.SEND_MESSAGE_START,
          payload: {
            message: pendingMessage
          }
        });
      }).onFailed(function (error, message) {
        logger.info('Thread | useSendUserMessageCallback: Sending user message failed.', {
          message: message,
          error: error
        });
        threadDispatcher({
          type: ThreadContextActionTypes.SEND_MESSAGE_FAILURE,
          payload: {
            error: error,
            message: message
          }
        });
      }).onSucceeded(function (message) {
        logger.info('Thread | useSendUserMessageCallback: Sending user message succeeded.', message);
        threadDispatcher({
          type: ThreadContextActionTypes.SEND_MESSAGE_SUCESS,
          payload: {
            message: message
          }
        }); // because Thread doesn't subscribe SEND_USER_MESSAGE

        pubSub.publish(topics.SEND_USER_MESSAGE, {
          channel: currentChannel,
          message: message
        });
      });
    }
  }, [isMentionEnabled, currentChannel]);
  return sendMessage;
}

function useResendMessageCallback(_a, _b) {
  var currentChannel = _a.currentChannel;
  var logger = _b.logger,
      pubSub = _b.pubSub,
      threadDispatcher = _b.threadDispatcher;
  return React.useCallback(function (failedMessage) {
    var _a, _b, _c;

    if (failedMessage === null || failedMessage === void 0 ? void 0 : failedMessage.isResendable) {
      failedMessage.sendingStatus = message.SendingStatus.PENDING;
      logger.info('Thread | useResendMessageCallback: Resending failedMessage start.', failedMessage);
      threadDispatcher({
        type: ThreadContextActionTypes.RESEND_MESSAGE_START,
        payload: failedMessage
      });

      if (((_a = failedMessage === null || failedMessage === void 0 ? void 0 : failedMessage.isUserMessage) === null || _a === void 0 ? void 0 : _a.call(failedMessage)) || (failedMessage === null || failedMessage === void 0 ? void 0 : failedMessage.messageType) === message.MessageType.USER) {
        currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.resendUserMessage(failedMessage).then(function (message) {
          logger.info('Thread | useResendMessageCallback: Resending failedMessage succeeded.', message);
          threadDispatcher({
            type: ThreadContextActionTypes.SEND_MESSAGE_SUCESS,
            payload: {
              message: message
            }
          });
          pubSub.publish(topics.SEND_USER_MESSAGE, {
            channel: currentChannel,
            message: message
          });
        }).catch(function (error) {
          logger.warning('Thread | useResendMessageCallback: Resending failedMessage failed.', error);
          failedMessage.sendingStatus = message.SendingStatus.FAILED;
          threadDispatcher({
            type: ThreadContextActionTypes.SEND_MESSAGE_FAILURE,
            payload: {
              message: failedMessage
            }
          });
        });
      } else if (((_b = failedMessage === null || failedMessage === void 0 ? void 0 : failedMessage.isFileMessage) === null || _b === void 0 ? void 0 : _b.call(failedMessage)) || (failedMessage === null || failedMessage === void 0 ? void 0 : failedMessage.messageType) === message.MessageType.FILE) {
        (_c = currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.resendFileMessage) === null || _c === void 0 ? void 0 : _c.call(currentChannel, failedMessage).then(function (message) {
          logger.info('Thread | useResendMessageCallback: Resending failedMessage succeeded.', message);
          threadDispatcher({
            type: ThreadContextActionTypes.SEND_MESSAGE_SUCESS,
            payload: {
              message: message
            }
          });
        }).catch(function (error) {
          logger.warning('Thread | useResendMessageCallback: Resending failedMessage failed.', error);
          failedMessage.sendingStatus = message.SendingStatus.FAILED;
          threadDispatcher({
            type: ThreadContextActionTypes.SEND_MESSAGE_FAILURE,
            payload: {
              message: failedMessage
            }
          });
          pubSub.publish(topics.SEND_FILE_MESSAGE, {
            channel: currentChannel,
            message: failedMessage
          });
        });
      } else {
        logger.warning('Thread | useResendMessageCallback: Message is not resendable.', failedMessage);
        failedMessage.sendingStatus = message.SendingStatus.FAILED;
        threadDispatcher({
          type: ThreadContextActionTypes.SEND_MESSAGE_FAILURE,
          payload: {
            message: failedMessage
          }
        });
      }
    }
  }, [currentChannel]);
}

var ThreadContext = /*#__PURE__*/React__default["default"].createContext(null);
var ThreadProvider = function (props) {
  var _a, _b;

  var children = props.children,
      channelUrl = props.channelUrl,
      message = props.message,
      onHeaderActionClick = props.onHeaderActionClick,
      onMoveToParentMessage = props.onMoveToParentMessage,
      // User Profile
  disableUserProfile = props.disableUserProfile,
      renderUserProfile = props.renderUserProfile,
      onUserProfileMessage = props.onUserProfileMessage; // Context from SendbirdProvider

  var globalStore = useSendbirdStateContext();
  var stores = globalStore.stores,
      config = globalStore.config; // // stores

  var sdkStore = stores.sdkStore,
      userStore = stores.userStore;
  var sdk = sdkStore.sdk;
  var user = userStore.user;
  var sdkInit = sdkStore === null || sdkStore === void 0 ? void 0 : sdkStore.initialized; // // config

  var logger = config.logger,
      pubSub = config.pubSub,
      replyType = config.replyType,
      isMentionEnabled = config.isMentionEnabled,
      isReactionEnabled = config.isReactionEnabled; // dux of Thread

  var _c = React.useReducer(reducer, initialState),
      threadStore = _c[0],
      threadDispatcher = _c[1];

  var currentChannel = threadStore.currentChannel,
      allThreadMessages = threadStore.allThreadMessages,
      parentMessage = threadStore.parentMessage,
      channelState = threadStore.channelState,
      threadListState = threadStore.threadListState,
      parentMessageState = threadStore.parentMessageState,
      hasMorePrev = threadStore.hasMorePrev,
      hasMoreNext = threadStore.hasMoreNext,
      emojiContainer = threadStore.emojiContainer,
      isMuted = threadStore.isMuted,
      isChannelFrozen = threadStore.isChannelFrozen,
      currentUserId = threadStore.currentUserId; // Initialization

  React.useEffect(function () {
    threadDispatcher({
      type: ThreadContextActionTypes.INIT_USER_ID,
      payload: user === null || user === void 0 ? void 0 : user.userId
    });
  }, [user]);
  useGetChannel({
    channelUrl: channelUrl,
    sdkInit: sdkInit,
    message: message
  }, {
    sdk: sdk,
    logger: logger,
    threadDispatcher: threadDispatcher
  });
  useGetParentMessage({
    channelUrl: channelUrl,
    sdkInit: sdkInit,
    parentMessageId: message === null || message === void 0 ? void 0 : message.parentMessageId,
    parentMessage: message === null || message === void 0 ? void 0 : message.parentMessage
  }, {
    sdk: sdk,
    logger: logger,
    threadDispatcher: threadDispatcher
  });
  useGetThreadList({
    sdkInit: sdkInit,
    parentMessage: parentMessage,
    isReactionEnabled: isReactionEnabled,
    anchorMessage: (message === null || message === void 0 ? void 0 : message.messageId) ? message : null
  }, {
    logger: logger,
    threadDispatcher: threadDispatcher
  });
  useGetAllEmoji({
    sdk: sdk
  }, {
    logger: logger,
    threadDispatcher: threadDispatcher
  }); // Handle channel events

  useHandleChannelEvents({
    sdk: sdk,
    currentChannel: currentChannel
  }, {
    logger: logger,
    threadDispatcher: threadDispatcher
  });
  useHandlePubsubEvents({
    sdkInit: sdkInit,
    currentChannel: currentChannel,
    parentMessage: parentMessage
  }, {
    logger: logger,
    pubSub: pubSub,
    threadDispatcher: threadDispatcher
  }); // callbacks

  var fetchPrevThreads = useGetPrevThreadsCallback({
    hasMorePrev: hasMorePrev,
    parentMessage: parentMessage,
    threadListState: threadListState,
    isReactionEnabled: isReactionEnabled,
    oldestMessageTimeStamp: ((_a = allThreadMessages[0]) === null || _a === void 0 ? void 0 : _a.createdAt) || 0
  }, {
    logger: logger,
    threadDispatcher: threadDispatcher
  });
  var fetchNextThreads = useGetNextThreadsCallback({
    hasMoreNext: hasMoreNext,
    parentMessage: parentMessage,
    threadListState: threadListState,
    isReactionEnabled: isReactionEnabled,
    latestMessageTimeStamp: ((_b = allThreadMessages[allThreadMessages.length - 1]) === null || _b === void 0 ? void 0 : _b.createdAt) || 0
  }, {
    logger: logger,
    threadDispatcher: threadDispatcher
  });
  var toggleReaction = useToggleReactionCallback({
    currentChannel: currentChannel
  }, {
    logger: logger
  });
  var sendMessage = useSendUserMessageCallback({
    isMentionEnabled: isMentionEnabled,
    currentChannel: currentChannel
  }, {
    logger: logger,
    pubSub: pubSub,
    threadDispatcher: threadDispatcher
  });
  var sendFileMessage = useSendFileMessageCallback({
    currentChannel: currentChannel
  }, {
    logger: logger,
    pubSub: pubSub,
    threadDispatcher: threadDispatcher
  });
  var resendMessage = useResendMessageCallback({
    currentChannel: currentChannel
  }, {
    logger: logger,
    pubSub: pubSub,
    threadDispatcher: threadDispatcher
  });
  var updateMessage = useUpdateMessageCallback({
    currentChannel: currentChannel,
    isMentionEnabled: isMentionEnabled
  }, {
    logger: logger,
    pubSub: pubSub,
    threadDispatcher: threadDispatcher
  });
  var deleteMessage = useDeleteMessageCallback({
    currentChannel: currentChannel,
    threadDispatcher: threadDispatcher
  }, {
    logger: logger
  }); // memo

  var nicknamesMap = React.useMemo(function () {
    return replyType && currentChannel ? getNicknamesMapFromMembers(currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.members) : new Map();
  }, [currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.members]);
  return /*#__PURE__*/React__default["default"].createElement(ThreadContext.Provider, {
    value: {
      // ThreadProviderProps
      channelUrl: channelUrl,
      message: message,
      onHeaderActionClick: onHeaderActionClick,
      onMoveToParentMessage: onMoveToParentMessage,
      // ThreadContextInitialState
      currentChannel: currentChannel,
      allThreadMessages: allThreadMessages,
      parentMessage: parentMessage,
      channelState: channelState,
      threadListState: threadListState,
      parentMessageState: parentMessageState,
      hasMorePrev: hasMorePrev,
      hasMoreNext: hasMoreNext,
      emojiContainer: emojiContainer,
      // hooks
      fetchPrevThreads: fetchPrevThreads,
      fetchNextThreads: fetchNextThreads,
      toggleReaction: toggleReaction,
      sendMessage: sendMessage,
      sendFileMessage: sendFileMessage,
      resendMessage: resendMessage,
      updateMessage: updateMessage,
      deleteMessage: deleteMessage,
      // context
      nicknamesMap: nicknamesMap,
      isMuted: isMuted,
      isChannelFrozen: isChannelFrozen,
      currentUserId: currentUserId
    }
  }, /*#__PURE__*/React__default["default"].createElement(UserProfileContext.UserProfileProvider, {
    disableUserProfile: disableUserProfile,
    renderUserProfile: renderUserProfile,
    onUserProfileMessage: onUserProfileMessage
  }, children));
};
var useThreadContext = function () {
  return React__default["default"].useContext(ThreadContext);
};

exports.ThreadProvider = ThreadProvider;
exports.compareMessagesForGrouping = compareMessagesForGrouping;
exports.isAboutSame = isAboutSame;
exports.useThreadContext = useThreadContext;
//# sourceMappingURL=ThreadProvider-5c14e997.js.map
