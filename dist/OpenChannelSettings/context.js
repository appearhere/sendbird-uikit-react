import React__default, { useState, useEffect } from 'react';
import { OpenChannelHandler } from '@sendbird/chat/openChannel';
import useSendbirdStateContext from '../useSendbirdStateContext.js';
import { U as UserProfileProvider } from '../UserProfileContext-517994e3.js';
import { u as uuidv4 } from '../uuid-392016d0.js';
import '../withSendbird.js';
import '../_rollupPluginBabelHelpers-fe256514.js';
import 'prop-types';

var OpenChannelSettingsContext = /*#__PURE__*/React__default.createContext(undefined);

var OpenChannelSettingsProvider = function (props) {
  var _a, _b, _c, _d, _e, _f;

  var children = props.children,
      channelUrl = props.channelUrl,
      onCloseClick = props.onCloseClick,
      onChannelModified = props.onChannelModified,
      onBeforeUpdateChannel = props.onBeforeUpdateChannel,
      onDeleteChannel = props.onDeleteChannel; // fetch store from <SendbirdProvider />

  var globalStore = useSendbirdStateContext();
  var sdk = (_b = (_a = globalStore === null || globalStore === void 0 ? void 0 : globalStore.stores) === null || _a === void 0 ? void 0 : _a.sdkStore) === null || _b === void 0 ? void 0 : _b.sdk;
  var isSDKInitialized = (_d = (_c = globalStore === null || globalStore === void 0 ? void 0 : globalStore.stores) === null || _c === void 0 ? void 0 : _c.sdkStore) === null || _d === void 0 ? void 0 : _d.initialized;
  var logger = (_e = globalStore === null || globalStore === void 0 ? void 0 : globalStore.config) === null || _e === void 0 ? void 0 : _e.logger;
  var currentUserId = (_f = sdk === null || sdk === void 0 ? void 0 : sdk.currentUser) === null || _f === void 0 ? void 0 : _f.userId;

  var _g = useState(null),
      currentChannel = _g[0],
      setChannel = _g[1];

  var _h = useState(false),
      isChannelInitialized = _h[0],
      setChannelInitialized = _h[1];

  useEffect(function () {
    if (!channelUrl || !sdk.openChannel) {
      setChannel(null);
      return;
    }

    sdk.openChannel.getChannel(channelUrl).then(function (channel) {
      logger.info('open channel setting: fetched', channel); // TODO: Add pending status

      channel.enter().then(function () {
        setChannel(channel);
        logger.info('OpenChannelSettings | Succeeded to enter channel', channel === null || channel === void 0 ? void 0 : channel.url);
        setChannelInitialized(true);
      }).catch(function (error) {
        setChannel(null);
        logger.warning('OpenChannelSettings | Failed to enter channel', error);
      });
    }).catch(function (error) {
      logger.error('open channel setting: error fetching', error);
      setChannel(null);
    });
    return function () {
      if (currentChannel && currentChannel.exit) {
        currentChannel.exit().then(function () {
          logger.info('OpenChannelSettings | Succeeded to exit channel', currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url);
        }).catch(function (error) {
          logger.warning('OpenChannelSettings | Failed to exit channel', error);
        });
      }
    };
  }, [channelUrl, isSDKInitialized]);
  useEffect(function () {
    var _a;

    var channelHandlerId = uuidv4();

    if (currentChannel !== null && ((_a = sdk === null || sdk === void 0 ? void 0 : sdk.openChannel) === null || _a === void 0 ? void 0 : _a.addOpenChannelHandler)) {
      var channelHandlerParams = new OpenChannelHandler({
        onOperatorUpdated: function (channel) {
          if ((channel === null || channel === void 0 ? void 0 : channel.url) === (currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url)) {
            setChannel(channel);
          }
        },
        onUserMuted: function (channel, user) {
          if ((channel === null || channel === void 0 ? void 0 : channel.url) === (currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url) && (user === null || user === void 0 ? void 0 : user.userId) === currentUserId) {
            setChannel(channel);
          }
        },
        onUserUnmuted: function (channel, user) {
          if ((channel === null || channel === void 0 ? void 0 : channel.url) === (currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url) && (user === null || user === void 0 ? void 0 : user.userId) === currentUserId) {
            setChannel(channel);
          }
        },
        onUserBanned: function (channel, user) {
          if ((channel === null || channel === void 0 ? void 0 : channel.url) === (currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url) && (user === null || user === void 0 ? void 0 : user.userId) === currentUserId) {
            setChannel(null);
          }
        },
        onUserUnbanned: function (channel, user) {
          if ((user === null || user === void 0 ? void 0 : user.userId) === currentUserId) {
            setChannel(channel);
          }
        },
        onChannelChanged: function (channel) {
          if ((channel === null || channel === void 0 ? void 0 : channel.url) === (currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url)) {
            setChannel(channel);
          }
        },
        onChannelDeleted: function (channelUrl) {
          if (channelUrl === (currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url)) {
            setChannel(null);
          }
        }
      });
      sdk.openChannel.addOpenChannelHandler(channelHandlerId, channelHandlerParams);
    }

    return function () {
      var _a, _b, _c;

      if (((_a = sdk === null || sdk === void 0 ? void 0 : sdk.openChannel) === null || _a === void 0 ? void 0 : _a.removeOpenChannelHandler) && channelHandlerId) {
        logger.info('OpenChannelSettings | Removing channel handlers', channelHandlerId);
        (_c = (_b = sdk.openChannel).removeOpenChannelHandler) === null || _c === void 0 ? void 0 : _c.call(_b, channelHandlerId);
      }
    };
  }, [channelUrl]);
  return /*#__PURE__*/React__default.createElement(OpenChannelSettingsContext.Provider, {
    value: {
      channelUrl: channelUrl,
      channel: currentChannel,
      isChannelInitialized: isChannelInitialized,
      setChannel: setChannel,
      onCloseClick: onCloseClick,
      onChannelModified: onChannelModified,
      onBeforeUpdateChannel: onBeforeUpdateChannel,
      onDeleteChannel: onDeleteChannel
    }
  }, /*#__PURE__*/React__default.createElement(UserProfileProvider, {
    isOpenChannel: true,
    renderUserProfile: props === null || props === void 0 ? void 0 : props.renderUserProfile,
    disableUserProfile: props === null || props === void 0 ? void 0 : props.disableUserProfile
  }, children));
};

var useOpenChannelSettingsContext = function () {
  return React__default.useContext(OpenChannelSettingsContext);
};

export { OpenChannelSettingsProvider, useOpenChannelSettingsContext };
//# sourceMappingURL=context.js.map
