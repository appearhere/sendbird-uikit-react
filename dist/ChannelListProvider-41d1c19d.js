import { a as __spreadArray, _ as __assign } from './tslib.es6-75bd0528.js';
import React__default, { useReducer, useState, useEffect, useMemo, useContext } from 'react';
import { GroupChannelHandler } from '@sendbird/chat/groupChannel';
import { C as CREATE_CHANNEL$1, U as UPDATE_USER_MESSAGE, L as LEAVE_CHANNEL, S as SEND_MESSAGE_START } from './topics-0560d548.js';
import { u as uuidv4 } from './uuid-392016d0.js';
import { n as noop } from './utils-8a4a2ff6.js';
import { U as UserProfileProvider } from './UserProfileContext-517994e3.js';
import useSendbirdStateContext from './useSendbirdStateContext.js';
import { _ as _objectSpread2 } from './_rollupPluginBabelHelpers-fe256514.js';
import { f as filterChannelListParams, g as getChannelsWithUpsertedChannel } from './index-105a85f4.js';

const RESET_CHANNEL_LIST = 'RESET_CHANNEL_LIST';
const CREATE_CHANNEL = 'CREATE_CHANNEL';
const USER_INVITED = 'USER_INVITED';
const LEAVE_CHANNEL_SUCCESS = 'LEAVE_CHANNEL_SUCCESS';
const SET_CURRENT_CHANNEL = 'SET_CURRENT_CHANNEL';
const SHOW_CHANNEL_SETTINGS = 'SHOW_CHANNEL_SETTINGS';
const HIDE_CHANNEL_SETTINGS = 'HIDE_CHANNEL_SETTINGS';
const FETCH_CHANNELS_START = 'FETCH_CHANNELS_START';
const FETCH_CHANNELS_SUCCESS = 'FETCH_CHANNELS_SUCCESS';
const FETCH_CHANNELS_FAILURE = 'FETCH_CHANNELS_FAILURE';
const INIT_CHANNELS_START = 'INIT_CHANNELS_START';
const INIT_CHANNELS_SUCCESS = 'INIT_CHANNELS_SUCCESS';
const INIT_CHANNELS_FAILURE = 'INIT_CHANNELS_FAILURE';
const ON_USER_JOINED = 'ON_USER_JOINED';
const ON_CHANNEL_DELETED = 'ON_CHANNEL_DELETED';
const ON_LAST_MESSAGE_UPDATED = 'ON_LAST_MESSAGE_UPDATED';
const ON_USER_LEFT = 'ON_USER_LEFT';
const ON_CHANNEL_CHANGED = 'ON_CHANNEL_CHANGED';
const ON_CHANNEL_ARCHIVED = 'ON_CHANNEL_ARCHIVED';
const ON_CHANNEL_FROZEN = 'ON_CHANNEL_FROZEN';
const ON_CHANNEL_UNFROZEN = 'ON_CHANNEL_UNFROZEN';
const ON_READ_RECEIPT_UPDATED = 'ON_READ_RECEIPT_UPDATED';
const ON_DELIVERY_RECEIPT_UPDATED = 'ON_DELIVERY_RECEIPT_UPDATED';
const CHANNEL_REPLACED_TO_TOP = 'CHANNEL_REPLACED_TO_TOP';
const CHANNEL_LIST_PARAMS_UPDATED = 'CHANNEL_LIST_PARAMS_UPDATED';

const DELIVERY_RECIPT = 'delivery_receipt';

