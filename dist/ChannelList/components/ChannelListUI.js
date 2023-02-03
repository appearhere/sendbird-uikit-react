import React__default, { useState, useEffect } from 'react';
import ChannelListHeader from './ChannelListHeader.js';
import { AddChannel } from './AddChannel.js';
import ChannelPreview from './ChannelPreview.js';
import ChannelPreviewAction from './ChannelPreviewAction.js';
import { u as useChannelListContext, F as FETCH_CHANNELS_START, a as FETCH_CHANNELS_SUCCESS, b as FETCH_CHANNELS_FAILURE, L as LEAVE_CHANNEL_SUCCESS, S as SET_CURRENT_CHANNEL } from '../../ChannelListProvider-41d1c19d.js';
import useSendbirdStateContext from '../../useSendbirdStateContext.js';
import EditProfile from '../../EditUserProfile.js';
import { P as PlaceHolder, a as PlaceHolderTypes } from '../../index-88c5a220.js';
import '../../LocalizationContext-e5f35d14.js';
import '../../stringSet-42c0e16e.js';
import '../../index-5dcd7e0f.js';
import '../../index-f60cbf08.js';
import 'prop-types';
import '../../ui/Avatar.js';
import '../../tslib.es6-75bd0528.js';
import '../../ui/ImageRenderer.js';
import '../../ui/Icon.js';
import '../../uuid-392016d0.js';
import '../../ui/IconButton.js';
import '../../CreateChannel.js';
import '../../CreateChannel/components/CreateChannelUI.js';
import '../../CreateChannelProvider-e9f3d260.js';
import '../../sendbirdSelectors.js';
import '../../topics-0560d548.js';
import '../../utils-8a4a2ff6.js';
import '../../CreateChannel/components/InviteUsers.js';
import '../../ui/Modal.js';
import 'react-dom';
import '../../index-5ab5d8fe.js';
import '../../ui/Button.js';
import '../../MediaQueryContext-0ce6633d.js';
import '../../ui/UserListItem.js';
import '../../UserProfileContext-517994e3.js';
import '../../ui/MutedAvatarOverlay.js';
import '../../ui/Checkbox.js';
import '../../ui/UserProfile.js';
import '../../ui/ContextMenu.js';
import '../../ui/SortByRow.js';
import '../../index-105a85f4.js';
import '../../utils/message/getOutgoingMessageState.js';
import '../../CreateChannel/components/SelectChannelType.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import '../../ui/ChannelAvatar.js';
import '../../utils-13fa0336.js';
import '../../ui/Badge.js';
import '../../index-1cb2692d.js';
import '../../index-229a0736.js';
import '../../ui/Loader.js';
import '../../index-05bd476f.js';
import '../../index-81d63e09.js';
import '../../ui/MentionUserLabel.js';
import '../../ui/TextButton.js';
import '../../color-52d916b6.js';
import '../../Channel/components/TypingIndicator.js';
import '@sendbird/chat/groupChannel';
import '../../ChannelProvider-3f08837d.js';
import '../../compareIds-fd8fd31e.js';
import '../../const-03d71a8a.js';
import '@sendbird/chat/message';
import '../../ui/ReactionButton.js';
import '../../useLongPress-ee44c5c3.js';
import '../../withSendbird.js';
import '../../index-481d7de2.js';
import '../../ui/Input.js';
import '../../actionTypes-35c63e84.js';

const isAboutSame = (a, b, px) => Math.abs(a - b) <= px;

var DELIVERY_RECIPT = 'delivery_receipt';

