'use strict';

var React = require('react');
var index = require('./index-5977bdd5.js');
var UserProfileContext = require('./UserProfileContext-fd00d1bd.js');
var tslib_es6 = require('./tslib.es6-d6068b10.js');
var compareIds = require('./compareIds-5d186d0d.js');
var topics = require('./topics-085b5602.js');
var SendbirdChat = require('@sendbird/chat');
var openChannel = require('@sendbird/chat/openChannel');
var uuid = require('./uuid-2f4916c1.js');
var useSendbirdStateContext = require('./useSendbirdStateContext.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var getMessageCreatedAt = function (message) {
  return index.format(message.createdAt, 'p');
};
var shouldFetchMore = function (messageLength, maxMessages) {
  if (typeof maxMessages !== 'number') {
    return true;
  }

  if (typeof maxMessages === 'number' && maxMessages > messageLength) {
    return true;
  }

  return false;
};
var scrollIntoLast = function (initialTry, scrollRef) {
  if (initialTry === void 0) {
    initialTry = 0;
  }

  var MAX_TRIES = 10;
  var currentTry = initialTry;

  if (currentTry > MAX_TRIES) {
    return;
  }

  try {
    var scrollDOM = (scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current) || document.querySelector('.sendbird-openchannel-conversation-scroll__container__item-container'); // eslint-disable-next-line no-multi-assign

    scrollDOM.scrollTop = scrollDOM.scrollHeight;
  } catch (error) {
    setTimeout(function () {
      scrollIntoLast(currentTry + 1, scrollRef);
    }, 500 * currentTry);
  }
};
var isSameGroup = function (message, comparingMessage) {
  var _a, _b, _c, _d;

  if (!(message && comparingMessage && (message === null || message === void 0 ? void 0 : message.messageType) && message.messageType !== 'admin' && (comparingMessage === null || comparingMessage === void 0 ? void 0 : comparingMessage.messageType) && comparingMessage.messageType !== 'admin' && (message === null || message === void 0 ? void 0 : message.sender) && (comparingMessage === null || comparingMessage === void 0 ? void 0 : comparingMessage.sender) && (message === null || message === void 0 ? void 0 : message.createdAt) && (comparingMessage === null || comparingMessage === void 0 ? void 0 : comparingMessage.createdAt) && ((_a = message === null || message === void 0 ? void 0 : message.sender) === null || _a === void 0 ? void 0 : _a.userId) && ((_b = comparingMessage === null || comparingMessage === void 0 ? void 0 : comparingMessage.sender) === null || _b === void 0 ? void 0 : _b.userId))) {
    return false;
  } // to fix typecasting


  var message_ = message;
  var comparingMessage_ = comparingMessage;
  return (message_ === null || message_ === void 0 ? void 0 : message_.sendingStatus) === (comparingMessage_ === null || comparingMessage_ === void 0 ? void 0 : comparingMessage_.sendingStatus) && ((_c = message_ === null || message_ === void 0 ? void 0 : message_.sender) === null || _c === void 0 ? void 0 : _c.userId) === ((_d = comparingMessage_ === null || comparingMessage_ === void 0 ? void 0 : comparingMessage_.sender) === null || _d === void 0 ? void 0 : _d.userId) && getMessageCreatedAt(message) === getMessageCreatedAt(comparingMessage);
};
var compareMessagesForGrouping = function (prevMessage, currMessage, nextMessage) {
  return [isSameGroup(prevMessage, currMessage), isSameGroup(currMessage, nextMessage)];
};
var kFormatter = function (num) {
  if (Math.abs(num) > 999999) {
    return "".concat((Math.abs(num) / 1000000).toFixed(1), "M");
  }

  if (Math.abs(num) > 999) {
    return "".concat((Math.abs(num) / 1000).toFixed(1), "K");
  }

  return "".concat(num);
};
var isOperator = function (openChannel, userId) {
  var operators = openChannel === null || openChannel === void 0 ? void 0 : openChannel.operators;

  if (operators.map(function (operator) {
    return operator.userId;
  }).indexOf(userId) < 0) {
    return false;
  }

  return true;
};
var isDisabledBecauseFrozen = function (openChannel, userId) {
  var isFrozen = openChannel === null || openChannel === void 0 ? void 0 : openChannel.isFrozen;
  return isFrozen && !isOperator(openChannel, userId);
};
var isDisabledBecauseMuted = function (mutedParticipantIds, userId) {
  return mutedParticipantIds.indexOf(userId) > -1;
};
var fetchWithListQuery = function (listQuery, logger, eachQueryNextCallback) {
  var fetchList = function (query) {
    var hasNext = query.hasNext;

    if (hasNext) {
      query.next().then(function (users) {
        eachQueryNextCallback(users);
        fetchList(query);
      }).catch(function (error) {
        logger.warning('OpenChannel | FetchUserList failed', error);
      });
    } else {
      logger.info('OpenChannel | FetchUserList finished');
    }
  };

  logger.info('OpenChannel | FetchUserList start', listQuery);
  fetchList(listQuery);
};
var pxToNumber = function (px) {
  if (typeof px === 'number') {
    return px;
  }

  if (typeof px === 'string') {
    var parsed = Number.parseFloat(px);

    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }

  return null;
};

var SET_CURRENT_CHANNEL = 'SET_CURRENT_CHANNEL';
var SET_CHANNEL_INVALID = 'SET_CHANNEL_INVALID';
var RESET_MESSAGES = 'RESET_MESSAGES';
var EXIT_CURRENT_CHANNEL = 'EXIT_CURRENT_CHANNEL';
var GET_PREV_MESSAGES_START = 'GET_PREV_MESSAGES_START';
var GET_PREV_MESSAGES_SUCESS = 'GET_PREV_MESSAGES_SUCESS';
var GET_PREV_MESSAGES_FAIL = 'GET_PREV_MESSAGES_FAIL';
var SENDING_MESSAGE_FAILED = 'SENDING_MESSAGE_FAILED';
var SENDING_MESSAGE_SUCCEEDED = 'SENDING_MESSAGE_SUCCEEDED';
var SENDING_MESSAGE_START = 'SENDING_MESSAGE_START';
var RESENDING_MESSAGE_START = 'RESENDING_MESSAGE_START';
var FETCH_PARTICIPANT_LIST = 'FETCH_PARTICIPANT_LIST';
var FETCH_BANNED_USER_LIST = 'FETCH_BANNED_USER_LIST';
var FETCH_MUTED_USER_LIST = 'FETCH_MUTED_USER_LIST';
var TRIM_MESSAGE_LIST = 'TRIM_MESSAGE_LIST'; // event handlers

var ON_MESSAGE_RECEIVED = 'ON_MESSAGE_RECEIVED';
var ON_MESSAGE_UPDATED = 'ON_MESSAGE_UPDATED';
var ON_MESSAGE_DELETED = 'ON_MESSAGE_DELETED';
var ON_MESSAGE_DELETED_BY_REQ_ID = 'ON_MESSAGE_DELETED_BY_REQ_ID';
var ON_OPERATOR_UPDATED = 'ON_OPERATOR_UPDATED';
var ON_USER_ENTERED = 'ON_USER_ENTERED';
var ON_USER_EXITED = 'ON_USER_EXITED';
var ON_USER_MUTED = 'ON_USER_MUTED';
var ON_USER_UNMUTED = 'ON_USER_UNMUTED';
var ON_USER_BANNED = 'ON_USER_BANNED';
var ON_USER_UNBANNED = 'ON_USER_UNBANNED';
var ON_CHANNEL_FROZEN = 'ON_CHANNEL_FROZEN';
var ON_CHANNEL_UNFROZEN = 'ON_CHANNEL_UNFROZEN';
var ON_CHANNEL_CHANGED = 'ON_CHANNEL_CHANGED';
var ON_CHANNEL_DELETED = 'ON_CHANNEL_DELETED';
var ON_META_DATA_CREATED = 'ON_META_DATA_CREATED';
var ON_META_DATA_UPDATED = 'ON_META_DATA_UPDATED';
var ON_META_DATA_DELETED = 'ON_META_DATA_DELETED';
var ON_META_COUNTERS_CREATED = 'ON_META_COUNTERS_CREATED';
var ON_META_COUNTERS_UPDATED = 'ON_META_COUNTERS_UPDATED';
var ON_META_COUNTERS_DELETED = 'ON_META_COUNTERS_DELETED';
var ON_MENTION_RECEIVED = 'ON_MENTION_RECEIVED';

