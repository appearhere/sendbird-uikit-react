'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropTypes = require('prop-types');
var index$2 = require('./index-0d62dfb8.js');
var index$1 = require('./index-cea4ec67.js');
var index = require('./index-3bea5f1c.js');
var LocalizationContext = require('./LocalizationContext-12ba41f8.js');
var index$3 = require('./index-89a6d536.js');
var index$4 = require('./index-0bc71091.js');
var index$5 = require('./index-8dc061fe.js');
require('react-dom');
require('./utils-9e449a49.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

const RESET_MESSAGES = 'RESET_MESSAGES';
const RESET_STATE = 'RESET_STATE';
const CLEAR_SENT_MESSAGES = 'CLEAR_SENT_MESSAGES';
const GET_PREV_MESSAGES_START = 'GET_PREV_MESSAGES_START';
const GET_PREV_MESSAGES_SUCESS = 'GET_PREV_MESSAGES_SUCESS';
const GET_NEXT_MESSAGES_SUCESS = 'GET_NEXT_MESSAGES_SUCESS';
const GET_NEXT_MESSAGES_FAILURE = 'GET_NEXT_MESSAGES_FAILURE';
const SEND_MESSAGEGE_START = 'SEND_MESSAGEGE_START';
const SEND_MESSAGEGE_SUCESS = 'SEND_MESSAGEGE_SUCESS';
const SEND_MESSAGEGE_FAILURE = 'SEND_MESSAGEGE_FAILURE';
const RESEND_MESSAGEGE_START = 'RESEND_MESSAGEGE_START';
const ON_MESSAGE_RECEIVED = 'ON_MESSAGE_RECEIVED';
const UPDATE_UNREAD_COUNT = 'UPDATE_UNREAD_COUNT';
const ON_MESSAGE_UPDATED = 'ON_MESSAGE_UPDATED';
const ON_MESSAGE_THREAD_INFO_UPDATED = 'ON_MESSAGE_THREAD_INFO_UPDATED';
const ON_MESSAGE_DELETED = 'ON_MESSAGE_DELETED';
const ON_MESSAGE_DELETED_BY_REQ_ID = 'ON_MESSAGE_DELETED_BY_REQ_ID';
const SET_CURRENT_CHANNEL = 'SET_CURRENT_CHANNEL';
const SET_CHANNEL_INVALID = 'SET_CHANNEL_INVALID';
const MARK_AS_READ = 'MARK_AS_READ';
const ON_REACTION_UPDATED = 'ON_REACTION_UPDATED';
const SET_EMOJI_CONTAINER = 'SET_EMOJI_CONTAINER';
const MESSAGE_LIST_PARAMS_CHANGED = 'MESSAGE_LIST_PARAMS_CHANGED';

const MessageStatusType = index.getOutgoingMessageStates();
const UNDEFINED = 'undefined';
const {
  SUCCEEDED: SUCCEEDED$1,
  FAILED: FAILED$1,
  PENDING: PENDING$1
} = index.getSendingMessageStatus();
const scrollIntoLast = function () {
  let intialTry = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  const MAX_TRIES = 10;
  const currentTry = intialTry;

  if (currentTry > MAX_TRIES) {
    return;
  }

  try {
    const scrollDOM = document.querySelector('.sendbird-conversation__messages-padding'); // eslint-disable-next-line no-multi-assign

    scrollDOM.scrollTop = scrollDOM.scrollHeight;
  } catch (error) {
    setTimeout(() => {
      scrollIntoLast(currentTry + 1);
    }, 500 * currentTry);
  }
};
const pubSubHandleRemover = subscriber => {
  subscriber.forEach(s => {
    try {
      s.remove();
    } catch (_unused) {//
    }
  });
};
const pubSubHandler = (channelUrl, pubSub, dispatcher) => {
  const subscriber = new Map();
  if (!pubSub || !pubSub.subscribe) return subscriber;
  subscriber.set(index$1.SEND_USER_MESSAGE, pubSub.subscribe(index$1.SEND_USER_MESSAGE, msg => {
    const {
      channel,
      message
    } = msg;
    scrollIntoLast();

    if (channel && channelUrl === channel.url) {
      dispatcher({
        type: SEND_MESSAGEGE_SUCESS,
        payload: message
      });
    }
  }));
  subscriber.set(index$1.SEND_MESSAGE_START, pubSub.subscribe(index$1.SEND_MESSAGE_START, msg => {
    const {
      channel,
      message
    } = msg;

    if (channel && channelUrl === channel.url) {
      dispatcher({
        type: SEND_MESSAGEGE_START,
        payload: message
      });
    }
  }));
  subscriber.set(index$1.SEND_FILE_MESSAGE, pubSub.subscribe(index$1.SEND_FILE_MESSAGE, msg => {
    const {
      channel,
      message
    } = msg;
    scrollIntoLast();

    if (channel && channelUrl === channel.url) {
      dispatcher({
        type: SEND_MESSAGEGE_SUCESS,
        payload: message
      });
    }
  }));
  subscriber.set(index$1.UPDATE_USER_MESSAGE, pubSub.subscribe(index$1.UPDATE_USER_MESSAGE, msg => {
    const {
      channel,
      message,
      fromSelector
    } = msg;

    if (fromSelector && channel && channelUrl === channel.url) {
      dispatcher({
        type: ON_MESSAGE_UPDATED,
        payload: {
          channel,
          message
        }
      });
    }
  }));
  subscriber.set(index$1.DELETE_MESSAGE, pubSub.subscribe(index$1.DELETE_MESSAGE, msg => {
    const {
      channel,
      messageId
    } = msg;

    if (channel && channelUrl === channel.url) {
      dispatcher({
        type: ON_MESSAGE_DELETED,
        payload: messageId
      });
    }
  }));
  return subscriber;
};
const getParsedStatus = (message, currentGroupChannel) => {
  if (message.requestState === FAILED$1) {
    return MessageStatusType.FAILED;
  }

  if (message.requestState === PENDING$1) {
    return MessageStatusType.PENDING;
  }

  if (message.requestState === SUCCEEDED$1) {
    if (!currentGroupChannel) {
      return MessageStatusType.SENT;
    }

    const unreadCount = currentGroupChannel.getReadReceipt(message);

    if (unreadCount === 0) {
      return MessageStatusType.READ;
    }

    const isDelivered = currentGroupChannel.getDeliveryReceipt(message) === 0;

    if (isDelivered) {
      return MessageStatusType.DELIVERED;
    }

    return MessageStatusType.SENT;
  }

  return null;
};
const isOperator = function () {
  let groupChannel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    myRole
  } = groupChannel;
  return myRole === 'operator';
};
const isDisabledBecauseFrozen = function () {
  let groupChannel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    isFrozen
  } = groupChannel;
  return isFrozen && !isOperator(groupChannel);
};
const isDisabledBecauseMuted = function () {
  let groupChannel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    myMutedState
  } = groupChannel;
  return myMutedState === 'muted';
};
const getEmojiCategoriesFromEmojiContainer$1 = function () {
  let emojiContainer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return emojiContainer.emojiCategories ? emojiContainer.emojiCategories : [];
};
const getAllEmojisFromEmojiContainer$1 = function () {
  let emojiContainer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    emojiCategories = []
  } = emojiContainer;
  const allEmojis = [];

  for (let categoryIndex = 0; categoryIndex < emojiCategories.length; categoryIndex += 1) {
    const {
      emojis
    } = emojiCategories[categoryIndex];

    for (let emojiIndex = 0; emojiIndex < emojis.length; emojiIndex += 1) {
      allEmojis.push(emojis[emojiIndex]);
    }
  }

  return allEmojis;
};
const getEmojisFromEmojiContainer$1 = function () {
  let emojiContainer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let emojiCategoryId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return emojiContainer.emojiCategories ? emojiContainer.emojiCategories.filter(emojiCategory => emojiCategory.id === emojiCategoryId)[0].emojis : [];
};
const getAllEmojisMapFromEmojiContainer = function () {
  let emojiContainer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    emojiCategories = []
  } = emojiContainer;
  const allEmojisMap = new Map();

  for (let categoryIndex = 0; categoryIndex < emojiCategories.length; categoryIndex += 1) {
    const {
      emojis
    } = emojiCategories[categoryIndex];

    for (let emojiIndex = 0; emojiIndex < emojis.length; emojiIndex += 1) {
      const {
        key,
        url
      } = emojis[emojiIndex];
      allEmojisMap.set(key, url);
    }
  }

  return allEmojisMap;
};
const getNicknamesMapFromMembers = function () {
  let members = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  const nicknamesMap = new Map();

  for (let memberIndex = 0; memberIndex < members.length; memberIndex += 1) {
    const {
      userId,
      nickname
    } = members[memberIndex];
    nicknamesMap.set(userId, nickname);
  }

  return nicknamesMap;
};
const getMessageCreatedAt = message => index$2.format(message.createdAt, 'p');
const isSameGroup = (message, comparingMessage) => {
  var _message$sender, _comparingMessage$sen, _message$sender2, _comparingMessage$sen2;

  if (!(message && comparingMessage && (message === null || message === void 0 ? void 0 : message.messageType) !== 'admin' && (comparingMessage === null || comparingMessage === void 0 ? void 0 : comparingMessage.messageType) !== 'admin' && message !== null && message !== void 0 && message.sender && comparingMessage !== null && comparingMessage !== void 0 && comparingMessage.sender && message !== null && message !== void 0 && message.createdAt && comparingMessage !== null && comparingMessage !== void 0 && comparingMessage.createdAt && message !== null && message !== void 0 && (_message$sender = message.sender) !== null && _message$sender !== void 0 && _message$sender.userId && comparingMessage !== null && comparingMessage !== void 0 && (_comparingMessage$sen = comparingMessage.sender) !== null && _comparingMessage$sen !== void 0 && _comparingMessage$sen.userId)) {
    return false;
  }

  return (message === null || message === void 0 ? void 0 : message.sendingStatus) === (comparingMessage === null || comparingMessage === void 0 ? void 0 : comparingMessage.sendingStatus) && (message === null || message === void 0 ? void 0 : (_message$sender2 = message.sender) === null || _message$sender2 === void 0 ? void 0 : _message$sender2.userId) === (comparingMessage === null || comparingMessage === void 0 ? void 0 : (_comparingMessage$sen2 = comparingMessage.sender) === null || _comparingMessage$sen2 === void 0 ? void 0 : _comparingMessage$sen2.userId) && getMessageCreatedAt(message) === getMessageCreatedAt(comparingMessage);
};
const compareMessagesForGrouping = (prevMessage, currMessage, nextMessage) => {
  const sendingStatus = (currMessage === null || currMessage === void 0 ? void 0 : currMessage.sendingStatus) || '';
  const isAcceptable = sendingStatus !== 'pending' && sendingStatus !== 'failed';
  return [isSameGroup(prevMessage, currMessage) && isAcceptable, isSameGroup(currMessage, nextMessage) && isAcceptable];
};
const hasOwnProperty = property => payload => {
  // eslint-disable-next-line no-prototype-builtins
  if (payload && payload.hasOwnProperty && payload.hasOwnProperty(property)) {
    return true;
  }

  return false;
};
const passUnsuccessfullMessages = (allMessages, newMessage) => {
  const {
    sendingStatus = UNDEFINED
  } = newMessage;

  if (sendingStatus === SUCCEEDED$1 || sendingStatus === PENDING$1) {
    const lastIndexOfSucceededMessage = allMessages.map(message => message.sendingStatus || (message.isAdminMessage && message.isAdminMessage() ? SUCCEEDED$1 : UNDEFINED)).lastIndexOf(SUCCEEDED$1);

    if (lastIndexOfSucceededMessage + 1 < allMessages.length) {
      const messages = [...allMessages];
      messages.splice(lastIndexOfSucceededMessage + 1, 0, newMessage);
      return messages;
    }
  }

  return [...allMessages, newMessage];
};
const pxToNumber = px => {
  if (typeof px === 'number') {
    return px;
  }

  if (typeof px === 'string') {
    const parsed = Number.parseFloat(px);

    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }

  return null;
};

var utils = /*#__PURE__*/Object.freeze({
  __proto__: null,
  scrollIntoLast: scrollIntoLast,
  pubSubHandleRemover: pubSubHandleRemover,
  pubSubHandler: pubSubHandler,
  getParsedStatus: getParsedStatus,
  isOperator: isOperator,
  isDisabledBecauseFrozen: isDisabledBecauseFrozen,
  isDisabledBecauseMuted: isDisabledBecauseMuted,
  getEmojiCategoriesFromEmojiContainer: getEmojiCategoriesFromEmojiContainer$1,
  getAllEmojisFromEmojiContainer: getAllEmojisFromEmojiContainer$1,
  getEmojisFromEmojiContainer: getEmojisFromEmojiContainer$1,
  getAllEmojisMapFromEmojiContainer: getAllEmojisMapFromEmojiContainer,
  getNicknamesMapFromMembers: getNicknamesMapFromMembers,
  getMessageCreatedAt: getMessageCreatedAt,
  isSameGroup: isSameGroup,
  compareMessagesForGrouping: compareMessagesForGrouping,
  hasOwnProperty: hasOwnProperty,
  passUnsuccessfullMessages: passUnsuccessfullMessages,
  pxToNumber: pxToNumber,
  'default': getParsedStatus
});

var messagesInitialState = {
  initialized: false,
  loading: false,
  allMessages: [],
  currentGroupChannel: {
    members: []
  },
  // for scrollup
  hasMore: false,
  lastMessageTimeStamp: 0,
  // for scroll down
  // onScrollDownCallback is added for navigation to different timestamps on messageSearch
  // hasMoreToBottom, onScrollDownCallback -> scroll down
  // hasMore, onScrollCallback -> scroll up(default behavior)
  hasMoreToBottom: false,
  latestFetchedMessageTimeStamp: 0,
  emojiContainer: {},
  unreadCount: 0,
  unreadSince: null,
  isInvalid: false,
  messageListParams: null
};

const {
  SUCCEEDED,
  FAILED,
  PENDING
} = index.getSendingMessageStatus();
function reducer(state, action) {
  switch (action.type) {
    case RESET_STATE:
      return messagesInitialState;

    case RESET_MESSAGES:
      return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
        // when user switches channel, if the previous channel `hasMore`
        // the onScroll gets called twice, setting hasMore false prevents this
        hasMore: false,
        allMessages: []
      });

    case GET_PREV_MESSAGES_START:
      return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
        loading: true
      });

    case CLEAR_SENT_MESSAGES:
      return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
        allMessages: [...state.allMessages.filter(m => m.sendingStatus !== SUCCEEDED)]
      });

    case GET_PREV_MESSAGES_SUCESS:
      {
        const receivedMessages = action.payload.messages || [];
        const {
          currentGroupChannel = {}
        } = action.payload;
        const stateChannel = state.currentGroupChannel || {};
        const stateChannelUrl = stateChannel.url;
        const actionChannelUrl = currentGroupChannel.url;

        if (actionChannelUrl !== stateChannelUrl) {
          return state;
        } // remove duplicate messages


        const duplicatedMessageIds = [];
        const updatedAllMessages = state.allMessages.map(msg => {
          const duplicatedMessage = receivedMessages.find(_ref => {
            let {
              messageId
            } = _ref;
            return index$3.compareIds(messageId, msg.messageId);
          });

          if (!duplicatedMessage) {
            return msg;
          }

          duplicatedMessageIds.push(duplicatedMessage.messageId);
          return duplicatedMessage.updatedAt > msg.updatedAt ? duplicatedMessage : msg;
        });
        const filteredNewMessages = duplicatedMessageIds.length > 0 ? receivedMessages.filter(msg => !duplicatedMessageIds.find(messageId => index$3.compareIds(messageId, msg.messageId))) : receivedMessages;
        const hasHasMoreToBottom = hasOwnProperty('hasMoreToBottom')(action.payload);
        const hasLatestFetchedMessageTimeStamp = hasOwnProperty('latestFetchedMessageTimeStamp')(action.payload);
        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2(LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          loading: false,
          initialized: true,
          hasMore: action.payload.hasMore,
          lastMessageTimeStamp: action.payload.lastMessageTimeStamp
        }, hasHasMoreToBottom && {
          hasMoreToBottom: action.payload.hasMoreToBottom
        }), hasLatestFetchedMessageTimeStamp && {
          latestFetchedMessageTimeStamp: action.payload.latestFetchedMessageTimeStamp
        }), {}, {
          allMessages: [...filteredNewMessages, ...updatedAllMessages]
        });
      }

    case GET_NEXT_MESSAGES_SUCESS:
      {
        const receivedMessages = action.payload.messages || [];
        const {
          currentGroupChannel = {}
        } = action.payload;
        const stateChannel = state.currentGroupChannel || {};
        const stateChannelUrl = stateChannel.url;
        const actionChannelUrl = currentGroupChannel.url;

        if (actionChannelUrl !== stateChannelUrl) {
          return state;
        } // remove duplicate messages


        const duplicatedMessageIds = [];
        const updatedAllMessages = state.allMessages.map(msg => {
          const duplicatedMessage = receivedMessages.find(_ref2 => {
            let {
              messageId
            } = _ref2;
            return index$3.compareIds(messageId, msg.messageId);
          });

          if (!duplicatedMessage) {
            return msg;
          }

          duplicatedMessageIds.push(duplicatedMessage.messageId);
          return duplicatedMessage.updatedAt > msg.updatedAt ? duplicatedMessage : msg;
        });
        const filteredNewMessages = duplicatedMessageIds.length > 0 ? receivedMessages.filter(msg => !duplicatedMessageIds.find(messageId => index$3.compareIds(messageId, msg.messageId))) : receivedMessages;
        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          loading: false,
          initialized: true,
          hasMore: action.payload.hasMore,
          lastMessageTimeStamp: action.payload.lastMessageTimeStamp,
          hasMoreToBottom: action.payload.hasMoreToBottom,
          latestFetchedMessageTimeStamp: action.payload.latestFetchedMessageTimeStamp,
          allMessages: [...updatedAllMessages, ...filteredNewMessages]
        });
      }

    case GET_NEXT_MESSAGES_FAILURE:
      {
        return LocalizationContext._objectSpread2({}, state);
      }

    case SEND_MESSAGEGE_START:
      return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
        allMessages: [...state.allMessages, LocalizationContext._objectSpread2({}, action.payload)]
      });

    case SEND_MESSAGEGE_SUCESS:
      {
        const newMessages = state.allMessages.map(m => index$3.compareIds(m.reqId, action.payload.reqId) ? action.payload : m);
        [...newMessages].sort((a, b) => a.sendingStatus && b.sendingStatus && a.sendingStatus === SUCCEEDED && (b.sendingStatus === PENDING || b.sendingStatus === FAILED) ? -1 : 1);
        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          allMessages: newMessages
        });
      }

    case SEND_MESSAGEGE_FAILURE:
      {
        // eslint-disable-next-line no-param-reassign
        action.payload.failed = true;
        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          allMessages: state.allMessages.map(m => index$3.compareIds(m.reqId, action.payload.reqId) ? action.payload : m)
        });
      }

    case SET_CURRENT_CHANNEL:
      {
        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          currentGroupChannel: action.payload,
          isInvalid: false
        });
      }

    case SET_CHANNEL_INVALID:
      {
        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          isInvalid: true
        });
      }

    case UPDATE_UNREAD_COUNT:
      {
        const {
          channel
        } = action.payload;
        const {
          currentGroupChannel = {},
          unreadCount
        } = state;
        const currentGroupChannelUrl = currentGroupChannel.url;

        if (!index$3.compareIds(channel.url, currentGroupChannelUrl)) {
          return state;
        }

        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          unreadSince: unreadCount + 1
        });
      }

    case ON_MESSAGE_RECEIVED:
      {
        const {
          channel,
          message,
          scrollToEnd
        } = action.payload;
        let unreadCount = 0;
        const {
          currentGroupChannel = {},
          unreadSince
        } = state;
        const currentGroupChannelUrl = currentGroupChannel.url;

        if (!index$3.compareIds(channel.url, currentGroupChannelUrl)) {
          return state;
        } // Excluded overlapping messages


        if (state.allMessages.some(msg => msg.messageId === message.messageId)) {
          return state;
        } // Filter by userFilledQuery


        if (state.messageListParams && !index.filterMessageListParams(state.messageListParams, message)) {
          return state;
        }

        unreadCount = state.unreadCount + 1; // reset unreadCount if have to scrollToEnd

        if (scrollToEnd) {
          unreadCount = 0;
        }

        if (message.isAdminMessage && message.isAdminMessage()) {
          return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
            allMessages: passUnsuccessfullMessages(state.allMessages, message)
          });
        }

        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          unreadCount,
          unreadSince: unreadCount === 1 ? index$2.format(new Date(), 'p MMM dd') : unreadSince,
          allMessages: passUnsuccessfullMessages(state.allMessages, message)
        });
      }

    case ON_MESSAGE_UPDATED:
      {
        const {
          channel,
          message
        } = action.payload;
        const currentGroupChannelUrl = state.currentGroupChannel && state.currentGroupChannel.url || '';

        if (!index$3.compareIds(channel.url, currentGroupChannelUrl)) {
          return state; // Ignore event when it is not for the current channel
        }

        if (state.messageListParams && !index.filterMessageListParams(state.messageListParams, message)) {
          // Delete the message if it doesn't match to the params anymore
          return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
            allMessages: state.allMessages.filter(m => !index$3.compareIds(m.messageId, message === null || message === void 0 ? void 0 : message.messageId))
          });
        }

        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          allMessages: state.allMessages.map(m => index$3.compareIds(m.messageId, action.payload.message.messageId) ? action.payload.message : m)
        });
      }

    case ON_MESSAGE_THREAD_INFO_UPDATED:
      {
        const {
          channel,
          event
        } = action.payload;
        const {
          channelUrl,
          threadInfo,
          targetMessageId
        } = event;
        const currentGroupChannelUrl = state.currentGroupChannel && state.currentGroupChannel.url || '';

        if (!index$3.compareIds(channel.url, currentGroupChannelUrl) || !index$3.compareIds(channel.url, channelUrl)) {
          return state; // Ignore event when it is not for the current channel
        }

        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          allMessages: state.allMessages.map(m => {
            if (index$3.compareIds(m.messageId, targetMessageId)) {
              // eslint-disable-next-line no-param-reassign
              m.threadInfo = threadInfo; // Upsert threadInfo to the target message
            }

            return m;
          })
        });
      }

    case RESEND_MESSAGEGE_START:
      return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
        allMessages: state.allMessages.map(m => index$3.compareIds(m.reqId, action.payload.reqId) ? action.payload : m)
      });

    case MARK_AS_READ:
      return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
        unreadCount: 0,
        unreadSince: null
      });

    case ON_MESSAGE_DELETED:
      return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
        allMessages: state.allMessages.filter(m => !index$3.compareIds(m.messageId, action.payload))
      });

    case ON_MESSAGE_DELETED_BY_REQ_ID:
      return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
        allMessages: state.allMessages.filter(m => !index$3.compareIds(m.reqId, action.payload))
      });

    case SET_EMOJI_CONTAINER:
      {
        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          emojiContainer: action.payload
        });
      }

    case ON_REACTION_UPDATED:
      {
        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          allMessages: state.allMessages.map(m => {
            if (index$3.compareIds(m.messageId, action.payload.messageId)) {
              if (m.applyReactionEvent && typeof m.applyReactionEvent === 'function') {
                m.applyReactionEvent(action.payload);
              }

              return m;
            }

            return m;
          })
        });
      }

    case MESSAGE_LIST_PARAMS_CHANGED:
      {
        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          messageListParams: action.payload
        });
      }

    default:
      return state;
  }
}