const createEventHandler = _ref => {
  let {
    sdk,
    sdkChannelHandlerId,
    channelListDispatcher,
    logger
  } = _ref;
  const ChannelHandler = new GroupChannelHandler({
    onChannelChanged: channel => {
      logger.info('ChannelList: onChannelChanged', channel);
      channelListDispatcher({
        type: ON_CHANNEL_CHANGED,
        payload: channel
      });
    },
    onChannelDeleted: channelUrl => {
      logger.info('ChannelList: onChannelDeleted', channelUrl);
      channelListDispatcher({
        type: ON_CHANNEL_DELETED,
        payload: channelUrl
      });
    },
    onUserJoined: channel => {
      logger.info('ChannelList: onUserJoined', channel);

      if (channel !== null && channel !== void 0 && channel.lastMessage) {
        channelListDispatcher({
          type: ON_USER_JOINED,
          payload: channel
        });
      }
    },
    onUserReceivedInvitation: (channel, inviter, invitees) => {
      logger.info('ChannelList: onUserReceivedInvitation', {
        channel,
        inviter,
        invitees
      });
      const {
        currentUser
      } = sdk;
      const isInvited = invitees.find(user => (user === null || user === void 0 ? void 0 : user.userId) === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId));

      if (isInvited) {
        channelListDispatcher({
          type: USER_INVITED,
          payload: channel
        });
      }
    },
    onUserBanned: (channel, user) => {
      const {
        currentUser
      } = sdk;
      logger.info('Channel: onUserBanned', channel);

      if (user.userId === currentUser.userId) {
        channelListDispatcher({
          type: ON_USER_LEFT,
          payload: {
            channel,
            isMe: true
          }
        });
      } else {
        channelListDispatcher({
          type: ON_USER_LEFT,
          payload: {
            channel,
            isMe: false
          }
        });
      }
    },
    onUserLeft: (channel, leftUser) => {
      const {
        currentUser
      } = sdk;
      const isMe = currentUser.userId === leftUser.userId;
      logger.info('ChannelList: onUserLeft', channel);
      channelListDispatcher({
        type: ON_USER_LEFT,
        payload: {
          channel,
          isMe
        }
      });
    },
    onReadStatus: channel => {
      logger.info('ChannelList: onReadStatus', channel);
      channelListDispatcher({
        type: ON_READ_RECEIPT_UPDATED,
        payload: channel
      });
    },
    onDeliveryReceiptUpdated: channel => {
      logger.info('ChannelList: onDeliveryReceiptUpdated', channel);

      if (channel !== null && channel !== void 0 && channel.lastMessage) {
        channelListDispatcher({
          type: ON_DELIVERY_RECEIPT_UPDATED,
          payload: channel
        });
      }
    },
    onMessageUpdated: (channel, message) => {
      if (channel !== null && channel !== void 0 && channel.lastMessage.isEqual(message)) {
        logger.info('ChannelList: onMessageUpdated', channel);
        channelListDispatcher({
          type: ON_LAST_MESSAGE_UPDATED,
          payload: channel
        });
      }
    },
    onChannelHidden: channel => {
      logger.info('ChannelList: onChannelHidden', channel);
      channelListDispatcher({
        type: ON_CHANNEL_ARCHIVED,
        payload: channel
      });
    },
    onChannelFrozen: channel => {
      logger.info('ChannelList: onChannelFrozen', channel);
      channelListDispatcher({
        type: ON_CHANNEL_FROZEN,
        payload: channel
      });
    },
    onChannelUnfrozen: channel => {
      logger.info('ChannelList: onChannelUnfrozen', channel);
      channelListDispatcher({
        type: ON_CHANNEL_UNFROZEN,
        payload: channel
      });
    }
  });
  logger.info('ChannelList: Added channelHandler');
  sdk.groupChannel.addGroupChannelHandler(sdkChannelHandlerId, ChannelHandler);
};

const createChannelListQuery = _ref2 => {
  let {
    sdk,
    userFilledChannelListQuery = {}
  } = _ref2;
  const param = {};
  param.includeEmpty = false;
  param.limit = 20; // The value of pagination limit could be set up to 100.

  param.order = 'latest_last_message'; // 'chronological', 'latest_last_message', 'channel_name_alphabetical', and 'metadata_value_alphabetical'

  if (userFilledChannelListQuery) {
    Object.keys(userFilledChannelListQuery).forEach(key => {
      param[key] = userFilledChannelListQuery[key];
    });
  }

  const channelListQuery = sdk.groupChannel.createMyGroupChannelListQuery(param);
  return channelListQuery;
};
/**
 * Setup event listener
 * create channel source query
 * addloading screen
 */


function setupChannelList(_ref3) {
  let {
    sdk,
    sdkChannelHandlerId,
    channelListDispatcher,
    setChannelSource,
    onChannelSelect,
    userFilledChannelListQuery,
    logger,
    sortChannelList,
    disableAutoSelect,
    setChannelsToMarkAsRead
  } = _ref3;

  if (sdk !== null && sdk !== void 0 && sdk.groupChannel) {
    createEventHandler({
      sdk,
      channelListDispatcher,
      sdkChannelHandlerId,
      logger
    });
  } else {
    logger.warning('ChannelList - createEventHandler: sdk or sdk.ChannelHandler does not exist', sdk);
  }

  logger.info('ChannelList - creating query', {
    userFilledChannelListQuery
  });
  const channelListQuery = createChannelListQuery({
    sdk,
    userFilledChannelListQuery
  });
  logger.info('ChannelList - created query', channelListQuery);
  setChannelSource(channelListQuery);
  channelListDispatcher({
    type: INIT_CHANNELS_START
  });

  if (userFilledChannelListQuery) {
    logger.info('ChannelList - setting up channelListQuery', channelListQuery);
    channelListDispatcher({
      type: CHANNEL_LIST_PARAMS_UPDATED,
      payload: {
        channelListQuery,
        currentUserId: sdk && sdk.currentUser && sdk.currentUser.userId
      }
    });
  }

  logger.info('ChannelList - fetching channels');

  if (channelListQuery.hasNext) {
    channelListQuery.next().then(channelList => {
      var _sdk$appInfo, _sdk$appInfo$premiumF;

      logger.info('ChannelList - fetched channels', channelList); // select first channel

      logger.info('ChannelList - highlight channel', channelList[0]);
      let sortedChannelList = channelList;

      if (sortChannelList && typeof sortChannelList === 'function') {
        sortedChannelList = sortChannelList(channelList);
        logger.info('ChannelList - channel list sorted', sortedChannelList);
      }

      if (!disableAutoSelect) {
        onChannelSelect(sortedChannelList[0]);
      }

      channelListDispatcher({
        type: INIT_CHANNELS_SUCCESS,
        payload: {
          channelList: sortedChannelList,
          disableAutoSelect
        }
      });
      const canSetMarkAsDelivered = sdk === null || sdk === void 0 ? void 0 : (_sdk$appInfo = sdk.appInfo) === null || _sdk$appInfo === void 0 ? void 0 : (_sdk$appInfo$premiumF = _sdk$appInfo.premiumFeatureList) === null || _sdk$appInfo$premiumF === void 0 ? void 0 : _sdk$appInfo$premiumF.find(feature => feature === DELIVERY_RECIPT);

      if (canSetMarkAsDelivered) {
        setChannelsToMarkAsRead(sortedChannelList);
      }
    }).catch(err => {
      if (err) {
        logger.error('ChannelList - couldnt fetch channels', err);
        channelListDispatcher({
          type: INIT_CHANNELS_FAILURE
        });
      }
    });
  } else {
    logger.info('ChannelList - there are no more channels');
  }
}