function reducer(state, action) {
  var _a, _b, _c;

  switch (action.type) {
    case RESET_MESSAGES:
      {
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          allMessages: []
        });
      }

    case EXIT_CURRENT_CHANNEL:
      {
        if (((_a = action.payload) === null || _a === void 0 ? void 0 : _a.url) === ((_b = state.currentOpenChannel) === null || _b === void 0 ? void 0 : _b.url)) {
          return tslib_es6.__assign(tslib_es6.__assign({}, state), {
            currentOpenChannel: null
          });
        }

        return state;
      }

    case SET_CURRENT_CHANNEL:
      {
        var gottenChannel = action.payload;
        var operators = gottenChannel.operators;

        if (!state.isInvalid && state.currentOpenChannel && state.currentOpenChannel.url && state.currentOpenChannel.url === gottenChannel.url) {
          return state;
        }

        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          currentOpenChannel: gottenChannel,
          isInvalid: false,
          operators: operators,
          participants: operators,
          bannedParticipantIds: [],
          mutedParticipantIds: []
        });
      }

    case SET_CHANNEL_INVALID:
      {
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          isInvalid: true
        });
      }

    case GET_PREV_MESSAGES_START:
      {
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          loading: true
        });
      }

    case GET_PREV_MESSAGES_SUCESS:
    case GET_PREV_MESSAGES_FAIL:
      {
        var isFailed = action.type === GET_PREV_MESSAGES_FAIL;
        var _d = action.payload,
            _e = _d.currentOpenChannel,
            currentOpenChannel = _e === void 0 ? {} : _e,
            _f = _d.messages,
            messages = _f === void 0 ? [] : _f,
            hasMore = _d.hasMore,
            lastMessageTimestamp = _d.lastMessageTimestamp;
        var actionChannelUrl = currentOpenChannel.url;
        var receivedMessages_1 = isFailed ? [] : messages;

        var _hasMore = isFailed ? false : hasMore;

        var _lastMessageTimestamp = isFailed ? 0 : lastMessageTimestamp;

        var stateChannel = state.currentOpenChannel;
        var stateChannelUrl = stateChannel.url;

        if (actionChannelUrl !== stateChannelUrl) {
          return state;
        }

        var filteredAllMessages = state.allMessages.filter(function (message) {
          return !receivedMessages_1.find(function (_a) {
            var messageId = _a.messageId;
            return compareIds.compareIds(messageId, message.messageId);
          });
        });
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          loading: false,
          initialized: true,
          hasMore: _hasMore,
          lastMessageTimestamp: _lastMessageTimestamp,
          allMessages: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], receivedMessages_1, true), filteredAllMessages, true)
        });
      }

    case SENDING_MESSAGE_START:
      {
        var _g = action.payload,
            message_1 = _g.message,
            channel = _g.channel;

        if ((channel === null || channel === void 0 ? void 0 : channel.url) !== state.currentOpenChannel.url || state.allMessages.some(function (m) {
          return m.reqId === message_1.reqId;
        }) // Handing failed first than sending start issue
        ) {
          return state;
        }

        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          allMessages: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], state.allMessages, true), [message_1], false)
        });
      }

    case SENDING_MESSAGE_SUCCEEDED:
      {
        var sentMessage_1 = action.payload;
        var newMessages = state.allMessages.map(function (m) {
          return compareIds.compareIds(m.reqId, sentMessage_1.reqId) ? sentMessage_1 : m;
        });
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          allMessages: newMessages
        });
      }

    case SENDING_MESSAGE_FAILED:
      {
        var sentMessage_2 = action.payload;
        sentMessage_2.sendingStatus = 'failed';

        if (!state.allMessages.some(function (m) {
          return (m === null || m === void 0 ? void 0 : m.reqId) === (sentMessage_2 === null || sentMessage_2 === void 0 ? void 0 : sentMessage_2.reqId);
        })) {
          // Handling failed first than sending start issue
          return tslib_es6.__assign(tslib_es6.__assign({}, state), {
            allMessages: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], state.allMessages.filter(function (m) {
              return !compareIds.compareIds(m.reqId, sentMessage_2);
            }), true), [sentMessage_2], false)
          });
        } else {
          return tslib_es6.__assign(tslib_es6.__assign({}, state), {
            allMessages: state.allMessages.map(function (m) {
              return compareIds.compareIds(m.reqId, sentMessage_2.reqId) ? sentMessage_2 : m;
            })
          });
        }
      }

    case TRIM_MESSAGE_LIST:
      {
        var allMessages = state.allMessages;
        var messageLimit = (_c = action.payload) === null || _c === void 0 ? void 0 : _c.messageLimit;

        if (messageLimit && messageLimit > 0 && (allMessages === null || allMessages === void 0 ? void 0 : allMessages.length) > messageLimit) {
          var sliceAt = allMessages.length - messageLimit;
          return tslib_es6.__assign(tslib_es6.__assign({}, state), {
            allMessages: allMessages.slice(sliceAt)
          });
        }

        return state;
      }

    case RESENDING_MESSAGE_START:
      {
        var eventedChannel = action.payload.channel;
        var resentMessage_1 = action.payload.message;

        if (eventedChannel.url !== state.currentOpenChannel.url) {
          return state;
        }

        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          allMessages: state.allMessages.map(function (m) {
            return compareIds.compareIds(m.reqId, resentMessage_1.reqId) ? resentMessage_1 : m;
          })
        });
      }

    case FETCH_PARTICIPANT_LIST:
      {
        var eventedChannel = action.payload.channel;
        var fetchedParticipantList = action.payload.users;

        if (eventedChannel.url !== state.currentOpenChannel.url) {
          return state;
        }

        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          participants: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], state.participants, true), fetchedParticipantList, true)
        });
      }

    case FETCH_BANNED_USER_LIST:
      {
        var eventedChannel = action.payload.channel;
        var fetchedBannedUserList = action.payload.users;

        if (eventedChannel.url !== state.currentOpenChannel.url || !fetchedBannedUserList.every(function (user) {
          return typeof user.userId === 'string';
        })) {
          return state;
        }

        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          bannedParticipantIds: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], state.bannedParticipantIds, true), fetchedBannedUserList.map(function (user) {
            return user.userId;
          }), true)
        });
      }

    case FETCH_MUTED_USER_LIST:
      {
        var eventedChannel = action.payload.channel;
        var fetchedMutedUserList = action.payload.users;

        if (eventedChannel.url !== state.currentOpenChannel.url || !fetchedMutedUserList.every(function (user) {
          return typeof user.userId === 'string';
        })) {
          return state;
        }

        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          mutedParticipantIds: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], state.mutedParticipantIds, true), fetchedMutedUserList.map(function (user) {
            return user.userId;
          }), true)
        });
      }
    // events

    case ON_MESSAGE_RECEIVED:
      {
        var eventedChannel = action.payload.channel;
        var receivedMessage = action.payload.message;
        var currentOpenChannel = state.currentOpenChannel;

        if (!compareIds.compareIds(eventedChannel.url, currentOpenChannel.url) || !(state.allMessages.map(function (message) {
          return message.messageId;
        }).indexOf(receivedMessage.messageId) < 0)) {
          return state;
        }

        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          allMessages: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], state.allMessages, true), [receivedMessage], false)
        });
      }

    case ON_MESSAGE_UPDATED:
      {
        var eventedChannel = action.payload.channel;
        var updatedMessage_1 = action.payload.message;
        var currentChannel = state.currentOpenChannel;

        if (!currentChannel || currentChannel.url && currentChannel.url !== eventedChannel.url) {
          return state;
        }

        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          allMessages: state.allMessages.map(function (message) {
            return message.isIdentical(updatedMessage_1) ? updatedMessage_1 : message;
          })
        });
      }

    case ON_MESSAGE_DELETED:
      {
        var eventedChannel = action.payload.channel;
        var deletedMessageId_1 = action.payload.messageId;
        var currentChannel = state.currentOpenChannel;

        if (!currentChannel || currentChannel.url && currentChannel.url !== eventedChannel.url) {
          return state;
        }

        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          allMessages: state.allMessages.filter(function (message) {
            return !compareIds.compareIds(message.messageId, deletedMessageId_1);
          })
        });
      }

    case ON_MESSAGE_DELETED_BY_REQ_ID:
      {
        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          allMessages: state.allMessages.filter(function (m) {
            return !compareIds.compareIds(m.reqId, action.payload);
          })
        });
      }

    case ON_OPERATOR_UPDATED:
      {
        var eventedChannel = action.payload.channel;
        var updatedOperators = action.payload.operators;
        var currentChannel = state.currentOpenChannel;

        if (!currentChannel || currentChannel.url && currentChannel.url !== eventedChannel.url) {
          return state;
        }

        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          currentOpenChannel: eventedChannel,
          operators: updatedOperators
        });
      }

    case ON_USER_ENTERED:
      {
        var eventedChannel = action.payload.channel;
        var enteredUser = action.payload.user;
        var currentChannel = state.currentOpenChannel;

        if (!currentChannel || currentChannel.url && currentChannel.url !== eventedChannel.url) {
          return state;
        }

        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          participants: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], state.participants, true), [enteredUser], false)
        });
      }

    case ON_USER_EXITED:
      {
        var eventedChannel = action.payload.channel;
        var exitedUser_1 = action.payload.user;
        var currentChannel = state.currentOpenChannel;

        if (!currentChannel || currentChannel.url && currentChannel.url !== eventedChannel.url) {
          return state;
        }

        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          participants: state.participants.filter(function (participant) {
            return !compareIds.compareIds(participant.userId, exitedUser_1.userId);
          })
        });
      }

    case ON_USER_MUTED:
      {
        var eventedChannel = action.payload.channel;
        var mutedUser = action.payload.user;
        var currentChannel = state.currentOpenChannel;

        if (!currentChannel || currentChannel.url && currentChannel.url !== eventedChannel.url || state.mutedParticipantIds.indexOf(mutedUser.userId) >= 0) {
          return state;
        }

        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          mutedParticipantIds: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], state.mutedParticipantIds, true), [mutedUser.userId], false)
        });
      }

    case ON_USER_UNMUTED:
      {
        var eventedChannel = action.payload.channel;
        var unmutedUser_1 = action.payload.user;
        var currentChannel = state.currentOpenChannel;

        if (!currentChannel || currentChannel.url && currentChannel.url !== eventedChannel.url || state.mutedParticipantIds.indexOf(unmutedUser_1.userId) < 0) {
          return state;
        }

        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          mutedParticipantIds: state.mutedParticipantIds.filter(function (userId) {
            return userId !== unmutedUser_1.userId;
          })
        });
      }

    case ON_USER_BANNED:
      {
        var eventedChannel = action.payload.channel;
        var bannedUser = action.payload.user;
        var currentUser = action.payload.currentUser;
        var currentChannel = state.currentOpenChannel;

        if ((currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url) === (eventedChannel === null || eventedChannel === void 0 ? void 0 : eventedChannel.url) && (bannedUser === null || bannedUser === void 0 ? void 0 : bannedUser.userId) === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId)) {
          return tslib_es6.__assign(tslib_es6.__assign({}, state), {
            currentOpenChannel: null
          });
        } else if ((currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url) === (eventedChannel === null || eventedChannel === void 0 ? void 0 : eventedChannel.url)) {
          return tslib_es6.__assign(tslib_es6.__assign({}, state), {
            bannedParticipantIds: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], state.bannedParticipantIds, true), [bannedUser.userId], false)
          });
        }

        return state;
      }

    case ON_USER_UNBANNED:
      {
        var eventedChannel = action.payload.channel;
        var unbannedUser_1 = action.payload.user;
        var currentChannel = state.currentOpenChannel;

        if ((currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url) === (eventedChannel === null || eventedChannel === void 0 ? void 0 : eventedChannel.url)) {
          return tslib_es6.__assign(tslib_es6.__assign({}, state), {
            bannedParticipantIds: state.bannedParticipantIds.filter(function (userId) {
              return userId !== unbannedUser_1.userId;
            })
          });
        }

        return state;
      }

    case ON_CHANNEL_FROZEN:
      {
        var frozenChannel = action.payload;
        var currentChannel = state.currentOpenChannel;

        if (!currentChannel || currentChannel.url && currentChannel.url !== frozenChannel.url) {
          return state;
        }

        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          frozen: true
        });
      }

    case ON_CHANNEL_UNFROZEN:
      {
        var unfrozenChannel = action.payload;
        var currentChannel = state.currentOpenChannel;

        if (!currentChannel || currentChannel.url && currentChannel.url !== unfrozenChannel.url) {
          return state;
        }

        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          frozen: false
        });
      }

    case ON_CHANNEL_CHANGED:
      {
        var changedChannel = action.payload;
        var currentChannel = state.currentOpenChannel;

        if (!currentChannel || currentChannel.url && currentChannel.url !== changedChannel.url) {
          return state;
        }

        return tslib_es6.__assign(tslib_es6.__assign({}, state), {
          currentOpenChannel: changedChannel
        });
      }

    case ON_CHANNEL_DELETED:
      {
        var deletedChannelUrl = action.payload;
        var currentChannel = state === null || state === void 0 ? void 0 : state.currentOpenChannel;

        if ((currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url) === deletedChannelUrl) {
          return tslib_es6.__assign(tslib_es6.__assign({}, state), {
            currentOpenChannel: null
          });
        }

        return state;
      }

    case ON_META_DATA_CREATED:
      {
        // const eventedChannel = action.payload.channel;
        // const createdMetaData = action.payload.metaData;
        // return {
        //   ...state
        // };
        return state;
      }

    case ON_META_DATA_UPDATED:
      {
        // const eventedChannel = action.payload.channel;
        // const updatedMetaData = action.payload.metaData;
        // return {
        //   ...state
        // };
        return state;
      }

    case ON_META_DATA_DELETED:
      {
        // const eventedChannel = action.payload.channel;
        // const deletedMetaDataKeys = action.payload.metaDataKeys;
        // return {
        //   ...state
        // };
        return state;
      }

    case ON_META_COUNTERS_CREATED:
      {
        // const eventedChannel = action.payload.channel;
        // const createdMetaCounter = action.payload.metaCounter;
        // return {
        //   ...state
        // };
        return state;
      }

    case ON_META_COUNTERS_UPDATED:
      {
        // const eventedChannel = action.payload.channel;
        // const updatedMetaCounter = action.payload.metaCounter;
        // return {
        //   ...state
        // };
        return state;
      }

    case ON_META_COUNTERS_DELETED:
      {
        // const eventedChannel = action.payload.channel;
        // const deletedMetaCounterKeys = action.payload.metaCounterKeys;
        // return {
        //   ...state
        // };
        return state;
      }

    case ON_MENTION_RECEIVED:
      {
        // const eventedChannel = action.payload.channel;
        // const mentionedMessage = action.payload.message;
        // return {
        //   ...state
        // };
        return state;
      }

    default:
      return state;
  }
}