/**
 * Handles ChannelEvents and send values to dispatcher using messagesDispatcher
 * messagesDispatcher: Dispatcher
 * sdk: sdkInstance
 * logger: loggerInstance
 * channelUrl: string
 * sdkInit: bool
 */

function useHandleChannelEvents(_ref, _ref2) {
  let {
    currentGroupChannel,
    sdkInit,
    hasMoreToBottom
  } = _ref;
  let {
    messagesDispatcher,
    sdk,
    logger,
    scrollRef,
    setQuoteMessage
  } = _ref2;
  const channelUrl = currentGroupChannel && (currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.url);
  React.useEffect(() => {
    const messageReceiverId = LocalizationContext.uuidv4();

    if (channelUrl && sdk && sdk.ChannelHandler) {
      const ChannelHandler = new sdk.ChannelHandler();
      logger.info('Channel | useHandleChannelEvents: Setup event handler', messageReceiverId);

      ChannelHandler.onMessageReceived = (channel, message) => {
        // donot update if hasMoreToBottom
        if (index$3.compareIds(channel.url, channelUrl) && !hasMoreToBottom) {
          let scrollToEnd = false;

          try {
            const {
              current
            } = scrollRef;
            scrollToEnd = current.offsetHeight + current.scrollTop >= current.scrollHeight;
          } catch (error) {//
          }

          logger.info('Channel | useHandleChannelEvents: onMessageReceived', message);
          messagesDispatcher({
            type: ON_MESSAGE_RECEIVED,
            payload: {
              channel,
              message,
              scrollToEnd
            }
          });

          if (scrollToEnd) {
            try {
              setTimeout(() => {
                try {
                  currentGroupChannel.markAsRead();
                } catch (_unused) {//
                }

                scrollIntoLast();
              });
            } catch (error) {
              logger.warning('Channel | onMessageReceived | scroll to end failed');
            }
          }
        }

        if (index$3.compareIds(channel.url, channelUrl) && hasMoreToBottom) {
          messagesDispatcher({
            type: UPDATE_UNREAD_COUNT,
            payload: {
              channel
            }
          });
        }
      };
      /**
       * We need to update current channel with the channel,
       * when onReadReceiptUpdated or onDeliveryReceiptUpdated are called,
       * because cachedReadReceiptStatus and cachedDeliveryReceiptStatus properties were changed
       */


      ChannelHandler.onReadReceiptUpdated = channel => {
        if (index$3.compareIds(channel.url, channelUrl)) {
          logger.info('Channel | useHandleChannelEvents: onReadReceiptUpdated', channel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: channel
          });
        }
      };

      ChannelHandler.onDeliveryReceiptUpdated = channel => {
        if (index$3.compareIds(channel.url, channelUrl)) {
          logger.info('Channel | useHandleChannelEvents: onDeliveryReceiptUpdated', channel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: channel
          });
        }
      };

      ChannelHandler.onMessageUpdated = (channel, message) => {
        logger.info('Channel | useHandleChannelEvents: onMessageUpdated', message);
        messagesDispatcher({
          type: ON_MESSAGE_UPDATED,
          payload: {
            channel,
            message
          }
        });
      };

      ChannelHandler.onThreadInfoUpdated = (channel, event) => {
        logger.info('Channel | useHandleChannelEvents: onThreadInfoUpdated', event);
        messagesDispatcher({
          type: ON_MESSAGE_THREAD_INFO_UPDATED,
          payload: {
            channel,
            event
          }
        });
      };

      ChannelHandler.onMessageDeleted = (_, messageId) => {
        logger.info('Channel | useHandleChannelEvents: onMessageDeleted', messageId);
        setQuoteMessage(null);
        messagesDispatcher({
          type: ON_MESSAGE_DELETED,
          payload: messageId
        });
      };

      ChannelHandler.onReactionUpdated = (_, reactionEvent) => {
        logger.info('Channel | useHandleChannelEvents: onReactionUpdated', reactionEvent);
        messagesDispatcher({
          type: ON_REACTION_UPDATED,
          payload: reactionEvent
        });
      };

      ChannelHandler.onChannelChanged = groupChannel => {
        if (index$3.compareIds(groupChannel.url, channelUrl)) {
          logger.info('Channel | useHandleChannelEvents: onChannelChanged', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onChannelFrozen = groupChannel => {
        if (index$3.compareIds(groupChannel.url, channelUrl)) {
          logger.info('Channel | useHandleChannelEvents: onChannelFrozen', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onChannelUnfrozen = groupChannel => {
        if (index$3.compareIds(groupChannel.url, channelUrl)) {
          logger.info('Channel | useHandleChannelEvents: onChannelUnFrozen', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onUserMuted = groupChannel => {
        if (index$3.compareIds(groupChannel.url, channelUrl)) {
          logger.info('Channel | useHandleChannelEvents: onUserMuted', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onUserUnmuted = groupChannel => {
        if (index$3.compareIds(groupChannel.url, channelUrl)) {
          logger.info('Channel | useHandleChannelEvents: onUserUnmuted', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onUserBanned = groupChannel => {
        if (index$3.compareIds(groupChannel.url, channelUrl)) {
          logger.info('Channel | useHandleChannelEvents: onUserBanned', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onOperatorUpdated = groupChannel => {
        if (index$3.compareIds(groupChannel.url, channelUrl)) {
          logger.info('Channel | useHandleChannelEvents: onOperatorUpdated', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      }; // Add this channel event handler to the SendBird object.


      sdk.addChannelHandler(messageReceiverId, ChannelHandler);
    }

    return () => {
      if (sdk && sdk.removeChannelHandler) {
        logger.info('Channel | useHandleChannelEvents: Removing message reciver handler', messageReceiverId);
        sdk.removeChannelHandler(messageReceiverId);
      }
    };
  }, [channelUrl, sdkInit]);
}

function useSetChannel(_ref, _ref2) {
  let {
    channelUrl,
    sdkInit
  } = _ref;
  let {
    messagesDispatcher,
    sdk,
    logger
  } = _ref2;
  React.useEffect(() => {
    if (channelUrl && sdkInit && sdk && sdk.GroupChannel) {
      logger.info('Channel | useSetChannel fetching channel', channelUrl);
      sdk.GroupChannel.getChannel(channelUrl).then(groupChannel => {
        logger.info('Channel | useSetChannel fetched channel', groupChannel);
        messagesDispatcher({
          type: SET_CURRENT_CHANNEL,
          payload: groupChannel
        });
        logger.info('Channel: Mark as read', groupChannel); // this order is important - this mark as read should update the event handler up above

        try {
          groupChannel.markAsRead();
        } catch (_unused) {//
        }
      }).catch(e => {
        logger.warning('Channel | useSetChannel fetch channel failed', {
          channelUrl,
          e
        });
        messagesDispatcher({
          type: SET_CHANNEL_INVALID
        });
      });
      sdk.getAllEmoji((emojiContainer_, err) => {
        if (err) {
          logger.error('Channel: Getting emojis failed', err);
          return;
        }

        logger.info('Channel: Getting emojis success', emojiContainer_);
        messagesDispatcher({
          type: SET_EMOJI_CONTAINER,
          payload: emojiContainer_
        });
      });
    }
  }, [channelUrl, sdkInit]);
}

const PREV_RESULT_SIZE = 30;
const NEXT_RESULT_SIZE = 10;

const getLatestMessageTimeStamp = function () {
  let messages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  const latestMessage = messages[messages.length - 1];
  return latestMessage && latestMessage.createdAt || null;
};

function useInitialMessagesFetch(_ref, _ref2) {
  let {
    currentGroupChannel,
    userFilledMessageListQuery,
    intialTimeStamp,
    replyType
  } = _ref;
  let {
    sdk,
    logger,
    messagesDispatcher
  } = _ref2;
  const channelUrl = currentGroupChannel && currentGroupChannel.url;
  React.useEffect(() => {
    logger.info('Channel useInitialMessagesFetch: Setup started', currentGroupChannel);
    messagesDispatcher({
      type: RESET_MESSAGES
    });

    if (sdk && sdk.MessageListParams && currentGroupChannel && currentGroupChannel.getMessagesByTimestamp) {
      const messageListParams = new sdk.MessageListParams();
      messageListParams.prevResultSize = PREV_RESULT_SIZE;
      messageListParams.isInclusive = true;
      messageListParams.includeReplies = false;
      messageListParams.includeReaction = true;

      if (replyType && replyType === 'QUOTE_REPLY') {
        messageListParams.includeThreadInfo = true;
        messageListParams.includeParentMessageInfo = true;
        messageListParams.replyType = 'only_reply_to_channel';
      }

      if (userFilledMessageListQuery) {
        Object.keys(userFilledMessageListQuery).forEach(key => {
          messageListParams[key] = userFilledMessageListQuery[key];
        });
      }

      if (replyType && replyType === 'QUOTE_REPLY' || userFilledMessageListQuery) {
        logger.info('Channel useInitialMessagesFetch: Setup messageListParams', messageListParams);
        messagesDispatcher({
          type: MESSAGE_LIST_PARAMS_CHANGED,
          payload: messageListParams
        });
      }

      logger.info('Channel: Fetching messages', {
        currentGroupChannel,
        userFilledMessageListQuery
      });
      messagesDispatcher({
        type: GET_PREV_MESSAGES_START
      });

      if (intialTimeStamp) {
        messageListParams.nextResultSize = NEXT_RESULT_SIZE;
        currentGroupChannel.getMessagesByTimestamp(intialTimeStamp, messageListParams).then(messages => {
          const hasMore = messages && messages.length > 0;
          const lastMessageTimeStamp = hasMore ? messages[0].createdAt : null;
          const latestFetchedMessageTimeStamp = getLatestMessageTimeStamp(messages); // to make sure there are no more messages below

          const nextMessageListParams = new sdk.MessageListParams();
          nextMessageListParams.nextResultSize = NEXT_RESULT_SIZE;
          nextMessageListParams.isInclusive = true;
          nextMessageListParams.includeReplies = false;
          nextMessageListParams.includeReaction = true;

          if (replyType && replyType === 'QUOTE_REPLY') {
            nextMessageListParams.includeThreadInfo = true;
            nextMessageListParams.includeParentMessageInfo = true;
            nextMessageListParams.replyType = 'only_reply_to_channel';
          }

          if (userFilledMessageListQuery) {
            Object.keys(userFilledMessageListQuery).forEach(key => {
              nextMessageListParams[key] = userFilledMessageListQuery[key];
            });
          }

          currentGroupChannel.getMessagesByTimestamp(latestFetchedMessageTimeStamp || new Date().getTime(), nextMessageListParams).then(nextMessages => {
            messagesDispatcher({
              type: GET_PREV_MESSAGES_SUCESS,
              payload: {
                messages,
                hasMore,
                lastMessageTimeStamp,
                currentGroupChannel,
                latestFetchedMessageTimeStamp,
                hasMoreToBottom: nextMessages && nextMessages.length > 0
              }
            });
          });
        }).catch(error => {
          logger.error('Channel: Fetching messages failed', error);
          messagesDispatcher({
            type: GET_PREV_MESSAGES_SUCESS,
            payload: {
              messages: [],
              hasMore: false,
              lastMessageTimeStamp: 0,
              currentGroupChannel
            }
          });
        }).finally(() => {
          if (!intialTimeStamp) {
            setTimeout(() => scrollIntoLast());
          }

          try {
            currentGroupChannel.markAsRead();
          } catch (_unused) {//
          }
        });
      } else {
        currentGroupChannel.getMessagesByTimestamp(new Date().getTime(), messageListParams).then(messages => {
          const hasMore = messages && messages.length > 0;
          const lastMessageTimeStamp = hasMore ? messages[0].createdAt : null;
          const latestFetchedMessageTimeStamp = getLatestMessageTimeStamp(messages);
          messagesDispatcher({
            type: GET_PREV_MESSAGES_SUCESS,
            payload: {
              messages,
              hasMore,
              lastMessageTimeStamp,
              currentGroupChannel,
              latestFetchedMessageTimeStamp,
              hasMoreToBottom: false
            }
          });
        }).catch(error => {
          logger.error('Channel: Fetching messages failed', error);
          messagesDispatcher({
            type: GET_PREV_MESSAGES_SUCESS,
            payload: {
              messages: [],
              hasMore: false,
              lastMessageTimeStamp: 0,
              currentGroupChannel
            }
          });
        }).finally(() => {
          if (!intialTimeStamp) {
            setTimeout(() => scrollIntoLast());
          }

          try {
            currentGroupChannel.markAsRead();
          } catch (_unused2) {//
          }
        });
      }
    }
  }, [channelUrl, userFilledMessageListQuery, intialTimeStamp]);
  /**
   * Note - useEffect(() => {}, [currentGroupChannel])
   * was buggy, that is why we did
   * const channelUrl = currentGroupChannel && currentGroupChannel.url;
   * useEffect(() => {}, [channelUrl])
   * Again, this hook is supposed to execute when currentGroupChannel changes
   * The 'channelUrl' here is not the same memory reference from Conversation.props
   */
}

function useHandleReconnect(_a, _b) {
  var isOnline = _a.isOnline,
      replyType = _a.replyType;
  var logger = _b.logger,
      sdk = _b.sdk,
      currentGroupChannel = _b.currentGroupChannel,
      messagesDispatcher = _b.messagesDispatcher,
      userFilledMessageListQuery = _b.userFilledMessageListQuery;
  React.useEffect(function () {
    var wasOffline = !isOnline;
    return function () {
      var _a; // state changed from offline to online


      if (wasOffline && (currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.url)) {
        logger.info('Refreshing conversation state');
        var useReaction = ((_a = sdk === null || sdk === void 0 ? void 0 : sdk.appInfo) === null || _a === void 0 ? void 0 : _a.isUsingReaction) || false;
        var messageListParams_1 = new sdk.MessageListParams();
        messageListParams_1.prevResultSize = 30;
        messageListParams_1.isInclusive = true;
        messageListParams_1.includeReplies = false;
        messageListParams_1.includeReaction = useReaction;

        if (replyType && replyType === 'QUOTE_REPLY') {
          messageListParams_1.includeThreadInfo = true;
          messageListParams_1.includeParentMessageInfo = true;
          messageListParams_1.replyType = 'only_reply_to_channel';
        }

        if (userFilledMessageListQuery) {
          Object.keys(userFilledMessageListQuery).forEach(function (key) {
            messageListParams_1[key] = userFilledMessageListQuery[key];
          });
        }

        logger.info('Channel: Fetching messages', {
          currentGroupChannel: currentGroupChannel,
          userFilledMessageListQuery: userFilledMessageListQuery
        });
        messagesDispatcher({
          type: GET_PREV_MESSAGES_START,
          payload: null
        });
        sdk.GroupChannel.getChannel(currentGroupChannel.url).then(function (groupChannel) {
          var lastMessageTime = new Date().getTime();
          groupChannel.getMessagesByTimestamp(lastMessageTime, messageListParams_1).then(function (messages) {
            messagesDispatcher({
              type: CLEAR_SENT_MESSAGES,
              payload: null
            });
            var hasMore = (messages === null || messages === void 0 ? void 0 : messages.length) > 0;
            var lastMessageTimeStamp = hasMore ? messages[0].createdAt : null;
            messagesDispatcher({
              type: GET_PREV_MESSAGES_SUCESS,
              payload: {
                messages: messages,
                hasMore: hasMore,
                lastMessageTimeStamp: lastMessageTimeStamp,
                currentGroupChannel: currentGroupChannel
              }
            });
            setTimeout(function () {
              return scrollIntoLast();
            });
          }).catch(function (error) {
            logger.error('Channel: Fetching messages failed', error);
          }).finally(function () {
            var _a;

            try {
              (_a = currentGroupChannel.markAsRead) === null || _a === void 0 ? void 0 : _a.call(currentGroupChannel);
            } catch (_b) {//
            }
          });
        });
      }
    };
  }, [isOnline, replyType]);
}

function useScrollCallback(_ref, _ref2) {
  let {
    currentGroupChannel,
    lastMessageTimeStamp,
    userFilledMessageListQuery,
    replyType
  } = _ref;
  let {
    hasMore,
    logger,
    messagesDispatcher,
    sdk
  } = _ref2;
  return React.useCallback(cb => {
    if (!hasMore) {
      return;
    }

    const {
      appInfo = {}
    } = sdk;
    const useReaction = appInfo.isUsingReaction || false;
    const messageListParams = new sdk.MessageListParams();
    messageListParams.prevResultSize = 30;
    messageListParams.isInclusive = true;
    messageListParams.includeReplies = false;
    messageListParams.includeReaction = useReaction;

    if (replyType && replyType === 'QUOTE_REPLY') {
      messageListParams.includeThreadInfo = true;
      messageListParams.includeParentMessageInfo = true;
      messageListParams.replyType = 'only_reply_to_channel';
    }

    if (userFilledMessageListQuery) {
      Object.keys(userFilledMessageListQuery).forEach(key => {
        messageListParams[key] = userFilledMessageListQuery[key];
      });
    }

    logger.info('Channel: Fetching messages', {
      currentGroupChannel,
      userFilledMessageListQuery
    });
    currentGroupChannel.getMessagesByTimestamp(lastMessageTimeStamp || new Date().getTime(), messageListParams).then(messages => {
      const hasMoreMessages = messages && messages.length > 0;
      const lastMessageTs = hasMoreMessages ? messages[0].createdAt : null;
      messagesDispatcher({
        type: GET_PREV_MESSAGES_SUCESS,
        payload: {
          messages,
          hasMore: hasMoreMessages,
          lastMessageTimeStamp: lastMessageTs,
          currentGroupChannel
        }
      });
      cb([messages, null]);
    }).catch(error => {
      logger.error('Channel: Fetching messages failed', error);
      messagesDispatcher({
        type: GET_PREV_MESSAGES_SUCESS,
        payload: {
          messages: [],
          hasMore: false,
          lastMessageTimeStamp: 0,
          currentGroupChannel
        }
      });
      cb([null, error]);
    }).finally(() => {
      try {
        currentGroupChannel.markAsRead();
      } catch (_unused) {//
      }
    });
  }, [currentGroupChannel, lastMessageTimeStamp, replyType]);
}

const RESULT_SIZE = 30;

function useScrollDownCallback(_ref, _ref2) {
  let {
    currentGroupChannel,
    latestFetchedMessageTimeStamp,
    userFilledMessageListQuery,
    hasMoreToBottom,
    replyType
  } = _ref;
  let {
    logger,
    messagesDispatcher,
    sdk
  } = _ref2;
  return React.useCallback(cb => {
    if (!hasMoreToBottom) {
      return;
    }

    const {
      appInfo = {}
    } = sdk;
    const useReaction = appInfo.isUsingReaction || false;
    const messageListParams = new sdk.MessageListParams();
    messageListParams.nextResultSize = RESULT_SIZE;
    messageListParams.isInclusive = true;
    messageListParams.includeReplies = false;
    messageListParams.includeReaction = useReaction;

    if (replyType && replyType === 'QUOTE_REPLY') {
      messageListParams.includeThreadInfo = true;
      messageListParams.includeParentMessageInfo = true;
      messageListParams.replyType = 'only_reply_to_channel';
    }

    if (userFilledMessageListQuery) {
      Object.keys(userFilledMessageListQuery).forEach(key => {
        messageListParams[key] = userFilledMessageListQuery[key];
      });
    }

    logger.info('Channel: Fetching later messages', {
      currentGroupChannel,
      userFilledMessageListQuery
    });
    currentGroupChannel.getMessagesByTimestamp(latestFetchedMessageTimeStamp || new Date().getTime(), messageListParams).then(messages => {
      const messagesLength = messages && messages.length || 0;
      const hasMoreMessages = messagesLength > 0 && messageListParams.nextResultSize === messagesLength;
      const lastMessageTs = hasMoreMessages ? messages[messages.length - 1].createdAt : null;
      messagesDispatcher({
        type: GET_NEXT_MESSAGES_SUCESS,
        payload: {
          messages,
          hasMoreToBottom: hasMoreMessages,
          latestFetchedMessageTimeStamp: lastMessageTs,
          currentGroupChannel
        }
      });
      cb([messages, null]);
    }).catch(error => {
      logger.error('Channel: Fetching later messages failed', error);
      messagesDispatcher({
        type: GET_NEXT_MESSAGES_FAILURE,
        payload: {
          messages: [],
          hasMoreToBottom: false,
          latestFetchedMessageTimeStamp: 0,
          currentGroupChannel
        }
      });
      cb([null, error]);
    }).finally(() => {
      try {
        currentGroupChannel.markAsRead();
      } catch (_unused) {//
      }
    });
  }, [currentGroupChannel, latestFetchedMessageTimeStamp, hasMoreToBottom, replyType]);
}

function useDeleteMessageCallback(_ref, _ref2) {
  let {
    currentGroupChannel,
    messagesDispatcher
  } = _ref;
  let {
    logger
  } = _ref2;
  return React.useCallback((message, cb) => {
    logger.info('Channel | useDeleteMessageCallback: Deleting message', message);
    const {
      requestState
    } = message;
    logger.info('Channel | useDeleteMessageCallback: Deleting message requestState:', requestState); // Message is only on local

    if (requestState === 'failed' || requestState === 'pending') {
      logger.info('Channel | useDeleteMessageCallback: Deleted message from local:', message);
      messagesDispatcher({
        type: ON_MESSAGE_DELETED_BY_REQ_ID,
        payload: message.reqId
      });

      if (cb) {
        cb();
      }

      return;
    } // Message is on server


    currentGroupChannel.deleteMessage(message, err => {
      logger.info('Channel | useDeleteMessageCallback: Deleting message from remote:', requestState);

      if (cb) {
        cb(err);
      }

      if (!err) {
        logger.info('Channel | useDeleteMessageCallback: Deleting message success!', message);
        messagesDispatcher({
          type: ON_MESSAGE_DELETED,
          payload: message.messageId
        });
      } else {
        logger.warning('Channel | useDeleteMessageCallback: Deleting message failed!', err);
      }
    });
  }, [currentGroupChannel, messagesDispatcher]);
}

function useUpdateMessageCallback(_ref, _ref2) {
  let {
    currentGroupChannel,
    messagesDispatcher,
    onBeforeUpdateUserMessage
  } = _ref;
  let {
    logger,
    pubSub,
    sdk
  } = _ref2;
  return React.useCallback((messageId, text, cb) => {
    const createParamsDefault = txt => {
      const params = new sdk.UserMessageParams();
      params.message = txt;
      return params;
    };

    const createCustomPrams = onBeforeUpdateUserMessage && typeof onBeforeUpdateUserMessage === 'function';

    if (createCustomPrams) {
      logger.info('Channel: creating params using onBeforeUpdateUserMessage', onBeforeUpdateUserMessage);
    }

    const params = onBeforeUpdateUserMessage ? onBeforeUpdateUserMessage(text) : createParamsDefault(text);
    currentGroupChannel.updateUserMessage(messageId, params, (r, e) => {
      logger.info('Channel: Updating message!', params);
      const swapParams = sdk.getErrorFirstCallback();
      let message = r;
      let err = e;

      if (swapParams) {
        message = e;
        err = r;
      }

      if (cb) {
        cb(err, message);
      }

      if (!err) {
        logger.info('Channel: Updating message success!', message);
        messagesDispatcher({
          type: ON_MESSAGE_UPDATED,
          payload: {
            channel: currentGroupChannel,
            message
          }
        });
        pubSub.publish(index$1.UPDATE_USER_MESSAGE, {
          message,
          channel: currentGroupChannel
        });
      } else {
        logger.warning('Channel: Updating message failed!', err);
      }
    });
  }, [currentGroupChannel.url, messagesDispatcher, onBeforeUpdateUserMessage]);
}

function useResendMessageCallback(_ref, _ref2) {
  let {
    currentGroupChannel,
    messagesDispatcher
  } = _ref;
  let {
    logger
  } = _ref2;
  return React.useCallback(failedMessage => {
    logger.info('Channel: Resending message has started', failedMessage);
    const {
      messageType,
      file
    } = failedMessage;

    if (failedMessage && typeof failedMessage.isResendable === 'function' && failedMessage.isResendable()) {
      // eslint-disable-next-line no-param-reassign
      failedMessage.requestState = 'pending';
      messagesDispatcher({
        type: RESEND_MESSAGEGE_START,
        payload: failedMessage
      }); // userMessage

      if (messageType === 'user') {
        currentGroupChannel.resendUserMessage(failedMessage).then(message => {
          logger.info('Channel: Resending message success!', {
            message
          });
          messagesDispatcher({
            type: SEND_MESSAGEGE_SUCESS,
            payload: message
          });
        }).catch(e => {
          logger.warning('Channel: Resending message failed!', {
            e
          }); // eslint-disable-next-line no-param-reassign

          failedMessage.requestState = 'failed';
          messagesDispatcher({
            type: SEND_MESSAGEGE_FAILURE,
            payload: failedMessage
          });
        }); // eslint-disable-next-line no-param-reassign

        failedMessage.requestState = 'pending';
        messagesDispatcher({
          type: RESEND_MESSAGEGE_START,
          payload: failedMessage
        });
        return;
      }

      if (messageType === 'file') {
        currentGroupChannel.resendFileMessage(failedMessage, file).then(message => {
          logger.info('Channel: Resending file message success!', {
            message
          });
          messagesDispatcher({
            type: SEND_MESSAGEGE_SUCESS,
            payload: message
          });
        }).catch(e => {
          logger.warning('Channel: Resending file message failed!', {
            e
          }); // eslint-disable-next-line no-param-reassign

          failedMessage.requestState = 'failed';
          messagesDispatcher({
            type: SEND_MESSAGEGE_FAILURE,
            payload: failedMessage
          });
        }); // eslint-disable-next-line no-param-reassign

        failedMessage.requestState = 'pending';
        messagesDispatcher({
          type: RESEND_MESSAGEGE_START,
          payload: failedMessage
        });
      }
    } else {
      // to alert user on console
      // eslint-disable-next-line no-console
      console.error('Message is not resendable');
      logger.warning('Message is not resendable', failedMessage);
    }
  }, [currentGroupChannel, messagesDispatcher]);
}

function useSendMessageCallback(_ref, _ref2) {
  let {
    currentGroupChannel,
    onBeforeSendUserMessage
  } = _ref;
  let {
    sdk,
    logger,
    pubSub,
    messagesDispatcher
  } = _ref2;
  const messageInputRef = React.useRef(null);
  const sendMessage = React.useCallback(function () {
    let quoteMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    const text = messageInputRef.current.value;

    const createParamsDefault = txt => {
      const message = typeof txt === 'string' ? txt.trim() : txt;
      const params = new sdk.UserMessageParams();
      params.message = message;

      if (quoteMessage) {
        params.isReplyToChannel = true;
        params.parentMessageId = quoteMessage.messageId;
      }

      return params;
    };

    const createCustomPrams = onBeforeSendUserMessage && typeof onBeforeSendUserMessage === 'function';

    if (createCustomPrams) {
      logger.info('Channel: creating params using onBeforeSendUserMessage', onBeforeSendUserMessage);
    }

    const params = onBeforeSendUserMessage ? onBeforeSendUserMessage(text, quoteMessage) : createParamsDefault(text);
    logger.info('Channel: Sending message has started', params);
    const pendingMsg = currentGroupChannel.sendUserMessage(params, (res, err) => {
      const swapParams = sdk.getErrorFirstCallback();
      let message = res;
      let error = err;

      if (swapParams) {
        message = err;
        error = res;
      } // sending params instead of pending message
      // to make sure that we can resend the message once it fails


      if (error) {
        logger.warning('Channel: Sending message failed!', {
          message
        });
        messagesDispatcher({
          type: SEND_MESSAGEGE_FAILURE,
          payload: message
        });
        return;
      }

      logger.info('Channel: Sending message success!', message);
      messagesDispatcher({
        type: SEND_MESSAGEGE_SUCESS,
        payload: message
      });
    });
    pubSub.publish(index$1.SEND_MESSAGE_START, {
      /* pubSub is used instead of messagesDispatcher
        to avoid redundantly calling `messageActionTypes.SEND_MESSAGEGE_START` */
      message: pendingMsg,
      channel: currentGroupChannel
    });
    setTimeout(() => scrollIntoLast());
  }, [currentGroupChannel, onBeforeSendUserMessage]);
  return [messageInputRef, sendMessage];
}

function useSendFileMessageCallback(_ref, _ref2) {
  let {
    currentGroupChannel,
    onBeforeSendFileMessage,
    imageCompression = {}
  } = _ref;
  let {
    sdk,
    logger,
    pubSub,
    messagesDispatcher
  } = _ref2;
  const sendMessage = React.useCallback(function (file) {
    let quoteMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    const {
      compressionRate,
      resizingWidth,
      resizingHeight
    } = imageCompression;
    const createCustomParams = onBeforeSendFileMessage && typeof onBeforeSendFileMessage === 'function';
    const compressibleFileType = file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg';
    const compressibleRatio = compressionRate > 0 && compressionRate < 1; // pxToNumber returns null if values are invalid

    const compressibleDiamensions = pxToNumber(resizingWidth) || pxToNumber(resizingHeight);
    const canCompressImage = compressibleFileType && (compressibleRatio || compressibleDiamensions);

    const createParamsDefault = file_ => {
      const params = new sdk.FileMessageParams();
      params.file = file_;

      if (quoteMessage) {
        params.isReplyToChannel = true;
        params.parentMessageId = quoteMessage.messageId;
      }

      return params;
    };

    if (canCompressImage) {
      // Using image compression
      try {
        const image = document.createElement('img');
        image.src = URL.createObjectURL(file);

        image.onload = () => {
          URL.revokeObjectURL(image.src);
          const canvas = document.createElement('canvas');
          const imageWdith = image.naturalWidth || image.width;
          const imageHeight = image.naturalHeight || image.height;
          let targetWidth = pxToNumber(resizingWidth) || imageWdith;
          let targetHeight = pxToNumber(resizingHeight) || imageHeight; // In canvas.toBlob(callback, mimeType, qualityArgument)
          // qualityArgument doesnt work
          // so in case compressibleDiamensions are not present, we use ratio

          if (file.type === 'image/png' && !compressibleDiamensions) {
            targetWidth *= compressionRate;
            targetHeight *= compressionRate;
          }

          canvas.width = targetWidth;
          canvas.height = targetHeight;
          const context = canvas.getContext('2d');
          context.drawImage(image, 0, 0, targetWidth, targetHeight);
          context.canvas.toBlob(newImageBlob => {
            const compressedFile = new File([newImageBlob], file.name, {
              type: file.type
            });

            if (createCustomParams) {
              logger.info('Channel: Creating params using onBeforeSendFileMessage', onBeforeSendFileMessage);
            }

            const params = createCustomParams ? onBeforeSendFileMessage(compressedFile, quoteMessage) : createParamsDefault(compressedFile);
            logger.info('Channel: Uploading file message start!', params);
            const pendingMessage = currentGroupChannel.sendFileMessage(params, (response, err) => {
              const swapParams = sdk.getErrorFirstCallback();
              const [message, error] = swapParams ? [err, response] : [response, err];

              if (error) {
                // sending params instead of pending message
                // to make sure that we can resend the message once it fails
                logger.error('Channel: Sending file message failed!', {
                  message,
                  error
                });
                message.localUrl = URL.createObjectURL(compressedFile);
                message.file = compressedFile;
                messagesDispatcher({
                  type: SEND_MESSAGEGE_FAILURE,
                  payload: message
                });
                return;
              }

              logger.info('Channel: Sending file message success!', message);
              messagesDispatcher({
                type: SEND_MESSAGEGE_SUCESS,
                payload: message
              });
            });
            pubSub.publish(index$1.SEND_MESSAGE_START, {
              /* pubSub is used instead of messagesDispatcher
                to avoid redundantly calling `messageActionTypes.SEND_MESSAGEGE_START` */
              message: LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, pendingMessage), {}, {
                url: URL.createObjectURL(compressedFile),
                // pending thumbnail message seems to be failed
                requestState: 'pending'
              }),
              channel: currentGroupChannel
            });
            setTimeout(() => scrollIntoLast(), 1000);
          }, file.type, compressionRate);
        };
      } catch (error) {
        logger.error('Channel: Sending file message failed!', error);
      }
    } else {
      // Not using image compression
      if (createCustomParams) {
        logger.info('Channel: creating params using onBeforeSendFileMessage', onBeforeSendFileMessage);
      }

      const params = onBeforeSendFileMessage ? onBeforeSendFileMessage(file, quoteMessage) : createParamsDefault(file);
      logger.info('Channel: Uploading file message start!', params);
      const pendingMsg = currentGroupChannel.sendFileMessage(params, (response, err) => {
        const swapParams = sdk.getErrorFirstCallback();
        const [message, error] = swapParams ? [err, response] : [response, err];

        if (error) {
          // sending params instead of pending message
          // to make sure that we can resend the message once it fails
          logger.error('Channel: Sending file message failed!', {
            message,
            error
          });
          message.localUrl = URL.createObjectURL(file);
          message.file = file;
          messagesDispatcher({
            type: SEND_MESSAGEGE_FAILURE,
            payload: message
          });
          return;
        }

        logger.info('Channel: Sending message success!', message);
        messagesDispatcher({
          type: SEND_MESSAGEGE_SUCESS,
          payload: message
        });
      });
      pubSub.publish(index$1.SEND_MESSAGE_START, {
        /* pubSub is used instead of messagesDispatcher
          to avoid redundantly calling `messageActionTypes.SEND_MESSAGEGE_START` */
        message: LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, pendingMsg), {}, {
          url: URL.createObjectURL(file),
          // pending thumbnail message seems to be failed
          requestState: 'pending'
        }),
        channel: currentGroupChannel
      });
      setTimeout(() => scrollIntoLast(), 1000);
    }
  }, [currentGroupChannel, onBeforeSendFileMessage, imageCompression]);
  return [sendMessage];
}

const ReactionButton = /*#__PURE__*/React__default["default"].forwardRef((props, ref) => {
  const {
    className,
    width,
    height,
    selected,
    onClick,
    children
  } = props;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: [...(Array.isArray(className) ? className : [className]), `sendbird-reaction-button${selected ? '--selected' : ''}`].join(' '),
    ref: ref,
    role: "button",
    style: {
      width: typeof width === 'string' ? `${width.slice(0, -2) - 2}px` : `${width - 2}px`,
      height: typeof height === 'string' ? `${height.slice(0, -2) - 2}px` : `${height - 2}px`
    },
    onClick: e => onClick(e),
    onKeyDown: e => onClick(e),
    tabIndex: 0
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-reaction-button__inner"
  }, children));
});
ReactionButton.propTypes = {
  className: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].arrayOf(PropTypes__default["default"].string)]),
  width: PropTypes__default["default"].oneOfType([PropTypes__default["default"].number, PropTypes__default["default"].string]),
  height: PropTypes__default["default"].oneOfType([PropTypes__default["default"].number, PropTypes__default["default"].string]),
  selected: PropTypes__default["default"].bool,
  onClick: PropTypes__default["default"].func,
  children: PropTypes__default["default"].element.isRequired
};
ReactionButton.defaultProps = {
  className: '',
  width: '36px',
  height: '36px',
  selected: false,
  onClick: () => {}
};

function useMemoizedEmojiListItems(_ref, _ref2) {
  let {
    emojiContainer,
    toggleReaction
  } = _ref;
  let {
    useReaction,
    logger,
    userId,
    emojiAllList
  } = _ref2;

  /* eslint-disable react/prop-types */
  return React.useMemo(() => _ref3 => {
    let {
      parentRef,
      parentContainRef,
      message,
      closeDropdown,
      spaceFromTrigger = {}
    } = _ref3;

    if (!useReaction || !(parentRef || parentContainRef || message || closeDropdown)) {
      logger.warning('Channel: Invalid Params in memoizedEmojiListItems');
      return null;
    }

    return /*#__PURE__*/React__default["default"].createElement(index$1.EmojiListItems, {
      parentRef: parentRef,
      parentContainRef: parentContainRef,
      closeDropdown: closeDropdown,
      spaceFromTrigger: spaceFromTrigger
    }, emojiAllList.map(emoji => {
      const reactedReaction = message.reactions.filter(reaction => reaction.key === emoji.key)[0];
      const isReacted = reactedReaction ? !(reactedReaction.userIds.indexOf(userId) < 0) : false;
      return /*#__PURE__*/React__default["default"].createElement(ReactionButton, {
        key: emoji.key,
        width: "36px",
        height: "36px",
        selected: isReacted,
        onClick: () => {
          closeDropdown();
          toggleReaction(message, emoji.key, isReacted);
        }
      }, /*#__PURE__*/React__default["default"].createElement(index$4.ImageRenderer, {
        url: emoji.url,
        width: "28px",
        height: "28px",
        defaultComponent: /*#__PURE__*/React__default["default"].createElement(index$4.Icon, {
          width: "28px",
          height: "28px",
          type: index$4.IconTypes.QUESTION
        })
      }));
    }));
  }, [emojiContainer, toggleReaction]);
}

function useToggleReactionCallback(_ref, _ref2) {
  let {
    currentGroupChannel
  } = _ref;
  let {
    logger
  } = _ref2;
  return React.useCallback((message, key, isReacted) => {
    if (isReacted) {
      currentGroupChannel.deleteReaction(message, key).then(res => {
        logger.info('Delete reaction success', res);
      }).catch(err => {
        logger.warning('Delete reaction failed', err);
      });
      return;
    }

    currentGroupChannel.addReaction(message, key).then(res => {
      logger.info('Add reaction success', res);
    }).catch(err => {
      logger.warning('Add reaction failed', err);
    });
  }, [currentGroupChannel]);
}

function useScrollToMessage(_a, _b) {
  var setIntialTimeStamp = _a.setIntialTimeStamp,
      setAnimatedMessageId = _a.setAnimatedMessageId,
      allMessages = _a.allMessages;
  var logger = _b.logger;
  return React.useCallback(function (createdAt, messageId) {
    var isPresent = allMessages.find(function (m) {
      return m.messageId === messageId;
    });
    setAnimatedMessageId(null);
    setTimeout(function () {
      if (isPresent) {
        logger.info('Channel: scroll to message - message is present');
        setAnimatedMessageId(messageId);
      } else {
        logger.info('Channel: scroll to message - fetching older messages');
        setIntialTimeStamp(null);
        setIntialTimeStamp(createdAt);
        setAnimatedMessageId(messageId);
      }
    });
  }, [setIntialTimeStamp, setAnimatedMessageId, allMessages]);
}

const MessageStatusTypes = index.getOutgoingMessageStates();
function MessageStatus(_ref) {
  var _channel$getUnreadMem, _channel$getUndeliver;

  let {
    className,
    message,
    channel
  } = _ref;
  const {
    dateLocale
  } = React.useContext(LocalizationContext.LocalizationContext);
  const showMessageStatusIcon = (channel === null || channel === void 0 ? void 0 : channel.isGroupChannel()) && !(channel !== null && channel !== void 0 && channel.isSuper) && !(channel !== null && channel !== void 0 && channel.isPublic) && !(channel !== null && channel !== void 0 && channel.isBroadcast);
  const iconType = {
    [MessageStatusTypes.SENT]: index$4.IconTypes.DONE,
    [MessageStatusTypes.DELIVERED]: index$4.IconTypes.DONE_ALL,
    [MessageStatusTypes.READ]: index$4.IconTypes.DONE_ALL,
    [MessageStatusTypes.FAILED]: index$4.IconTypes.ERROR
  };
  const iconColor = {
    [MessageStatusTypes.SENT]: index$4.IconColors.SENT,
    [MessageStatusTypes.DELIVERED]: index$4.IconColors.SENT,
    [MessageStatusTypes.READ]: index$4.IconColors.READ,
    [MessageStatusTypes.FAILED]: index$4.IconColors.ERROR
  };
  const messageStatus = React.useMemo(() => index.getOutgoingMessageState(channel, message), [channel === null || channel === void 0 ? void 0 : (_channel$getUnreadMem = channel.getUnreadMemberCount) === null || _channel$getUnreadMem === void 0 ? void 0 : _channel$getUnreadMem.call(channel, message), channel === null || channel === void 0 ? void 0 : (_channel$getUndeliver = channel.getUndeliveredMemberCount) === null || _channel$getUndeliver === void 0 ? void 0 : _channel$getUndeliver.call(channel, message)]);
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: [...(Array.isArray(className) ? className : [className]), 'sendbird-message-status'].join(' ')
  }, showMessageStatusIcon && (messageStatus === MessageStatusTypes.PENDING ? /*#__PURE__*/React__default["default"].createElement(index$4.Loader, {
    className: "sendbird-message-status__icon",
    width: "16px",
    height: "16px"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Icon, {
    type: index$4.IconTypes.SPINNER,
    fillColor: index$4.IconColors.PRIMARY,
    width: "16px",
    height: "16px"
  })) : /*#__PURE__*/React__default["default"].createElement(index$4.Icon, {
    className: "sendbird-message-status__icon",
    type: iconType[messageStatus] || index$4.IconTypes.ERROR,
    fillColor: iconColor[messageStatus],
    width: "16px",
    height: "16px"
  })), index.isSentStatus(messageStatus) && /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
    className: "sendbird-message-status__text",
    type: index$4.LabelTypography.CAPTION_3,
    color: index$4.LabelColors.ONBACKGROUND_2
  }, index$2.format(message === null || message === void 0 ? void 0 : message.createdAt, 'p', {
    locale: dateLocale
  })));
}
MessageStatus.propTypes = {
  className: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].arrayOf(PropTypes__default["default"].string)]),
  message: PropTypes__default["default"].shape({
    createdAt: PropTypes__default["default"].number,
    sender: PropTypes__default["default"].shape({
      friendName: PropTypes__default["default"].string,
      nickname: PropTypes__default["default"].string,
      userId: PropTypes__default["default"].string,
      profileUrl: PropTypes__default["default"].string
    }),
    sendingStatus: PropTypes__default["default"].string
  }),
  channel: PropTypes__default["default"].shape({
    isGroupChannel: PropTypes__default["default"].func,
    isSuper: PropTypes__default["default"].bool,
    isBroadcast: PropTypes__default["default"].bool,
    isPublic: PropTypes__default["default"].bool,
    getUnreadMemberCount: PropTypes__default["default"].func,
    getUndeliveredMemberCount: PropTypes__default["default"].func
  })
};
MessageStatus.defaultProps = {
  className: '',
  message: null,
  channel: null
};

function MessageItemMenu(_a) {
  var _b;

  var className = _a.className,
      message = _a.message,
      channel = _a.channel,
      _c = _a.isByMe,
      isByMe = _c === void 0 ? false : _c,
      _d = _a.disabled,
      disabled = _d === void 0 ? false : _d,
      replyType = _a.replyType,
      showEdit = _a.showEdit,
      showRemove = _a.showRemove,
      resendMessage = _a.resendMessage,
      setQuoteMessage = _a.setQuoteMessage,
      setSupposedHover = _a.setSupposedHover;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  var triggerRef = React.useRef(null);
  var containerRef = React.useRef(null);
  var showMenuItemCopy = index.isUserMessage(message);
  var showMenuItemReply = replyType === 'QUOTE_REPLY' && !index.isFailedMessage(channel, message) && !index.isPendingMessage(channel, message);
  var showMenuItemEdit = index.isUserMessage(message) && index.isSentMessage(channel, message) && isByMe;
  var showMenuItemResend = index.isFailedMessage(channel, message) && ((_b = message === null || message === void 0 ? void 0 : message.isResendable) === null || _b === void 0 ? void 0 : _b.call(message)) && isByMe;
  var showMenuItemDelete = !index.isPendingMessage(channel, message) && isByMe;

  if (!(showMenuItemCopy || showMenuItemReply || showMenuItemEdit || showMenuItemResend || showMenuItemDelete)) {
    return null;
  }

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName([className, 'sendbird-message-item-menu']),
    ref: containerRef
  }, /*#__PURE__*/React__default["default"].createElement(index$1.ContextMenu, {
    menuTrigger: function (toggleDropdown) {
      return /*#__PURE__*/React__default["default"].createElement(index$1.IconButton, {
        className: "sendbird-message-item-menu__trigger",
        ref: triggerRef,
        width: "32px",
        height: "32px",
        onClick: function () {
          toggleDropdown();
          setSupposedHover(true);
        },
        onBlur: function () {
          setSupposedHover(false);
        }
      }, /*#__PURE__*/React__default["default"].createElement(index$4.Icon, {
        className: "sendbird-message-item-menu__trigger__icon",
        type: index$4.IconTypes.MORE,
        fillColor: index$4.IconColors.CONTENT_INVERSE,
        width: "24px",
        height: "24px"
      }));
    },
    menuItems: function (close) {
      var _a;

      var closeDropdown = function () {
        close();
        setSupposedHover(false);
      };

      return /*#__PURE__*/React__default["default"].createElement(index$1.MenuItems, {
        className: "sendbird-message-item-menu__list",
        parentRef: triggerRef,
        parentContainRef: containerRef,
        closeDropdown: closeDropdown,
        openLeft: isByMe
      }, showMenuItemCopy && /*#__PURE__*/React__default["default"].createElement(index$1.MenuItem, {
        className: "sendbird-message-item-menu__list__menu-item menu-item-copy",
        onClick: function () {
          index.copyToClipboard(message === null || message === void 0 ? void 0 : message.message);
          closeDropdown();
        }
      }, stringSet.MESSAGE_MENU__COPY), showMenuItemReply && /*#__PURE__*/React__default["default"].createElement(index$1.MenuItem, {
        className: "sendbird-message-item-menu__list__menu-item menu-item-reply",
        onClick: function () {
          setQuoteMessage(message);
          closeDropdown();
        },
        disable: (message === null || message === void 0 ? void 0 : message.parentMessageId) > 0
      }, stringSet.MESSAGE_MENU__REPLY), showMenuItemEdit && /*#__PURE__*/React__default["default"].createElement(index$1.MenuItem, {
        className: "sendbird-message-item-menu__list__menu-item menu-item-edit",
        onClick: function () {
          if (!disabled) {
            showEdit(true);
            closeDropdown();
          }
        }
      }, stringSet.MESSAGE_MENU__EDIT), showMenuItemResend && /*#__PURE__*/React__default["default"].createElement(index$1.MenuItem, {
        className: "sendbird-message-item-menu__list__menu-item menu-item-resend",
        onClick: function () {
          if (!disabled) {
            resendMessage(message);
            closeDropdown();
          }
        }
      }, stringSet.MESSAGE_MENU__RESEND), showMenuItemDelete && /*#__PURE__*/React__default["default"].createElement(index$1.MenuItem, {
        className: "sendbird-message-item-menu__list__menu-item menu-item-delete",
        onClick: function () {
          if (!disabled) {
            showRemove(true);
            closeDropdown();
          }
        },
        disable: ((_a = message === null || message === void 0 ? void 0 : message.threadInfo) === null || _a === void 0 ? void 0 : _a.replyCount) > 0
      }, stringSet.MESSAGE_MENU__DELETE));
    }
  }));
}