const pubSubHandleRemover = subscriber => {
  subscriber.forEach(s => {
    try {
      s.remove();
    } catch (_unused) {//
    }
  });
};
const pubSubHandler = (pubSub, channelListDispatcher) => {
  const subscriber = new Map();
  if (!pubSub) return subscriber;
  subscriber.set(CREATE_CHANNEL$1, pubSub.subscribe(CREATE_CHANNEL$1, msg => {
    const {
      channel
    } = msg;
    channelListDispatcher({
      type: 'CREATE_CHANNEL',
      payload: channel
    });
  }));
  subscriber.set(UPDATE_USER_MESSAGE, pubSub.subscribe(UPDATE_USER_MESSAGE, msg => {
    var _updatedChannel$lastM;

    const {
      channel,
      message
    } = msg;
    const updatedChannel = channel;

    if ((updatedChannel === null || updatedChannel === void 0 ? void 0 : (_updatedChannel$lastM = updatedChannel.lastMessage) === null || _updatedChannel$lastM === void 0 ? void 0 : _updatedChannel$lastM.messageId) === message.messageId) {
      updatedChannel.lastMessage = message;
    }

    if (channel) {
      channelListDispatcher({
        type: ON_LAST_MESSAGE_UPDATED,
        payload: updatedChannel
      });
    }
  }));
  subscriber.set(LEAVE_CHANNEL, pubSub.subscribe(LEAVE_CHANNEL, msg => {
    const {
      channel
    } = msg;
    channelListDispatcher({
      type: LEAVE_CHANNEL_SUCCESS,
      payload: channel === null || channel === void 0 ? void 0 : channel.url
    });
  }));
  subscriber.set(SEND_MESSAGE_START, pubSub.subscribe(SEND_MESSAGE_START, msg => {
    const {
      channel
    } = msg;
    channelListDispatcher({
      type: CHANNEL_REPLACED_TO_TOP,
      payload: channel
    });
  }));
  return subscriber;
};

var channelListInitialState = {
  // we might not need this initialized state -> should remove
  initialized: false,
  loading: true,
  allChannels: [],
  currentChannel: null,
  showSettings: false,
  channelListQuery: null,
  currentUserId: '',
  disableAutoSelect: false
};