var initialState = {
  allMessages: [],
  loading: false,
  initialized: false,
  currentOpenChannel: null,
  isInvalid: false,
  hasMore: false,
  lastMessageTimestamp: 0,
  frozen: false,
  operators: [],
  participants: [],
  bannedParticipantIds: [],
  mutedParticipantIds: []
};

function useSetChannel(_a, _b) {
  var channelUrl = _a.channelUrl,
      sdkInit = _a.sdkInit,
      fetchingParticipants = _a.fetchingParticipants,
      userId = _a.userId,
      currentOpenChannel = _a.currentOpenChannel;
  var sdk = _b.sdk,
      logger = _b.logger,
      messagesDispatcher = _b.messagesDispatcher;
  React.useEffect(function () {
    var _a;

    if (channelUrl && sdkInit && (sdk === null || sdk === void 0 ? void 0 : sdk.openChannel)) {
      if (currentOpenChannel && (currentOpenChannel === null || currentOpenChannel === void 0 ? void 0 : currentOpenChannel.exit)) {
        (_a = currentOpenChannel.exit) === null || _a === void 0 ? void 0 : _a.call(currentOpenChannel).then(function () {
          logger.info('OpenChannel | useSetChannel: Exit from the previous open channel', currentOpenChannel === null || currentOpenChannel === void 0 ? void 0 : currentOpenChannel.url);
          messagesDispatcher({
            type: EXIT_CURRENT_CHANNEL,
            payload: currentOpenChannel
          });
        });
      }

      logger.info('OpenChannel | useSetChannel: Fetching channel', channelUrl);
      sdk.openChannel.getChannel(channelUrl).then(function (openChannel) {
        logger.info('OpenChannel | useSetChannel: Succeeded to fetch channel', openChannel);
        messagesDispatcher({
          type: SET_CURRENT_CHANNEL,
          payload: openChannel
        });
        openChannel.enter().then(function () {
          if (openChannel.isOperator(userId)) {
            // only operator has a permission to fetch these list
            var bannedParticipantListQuery = openChannel.createBannedUserListQuery();
            var mutedParticipantListQuery = openChannel.createMutedUserListQuery();
            fetchWithListQuery(bannedParticipantListQuery, logger, function (users) {
              messagesDispatcher({
                type: FETCH_BANNED_USER_LIST,
                payload: {
                  channel: openChannel,
                  users: users
                }
              });
            });
            fetchWithListQuery(mutedParticipantListQuery, logger, function (users) {
              messagesDispatcher({
                type: FETCH_MUTED_USER_LIST,
                payload: {
                  channel: openChannel,
                  users: users
                }
              });
            });
          } else {
            openChannel.getMyMutedInfo().then(function (mutedInfo) {
              if (mutedInfo === null || mutedInfo === void 0 ? void 0 : mutedInfo.isMuted) {
                messagesDispatcher({
                  type: FETCH_MUTED_USER_LIST,
                  payload: {
                    channel: openChannel,
                    users: [sdk === null || sdk === void 0 ? void 0 : sdk.currentUser]
                  }
                });
              }
            });
          }

          if (fetchingParticipants) {
            // fetch participants list
            var participantListQuery = openChannel.createParticipantListQuery({
              limit: openChannel.participantCount
            });
            fetchWithListQuery(participantListQuery, logger, function (users) {
              messagesDispatcher({
                type: FETCH_PARTICIPANT_LIST,
                payload: {
                  channel: openChannel,
                  users: users
                }
              });
            });
          }
        }).catch(function (error) {
          logger.warning('OpenChannel | useSetChannel: Failed to enter channel', {
            channelUrl: channelUrl,
            error: error
          });
          messagesDispatcher({
            type: SET_CHANNEL_INVALID,
            payload: null
          });
        });
      }).catch(function (error) {
        logger.warning('OpenChannel | useSetChannel: Failed to fetch channel', {
          channelUrl: channelUrl,
          error: error
        });
        messagesDispatcher({
          type: SET_CHANNEL_INVALID,
          payload: null
        });
      });
    }
  }, [channelUrl, sdkInit, fetchingParticipants]);
}