function MessageItemReactionMenu(_a) {
  var className = _a.className,
      message = _a.message,
      channel = _a.channel,
      userId = _a.userId,
      _b = _a.spaceFromTrigger,
      spaceFromTrigger = _b === void 0 ? {} : _b,
      emojiContainer = _a.emojiContainer,
      toggleReaction = _a.toggleReaction,
      setSupposedHover = _a.setSupposedHover;
  var triggerRef = React.useRef(null);
  var containerRef = React.useRef(null);

  if (index.isPendingMessage(channel, message) || index.isFailedMessage(channel, message)) {
    return null;
  }

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName([className, 'sendbird-message-item-reaction-menu']),
    ref: containerRef
  }, /*#__PURE__*/React__default["default"].createElement(index$1.ContextMenu, {
    menuTrigger: function (toggleDropdown) {
      return /*#__PURE__*/React__default["default"].createElement(index$1.IconButton, {
        className: "sendbird-message-item-reaction-menu__trigger",
        ref: triggerRef,
        width: "32px",
        height: "32px",
        onClick: function () {
          toggleDropdown();
          setSupposedHover(true);
        },
        onBlur: function () {
          setSupposedHover(false);
        }
      }, /*#__PURE__*/React__default["default"].createElement(index$4.Icon, {
        className: "sendbird-message-item-reaction-menu__trigger__icon",
        type: index$4.IconTypes.EMOJI_MORE,
        fillColor: index$4.IconColors.CONTENT_INVERSE,
        width: "24px",
        height: "24px"
      }));
    },
    menuItems: function (close) {
      var closeDropdown = function () {
        close();
        setSupposedHover(false);
      };

      return /*#__PURE__*/React__default["default"].createElement(index$1.EmojiListItems, {
        parentRef: triggerRef,
        parentContainRef: containerRef,
        closeDropdown: closeDropdown,
        spaceFromTrigger: spaceFromTrigger
      }, index.getEmojiListAll(emojiContainer).map(function (emoji) {
        var _a, _b, _c;

        var isReacted = (_c = (_b = (_a = message === null || message === void 0 ? void 0 : message.reactions) === null || _a === void 0 ? void 0 : _a.filter(function (reaction) {
          return reaction.key === emoji.key;
        })[0]) === null || _b === void 0 ? void 0 : _b.userIds) === null || _c === void 0 ? void 0 : _c.some(function (reactorId) {
          return reactorId === userId;
        });
        return /*#__PURE__*/React__default["default"].createElement(ReactionButton, {
          key: emoji.key,
          width: "36px",
          height: "36px",
          selected: isReacted,
          onClick: function () {
            closeDropdown();
            toggleReaction(message, emoji.key, isReacted);
          }
        }, /*#__PURE__*/React__default["default"].createElement(index$4.ImageRenderer, {
          url: emoji.url,
          width: "28px",
          height: "28px",
          placeHolder: function (style) {
            return /*#__PURE__*/React__default["default"].createElement("div", {
              style: style
            }, /*#__PURE__*/React__default["default"].createElement(index$4.Icon, {
              type: index$4.IconTypes.QUESTION,
              fillColor: index$4.IconColors.ON_BACKGROUND_3,
              width: "28px",
              height: "28px"
            }));
          }
        }));
      }));
    }
  }));
}

