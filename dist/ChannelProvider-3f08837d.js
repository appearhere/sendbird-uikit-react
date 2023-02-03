import React__default, { useEffect, useCallback, useRef, useMemo, useState, useReducer } from 'react';
import { U as UserProfileProvider } from './UserProfileContext-517994e3.js';
import useSendbirdStateContext from './useSendbirdStateContext.js';
import { f as format } from './index-229a0736.js';
import { a as SEND_USER_MESSAGE, S as SEND_MESSAGE_START, b as SEND_FILE_MESSAGE, U as UPDATE_USER_MESSAGE, D as DELETE_MESSAGE } from './topics-0560d548.js';
import { a as getSendingMessageStatus, b as isReadMessage, c as filterMessageListParams } from './index-105a85f4.js';
import './utils/message/getOutgoingMessageState.js';
import { _ as _objectSpread2 } from './_rollupPluginBabelHelpers-fe256514.js';
import { c as compareIds } from './compareIds-fd8fd31e.js';
import { N as NEXT_RESULT_SIZE, P as PREV_RESULT_SIZE } from './const-03d71a8a.js';
import { GroupChannelHandler } from '@sendbird/chat/groupChannel';
import { u as uuidv4 } from './uuid-392016d0.js';
import { ReplyType } from '@sendbird/chat/message';
import { EmojiListItems } from './ui/ContextMenu.js';
import ReactionButton from './ui/ReactionButton.js';
import ImageRenderer from './ui/ImageRenderer.js';
import Icon, { IconTypes } from './ui/Icon.js';

const RESET_MESSAGES = 'RESET_MESSAGES';
const FETCH_INITIAL_MESSAGES_START = 'FETCH_INITIAL_MESSAGES_START';
const FETCH_INITIAL_MESSAGES_SUCCESS = 'FETCH_INITIAL_MESSAGES_SUCCESS';
const FETCH_INITIAL_MESSAGES_FAILURE = 'FETCH_INITIAL_MESSAGES_FAILURE';
const FETCH_PREV_MESSAGES_SUCCESS = 'FETCH_PREV_MESSAGES_SUCCESS';
const FETCH_PREV_MESSAGES_FAILURE = 'FETCH_PREV_MESSAGES_FAILURE';
const FETCH_NEXT_MESSAGES_SUCCESS = 'FETCH_NEXT_MESSAGES_SUCCESS';
const FETCH_NEXT_MESSAGES_FAILURE = 'FETCH_NEXT_MESSAGES_FAILURE';
const SEND_MESSAGEGE_START = 'SEND_MESSAGEGE_START';
const SEND_MESSAGEGE_SUCESS = 'SEND_MESSAGEGE_SUCESS';
const SEND_MESSAGEGE_FAILURE = 'SEND_MESSAGEGE_FAILURE';
const RESEND_MESSAGEGE_START = 'RESEND_MESSAGEGE_START';
const ON_MESSAGE_RECEIVED = 'ON_MESSAGE_RECEIVED';
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

var messageActionTypes = /*#__PURE__*/Object.freeze({
  __proto__: null,
  RESET_MESSAGES: RESET_MESSAGES,
  FETCH_INITIAL_MESSAGES_START: FETCH_INITIAL_MESSAGES_START,
  FETCH_INITIAL_MESSAGES_SUCCESS: FETCH_INITIAL_MESSAGES_SUCCESS,
  FETCH_INITIAL_MESSAGES_FAILURE: FETCH_INITIAL_MESSAGES_FAILURE,
  FETCH_PREV_MESSAGES_SUCCESS: FETCH_PREV_MESSAGES_SUCCESS,
  FETCH_PREV_MESSAGES_FAILURE: FETCH_PREV_MESSAGES_FAILURE,
  FETCH_NEXT_MESSAGES_SUCCESS: FETCH_NEXT_MESSAGES_SUCCESS,
  FETCH_NEXT_MESSAGES_FAILURE: FETCH_NEXT_MESSAGES_FAILURE,
  SEND_MESSAGEGE_START: SEND_MESSAGEGE_START,
  SEND_MESSAGEGE_SUCESS: SEND_MESSAGEGE_SUCESS,
  SEND_MESSAGEGE_FAILURE: SEND_MESSAGEGE_FAILURE,
  RESEND_MESSAGEGE_START: RESEND_MESSAGEGE_START,
  ON_MESSAGE_RECEIVED: ON_MESSAGE_RECEIVED,
  ON_MESSAGE_UPDATED: ON_MESSAGE_UPDATED,
  ON_MESSAGE_THREAD_INFO_UPDATED: ON_MESSAGE_THREAD_INFO_UPDATED,
  ON_MESSAGE_DELETED: ON_MESSAGE_DELETED,
  ON_MESSAGE_DELETED_BY_REQ_ID: ON_MESSAGE_DELETED_BY_REQ_ID,
  SET_CURRENT_CHANNEL: SET_CURRENT_CHANNEL,
  SET_CHANNEL_INVALID: SET_CHANNEL_INVALID,
  MARK_AS_READ: MARK_AS_READ,
  ON_REACTION_UPDATED: ON_REACTION_UPDATED,
  SET_EMOJI_CONTAINER: SET_EMOJI_CONTAINER,
  MESSAGE_LIST_PARAMS_CHANGED: MESSAGE_LIST_PARAMS_CHANGED
});

