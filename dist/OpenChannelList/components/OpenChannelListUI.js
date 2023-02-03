import React__default, { useState, useRef, useContext, useMemo } from 'react';
import OpenChannelPreview from './OpenChannelPreview.js';
import { P as PlaceHolder, a as PlaceHolderTypes } from '../../index-88c5a220.js';
import IconButton from '../../ui/IconButton.js';
import Icon, { IconTypes, IconColors } from '../../ui/Icon.js';
import { L as Label, a as LabelTypography, b as LabelColors } from '../../index-f60cbf08.js';
import { u as useOpenChannelListContext, a as OpenChannelListFetchingStatus, b as OpenChannelListActionTypes } from '../../OpenChannelListProvider-267577c1.js';
import CreateOpenChannel from '../../CreateOpenChannel.js';
import { a as LocalizationContext } from '../../LocalizationContext-e5f35d14.js';
import '../../ui/Avatar.js';
import '../../tslib.es6-75bd0528.js';
import '../../ui/ImageRenderer.js';
import '../../uuid-392016d0.js';
import 'prop-types';
import '../../ui/Loader.js';
import '../../stringSet-42c0e16e.js';
import '../../topics-0560d548.js';
import '../../useSendbirdStateContext.js';
import '../../withSendbird.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import '../../CreateOpenChannel/components/CreateOpenChannelUI.js';
import '../../ui/Button.js';
import '../../ui/Modal.js';
import 'react-dom';
import '../../index-5ab5d8fe.js';
import '../../MediaQueryContext-0ce6633d.js';
import '../../index-5dcd7e0f.js';
import '../../ui/Input.js';
import '../../ui/TextButton.js';
import '../../color-52d916b6.js';
import '../../CreateOpenChannel/context.js';

function OpenChannelListUI(_a) {
  var renderHeader = _a.renderHeader,
      renderChannelPreview = _a.renderChannelPreview,
      renderPlaceHolderEmpty = _a.renderPlaceHolderEmpty,
      renderPlaceHolderError = _a.renderPlaceHolderError,
      renderPlaceHolderLoading = _a.renderPlaceHolderLoading;

  var _b = useState(false),
      showCreateChannelModal = _b[0],
      setShowCreateChannel = _b[1];

  var scrollRef = useRef(null);

  var _c = useOpenChannelListContext(),
      logger = _c.logger,
      currentChannel = _c.currentChannel,
      allChannels = _c.allChannels,
      fetchingStatus = _c.fetchingStatus,
      onChannelSelected = _c.onChannelSelected,
      fetchNextChannels = _c.fetchNextChannels,
      refreshOpenChannelList = _c.refreshOpenChannelList,
      openChannelListDispatcher = _c.openChannelListDispatcher;

  var stringSet = useContext(LocalizationContext).stringSet;

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

  var MemoizedHeader = useMemo(function () {
    return (renderHeader === null || renderHeader === void 0 ? void 0 : renderHeader()) || null;
  }, [renderHeader]);
  var MemoizedPlaceHolder = useMemo(function () {
    if (fetchingStatus === OpenChannelListFetchingStatus.EMPTY) {
      return (renderPlaceHolderEmpty === null || renderPlaceHolderEmpty === void 0 ? void 0 : renderPlaceHolderEmpty()) || /*#__PURE__*/React__default.createElement(PlaceHolder, {
        className: "sendbird-open-channel-list-ui__channel-list--place-holder--empty",
        type: PlaceHolderTypes.NO_CHANNELS
      });
    }

    if (fetchingStatus === OpenChannelListFetchingStatus.FETCHING) {
      return (renderPlaceHolderLoading === null || renderPlaceHolderLoading === void 0 ? void 0 : renderPlaceHolderLoading()) || /*#__PURE__*/React__default.createElement("div", {
        className: "sendbird-open-channel-list-ui__channel-list--place-holder--loading"
      }, /*#__PURE__*/React__default.createElement(PlaceHolder, {
        iconSize: "24px",
        type: PlaceHolderTypes.LOADING
      }));
    }

    if (fetchingStatus === OpenChannelListFetchingStatus.ERROR) {
      return (renderPlaceHolderError === null || renderPlaceHolderError === void 0 ? void 0 : renderPlaceHolderError()) || /*#__PURE__*/React__default.createElement(PlaceHolder, {
        className: "sendbird-open-channel-list-ui__channel-list--place-holder--error",
        type: PlaceHolderTypes.WRONG
      });
    }

    return null;
  }, [fetchingStatus, renderPlaceHolderEmpty, renderPlaceHolderLoading, renderPlaceHolderError]);
  var MemoizedAllChannels = useMemo(function () {
    if (fetchingStatus === OpenChannelListFetchingStatus.DONE) {
      return allChannels.map(function (channel) {
        var isSelected = (channel === null || channel === void 0 ? void 0 : channel.url) === (currentChannel === null || currentChannel === void 0 ? void 0 : currentChannel.url);

        var handleClick = function (e) {
          onChannelSelected === null || onChannelSelected === void 0 ? void 0 : onChannelSelected(channel, e);
          logger.info('OpenChannelList|ChannelPreview: A channel is selected', channel);
          openChannelListDispatcher({
            type: OpenChannelListActionTypes.SET_CURRENT_OPEN_CHANNEL,
            payload: channel
          });
        };

        return renderChannelPreview ? /*#__PURE__*/React__default.createElement("div", {
          className: "sendbird-open-channel-list-ui__channel-list__item",
          onClick: handleClick
        }, renderChannelPreview({
          channel: channel,
          isSelected: isSelected,
          onChannelSelected: onChannelSelected
        })) : /*#__PURE__*/React__default.createElement(OpenChannelPreview, {
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
  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-open-channel-list-ui"
  }, showCreateChannelModal && /*#__PURE__*/React__default.createElement(CreateOpenChannel, {
    closeModal: function () {
      return setShowCreateChannel(false);
    },
    onCreateChannel: function (openChannel) {
      onChannelSelected === null || onChannelSelected === void 0 ? void 0 : onChannelSelected(openChannel);
      openChannelListDispatcher({
        type: OpenChannelListActionTypes.CREATE_OPEN_CHANNEL,
        payload: openChannel
      });
    }
  }), MemoizedHeader || /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-open-channel-list-ui__header"
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-open-channel-list-ui__header__title",
    type: LabelTypography.H_2,
    color: LabelColors.ONBACKGROUND_1
  }, stringSet.OPEN_CHANNEL_LIST__TITLE), /*#__PURE__*/React__default.createElement(IconButton, {
    className: "sendbird-open-channel-list-ui__header__button-refresh",
    width: "32px",
    height: "32px",
    type: "button",
    onClick: function () {
      return refreshOpenChannelList();
    }
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.REFRESH,
    fillColor: IconColors.PRIMARY,
    width: "22px",
    height: "22px"
  })), /*#__PURE__*/React__default.createElement(IconButton, {
    className: "sendbird-open-channel-list-ui__header__button-create-channel",
    width: "32px",
    height: "32px",
    type: "button",
    onClick: handleOnClickCreateChannel
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.CREATE,
    fillColor: IconColors.PRIMARY,
    width: "22px",
    height: "22px"
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-open-channel-list-ui__channel-list",
    ref: scrollRef,
    onScroll: handleScroll
  }, MemoizedPlaceHolder, MemoizedAllChannels));
}

export { OpenChannelListUI as default };
//# sourceMappingURL=OpenChannelListUI.js.map