function Tooltip(_ref) {
  let {
    className,
    children
  } = _ref;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: [...(Array.isArray(className) ? className : [className]), 'sendbird-tooltip'].join(' ')
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
    className: "sendbird-tooltip__text",
    type: index$4.LabelTypography.CAPTION_2,
    color: index$4.LabelColors.ONCONTENT_1
  }, children));
}
Tooltip.propTypes = {
  className: PropTypes__default["default"].string,
  children: PropTypes__default["default"].oneOfType([PropTypes__default["default"].element, PropTypes__default["default"].arrayOf(PropTypes__default["default"].string), PropTypes__default["default"].string])
};
Tooltip.defaultProps = {
  className: '',
  children: ''
};

const SPACE_FROM_TRIGGER = 8;
function TooltipWrapper(_ref) {
  let {
    className,
    children,
    hoverTooltip // clickTooltip can be added later

  } = _ref;
  const [showHoverTooltip, setShowHoverTooltip] = React.useState(false);
  const childrenRef = React.useRef(null);
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: [...(Array.isArray(className) ? className : [className]), 'sendbird-tooltip-wrapper'].join(' '),
    onMouseOver: () => {
      setShowHoverTooltip(true);
    },
    onFocus: () => {
      setShowHoverTooltip(true);
    },
    onMouseOut: () => {
      setShowHoverTooltip(false);
    },
    onBlur: () => {
      setShowHoverTooltip(false);
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-tooltip-wrapper__children",
    ref: childrenRef
  }, children), showHoverTooltip && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-tooltip-wrapper__hover-tooltip",
    style: {
      bottom: `calc(100% + ${SPACE_FROM_TRIGGER}px)`
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-tooltip-wrapper__hover-tooltip__inner"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-tooltip-wrapper__hover-tooltip__inner__tooltip-container",
    style: {
      left: childrenRef.current && `calc(${childrenRef.current.offsetWidth / 2}px - 50%)`
    }
  }, hoverTooltip))));
}
TooltipWrapper.propTypes = {
  className: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].arrayOf(PropTypes__default["default"].string)]),
  children: PropTypes__default["default"].element.isRequired,
  hoverTooltip: PropTypes__default["default"].oneOfType([PropTypes__default["default"].element, PropTypes__default["default"].func]).isRequired
};
TooltipWrapper.defaultProps = {
  className: ''
};

const ReactionBadge = /*#__PURE__*/React__default["default"].forwardRef((props, ref) => {
  const {
    className,
    children,
    count,
    selected,
    isAdd,
    onClick
  } = props;

  const getClassNameTail = () => {
    if (selected && !isAdd) {
      return '--selected';
    }

    if (isAdd) {
      return '--is-add';
    }

    return '';
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: [...(Array.isArray(className) ? className : [className]), `sendbird-reaction-badge${getClassNameTail()}`].join(' '),
    role: "button",
    ref: ref,
    onClick: onClick,
    onKeyDown: onClick,
    tabIndex: 0
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-reaction-badge__inner"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-reaction-badge__inner__icon"
  }, children), /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
    className: children && count && 'sendbird-reaction-badge__inner__count',
    type: index$4.LabelTypography.CAPTION_3,
    color: index$4.LabelColors.ONBACKGROUND_1
  }, count)));
});
ReactionBadge.propTypes = {
  className: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].arrayOf(PropTypes__default["default"].string)]),
  children: PropTypes__default["default"].element.isRequired,
  count: PropTypes__default["default"].oneOfType([PropTypes__default["default"].number, PropTypes__default["default"].string]),
  selected: PropTypes__default["default"].bool,
  isAdd: PropTypes__default["default"].bool,
  onClick: PropTypes__default["default"].func
};
ReactionBadge.defaultProps = {
  className: '',
  count: '',
  selected: false,
  isAdd: false,
  onClick: () => {}
};

function EmojiReactions2(_a) {
  var _b, _c;

  var className = _a.className,
      userId = _a.userId,
      message = _a.message,
      emojiContainer = _a.emojiContainer,
      memberNicknamesMap = _a.memberNicknamesMap,
      _d = _a.spaceFromTrigger,
      spaceFromTrigger = _d === void 0 ? {} : _d,
      _e = _a.isByMe,
      isByMe = _e === void 0 ? false : _e,
      toggleReaction = _a.toggleReaction;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  var emojisMap = index.getEmojiMapAll(emojiContainer);
  var addReactionRef = React.useRef(null);
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName([className, 'sendbird-emoji-reactions', isByMe ? 'outgoing' : 'incoming'])
  }, ((_b = message === null || message === void 0 ? void 0 : message.reactions) === null || _b === void 0 ? void 0 : _b.length) > 0 && message.reactions.map(function (reaction) {
    var _a, _b;

    var reactedByMe = index.isReactedBy(userId, reaction);
    return /*#__PURE__*/React__default["default"].createElement(TooltipWrapper, {
      className: "sendbird-emoji-reactions__reaction-badge",
      key: reaction === null || reaction === void 0 ? void 0 : reaction.key,
      hoverTooltip: ((_a = reaction === null || reaction === void 0 ? void 0 : reaction.userIds) === null || _a === void 0 ? void 0 : _a.length) > 0 && /*#__PURE__*/React__default["default"].createElement(Tooltip, null, index.getEmojiTooltipString(reaction, userId, memberNicknamesMap, stringSet))
    }, /*#__PURE__*/React__default["default"].createElement(ReactionBadge, {
      count: reaction.userIds.length,
      selected: reactedByMe,
      onClick: function () {
        return toggleReaction(message, reaction.key, reactedByMe);
      }
    }, /*#__PURE__*/React__default["default"].createElement(index$4.ImageRenderer, {
      circle: true,
      url: ((_b = emojisMap.get(reaction === null || reaction === void 0 ? void 0 : reaction.key)) === null || _b === void 0 ? void 0 : _b.url) || '',
      width: "20px",
      height: "20px",
      defaultComponent: /*#__PURE__*/React__default["default"].createElement(index$4.Icon, {
        width: "20px",
        height: "20px",
        type: index$4.IconTypes.QUESTION
      })
    })));
  }), ((_c = message === null || message === void 0 ? void 0 : message.reactions) === null || _c === void 0 ? void 0 : _c.length) < emojisMap.size && /*#__PURE__*/React__default["default"].createElement(index$1.ContextMenu, {
    menuTrigger: function (toggleDropdown) {
      return /*#__PURE__*/React__default["default"].createElement(ReactionBadge, {
        className: "sendbird-emoji-reactions__add-reaction-badge",
        ref: addReactionRef,
        isAdd: true,
        onClick: toggleDropdown
      }, /*#__PURE__*/React__default["default"].createElement(index$4.Icon, {
        type: index$4.IconTypes.EMOJI_MORE,
        fillColor: index$4.IconColors.ON_BACKGROUND_3,
        width: "20px",
        height: "20px"
      }));
    },
    menuItems: function (closeDropdown) {
      return /*#__PURE__*/React__default["default"].createElement(index$1.EmojiListItems, {
        parentRef: addReactionRef,
        parentContainRef: addReactionRef,
        closeDropdown: closeDropdown,
        spacefromTrigger: spaceFromTrigger
      }, index.getEmojiListAll(emojiContainer).map(function (emoji) {
        var _a, _b, _c;

        var isReacted = (_c = (_b = (_a = message === null || message === void 0 ? void 0 : message.reactions) === null || _a === void 0 ? void 0 : _a.filter(function (reaction) {
          return reaction.key === emoji.key;
        })[0]) === null || _b === void 0 ? void 0 : _b.userIds) === null || _c === void 0 ? void 0 : _c.some(function (reactorId) {
          return reactorId === userId;
        });
        return /*#__PURE__*/React__default["default"].createElement(ReactionButton, {
          key: emoji.key,
          width: "36px",
          height: "36px",
          selected: isReacted,
          onClick: function () {
            closeDropdown();
            toggleReaction(message, emoji.key, isReacted);
          }
        }, /*#__PURE__*/React__default["default"].createElement(index$4.ImageRenderer, {
          url: (emoji === null || emoji === void 0 ? void 0 : emoji.url) || '',
          width: "28px",
          height: "28px",
          placeHolder: function (style) {
            return /*#__PURE__*/React__default["default"].createElement("div", {
              style: style
            }, /*#__PURE__*/React__default["default"].createElement(index$4.Icon, {
              type: index$4.IconTypes.QUESTION,
              fillColor: index$4.IconColors.ON_BACKGROUND_3,
              width: "28px",
              height: "28px"
            }));
          }
        }));
      }));
    }
  }));
}

