'use strict';

var React = require('react');
var ChannelList_components_ChannelListHeader = require('./ChannelListHeader.js');
var ChannelList_components_AddChannel = require('./AddChannel.js');
var ChannelList_components_ChannelPreview = require('./ChannelPreview.js');
var ChannelList_components_ChannelPreviewAction = require('./ChannelPreviewAction.js');
var ChannelList_context = require('../../ChannelListProvider-05beb013.js');
var useSendbirdStateContext = require('../../useSendbirdStateContext.js');
var EditUserProfile = require('../../EditUserProfile.js');
var ui_PlaceHolder = require('../../index-6b9230ae.js');
require('../../LocalizationContext-f4281153.js');
require('../../stringSet-2dfd148b.js');
require('../../index-d4bc012c.js');
require('../../index-4197d014.js');
require('prop-types');
require('../../ui/Avatar.js');
require('../../tslib.es6-d6068b10.js');
require('../../ui/ImageRenderer.js');
require('../../ui/Icon.js');
require('../../uuid-2f4916c1.js');
require('../../ui/IconButton.js');
require('../../CreateChannel.js');
require('../../CreateChannel/components/CreateChannelUI.js');
require('../../CreateChannelProvider-9629e09e.js');
require('../../sendbirdSelectors.js');
require('../../topics-085b5602.js');
require('../../utils-a9158c72.js');
require('../../CreateChannel/components/InviteUsers.js');
require('../../ui/Modal.js');
require('react-dom');
require('../../index-1b132096.js');
require('../../ui/Button.js');
require('../../MediaQueryContext-9a5566fc.js');
require('../../ui/UserListItem.js');
require('../../UserProfileContext-fd00d1bd.js');
require('../../ui/MutedAvatarOverlay.js');
require('../../ui/Checkbox.js');
require('../../ui/UserProfile.js');
require('../../ui/ContextMenu.js');
require('../../ui/SortByRow.js');
require('../../index-d05a5cae.js');
require('../../utils/message/getOutgoingMessageState.js');
require('../../CreateChannel/components/SelectChannelType.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('../../ui/ChannelAvatar.js');
require('../../utils-6eb1ca73.js');
require('../../ui/Badge.js');
require('../../index-daac2dae.js');
require('../../index-5977bdd5.js');
require('../../ui/Loader.js');
require('../../index-661b02a2.js');
require('../../index-fb9d8ec0.js');
require('../../ui/MentionUserLabel.js');
require('../../ui/TextButton.js');
require('../../color-0fae7c8e.js');
require('../../Channel/components/TypingIndicator.js');
require('@sendbird/chat/groupChannel');
require('../../ChannelProvider-4d043480.js');
require('../../compareIds-5d186d0d.js');
require('../../const-43cebab9.js');
require('@sendbird/chat/message');
require('../../ui/ReactionButton.js');
require('../../useLongPress-2f4ee82c.js');
require('../../withSendbird.js');
require('../../index-4de278b6.js');
require('../../ui/Input.js');
require('../../actionTypes-4d28a480.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const isAboutSame = (a, b, px) => Math.abs(a - b) <= px;

var DELIVERY_RECIPT = 'delivery_receipt';

var ChannelListUI = function (props) {
  var _a;

  var renderHeader = props.renderHeader,
      renderChannelPreview = props.renderChannelPreview,
      renderPlaceHolderError = props.renderPlaceHolderError,
      renderPlaceHolderLoading = props.renderPlaceHolderLoading,
      renderPlaceHolderEmptyList = props.renderPlaceHolderEmptyList;

  var _b = React.useState(false),
      showProfileEdit = _b[0],
      setShowProfileEdit = _b[1];

  var _c = ChannelList_context.useChannelListContext(),
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

  var _g = React.useState([]),
      channelsTomarkAsRead = _g[0],
      setChannelsToMarkAsRead = _g[1];

  React.useEffect(function () {
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
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-channel-list__header"
  }, (renderHeader === null || renderHeader === void 0 ? void 0 : renderHeader()) || /*#__PURE__*/React__default["default"].createElement(ChannelList_components_ChannelListHeader, {
    onEdit: function () {
      if (allowProfileEdit) {
        setShowProfileEdit(true);
      }
    },
    allowProfileEdit: allowProfileEdit,
    renderIconButton: function () {
      return /*#__PURE__*/React__default["default"].createElement(ChannelList_components_AddChannel.AddChannel, null);
    }
  })), showProfileEdit && /*#__PURE__*/React__default["default"].createElement(EditUserProfile, {
    onThemeChange: onThemeChange,
    onCancel: function () {
      setShowProfileEdit(false);
    },
    onEditProfile: function () {
      setShowProfileEdit(false);
    }
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-channel-list__body",
    onScroll: function (e) {
      var target = e === null || e === void 0 ? void 0 : e.target;
      var fetchMore = isAboutSame(target.clientHeight + target.scrollTop, target.scrollHeight, 10);

      if (fetchMore && (channelSource === null || channelSource === void 0 ? void 0 : channelSource.hasNext)) {
        logger.info('ChannelList: Fetching more channels');
        channelListDispatcher({
          type: ChannelList_context.FETCH_CHANNELS_START,
          payload: null
        });
        channelSource.next().then(function (channelList) {
          var _a, _b;

          logger.info('ChannelList: Fetching channels successful', channelList);
          channelListDispatcher({
            type: ChannelList_context.FETCH_CHANNELS_SUCCESS,
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
            type: ChannelList_context.FETCH_CHANNELS_FAILURE,
            payload: err
          });
        });
      }
    }
  }, sdkError && !loading && (renderPlaceHolderError && typeof renderPlaceHolderError === 'function' ? renderPlaceHolderError === null || renderPlaceHolderError === void 0 ? void 0 : renderPlaceHolderError() : /*#__PURE__*/React__default["default"].createElement(ui_PlaceHolder.PlaceHolder, {
    type: ui_PlaceHolder.PlaceHolderTypes.WRONG
  })), /*#__PURE__*/React__default["default"].createElement("div", null, allChannels && allChannels.map(function (channel, idx) {
    // todo: Refactor and move this inside channel - preview
    var onLeaveChannel = function (c, cb) {
      logger.info('ChannelList: Leaving channel', c);
      c.leave().then(function (res) {
        logger.info('ChannelList: Leaving channel success', res);

        if (cb && typeof cb === 'function') {
          cb(res, null);
        }

        channelListDispatcher({
          type: ChannelList_context.LEAVE_CHANNEL_SUCCESS,
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
        type: ChannelList_context.SET_CURRENT_CHANNEL,
        payload: channel
      });
    };

    return renderChannelPreview ?
    /*#__PURE__*/
    // eslint-disable-next-line
    React__default["default"].createElement("div", {
      key: channel === null || channel === void 0 ? void 0 : channel.url,
      onClick: onClick
    }, renderChannelPreview({
      channel: channel,
      onLeaveChannel: onLeaveChannel
    })) : /*#__PURE__*/React__default["default"].createElement(ChannelList_components_ChannelPreview, {
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
        return /*#__PURE__*/React__default["default"].createElement(ChannelList_components_ChannelPreviewAction, {
          channel: channel,
          disabled: !isOnline,
          onLeaveChannel: function () {
            return onLeaveChannel(channel, null);
          }
        });
      }
    });
  })), !initialized && loading && (renderPlaceHolderLoading && typeof renderPlaceHolderLoading === 'function' ? renderPlaceHolderLoading === null || renderPlaceHolderLoading === void 0 ? void 0 : renderPlaceHolderLoading() : /*#__PURE__*/React__default["default"].createElement(ui_PlaceHolder.PlaceHolder, {
    type: ui_PlaceHolder.PlaceHolderTypes.LOADING
  })), initialized && (allChannels === null || allChannels === void 0 ? void 0 : allChannels.length) === 0 && (renderPlaceHolderEmptyList && typeof renderPlaceHolderEmptyList === 'function' ? renderPlaceHolderEmptyList === null || renderPlaceHolderEmptyList === void 0 ? void 0 : renderPlaceHolderEmptyList() : /*#__PURE__*/React__default["default"].createElement(ui_PlaceHolder.PlaceHolder, {
    type: ui_PlaceHolder.PlaceHolderTypes.NO_CHANNELS
  }))));
};

module.exports = ChannelListUI;
//# sourceMappingURL=ChannelListUI.js.map