function reducer(state, action) {
  switch (action.type) {
    case INIT_CHANNELS_START:
      return _objectSpread2(_objectSpread2({}, state), {}, {
        loading: true
      });

    case RESET_CHANNEL_LIST:
      return channelListInitialState;

    case INIT_CHANNELS_SUCCESS:
      {
        const {
          channelList,
          disableAutoSelect
        } = action.payload;
        return _objectSpread2(_objectSpread2({}, state), {}, {
          initialized: true,
          loading: false,
          allChannels: channelList,
          disableAutoSelect,
          currentChannel: !disableAutoSelect && channelList && channelList.length && channelList.length > 0 ? channelList[0] : null
        });
      }

    case FETCH_CHANNELS_SUCCESS:
      {
        const currentChannels = state.allChannels.map(c => c.url);
        const filteredChannels = action.payload.filter(_ref => {
          let {
            url
          } = _ref;
          return !currentChannels.find(c => c === url);
        });
        return _objectSpread2(_objectSpread2({}, state), {}, {
          allChannels: [...state.allChannels, ...filteredChannels]
        });
      }

    case USER_INVITED:
      {
        const channel = action.payload;

        if (state.channelListQuery) {
          if (filterChannelListParams(state.channelListQuery, channel, state.currentUserId)) {
            return _objectSpread2(_objectSpread2({}, state), {}, {
              allChannels: getChannelsWithUpsertedChannel(state.allChannels, channel)
            });
          }

          return _objectSpread2(_objectSpread2({}, state), {}, {
            currentChannel: channel
          });
        }

        return _objectSpread2(_objectSpread2({}, state), {}, {
          allChannels: [channel, ...state.allChannels.filter(ch => ch.url !== (channel === null || channel === void 0 ? void 0 : channel.url))]
        });
      }

    case CREATE_CHANNEL:
      {
        const channel = action.payload;

        if (state.channelListQuery) {
          if (filterChannelListParams(state.channelListQuery, channel, state.currentUserId)) {
            return _objectSpread2(_objectSpread2({}, state), {}, {
              allChannels: getChannelsWithUpsertedChannel(state.allChannels, channel)
            });
          }

          return _objectSpread2(_objectSpread2({}, state), {}, {
            currentChannel: channel
          });
        }

        return _objectSpread2(_objectSpread2({}, state), {}, {
          allChannels: [channel, ...state.allChannels.filter(ch => ch.url !== (channel === null || channel === void 0 ? void 0 : channel.url))],
          currentChannel: channel
        });
      }

    case ON_CHANNEL_ARCHIVED:
      {
        var _state$currentChannel;

        const channel = action.payload;

        if (state.channelListQuery) {
          if (filterChannelListParams(state.channelListQuery, channel, state.currentUserId)) {
            return _objectSpread2(_objectSpread2({}, state), {}, {
              allChannels: getChannelsWithUpsertedChannel(state.allChannels, channel)
            }); // TODO: Check if we have to set current channel
          }
        }

        const nextChannel = (channel === null || channel === void 0 ? void 0 : channel.url) === ((_state$currentChannel = state.currentChannel) === null || _state$currentChannel === void 0 ? void 0 : _state$currentChannel.url) ? state.allChannels[state.allChannels[0].url === (channel === null || channel === void 0 ? void 0 : channel.url) ? 1 : 0] : state.currentChannel;
        return _objectSpread2(_objectSpread2({}, state), {}, {
          allChannels: state.allChannels.filter(_ref2 => {
            let {
              url
            } = _ref2;
            return url !== (channel === null || channel === void 0 ? void 0 : channel.url);
          }),
          currentChannel: state.disableAutoSelect ? null : nextChannel
        });
      }

    case LEAVE_CHANNEL_SUCCESS:
    case ON_CHANNEL_DELETED:
      {
        var _state$currentChannel2;

        const channelUrl = action.payload;
        return _objectSpread2(_objectSpread2({}, state), {}, {
          currentChannel: channelUrl === ((_state$currentChannel2 = state.currentChannel) === null || _state$currentChannel2 === void 0 ? void 0 : _state$currentChannel2.url) ? state.allChannels[0] : state.currentChannel,
          allChannels: state.allChannels.filter(_ref3 => {
            let {
              url
            } = _ref3;
            return url !== channelUrl;
          })
        });
      }

    case ON_USER_LEFT:
      {
        var _state$currentChannel5;

        const {
          channel,
          isMe
        } = action.payload;

        if (state.channelListQuery) {
          var _state$currentChannel4;

          if (filterChannelListParams(state.channelListQuery, channel, state.currentUserId)) {
            var _state$currentChannel3;

            const filteredChannels = getChannelsWithUpsertedChannel(state.allChannels, channel);
            const nextChannel = isMe && (channel === null || channel === void 0 ? void 0 : channel.url) === ((_state$currentChannel3 = state.currentChannel) === null || _state$currentChannel3 === void 0 ? void 0 : _state$currentChannel3.url) ? filteredChannels[0] : state.currentChannel;
            return _objectSpread2(_objectSpread2({}, state), {}, {
              currentChannel: state.disableAutoSelect ? null : nextChannel,
              allChannels: filteredChannels
            });
          }

          const nextChannel = (channel === null || channel === void 0 ? void 0 : channel.url) === ((_state$currentChannel4 = state.currentChannel) === null || _state$currentChannel4 === void 0 ? void 0 : _state$currentChannel4.url) ? state.allChannels[0] : state.currentChannel;
          return _objectSpread2(_objectSpread2({}, state), {}, {
            currentChannel: state.disableAutoSelect ? null : nextChannel,
            allChannels: state.allChannels.filter(_ref4 => {
              let {
                url
              } = _ref4;
              return url !== (channel === null || channel === void 0 ? void 0 : channel.url);
            })
          });
        }

        const filteredChannels = state.allChannels.filter(c => !(c.url === (channel === null || channel === void 0 ? void 0 : channel.url) && isMe));
        const nextChannel = isMe && (channel === null || channel === void 0 ? void 0 : channel.url) === ((_state$currentChannel5 = state.currentChannel) === null || _state$currentChannel5 === void 0 ? void 0 : _state$currentChannel5.url) ? filteredChannels[0] : state.currentChannel;
        return _objectSpread2(_objectSpread2({}, state), {}, {
          currentChannel: state.disableAutoSelect ? null : nextChannel,
          allChannels: filteredChannels
        });
      }

    case ON_USER_JOINED:
    case ON_CHANNEL_CHANGED:
    case ON_READ_RECEIPT_UPDATED:
    case ON_DELIVERY_RECEIPT_UPDATED:
      {
        const {
          allChannels = []
        } = state;
        const channel = action.payload;
        const {
          unreadMessageCount
        } = channel;
        if (!(channel !== null && channel !== void 0 && channel.lastMessage)) return state;

        if (state.channelListQuery) {
          var _state$currentChannel6;

          if (filterChannelListParams(state.channelListQuery, channel, state.currentUserId)) {
            return _objectSpread2(_objectSpread2({}, state), {}, {
              allChannels: getChannelsWithUpsertedChannel(allChannels, channel)
            });
          }

          const nextChannel = (channel === null || channel === void 0 ? void 0 : channel.url) === ((_state$currentChannel6 = state.currentChannel) === null || _state$currentChannel6 === void 0 ? void 0 : _state$currentChannel6.url) ? state.allChannels[state.allChannels[0].url === (channel === null || channel === void 0 ? void 0 : channel.url) ? 1 : 0] // if coming channel is first of channel list, current channel will be the next one
          : state.currentChannel;
          return _objectSpread2(_objectSpread2({}, state), {}, {
            currentChannel: state.disableAutoSelect ? null : nextChannel,
            allChannels: state.allChannels.filter(_ref5 => {
              let {
                url
              } = _ref5;
              return url !== (channel === null || channel === void 0 ? void 0 : channel.url);
            })
          });
        } // if its only an unread message count change, dont push to top


        if (unreadMessageCount === 0) {
          const currentChannel = allChannels.find(_ref6 => {
            let {
              url
            } = _ref6;
            return url === (channel === null || channel === void 0 ? void 0 : channel.url);
          });
          const currentUnreadCount = currentChannel && currentChannel.unreadMessageCount;

          if (currentUnreadCount === 0) {
            return _objectSpread2(_objectSpread2({}, state), {}, {
              allChannels: state.allChannels.map(ch => ch.url === (channel === null || channel === void 0 ? void 0 : channel.url) ? channel : ch)
            });
          }
        }

        return _objectSpread2(_objectSpread2({}, state), {}, {
          allChannels: [channel, ...state.allChannels.filter(_ref7 => {
            let {
              url
            } = _ref7;
            return url !== action.payload.url;
          })]
        });
      }

    case SET_CURRENT_CHANNEL:
      return _objectSpread2(_objectSpread2({}, state), {}, {
        currentChannel: action.payload
      });

    case SHOW_CHANNEL_SETTINGS:
      return _objectSpread2(_objectSpread2({}, state), {}, {
        showSettings: true
      });

    case HIDE_CHANNEL_SETTINGS:
      return _objectSpread2(_objectSpread2({}, state), {}, {
        showSettings: false
      });

    case ON_LAST_MESSAGE_UPDATED:
      {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          allChannels: state.allChannels.map(channel => (channel === null || channel === void 0 ? void 0 : channel.url) === action.payload.url ? action.payload : channel)
        });
      }

    case ON_CHANNEL_FROZEN:
      {
        const channel = action.payload;

        if (state.channelListQuery) {
          var _state$currentChannel7;

          if (filterChannelListParams(state.channelListQuery, channel, state.currentUserId)) {
            return _objectSpread2(_objectSpread2({}, state), {}, {
              allChannels: getChannelsWithUpsertedChannel(state.allChannels, channel)
            });
          }

          const nextChannel = (channel === null || channel === void 0 ? void 0 : channel.url) === ((_state$currentChannel7 = state.currentChannel) === null || _state$currentChannel7 === void 0 ? void 0 : _state$currentChannel7.url) ? state.allChannels[state.allChannels[0].url === (channel === null || channel === void 0 ? void 0 : channel.url) ? 1 : 0] // if coming channel is first of channel list, current channel will be the next one
          : state.currentChannel;
          return _objectSpread2(_objectSpread2({}, state), {}, {
            allChannels: state.allChannels.filter(_ref8 => {
              let {
                url
              } = _ref8;
              return url !== (channel === null || channel === void 0 ? void 0 : channel.url);
            }),
            currentChannel: state.disableAutoSelect ? null : nextChannel
          });
        }

        return _objectSpread2(_objectSpread2({}, state), {}, {
          allChannels: state.allChannels.map(ch => {
            if (ch.url === (channel === null || channel === void 0 ? void 0 : channel.url)) {
              // eslint-disable-next-line no-param-reassign
              ch.isFrozen = true;
              return ch;
            }

            return ch;
          })
        });
      }

    case ON_CHANNEL_UNFROZEN:
      {
        const channel = action.payload;

        if (state.channelListQuery) {
          var _state$currentChannel8;

          if (filterChannelListParams(state.channelListQuery, channel, state.currentUserId)) {
            return _objectSpread2(_objectSpread2({}, state), {}, {
              allChannels: getChannelsWithUpsertedChannel(state.allChannels, channel)
            });
          }

          const nextChannel = (channel === null || channel === void 0 ? void 0 : channel.url) === ((_state$currentChannel8 = state.currentChannel) === null || _state$currentChannel8 === void 0 ? void 0 : _state$currentChannel8.url) ? state.allChannels[state.allChannels[0].url === (channel === null || channel === void 0 ? void 0 : channel.url) ? 1 : 0] // if coming channel is first of channel list, current channel will be the next one
          : state.currentChannel;
          return _objectSpread2(_objectSpread2({}, state), {}, {
            allChannels: state.allChannels.filter(_ref9 => {
              let {
                url
              } = _ref9;
              return url !== (channel === null || channel === void 0 ? void 0 : channel.url);
            }),
            currentChannel: state.disableAutoSelect ? null : nextChannel
          });
        }

        return _objectSpread2(_objectSpread2({}, state), {}, {
          allChannels: state.allChannels.map(ch => {
            if (ch.url === (channel === null || channel === void 0 ? void 0 : channel.url)) {
              // eslint-disable-next-line no-param-reassign
              ch.isFrozen = false;
              return ch;
            }

            return ch;
          })
        });
      }

    case CHANNEL_REPLACED_TO_TOP:
      {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          allChannels: [action.payload, ...state.allChannels.filter(channel => (channel === null || channel === void 0 ? void 0 : channel.url) !== action.payload.url)]
        });
      }

    case CHANNEL_LIST_PARAMS_UPDATED:
      return _objectSpread2(_objectSpread2({}, state), {}, {
        currentUserId: action.payload.currentUserId,
        channelListQuery: action.payload.channelListQuery
      });

    default:
      return state;
  }
}