function AdminMessage(_ref) {
  let {
    className,
    message
  } = _ref;

  if (!(message.isAdminMessage || message.messageType) || !message.isAdminMessage() || message.messageType !== 'admin') {
    return null;
  }

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: [...(Array.isArray(className) ? className : [className]), 'sendbird-admin-message'].join(' ')
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
    className: "sendbird-admin-message__text",
    type: index$4.LabelTypography.CAPTION_2,
    color: index$4.LabelColors.ONBACKGROUND_2
  }, message.message));
}
AdminMessage.propTypes = {
  message: PropTypes__default["default"].shape({
    message: PropTypes__default["default"].string,
    messageType: PropTypes__default["default"].string,
    isAdminMessage: PropTypes__default["default"].func
  }),
  className: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].arrayOf(PropTypes__default["default"].string)])
};
AdminMessage.defaultProps = {
  message: {},
  className: ''
};

function TextMessageItemBody(_a) {
  var _b;

  var className = _a.className,
      message = _a.message,
      _c = _a.isByMe,
      isByMe = _c === void 0 ? false : _c,
      _d = _a.mouseHover,
      mouseHover = _d === void 0 ? false : _d;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  return /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
    type: index$4.LabelTypography.BODY_1,
    color: isByMe ? index$4.LabelColors.ONCONTENT_1 : index$4.LabelColors.ONBACKGROUND_1
  }, /*#__PURE__*/React__default["default"].createElement("p", {
    className: index.getClassName([className, 'sendbird-text-message-item-body', isByMe ? 'outgoing' : 'incoming', mouseHover ? 'mouse-hover' : '', ((_b = message === null || message === void 0 ? void 0 : message.reactions) === null || _b === void 0 ? void 0 : _b.length) > 0 ? 'reactions' : ''])
  }, message === null || message === void 0 ? void 0 : message.message, index.isEditedMessage(message) && /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
    className: "sendbird-text-message-item-body__message edited",
    type: index$4.LabelTypography.BODY_1,
    color: isByMe ? index$4.LabelColors.ONCONTENT_2 : index$4.LabelColors.ONBACKGROUND_2
  }, " ".concat(stringSet.MESSAGE_EDITED, " "))));
}

function FileMessageItemBody(_a) {
  var _b;

  var className = _a.className,
      message = _a.message,
      _c = _a.isByMe,
      isByMe = _c === void 0 ? false : _c,
      _d = _a.mouseHover,
      mouseHover = _d === void 0 ? false : _d;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName([className, 'sendbird-file-message-item-body', isByMe ? 'outgoing' : 'incoming', mouseHover ? 'mouse-hover' : '', ((_b = message === null || message === void 0 ? void 0 : message.reactions) === null || _b === void 0 ? void 0 : _b.length) > 0 ? 'reactions' : ''])
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-file-message-item-body__file-icon"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Icon, {
    className: 'sendbird-file-message-item-body__file-icon__icon',
    type: {
      IMAGE: index$4.IconTypes.PHOTO,
      VIDEO: index$4.IconTypes.PLAY,
      AUDIO: index$4.IconTypes.FILE_AUDIO,
      GIF: index$4.IconTypes.GIF,
      OTHERS: index$4.IconTypes.FILE_DOCUMENT
    }[index.getUIKitFileType(message === null || message === void 0 ? void 0 : message.type)],
    fillColor: index$4.IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  })), /*#__PURE__*/React__default["default"].createElement(index$1.TextButton, {
    className: "sendbird-file-message-item-body__file-name",
    onClick: function () {
      window.open(message === null || message === void 0 ? void 0 : message.url);
    },
    color: isByMe ? index$4.LabelColors.ONCONTENT_1 : index$4.LabelColors.ONBACKGROUND_1
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
    className: "sendbird-file-message-item-body__file-name__text",
    type: index$4.LabelTypography.BODY_1,
    color: isByMe ? index$4.LabelColors.ONCONTENT_1 : index$4.LabelColors.ONBACKGROUND_1
  }, index.truncateString((message === null || message === void 0 ? void 0 : message.name) || (message === null || message === void 0 ? void 0 : message.url)))));
}

function ThumbnailMessageItemBody(_a) {
  var _b, _c;

  var className = _a.className,
      message = _a.message,
      _d = _a.isByMe,
      isByMe = _d === void 0 ? false : _d,
      _e = _a.mouseHover,
      mouseHover = _e === void 0 ? false : _e,
      showFileViewer = _a.showFileViewer;
  var _f = message.thumbnails,
      thumbnails = _f === void 0 ? [] : _f;
  var thumbnailUrl = thumbnails.length > 0 ? (_b = thumbnails[0]) === null || _b === void 0 ? void 0 : _b.url : '';

  var _g = React.useState(false),
      imageRendered = _g[0],
      setImageRendered = _g[1];

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName([className, 'sendbird-thumbnail-message-item-body', isByMe ? 'outgoing' : 'incoming', mouseHover ? 'mouse-hover' : '', ((_c = message === null || message === void 0 ? void 0 : message.reactions) === null || _c === void 0 ? void 0 : _c.length) > 0 ? 'reactions' : '']),
    onClick: function () {
      if ((message === null || message === void 0 ? void 0 : message.sendingStatus) === 'succeeded') {
        showFileViewer(true);
      }
    }
  }, /*#__PURE__*/React__default["default"].createElement(index$4.ImageRenderer, {
    className: "sendbird-thumbnail-message-item-body__thumbnail",
    url: thumbnailUrl || (message === null || message === void 0 ? void 0 : message.url),
    alt: message === null || message === void 0 ? void 0 : message.type,
    width: "360px",
    height: "270px",
    onLoad: function () {
      setImageRendered(true);
    },
    placeHolder: function (style) {
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "sendbird-thumbnail-message-item-body__placeholder",
        style: style
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        className: "sendbird-thumbnail-message-item-body__placeholder__icon"
      }, /*#__PURE__*/React__default["default"].createElement(index$4.Icon, {
        type: index.isVideoMessage(message) ? index$4.IconTypes.PLAY : index$4.IconTypes.PHOTO,
        fillColor: index$4.IconColors.ON_BACKGROUND_2,
        width: "34px",
        height: "34px"
      })));
    }
  }), index.isVideoMessage(message) && !thumbnailUrl && !imageRendered && /*#__PURE__*/React__default["default"].createElement("video", {
    className: "sendbird-thumbnail-message-item-body__video"
  }, /*#__PURE__*/React__default["default"].createElement("source", {
    src: message === null || message === void 0 ? void 0 : message.url,
    type: message === null || message === void 0 ? void 0 : message.type
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-thumbnail-message-item-body__image-cover"
  }), (index.isVideoMessage(message) || index.isGifMessage(message)) && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-thumbnail-message-item-body__icon-wrapper"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-thumbnail-message-item-body__icon-wrapper__icon"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Icon, {
    type: index.isVideoMessage(message) ? index$4.IconTypes.PLAY : index$4.IconTypes.GIF,
    fillColor: index$4.IconColors.GRAY,
    width: "34px",
    height: "34px"
  }))));
}

function OGMessageItemBody(_a) {
  var _b, _c, _d, _e, _f, _g, _h, _j;

  var className = _a.className,
      message = _a.message,
      _k = _a.isByMe,
      isByMe = _k === void 0 ? false : _k,
      _l = _a.mouseHover,
      mouseHover = _l === void 0 ? false : _l;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;

  var openOGUrl = function () {
    var _a, _b;

    if ((_a = message === null || message === void 0 ? void 0 : message.ogMetaData) === null || _a === void 0 ? void 0 : _a.url) window.open((_b = message === null || message === void 0 ? void 0 : message.ogMetaData) === null || _b === void 0 ? void 0 : _b.url);
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName([className, 'sendbird-og-message-item-body', isByMe ? 'outgoing' : 'incoming', mouseHover ? 'mouse-hover' : '', ((_b = message === null || message === void 0 ? void 0 : message.reactions) === null || _b === void 0 ? void 0 : _b.length) > 0 ? 'reactions' : ''])
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
    key: LocalizationContext.uuidv4(),
    type: index$4.LabelTypography.BODY_1,
    color: isByMe ? index$4.LabelColors.ONCONTENT_1 : index$4.LabelColors.ONBACKGROUND_1
  }, /*#__PURE__*/React__default["default"].createElement("p", {
    className: "sendbird-og-message-item-body__text-bubble"
  }, message === null || message === void 0 ? void 0 : message.message.split(' ').map(function (word) {
    var _a;

    var urlRegex = new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?");
    var targetUrl = (_a = urlRegex.exec(word)) === null || _a === void 0 ? void 0 : _a[0];
    var stringUrl = {
      front: '',
      url: '',
      back: ''
    };

    if (targetUrl) {
      var targetUrlIndex = word.indexOf(targetUrl);

      if (targetUrlIndex > 0) {
        stringUrl.front = word.slice(0, targetUrlIndex);
      }

      stringUrl.url = word.slice(targetUrlIndex, targetUrlIndex + targetUrl.length);

      if (targetUrlIndex + targetUrl.length < word.length) {
        stringUrl.back = word.slice(targetUrlIndex + targetUrl.length);
      }
    }

    if (targetUrl) {
      return [stringUrl.front ? stringUrl.front : '', stringUrl.url ? /*#__PURE__*/React__default["default"].createElement(index$3.LinkLabel, {
        className: "sendbird-word__url",
        key: LocalizationContext.uuidv4(),
        src: stringUrl.url,
        type: index$4.LabelTypography.BODY_1,
        color: isByMe ? index$4.LabelColors.ONCONTENT_1 : index$4.LabelColors.ONBACKGROUND_1
      }, stringUrl.url) : null, stringUrl.back ? stringUrl.back : ''];
    }

    return index.isUrl(word) ? /*#__PURE__*/React__default["default"].createElement(index$3.LinkLabel, {
      className: "sendbird-og-message-item-body__text-bubble__message",
      key: LocalizationContext.uuidv4(),
      src: word,
      type: index$4.LabelTypography.BODY_1,
      color: isByMe ? index$4.LabelColors.ONCONTENT_1 : index$4.LabelColors.ONBACKGROUND_1
    }, word) : "".concat(word, " ");
  }), index.isEditedMessage(message) && /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
    className: "sendbird-og-message-item-body__text-bubble__message",
    type: index$4.LabelTypography.BODY_1,
    color: isByMe ? index$4.LabelColors.ONCONTENT_2 : index$4.LabelColors.ONBACKGROUND_2
  }, " ".concat(stringSet.MESSAGE_EDITED, " ")))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-og-message-item-body__og-thumbnail",
    onClick: openOGUrl
  }, /*#__PURE__*/React__default["default"].createElement(index$4.ImageRenderer, {
    className: "sendbird-og-message-item-body__og-thumbnail__image",
    url: ((_d = (_c = message === null || message === void 0 ? void 0 : message.ogMetaData) === null || _c === void 0 ? void 0 : _c.defaultImage) === null || _d === void 0 ? void 0 : _d.url) || '',
    alt: (_f = (_e = message === null || message === void 0 ? void 0 : message.ogMetaData) === null || _e === void 0 ? void 0 : _e.defaultImage) === null || _f === void 0 ? void 0 : _f.alt // TODO: Change fixing width and height lengths
    ,
    width: "320px",
    height: "180px",
    defaultComponent: /*#__PURE__*/React__default["default"].createElement("div", {
      className: "sendbird-og-message-item-body__og-thumbnail__place-holder"
    }, /*#__PURE__*/React__default["default"].createElement(index$4.Icon, {
      className: "sendbird-og-message-item-body__og-thumbnail__place-holder__icon",
      type: index$4.IconTypes.THUMBNAIL_NONE,
      width: "56px",
      height: "56px"
    }))
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-og-message-item-body__description",
    onClick: openOGUrl
  }, ((_g = message === null || message === void 0 ? void 0 : message.ogMetaData) === null || _g === void 0 ? void 0 : _g.title) && /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
    className: "sendbird-og-message-item-body__description__title",
    type: index$4.LabelTypography.SUBTITLE_2,
    color: index$4.LabelColors.ONBACKGROUND_1
  }, message.ogMetaData.title), ((_h = message === null || message === void 0 ? void 0 : message.ogMetaData) === null || _h === void 0 ? void 0 : _h.description) && /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
    className: "sendbird-og-message-item-body__description__description",
    type: index$4.LabelTypography.BODY_2,
    color: index$4.LabelColors.ONBACKGROUND_1
  }, message.ogMetaData.description), ((_j = message === null || message === void 0 ? void 0 : message.ogMetaData) === null || _j === void 0 ? void 0 : _j.url) && /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
    className: "sendbird-og-message-item-body__description__url",
    type: index$4.LabelTypography.CAPTION_3,
    color: index$4.LabelColors.ONBACKGROUND_2
  }, message.ogMetaData.url)), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-og-message-item-body__cover"
  }));
}

function UnknownMessageItemBody(_a) {
  var _b;

  var className = _a.className,
      message = _a.message,
      _c = _a.isByMe,
      isByMe = _c === void 0 ? false : _c,
      _d = _a.mouseHover,
      mouseHover = _d === void 0 ? false : _d;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName([className, 'sendbird-unknown-message-item-body', isByMe ? 'outgoing' : 'incoming', mouseHover ? 'mouse-hover' : '', ((_b = message === null || message === void 0 ? void 0 : message.reactions) === null || _b === void 0 ? void 0 : _b.length) > 0 ? 'reactions' : ''])
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
    className: "sendbird-unknown-message-item-body__header",
    type: index$4.LabelTypography.BODY_1,
    color: isByMe ? index$4.LabelColors.ONCONTENT_1 : index$4.LabelColors.ONBACKGROUND_1
  }, stringSet.UNKNOWN__UNKNOWN_MESSAGE_TYPE), /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
    className: "sendbird-unknown-message-item-body__description",
    type: index$4.LabelTypography.BODY_1,
    color: isByMe ? index$4.LabelColors.ONCONTENT_2 : index$4.LabelColors.ONBACKGROUND_2
  }, stringSet.UNKNOWN__CANNOT_READ_MESSAGE));
}

function QuoteMessage(_a) {
  var _b;

  var _c, _d, _e, _f;

  var message = _a.message,
      _g = _a.userId,
      userId = _g === void 0 ? '' : _g,
      _h = _a.isByMe,
      isByMe = _h === void 0 ? false : _h,
      className = _a.className,
      onClick = _a.onClick;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  var parentMessage = message.parentMessage;
  var parentMessageSender = parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.sender;
  var parentMessageSenderNickname = userId === (parentMessageSender === null || parentMessageSender === void 0 ? void 0 : parentMessageSender.userId) ? stringSet.QUOTED_MESSAGE__CURRENT_USER : parentMessageSender === null || parentMessageSender === void 0 ? void 0 : parentMessageSender.nickname;
  var parentMessageUrl = (parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.url) || '';
  var parentMessageType = parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.type;
  var currentMessageSenderNickname = userId === ((_c = message === null || message === void 0 ? void 0 : message.sender) === null || _c === void 0 ? void 0 : _c.userId) ? stringSet.QUOTED_MESSAGE__CURRENT_USER : (_d = message === null || message === void 0 ? void 0 : message.sender) === null || _d === void 0 ? void 0 : _d.nickname;

  var _j = React.useState(false),
      isThumbnailLoaded = _j[0],
      setThumbnailLoaded = _j[1];

  var uikitFileTypes = index.getUIKitFileTypes();
  var splitFileName = (parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.name) ? parentMessage.name.split('/') : parentMessageUrl.split('/');
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName([className, 'sendbird-quote-message', isByMe ? 'outgoing' : 'incoming']),
    key: parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.messageId,
    onClick: function () {
      if (onClick) onClick();
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-quote-message__replied-to"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Icon, {
    className: "sendbird-quote-message__replied-to__icon",
    type: index$4.IconTypes.REPLY,
    fillColor: index$4.IconColors.ON_BACKGROUND_3,
    width: "12px",
    height: "12px"
  }), /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
    className: "sendbird-quote-message__replied-to__text",
    type: index$4.LabelTypography.CAPTION_2,
    color: index$4.LabelColors.ONBACKGROUND_3
  }, "".concat(currentMessageSenderNickname, " ").concat(stringSet.QUOTED_MESSAGE__REPLIED_TO, " ").concat(parentMessageSenderNickname))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-quote-message__replied-message"
  }, index.isUserMessage(parentMessage) && ((_e = parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.message) === null || _e === void 0 ? void 0 : _e.length) > 0 && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-quote-message__replied-message__text-message"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
    className: "sendbird-quote-message__replied-message__text-message__word",
    type: index$4.LabelTypography.BODY_2,
    color: index$4.LabelColors.ONBACKGROUND_1
  }, parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.message)), index.isThumbnailMessage(parentMessage) && parentMessageUrl && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-quote-message__replied-message__thumbnail-message"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.ImageRenderer, {
    className: "sendbird-quote-message__replied-message__thumbnail-message__image",
    url: parentMessageUrl,
    alt: parentMessageType,
    width: "144px",
    height: "108px",
    onLoad: function () {
      return setThumbnailLoaded(true);
    },
    defaultComponent: /*#__PURE__*/React__default["default"].createElement("div", {
      className: "sendbird-quote-message__replied-message__thumbnail-message__placeholder"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "sendbird-quote-message__replied-message__thumbnail-message__placeholder__icon"
    }, /*#__PURE__*/React__default["default"].createElement(index$4.Icon, {
      type: index.isVideo(parentMessageType) ? index$4.IconTypes.PLAY : index$4.IconTypes.PHOTO,
      fillColor: index$4.IconColors.ON_BACKGROUND_2,
      width: "22px",
      height: "22px"
    })))
  }), index.isVideo(parentMessageType) && !(((_f = parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.thumbnails) === null || _f === void 0 ? void 0 : _f.length) > 0) && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("video", {
    className: "sendbird-quote-message__replied-message__thumbnail-message__video"
  }, /*#__PURE__*/React__default["default"].createElement("source", {
    src: parentMessageUrl,
    type: parentMessageType
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-quote-message__replied-message__thumbnail-message__cover"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-quote-message__replied-message__thumbnail-message__cover__icon"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Icon, {
    type: index$4.IconTypes.PLAY,
    fillColor: index$4.IconColors.GRAY,
    width: "14px",
    height: "14px"
  })))), isThumbnailLoaded && index.isGif(parentMessageType) && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-quote-message__replied-message__thumbnail-message__cover"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-quote-message__replied-message__thumbnail-message__cover__icon"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Icon, {
    type: index$4.IconTypes.GIF,
    fillColor: index$4.IconColors.GRAY,
    width: "14px",
    height: "14px"
  })))), index.isFileMessage(parentMessage) && !index.isSupportedFileView(parentMessage.type) && parentMessageUrl && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-quote-message__replied-message__file-message"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Icon, {
    className: "sendbird-quote-message__replied-message__file-message__type-icon",
    type: (_b = {}, _b[uikitFileTypes.IMAGE] = index$4.IconTypes.PHOTO, _b[uikitFileTypes.VIDEO] = index$4.IconTypes.PLAY, _b[uikitFileTypes.AUDIO] = index$4.IconTypes.FILE_AUDIO, _b[uikitFileTypes.GIF] = index$4.IconTypes.GIF, _b[uikitFileTypes.OTHERS] = index$4.IconTypes.FILE_DOCUMENT, _b)[index.getUIKitFileType(parentMessageType)],
    fillColor: index$4.IconColors.ON_BACKGROUND_3,
    width: "16px",
    height: "16px"
  }), /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
    className: "sendbird-quote-message__replied-message__file-message__file-name",
    type: index$4.LabelTypography.BODY_2,
    color: index$4.LabelColors.ONBACKGROUND_3
  }, index.truncateString(splitFileName[splitFileName.length - 1])))));
}