function useHandleChannelEvents(_a, _b) {
  var currentOpenChannel = _a.currentOpenChannel,
      checkScrollBottom = _a.checkScrollBottom;
  var sdk = _b.sdk,
      logger = _b.logger,
      messagesDispatcher = _b.messagesDispatcher,
      scrollRef = _b.scrollRef;
  React.useEffect(function () {
    var _a, _b;

    var messageReceiverId = uuid.uuidv4();

    if (currentOpenChannel && currentOpenChannel.url && ((_a = sdk === null || sdk === void 0 ? void 0 : sdk.openChannel) === null || _a === void 0 ? void 0 : _a.addOpenChannelHandler)) {
      logger.info('OpenChannel | useHandleChannelEvents: Setup evnet handler', messageReceiverId);
      var channelHandlerParams = {
        onMessageReceived: function (channel, message) {
          var scrollToEnd = checkScrollBottom();
          var channelUrl = channel === null || channel === void 0 ? void 0 : channel.url;
          logger.info('OpenChannel | useHandleChannelEvents: onMessageReceived', {
            channelUrl: channelUrl,
            message: message
          });
          messagesDispatcher({
            type: ON_MESSAGE_RECEIVED,
            payload: {
              channel: channel,
              message: message
            }
          });

          if (scrollToEnd) {
            try {
              setTimeout(function () {
                scrollIntoLast(0, scrollRef);
              });
            } catch (error) {
              logger.warning('OpenChannel | onMessageReceived | scroll to end failed');
            }
          }
        },
        onMessageUpdated: function (channel, message) {
          var channelUrl = channel === null || channel === void 0 ? void 0 : channel.url;
          logger.info('OpenChannel | useHandleChannelEvents: onMessageUpdated', {
            channelUrl: channelUrl,
            message: message
          });
          messagesDispatcher({
            type: ON_MESSAGE_UPDATED,
            payload: {
              channel: channel,
              message: message
            }
          });
        },
        onMessageDeleted: function (channel, messageId) {
          var channelUrl = channel === null || channel === void 0 ? void 0 : channel.url;
          logger.info('OpenChannel | useHandleChannelEvents: onMessageDeleted', {
            channelUrl: channelUrl,
            messageId: messageId
          });
          messagesDispatcher({
            type: ON_MESSAGE_DELETED,
            payload: {
              channel: channel,
              messageId: messageId
            }
          });
        },
        onOperatorUpdated: function (channel, operators) {
          var channelUrl = channel === null || channel === void 0 ? void 0 : channel.url;
          logger.info('OpenChannel | useHandleChannelEvents: onOperatorUpdated', {
            channelUrl: channelUrl,
            operators: operators
          });
          messagesDispatcher({
            type: ON_OPERATOR_UPDATED,
            payload: {
              channel: channel,
              operators: operators
            }
          });
        },
        onUserEntered: function (channel, user) {
          var channelUrl = channel === null || channel === void 0 ? void 0 : channel.url;
          logger.info('OpenChannel | useHandleChannelEvents: onUserEntered', {
            channelUrl: channelUrl,
            user: user
          });
          messagesDispatcher({
            type: ON_USER_ENTERED,
            payload: {
              channel: channel,
              user: user
            }
          });
        },
        onUserExited: function (channel, user) {
          var channelUrl = channel === null || channel === void 0 ? void 0 : channel.url;
          logger.info('OpenChannel | useHandleChannelEvents: onUserExited', {
            channelUrl: channelUrl,
            user: user
          });
          messagesDispatcher({
            type: ON_USER_EXITED,
            payload: {
              channel: channel,
              user: user
            }
          });
        },
        onUserMuted: function (channel, user) {
          var channelUrl = channel === null || channel === void 0 ? void 0 : channel.url;
          logger.info('OpenChannel | useHandleChannelEvents: onUserMuted', {
            channelUrl: channelUrl,
            user: user
          });
          messagesDispatcher({
            type: ON_USER_MUTED,
            payload: {
              channel: channel,
              user: user
            }
          });
        },
        onUserUnmuted: function (channel, user) {
          var channelUrl = channel === null || channel === void 0 ? void 0 : channel.url;
          logger.info('OpenChannel | useHandleChannelEvents: onUserUnmuted', {
            channelUrl: channelUrl,
            user: user
          });
          messagesDispatcher({
            type: ON_USER_UNMUTED,
            payload: {
              channel: channel,
              user: user
            }
          });
        },
        onUserBanned: function (channel, user) {
          var channelUrl = channel === null || channel === void 0 ? void 0 : channel.url;
          logger.info('OpenChannel | useHandleChannelEvents: onUserBanned', {
            channelUrl: channelUrl,
            user: user
          });
          messagesDispatcher({
            type: ON_USER_BANNED,
            payload: {
              channel: channel,
              user: user,
              currentUser: sdk === null || sdk === void 0 ? void 0 : sdk.currentUser
            }
          });
        },
        onUserUnbanned: function (channel, user) {
          var channelUrl = channel === null || channel === void 0 ? void 0 : channel.url;
          logger.info('OpenChannel | useHandleChannelEvents: onUserUnbanned', {
            channelUrl: channelUrl,
            user: user
          });
          messagesDispatcher({
            type: ON_USER_UNBANNED,
            payload: {
              channel: channel,
              user: user
            }
          });
        },
        onChannelFrozen: function (channel) {
          logger.info('OpenChannel | useHandleChannelEvents: onChannelFrozen', channel);
          messagesDispatcher({
            type: ON_CHANNEL_FROZEN,
            payload: channel
          });
        },
        onChannelUnfrozen: function (channel) {
          logger.info('OpenChannel | useHandleChannelEvents: onChannelUnfrozen', channel);
          messagesDispatcher({
            type: ON_CHANNEL_UNFROZEN,
            payload: channel
          });
        },
        onChannelChanged: function (channel) {
          logger.info('OpenChannel | useHandleChannelEvents: onChannelChanged', channel);
          messagesDispatcher({
            type: ON_CHANNEL_CHANGED,
            payload: channel
          });
        },
        onMetaDataCreated: function (channel, metaData) {
          var channelUrl = channel === null || channel === void 0 ? void 0 : channel.url;
          logger.info('OpenChannel | useHandleChannelEvents: onMetaDataCreated', {
            channelUrl: channelUrl,
            metaData: metaData
          });
          messagesDispatcher({
            type: ON_META_DATA_CREATED,
            payload: {
              channel: channel,
              metaData: metaData
            }
          });
        },
        onMetaDataUpdated: function (channel, metaData) {
          var channelUrl = channel === null || channel === void 0 ? void 0 : channel.url;
          logger.info('OpenChannel | useHandleChannelEvents: onMetaDataUpdated', {
            channelUrl: channelUrl,
            metaData: metaData
          });
          messagesDispatcher({
            type: ON_META_DATA_UPDATED,
            payload: {
              channel: channel,
              metaData: metaData
            }
          });
        },
        onMetaDataDeleted: function (channel, metaDataKeys) {
          var channelUrl = channel === null || channel === void 0 ? void 0 : channel.url;
          logger.info('OpenChannel | useHandleChannelEvents: onMetaDataDeleted', {
            channelUrl: channelUrl,
            metaDataKeys: metaDataKeys
          });
          messagesDispatcher({
            type: ON_META_DATA_DELETED,
            payload: {
              channel: channel,
              metaDataKeys: metaDataKeys
            }
          });
        },
        onMetaCounterCreated: function (channel, metaCounter) {
          var channelUrl = channel === null || channel === void 0 ? void 0 : channel.url;
          logger.info('OpenChannel | useHandleChannelEvents: onMetaCountersCreated', {
            channelUrl: channelUrl,
            metaCounter: metaCounter
          });
          messagesDispatcher({
            type: ON_META_COUNTERS_CREATED,
            payload: {
              channel: channel,
              metaCounter: metaCounter
            }
          });
        },
        onMetaCounterUpdated: function (channel, metaCounter) {
          var channelUrl = channel === null || channel === void 0 ? void 0 : channel.url;
          logger.info('OpenChannel | useHandleChannelEvents: onMetaCountersUpdated', {
            channelUrl: channelUrl,
            metaCounter: metaCounter
          });
          messagesDispatcher({
            type: ON_META_COUNTERS_UPDATED,
            payload: {
              channel: channel,
              metaCounter: metaCounter
            }
          });
        },
        onMetaCounterDeleted: function (channel, metaCounterKeys) {
          var channelUrl = channel === null || channel === void 0 ? void 0 : channel.url;
          logger.info('OpenChannel | useHandleChannelEvents: onMetaCountersDeleted', {
            channelUrl: channelUrl,
            metaCounterKeys: metaCounterKeys
          });
          messagesDispatcher({
            type: ON_META_COUNTERS_DELETED,
            payload: {
              channel: channel,
              metaCounterKeys: metaCounterKeys
            }
          });
        },
        onMentionReceived: function (channel, message) {
          var channelUrl = channel === null || channel === void 0 ? void 0 : channel.url;
          logger.info('OpenChannel | useHandleChannelEvents: onMentionReceived', {
            channelUrl: channelUrl,
            message: message
          });
          messagesDispatcher({
            type: ON_MENTION_RECEIVED,
            payload: {
              channel: channel,
              message: message
            }
          });
        },
        onChannelDeleted: function (channelUrl, channelType) {
          if (channelType === SendbirdChat.ChannelType.OPEN && (currentOpenChannel === null || currentOpenChannel === void 0 ? void 0 : currentOpenChannel.url) === channelUrl) {
            messagesDispatcher({
              type: ON_CHANNEL_DELETED,
              payload: channelUrl
            });
          }
        }
      };
      var ChannelHandler = new openChannel.OpenChannelHandler(channelHandlerParams);
      (_b = sdk === null || sdk === void 0 ? void 0 : sdk.openChannel) === null || _b === void 0 ? void 0 : _b.addOpenChannelHandler(messageReceiverId, ChannelHandler);
    }

    return function () {
      var _a;

      if ((_a = sdk === null || sdk === void 0 ? void 0 : sdk.openChannel) === null || _a === void 0 ? void 0 : _a.removeOpenChannelHandler) {
        logger.info('OpenChannel | useHandleChannelEvents: Removing message receiver handler', messageReceiverId);
        sdk.openChannel.removeOpenChannelHandler(messageReceiverId);
      }
    };
  }, [currentOpenChannel]);
}

