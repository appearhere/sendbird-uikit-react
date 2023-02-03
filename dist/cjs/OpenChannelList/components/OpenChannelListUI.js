'use strict';

var React = require('react');
var OpenChannelList_components_OpenChannelPreview = require('./OpenChannelPreview.js');
var ui_PlaceHolder = require('../../index-6b9230ae.js');
var ui_IconButton = require('../../ui/IconButton.js');
var ui_Icon = require('../../ui/Icon.js');
var ui_Label = require('../../index-4197d014.js');
var OpenChannelList_context = require('../../OpenChannelListProvider-31d16d2a.js');
var CreateOpenChannel = require('../../CreateOpenChannel.js');
var LocalizationContext = require('../../LocalizationContext-f4281153.js');
require('../../ui/Avatar.js');
require('../../tslib.es6-d6068b10.js');
require('../../ui/ImageRenderer.js');
require('../../uuid-2f4916c1.js');
require('prop-types');
require('../../ui/Loader.js');
require('../../stringSet-2dfd148b.js');
require('../../topics-085b5602.js');
require('../../useSendbirdStateContext.js');
require('../../withSendbird.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('../../CreateOpenChannel/components/CreateOpenChannelUI.js');
require('../../ui/Button.js');
require('../../ui/Modal.js');
require('react-dom');
require('../../index-1b132096.js');
require('../../MediaQueryContext-9a5566fc.js');
require('../../index-d4bc012c.js');
require('../../ui/Input.js');
require('../../ui/TextButton.js');
require('../../color-0fae7c8e.js');
require('../../CreateOpenChannel/context.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function OpenChannelListUI(_a) {
  var renderHeader = _a.renderHeader,
      renderChannelPreview = _a.renderChannelPreview,
      renderPlaceHolderEmpty = _a.renderPlaceHolderEmpty,
      renderPlaceHolderError = _a.renderPlaceHolderError,
      renderPlaceHolderLoading = _a.renderPlaceHolderLoading;

  var _b = React.useState(false),
      showCreateChannelModal = _b[0],
      setShowCreateChannel = _b[1];

  var scrollRef = React.useRef(null);

  var _c = OpenChannelList_context.useOpenChannelListContext(),
      logger = _c.logger,
      currentChannel = _c.currentChannel,
      allChannels = _c.allChannels,
      fetchingStatus = _c.fetchingStatus,
      onChannelSelected = _c.onChannelSelected,
      fetchNextChannels = _c.fetchNextChannels,
      refreshOpenChannelList = _c.refreshOpenChannelList,
      openChannelListDispatcher = _c.openChannelListDispatcher;

  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;

  var handleScroll = function (e) {
    var element = e.target;
    var scrollTop = element.scrollTop,
        clientHeight = element.clientHeight,
        scrollHeight = element.scrollHeight;

    var isAboutSame = function (a, b, px) {
      return Math.abs(a - b) <= px;
    };

    if (isAboutSame(clientHeight + scrollTop, scrollHeight, 10)) {
      fetchNextChannels(function (messages) {
        if (messages) {
          try {
            element.scrollTop = scrollHeight - clientHeight;
          } catch (error) {//
          }
        }
      });
    }
  };

  var handleOnClickCreateChannel = function () {
    setShowCreateChannel(true);
  };

  var MemoizedHeader = React.useMemo(function () {
    return (renderHeader === null || renderHeader === void 0 ? void 0 : renderHeader()) || null;
  }, [renderHeader]);
  var MemoizedPlaceHolder = React.useMemo(function () {
    if (fetchingStatus === OpenChannelList_context.OpenChannelListFetchingStatus.EMPTY) {
      return (renderPlaceHolderEmpty === null || renderPlaceHolderEmpty === void 0 ? void 0 : renderPlaceHolderEmpty()) || /*#__PURE__*/React__default["default"].createElement(ui_PlaceHolder.PlaceHolder, {
        className: "sendbird-open-channel-list-ui__channel-list--place-holder--empty",
        type: ui_PlaceHolder.PlaceHolderTypes.NO_CHANNELS
      });
    }

    if (fetchingStatus === OpenChannelList_context.OpenChannelListFetchingStatus.FETCHING) {
      return (renderPlaceHolderLoading === null || renderPlaceHolderLoading === void 0 ? void 0 : renderPlaceHolderLoading()) || /*#__PURE__*/React__default["default"].createElement("div", {
        className: "sendbird-open-channel-list-ui__channel-list--place-holder--loading"
      }, /*#__PURE__*/React__default["default"].createElement(ui_PlaceHolder.PlaceHolder, {
        iconSize: "24px",
        type: ui_PlaceHolder.PlaceHolderTypes.LOADING
      }));
    }

    if (fetchingStatus === OpenChannelList_context.OpenChannelListFetchingStatus.ERROR) {
      return (renderPlaceHolderError === null || renderPlaceHolderError === void 0 ? void 0 : renderPlaceHolderError()) || /*#__PURE__*/React__default["default"].createElement(ui_PlaceHolder.PlaceHolder, {
        className: "sendbird-open-channel-list-ui__channel-list--place-holder--error",
        type: ui_PlaceHolder.PlaceHolderTypes.WRONG
      });
    }

    return null;
  }, [fetchingStatus, renderPlaceHolderEmpty, renderPlaceHolderLoading, renderPlaceHolderError]);
  var MemoizedAllChannels = React.useMemo(function () {
    if (fetchingStatus === OpenChannelList_context.OpenChannelListFetchingStatus.DONE) {
      return allChannels.map(function (channel) {
        var isSelected = (channel === null || channel === void 0 ? void 0 : channel.url) === (currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url);

        var handleClick = function (e) {
          onChannelSelected === null || onChannelSelected === void 0 ? void 0 : onChannelSelected(channel, e);
          logger.info('OpenChannelList|ChannelPreview: A channel is selected', channel);
          openChannelListDispatcher({
            type: OpenChannelList_context.OpenChannelListActionTypes.SET_CURRENT_OPEN_CHANNEL,
            payload: channel
          });
        };

        return renderChannelPreview ? /*#__PURE__*/React__default["default"].createElement("div", {
          className: "sendbird-open-channel-list-ui__channel-list__item",
          onClick: handleClick
        }, renderChannelPreview({
          channel: channel,
          isSelected: isSelected,
          onChannelSelected: onChannelSelected
        })) : /*#__PURE__*/React__default["default"].createElement(OpenChannelList_components_OpenChannelPreview, {
          className: "sendbird-open-channel-list-ui__channel-list__item",
          channel: channel,
          isSelected: isSelected,
          onClick: handleClick,
          key: channel === null || channel === void 0 ? void 0 : channel.url
        });
      });
    }

    return null;
  }, [allChannels, allChannels.length, currentChannel]);
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-open-channel-list-ui"
  }, showCreateChannelModal && /*#__PURE__*/React__default["default"].createElement(CreateOpenChannel, {
    closeModal: function () {
      return setShowCreateChannel(false);
    },
    onCreateChannel: function (openChannel) {
      onChannelSelected === null || onChannelSelected === void 0 ? void 0 : onChannelSelected(openChannel);
      openChannelListDispatcher({
        type: OpenChannelList_context.OpenChannelListActionTypes.CREATE_OPEN_CHANNEL,
        payload: openChannel
      });
    }
  }), MemoizedHeader || /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-open-channel-list-ui__header"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-open-channel-list-ui__header__title",
    type: ui_Label.LabelTypography.H_2,
    color: ui_Label.LabelColors.ONBACKGROUND_1
  }, stringSet.OPEN_CHANNEL_LIST__TITLE), /*#__PURE__*/React__default["default"].createElement(ui_IconButton, {
    className: "sendbird-open-channel-list-ui__header__button-refresh",
    width: "32px",
    height: "32px",
    type: "button",
    onClick: function () {
      return refreshOpenChannelList();
    }
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.REFRESH,
    fillColor: ui_Icon.IconColors.PRIMARY,
    width: "22px",
    height: "22px"
  })), /*#__PURE__*/React__default["default"].createElement(ui_IconButton, {
    className: "sendbird-open-channel-list-ui__header__button-create-channel",
    width: "32px",
    height: "32px",
    type: "button",
    onClick: handleOnClickCreateChannel
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    type: ui_Icon.IconTypes.CREATE,
    fillColor: ui_Icon.IconColors.PRIMARY,
    width: "22px",
    height: "22px"
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-open-channel-list-ui__channel-list",
    ref: scrollRef,
    onScroll: handleScroll
  }, MemoizedPlaceHolder, MemoizedAllChannels));
}

module.exports = OpenChannelListUI;
//# sourceMappingURL=OpenChannelListUI.js.map