function MessageContent(_a) {
  var _b, _c, _d;

  var className = _a.className,
      userId = _a.userId,
      channel = _a.channel,
      message = _a.message,
      _e = _a.disabled,
      disabled = _e === void 0 ? false : _e,
      _f = _a.chainTop,
      chainTop = _f === void 0 ? false : _f,
      _g = _a.chainBottom,
      chainBottom = _g === void 0 ? false : _g,
      _h = _a.useReaction,
      useReaction = _h === void 0 ? false : _h,
      replyType = _a.replyType,
      nicknamesMap = _a.nicknamesMap,
      emojiContainer = _a.emojiContainer,
      scrollToMessage = _a.scrollToMessage,
      showEdit = _a.showEdit,
      showRemove = _a.showRemove,
      showFileViewer = _a.showFileViewer,
      resendMessage = _a.resendMessage,
      toggleReaction = _a.toggleReaction,
      setQuoteMessage = _a.setQuoteMessage;
  var messageTypes = index.getUIKitMessageTypes();

  var _j = React.useContext(index$1.UserProfileContext),
      disableUserProfile = _j.disableUserProfile,
      renderUserProfile = _j.renderUserProfile;

  var dateLocale = React.useContext(LocalizationContext.LocalizationContext).dateLocale;
  var avatarRef = React.useRef(null);

  var _k = React.useState(false),
      mouseHover = _k[0],
      setMouseHover = _k[1];

  var _l = React.useState(false),
      supposedHover = _l[0],
      setSupposedHover = _l[1];

  var isByMe = userId === ((_b = message === null || message === void 0 ? void 0 : message.sender) === null || _b === void 0 ? void 0 : _b.userId) || message.sendingStatus === 'pending' || message.sendingStatus === 'failed';
  var isByMeClassName = isByMe ? 'outgoing' : 'incoming';
  var chainTopClassName = chainTop ? 'chain-top' : '';
  var useReactionClassName = useReaction ? 'use-reactions' : '';
  var supposedHoverClassName = supposedHover ? 'supposed-hover' : '';
  var useReplying = !!(replyType === 'QUOTE_REPLY' && (message === null || message === void 0 ? void 0 : message.parentMessageId) && (message === null || message === void 0 ? void 0 : message.parentMessage));
  var useReplyingClassName = useReplying ? 'use-quote' : '';

  if (((_c = message === null || message === void 0 ? void 0 : message.isAdminMessage) === null || _c === void 0 ? void 0 : _c.call(message)) || (message === null || message === void 0 ? void 0 : message.messageType) === 'admin') {
    return /*#__PURE__*/React__default["default"].createElement(AdminMessage, {
      message: message
    });
  }

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName([className, 'sendbird-message-content', isByMeClassName]),
    onMouseOver: function () {
      return setMouseHover(true);
    },
    onMouseLeave: function () {
      return setMouseHover(false);
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName(['sendbird-message-content__left', useReactionClassName, isByMeClassName, useReplyingClassName])
  }, !isByMe && !chainBottom &&
  /*#__PURE__*/

  /** user profile */
  React__default["default"].createElement(index$1.ContextMenu, {
    menuTrigger: function (toggleDropdown) {
      var _a;

      return /*#__PURE__*/React__default["default"].createElement(index$4.Avatar, {
        className: "sendbird-message-content__left__avatar",
        src: ((_a = message === null || message === void 0 ? void 0 : message.sender) === null || _a === void 0 ? void 0 : _a.profileUrl) || '',
        ref: avatarRef,
        width: "28px",
        height: "28px",
        onClick: function () {
          if (!disableUserProfile) toggleDropdown();
        }
      });
    },
    menuItems: function (closeDropdown) {
      return /*#__PURE__*/React__default["default"].createElement(index$1.MenuItems
      /**
      * parentRef: For catching location(x, y) of MenuItems
      * parentContainRef: For toggling more options(menus & reactions)
      */
      , {
        parentRef: avatarRef,
        parentContainRef: avatarRef,
        closeDropdown: closeDropdown,
        style: {
          paddingTop: 0,
          paddingBottom: 0
        }
      }, renderUserProfile ? renderUserProfile({
        user: message === null || message === void 0 ? void 0 : message.sender,
        close: closeDropdown
      }) : /*#__PURE__*/React__default["default"].createElement(index$1.ConnectedUserProfile, {
        user: message.sender,
        onSuccess: closeDropdown
      }));
    }
  }), isByMe && /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName(['sendbird-message-content-menu', useReactionClassName, supposedHoverClassName, isByMeClassName])
  }, /*#__PURE__*/React__default["default"].createElement(MessageItemMenu, {
    className: "sendbird-message-content-menu__normal-menu",
    channel: channel,
    message: message,
    isByMe: isByMe,
    replyType: replyType,
    disabled: disabled,
    showEdit: showEdit,
    showRemove: showRemove,
    resendMessage: resendMessage,
    setQuoteMessage: setQuoteMessage,
    setSupposedHover: setSupposedHover
  }), useReaction && /*#__PURE__*/React__default["default"].createElement(MessageItemReactionMenu, {
    className: "sendbird-message-content-menu__reaction-menu",
    message: message,
    channel: channel,
    userId: userId,
    spaceFromTrigger: {},
    emojiContainer: emojiContainer,
    toggleReaction: toggleReaction,
    setSupposedHover: setSupposedHover
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-message-content__middle"
  }, !isByMe && !chainTop && !useReplying && /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
    className: "sendbird-message-content__middle__sender-name",
    type: index$4.LabelTypography.CAPTION_2,
    color: index$4.LabelColors.ONBACKGROUND_2
  }, index.getSenderName(message)), useReplying ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName(['sendbird-message-content__middle__quote-message', isByMe ? 'outgoing' : 'incoming', useReplyingClassName])
  }, /*#__PURE__*/React__default["default"].createElement(QuoteMessage, {
    message: message,
    userId: userId,
    isByMe: isByMe,
    onClick: function () {
      var _a;

      if (((_a = message === null || message === void 0 ? void 0 : message.parentMessage) === null || _a === void 0 ? void 0 : _a.createdAt) && (message === null || message === void 0 ? void 0 : message.parentMessageId)) {
        scrollToMessage(message.parentMessage.createdAt, message.parentMessageId);
      }
    }
  })) : null, /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName(['sendbird-message-content__middle__body-container'])
  }, isByMe && !chainBottom && /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName(['sendbird-message-content__middle__body-container__created-at', 'left', supposedHoverClassName])
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-message-content__middle__body-container__created-at__component-container"
  }, /*#__PURE__*/React__default["default"].createElement(MessageStatus, {
    message: message,
    channel: channel
  }))), index.isTextMessage(message) && /*#__PURE__*/React__default["default"].createElement(TextMessageItemBody, {
    className: "sendbird-message-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    mouseHover: mouseHover
  }), index.isOGMessage(message) && /*#__PURE__*/React__default["default"].createElement(OGMessageItemBody, {
    className: "sendbird-message-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    mouseHover: mouseHover
  }), index.getUIKitMessageType(message) === messageTypes.FILE && /*#__PURE__*/React__default["default"].createElement(FileMessageItemBody, {
    className: "sendbird-message-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    mouseHover: mouseHover
  }), index.isThumbnailMessage(message) && /*#__PURE__*/React__default["default"].createElement(ThumbnailMessageItemBody, {
    className: "sendbird-message-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    mouseHover: mouseHover,
    showFileViewer: showFileViewer
  }), index.getUIKitMessageType(message) === messageTypes.UNKNOWN && /*#__PURE__*/React__default["default"].createElement(UnknownMessageItemBody, {
    className: "sendbird-message-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    mouseHover: mouseHover
  }), useReaction && ((_d = message === null || message === void 0 ? void 0 : message.reactions) === null || _d === void 0 ? void 0 : _d.length) > 0 && /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName(['sendbird-message-content-reactions', !isByMe || index.isThumbnailMessage(message) || index.isOGMessage(message) ? '' : 'primary', mouseHover ? 'mouse-hover' : ''])
  }, /*#__PURE__*/React__default["default"].createElement(EmojiReactions2, {
    userId: userId,
    message: message,
    isByMe: isByMe,
    emojiContainer: emojiContainer,
    memberNicknamesMap: nicknamesMap,
    toggleReaction: toggleReaction
  })), !isByMe && !chainBottom && /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
    className: index.getClassName(['sendbird-message-content__middle__body-container__created-at', 'right', supposedHoverClassName]),
    type: index$4.LabelTypography.CAPTION_3,
    color: index$4.LabelColors.ONBACKGROUND_2
  }, index$2.format(message.createdAt, 'p', {
    locale: dateLocale
  })))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName(['sendbird-message-content__right', chainTopClassName, useReactionClassName, useReplyingClassName])
  }, !isByMe && /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName(['sendbird-message-content-menu', chainTopClassName, supposedHoverClassName, isByMeClassName])
  }, useReaction && /*#__PURE__*/React__default["default"].createElement(MessageItemReactionMenu, {
    className: "sendbird-message-content-menu__reaction-menu",
    message: message,
    channel: channel,
    userId: userId,
    spaceFromTrigger: {},
    emojiContainer: emojiContainer,
    toggleReaction: toggleReaction,
    setSupposedHover: setSupposedHover
  }), /*#__PURE__*/React__default["default"].createElement(MessageItemMenu, {
    className: "sendbird-message-content-menu__normal-menu",
    channel: channel,
    message: message,
    isByMe: isByMe,
    replyType: replyType,
    disabled: disabled,
    showEdit: showEdit,
    showRemove: showRemove,
    resendMessage: resendMessage,
    setQuoteMessage: setQuoteMessage,
    setSupposedHover: setSupposedHover
  }))));
}

const RemoveMessage = props => {
  var _message$threadInfo;

  const {
    onCloseModal,
    onDeleteMessage,
    message
  } = props;
  const {
    stringSet
  } = React.useContext(LocalizationContext.LocalizationContext);
  return /*#__PURE__*/React__default["default"].createElement(index$1.Modal, {
    type: index$1.ButtonTypes.DANGER,
    disabled: (message === null || message === void 0 ? void 0 : (_message$threadInfo = message.threadInfo) === null || _message$threadInfo === void 0 ? void 0 : _message$threadInfo.replyCount) > 0,
    onCancel: onCloseModal,
    onSubmit: onDeleteMessage,
    submitText: "Delete",
    titleText: stringSet.MODAL__DELETE_MESSAGE__TITLE
  });
};

RemoveMessage.propTypes = {
  onCloseModal: PropTypes__default["default"].func.isRequired,
  onDeleteMessage: PropTypes__default["default"].func.isRequired,
  message: PropTypes__default["default"].shape({
    threadInfo: PropTypes__default["default"].shape({
      replyCount: PropTypes__default["default"].number
    })
  }).isRequired
};

function MessageHoc(_ref) {
  var _message$reactions;

  let {
    message,
    userId,
    disabled,
    editDisabled,
    hasSeparator,
    deleteMessage,
    updateMessage,
    scrollToMessage,
    resendMessage,
    useReaction,
    replyType,
    chainTop,
    chainBottom,
    membersMap,
    emojiContainer,
    animatedMessageId,
    highLightedMessageId,
    toggleReaction,
    quoteMessage,
    setQuoteMessage,
    renderCustomMessage,
    currentGroupChannel,
    handleScroll
  } = _ref;
  const {
    sender = {}
  } = message;
  const [showEdit, setShowEdit] = React.useState(false);
  const [showRemove, setShowRemove] = React.useState(false);
  const [showFileViewer, setShowFileViewer] = React.useState(false);
  const [isAnimated, setIsAnimated] = React.useState(false);
  const [isHighlighted, setIsHighlighted] = React.useState(false);
  const editMessageInputRef = React.useRef(null);
  const useMessageScrollRef = React.useRef(null);
  const {
    dateLocale
  } = React.useContext(LocalizationContext.LocalizationContext);
  React.useLayoutEffect(() => {
    handleScroll();
  }, [showEdit, message === null || message === void 0 ? void 0 : (_message$reactions = message.reactions) === null || _message$reactions === void 0 ? void 0 : _message$reactions.length]);
  React.useLayoutEffect(() => {
    if (highLightedMessageId === message.messageId) {
      if (useMessageScrollRef && useMessageScrollRef.current) {
        useMessageScrollRef.current.scrollIntoView({
          block: 'center',
          inline: 'center'
        });
        setIsAnimated(false);
        setTimeout(() => {
          setIsHighlighted(true);
        }, 500);
      }
    } else {
      setIsHighlighted(false);
    }
  }, [highLightedMessageId, useMessageScrollRef.current, message.messageId]);
  React.useLayoutEffect(() => {
    if (animatedMessageId === message.messageId) {
      if (useMessageScrollRef && useMessageScrollRef.current) {
        useMessageScrollRef.current.scrollIntoView({
          block: 'center',
          inline: 'center'
        });
        setIsHighlighted(false);
        setTimeout(() => {
          setIsAnimated(true);
        }, 500);
      }
    } else {
      setIsAnimated(false);
    }
  }, [animatedMessageId, useMessageScrollRef.current, message.messageId]);
  const RenderedMessage = React.useMemo(() => {
    if (renderCustomMessage) {
      return renderCustomMessage(message, currentGroupChannel, chainTop, chainBottom); // TODO: Let's change this to object type on next major version up
      // and add params 'hasSeparator' and 'menuDisabled', scrollToMessage
    }

    return null;
  }, [message, message.message, renderCustomMessage]);
  const isByMe = userId === (sender === null || sender === void 0 ? void 0 : sender.userId) || message.requestState === 'pending' || message.requestState === 'failed';

  if (RenderedMessage) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      ref: useMessageScrollRef,
      className: index.getClassName(['sendbird-msg-hoc sendbird-msg--scroll-ref', isAnimated ? 'sendbird-msg-hoc__animated' : '', isHighlighted ? 'sendbird-msg-hoc__highlighted' : ''])
    }, hasSeparator && /*#__PURE__*/React__default["default"].createElement(index$3.DateSeparator, null, /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
      type: index$4.LabelTypography.CAPTION_2,
      color: index$4.LabelColors.ONBACKGROUND_2
    }, index$2.format(message === null || message === void 0 ? void 0 : message.createdAt, 'MMMM dd, yyyy', {
      locale: dateLocale
    }))), /*#__PURE__*/React__default["default"].createElement(RenderedMessage, {
      message: message
    }));
  }

  if (showEdit) {
    return /*#__PURE__*/React__default["default"].createElement(index$3.MessageInput, {
      isEdit: true,
      disabled: editDisabled,
      ref: editMessageInputRef,
      name: message.messageId,
      onSendMessage: updateMessage,
      onCancelEdit: () => {
        setShowEdit(false);
      },
      value: message.message
    });
  }

  return /*#__PURE__*/React__default["default"].createElement("div", {
    ref: useMessageScrollRef,
    className: index.getClassName(['sendbird-msg-hoc sendbird-msg--scroll-ref', isAnimated ? 'sendbird-msg-hoc__animated' : '', isHighlighted ? 'sendbird-msg-hoc__highlighted' : '']),
    style: {
      marginBottom: '2px'
    }
  }, hasSeparator && /*#__PURE__*/React__default["default"].createElement(index$3.DateSeparator, null, /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
    type: index$4.LabelTypography.CAPTION_2,
    color: index$4.LabelColors.ONBACKGROUND_2
  }, index$2.format(message === null || message === void 0 ? void 0 : message.createdAt, 'MMMM dd, yyyy', {
    locale: dateLocale
  }))), /*#__PURE__*/React__default["default"].createElement(MessageContent, {
    className: "sendbird-message-hoc__message-content",
    userId: userId,
    scrollToMessage: scrollToMessage,
    channel: currentGroupChannel,
    message: message,
    disabled: disabled,
    chainTop: chainTop,
    chainBottom: chainBottom,
    useReaction: useReaction,
    replyType: replyType,
    nicknamesMap: membersMap,
    emojiContainer: emojiContainer,
    showEdit: setShowEdit,
    showRemove: setShowRemove,
    showFileViewer: setShowFileViewer,
    resendMessage: resendMessage,
    toggleReaction: toggleReaction,
    quoteMessage: quoteMessage,
    setQuoteMessage: setQuoteMessage
  }), showRemove && /*#__PURE__*/React__default["default"].createElement(RemoveMessage, {
    message: message,
    onCloseModal: () => setShowRemove(false),
    onDeleteMessage: () => {
      deleteMessage(message);

      if ((message === null || message === void 0 ? void 0 : message.messageId) === (quoteMessage === null || quoteMessage === void 0 ? void 0 : quoteMessage.messageId)) {
        setQuoteMessage(null);
      }
    }
  }), showFileViewer && /*#__PURE__*/React__default["default"].createElement(index$3.FileViewer, {
    onClose: () => setShowFileViewer(false),
    message: message,
    onDelete: () => {
      deleteMessage(message, () => {
        setShowFileViewer(false);
      });
    },
    isByMe: isByMe
  }));
}
MessageHoc.propTypes = {
  userId: PropTypes__default["default"].string,
  message: PropTypes__default["default"].shape({
    isFileMessage: PropTypes__default["default"].func,
    isAdminMessage: PropTypes__default["default"].func,
    isUserMessage: PropTypes__default["default"].func,
    isDateseparator: PropTypes__default["default"].func,
    // should be a number, but there's a bug in SDK shich returns string
    messageId: PropTypes__default["default"].number,
    type: PropTypes__default["default"].string,
    createdAt: PropTypes__default["default"].number,
    message: PropTypes__default["default"].string,
    requestState: PropTypes__default["default"].string,
    messageType: PropTypes__default["default"].string,
    sender: PropTypes__default["default"].shape({
      userId: PropTypes__default["default"].string
    }),
    ogMetaData: PropTypes__default["default"].shape({}),
    parentMessageId: PropTypes__default["default"].number,
    reactions: PropTypes__default["default"].arrayOf(PropTypes__default["default"].number)
  }),
  animatedMessageId: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
  highLightedMessageId: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
  renderCustomMessage: PropTypes__default["default"].func,
  currentGroupChannel: PropTypes__default["default"].shape({}),
  hasSeparator: PropTypes__default["default"].bool,
  disabled: PropTypes__default["default"].bool,
  editDisabled: PropTypes__default["default"].bool,
  deleteMessage: PropTypes__default["default"].func.isRequired,
  scrollToMessage: PropTypes__default["default"].func,
  updateMessage: PropTypes__default["default"].func.isRequired,
  resendMessage: PropTypes__default["default"].func.isRequired,
  useReaction: PropTypes__default["default"].bool.isRequired,
  replyType: PropTypes__default["default"].oneOf(['NONE', 'QUOTE_REPLY', 'THREAD']).isRequired,
  chainTop: PropTypes__default["default"].bool.isRequired,
  chainBottom: PropTypes__default["default"].bool.isRequired,
  membersMap: PropTypes__default["default"].instanceOf(Map).isRequired,
  emojiContainer: PropTypes__default["default"].shape({
    emojiCategories: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape({
      emojis: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape({
        key: PropTypes__default["default"].string,
        url: PropTypes__default["default"].string
      }))
    }))
  }),
  toggleReaction: PropTypes__default["default"].func,
  quoteMessage: PropTypes__default["default"].shape({
    messageId: PropTypes__default["default"].string
  }),
  setQuoteMessage: PropTypes__default["default"].func.isRequired,
  handleScroll: PropTypes__default["default"].func.isRequired
};
MessageHoc.defaultProps = {
  userId: '',
  editDisabled: false,
  renderCustomMessage: null,
  currentGroupChannel: {},
  message: {},
  hasSeparator: false,
  disabled: false,
  animatedMessageId: null,
  highLightedMessageId: null,
  toggleReaction: () => {},
  scrollToMessage: () => {},
  emojiContainer: {},
  quoteMessage: null
};