function useInitialMessagesFetch(_a, _b) {
  var currentOpenChannel = _a.currentOpenChannel,
      userFilledMessageListParams = _a.userFilledMessageListParams;
  var logger = _b.logger,
      messagesDispatcher = _b.messagesDispatcher,
      scrollRef = _b.scrollRef;
  React.useEffect(function () {
    logger.info('OpenChannel | useInitialMessagesFetch: Setup started', currentOpenChannel);
    messagesDispatcher({
      type: RESET_MESSAGES,
      payload: null
    });

    if (currentOpenChannel && currentOpenChannel.getMessagesByTimestamp) {
      var messageListParams_1 = {
        nextResultSize: 0,
        prevResultSize: 30,
        isInclusive: true,
        includeReactions: false
      };

      if (userFilledMessageListParams) {
        Object.keys(userFilledMessageListParams).forEach(function (key) {
          messageListParams_1[key] = userFilledMessageListParams[key];
        });
        logger.info('OpenChannel | useInitialMessagesFetch: Used customizedMessageListParams');
      }

      logger.info('OpenChannel | useInitialMessagesFetch: Fetching messages', {
        currentOpenChannel: currentOpenChannel,
        messageListParams: messageListParams_1
      });
      messagesDispatcher({
        type: GET_PREV_MESSAGES_START,
        payload: null
      });
      currentOpenChannel.getMessagesByTimestamp(new Date().getTime(), messageListParams_1).then(function (messages) {
        logger.info('OpenChannel | useInitialMessagesFetch: Fetching messages succeeded', messages);
        var hasMore = messages && messages.length > 0;
        var lastMessageTimestamp = hasMore ? messages[0].createdAt : null;
        messagesDispatcher({
          type: GET_PREV_MESSAGES_SUCESS,
          payload: {
            currentOpenChannel: currentOpenChannel,
            messages: messages,
            hasMore: hasMore,
            lastMessageTimestamp: lastMessageTimestamp
          }
        });
        setTimeout(function () {
          scrollIntoLast(0, scrollRef);
        });
      }).catch(function (error) {
        logger.error('OpenChannel | useInitialMessagesFetch: Fetching messages failed', error);
        messagesDispatcher({
          type: GET_PREV_MESSAGES_FAIL,
          payload: {
            currentOpenChannel: currentOpenChannel,
            messages: [],
            hasMore: false,
            lastMessageTimestamp: 0
          }
        });
      });
    }
  }, [currentOpenChannel, userFilledMessageListParams]);
}

function useScrollCallback(_a, _b) {
  var currentOpenChannel = _a.currentOpenChannel,
      lastMessageTimestamp = _a.lastMessageTimestamp,
      fetchMore = _a.fetchMore;
  var sdk = _b.sdk,
      logger = _b.logger,
      messagesDispatcher = _b.messagesDispatcher,
      hasMore = _b.hasMore,
      userFilledMessageListParams = _b.userFilledMessageListParams;
  return React.useCallback(function (callback) {
    if (fetchMore && hasMore) {
      logger.info('OpenChannel | useScrollCallback: start');
      var messageListParams_1 = {
        prevResultSize: 30,
        includeReactions: false,
        nextResultSize: 0
      };

      if (userFilledMessageListParams) {
        Object.keys(userFilledMessageListParams).forEach(function (key) {
          messageListParams_1[key] = userFilledMessageListParams[key];
        });
        logger.info('OpenChannel | useScrollCallback: Used userFilledMessageListParams', userFilledMessageListParams);
      }

      logger.info('OpenChannel | useScrollCallback: Fetching messages', {
        currentOpenChannel: currentOpenChannel,
        messageListParams: messageListParams_1
      });
      currentOpenChannel.getMessagesByTimestamp(lastMessageTimestamp || new Date().getTime(), messageListParams_1).then(function (messages) {
        logger.info('OpenChannel | useScrollCallback: Fetching messages succeeded', messages);
        var hasMore = messages && messages.length > 0;
        var lastMessageTimestamp = hasMore ? messages[0].createdAt : null;
        messagesDispatcher({
          type: GET_PREV_MESSAGES_SUCESS,
          payload: {
            currentOpenChannel: currentOpenChannel,
            messages: messages,
            hasMore: hasMore,
            lastMessageTimestamp: lastMessageTimestamp
          }
        });
        setTimeout(function () {
          callback();
        });
      }).catch(function (error) {
        logger.error('OpenChannel | useScrollCallback: Fetching messages failed', error);
        messagesDispatcher({
          type: GET_PREV_MESSAGES_FAIL,
          payload: {
            currentOpenChannel: currentOpenChannel,
            messages: [],
            hasMore: false,
            lastMessageTimestamp: 0
          }
        });
      });
    }
  }, [currentOpenChannel, lastMessageTimestamp, fetchMore, sdk]);
}

function useCheckScrollBottom(_a, _b) {
  var conversationScrollRef = _a.conversationScrollRef;
  var logger = _b.logger;
  return React.useCallback(function () {
    var isBottom = true;

    if (conversationScrollRef && (conversationScrollRef === null || conversationScrollRef === void 0 ? void 0 : conversationScrollRef.current)) {
      try {
        var conversationScroll = conversationScrollRef.current;
        isBottom = conversationScroll.scrollHeight <= conversationScroll.scrollTop + conversationScroll.clientHeight;
      } catch (error) {
        logger.error('OpenChannel | useCheckScrollBottom', error);
      }
    }

    return isBottom;
  }, [conversationScrollRef]);
}