var ChannelListUI = function (props) {
  var _a;

  var renderHeader = props.renderHeader,
      renderChannelPreview = props.renderChannelPreview,
      renderPlaceHolderError = props.renderPlaceHolderError,
      renderPlaceHolderLoading = props.renderPlaceHolderLoading,
      renderPlaceHolderEmptyList = props.renderPlaceHolderEmptyList;

  var _b = useState(false),
      showProfileEdit = _b[0],
      setShowProfileEdit = _b[1];

  var _c = useChannelListContext(),
      onThemeChange = _c.onThemeChange,
      allowProfileEdit = _c.allowProfileEdit,
      allChannels = _c.allChannels,
      loading = _c.loading,
      currentChannel = _c.currentChannel,
      channelListDispatcher = _c.channelListDispatcher,
      channelSource = _c.channelSource,
      typingChannels = _c.typingChannels,
      initialized = _c.initialized;

  var state = useSendbirdStateContext();
  var sdkStore = (_a = state === null || state === void 0 ? void 0 : state.stores) === null || _a === void 0 ? void 0 : _a.sdkStore;
  var config = state === null || state === void 0 ? void 0 : state.config;
  var _d = config.logger,
      logger = _d === void 0 ? null : _d,
      _e = config.isOnline,
      isOnline = _e === void 0 ? false : _e,
      _f = config.disableMarkAsDelivered,
      disableMarkAsDelivered = _f === void 0 ? false : _f;
  var sdk = sdkStore === null || sdkStore === void 0 ? void 0 : sdkStore.sdk;
  var sdkError = sdkStore === null || sdkStore === void 0 ? void 0 : sdkStore.error;

  var _g = useState([]),
      channelsTomarkAsRead = _g[0],
      setChannelsToMarkAsRead = _g[1];

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
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-channel-list__header"
  }, (renderHeader === null || renderHeader === void 0 ? void 0 : renderHeader()) || /*#__PURE__*/React__default.createElement(ChannelListHeader, {
    onEdit: function () {
      if (allowProfileEdit) {
        setShowProfileEdit(true);
      }
    },
    allowProfileEdit: allowProfileEdit,
    renderIconButton: function () {
      return /*#__PURE__*/React__default.createElement(AddChannel, null);
    }
  })), showProfileEdit && /*#__PURE__*/React__default.createElement(EditProfile, {
    onThemeChange: onThemeChange,
    onCancel: function () {
      setShowProfileEdit(false);
    },
    onEditProfile: function () {
      setShowProfileEdit(false);
    }
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-channel-list__body",
    onScroll: function (e) {
      var target = e === null || e === void 0 ? void 0 : e.target;
      var fetchMore = isAboutSame(target.clientHeight + target.scrollTop, target.scrollHeight, 10);

      if (fetchMore && (channelSource === null || channelSource === void 0 ? void 0 : channelSource.hasNext)) {
        logger.info('ChannelList: Fetching more channels');
        channelListDispatcher({
          type: FETCH_CHANNELS_START,
          payload: null
        });
        channelSource.next().then(function (channelList) {
          var _a, _b;

          logger.info('ChannelList: Fetching channels successful', channelList);
          channelListDispatcher({
            type: FETCH_CHANNELS_SUCCESS,
            payload: channelList
          });
          var canSetMarkAsDelivered = (_b = (_a = sdk === null || sdk === void 0 ? void 0 : sdk.appInfo) === null || _a === void 0 ? void 0 : _a.premiumFeatureList) === null || _b === void 0 ? void 0 : _b.find(function (feature) {
            return feature === DELIVERY_RECIPT;
          });

          if (canSetMarkAsDelivered) {
            logger.info('ChannelList: Marking all channels as read'); // eslint-disable-next-line no-unused-expressions

            setChannelsToMarkAsRead(channelList);
          }
        }).catch(function (err) {
          logger.info('ChannelList: Fetching channels failed', err);
          channelListDispatcher({
            type: FETCH_CHANNELS_FAILURE,
            payload: err
          });
        });
      }
    }
  }, sdkError && !loading && (renderPlaceHolderError && typeof renderPlaceHolderError === 'function' ? renderPlaceHolderError === null || renderPlaceHolderError === void 0 ? void 0 : renderPlaceHolderError() : /*#__PURE__*/React__default.createElement(PlaceHolder, {
    type: PlaceHolderTypes.WRONG
  })), /*#__PURE__*/React__default.createElement("div", null, allChannels && allChannels.map(function (channel, idx) {
    // todo: Refactor and move this inside channel - preview
    var onLeaveChannel = function (c, cb) {
      logger.info('ChannelList: Leaving channel', c);
      c.leave().then(function (res) {
        logger.info('ChannelList: Leaving channel success', res);

        if (cb && typeof cb === 'function') {
          cb(res, null);
        }

        channelListDispatcher({
          type: LEAVE_CHANNEL_SUCCESS,
          payload: channel === null || channel === void 0 ? void 0 : channel.url
        });
      }).catch(function (err) {
        logger.error('ChannelList: Leaving channel failed', err);

        if (cb && typeof cb === 'function') {
          cb(null, err);
        }
      });
    };

    var onClick = function () {
      if (!isOnline) {
        return;
      }

      logger.info('ChannelList: Clicked on channel:', channel);
      channelListDispatcher({
        type: SET_CURRENT_CHANNEL,
        payload: channel
      });
    };

    return renderChannelPreview ?
    /*#__PURE__*/
    // eslint-disable-next-line
    React__default.createElement("div", {
      key: channel === null || channel === void 0 ? void 0 : channel.url,
      onClick: onClick
    }, renderChannelPreview({
      channel: channel,
      onLeaveChannel: onLeaveChannel
    })) : /*#__PURE__*/React__default.createElement(ChannelPreview, {
      key: channel === null || channel === void 0 ? void 0 : channel.url,
      tabIndex: idx,
      onClick: onClick,
      channel: channel,
      onLeaveChannel: function () {
        return onLeaveChannel(channel, null);
      },
      isActive: (channel === null || channel === void 0 ? void 0 : channel.url) === (currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url),
      isTyping: typingChannels === null || typingChannels === void 0 ? void 0 : typingChannels.some(function (_a) {
        var url = _a.url;
        return url === (channel === null || channel === void 0 ? void 0 : channel.url);
      }),
      renderChannelAction: function () {
        return /*#__PURE__*/React__default.createElement(ChannelPreviewAction, {
          channel: channel,
          disabled: !isOnline,
          onLeaveChannel: function () {
            return onLeaveChannel(channel, null);
          }
        });
      }
    });
  })), !initialized && loading && (renderPlaceHolderLoading && typeof renderPlaceHolderLoading === 'function' ? renderPlaceHolderLoading === null || renderPlaceHolderLoading === void 0 ? void 0 : renderPlaceHolderLoading() : /*#__PURE__*/React__default.createElement(PlaceHolder, {
    type: PlaceHolderTypes.LOADING
  })), initialized && (allChannels === null || allChannels === void 0 ? void 0 : allChannels.length) === 0 && (renderPlaceHolderEmptyList && typeof renderPlaceHolderEmptyList === 'function' ? renderPlaceHolderEmptyList === null || renderPlaceHolderEmptyList === void 0 ? void 0 : renderPlaceHolderEmptyList() : /*#__PURE__*/React__default.createElement(PlaceHolder, {
    type: PlaceHolderTypes.NO_CHANNELS
  }))));
};

export { ChannelListUI as default };
//# sourceMappingURL=ChannelListUI.js.map
