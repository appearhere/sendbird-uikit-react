'use strict';

var React = require('react');
var ui_Label = require('../../index-4197d014.js');
var ui_Icon = require('../../ui/Icon.js');
var ui_Avatar = require('../../ui/Avatar.js');
var LocalizationContext = require('../../LocalizationContext-f4281153.js');
var uuid = require('../../uuid-2f4916c1.js');
var Channel_context = require('../../ChannelProvider-4d043480.js');
var useSendbirdStateContext = require('../../useSendbirdStateContext.js');
var _const$1 = require('../../const-43cebab9.js');
var _const = require('../../const-28829306.js');
var Thread_context = require('../../ThreadProvider-5c14e997.js');
require('prop-types');
require('../../stringSet-2dfd148b.js');
require('../../tslib.es6-d6068b10.js');
require('../../ui/ImageRenderer.js');
require('../../index-d4bc012c.js');
require('../../UserProfileContext-fd00d1bd.js');
require('../../index-5977bdd5.js');
require('../../topics-085b5602.js');
require('../../index-d05a5cae.js');
require('../../utils/message/getOutgoingMessageState.js');
require('../../_rollupPluginBabelHelpers-597f5cf8.js');
require('../../compareIds-5d186d0d.js');
require('@sendbird/chat/groupChannel');
require('@sendbird/chat/message');
require('../../ui/ContextMenu.js');
require('react-dom');
require('../../ui/SortByRow.js');
require('../../ui/ReactionButton.js');
require('../../withSendbird.js');
require('../../Thread/context/types.js');
require('@sendbird/chat');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function SuggestedUserMentionItem(props) {
  var member = props.member,
      _a = props.isFocused,
      isFocused = _a === void 0 ? false : _a,
      parentScrollRef = props.parentScrollRef,
      onClick = props.onClick,
      onMouseOver = props.onMouseOver,
      onMouseMove = props.onMouseMove,
      renderUserMentionItem = props.renderUserMentionItem;
  var scrollRef = React.useRef(null);
  var _b = React.useContext(LocalizationContext.LocalizationContext).stringSet,
      stringSet = _b === void 0 ? {} : _b;
  React.useEffect(function () {
    var _a, _b, _c, _d, _e, _f, _g;

    if (isFocused) {
      if (((_a = parentScrollRef === null || parentScrollRef === void 0 ? void 0 : parentScrollRef.current) === null || _a === void 0 ? void 0 : _a.scrollTop) >= ((_b = scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current) === null || _b === void 0 ? void 0 : _b.offsetTop)) {
        (_c = scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current) === null || _c === void 0 ? void 0 : _c.scrollIntoView({
          block: "nearest",
          inline: "nearest"
        });
      } else if (((_d = parentScrollRef === null || parentScrollRef === void 0 ? void 0 : parentScrollRef.current) === null || _d === void 0 ? void 0 : _d.scrollTop) + ((_e = parentScrollRef === null || parentScrollRef === void 0 ? void 0 : parentScrollRef.current) === null || _e === void 0 ? void 0 : _e.clientHeight) <= ((_f = scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current) === null || _f === void 0 ? void 0 : _f.offsetTop)) {
        (_g = scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current) === null || _g === void 0 ? void 0 : _g.scrollIntoView({
          block: "nearest",
          inline: "nearest"
        });
      }
    }
  }, [isFocused]);
  var customMentionItem = React.useMemo(function () {
    if (renderUserMentionItem) {
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "sendbird-mention-suggest-list__user-item",
        onClick: function (event) {
          return onClick === null || onClick === void 0 ? void 0 : onClick({
            event: event,
            member: member,
            itemRef: scrollRef
          });
        },
        onMouseOver: function (event) {
          return onMouseOver === null || onMouseOver === void 0 ? void 0 : onMouseOver({
            event: event,
            member: member,
            itemRef: scrollRef
          });
        },
        onMouseMove: function (event) {
          return onMouseMove === null || onMouseMove === void 0 ? void 0 : onMouseMove({
            event: event,
            member: member,
            itemRef: scrollRef
          });
        },
        key: (member === null || member === void 0 ? void 0 : member.userId) || uuid.uuidv4(),
        ref: scrollRef
      }, renderUserMentionItem({
        user: member
      }));
    }
  }, [renderUserMentionItem]);

  if (customMentionItem) {
    return customMentionItem;
  }

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-mention-suggest-list__user-item ".concat(isFocused ? 'focused' : ''),
    onClick: function (event) {
      return onClick === null || onClick === void 0 ? void 0 : onClick({
        event: event,
        member: member,
        itemRef: scrollRef
      });
    },
    onMouseOver: function (event) {
      return onMouseOver === null || onMouseOver === void 0 ? void 0 : onMouseOver({
        event: event,
        member: member,
        itemRef: scrollRef
      });
    },
    onMouseMove: function (event) {
      return onMouseMove === null || onMouseMove === void 0 ? void 0 : onMouseMove({
        event: event,
        member: member,
        itemRef: scrollRef
      });
    },
    key: (member === null || member === void 0 ? void 0 : member.userId) || uuid.uuidv4(),
    ref: scrollRef
  }, /*#__PURE__*/React__default["default"].createElement(ui_Avatar["default"], {
    className: "sendbird-mention-suggest-list__user-item__avatar",
    src: member === null || member === void 0 ? void 0 : member.profileUrl,
    alt: "user-profile",
    width: "24px",
    height: "24px"
  }), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-mention-suggest-list__user-item__nickname",
    type: ui_Label.LabelTypography.SUBTITLE_2,
    color: (member === null || member === void 0 ? void 0 : member.nickname) ? ui_Label.LabelColors.ONBACKGROUND_1 : ui_Label.LabelColors.ONBACKGROUND_3
  }, (member === null || member === void 0 ? void 0 : member.nickname) || (stringSet === null || stringSet === void 0 ? void 0 : stringSet.MENTION_NAME__NO_NAME)), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-mention-suggest-list__user-item__user-id",
    type: ui_Label.LabelTypography.SUBTITLE_2,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, member === null || member === void 0 ? void 0 : member.userId));
}