function useSendMessageCallback(_a, _b) {
  var currentOpenChannel = _a.currentOpenChannel,
      onBeforeSendUserMessage = _a.onBeforeSendUserMessage,
      checkScrollBottom = _a.checkScrollBottom,
      messageInputRef = _a.messageInputRef;
  var sdk = _b.sdk,
      logger = _b.logger,
      messagesDispatcher = _b.messagesDispatcher,
      scrollRef = _b.scrollRef;
  return React.useCallback(function () {
    if (sdk) {
      var text = messageInputRef.current.innerText;

      var createParamsDefault = function (txt) {
        var message = (txt === null || txt === void 0 ? void 0 : txt.trim()) || txt;
        var params = {
          message: message
        };
        return params;
      };

      var createCustomParams = onBeforeSendUserMessage && typeof onBeforeSendUserMessage === 'function';

      if (createCustomParams) {
        logger.info('OpenChannel | useSendMessageCallback: Creating params using onBeforeSendUserMessage', onBeforeSendUserMessage);
      }

      var params = onBeforeSendUserMessage ? onBeforeSendUserMessage(text) : createParamsDefault(text);
      logger.info('OpenChannel | useSendMessageCallback: Sending message has started', params);
      var isBottom_1 = checkScrollBottom();
      var pendingMsg_1 = null;
      currentOpenChannel.sendUserMessage(params).onPending(function (pendingMessage) {
        messagesDispatcher({
          type: SENDING_MESSAGE_START,
          payload: {
            message: pendingMessage,
            channel: currentOpenChannel
          }
        });
        pendingMsg_1 = pendingMessage;
      }).onSucceeded(function (message) {
        logger.info('OpenChannel | useSendMessageCallback: Sending message succeeded', message);
        messagesDispatcher({
          type: SENDING_MESSAGE_SUCCEEDED,
          payload: message
        });

        if (isBottom_1) {
          setTimeout(function () {
            scrollIntoLast(0, scrollRef);
          });
        }
      }).onFailed(function (error) {
        logger.warning('OpenChannel | useSendMessageCallback: Sending message failed', error);
        messagesDispatcher({
          type: SENDING_MESSAGE_FAILED,
          payload: pendingMsg_1
        }); // https://sendbird.com/docs/chat/v3/javascript/guides/error-codes#2-server-error-codes
        // TODO: Do we need to handle the error cases?
        // @ts-ignore

        if ((error === null || error === void 0 ? void 0 : error.code) === 900041) {
          messagesDispatcher({
            type: ON_USER_MUTED,
            payload: {
              channel: currentOpenChannel,
              user: sdk.currentUser
            }
          });
        }
      });
    }
  }, [currentOpenChannel, onBeforeSendUserMessage, checkScrollBottom, messageInputRef]);
}

function useFileUploadCallback(_a, _b) {
  var currentOpenChannel = _a.currentOpenChannel,
      checkScrollBottom = _a.checkScrollBottom,
      _c = _a.imageCompression,
      imageCompression = _c === void 0 ? {} : _c,
      onBeforeSendFileMessage = _a.onBeforeSendFileMessage;
  var sdk = _b.sdk,
      logger = _b.logger,
      messagesDispatcher = _b.messagesDispatcher,
      scrollRef = _b.scrollRef;
  return React.useCallback(function (file) {
    if (sdk) {
      var compressionRate_1 = imageCompression.compressionRate,
          resizingWidth_1 = imageCompression.resizingWidth,
          resizingHeight_1 = imageCompression.resizingHeight;
      var createCustomParams_1 = onBeforeSendFileMessage && typeof onBeforeSendFileMessage === 'function';
      var compressibleFileType = file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg';
      var compressibleRatio = compressionRate_1 > 0 && compressionRate_1 < 1; // pxToNumber returns null if values are invalid

      var compressibleDiamensions_1 = pxToNumber(resizingWidth_1) || pxToNumber(resizingHeight_1);
      var canCompressImage = compressibleFileType && (compressibleRatio || compressibleDiamensions_1);

      var createParamsDefault_1 = function (file_) {
        var params = {};
        params.file = file_;
        return params;
      };

      if (canCompressImage) {
        // Using image compression
        try {
          var image_1 = document.createElement('img');
          image_1.src = URL.createObjectURL(file);

          image_1.onload = function () {
            URL.revokeObjectURL(image_1.src);
            var canvas = document.createElement('canvas');
            var imageWidth = image_1.naturalWidth || image_1.width;
            var imageHeight = image_1.naturalHeight || image_1.height;
            var targetWidth = pxToNumber(resizingWidth_1) || imageWidth;
            var targetHeight = pxToNumber(resizingHeight_1) || imageHeight; // In canvas.toBlob(callback, mimeType, qualityArgument)
            // qualityArgument doesnt work
            // so in case compressibleDiamensions are not present, we use ratio

            if (file.type === 'image/png' && !compressibleDiamensions_1) {
              targetWidth *= compressionRate_1;
              targetHeight *= compressionRate_1;
            }

            canvas.width = targetWidth;
            canvas.height = targetHeight;
            var context = canvas.getContext('2d');
            context.drawImage(image_1, 0, 0, targetWidth, targetHeight);
            context.canvas.toBlob(function (newImageBlob) {
              var compressedFile = new File([newImageBlob], file.name, {
                type: file.type
              });

              if (createCustomParams_1) {
                logger.info('OpenChannel | useFileUploadCallback: Creating params using onBeforeSendFileMessage', onBeforeSendFileMessage);
              }

              var params = onBeforeSendFileMessage ? onBeforeSendFileMessage(compressedFile) : createParamsDefault_1(compressedFile);
              logger.info('OpenChannel | useFileUploadCallback: Uploading file message start', params);
              var isBottom = checkScrollBottom();
              currentOpenChannel.sendFileMessage(params).onPending(function (pendingMessage) {
                messagesDispatcher({
                  type: SENDING_MESSAGE_START,
                  payload: {
                    message: tslib_es6.__assign(tslib_es6.__assign({}, pendingMessage), {
                      url: URL.createObjectURL(file),
                      // pending thumbnail message seems to be failed
                      requestState: 'pending'
                    }),
                    channel: currentOpenChannel
                  }
                });
              }).onSucceeded(function (message) {
                logger.info('OpenChannel | useFileUploadCallback: Sending message succeeded', message);
                messagesDispatcher({
                  type: SENDING_MESSAGE_SUCCEEDED,
                  payload: message
                });

                if (isBottom) {
                  setTimeout(function () {
                    scrollIntoLast(0, scrollRef);
                  });
                }
              }).onFailed(function (error, message) {
                logger.error('OpenChannel | useFileUploadCallback: Sending file message failed', {
                  message: message,
                  error: error
                }); // @ts-ignore

                message.localUrl = URL.createObjectURL(file); // @ts-ignore

                message.file = file;
                messagesDispatcher({
                  type: SENDING_MESSAGE_FAILED,
                  payload: message
                });
              });
            }, file.type, compressionRate_1);
          };
        } catch (error) {
          logger.warning('OpenChannel | useFileUploadCallback: Sending file message with image compression failed', error);
        }
      } else {
        // Not using image compression
        if (createCustomParams_1) {
          logger.info('OpenChannel | useFileUploadCallback: Creating params using onBeforeSendFileMessage', onBeforeSendFileMessage);
        }

        var params = onBeforeSendFileMessage ? onBeforeSendFileMessage(file) : createParamsDefault_1(file);
        logger.info('OpenChannel | useFileUploadCallback: Uploading file message start', params);
        var isBottom_1 = checkScrollBottom();
        currentOpenChannel.sendFileMessage(params).onPending(function (pendingMessage) {
          messagesDispatcher({
            type: SENDING_MESSAGE_START,
            payload: {
              message: tslib_es6.__assign(tslib_es6.__assign({}, pendingMessage), {
                url: URL.createObjectURL(file),
                // pending thumbnail message seems to be failed
                requestState: 'pending'
              }),
              channel: currentOpenChannel
            }
          });
        }).onSucceeded(function (message) {
          logger.info('OpenChannel | useFileUploadCallback: Sending message succeeded', message);
          messagesDispatcher({
            type: SENDING_MESSAGE_SUCCEEDED,
            payload: message
          });

          if (isBottom_1) {
            setTimeout(function () {
              scrollIntoLast(0, scrollRef);
            });
          }
        }).onFailed(function (error, message) {
          logger.error('OpenChannel | useFileUploadCallback: Sending file message failed', {
            message: message,
            error: error
          }); // @ts-ignore

          message.localUrl = URL.createObjectURL(file); // @ts-ignore

          message.file = file;
          messagesDispatcher({
            type: SENDING_MESSAGE_FAILED,
            payload: message
          });
        });
      }
    }
  }, [currentOpenChannel, onBeforeSendFileMessage, checkScrollBottom, imageCompression]);
}