const UNDEFINED = 'undefined';
const {
  SUCCEEDED: SUCCEEDED$1,
  FAILED,
  PENDING
} = getSendingMessageStatus();
const scrollIntoLast = function () {
  let initialTry = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  let scrollRef = arguments.length > 1 ? arguments[1] : undefined;
  const MAX_TRIES = 10;
  const currentTry = initialTry;

  if (currentTry > MAX_TRIES) {
    return;
  }

  try {
    const scrollDOM = (scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current) || document.querySelector('.sendbird-conversation__messages-padding'); // eslint-disable-next-line no-multi-assign

    scrollDOM.scrollTop = scrollDOM.scrollHeight;
  } catch (error) {
    setTimeout(() => {
      scrollIntoLast(currentTry + 1, scrollRef);
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
const pubSubHandler = _ref => {
  let {
    channelUrl,
    pubSub,
    dispatcher,
    scrollRef
  } = _ref;
  const subscriber = new Map();
  if (!pubSub || !pubSub.subscribe) return subscriber;
  subscriber.set(SEND_USER_MESSAGE, pubSub.subscribe(SEND_USER_MESSAGE, msg => {
    const {
      channel,
      message
    } = msg;
    scrollIntoLast(0, scrollRef);

    if (channelUrl === (channel === null || channel === void 0 ? void 0 : channel.url)) {
      dispatcher({
        type: SEND_MESSAGEGE_SUCESS,
        payload: message
      });
    }
  }));
  subscriber.set(SEND_MESSAGE_START, pubSub.subscribe(SEND_MESSAGE_START, msg => {
    const {
      channel,
      message
    } = msg;

    if (channelUrl === (channel === null || channel === void 0 ? void 0 : channel.url)) {
      dispatcher({
        type: SEND_MESSAGEGE_START,
        payload: message
      });
    }
  }));
  subscriber.set(SEND_FILE_MESSAGE, pubSub.subscribe(SEND_FILE_MESSAGE, msg => {
    const {
      channel,
      message
    } = msg;
    scrollIntoLast(0, scrollRef);

    if (channelUrl === (channel === null || channel === void 0 ? void 0 : channel.url)) {
      dispatcher({
        type: SEND_MESSAGEGE_SUCESS,
        payload: message
      });
    }
  }));
  subscriber.set(UPDATE_USER_MESSAGE, pubSub.subscribe(UPDATE_USER_MESSAGE, msg => {
    const {
      channel,
      message,
      fromSelector
    } = msg;

    if (fromSelector && channelUrl === (channel === null || channel === void 0 ? void 0 : channel.url)) {
      dispatcher({
        type: ON_MESSAGE_UPDATED,
        payload: {
          channel,
          message
        }
      });
    }
  }));
  subscriber.set(DELETE_MESSAGE, pubSub.subscribe(DELETE_MESSAGE, msg => {
    const {
      channel,
      messageId
    } = msg;

    if (channelUrl === (channel === null || channel === void 0 ? void 0 : channel.url)) {
      dispatcher({
        type: ON_MESSAGE_DELETED,
        payload: messageId
      });
    }
  }));
  return subscriber;
};
const isOperator = function () {
  let groupChannel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const myRole = groupChannel === null || groupChannel === void 0 ? void 0 : groupChannel.myRole;
  return myRole === 'operator';
};
const isDisabledBecauseFrozen = function () {
  let groupChannel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const isFrozen = groupChannel === null || groupChannel === void 0 ? void 0 : groupChannel.isFrozen;
  return isFrozen && !isOperator(groupChannel);
};
const isDisabledBecauseMuted = function () {
  let groupChannel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const myMutedState = groupChannel === null || groupChannel === void 0 ? void 0 : groupChannel.myMutedState;
  return myMutedState === 'muted';
};
const getAllEmojisFromEmojiContainer = function () {
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
const getMessageCreatedAt = message => format(message.createdAt, 'p');
const isSameGroup = (message, comparingMessage, currentChannel) => {
  var _message$sender, _comparingMessage$sen, _message$sender2, _comparingMessage$sen2;

  if (!(message && comparingMessage && message.messageType && message.messageType !== 'admin' && comparingMessage.messageType && (comparingMessage === null || comparingMessage === void 0 ? void 0 : comparingMessage.messageType) !== 'admin' && message !== null && message !== void 0 && message.sender && comparingMessage !== null && comparingMessage !== void 0 && comparingMessage.sender && message !== null && message !== void 0 && message.createdAt && comparingMessage !== null && comparingMessage !== void 0 && comparingMessage.createdAt && message !== null && message !== void 0 && (_message$sender = message.sender) !== null && _message$sender !== void 0 && _message$sender.userId && comparingMessage !== null && comparingMessage !== void 0 && (_comparingMessage$sen = comparingMessage.sender) !== null && _comparingMessage$sen !== void 0 && _comparingMessage$sen.userId)) {
    return false;
  }

  return (message === null || message === void 0 ? void 0 : message.sendingStatus) === (comparingMessage === null || comparingMessage === void 0 ? void 0 : comparingMessage.sendingStatus) && (message === null || message === void 0 ? void 0 : (_message$sender2 = message.sender) === null || _message$sender2 === void 0 ? void 0 : _message$sender2.userId) === (comparingMessage === null || comparingMessage === void 0 ? void 0 : (_comparingMessage$sen2 = comparingMessage.sender) === null || _comparingMessage$sen2 === void 0 ? void 0 : _comparingMessage$sen2.userId) && getMessageCreatedAt(message) === getMessageCreatedAt(comparingMessage) && isReadMessage(currentChannel, message) === isReadMessage(currentChannel, comparingMessage);
};
const compareMessagesForGrouping = (prevMessage, currMessage, nextMessage, currentChannel, replyType) => {
  if (replyType === 'THREAD' && currMessage !== null && currMessage !== void 0 && currMessage.threadInfo) {
    return [false, false];
  }

  const sendingStatus = (currMessage === null || currMessage === void 0 ? void 0 : currMessage.sendingStatus) || '';
  const isAcceptable = sendingStatus !== 'pending' && sendingStatus !== 'failed';
  return [isSameGroup(prevMessage, currMessage, currentChannel) && isAcceptable, isSameGroup(currMessage, nextMessage, currentChannel) && isAcceptable];
};
const passUnsuccessfullMessages = (allMessages, newMessage) => {
  const {
    sendingStatus = UNDEFINED
  } = newMessage;

  if (sendingStatus === SUCCEEDED$1 || sendingStatus === PENDING) {
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
const isAboutSame = (a, b, px) => Math.abs(a - b) <= px;

var messagesInitialState = {
  initialized: false,
  loading: true,
  allMessages: [],
  currentGroupChannel: {
    members: []
  },
  // for scrollup
  hasMorePrev: false,
  oldestMessageTimeStamp: 0,
  // for scroll down
  // onScrollDownCallback is added for navigation to different timestamps on messageSearch
  // hasMorePrev, onScrollCallback -> scroll up(default behavior)
  // hasMoreNext, onScrollDownCallback -> scroll down
  hasMoreNext: false,
  latestMessageTimeStamp: 0,
  emojiContainer: {},
  unreadSince: null,
  isInvalid: false,
  messageListParams: null
};

const {
  SUCCEEDED
} = getSendingMessageStatus();

const getOldestMessageTimeStamp = function () {
  let messages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  const oldestMessage = messages[0];
  return oldestMessage && oldestMessage.createdAt || null;
};

const getLatestMessageTimeStamp = function () {
  let messages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  const latestMessage = messages[messages.length - 1];
  return latestMessage && latestMessage.createdAt || null;
};

function reducer(state, action) {
  var _state$currentGroupCh7, _action$payload, _action$payload$chann;

  switch (action.type) {
    case RESET_MESSAGES:
      return _objectSpread2(_objectSpread2({}, state), {}, {
        // when user switches channel, if the previous channel `hasMorePrev`
        // the onScroll gets called twice, setting hasMorePrev false prevents this
        hasMorePrev: false,
        hasMoreNext: false,
        allMessages: []
      });

    case FETCH_INITIAL_MESSAGES_START:
      {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          loading: true,
          allMessages: [...state.allMessages.filter(m => m.sendingStatus !== SUCCEEDED)]
        });
      }

    case FETCH_INITIAL_MESSAGES_SUCCESS:
      {
        var _state$currentGroupCh;

        const {
          currentGroupChannel,
          messages
        } = action.payload;

        if (!((currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.url) === ((_state$currentGroupCh = state.currentGroupChannel) === null || _state$currentGroupCh === void 0 ? void 0 : _state$currentGroupCh.url))) {
          return state;
        }

        const oldestMessageTimeStamp = getOldestMessageTimeStamp(messages);
        const latestMessageTimeStamp = getLatestMessageTimeStamp(messages);
        return _objectSpread2(_objectSpread2({}, state), {}, {
          loading: false,
          initialized: true,
          hasMorePrev: true,
          hasMoreNext: true,
          oldestMessageTimeStamp,
          latestMessageTimeStamp,
          allMessages: [...messages]
        });
      }

    case FETCH_PREV_MESSAGES_SUCCESS:
      {
        var _state$currentGroupCh2;

        const {
          currentGroupChannel,
          messages
        } = action.payload;

        if (!((currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.url) === ((_state$currentGroupCh2 = state.currentGroupChannel) === null || _state$currentGroupCh2 === void 0 ? void 0 : _state$currentGroupCh2.url))) {
          return state;
        }

        const hasMorePrev = messages && messages.length === PREV_RESULT_SIZE + 1;
        const oldestMessageTimeStamp = getOldestMessageTimeStamp(messages); // Remove duplicated messages

        const duplicatedMessageIds = [];
        const updatedOldMessages = state.allMessages.map(msg => {
          const duplicatedMessage = messages.find(_ref => {
            let {
              messageId
            } = _ref;
            return compareIds(messageId, msg.messageId);
          });

          if (!duplicatedMessage) {
            return msg;
          }

          duplicatedMessageIds.push(duplicatedMessage.messageId);
          return duplicatedMessage.updatedAt > msg.updatedAt ? duplicatedMessage : msg;
        });
        const filteredNewMessages = duplicatedMessageIds.length > 0 ? messages.filter(msg => !duplicatedMessageIds.find(messageId => compareIds(messageId, msg.messageId))) : messages;
        return _objectSpread2(_objectSpread2({}, state), {}, {
          hasMorePrev,
          oldestMessageTimeStamp,
          allMessages: [...filteredNewMessages, ...updatedOldMessages]
        });
      }

    case FETCH_NEXT_MESSAGES_SUCCESS:
      {
        var _state$currentGroupCh3;

        const {
          currentGroupChannel,
          messages
        } = action.payload;

        if (!((currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.url) === ((_state$currentGroupCh3 = state.currentGroupChannel) === null || _state$currentGroupCh3 === void 0 ? void 0 : _state$currentGroupCh3.url))) {
          return state;
        }

        const hasMoreNext = messages && messages.length === NEXT_RESULT_SIZE + 1;
        const latestMessageTimeStamp = getLatestMessageTimeStamp(messages); // Remove duplicated messages

        const duplicatedMessageIds = [];
        const updatedOldMessages = state.allMessages.map(msg => {
          const duplicatedMessage = messages.find(_ref2 => {
            let {
              messageId
            } = _ref2;
            return compareIds(messageId, msg.messageId);
          });

          if (!duplicatedMessage) {
            return msg;
          }

          duplicatedMessageIds.push(duplicatedMessage.messageId);
          return duplicatedMessage.updatedAt > msg.updatedAt ? duplicatedMessage : msg;
        });
        const filteredNewMessages = duplicatedMessageIds.length > 0 ? messages.filter(msg => !duplicatedMessageIds.find(messageId => compareIds(messageId, msg.messageId))) : messages;
        return _objectSpread2(_objectSpread2({}, state), {}, {
          hasMoreNext,
          latestMessageTimeStamp,
          allMessages: [...updatedOldMessages, ...filteredNewMessages]
        });
      }

    case FETCH_INITIAL_MESSAGES_FAILURE:
    case FETCH_PREV_MESSAGES_FAILURE:
    case FETCH_NEXT_MESSAGES_FAILURE:
      {
        var _state$currentGroupCh4;

        const {
          currentGroupChannel
        } = action.payload;

        if ((currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.url) !== (state === null || state === void 0 ? void 0 : (_state$currentGroupCh4 = state.currentGroupChannel) === null || _state$currentGroupCh4 === void 0 ? void 0 : _state$currentGroupCh4.url)) {
          return state;
        }

        return _objectSpread2(_objectSpread2({}, state), {}, {
          loading: false,
          initialized: false,
          allMessages: [],
          hasMorePrev: false,
          hasMoreNext: false,
          oldestMessageTimeStamp: null,
          latestMessageTimeStamp: null
        });
      }

    case SEND_MESSAGEGE_START:
      return _objectSpread2(_objectSpread2({}, state), {}, {
        allMessages: [...state.allMessages, _objectSpread2({}, action.payload)]
      });

    case SEND_MESSAGEGE_SUCESS:
      {
        const message = action.payload;
        const filteredMessages = state.allMessages.filter(m => (m === null || m === void 0 ? void 0 : m.reqId) !== (message === null || message === void 0 ? void 0 : message.reqId));
        const pendingIndex = filteredMessages.findIndex(msg => (msg === null || msg === void 0 ? void 0 : msg.sendingStatus) === 'pending' || (msg === null || msg === void 0 ? void 0 : msg.sendingStatus) === 'failed');
        return _objectSpread2(_objectSpread2({}, state), {}, {
          allMessages: pendingIndex > -1 ? [...filteredMessages.slice(0, pendingIndex), message, ...filteredMessages.slice(pendingIndex)] : [...filteredMessages, message]
        });
      }

    case SEND_MESSAGEGE_FAILURE:
      {
        // eslint-disable-next-line no-param-reassign
        action.payload.failed = true;
        return _objectSpread2(_objectSpread2({}, state), {}, {
          allMessages: state.allMessages.map(m => compareIds(m.reqId, action.payload.reqId) ? action.payload : m)
        });
      }

    case SET_CURRENT_CHANNEL:
      {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          currentGroupChannel: action.payload,
          isInvalid: false
        });
      }

    case SET_CHANNEL_INVALID:
      {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          currentGroupChannel: null,
          isInvalid: true
        });
      }

    case ON_MESSAGE_RECEIVED:
      {
        const {
          channel,
          message
        } = action.payload;
        const {
          members
        } = channel;
        const {
          sender
        } = message;
        const {
          currentGroupChannel = {},
          unreadSince
        } = state;
        const currentGroupChannelUrl = currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.url;

        if (!compareIds(channel === null || channel === void 0 ? void 0 : channel.url, currentGroupChannelUrl)) {
          return state;
        } // Excluded overlapping messages


        if (state.allMessages.some(msg => msg.messageId === message.messageId)) {
          return state;
        } // Filter by userFilledQuery


        if (state.messageListParams && !filterMessageListParams(state.messageListParams, message)) {
          return state;
        }

        if (message.isAdminMessage && message.isAdminMessage()) {
          return _objectSpread2(_objectSpread2({}, state), {}, {
            allMessages: passUnsuccessfullMessages(state.allMessages, message)
          });
        } // Update members when sender profileUrl, nickname, friendName has been changed


        const senderMember = members === null || members === void 0 ? void 0 : members.find(m => (m === null || m === void 0 ? void 0 : m.userId) === (sender === null || sender === void 0 ? void 0 : sender.userId));

        if ((senderMember === null || senderMember === void 0 ? void 0 : senderMember.profileUrl) !== (sender === null || sender === void 0 ? void 0 : sender.profileUrl) || (senderMember === null || senderMember === void 0 ? void 0 : senderMember.friendName) !== (sender === null || sender === void 0 ? void 0 : sender.friendName) || (senderMember === null || senderMember === void 0 ? void 0 : senderMember.nickname) !== (sender === null || sender === void 0 ? void 0 : sender.nickname)) {
          channel.members = members.map(member => {
            if (member.userId === sender.userId) {
              return sender;
            }

            return member;
          });
        }

        return _objectSpread2(_objectSpread2({}, state), {}, {
          currentGroupChannel: channel,
          unreadSince: state !== null && state !== void 0 && state.unreadSince ? unreadSince : format(new Date(), 'p MMM dd'),
          allMessages: passUnsuccessfullMessages(state.allMessages, message)
        });
      }

    case ON_MESSAGE_UPDATED:
      {
        var _state$currentGroupCh5;

        const {
          channel,
          message
        } = action.payload;
        const currentGroupChannelUrl = (state === null || state === void 0 ? void 0 : (_state$currentGroupCh5 = state.currentGroupChannel) === null || _state$currentGroupCh5 === void 0 ? void 0 : _state$currentGroupCh5.url) || '';

        if (!compareIds(channel === null || channel === void 0 ? void 0 : channel.url, currentGroupChannelUrl)) {
          return state; // Ignore event when it is not for the current channel
        }

        if (state.messageListParams && !filterMessageListParams(state.messageListParams, message)) {
          // Delete the message if it doesn't match to the params anymore
          return _objectSpread2(_objectSpread2({}, state), {}, {
            allMessages: state.allMessages.filter(m => !compareIds(m.messageId, message === null || message === void 0 ? void 0 : message.messageId))
          });
        }

        return _objectSpread2(_objectSpread2({}, state), {}, {
          allMessages: state.allMessages.map(m => {
            if (compareIds(m.messageId, message.messageId)) {
              return message;
            }

            if (compareIds(m.parentMessageId, message.messageId)) {
              m.parentMessage = message; // eslint-disable-line no-param-reassign
            }

            return m;
          })
        });
      }

    case ON_MESSAGE_THREAD_INFO_UPDATED:
      {
        var _state$currentGroupCh6;

        const {
          channel,
          event
        } = action.payload;
        const {
          channelUrl,
          threadInfo,
          targetMessageId
        } = event;
        const currentGroupChannelUrl = (state === null || state === void 0 ? void 0 : (_state$currentGroupCh6 = state.currentGroupChannel) === null || _state$currentGroupCh6 === void 0 ? void 0 : _state$currentGroupCh6.url) || '';

        if (!compareIds(channel === null || channel === void 0 ? void 0 : channel.url, currentGroupChannelUrl) || !compareIds(channel === null || channel === void 0 ? void 0 : channel.url, channelUrl)) {
          return state; // Ignore event when it is not for the current channel
        }

        return _objectSpread2(_objectSpread2({}, state), {}, {
          allMessages: state.allMessages.map(m => {
            if (compareIds(m.messageId, targetMessageId)) {
              // eslint-disable-next-line no-param-reassign
              m.threadInfo = threadInfo; // Upsert threadInfo to the target message
            }

            return m;
          })
        });
      }

    case RESEND_MESSAGEGE_START:
      return _objectSpread2(_objectSpread2({}, state), {}, {
        allMessages: state.allMessages.map(m => compareIds(m.reqId, action.payload.reqId) ? action.payload : m)
      });

    case MARK_AS_READ:
      if (((_state$currentGroupCh7 = state.currentGroupChannel) === null || _state$currentGroupCh7 === void 0 ? void 0 : _state$currentGroupCh7.url) !== ((_action$payload = action.payload) === null || _action$payload === void 0 ? void 0 : (_action$payload$chann = _action$payload.channel) === null || _action$payload$chann === void 0 ? void 0 : _action$payload$chann.url)) {
        return state;
      }

      return _objectSpread2(_objectSpread2({}, state), {}, {
        unreadSince: null
      });

    case ON_MESSAGE_DELETED:
      return _objectSpread2(_objectSpread2({}, state), {}, {
        allMessages: state.allMessages.filter(m => !compareIds(m.messageId, action.payload))
      });

    case ON_MESSAGE_DELETED_BY_REQ_ID:
      return _objectSpread2(_objectSpread2({}, state), {}, {
        allMessages: state.allMessages.filter(m => !compareIds(m.reqId, action.payload))
      });

    case SET_EMOJI_CONTAINER:
      {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          emojiContainer: action.payload
        });
      }

    case ON_REACTION_UPDATED:
      {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          allMessages: state.allMessages.map(m => {
            if (compareIds(m.messageId, action.payload.messageId)) {
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
        return _objectSpread2(_objectSpread2({}, state), {}, {
          messageListParams: action.payload
        });
      }

    default:
      return state;
  }
}

function useHandleChannelEvents(_a, _b) {
  var sdkInit = _a.sdkInit,
      hasMoreNext = _a.hasMoreNext,
      currentUserId = _a.currentUserId,
      disableMarkAsRead = _a.disableMarkAsRead,
      currentGroupChannel = _a.currentGroupChannel;
  var sdk = _b.sdk,
      logger = _b.logger,
      scrollRef = _b.scrollRef,
      setQuoteMessage = _b.setQuoteMessage,
      messagesDispatcher = _b.messagesDispatcher;
  useEffect(function () {
    var _a;

    var channelUrl = currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.url;
    var channelHandlerId = uuidv4();

    if (channelUrl && sdkInit) {
      var channelHandler = {
        onMessageReceived: function (channel, message) {
          // Do not update when hasMoreNext
          if (compareIds(channel === null || channel === void 0 ? void 0 : channel.url, channelUrl) && !hasMoreNext) {
            var scrollToEnd = false;

            try {
              var current = scrollRef.current;
              scrollToEnd = current.offsetHeight + current.scrollTop >= current.scrollHeight - 10; // 10 is a buffer
            } catch (error) {//
            }

            logger.info('Channel | useHandleChannelEvents: onMessageReceived', message);
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
                  var _a;

                  if (!disableMarkAsRead) {
                    (_a = currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.markAsRead) === null || _a === void 0 ? void 0 : _a.call(currentGroupChannel);
                  }

                  scrollIntoLast(0, scrollRef);
                });
              } catch (error) {
                logger.warning('Channel | onMessageReceived | scroll to end failed');
              }
            }
          }
        },
        onUnreadMemberStatusUpdated: function (channel) {
          logger.info('Channel | useHandleChannelEvents: onUnreadMemberStatusUpdated', channel);

          if (compareIds(channel === null || channel === void 0 ? void 0 : channel.url, channelUrl)) {
            messagesDispatcher({
              type: SET_CURRENT_CHANNEL,
              payload: channel
            });
          }
        },
        // before(onDeliveryReceiptUpdated)
        onUndeliveredMemberStatusUpdated: function (channel) {
          if (compareIds(channel === null || channel === void 0 ? void 0 : channel.url, channelUrl)) {
            logger.info('Channel | useHandleChannelEvents: onDeliveryReceiptUpdated', channel);
            messagesDispatcher({
              type: SET_CURRENT_CHANNEL,
              payload: channel
            });
          }
        },
        onMessageUpdated: function (channel, message) {
          logger.info('Channel | useHandleChannelEvents: onMessageUpdated', message);
          messagesDispatcher({
            type: ON_MESSAGE_UPDATED,
            payload: {
              channel: channel,
              message: message
            }
          });
        },
        onThreadInfoUpdated: function (channel, threadInfoUpdateEvent) {
          logger.info('Channel | useHandleChannelEvents: onThreadInfoUpdated', {
            channel: channel,
            threadInfoUpdateEvent: threadInfoUpdateEvent
          });
          messagesDispatcher({
            type: ON_MESSAGE_THREAD_INFO_UPDATED,
            payload: {
              channel: channel,
              event: threadInfoUpdateEvent
            }
          });
        },
        onMessageDeleted: function (channel, messageId) {
          logger.info('Channel | useHandleChannelEvents: onMessageDeleted', {
            channel: channel,
            messageId: messageId
          });
          setQuoteMessage(null);
          messagesDispatcher({
            type: ON_MESSAGE_DELETED,
            payload: messageId
          });
        },
        onReactionUpdated: function (channel, reactionEvent) {
          logger.info('Channel | useHandleChannelEvents: onReactionUpdated', {
            channel: channel,
            reactionEvent: reactionEvent
          });
          messagesDispatcher({
            type: ON_REACTION_UPDATED,
            payload: reactionEvent
          });
        },
        onChannelChanged: function (channel) {
          if (compareIds(channel === null || channel === void 0 ? void 0 : channel.url, channelUrl)) {
            logger.info('Channel | useHandleChannelEvents: onChannelChanged', channel);
            messagesDispatcher({
              type: SET_CURRENT_CHANNEL,
              payload: channel
            });
          }
        },
        onChannelFrozen: function (channel) {
          if (compareIds(channel === null || channel === void 0 ? void 0 : channel.url, channelUrl)) {
            logger.info('Channel | useHandleChannelEvents: onChannelFrozen', channel);
            messagesDispatcher({
              type: SET_CURRENT_CHANNEL,
              payload: channel
            });
          }
        },
        onChannelUnfrozen: function (channel) {
          if (compareIds(channel === null || channel === void 0 ? void 0 : channel.url, channelUrl)) {
            logger.info('Channel | useHandleChannelEvents: onChannelUnFrozen', channel);
            messagesDispatcher({
              type: SET_CURRENT_CHANNEL,
              payload: channel
            });
          }
        },
        onUserMuted: function (channel, user) {
          if (compareIds(channel === null || channel === void 0 ? void 0 : channel.url, channelUrl)) {
            logger.info('Channel | useHandleChannelEvents: onUserMuted', {
              channel: channel,
              user: user
            });
            messagesDispatcher({
              type: SET_CURRENT_CHANNEL,
              payload: channel
            });
          }
        },
        onUserUnmuted: function (channel, user) {
          if (compareIds(channel === null || channel === void 0 ? void 0 : channel.url, channelUrl)) {
            logger.info('Channel | useHandleChannelEvents: onUserUnmuted', {
              channel: channel,
              user: user
            });
            messagesDispatcher({
              type: SET_CURRENT_CHANNEL,
              payload: channel
            });
          }
        },
        onUserBanned: function (channel, user) {
          var _a;

          if (compareIds(channel === null || channel === void 0 ? void 0 : channel.url, channelUrl) && (user === null || user === void 0 ? void 0 : user.userId) === ((_a = sdk === null || sdk === void 0 ? void 0 : sdk.currentUser) === null || _a === void 0 ? void 0 : _a.userId)) {
            logger.info('Channel | useHandleChannelEvents: onUserBanned', {
              channel: channel,
              user: user
            });
            messagesDispatcher({
              type: SET_CURRENT_CHANNEL,
              payload: null
            });
          }
        },
        onOperatorUpdated: function (channel, users) {
          if (compareIds(channel === null || channel === void 0 ? void 0 : channel.url, channelUrl)) {
            logger.info('Channel | useHandleChannelEvents: onOperatorUpdated', {
              channel: channel,
              users: users
            });
            messagesDispatcher({
              type: SET_CURRENT_CHANNEL,
              payload: channel
            });
          }
        },
        onUserLeft: function (channel, user) {
          if (compareIds(channel === null || channel === void 0 ? void 0 : channel.url, channelUrl)) {
            logger.info('Channel | useHandleChannelEvents: onUserLeft', {
              channel: channel,
              user: user
            });

            if ((user === null || user === void 0 ? void 0 : user.userId) === currentUserId) {
              messagesDispatcher({
                type: SET_CURRENT_CHANNEL,
                payload: null
              });
            }
          }
        }
      };
      logger.info('Channel | useHandleChannelEvents: Setup event handler', {
        channelHandlerId: channelHandlerId,
        channelHandler: channelHandler
      }); // Add this group channel handler to the Sendbird chat instance

      (_a = sdk.groupChannel) === null || _a === void 0 ? void 0 : _a.addGroupChannelHandler(channelHandlerId, new GroupChannelHandler(channelHandler));
    }

    return function () {
      var _a;

      if ((_a = sdk === null || sdk === void 0 ? void 0 : sdk.groupChannel) === null || _a === void 0 ? void 0 : _a.removeGroupChannelHandler) {
        logger.info('Channel | useHandleChannelEvents: Removing message reciver handler', channelHandlerId);
        sdk.groupChannel.removeGroupChannelHandler(channelHandlerId);
      } else if (sdk === null || sdk === void 0 ? void 0 : sdk.groupChannel) {
        logger.error('Channel | useHandleChannelEvents: Not found the removeGroupChannelHandler');
      }
    };
  }, [currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.url, sdkInit]);
}