const SCROLL_REF_CLASS_NAME = '.sendbird-msg--scroll-ref';
class ConversationScroll extends React.Component {
  constructor(props) {
    super(props);

    LocalizationContext._defineProperty(this, "handleScroll", () => {
      const {
        scrollRef
      } = this === null || this === void 0 ? void 0 : this.props;
      const current = scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current;

      if (current) {
        const bottom = current.scrollHeight - current.scrollTop - current.offsetHeight;
        const {
          scrollBottom = 0
        } = this.state;

        if (scrollBottom < bottom) {
          current.scrollTop += bottom - scrollBottom;
        }
      }
    });

    LocalizationContext._defineProperty(this, "onScroll", e => {
      const {
        scrollRef,
        hasMore,
        messagesDispatcher,
        onScroll,
        onScrollDown,
        currentGroupChannel
      } = this.props;
      const element = e.target;
      const {
        scrollTop,
        clientHeight,
        scrollHeight
      } = element;

      if (scrollTop === 0) {
        if (!hasMore) {
          return;
        }

        const nodes = scrollRef.current.querySelectorAll(SCROLL_REF_CLASS_NAME);
        const first = nodes && nodes[0];
        onScroll(_ref => {
          let [messages] = _ref;

          if (messages) {
            // https://github.com/scabbiaza/react-scroll-position-on-updating-dom
            // Set block to nearest to prevent unexpected scrolling from outer components
            try {
              first.scrollIntoView({
                block: 'nearest'
              });
            } catch (error) {//
            }
          }
        });
      }

      if (clientHeight + scrollTop === scrollHeight) {
        const nodes = scrollRef.current.querySelectorAll(SCROLL_REF_CLASS_NAME);
        const last = nodes && nodes[nodes.length - 1];
        onScrollDown(_ref2 => {
          let [messages] = _ref2;

          if (messages) {
            // https://github.com/scabbiaza/react-scroll-position-on-updating-dom
            try {
              last.scrollIntoView({
                block: 'nearest'
              });
            } catch (error) {//
            }
          }
        });
      } // do this later


      setTimeout(() => {
        // mark as read if scroll is at end
        if (clientHeight + scrollTop === scrollHeight) {
          messagesDispatcher({
            type: MARK_AS_READ
          });
          currentGroupChannel.markAsRead();
        } // save the lastest scroll bottom value


        if (scrollRef !== null && scrollRef !== void 0 && scrollRef.current) {
          const current = scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current;
          this.setState(state => LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
            scrollBottom: current.scrollHeight - current.scrollTop - current.offsetHeight
          }), () => {});
        }
      }, 500);
    });

    this.state = {};
  }

  render() {
    const {
      userId,
      disabled,
      scrollRef,
      membersMap,
      allMessages,
      scrollToMessage,
      useReaction,
      replyType,
      emojiAllMap,
      editDisabled,
      deleteMessage,
      updateMessage,
      resendMessage,
      renderCustomMessage,
      renderChatItem,
      animatedMessageId,
      highLightedMessageId,
      emojiContainer,
      toggleReaction,
      useMessageGrouping,
      currentGroupChannel,
      memoizedEmojiListItems,
      showScrollBot,
      onClickScrollBot,
      quoteMessage,
      setQuoteMessage
    } = this.props;

    if (allMessages.length < 1) {
      return /*#__PURE__*/React__default["default"].createElement(index$4.PlaceHolder, {
        className: "sendbird-conversation__no-messages",
        type: index$4.PlaceHolderTypes$1.NO_MESSAGES
      });
    }

    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "sendbird-conversation__messages"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "sendbird-conversation__scroll-container"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "sendbird-conversation__padding"
    }), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "sendbird-conversation__messages-padding",
      ref: scrollRef,
      onScroll: this.onScroll
    }, allMessages.map((m, idx) => {
      const previousMessage = allMessages[idx - 1];
      const nextMessage = allMessages[idx + 1];
      const [chainTop, chainBottom] = useMessageGrouping ? compareMessagesForGrouping(previousMessage, m, nextMessage) : [false, false];
      const previousMessageCreatedAt = previousMessage && previousMessage.createdAt;
      const currentCreatedAt = m.createdAt; // https://stackoverflow.com/a/41855608

      const hasSeparator = !(previousMessageCreatedAt && index$2.isSameDay(currentCreatedAt, previousMessageCreatedAt));

      if (renderChatItem) {
        return /*#__PURE__*/React__default["default"].createElement("div", {
          key: m.messageId || m.reqId,
          className: "sendbird-msg--scroll-ref"
        }, renderChatItem({
          message: m,
          animatedMessageId,
          highLightedMessageId,
          channel: currentGroupChannel,
          onDeleteMessage: deleteMessage,
          onUpdateMessage: updateMessage,
          onResendMessage: resendMessage,
          onScrollToMessage: scrollToMessage,
          onReplyMessage: setQuoteMessage,
          emojiContainer,
          chainTop,
          chainBottom,
          hasSeparator,
          menuDisabled: disabled
        }));
      }

      return /*#__PURE__*/React__default["default"].createElement(MessageHoc, {
        animatedMessageId: animatedMessageId,
        highLightedMessageId: highLightedMessageId,
        renderCustomMessage: renderCustomMessage,
        key: m.messageId || m.reqId,
        userId: userId,
        handleScroll: this.handleScroll,
        message: m,
        quoteMessage: quoteMessage,
        scrollToMessage: scrollToMessage,
        currentGroupChannel: currentGroupChannel,
        disabled: disabled,
        membersMap: membersMap,
        chainTop: chainTop,
        useReaction: useReaction,
        replyType: replyType,
        emojiAllMap: emojiAllMap,
        emojiContainer: emojiContainer,
        editDisabled: editDisabled,
        hasSeparator: hasSeparator,
        chainBottom: chainBottom,
        updateMessage: updateMessage,
        deleteMessage: deleteMessage,
        resendMessage: resendMessage,
        toggleReaction: toggleReaction,
        setQuoteMessage: setQuoteMessage,
        memoizedEmojiListItems: memoizedEmojiListItems
      });
    }))), showScrollBot && /*#__PURE__*/React__default["default"].createElement("div", {
      className: "sendbird-conversation__scroll-bottom-button",
      onClick: onClickScrollBot,
      onKeyDown: onClickScrollBot,
      tabIndex: 0,
      role: "button"
    }, /*#__PURE__*/React__default["default"].createElement(index$4.Icon, {
      width: "24px",
      height: "24px",
      type: index$4.IconTypes.CHEVRON_DOWN,
      fillColor: index$4.IconColors.PRIMARY
    })));
  }

}
ConversationScroll.propTypes = {
  // https://stackoverflow.com/a/52646941
  scrollRef: PropTypes__default["default"].shape({
    current: PropTypes__default["default"].oneOfType([PropTypes__default["default"].element, PropTypes__default["default"].shape({})])
  }).isRequired,
  hasMore: PropTypes__default["default"].bool,
  messagesDispatcher: PropTypes__default["default"].func.isRequired,
  onScroll: PropTypes__default["default"].func,
  onScrollDown: PropTypes__default["default"].func,
  editDisabled: PropTypes__default["default"].bool,
  disabled: PropTypes__default["default"].bool,
  userId: PropTypes__default["default"].string,
  allMessages: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape({
    createdAt: PropTypes__default["default"].number
  })).isRequired,
  deleteMessage: PropTypes__default["default"].func.isRequired,
  resendMessage: PropTypes__default["default"].func.isRequired,
  updateMessage: PropTypes__default["default"].func.isRequired,
  currentGroupChannel: PropTypes__default["default"].shape({
    markAsRead: PropTypes__default["default"].func,
    members: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape({}))
  }).isRequired,
  animatedMessageId: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
  highLightedMessageId: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
  renderChatItem: PropTypes__default["default"].func,
  renderCustomMessage: PropTypes__default["default"].func,
  scrollToMessage: PropTypes__default["default"].func,
  useReaction: PropTypes__default["default"].bool,
  replyType: PropTypes__default["default"].oneOf(['NONE', 'QUOTE_REPLY', 'THREAD']),
  showScrollBot: PropTypes__default["default"].bool,
  onClickScrollBot: PropTypes__default["default"].func,
  emojiContainer: PropTypes__default["default"].shape({}),
  emojiAllMap: PropTypes__default["default"].instanceOf(Map),
  membersMap: PropTypes__default["default"].instanceOf(Map),
  useMessageGrouping: PropTypes__default["default"].bool,
  toggleReaction: PropTypes__default["default"].func,
  memoizedEmojiListItems: PropTypes__default["default"].func,
  quoteMessage: PropTypes__default["default"].shape({}),
  setQuoteMessage: PropTypes__default["default"].func.isRequired
};
ConversationScroll.defaultProps = {
  hasMore: false,
  editDisabled: false,
  disabled: false,
  userId: '',
  renderCustomMessage: null,
  renderChatItem: null,
  animatedMessageId: null,
  highLightedMessageId: null,
  onScroll: null,
  onScrollDown: null,
  useReaction: true,
  replyType: 'NONE',
  emojiContainer: {},
  showScrollBot: false,
  onClickScrollBot: () => {},
  scrollToMessage: () => {},
  emojiAllMap: new Map(),
  membersMap: new Map(),
  useMessageGrouping: true,
  toggleReaction: () => {},
  memoizedEmojiListItems: () => '',
  quoteMessage: null
};

function Notification(_ref) {
  let {
    count,
    time,
    onClick
  } = _ref;
  const {
    stringSet
  } = React.useContext(LocalizationContext.LocalizationContext);
  const timeArray = time.split(' ');
  timeArray.splice(-2, 0, stringSet.CHANNEL__MESSAGE_LIST__NOTIFICATION__ON);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line
    React__default["default"].createElement("div", {
      className: "sendbird-notification",
      onClick: onClick
    }, /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
      className: "sendbird-notification__text",
      color: index$4.LabelColors.ONCONTENT_1,
      type: index$4.LabelTypography.CAPTION_2
    }, `${count} `, stringSet.CHANNEL__MESSAGE_LIST__NOTIFICATION__NEW_MESSAGE, ` ${timeArray.join(' ')}`), /*#__PURE__*/React__default["default"].createElement(index$4.Icon, {
      width: "24px",
      height: "24px",
      type: index$4.IconTypes.CHEVRON_DOWN,
      fillColor: index$4.IconColors.CONTENT
    }))
  );
}
Notification.propTypes = {
  count: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
  time: PropTypes__default["default"].string,
  onClick: PropTypes__default["default"].func.isRequired
};
Notification.defaultProps = {
  count: 0,
  time: ''
};

var FrozenNotification = function () {
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-notification sendbird-notification--frozen"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
    className: "sendbird-notification__text",
    type: index$4.LabelTypography.CAPTION_2
  }, stringSet.CHANNEL_FROZEN));
};

const TypingIndicatorText = _ref => {
  let {
    members
  } = _ref;
  const {
    stringSet
  } = React.useContext(LocalizationContext.LocalizationContext);

  if (!members || members.length === 0) {
    return '';
  }

  if (members && members.length === 1) {
    return `${members[0].nickname} ${stringSet.TYPING_INDICATOR__IS_TYPING}`;
  }

  if (members && members.length === 2) {
    return `${members[0].nickname} ${stringSet.TYPING_INDICATOR__AND} ${members[1].nickname} ${stringSet.TYPING_INDICATOR__ARE_TYPING}`;
  }

  return stringSet.TYPING_INDICATOR__MULTIPLE_TYPING;
};

function TypingIndicator(props) {
  const {
    className,
    channelUrl,
    sb,
    logger
  } = props;
  const [handlerId, setHandlerId] = React.useState(LocalizationContext.uuidv4());
  const [typingMembers, setTypingMembers] = React.useState([]);
  React.useEffect(() => {
    if (sb && sb.ChannelHandler) {
      sb.removeChannelHandler(handlerId);
      const newHandlerId = LocalizationContext.uuidv4();
      const handler = new sb.ChannelHandler(); // there is a possible warning in here - setState called after unmount

      handler.onTypingStatusUpdated = groupChannel => {
        logger.info('Channel > Typing Indicator: onTypingStatusUpdated', groupChannel);
        const members = groupChannel.getTypingMembers();

        if (groupChannel.url === channelUrl) {
          setTypingMembers(members);
        }
      };

      sb.addChannelHandler(newHandlerId, handler);
      setHandlerId(newHandlerId);
    }

    return () => {
      setTypingMembers([]);

      if (sb && sb.removeChannelHandler) {
        sb.removeChannelHandler(handlerId);
      }
    };
  }, [channelUrl]);
  return /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
    className: className,
    type: index$4.LabelTypography.CAPTION_2,
    color: index$4.LabelColors.ONBACKGROUND_2
  }, /*#__PURE__*/React__default["default"].createElement(TypingIndicatorText, {
    members: typingMembers
  }));
}

TypingIndicator.propTypes = {
  className: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].arrayOf(PropTypes__default["default"].string)]),
  channelUrl: PropTypes__default["default"].string.isRequired,
  sb: PropTypes__default["default"].shape({
    ChannelHandler: PropTypes__default["default"].func,
    removeChannelHandler: PropTypes__default["default"].func,
    addChannelHandler: PropTypes__default["default"].func
  }).isRequired,
  logger: PropTypes__default["default"].shape({
    info: PropTypes__default["default"].func
  }).isRequired
};
TypingIndicator.defaultProps = {
  className: ''
};

var componentClassname = 'sendbird-quote_message_input__avatar';
function QuoteMessageThumbnail(_a) {
  var message = _a.message;

  if (!index.isFileMessage(message)) {
    return null;
  }

  var thumbnailUrl = message.thumbnails && message.thumbnails.length > 0 && message.thumbnails[0].url || index.isImageMessage(message) && message.url;

  if (index.isThumbnailMessage(message) && thumbnailUrl) {
    return /*#__PURE__*/React__default["default"].createElement(index$4.ImageRenderer, {
      className: componentClassname,
      url: thumbnailUrl,
      alt: message.type,
      width: "44px",
      height: "44px",
      fixedSize: true
    });
  } else if (index.isAudioMessage(message)) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: componentClassname
    }, /*#__PURE__*/React__default["default"].createElement(index$4.Icon, {
      type: index$4.IconTypes.FILE_AUDIO,
      fillColor: index$4.IconColors.ON_BACKGROUND_2,
      width: "24px",
      height: "24px"
    }));
  } else {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: componentClassname
    }, /*#__PURE__*/React__default["default"].createElement(index$4.Icon, {
      type: index$4.IconTypes.FILE_DOCUMENT,
      fillColor: index$4.IconColors.ON_BACKGROUND_2,
      width: "24px",
      height: "24px"
    }));
  }
}

function QuoteMessageInput(_a) {
  var className = _a.className,
      replyingMessage = _a.replyingMessage,
      onClose = _a.onClose;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  var fileMessage = replyingMessage;
  var sender = replyingMessage === null || replyingMessage === void 0 ? void 0 : replyingMessage.sender;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: index.getClassName(['sendbird-quote_message_input', className])
  }, /*#__PURE__*/React__default["default"].createElement(QuoteMessageThumbnail, {
    message: fileMessage
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-quote_message_input__body",
    style: {
      width: "calc(100% - ".concat(fileMessage.isFileMessage() ? '164px' : '120px', ")"),
      left: fileMessage.isFileMessage() ? '92px' : '40px'
    }
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
    className: "sendbird-quote_message_input__body__sender-name",
    type: index$4.LabelTypography.CAPTION_1,
    color: index$4.LabelColors.ONBACKGROUND_1
  }, "".concat(stringSet.QUOTE_MESSAGE_INPUT__REPLY_TO, " ").concat(sender && sender.nickname ? sender.nickname : stringSet.NO_NAME)), /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
    className: "sendbird-quote_message_input__body__message-content",
    type: index$4.LabelTypography.BODY_2,
    color: index$4.LabelColors.ONBACKGROUND_3
  }, index.isImageMessage(fileMessage) && !index.isGifMessage(fileMessage) && stringSet.QUOTE_MESSAGE_INPUT__FILE_TYPE_IMAGE, index.isVideoMessage(fileMessage) && stringSet.QUOTE_MESSAGE_INPUT__FILE_TYPE__VIDEO, index.isGifMessage(fileMessage) && stringSet.QUOTE_MESSAGE_INPUT__FILE_TYPE_GIF, index.isUserMessage(replyingMessage) && replyingMessage.message, index.isFileMessage(fileMessage) && !index.isThumbnailMessage(fileMessage) && fileMessage.name)), /*#__PURE__*/React__default["default"].createElement(index$4.Icon, {
    className: "sendbird-quote_message_input__close-button",
    type: index$4.IconTypes.CLOSE,
    fillColor: index$4.IconColors.ON_BACKGROUND_2,
    width: "24px",
    height: "24px",
    onClick: function () {
      return onClose(replyingMessage);
    }
  }));
}

// Logic required to handle message input rendering

var MessageInputWrapper = function (_a, ref) {
  var channel = _a.channel,
      user = _a.user,
      isOnline = _a.isOnline,
      initialized = _a.initialized,
      quoteMessage = _a.quoteMessage,
      onSendMessage = _a.onSendMessage,
      onFileUpload = _a.onFileUpload,
      setQuoteMessage = _a.setQuoteMessage,
      renderMessageInput = _a.renderMessageInput;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  var disabled = !initialized || isDisabledBecauseFrozen(channel) || isDisabledBecauseMuted(channel) || !isOnline;
  var isOperator$1 = isOperator(channel);
  var isBroadcast = channel.isBroadcast; // custom message

  if (renderMessageInput) {
    return renderMessageInput({
      channel: channel,
      user: user,
      disabled: disabled,
      quoteMessage: quoteMessage
    });
  } // broadcast channel + not operator


  if (isBroadcast && !isOperator$1) {
    return null;
  } // other conditions


  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-message-input-wrapper"
  }, quoteMessage && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-message-input-wrapper__quote-message-input"
  }, /*#__PURE__*/React__default["default"].createElement(QuoteMessageInput, {
    replyingMessage: quoteMessage,
    onClose: function () {
      return setQuoteMessage(null);
    }
  })), /*#__PURE__*/React__default["default"].createElement(index$3.MessageInput, {
    className: "sendbird-message-input-wrapper__message-input",
    channelUrl: channel === null || channel === void 0 ? void 0 : channel.url,
    placeholder: quoteMessage && stringSet.MESSAGE_INPUT__QUOTE_REPLY__PLACE_HOLDER || isDisabledBecauseFrozen(channel) && stringSet.MESSAGE_INPUT__PLACE_HOLDER__DISABLED || isDisabledBecauseMuted(channel) && stringSet.MESSAGE_INPUT__PLACE_HOLDER__MUTED,
    ref: ref,
    disabled: disabled,
    onStartTyping: function () {
      channel.startTyping();
    },
    onSendMessage: function () {
      onSendMessage(quoteMessage);
      setQuoteMessage(null);
    },
    onFileUpload: function (file) {
      onFileUpload(file, quoteMessage);
      setQuoteMessage(null);
    }
  }));
};

var MessageInputWrapper$1 = /*#__PURE__*/React__default["default"].forwardRef(MessageInputWrapper);

function ConnectionStatus() {
  const {
    stringSet
  } = React.useContext(LocalizationContext.LocalizationContext);
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-connection-status"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
    type: index$4.LabelTypography.BODY_2,
    color: index$4.LabelColors.ONBACKGROUND_2
  }, stringSet.TRYING_TO_CONNECT), /*#__PURE__*/React__default["default"].createElement(index$4.Icon, {
    type: index$4.IconTypes.DISCONNECTED,
    fillColor: index$4.IconColors.SENT,
    width: "14px",
    height: "14px"
  }));
}

const getChannelTitle = function () {
  let channel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let currentUserId = arguments.length > 1 ? arguments[1] : undefined;
  let stringSet = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : index$4.LabelStringSet;

  if (!channel || !channel.name && !channel.members) {
    return stringSet.NO_TITLE;
  }

  if (channel.name && channel.name !== 'Group Channel') {
    return channel.name;
  }

  if (channel.members.length === 1) {
    return stringSet.NO_MEMBERS;
  }

  return channel.members.filter(_ref => {
    let {
      userId
    } = _ref;
    return userId !== currentUserId;
  }).map(_ref2 => {
    let {
      nickname
    } = _ref2;
    return nickname || stringSet.NO_NAME;
  }).join(', ');
};

const noop$1 = () => {};