var DEBOUNCING_TIME = 300;

function SuggestedMentionList(props) {
  var _a, _b, _c, _d, _e;

  var className = props.className,
      _f = props.targetNickname,
      targetNickname = _f === void 0 ? '' : _f,
      // memberListQuery,
  onUserItemClick = props.onUserItemClick,
      onFocusItemChange = props.onFocusItemChange,
      onFetchUsers = props.onFetchUsers,
      renderUserMentionItem = props.renderUserMentionItem,
      inputEvent = props.inputEvent,
      _g = props.ableAddMention,
      ableAddMention = _g === void 0 ? true : _g,
      _h = props.maxMentionCount,
      maxMentionCount = _h === void 0 ? _const$1.MAX_USER_MENTION_COUNT : _h,
      _j = props.maxSuggestionCount,
      maxSuggestionCount = _j === void 0 ? _const$1.MAX_USER_SUGGESTION_COUNT : _j;
  var currentGroupChannel = (_a = Channel_context.useChannelContext === null || Channel_context.useChannelContext === void 0 ? void 0 : Channel_context.useChannelContext()) === null || _a === void 0 ? void 0 : _a.currentGroupChannel;
  var currentChannel = (_b = Thread_context.useThreadContext === null || Thread_context.useThreadContext === void 0 ? void 0 : Thread_context.useThreadContext()) === null || _b === void 0 ? void 0 : _b.currentChannel;
  var channelInstance = currentGroupChannel || currentChannel;

  var _k = useSendbirdStateContext(),
      config = _k.config,
      stores = _k.stores;

  var logger = config.logger;
  var currentUserId = ((_e = (_d = (_c = stores === null || stores === void 0 ? void 0 : stores.sdkStore) === null || _c === void 0 ? void 0 : _c.sdk) === null || _d === void 0 ? void 0 : _d.currentUser) === null || _e === void 0 ? void 0 : _e.userId) || '';
  var scrollRef = React.useRef(null);
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;

  var _l = React.useState(null),
      timer = _l[0],
      setTimer = _l[1];

  var _m = React.useState(''),
      searchString = _m[0],
      setSearchString = _m[1];

  var _o = React.useState(''),
      lastSearchString = _o[0],
      setLastSearchString = _o[1];

  var _p = React.useState(null),
      currentUser = _p[0],
      setCurrentUser = _p[1];

  var _q = React.useState([]),
      currentMemberList = _q[0],
      setCurrentMemberList = _q[1];

  React.useEffect(function () {
    clearTimeout(timer);
    setTimer(setTimeout(function () {
      setSearchString(targetNickname);
    }, DEBOUNCING_TIME));
  }, [targetNickname]);
  React.useEffect(function () {
    if ((inputEvent === null || inputEvent === void 0 ? void 0 : inputEvent.key) === _const.MessageInputKeys.Enter) {
      if (currentMemberList.length > 0) {
        onUserItemClick(currentUser);
      }
    }

    if ((inputEvent === null || inputEvent === void 0 ? void 0 : inputEvent.key) === _const.MessageInputKeys.ArrowUp) {
      var currentUserIndex = currentMemberList.findIndex(function (member) {
        return (member === null || member === void 0 ? void 0 : member.userId) === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId);
      });

      if (0 < currentUserIndex) {
        setCurrentUser(currentMemberList[currentUserIndex - 1]);
        onFocusItemChange(currentMemberList[currentUserIndex - 1]);
      }
    }

    if ((inputEvent === null || inputEvent === void 0 ? void 0 : inputEvent.key) === _const.MessageInputKeys.ArrowDown) {
      var currentUserIndex = currentMemberList.findIndex(function (member) {
        return (member === null || member === void 0 ? void 0 : member.userId) === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId);
      });

      if (currentUserIndex < currentMemberList.length - 1) {
        setCurrentUser(currentMemberList[currentUserIndex + 1]);
        onFocusItemChange(currentMemberList[currentUserIndex + 1]);
      }
    }
  }, [inputEvent]);
  /* Fetch member list */

  React.useEffect(function () {
    if (!(channelInstance === null || channelInstance === void 0 ? void 0 : channelInstance.createMemberListQuery)) {
      logger.warning('SuggestedMentionList: Creating member list query failed');
      return;
    }

    if (lastSearchString && searchString.indexOf(lastSearchString) === 0 && currentMemberList.length === 0) {
      // Don't need to request query again
      return;
    }

    var query = channelInstance === null || channelInstance === void 0 ? void 0 : channelInstance.createMemberListQuery({
      limit: maxSuggestionCount + 1,
      nicknameStartsWithFilter: searchString.slice(_const$1.USER_MENTION_TEMP_CHAR.length)
    }); // Add member list query for customization

    query.next().then(function (memberList) {
      var suggestingMembers = memberList.filter(function (member) {
        return currentUserId !== (member === null || member === void 0 ? void 0 : member.userId);
      }).slice(0, maxSuggestionCount);

      if (suggestingMembers.length < 1) {
        logger.info('SuggestedMentionList: Fetched member list is empty');
      } else {
        logger.info('SuggestedMentionList: Fetching member list succeeded', {
          memberListQuery: query,
          memberList: suggestingMembers
        });
        setCurrentUser(suggestingMembers[0]);
      }

      setLastSearchString(searchString);
      onFetchUsers(suggestingMembers);
      setCurrentMemberList(suggestingMembers);
    }).catch(function (error) {
      if (error) {
        logger.error('SuggestedMentionList: Fetching member list failed', error);
      }
    });
  }, [channelInstance === null || channelInstance === void 0 ? void 0 : channelInstance.url, searchString]);

  if (!ableAddMention && currentMemberList.length === 0) {
    return null;
  }

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-mention-suggest-list ".concat(className),
    key: "sendbird-mention-suggest-list",
    ref: scrollRef
  }, ableAddMention && (currentMemberList === null || currentMemberList === void 0 ? void 0 : currentMemberList.map(function (member) {
    return /*#__PURE__*/React__default["default"].createElement(SuggestedUserMentionItem, {
      key: (member === null || member === void 0 ? void 0 : member.userId) || uuid.uuidv4(),
      member: member,
      isFocused: (member === null || member === void 0 ? void 0 : member.userId) === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId),
      parentScrollRef: scrollRef,
      onClick: function (_a) {
        var member = _a.member;
        onUserItemClick(member);
      },
      onMouseOver: function (_a) {
        var member = _a.member;
        setCurrentUser(member);
      },
      renderUserMentionItem: renderUserMentionItem
    });
  })), !ableAddMention && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "sendbird-mention-suggest-list__notice-item"
  }, /*#__PURE__*/React__default["default"].createElement(ui_Icon["default"], {
    className: "sendbird-mention-suggest-list__notice-item__icon",
    type: ui_Icon.IconTypes.INFO,
    fillColor: ui_Icon.IconColors.ON_BACKGROUND_2,
    width: "20px",
    height: "20px"
  }), /*#__PURE__*/React__default["default"].createElement(ui_Label.Label, {
    className: "sendbird-mention-suggest-list__notice-item__text",
    type: ui_Label.LabelTypography.SUBTITLE_2,
    color: ui_Label.LabelColors.ONBACKGROUND_2
  }, stringSet.MENTION_COUNT__OVER_LIMIT.replace('%d', maxMentionCount))));
}

module.exports = SuggestedMentionList;
//# sourceMappingURL=SuggestedMentionList.js.map