function useSetChannel(_ref, _ref2) {
  let {
    channelUrl,
    sdkInit,
    disableMarkAsRead
  } = _ref;
  let {
    messagesDispatcher,
    sdk,
    logger
  } = _ref2;
  useEffect(() => {
    if (channelUrl && sdkInit && sdk && sdk.groupChannel) {
      logger.info('Channel | useSetChannel fetching channel', channelUrl);
      sdk.groupChannel.getChannel(channelUrl).then(groupChannel => {
        logger.info('Channel | useSetChannel fetched channel', groupChannel);
        messagesDispatcher({
          type: SET_CURRENT_CHANNEL,
          payload: groupChannel
        });
        logger.info('Channel: Mark as read', groupChannel);

        if (!disableMarkAsRead) {
          // this order is important - this mark as read should update the event handler up above
          try {
            groupChannel.markAsRead();
          } catch (_unused) {//
          }
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
      sdk.getAllEmoji().then(emojiContainer_ => {
        logger.info('Channel: Getting emojis success', emojiContainer_);
        messagesDispatcher({
          type: SET_EMOJI_CONTAINER,
          payload: emojiContainer_
        });
      }).catch(err => {
        logger.error('Channel: Getting emojis failed', err);
      });
      sdk.getAllEmoji();
    }
  }, [channelUrl, sdkInit]);
}

function useInitialMessagesFetch(_ref, _ref2) {
  let {
    currentGroupChannel,
    userFilledMessageListQuery,
    initialTimeStamp,
    replyType
  } = _ref;
  let {
    logger,
    scrollRef,
    messagesDispatcher
  } = _ref2;
  const channelUrl = currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.url;
  useEffect(() => {
    logger.info('Channel useInitialMessagesFetch: Setup started', currentGroupChannel);
    messagesDispatcher({
      type: RESET_MESSAGES,
      payload: null
    });

    if (currentGroupChannel && currentGroupChannel !== null && currentGroupChannel !== void 0 && currentGroupChannel.getMessagesByTimestamp) {
      const messageListParams = {};
      messageListParams.prevResultSize = PREV_RESULT_SIZE;

      if (initialTimeStamp) {
        messageListParams.nextResultSize = NEXT_RESULT_SIZE;
      }

      messageListParams.isInclusive = true;
      messageListParams.includeReactions = true;

      if (replyType && (replyType === 'QUOTE_REPLY' || replyType === 'THREAD')) {
        messageListParams.includeThreadInfo = true;
        messageListParams.includeParentMessageInfo = true;
        messageListParams.replyType = ReplyType.ONLY_REPLY_TO_CHANNEL;
      }

      if (userFilledMessageListQuery) {
        Object.keys(userFilledMessageListQuery).forEach(key => {
          messageListParams[key] = userFilledMessageListQuery[key];
        });
      }

      if (replyType && (replyType === 'QUOTE_REPLY' || replyType === 'THREAD') || userFilledMessageListQuery) {
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
        type: FETCH_INITIAL_MESSAGES_START,
        payload: null
      });
      currentGroupChannel.getMessagesByTimestamp(initialTimeStamp || new Date().getTime(), messageListParams).then(messages => {
        messagesDispatcher({
          type: FETCH_INITIAL_MESSAGES_SUCCESS,
          payload: {
            currentGroupChannel,
            messages
          }
        });
      }).catch(error => {
        logger.error('Channel: Fetching messages failed', error);
        messagesDispatcher({
          type: FETCH_INITIAL_MESSAGES_FAILURE,
          payload: {
            currentGroupChannel
          }
        });
      }).finally(() => {
        if (!initialTimeStamp) {
          setTimeout(() => scrollIntoLast(0, scrollRef));
        }
      });
    }
  }, [channelUrl, userFilledMessageListQuery, initialTimeStamp]);
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
      replyType = _a.replyType,
      disableMarkAsRead = _a.disableMarkAsRead;
  var logger = _b.logger,
      sdk = _b.sdk,
      scrollRef = _b.scrollRef,
      currentGroupChannel = _b.currentGroupChannel,
      messagesDispatcher = _b.messagesDispatcher,
      userFilledMessageListQuery = _b.userFilledMessageListQuery;
  useEffect(function () {
    var wasOffline = !isOnline;
    return function () {
      var _a, _b; // state changed from offline to online


      if (wasOffline && (currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.url)) {
        logger.info('Refreshing conversation state');
        var isReactionEnabled = ((_a = sdk === null || sdk === void 0 ? void 0 : sdk.appInfo) === null || _a === void 0 ? void 0 : _a.useReaction) || false;
        var messageListParams_1 = {
          prevResultSize: PREV_RESULT_SIZE,
          isInclusive: true,
          includeReactions: isReactionEnabled,
          nextResultSize: NEXT_RESULT_SIZE
        };

        if (replyType && replyType === 'QUOTE_REPLY') {
          messageListParams_1.includeThreadInfo = true;
          messageListParams_1.includeParentMessageInfo = true;
          messageListParams_1.replyType = ReplyType.ONLY_REPLY_TO_CHANNEL;
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
          type: FETCH_INITIAL_MESSAGES_START,
          payload: null
        });
        (_b = sdk === null || sdk === void 0 ? void 0 : sdk.groupChannel) === null || _b === void 0 ? void 0 : _b.getChannel(currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.url).then(function (groupChannel) {
          var _a;

          var lastMessageTime = new Date().getTime();
          groupChannel.getMessagesByTimestamp(lastMessageTime, messageListParams_1).then(function (messages) {
            messagesDispatcher({
              type: FETCH_INITIAL_MESSAGES_SUCCESS,
              payload: {
                currentGroupChannel: currentGroupChannel,
                messages: messages
              }
            });
            setTimeout(function () {
              return scrollIntoLast(0, scrollRef);
            });
          }).catch(function (error) {
            logger.error('Channel: Fetching messages failed', error);
            messagesDispatcher({
              type: FETCH_INITIAL_MESSAGES_FAILURE,
              payload: {
                currentGroupChannel: currentGroupChannel
              }
            });
          });

          if (!disableMarkAsRead) {
            try {
              (_a = currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.markAsRead) === null || _a === void 0 ? void 0 : _a.call(currentGroupChannel);
            } catch (_b) {//
            }
          }
        });
      }
    };
  }, [isOnline, replyType]);
}

function useScrollCallback(_ref, _ref2) {
  let {
    currentGroupChannel,
    oldestMessageTimeStamp,
    userFilledMessageListQuery,
    replyType
  } = _ref;
  let {
    hasMorePrev,
    logger,
    messagesDispatcher,
    sdk
  } = _ref2;
  return useCallback(cb => {
    if (!hasMorePrev) {
      return;
    }

    const {
      appInfo = {}
    } = sdk;
    const isReactionEnabled = appInfo.useReaction || false;
    const messageListParams = {
      prevResultSize: PREV_RESULT_SIZE,
      isInclusive: true,
      includeReactions: isReactionEnabled
    };

    if (replyType === 'QUOTE_REPLY' || replyType === 'THREAD') {
      messageListParams.includeThreadInfo = true;
      messageListParams.includeParentMessageInfo = true;
      messageListParams.replyType = ReplyType.ONLY_REPLY_TO_CHANNEL;
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
    currentGroupChannel.getMessagesByTimestamp(oldestMessageTimeStamp || new Date().getTime(), messageListParams).then(messages => {
      messagesDispatcher({
        type: FETCH_PREV_MESSAGES_SUCCESS,
        payload: {
          currentGroupChannel,
          messages
        }
      });
      cb([messages, null]);
    }).catch(error => {
      logger.error('Channel: Fetching messages failed', error);
      messagesDispatcher({
        type: FETCH_PREV_MESSAGES_FAILURE,
        payload: {
          currentGroupChannel
        }
      });
      cb([null, error]);
    });
  }, [currentGroupChannel, oldestMessageTimeStamp, replyType]);
}

function useScrollDownCallback(_ref, _ref2) {
  let {
    currentGroupChannel,
    latestMessageTimeStamp,
    userFilledMessageListQuery,
    hasMoreNext,
    replyType
  } = _ref;
  let {
    logger,
    messagesDispatcher,
    sdk
  } = _ref2;
  return useCallback(cb => {
    if (!hasMoreNext) {
      return;
    }

    const {
      appInfo = {}
    } = sdk;
    const isReactionEnabled = appInfo.useReaction || false;
    const messageListParams = {
      nextResultSize: NEXT_RESULT_SIZE,
      isInclusive: true,
      includeReactions: isReactionEnabled
    };

    if (replyType && (replyType === 'QUOTE_REPLY' || replyType === 'THREAD')) {
      messageListParams.includeThreadInfo = true;
      messageListParams.includeParentMessageInfo = true;
      messageListParams.replyType = ReplyType.ONLY_REPLY_TO_CHANNEL;
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
    currentGroupChannel.getMessagesByTimestamp(latestMessageTimeStamp || new Date().getTime(), messageListParams).then(messages => {
      messagesDispatcher({
        type: FETCH_NEXT_MESSAGES_SUCCESS,
        payload: {
          currentGroupChannel,
          messages
        }
      });
      cb([messages, null]);
    }).catch(error => {
      logger.error('Channel: Fetching later messages failed', error);
      messagesDispatcher({
        type: FETCH_NEXT_MESSAGES_FAILURE,
        payload: {
          currentGroupChannel
        }
      });
      cb([null, error]);
    });
  }, [currentGroupChannel, latestMessageTimeStamp, hasMoreNext, replyType]);
}

function useDeleteMessageCallback(_ref, _ref2) {
  let {
    currentGroupChannel,
    messagesDispatcher
  } = _ref;
  let {
    logger
  } = _ref2;
  return useCallback(message => {
    logger.info('Channel | useDeleteMessageCallback: Deleting message', message);
    const {
      requestState
    } = message;
    return new Promise((resolve, reject) => {
      logger.info('Channel | useDeleteMessageCallback: Deleting message requestState:', requestState); // Message is only on local

      if (requestState === 'failed' || requestState === 'pending') {
        logger.info('Channel | useDeleteMessageCallback: Deleted message from local:', message);
        messagesDispatcher({
          type: ON_MESSAGE_DELETED_BY_REQ_ID,
          payload: message.reqId
        });
        resolve(message);
      }

      logger.info('Channel | useDeleteMessageCallback: Deleting message from remote:', requestState);
      currentGroupChannel.deleteMessage(message).then(() => {
        logger.info('Channel | useDeleteMessageCallback: Deleting message success!', message);
        messagesDispatcher({
          type: ON_MESSAGE_DELETED,
          payload: message.messageId
        });
        resolve(message);
      }).catch(err => {
        logger.warning('Channel | useDeleteMessageCallback: Deleting message failed!', err);
        reject(err);
      });
    });
  }, [currentGroupChannel, messagesDispatcher]);
}

function useUpdateMessageCallback(_ref, _ref2) {
  let {
    currentGroupChannel,
    messagesDispatcher,
    onBeforeUpdateUserMessage,
    isMentionEnabled
  } = _ref;
  let {
    logger,
    pubSub
  } = _ref2;
  return useCallback((props, callback) => {
    const {
      messageId,
      message,
      mentionedUsers,
      mentionTemplate
    } = props;

    const createParamsDefault = () => {
      const params = {};
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

    const createCustomPrams = onBeforeUpdateUserMessage && typeof onBeforeUpdateUserMessage === 'function';

    if (createCustomPrams) {
      logger.info('Channel: creating params using onBeforeUpdateUserMessage', onBeforeUpdateUserMessage);
    }

    const params = onBeforeUpdateUserMessage ? onBeforeUpdateUserMessage(message) : createParamsDefault();
    logger.info('Channel: Updating message!', params);
    currentGroupChannel.updateUserMessage(messageId, params).then((msg, err) => {
      if (callback) {
        callback(err, msg);
      }

      logger.info('Channel: Updating message success!', msg);
      messagesDispatcher({
        type: ON_MESSAGE_UPDATED,
        payload: {
          channel: currentGroupChannel,
          message: msg
        }
      });
      pubSub.publish(UPDATE_USER_MESSAGE, {
        message: msg,
        channel: currentGroupChannel
      });
    });
  }, [currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.url, messagesDispatcher, onBeforeUpdateUserMessage]);
}

function useResendMessageCallback(_ref, _ref2) {
  let {
    currentGroupChannel,
    messagesDispatcher
  } = _ref;
  let {
    logger
  } = _ref2;
  return useCallback(failedMessage => {
    logger.info('Channel: Resending message has started', failedMessage);
    const {
      messageType,
      file
    } = failedMessage;

    if (failedMessage !== null && failedMessage !== void 0 && failedMessage.isResendable) {
      // Move the logic setting sendingStatus to pending into the reducer
      // eslint-disable-next-line no-param-reassign
      failedMessage.requestState = 'pending'; // eslint-disable-next-line no-param-reassign

      failedMessage.sendingStatus = 'pending';
      messagesDispatcher({
        type: RESEND_MESSAGEGE_START,
        payload: failedMessage
      }); // userMessage

      if (messageType === 'user') {
        currentGroupChannel.resendUserMessage(failedMessage).then(message => {
          logger.info('Channel: Resending message success!', message);
          messagesDispatcher({
            type: SEND_MESSAGEGE_SUCESS,
            payload: message
          });
        }).catch(e => {
          logger.warning('Channel: Resending message failed!', e); // eslint-disable-next-line no-param-reassign

          failedMessage.requestState = 'failed'; // eslint-disable-next-line no-param-reassign

          failedMessage.sendingStatus = 'failed';
          messagesDispatcher({
            type: SEND_MESSAGEGE_FAILURE,
            payload: failedMessage
          });
        }); // eslint-disable-next-line no-param-reassign

        failedMessage.requestState = 'pending'; // eslint-disable-next-line no-param-reassign

        failedMessage.sendingStatus = 'pending';
        messagesDispatcher({
          type: RESEND_MESSAGEGE_START,
          payload: failedMessage
        });
        return;
      }

      if (messageType === 'file') {
        currentGroupChannel.resendFileMessage(failedMessage, file).then(message => {
          logger.info('Channel: Resending file message success!', message);
          messagesDispatcher({
            type: SEND_MESSAGEGE_SUCESS,
            payload: message
          });
        }).catch(e => {
          logger.warning('Channel: Resending file message failed!', e); // eslint-disable-next-line no-param-reassign

          failedMessage.requestState = 'failed'; // eslint-disable-next-line no-param-reassign

          failedMessage.sendingStatus = 'failed';
          messagesDispatcher({
            type: SEND_MESSAGEGE_FAILURE,
            payload: failedMessage
          });
        }); // eslint-disable-next-line no-param-reassign

        failedMessage.requestState = 'pending'; // eslint-disable-next-line no-param-reassign

        failedMessage.sendingStatus = 'pending';
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
    isMentionEnabled,
    currentGroupChannel,
    onBeforeSendUserMessage
  } = _ref;
  let {
    logger,
    pubSub,
    scrollRef,
    messagesDispatcher
  } = _ref2;
  const messageInputRef = useRef(null);
  const sendMessage = useCallback(props => {
    const {
      quoteMessage = null,
      message,
      mentionTemplate,
      // mentionedUserIds,
      mentionedUsers
    } = props;

    const createParamsDefault = () => {
      const params = {};
      params.message = (message === null || message === void 0 ? void 0 : message.trim()) || message; // if (isMentionEnabled && mentionedUserIds?.length > 0) {

      if (isMentionEnabled && (mentionedUsers === null || mentionedUsers === void 0 ? void 0 : mentionedUsers.length) > 0) {
        // params.mentionedUserIds = mentionedUserIds;
        params.mentionedUsers = mentionedUsers;
      } // if (isMentionEnabled && mentionTemplate && mentionedUserIds?.length > 0) {


      if (isMentionEnabled && mentionTemplate && (mentionedUsers === null || mentionedUsers === void 0 ? void 0 : mentionedUsers.length) > 0) {
        params.mentionedMessageTemplate = (mentionTemplate === null || mentionTemplate === void 0 ? void 0 : mentionTemplate.trim()) || mentionTemplate;
      }

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

    const params = onBeforeSendUserMessage ? onBeforeSendUserMessage(message, quoteMessage) : createParamsDefault();
    logger.info('Channel: Sending message has started', params);
    currentGroupChannel.sendUserMessage(params).onPending(pendingMsg => {
      pubSub.publish(SEND_MESSAGE_START, {
        /* pubSub is used instead of messagesDispatcher
          to avoid redundantly calling `messageActionTypes.SEND_MESSAGEGE_START` */
        message: pendingMsg,
        channel: currentGroupChannel
      });
      setTimeout(() => scrollIntoLast(0, scrollRef));
    }).onFailed((err, msg) => {
      logger.warning('Channel: Sending message failed!', {
        message: msg,
        error: err
      });
      messagesDispatcher({
        type: SEND_MESSAGEGE_FAILURE,
        payload: msg
      });
    }).onSucceeded(msg => {
      logger.info('Channel: Sending message success!', msg);
      messagesDispatcher({
        type: SEND_MESSAGEGE_SUCESS,
        payload: msg
      });
    });
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
    logger,
    pubSub,
    scrollRef,
    messagesDispatcher
  } = _ref2;
  const sendMessage = useCallback(function (file) {
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
      const params = {};
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
            currentGroupChannel.sendFileMessage(params).onPending(pendingMessage => {
              pubSub.publish(SEND_MESSAGE_START, {
                /* pubSub is used instead of messagesDispatcher
                  to avoid redundantly calling `messageActionTypes.SEND_MESSAGEGE_START` */
                message: _objectSpread2(_objectSpread2({}, pendingMessage), {}, {
                  url: URL.createObjectURL(compressedFile),
                  // pending thumbnail message seems to be failed
                  requestState: 'pending'
                }),
                channel: currentGroupChannel
              });
              setTimeout(() => scrollIntoLast(0, scrollRef), 1000);
            }).onFailed((err, failedMessage) => {
              logger.error('Channel: Sending file message failed!', {
                failedMessage,
                err
              }); // eslint-disable-next-line no-param-reassign

              failedMessage.localUrl = URL.createObjectURL(compressedFile); // eslint-disable-next-line no-param-reassign

              failedMessage.file = compressedFile;
              messagesDispatcher({
                type: SEND_MESSAGEGE_FAILURE,
                payload: failedMessage
              });
            }).onSucceeded(succeededMessage => {
              logger.info('Channel: Sending file message success!', succeededMessage);
              messagesDispatcher({
                type: SEND_MESSAGEGE_SUCESS,
                payload: succeededMessage
              });
            });
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
      currentGroupChannel.sendFileMessage(params).onPending(pendingMsg => {
        pubSub.publish(SEND_MESSAGE_START, {
          /* pubSub is used instead of messagesDispatcher
            to avoid redundantly calling `messageActionTypes.SEND_MESSAGEGE_START` */
          message: _objectSpread2(_objectSpread2({}, pendingMsg), {}, {
            url: URL.createObjectURL(file),
            // pending thumbnail message seems to be failed
            requestState: 'pending'
          }),
          channel: currentGroupChannel
        });
        setTimeout(() => scrollIntoLast(0, scrollRef), 1000);
      }).onFailed((error, message) => {
        logger.error('Channel: Sending file message failed!', {
          message,
          error
        }); // eslint-disable-next-line no-param-reassign

        message.localUrl = URL.createObjectURL(file); // eslint-disable-next-line no-param-reassign

        message.file = file;
        messagesDispatcher({
          type: SEND_MESSAGEGE_FAILURE,
          payload: message
        });
      }).onSucceeded(message => {
        logger.info('Channel: Sending message success!', message);
        messagesDispatcher({
          type: SEND_MESSAGEGE_SUCESS,
          payload: message
        });
      });
    }
  }, [currentGroupChannel, onBeforeSendFileMessage, imageCompression]);
  return [sendMessage];
}

function useMemoizedEmojiListItems(_ref, _ref2) {
  let {
    emojiContainer,
    toggleReaction
  } = _ref;
  let {
    isReactionEnabled,
    logger,
    userId,
    emojiAllList
  } = _ref2;

  /* eslint-disable react/prop-types */
  return useMemo(() => _ref3 => {
    let {
      parentRef,
      parentContainRef,
      message,
      closeDropdown,
      spaceFromTrigger = {}
    } = _ref3;

    if (!isReactionEnabled || !(parentRef || parentContainRef || message || closeDropdown)) {
      logger.warning('Channel: Invalid Params in memoizedEmojiListItems');
      return null;
    }

    return /*#__PURE__*/React__default.createElement(EmojiListItems, {
      parentRef: parentRef,
      parentContainRef: parentContainRef,
      closeDropdown: closeDropdown,
      spaceFromTrigger: spaceFromTrigger
    }, emojiAllList.map(emoji => {
      const reactedReaction = message.reactions.filter(reaction => reaction.key === emoji.key)[0];
      const isReacted = reactedReaction ? !(reactedReaction.userIds.indexOf(userId) < 0) : false;
      return /*#__PURE__*/React__default.createElement(ReactionButton, {
        key: emoji.key,
        width: "36px",
        height: "36px",
        selected: isReacted,
        onClick: () => {
          closeDropdown();
          toggleReaction(message, emoji.key, isReacted);
        }
      }, /*#__PURE__*/React__default.createElement(ImageRenderer, {
        url: emoji.url,
        width: "28px",
        height: "28px",
        defaultComponent: /*#__PURE__*/React__default.createElement(Icon, {
          width: "28px",
          height: "28px",
          type: IconTypes.QUESTION
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
  return useCallback((message, key, isReacted) => {
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
  var setInitialTimeStamp = _a.setInitialTimeStamp,
      setAnimatedMessageId = _a.setAnimatedMessageId,
      allMessages = _a.allMessages;
  var logger = _b.logger;
  return useCallback(function (createdAt, messageId) {
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
        setInitialTimeStamp(null);
        setInitialTimeStamp(createdAt);
        setAnimatedMessageId(messageId);
      }
    });
  }, [setInitialTimeStamp, setAnimatedMessageId, allMessages]);
}

var ThreadReplySelectType;

(function (ThreadReplySelectType) {
  ThreadReplySelectType["PARENT"] = "PARENT";
  ThreadReplySelectType["THREAD"] = "THREAD";
})(ThreadReplySelectType || (ThreadReplySelectType = {}));

var ChannelContext = /*#__PURE__*/React__default.createContext(undefined);

var ChannelProvider = function (props) {
  var _a, _b, _c, _d;

  var channelUrl = props.channelUrl,
      children = props.children,
      isReactionEnabled = props.isReactionEnabled,
      _e = props.isMessageGroupingEnabled,
      isMessageGroupingEnabled = _e === void 0 ? true : _e,
      showSearchIcon = props.showSearchIcon,
      animatedMessage = props.animatedMessage,
      highlightedMessage = props.highlightedMessage,
      startingPoint = props.startingPoint,
      onBeforeSendUserMessage = props.onBeforeSendUserMessage,
      onBeforeSendFileMessage = props.onBeforeSendFileMessage,
      onBeforeUpdateUserMessage = props.onBeforeUpdateUserMessage,
      onChatHeaderActionClick = props.onChatHeaderActionClick,
      onSearchClick = props.onSearchClick,
      onBackClick = props.onBackClick,
      replyType = props.replyType,
      _f = props.threadReplySelectType,
      threadReplySelectType = _f === void 0 ? ThreadReplySelectType.THREAD : _f,
      queries = props.queries,
      _g = props.disableMarkAsRead,
      disableMarkAsRead = _g === void 0 ? false : _g,
      onReplyInThread = props.onReplyInThread,
      onQuoteMessageClick = props.onQuoteMessageClick,
      onMessageAnimated = props.onMessageAnimated,
      onMessageHighlighted = props.onMessageHighlighted;
  var globalStore = useSendbirdStateContext();
  var config = globalStore.config;
  var pubSub = config.pubSub,
      logger = config.logger,
      userId = config.userId,
      isOnline = config.isOnline,
      imageCompression = config.imageCompression,
      isMentionEnabled = config.isMentionEnabled,
      onUserProfileMessage = config.onUserProfileMessage;
  var sdk = (_b = (_a = globalStore === null || globalStore === void 0 ? void 0 : globalStore.stores) === null || _a === void 0 ? void 0 : _a.sdkStore) === null || _b === void 0 ? void 0 : _b.sdk;
  var sdkInit = (_d = (_c = globalStore === null || globalStore === void 0 ? void 0 : globalStore.stores) === null || _c === void 0 ? void 0 : _c.sdkStore) === null || _d === void 0 ? void 0 : _d.initialized;

  var _h = useState(startingPoint),
      initialTimeStamp = _h[0],
      setInitialTimeStamp = _h[1];

  useEffect(function () {
    setInitialTimeStamp(startingPoint);
  }, [startingPoint, channelUrl]);

  var _j = useState(0),
      animatedMessageId = _j[0],
      setAnimatedMessageId = _j[1];

  var _k = useState(highlightedMessage),
      highLightedMessageId = _k[0],
      setHighLightedMessageId = _k[1];

  useEffect(function () {
    setHighLightedMessageId(highlightedMessage);
  }, [highlightedMessage]);
  var userFilledMessageListQuery = queries === null || queries === void 0 ? void 0 : queries.messageListParams;

  var _l = useState(null),
      quoteMessage = _l[0],
      setQuoteMessage = _l[1];

  var _m = useReducer(reducer, messagesInitialState),
      messagesStore = _m[0],
      messagesDispatcher = _m[1];

  var scrollRef = useRef(null);
  var allMessages = messagesStore.allMessages,
      loading = messagesStore.loading,
      initialized = messagesStore.initialized,
      unreadSince = messagesStore.unreadSince,
      isInvalid = messagesStore.isInvalid,
      currentGroupChannel = messagesStore.currentGroupChannel,
      hasMorePrev = messagesStore.hasMorePrev,
      oldestMessageTimeStamp = messagesStore.oldestMessageTimeStamp,
      hasMoreNext = messagesStore.hasMoreNext,
      latestMessageTimeStamp = messagesStore.latestMessageTimeStamp,
      emojiContainer = messagesStore.emojiContainer,
      readStatus = messagesStore.readStatus;
  var isSuper = (currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.isSuper) || false;
  var isBroadcast = (currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.isBroadcast) || false;
  var appInfo = sdk.appInfo;
  var usingReaction = (appInfo === null || appInfo === void 0 ? void 0 : appInfo.useReaction) && !isBroadcast && !isSuper && ((config === null || config === void 0 ? void 0 : config.isReactionEnabled) || isReactionEnabled);
  var emojiAllMap = useMemo(function () {
    return usingReaction ? getAllEmojisMapFromEmojiContainer(emojiContainer) : new Map();
  }, [emojiContainer]);
  var emojiAllList = useMemo(function () {
    return usingReaction ? getAllEmojisFromEmojiContainer(emojiContainer) : [];
  }, [emojiContainer]);
  var nicknamesMap = useMemo(function () {
    return usingReaction && currentGroupChannel ? getNicknamesMapFromMembers(currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.members) : new Map();
  }, [currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.members]); // Animate message

  useEffect(function () {
    if (animatedMessage) {
      setAnimatedMessageId(animatedMessage);
    }
  }, [animatedMessage]); // Scrollup is default scroll for channel

  var onScrollCallback = useScrollCallback({
    currentGroupChannel: currentGroupChannel,
    oldestMessageTimeStamp: oldestMessageTimeStamp,
    userFilledMessageListQuery: userFilledMessageListQuery,
    replyType: replyType
  }, {
    hasMorePrev: hasMorePrev,
    logger: logger,
    messagesDispatcher: messagesDispatcher,
    sdk: sdk
  });
  var scrollToMessage = useScrollToMessage({
    setInitialTimeStamp: setInitialTimeStamp,
    setAnimatedMessageId: setAnimatedMessageId,
    allMessages: allMessages
  }, {
    logger: logger
  }); // onScrollDownCallback is added for navigation to different timestamps on messageSearch
  // hasMorePrev, onScrollCallback -> scroll up(default behavior)
  // hasMoreNext, onScrollDownCallback -> scroll down

  var onScrollDownCallback = useScrollDownCallback({
    currentGroupChannel: currentGroupChannel,
    latestMessageTimeStamp: latestMessageTimeStamp,
    userFilledMessageListQuery: userFilledMessageListQuery,
    hasMoreNext: hasMoreNext,
    replyType: replyType
  }, {
    logger: logger,
    messagesDispatcher: messagesDispatcher,
    sdk: sdk
  });
  var toggleReaction = useToggleReactionCallback({
    currentGroupChannel: currentGroupChannel
  }, {
    logger: logger
  });
  var memoizedEmojiListItems = useMemoizedEmojiListItems({
    emojiContainer: emojiContainer,
    toggleReaction: toggleReaction
  }, {
    isReactionEnabled: usingReaction,
    logger: logger,
    userId: userId,
    emojiAllList: emojiAllList
  }); // to create message-datasource
  // this hook sets currentGroupChannel asynchronously

  useSetChannel({
    channelUrl: channelUrl,
    sdkInit: sdkInit,
    disableMarkAsRead: disableMarkAsRead
  }, {
    messagesDispatcher: messagesDispatcher,
    sdk: sdk,
    logger: logger
  }); // to set quote message as null

  useEffect(function () {
    setQuoteMessage(null);
  }, [channelUrl]); // Hook to handle ChannelEvents and send values to useReducer using messagesDispatcher

  useHandleChannelEvents({
    currentGroupChannel: currentGroupChannel,
    sdkInit: sdkInit,
    currentUserId: userId,
    hasMoreNext: hasMoreNext,
    disableMarkAsRead: disableMarkAsRead
  }, {
    messagesDispatcher: messagesDispatcher,
    sdk: sdk,
    logger: logger,
    scrollRef: scrollRef,
    setQuoteMessage: setQuoteMessage
  }); // hook that fetches messages when channel changes
  // to be clear here useGetChannel sets currentGroupChannel
  // and useInitialMessagesFetch executes when currentGroupChannel changes
  // p.s This one executes on initialTimeStamp change too

  useInitialMessagesFetch({
    currentGroupChannel: currentGroupChannel,
    userFilledMessageListQuery: userFilledMessageListQuery,
    initialTimeStamp: initialTimeStamp,
    latestMessageTimeStamp: latestMessageTimeStamp,
    replyType: replyType
  }, {
    logger: logger,
    scrollRef: scrollRef,
    messagesDispatcher: messagesDispatcher
  }); // handles API calls from withSendbird

  useEffect(function () {
    var subscriber = pubSubHandler({
      channelUrl: channelUrl,
      pubSub: pubSub,
      dispatcher: messagesDispatcher,
      scrollRef: scrollRef
    });
    return function () {
      pubSubHandleRemover(subscriber);
    };
  }, [channelUrl, sdkInit]); // handling connection breaks

  useHandleReconnect({
    isOnline: isOnline,
    replyType: replyType,
    disableMarkAsRead: disableMarkAsRead
  }, {
    logger: logger,
    sdk: sdk,
    scrollRef: scrollRef,
    currentGroupChannel: currentGroupChannel,
    messagesDispatcher: messagesDispatcher,
    userFilledMessageListQuery: userFilledMessageListQuery
  }); // callbacks for Message CURD actions

  var deleteMessage = useDeleteMessageCallback({
    currentGroupChannel: currentGroupChannel,
    messagesDispatcher: messagesDispatcher
  }, {
    logger: logger
  });
  var updateMessage = useUpdateMessageCallback({
    currentGroupChannel: currentGroupChannel,
    messagesDispatcher: messagesDispatcher,
    onBeforeUpdateUserMessage: onBeforeUpdateUserMessage,
    isMentionEnabled: isMentionEnabled
  }, {
    logger: logger,
    pubSub: pubSub
  });
  var resendMessage = useResendMessageCallback({
    currentGroupChannel: currentGroupChannel,
    messagesDispatcher: messagesDispatcher
  }, {
    logger: logger
  });

  var _o = useSendMessageCallback({
    currentGroupChannel: currentGroupChannel,
    onBeforeSendUserMessage: onBeforeSendUserMessage,
    isMentionEnabled: isMentionEnabled
  }, {
    logger: logger,
    pubSub: pubSub,
    scrollRef: scrollRef,
    messagesDispatcher: messagesDispatcher
  }),
      messageInputRef = _o[0],
      sendMessage = _o[1];

  var sendFileMessage = useSendFileMessageCallback({
    currentGroupChannel: currentGroupChannel,
    onBeforeSendFileMessage: onBeforeSendFileMessage,
    imageCompression: imageCompression
  }, {
    logger: logger,
    pubSub: pubSub,
    scrollRef: scrollRef,
    messagesDispatcher: messagesDispatcher
  })[0];
  return /*#__PURE__*/React__default.createElement(ChannelContext.Provider, {
    value: {
      // props
      channelUrl: channelUrl,
      isReactionEnabled: usingReaction,
      isMessageGroupingEnabled: isMessageGroupingEnabled,
      showSearchIcon: showSearchIcon,
      highlightedMessage: highlightedMessage,
      startingPoint: startingPoint,
      onBeforeSendUserMessage: onBeforeSendUserMessage,
      onBeforeSendFileMessage: onBeforeSendFileMessage,
      onBeforeUpdateUserMessage: onBeforeUpdateUserMessage,
      onChatHeaderActionClick: onChatHeaderActionClick,
      onSearchClick: onSearchClick,
      onBackClick: onBackClick,
      replyType: replyType,
      threadReplySelectType: threadReplySelectType,
      queries: queries,
      disableMarkAsRead: disableMarkAsRead,
      onReplyInThread: onReplyInThread,
      onQuoteMessageClick: onQuoteMessageClick,
      onMessageAnimated: onMessageAnimated,
      onMessageHighlighted: onMessageHighlighted,
      // messagesStore
      allMessages: allMessages,
      loading: loading,
      initialized: initialized,
      unreadSince: unreadSince,
      isInvalid: isInvalid,
      currentGroupChannel: currentGroupChannel,
      hasMorePrev: hasMorePrev,
      hasMoreNext: hasMoreNext,
      oldestMessageTimeStamp: oldestMessageTimeStamp,
      latestMessageTimeStamp: latestMessageTimeStamp,
      emojiContainer: emojiContainer,
      readStatus: readStatus,
      // utils
      scrollToMessage: scrollToMessage,
      quoteMessage: quoteMessage,
      setQuoteMessage: setQuoteMessage,
      deleteMessage: deleteMessage,
      updateMessage: updateMessage,
      resendMessage: resendMessage,
      messageInputRef: messageInputRef,
      sendMessage: sendMessage,
      sendFileMessage: sendFileMessage,
      initialTimeStamp: initialTimeStamp,
      messageActionTypes: messageActionTypes,
      messagesDispatcher: messagesDispatcher,
      setInitialTimeStamp: setInitialTimeStamp,
      setAnimatedMessageId: setAnimatedMessageId,
      setHighLightedMessageId: setHighLightedMessageId,
      animatedMessageId: animatedMessageId,
      highLightedMessageId: highLightedMessageId,
      nicknamesMap: nicknamesMap,
      emojiAllMap: emojiAllMap,
      onScrollCallback: onScrollCallback,
      onScrollDownCallback: onScrollDownCallback,
      memoizedEmojiListItems: memoizedEmojiListItems,
      scrollRef: scrollRef,
      toggleReaction: toggleReaction
    }
  }, /*#__PURE__*/React__default.createElement(UserProfileProvider, {
    disableUserProfile: props === null || props === void 0 ? void 0 : props.disableUserProfile,
    renderUserProfile: props === null || props === void 0 ? void 0 : props.renderUserProfile,
    onUserProfileMessage: onUserProfileMessage
  }, children));
};

var useChannelContext = function () {
  return React__default.useContext(ChannelContext);
};

export { ChannelProvider as C, MARK_AS_READ as M, ThreadReplySelectType as T, isDisabledBecauseFrozen as a, isDisabledBecauseMuted as b, compareMessagesForGrouping as c, isOperator as d, isAboutSame as i, useChannelContext as u };
//# sourceMappingURL=ChannelProvider-3f08837d.js.map