function useUpdateMessageCallback(_a, _b) {
  var currentOpenChannel = _a.currentOpenChannel,
      onBeforeSendUserMessage = _a.onBeforeSendUserMessage;
  var logger = _b.logger,
      messagesDispatcher = _b.messagesDispatcher;
  return React.useCallback(function (messageId, text, callback) {
    var createParamsDefault = function (txt) {
      var params = {
        message: txt
      };
      return params;
    };

    if (onBeforeSendUserMessage && typeof onBeforeSendUserMessage === 'function') {
      logger.info('OpenChannel | useUpdateMessageCallback: Creating params using onBeforeUpdateUserMessage');
    }

    var params = onBeforeSendUserMessage ? onBeforeSendUserMessage(text) : createParamsDefault(text);
    currentOpenChannel.updateUserMessage(messageId, params).then(function (message) {
      if (callback) {
        callback();
      }

      logger.info('OpenChannel | useUpdateMessageCallback: Updating message succeeded', {
        message: message,
        params: params
      });
      messagesDispatcher({
        type: ON_MESSAGE_UPDATED,
        payload: {
          channel: currentOpenChannel,
          message: message
        }
      });
    });
  }, [currentOpenChannel, onBeforeSendUserMessage]);
}

function useDeleteMessageCallback(_a, _b) {
  var currentOpenChannel = _a.currentOpenChannel;
  var logger = _b.logger,
      messagesDispatcher = _b.messagesDispatcher;
  return React.useCallback(function (message, callback) {
    logger.info('OpenChannel | useDeleteMessageCallback: Deleting message', message);
    var sendingStatus = message.sendingStatus;
    logger.info('OpenChannel | useDeleteMessageCallback: Deleting message requestState', sendingStatus);

    if (sendingStatus === 'failed' || sendingStatus === 'pending') {
      logger.info('OpenChannel | useDeleteMessageCallback: Deleted message from local', message);
      messagesDispatcher({
        type: ON_MESSAGE_DELETED_BY_REQ_ID,
        payload: message.reqId
      });

      if (callback) {
        callback();
      }
    } else {
      if (!(message.messageType === 'file' || message.messageType === 'user')) {
        return;
      }

      var messageToDelete = message;
      currentOpenChannel.deleteMessage(messageToDelete).then(function () {
        logger.info('OpenChannel | useDeleteMessageCallback: Deleting message on server', sendingStatus);

        if (callback) {
          callback();
        }

        logger.info('OpenChannel | useDeleteMessageCallback: Deleting message succeeded', message);
        messagesDispatcher({
          type: ON_MESSAGE_DELETED,
          payload: {
            channel: currentOpenChannel,
            messageId: message.messageId
          }
        });
      }).catch(function (error) {
        logger.warning('OpenChannel | useDeleteMessageCallback: Deleting message failed', error);
      });
    }
  }, [currentOpenChannel]);
}

function useResendMessageCallback(_a, _b) {
  var currentOpenChannel = _a.currentOpenChannel;
  var logger = _b.logger,
      messagesDispatcher = _b.messagesDispatcher;
  return React.useCallback(function (failedMessage) {
    logger.info('OpenChannel | useResendMessageCallback: Resending message has started', failedMessage); // eslint-disable-next-line no-param-reassign

    var _a = failedMessage,
        messageType = _a.messageType,
        file = _a.file;

    if (failedMessage && typeof failedMessage.isResendable === 'function' && failedMessage.isResendable) {
      // eslint-disable-next-line no-param-reassign
      failedMessage.requestState = 'pending';
      messagesDispatcher({
        type: RESENDING_MESSAGE_START,
        payload: {
          channel: currentOpenChannel,
          message: failedMessage
        }
      }); // userMessage

      if (messageType === 'user' && failedMessage.messageType === 'user') {
        currentOpenChannel.resendUserMessage(failedMessage).then(function (message) {
          logger.info('OpenChannel | useResendMessageCallback: Reseding message succeeded', message);
          messagesDispatcher({
            type: SENDING_MESSAGE_SUCCEEDED,
            payload: message
          });
        }).catch(function (error) {
          logger.warning('OpenChannel | useResendMessageCallback: Resending message failed', error); // eslint-disable-next-line no-param-reassign

          failedMessage.requestState = 'failed';
          messagesDispatcher({
            type: SENDING_MESSAGE_FAILED,
            payload: failedMessage
          });
        });
      } // fileMessage


      if (messageType === 'file' && failedMessage.messageType === 'file') {
        currentOpenChannel.resendFileMessage(failedMessage, file).then(function (message) {
          logger.info('OpenChannel | useResendMessageCallback: Resending file message succeeded', message);
          messagesDispatcher({
            type: SENDING_MESSAGE_SUCCEEDED,
            payload: message
          });
        }).catch(function (error) {
          logger.warning('OpenChannel | useResendMessageCallback: Resending file message failed', error); // eslint-disable-next-line no-param-reassign

          failedMessage.requestState = 'failed';
          messagesDispatcher({
            type: SENDING_MESSAGE_FAILED,
            payload: failedMessage
          });
        });
      }
    } else {
      // to alert user on console
      // eslint-disable-next-line no-console
      console.error('OpenChannel | useResendMessageCallback: Message is not resendable');
      logger.warning('OpenChannel | useResendMessageCallback: Message is not resendable', failedMessage);
    }
  }, [currentOpenChannel]);
}

var THROTTLE_TIMER = 5000; // to trim message list so that we wont keep thousands of messages in memory
// We are throttling here; not debouncing
// it will be called once very 5 sec if messagesLength, messageLimit changes
// we check if messagesLength > messageLimit before dispatching action

function useTrimMessageList(_a, _b) {
  var messagesLength = _a.messagesLength,
      messageLimit = _a.messageLimit;
  var messagesDispatcher = _b.messagesDispatcher,
      logger = _b.logger;

  var _c = React.useState(false),
      inProgress = _c[0],
      setInProgress = _c[1];

  React.useEffect(function () {
    if (inProgress) {
      return;
    }

    if (typeof messagesLength === 'number' && messagesLength > messageLimit) {
      logger.info('Trimming MessageList');
      messagesDispatcher({
        type: TRIM_MESSAGE_LIST,
        payload: {
          messageLimit: messageLimit
        }
      });
    }

    setInProgress(true);
    setTimeout(function () {
      setInProgress(false);
    }, THROTTLE_TIMER);
  }, [messagesLength, messageLimit]);
}

var OpenChannelContext = /*#__PURE__*/React__default["default"].createContext(undefined);