function ChatHeader(props) {
  const {
    currentGroupChannel,
    currentUser,
    title,
    subTitle,
    isMuted,
    theme,
    showSearchIcon,
    onSearchClick,
    onActionClick
  } = props;
  const {
    userId
  } = currentUser;
  const {
    stringSet
  } = React.useContext(LocalizationContext.LocalizationContext);
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-chat-header"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-chat-header__left"
  }, /*#__PURE__*/React__default["default"].createElement(index$5.ChannelAvatar, {
    theme: theme,
    channel: currentGroupChannel,
    userId: userId,
    height: 32,
    width: 32
  }), /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
    className: "sendbird-chat-header__left__title",
    type: index$4.LabelTypography.H_2,
    color: index$4.LabelColors.ONBACKGROUND_1
  }, title || getChannelTitle(currentGroupChannel, userId, stringSet)), /*#__PURE__*/React__default["default"].createElement(index$4.Label, {
    className: "sendbird-chat-header__left__subtitle",
    type: index$4.LabelTypography.BODY_1,
    color: index$4.LabelColors.ONBACKGROUND_2
  }, subTitle)), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-chat-header__right"
  }, (typeof isMuted === 'string' && isMuted === 'true' || typeof isMuted === 'boolean' && isMuted) && /*#__PURE__*/React__default["default"].createElement(index$4.Icon, {
    className: "sendbird-chat-header__right__mute",
    type: index$4.IconTypes.NOTIFICATIONS_OFF_FILLED,
    width: "24px",
    height: "24px"
  }), showSearchIcon && /*#__PURE__*/React__default["default"].createElement(index$1.IconButton, {
    className: "sendbird-chat-header__right__search",
    width: "32px",
    height: "32px",
    onClick: onSearchClick
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Icon, {
    type: index$4.IconTypes.SEARCH,
    fillColor: index$4.IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  })), /*#__PURE__*/React__default["default"].createElement(index$1.IconButton, {
    className: "sendbird-chat-header__right__info",
    width: "32px",
    height: "32px",
    onClick: onActionClick
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Icon, {
    type: index$4.IconTypes.INFO,
    fillColor: index$4.IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  }))));
}
ChatHeader.propTypes = {
  currentGroupChannel: PropTypes__default["default"].shape({
    members: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape({})),
    coverUrl: PropTypes__default["default"].string
  }),
  currentUser: PropTypes__default["default"].shape({
    userId: PropTypes__default["default"].string
  }),
  title: PropTypes__default["default"].string,
  subTitle: PropTypes__default["default"].oneOfType([PropTypes__default["default"].bool, PropTypes__default["default"].string]),
  isMuted: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].bool]),
  theme: PropTypes__default["default"].string,
  showSearchIcon: PropTypes__default["default"].bool,
  onSearchClick: PropTypes__default["default"].func,
  onActionClick: PropTypes__default["default"].func
};
ChatHeader.defaultProps = {
  currentGroupChannel: {},
  currentUser: {},
  title: '',
  subTitle: '',
  isMuted: false,
  theme: 'light',
  showSearchIcon: false,
  onSearchClick: noop$1,
  onActionClick: noop$1
};

const noop = () => {};

const ConversationPanel = props => {
  const {
    channelUrl,
    stores: {
      sdkStore,
      userStore
    },
    config: {
      userId,
      logger,
      pubSub,
      isOnline,
      theme,
      imageCompression
    },
    dispatchers: {
      reconnect
    },
    queries = {},
    startingPoint,
    highlightedMessage,
    useReaction,
    replyType,
    showSearchIcon,
    onSearchClick,
    renderChatItem,
    renderChatHeader,
    renderCustomMessage,
    renderUserProfile,
    disableUserProfile,
    renderMessageInput,
    useMessageGrouping,
    onChatHeaderActionClick,
    onBeforeSendUserMessage,
    onBeforeSendFileMessage,
    onBeforeUpdateUserMessage
  } = props;
  const {
    sdk
  } = sdkStore;
  const {
    config
  } = props;
  const sdkError = sdkStore.error;
  const sdkInit = sdkStore.initialized;
  const {
    user
  } = userStore;

  if (queries.messageListQuery) {
    // eslint-disable-next-line no-console
    console.warn('messageListQuery has been deprecated, please use messageListParams instead');
  }

  React.useEffect(() => {
    if (renderCustomMessage) {
      // eslint-disable-next-line no-console
      console.info('The parameter type of renderCustomMessage will be changed to the object in the next minor update.');
    }
  }, []);
  const [intialTimeStamp, setIntialTimeStamp] = React.useState(startingPoint);
  React.useEffect(() => {
    setIntialTimeStamp(startingPoint);
  }, [startingPoint, channelUrl]);
  const [animatedMessageId, setAnimatedMessageId] = React.useState('');
  const [highLightedMessageId, setHighLightedMessageId] = React.useState(highlightedMessage);
  React.useEffect(() => {
    setHighLightedMessageId(highlightedMessage);
  }, [highlightedMessage]);
  const userFilledMessageListQuery = queries.messageListParams;
  const [quoteMessage, setQuoteMessage] = React.useState(null);
  const [messagesStore, messagesDispatcher] = React.useReducer(reducer, messagesInitialState);
  const scrollRef = React.useRef(null);
  const {
    allMessages,
    loading,
    initialized,
    unreadCount,
    unreadSince,
    isInvalid,
    currentGroupChannel = {},
    hasMore,
    lastMessageTimeStamp,
    hasMoreToBottom,
    latestFetchedMessageTimeStamp,
    emojiContainer,
    readStatus
  } = messagesStore;
  const {
    isFrozen,
    isBroadcast,
    isSuper
  } = currentGroupChannel;
  const {
    appInfo = {}
  } = sdk;
  const usingReaction = appInfo.isUsingReaction && !isBroadcast && !isSuper && useReaction // TODO: Make useReaction independent from appInfo.isUsingReaction
  ;
  const userDefinedDisableUserProfile = disableUserProfile || config.disableUserProfile;
  const userDefinedRenderProfile = renderUserProfile || config.renderUserProfile;
  const showScrollBot = hasMoreToBottom; // TODO: emojiAllMap, emoijAllList, nicknamesMap => should be moved to messagesStore

  const emojiAllMap = React.useMemo(() => usingReaction ? getAllEmojisMapFromEmojiContainer(emojiContainer) : new Map(), [emojiContainer]);
  const emojiAllList = React.useMemo(() => usingReaction ? getAllEmojisFromEmojiContainer$1(emojiContainer) : [], [emojiContainer]);
  const nicknamesMap = React.useMemo(() => usingReaction ? getNicknamesMapFromMembers(currentGroupChannel.members) : new Map(), [currentGroupChannel.members]); // Scrollup is default scroll for channel

  const onScrollCallback = useScrollCallback({
    currentGroupChannel,
    lastMessageTimeStamp,
    userFilledMessageListQuery,
    replyType
  }, {
    hasMore,
    logger,
    messagesDispatcher,
    sdk
  });
  const scrollToMessage = useScrollToMessage({
    setIntialTimeStamp,
    setAnimatedMessageId,
    allMessages
  }, {
    logger
  }); // onScrollDownCallback is added for navigation to different timestamps on messageSearch
  // hasMoreToBottom, onScrollDownCallback -> scroll down
  // hasMore, onScrollCallback -> scroll up(default behavior)

  const onScrollDownCallback = useScrollDownCallback({
    currentGroupChannel,
    latestFetchedMessageTimeStamp,
    userFilledMessageListQuery,
    hasMoreToBottom,
    replyType
  }, {
    logger,
    messagesDispatcher,
    sdk
  });
  const toggleReaction = useToggleReactionCallback({
    currentGroupChannel
  }, {
    logger
  });
  const memoizedEmojiListItems = useMemoizedEmojiListItems({
    emojiContainer,
    toggleReaction
  }, {
    useReaction: usingReaction,
    logger,
    userId,
    emojiAllList
  }); // to create message-datasource
  // this hook sets currentGroupChannel asynchronously

  useSetChannel({
    channelUrl,
    sdkInit
  }, {
    messagesDispatcher,
    sdk,
    logger
  });
  React.useEffect(() => {
    setQuoteMessage(null);
  }, [channelUrl]); // Hook to handle ChannelEvents and send values to useReducer using messagesDispatcher

  useHandleChannelEvents({
    currentGroupChannel,
    sdkInit,
    hasMoreToBottom
  }, {
    messagesDispatcher,
    sdk,
    logger,
    scrollRef,
    setQuoteMessage
  }); // hook that fetches messages when channel changes
  // to be clear here useGetChannel sets currentGroupChannel
  // and useInitialMessagesFetch executes when currentGroupChannel changes
  // p.s This one executes on intialTimeStamp change too

  useInitialMessagesFetch({
    currentGroupChannel,
    userFilledMessageListQuery,
    intialTimeStamp,
    replyType
  }, {
    sdk,
    logger,
    messagesDispatcher
  }); // handles API calls from withSendbird

  React.useEffect(() => {
    const subScriber = pubSubHandler(channelUrl, pubSub, messagesDispatcher);
    return () => {
      pubSubHandleRemover(subScriber);
    };
  }, [channelUrl, sdkInit]); // handling connection breaks

  useHandleReconnect({
    isOnline,
    replyType
  }, {
    logger,
    sdk,
    currentGroupChannel,
    messagesDispatcher,
    userFilledMessageListQuery
  }); // callbacks for Message CURD actions

  const deleteMessage = useDeleteMessageCallback({
    currentGroupChannel,
    messagesDispatcher
  }, {
    logger
  });
  const updateMessage = useUpdateMessageCallback({
    currentGroupChannel,
    messagesDispatcher,
    onBeforeUpdateUserMessage
  }, {
    logger,
    sdk,
    pubSub
  });
  const resendMessage = useResendMessageCallback({
    currentGroupChannel,
    messagesDispatcher
  }, {
    logger
  });
  const [messageInputRef, onSendMessage] = useSendMessageCallback({
    currentGroupChannel,
    onBeforeSendUserMessage
  }, {
    sdk,
    logger,
    pubSub,
    messagesDispatcher
  });
  const [onSendFileMessage] = useSendFileMessageCallback({
    currentGroupChannel,
    onBeforeSendFileMessage,
    imageCompression
  }, {
    sdk,
    logger,
    pubSub,
    messagesDispatcher
  });

  if (!channelUrl) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "sendbird-conversation"
    }, /*#__PURE__*/React__default["default"].createElement(index$4.PlaceHolder, {
      type: index$4.PlaceHolderTypes$1.NO_CHANNELS
    }));
  }

  if (isInvalid) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "sendbird-conversation"
    }, /*#__PURE__*/React__default["default"].createElement(index$4.PlaceHolder, {
      type: index$4.PlaceHolderTypes$1.WRONG
    }));
  }

  if (sdkError) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "sendbird-conversation"
    }, /*#__PURE__*/React__default["default"].createElement(index$4.PlaceHolder, {
      type: index$4.PlaceHolderTypes$1.WRONG,
      retryToConnect: () => {
        logger.info('Channel: reconnecting');
        reconnect();
      }
    }));
  }

  return /*#__PURE__*/React__default["default"].createElement(index$1.UserProfileProvider, {
    className: "sendbird-conversation",
    disableUserProfile: userDefinedDisableUserProfile,
    renderUserProfile: userDefinedRenderProfile
  }, renderChatHeader ? renderChatHeader({
    channel: currentGroupChannel,
    user
  }) : /*#__PURE__*/React__default["default"].createElement(ChatHeader, {
    theme: theme,
    currentGroupChannel: currentGroupChannel,
    currentUser: user,
    showSearchIcon: showSearchIcon,
    onSearchClick: onSearchClick,
    onActionClick: onChatHeaderActionClick,
    subTitle: currentGroupChannel.members && currentGroupChannel.members.length !== 2,
    isMuted: false
  }), isFrozen && /*#__PURE__*/React__default["default"].createElement(FrozenNotification, null), unreadCount > 0 && /*#__PURE__*/React__default["default"].createElement(Notification, {
    count: unreadCount,
    onClick: () => {
      if (intialTimeStamp) {
        setIntialTimeStamp(null);
        setAnimatedMessageId(null);
        setHighLightedMessageId(null);
      } else {
        scrollIntoLast(); // there is no scroll

        if (scrollRef.current.scrollTop === 0) {
          try {
            currentGroupChannel.markAsRead();
          } catch (_unused) {//
          }

          messagesDispatcher({
            type: MARK_AS_READ
          });
        }
      }
    },
    time: unreadSince
  }), loading ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-conversation"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.PlaceHolder, {
    type: index$4.PlaceHolderTypes$1.LOADING
  })) : /*#__PURE__*/React__default["default"].createElement(ConversationScroll, {
    swapParams: sdk && sdk.getErrorFirstCallback && sdk.getErrorFirstCallback(),
    animatedMessageId: animatedMessageId,
    highLightedMessageId: highLightedMessageId,
    userId: userId,
    hasMore: hasMore,
    disabled: !isOnline,
    onScroll: onScrollCallback,
    onScrollDown: onScrollDownCallback,
    scrollRef: scrollRef,
    readStatus: readStatus,
    useReaction: usingReaction,
    replyType: replyType,
    allMessages: allMessages,
    scrollToMessage: scrollToMessage,
    emojiAllMap: emojiAllMap,
    membersMap: nicknamesMap,
    editDisabled: isDisabledBecauseFrozen(currentGroupChannel),
    deleteMessage: deleteMessage,
    updateMessage: updateMessage,
    resendMessage: resendMessage,
    toggleReaction: toggleReaction,
    emojiContainer: emojiContainer,
    renderChatItem: renderChatItem,
    quoteMessage: quoteMessage,
    setQuoteMessage: setQuoteMessage,
    showScrollBot: showScrollBot,
    onClickScrollBot: () => {
      setIntialTimeStamp(null);
      setAnimatedMessageId(null);
      setHighLightedMessageId(null);
    },
    renderCustomMessage: renderCustomMessage,
    useMessageGrouping: useMessageGrouping,
    messagesDispatcher: messagesDispatcher,
    currentGroupChannel: currentGroupChannel,
    memoizedEmojiListItems: memoizedEmojiListItems
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-conversation__footer"
  }, /*#__PURE__*/React__default["default"].createElement(MessageInputWrapper$1, {
    channel: currentGroupChannel,
    user: user,
    ref: messageInputRef,
    isOnline: isOnline,
    initialized: initialized,
    onSendMessage: onSendMessage,
    onFileUpload: onSendFileMessage,
    quoteMessage: quoteMessage,
    setQuoteMessage: setQuoteMessage,
    renderMessageInput: renderMessageInput
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-conversation__footer__typing-indicator"
  }, /*#__PURE__*/React__default["default"].createElement(TypingIndicator, {
    className: "sendbird-conversation__footer__typing-indicator__text",
    channelUrl: channelUrl,
    sb: sdk,
    logger: logger
  }), !isOnline && /*#__PURE__*/React__default["default"].createElement(ConnectionStatus, {
    sdkInit: sdkInit,
    sb: sdk,
    logger: logger
  }))));
};
ConversationPanel.propTypes = {
  channelUrl: PropTypes__default["default"].string,
  stores: PropTypes__default["default"].shape({
    sdkStore: PropTypes__default["default"].shape({
      initialized: PropTypes__default["default"].bool,
      sdk: PropTypes__default["default"].shape({
        getErrorFirstCallback: PropTypes__default["default"].func,
        removeChannelHandler: PropTypes__default["default"].func,
        GroupChannel: PropTypes__default["default"].any,
        ChannelHandler: PropTypes__default["default"].any,
        addChannelHandler: PropTypes__default["default"].func,
        UserMessageParams: PropTypes__default["default"].any,
        FileMessageParams: PropTypes__default["default"].any,
        getAllEmoji: PropTypes__default["default"].func,
        appInfo: PropTypes__default["default"].shape({})
      }),
      error: PropTypes__default["default"].bool
    }),
    userStore: PropTypes__default["default"].shape({
      user: PropTypes__default["default"].shape({})
    })
  }).isRequired,
  dispatchers: PropTypes__default["default"].shape({
    reconnect: PropTypes__default["default"].func
  }).isRequired,
  config: PropTypes__default["default"].shape({
    disableUserProfile: PropTypes__default["default"].bool,
    renderUserProfile: PropTypes__default["default"].func,
    userId: PropTypes__default["default"].string.isRequired,
    isOnline: PropTypes__default["default"].bool.isRequired,
    theme: PropTypes__default["default"].string,
    logger: PropTypes__default["default"].shape({
      info: PropTypes__default["default"].func,
      error: PropTypes__default["default"].func,
      warning: PropTypes__default["default"].func
    }),
    pubSub: PropTypes__default["default"].shape({
      subscribe: PropTypes__default["default"].func,
      publish: PropTypes__default["default"].func
    }),
    imageCompression: PropTypes__default["default"].shape({
      compressionRate: PropTypes__default["default"].number,
      resizingWidth: PropTypes__default["default"].oneOfType([PropTypes__default["default"].number, PropTypes__default["default"].string]),
      resizingHeight: PropTypes__default["default"].oneOfType([PropTypes__default["default"].number, PropTypes__default["default"].string])
    })
  }).isRequired,
  queries: PropTypes__default["default"].shape({
    messageListParams: PropTypes__default["default"].shape({
      includeMetaArray: PropTypes__default["default"].bool,
      includeParentMessageText: PropTypes__default["default"].bool,
      includeReaction: PropTypes__default["default"].bool,
      includeReplies: PropTypes__default["default"].bool,
      includeThreadInfo: PropTypes__default["default"].bool,
      limit: PropTypes__default["default"].number,
      reverse: PropTypes__default["default"].bool,
      senderUserIdsFilter: PropTypes__default["default"].arrayOf(PropTypes__default["default"].string)
    })
  }),
  startingPoint: PropTypes__default["default"].number,
  highlightedMessage: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
  onBeforeSendUserMessage: PropTypes__default["default"].func,
  // onBeforeSendUserMessage(text)
  onBeforeSendFileMessage: PropTypes__default["default"].func,
  // onBeforeSendFileMessage(File)
  onBeforeUpdateUserMessage: PropTypes__default["default"].func,
  renderChatItem: PropTypes__default["default"].oneOfType([PropTypes__default["default"].element, PropTypes__default["default"].func]),
  renderCustomMessage: PropTypes__default["default"].func,
  renderMessageInput: PropTypes__default["default"].oneOfType([PropTypes__default["default"].element, PropTypes__default["default"].func]),
  renderChatHeader: PropTypes__default["default"].oneOfType([PropTypes__default["default"].element, PropTypes__default["default"].func]),
  showSearchIcon: PropTypes__default["default"].bool,
  onSearchClick: PropTypes__default["default"].func,
  onChatHeaderActionClick: PropTypes__default["default"].func,
  useReaction: PropTypes__default["default"].bool,
  replyType: PropTypes__default["default"].oneOf(['NONE', 'QUOTE_REPLY', 'THREAD']),
  disableUserProfile: PropTypes__default["default"].bool,
  renderUserProfile: PropTypes__default["default"].func,
  useMessageGrouping: PropTypes__default["default"].bool
};
ConversationPanel.defaultProps = {
  channelUrl: null,
  queries: {},
  onBeforeSendUserMessage: null,
  onBeforeSendFileMessage: null,
  onBeforeUpdateUserMessage: null,
  startingPoint: null,
  highlightedMessage: null,
  renderChatItem: null,
  renderCustomMessage: null,
  renderMessageInput: null,
  renderChatHeader: null,
  useReaction: true,
  replyType: 'NONE',
  showSearchIcon: false,
  onSearchClick: noop,
  disableUserProfile: false,
  renderUserProfile: null,
  useMessageGrouping: true,
  onChatHeaderActionClick: noop
};
const {
  getEmojiCategoriesFromEmojiContainer,
  getAllEmojisFromEmojiContainer,
  getEmojisFromEmojiContainer
} = utils;
var Conversation = LocalizationContext.withSendbirdContext(ConversationPanel);

exports.ConversationPanel = ConversationPanel;
exports["default"] = Conversation;
exports.getAllEmojisFromEmojiContainer = getAllEmojisFromEmojiContainer;
exports.getEmojiCategoriesFromEmojiContainer = getEmojiCategoriesFromEmojiContainer;
exports.getEmojisFromEmojiContainer = getEmojisFromEmojiContainer;
//# sourceMappingURL=Channel.js.map