var ChannelListContext = /*#__PURE__*/React__default.createContext({
  disableUserProfile: true,
  allowProfileEdit: true,
  onBeforeCreateChannel: null,
  onThemeChange: null,
  onProfileEditSuccess: null,
  onChannelSelect: null,
  queries: {},
  className: null,
  initialized: false,
  loading: false,
  allChannels: [],
  currentChannel: null,
  showSettings: false,
  channelListQuery: {},
  currentUserId: null,
  channelListDispatcher: null,
  channelSource: null,
  typingChannels: []
});

var ChannelListProvider = function (props) {
  var _a; // destruct props


  var children = props.children,
      className = props.className,
      disableUserProfile = props.disableUserProfile,
      allowProfileEdit = props.allowProfileEdit,
      queries = props.queries,
      onProfileEditSuccess = props.onProfileEditSuccess,
      onThemeChange = props.onThemeChange,
      onBeforeCreateChannel = props.onBeforeCreateChannel,
      sortChannelList = props.sortChannelList,
      overrideInviteUser = props.overrideInviteUser,
      disableAutoSelect = props.disableAutoSelect,
      _b = props.isTypingIndicatorEnabled,
      isTypingIndicatorEnabled = _b === void 0 ? null : _b,
      _c = props.isMessageReceiptStatusEnabled,
      isMessageReceiptStatusEnabled = _c === void 0 ? null : _c;
  var onChannelSelect = (props === null || props === void 0 ? void 0 : props.onChannelSelect) || noop; // fetch store from <SendbirdProvider />

  var globalStore = useSendbirdStateContext();
  var config = globalStore.config,
      stores = globalStore.stores;
  var sdkStore = stores.sdkStore;
  var pubSub = config.pubSub,
      logger = config.logger,
      onUserProfileMessage = config.onUserProfileMessage;
  var _d = config.disableMarkAsDelivered,
      disableMarkAsDelivered = _d === void 0 ? false : _d,
      _e = config.isTypingIndicatorEnabledOnChannelList,
      isTypingIndicatorEnabledOnChannelList = _e === void 0 ? false : _e,
      _f = config.isMessageReceiptStatusEnabledOnChannelList,
      isMessageReceiptStatusEnabledOnChannelList = _f === void 0 ? false : _f;
  var sdk = sdkStore === null || sdkStore === void 0 ? void 0 : sdkStore.sdk; // derive some variables
  // enable if it is true atleast once(both are flase by default)

  var userDefinedDisableUserProfile = disableUserProfile || (config === null || config === void 0 ? void 0 : config.disableUserProfile);
  var userDefinedRenderProfile = config === null || config === void 0 ? void 0 : config.renderUserProfile;
  var enableEditProfile = allowProfileEdit || (config === null || config === void 0 ? void 0 : config.allowProfileEdit);
  var userFilledChannelListQuery = queries === null || queries === void 0 ? void 0 : queries.channelListQuery;
  var userFilledApplicationUserListQuery = queries === null || queries === void 0 ? void 0 : queries.applicationUserListQuery;
  var sdkIntialized = sdkStore === null || sdkStore === void 0 ? void 0 : sdkStore.initialized;

  var _g = useReducer(reducer, channelListInitialState),
      channelListStore = _g[0],
      channelListDispatcher = _g[1];

  var loading = channelListStore.loading,
      currentChannel = channelListStore.currentChannel;

  var _h = useState(),
      channelSource = _h[0],
      setChannelSource = _h[1];

  var _j = useState([]),
      typingChannels = _j[0],
      setTypingChannels = _j[1];

  var _k = useState([]),
      channelsTomarkAsRead = _k[0],
      setChannelsToMarkAsRead = _k[1];

  useEffect(function () {
    // https://stackoverflow.com/a/60907638
    var isMounted = true;

    if ((channelsTomarkAsRead === null || channelsTomarkAsRead === void 0 ? void 0 : channelsTomarkAsRead.length) > 0 && !disableMarkAsDelivered) {
      channelsTomarkAsRead === null || channelsTomarkAsRead === void 0 ? void 0 : channelsTomarkAsRead.forEach(function (c, idx) {
        // Plan-based rate limits - minimum limit is 5 requests per second
        setTimeout(function () {
          if (isMounted) {
            c === null || c === void 0 ? void 0 : c.markAsDelivered();
          }
        }, 2000 * idx);
      });
    }

    return function () {
      isMounted = false;
    };
  }, [channelsTomarkAsRead]);
  useEffect(function () {
    var subscriber = pubSubHandler(pubSub, channelListDispatcher);
    return function () {
      pubSubHandleRemover(subscriber);
    };
  }, [sdkIntialized]);
  useEffect(function () {
    var _a;

    var sdkChannelHandlerId = uuidv4();

    if (sdkIntialized) {
      logger.info('ChannelList: Setup channelHandlers');
      setupChannelList({
        sdk: sdk,
        sdkChannelHandlerId: sdkChannelHandlerId,
        channelListDispatcher: channelListDispatcher,
        setChannelSource: setChannelSource,
        onChannelSelect: onChannelSelect,
        userFilledChannelListQuery: userFilledChannelListQuery,
        logger: logger,
        sortChannelList: sortChannelList,
        disableAutoSelect: disableAutoSelect,
        setChannelsToMarkAsRead: setChannelsToMarkAsRead
      });
    } else {
      logger.info('ChannelList: Removing channelHandlers'); // remove previous channelHandlers

      if ((_a = sdk === null || sdk === void 0 ? void 0 : sdk.groupChannel) === null || _a === void 0 ? void 0 : _a.removeGroupChannelHandler) {
        sdk.groupChannel.removeGroupChannelHandler(sdkChannelHandlerId);
      } // remove channelSource


      setChannelSource(null); // cleanup

      channelListDispatcher({
        type: RESET_CHANNEL_LIST,
        payload: null
      });
    }

    return function () {
      var _a, _b;

      logger.info('ChannelList: Removing channelHandlers');

      if ((_a = sdk === null || sdk === void 0 ? void 0 : sdk.groupChannel) === null || _a === void 0 ? void 0 : _a.removeGroupChannelHandler) {
        (_b = sdk === null || sdk === void 0 ? void 0 : sdk.groupChannel) === null || _b === void 0 ? void 0 : _b.removeGroupChannelHandler(sdkChannelHandlerId);
      }
    };
  }, [sdkIntialized, userFilledChannelListQuery, sortChannelList]);
  useEffect(function () {
    var _a, _b;

    var typingHandlerId = null;

    if ((_a = sdk === null || sdk === void 0 ? void 0 : sdk.groupChannel) === null || _a === void 0 ? void 0 : _a.addGroupChannelHandler) {
      typingHandlerId = uuidv4();
      var handler = new GroupChannelHandler({
        onTypingStatusUpdated: function (channel) {
          var _a;

          var typingMemberCount = (_a = channel === null || channel === void 0 ? void 0 : channel.getTypingUsers()) === null || _a === void 0 ? void 0 : _a.length;
          var channelList = typingChannels.filter(function (ch) {
            return ch.url !== channel.url;
          });

          if (typingMemberCount > 0) {
            setTypingChannels(__spreadArray(__spreadArray([], channelList, true), [channel], false));
          } else {
            setTypingChannels(channelList);
          }
        },
        onUnreadMemberStatusUpdated: function (channel) {
          channelListDispatcher({
            type: ON_LAST_MESSAGE_UPDATED,
            payload: channel
          });
        },
        onUndeliveredMemberStatusUpdated: function (channel) {
          channelListDispatcher({
            type: ON_LAST_MESSAGE_UPDATED,
            payload: channel
          });
        },
        onMessageUpdated: function (channel) {
          channelListDispatcher({
            type: ON_LAST_MESSAGE_UPDATED,
            payload: channel
          });
          sdk.groupChannel.getChannelWithoutCache(channel.url).then(function (ch) {
            channelListDispatcher({
              type: ON_LAST_MESSAGE_UPDATED,
              payload: ch
            });
          });
        },
        onMentionReceived: function (channel) {
          channelListDispatcher({
            type: ON_LAST_MESSAGE_UPDATED,
            payload: channel
          });
          sdk.groupChannel.getChannelWithoutCache(channel.url).then(function (ch) {
            channelListDispatcher({
              type: ON_LAST_MESSAGE_UPDATED,
              payload: ch
            });
          });
        }
      });
      (_b = sdk === null || sdk === void 0 ? void 0 : sdk.groupChannel) === null || _b === void 0 ? void 0 : _b.addGroupChannelHandler(typingHandlerId, handler);
    }

    return function () {
      var _a;

      if (((_a = sdk === null || sdk === void 0 ? void 0 : sdk.groupChannel) === null || _a === void 0 ? void 0 : _a.removeGroupChannelHandler) && typingHandlerId) {
        sdk.groupChannel.removeGroupChannelHandler(typingHandlerId);
      }
    };
  }, [(_a = sdk === null || sdk === void 0 ? void 0 : sdk.currentUser) === null || _a === void 0 ? void 0 : _a.userId]);
  var queries_ = useMemo(function () {
    return {
      applicationUserListQuery: userFilledApplicationUserListQuery,
      channelListQuery: userFilledChannelListQuery
    };
  }, [userFilledApplicationUserListQuery, userFilledChannelListQuery]);
  var allChannels = channelListStore.allChannels;
  var sortedChannels = sortChannelList && typeof sortChannelList === 'function' ? sortChannelList(allChannels) : allChannels;

  if (sortedChannels.length !== allChannels.length) {
    var warning = "ChannelList: You have removed/added extra channels on sortChannelList\n      this could cause unexpected problems"; // eslint-disable-next-line no-console

    console.warn(warning, {
      before: allChannels,
      after: sortedChannels
    });
    logger.warning(warning, {
      before: allChannels,
      after: sortedChannels
    });
  } // Set current channel (by on_channel_selected event)


  useEffect(function () {
    if (!sdk || !sdk.groupChannel || !currentChannel || !(currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url)) {
      return;
    }

    sdk.groupChannel.getChannel(currentChannel.url).then(function (groupChannel) {
      if (groupChannel) {
        onChannelSelect(groupChannel);
      } else {
        onChannelSelect(null);
      }
    });
  }, [currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url]);
  return /*#__PURE__*/React__default.createElement(ChannelListContext.Provider, {
    value: __assign(__assign({
      className: className,
      disableUserProfile: disableUserProfile,
      queries: queries_,
      onProfileEditSuccess: onProfileEditSuccess,
      onThemeChange: onThemeChange,
      onBeforeCreateChannel: onBeforeCreateChannel,
      overrideInviteUser: overrideInviteUser,
      onChannelSelect: onChannelSelect,
      sortChannelList: sortChannelList,
      loading: loading,
      allowProfileEdit: enableEditProfile,
      channelListDispatcher: channelListDispatcher,
      channelSource: channelSource
    }, channelListStore), {
      allChannels: sortedChannels,
      typingChannels: typingChannels,
      isTypingIndicatorEnabled: isTypingIndicatorEnabled !== null ? isTypingIndicatorEnabled : isTypingIndicatorEnabledOnChannelList,
      isMessageReceiptStatusEnabled: isMessageReceiptStatusEnabled !== null ? isMessageReceiptStatusEnabled : isMessageReceiptStatusEnabledOnChannelList
    })
  }, /*#__PURE__*/React__default.createElement(UserProfileProvider, {
    disableUserProfile: userDefinedDisableUserProfile,
    renderUserProfile: userDefinedRenderProfile,
    onUserProfileMessage: onUserProfileMessage
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-channel-list ".concat(className)
  }, children)));
};

function useChannelListContext() {
  var context = useContext(ChannelListContext);
  return context;
}

export { ChannelListProvider as C, FETCH_CHANNELS_START as F, LEAVE_CHANNEL_SUCCESS as L, SET_CURRENT_CHANNEL as S, FETCH_CHANNELS_SUCCESS as a, FETCH_CHANNELS_FAILURE as b, useChannelListContext as u };
//# sourceMappingURL=ChannelListProvider-41d1c19d.js.map