var OpenChannelProvider = function (props) {
  var _a, _b, _c, _d, _e, _f;

  var channelUrl = props.channelUrl,
      children = props.children,
      _g = props.isMessageGroupingEnabled,
      isMessageGroupingEnabled = _g === void 0 ? true : _g,
      queries = props.queries,
      onBeforeSendUserMessage = props.onBeforeSendUserMessage,
      messageLimit = props.messageLimit,
      onBeforeSendFileMessage = props.onBeforeSendFileMessage,
      onChatHeaderActionClick = props.onChatHeaderActionClick,
      onBackClick = props.onBackClick; // We didn't decide to support fetching participant list

  var fetchingParticipants = false;
  var globalStore = useSendbirdStateContext();
  var sdk = (_b = (_a = globalStore === null || globalStore === void 0 ? void 0 : globalStore.stores) === null || _a === void 0 ? void 0 : _a.sdkStore) === null || _b === void 0 ? void 0 : _b.sdk;
  var sdkInit = (_d = (_c = globalStore === null || globalStore === void 0 ? void 0 : globalStore.stores) === null || _c === void 0 ? void 0 : _c.sdkStore) === null || _d === void 0 ? void 0 : _d.initialized;
  var user = (_f = (_e = globalStore === null || globalStore === void 0 ? void 0 : globalStore.stores) === null || _e === void 0 ? void 0 : _e.userStore) === null || _f === void 0 ? void 0 : _f.user;
  var config = globalStore === null || globalStore === void 0 ? void 0 : globalStore.config;
  var userId = config.userId,
      isOnline = config.isOnline,
      logger = config.logger,
      pubSub = config.pubSub,
      imageCompression = config.imageCompression; // hook variables

  var _h = React.useReducer(reducer, initialState),
      messagesStore = _h[0],
      messagesDispatcher = _h[1];

  var allMessages = messagesStore.allMessages,
      loading = messagesStore.loading,
      initialized = messagesStore.initialized,
      currentOpenChannel = messagesStore.currentOpenChannel,
      isInvalid = messagesStore.isInvalid,
      hasMore = messagesStore.hasMore,
      lastMessageTimestamp = messagesStore.lastMessageTimestamp,
      operators = messagesStore.operators,
      bannedParticipantIds = messagesStore.bannedParticipantIds,
      mutedParticipantIds = messagesStore.mutedParticipantIds; // ref

  var messageInputRef = React.useRef(null); // useSendMessageCallback

  var conversationScrollRef = React.useRef(null); // useScrollAfterSendMessageCallback
  // const

  var userFilledMessageListParams = queries === null || queries === void 0 ? void 0 : queries.messageListParams;
  var disabled = !initialized || !isOnline || isDisabledBecauseFrozen(currentOpenChannel, userId) || isDisabledBecauseMuted(mutedParticipantIds, userId); // useMemo

  var amIBanned = React.useMemo(function () {
    return bannedParticipantIds.indexOf(user.userId) >= 0;
  }, [channelUrl, bannedParticipantIds, user]);
  var amIMuted = React.useMemo(function () {
    return mutedParticipantIds.indexOf(user.userId) >= 0;
  }, [channelUrl, mutedParticipantIds, user]);
  var amIOperator = React.useMemo(function () {
    return operators.map(function (operator) {
      return operator.userId;
    }).indexOf(user.userId) >= 0;
  }, [channelUrl, operators, user]); // use hooks

  useSetChannel({
    channelUrl: channelUrl,
    sdkInit: sdkInit,
    fetchingParticipants: fetchingParticipants,
    userId: userId,
    currentOpenChannel: currentOpenChannel
  }, {
    sdk: sdk,
    logger: logger,
    messagesDispatcher: messagesDispatcher
  });
  var checkScrollBottom = useCheckScrollBottom({
    conversationScrollRef: conversationScrollRef
  }, {
    logger: logger
  });
  useHandleChannelEvents({
    currentOpenChannel: currentOpenChannel,
    checkScrollBottom: checkScrollBottom
  }, {
    sdk: sdk,
    logger: logger,
    messagesDispatcher: messagesDispatcher,
    scrollRef: conversationScrollRef
  });
  useInitialMessagesFetch({
    currentOpenChannel: currentOpenChannel,
    userFilledMessageListParams: userFilledMessageListParams
  }, {
    logger: logger,
    messagesDispatcher: messagesDispatcher,
    scrollRef: conversationScrollRef
  });
  var fetchMore = shouldFetchMore(allMessages === null || allMessages === void 0 ? void 0 : allMessages.length, messageLimit); // donot fetch more for streaming

  var onScroll = useScrollCallback({
    currentOpenChannel: currentOpenChannel,
    lastMessageTimestamp: lastMessageTimestamp,
    fetchMore: fetchMore
  }, {
    sdk: sdk,
    logger: logger,
    messagesDispatcher: messagesDispatcher,
    hasMore: hasMore,
    userFilledMessageListParams: userFilledMessageListParams
  });
  var handleSendMessage = useSendMessageCallback({
    currentOpenChannel: currentOpenChannel,
    onBeforeSendUserMessage: onBeforeSendUserMessage,
    checkScrollBottom: checkScrollBottom,
    messageInputRef: messageInputRef
  }, {
    sdk: sdk,
    logger: logger,
    messagesDispatcher: messagesDispatcher,
    scrollRef: conversationScrollRef
  });
  var handleFileUpload = useFileUploadCallback({
    currentOpenChannel: currentOpenChannel,
    onBeforeSendFileMessage: onBeforeSendFileMessage,
    checkScrollBottom: checkScrollBottom,
    imageCompression: imageCompression
  }, {
    sdk: sdk,
    logger: logger,
    messagesDispatcher: messagesDispatcher,
    scrollRef: conversationScrollRef
  });
  var updateMessage = useUpdateMessageCallback({
    currentOpenChannel: currentOpenChannel,
    onBeforeSendUserMessage: onBeforeSendUserMessage
  }, {
    logger: logger,
    messagesDispatcher: messagesDispatcher
  });
  var deleteMessage = useDeleteMessageCallback({
    currentOpenChannel: currentOpenChannel
  }, {
    logger: logger,
    messagesDispatcher: messagesDispatcher
  });
  var resendMessage = useResendMessageCallback({
    currentOpenChannel: currentOpenChannel
  }, {
    logger: logger,
    messagesDispatcher: messagesDispatcher
  });
  useTrimMessageList({
    messagesLength: allMessages === null || allMessages === void 0 ? void 0 : allMessages.length,
    messageLimit: messageLimit
  }, {
    messagesDispatcher: messagesDispatcher,
    logger: logger
  }); // handle API calls from withSendbird

  React.useEffect(function () {
    var subscriber = new Map();

    if (!pubSub || !pubSub.subscribe) {
      return;
    }

    subscriber.set(topics.SEND_USER_MESSAGE, pubSub.subscribe(topics.SEND_USER_MESSAGE, function (msg) {
      var channel = msg.channel,
          message = msg.message;
      scrollIntoLast(0, conversationScrollRef);

      if (channel && channelUrl === (channel === null || channel === void 0 ? void 0 : channel.url)) {
        messagesDispatcher({
          type: SENDING_MESSAGE_SUCCEEDED,
          payload: message
        });
      }
    }));
    subscriber.set(topics.SEND_MESSAGE_START, pubSub.subscribe(topics.SEND_MESSAGE_START, function (msg) {
      var channel = msg.channel,
          message = msg.message;

      if (channel && channelUrl === (channel === null || channel === void 0 ? void 0 : channel.url)) {
        messagesDispatcher({
          type: SENDING_MESSAGE_START,
          payload: {
            message: message,
            channel: channel
          }
        });
      }
    }));
    subscriber.set(topics.SEND_FILE_MESSAGE, pubSub.subscribe(topics.SEND_FILE_MESSAGE, function (msg) {
      var channel = msg.channel,
          message = msg.message;
      scrollIntoLast(0, conversationScrollRef);

      if (channel && channelUrl === (channel === null || channel === void 0 ? void 0 : channel.url)) {
        messagesDispatcher({
          type: SENDING_MESSAGE_SUCCEEDED,
          payload: {
            message: message,
            channel: channel
          }
        });
      }
    }));
    subscriber.set(topics.UPDATE_USER_MESSAGE, pubSub.subscribe(topics.UPDATE_USER_MESSAGE, function (msg) {
      var channel = msg.channel,
          message = msg.message,
          fromSelector = msg.fromSelector;

      if (fromSelector && channel && channelUrl === (channel === null || channel === void 0 ? void 0 : channel.url)) {
        messagesDispatcher({
          type: ON_MESSAGE_UPDATED,
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

      if (channel && channelUrl === (channel === null || channel === void 0 ? void 0 : channel.url)) {
        messagesDispatcher({
          type: ON_MESSAGE_DELETED,
          payload: messageId
        });
      }
    }));
    return function () {
      if (subscriber) {
        subscriber.forEach(function (s) {
          try {
            s.remove();
          } catch (_a) {//
          }
        });
      }
    };
  }, [channelUrl, sdkInit]);
  return /*#__PURE__*/React__default["default"].createElement(OpenChannelContext.Provider, {
    value: {
      // props
      channelUrl: channelUrl,
      children: children,
      isMessageGroupingEnabled: isMessageGroupingEnabled,
      queries: queries,
      onBeforeSendUserMessage: onBeforeSendUserMessage,
      messageLimit: messageLimit,
      onBeforeSendFileMessage: onBeforeSendFileMessage,
      onChatHeaderActionClick: onChatHeaderActionClick,
      onBackClick: onBackClick,
      // store
      allMessages: allMessages,
      loading: loading,
      initialized: initialized,
      currentOpenChannel: currentOpenChannel,
      isInvalid: isInvalid,
      hasMore: hasMore,
      lastMessageTimestamp: lastMessageTimestamp,
      operators: operators,
      bannedParticipantIds: bannedParticipantIds,
      mutedParticipantIds: mutedParticipantIds,
      // derived/utils
      messageInputRef: messageInputRef,
      conversationScrollRef: conversationScrollRef,
      disabled: disabled,
      amIBanned: amIBanned,
      amIMuted: amIMuted,
      amIOperator: amIOperator,
      checkScrollBottom: checkScrollBottom,
      fetchMore: fetchMore,
      onScroll: onScroll,
      handleSendMessage: handleSendMessage,
      handleFileUpload: handleFileUpload,
      updateMessage: updateMessage,
      deleteMessage: deleteMessage,
      resendMessage: resendMessage
    }
  }, /*#__PURE__*/React__default["default"].createElement(UserProfileContext.UserProfileProvider, {
    isOpenChannel: true,
    renderUserProfile: props === null || props === void 0 ? void 0 : props.renderUserProfile,
    disableUserProfile: props === null || props === void 0 ? void 0 : props.disableUserProfile
  }, children));
};

var useOpenChannelContext = function () {
  return React__default["default"].useContext(OpenChannelContext);
};

exports.OpenChannelProvider = OpenChannelProvider;
exports.compareMessagesForGrouping = compareMessagesForGrouping;
exports.kFormatter = kFormatter;
exports.useOpenChannelContext = useOpenChannelContext;
//# sourceMappingURL=OpenChannelProvider-b1de2e4c.js.map
