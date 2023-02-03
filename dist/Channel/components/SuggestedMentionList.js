import React__default, { useRef, useContext, useEffect, useMemo, useState } from 'react';
import { L as Label, a as LabelTypography, b as LabelColors } from '../../index-f60cbf08.js';
import Icon, { IconTypes, IconColors } from '../../ui/Icon.js';
import Avatar from '../../ui/Avatar.js';
import { a as LocalizationContext } from '../../LocalizationContext-e5f35d14.js';
import { u as uuidv4 } from '../../uuid-392016d0.js';
import { u as useChannelContext } from '../../ChannelProvider-3f08837d.js';
import useSendbirdStateContext from '../../useSendbirdStateContext.js';
import { U as USER_MENTION_TEMP_CHAR, M as MAX_USER_MENTION_COUNT, a as MAX_USER_SUGGESTION_COUNT } from '../../const-03d71a8a.js';
import { M as MessageInputKeys } from '../../const-fcaed0ae.js';
import { u as useThreadContext } from '../../ThreadProvider-5ccbbc4b.js';
import 'prop-types';
import '../../stringSet-42c0e16e.js';
import '../../tslib.es6-75bd0528.js';
import '../../ui/ImageRenderer.js';
import '../../index-5dcd7e0f.js';
import '../../UserProfileContext-517994e3.js';
import '../../index-229a0736.js';
import '../../topics-0560d548.js';
import '../../index-105a85f4.js';
import '../../utils/message/getOutgoingMessageState.js';
import '../../_rollupPluginBabelHelpers-fe256514.js';
import '../../compareIds-fd8fd31e.js';
import '@sendbird/chat/groupChannel';
import '@sendbird/chat/message';
import '../../ui/ContextMenu.js';
import 'react-dom';
import '../../ui/SortByRow.js';
import '../../ui/ReactionButton.js';
import '../../withSendbird.js';
import '../../Thread/context/types.js';
import '@sendbird/chat';

function SuggestedUserMentionItem(props) {
  var member = props.member,
      _a = props.isFocused,
      isFocused = _a === void 0 ? false : _a,
      parentScrollRef = props.parentScrollRef,
      onClick = props.onClick,
      onMouseOver = props.onMouseOver,
      onMouseMove = props.onMouseMove,
      renderUserMentionItem = props.renderUserMentionItem;
  var scrollRef = useRef(null);
  var _b = useContext(LocalizationContext).stringSet,
      stringSet = _b === void 0 ? {} : _b;
  useEffect(function () {
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
  var customMentionItem = useMemo(function () {
    if (renderUserMentionItem) {
      return /*#__PURE__*/React__default.createElement("div", {
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
        key: (member === null || member === void 0 ? void 0 : member.userId) || uuidv4(),
        ref: scrollRef
      }, renderUserMentionItem({
        user: member
      }));
    }
  }, [renderUserMentionItem]);

  if (customMentionItem) {
    return customMentionItem;
  }

  return /*#__PURE__*/React__default.createElement("div", {
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
    key: (member === null || member === void 0 ? void 0 : member.userId) || uuidv4(),
    ref: scrollRef
  }, /*#__PURE__*/React__default.createElement(Avatar, {
    className: "sendbird-mention-suggest-list__user-item__avatar",
    src: member === null || member === void 0 ? void 0 : member.profileUrl,
    alt: "user-profile",
    width: "24px",
    height: "24px"
  }), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-mention-suggest-list__user-item__nickname",
    type: LabelTypography.SUBTITLE_2,
    color: (member === null || member === void 0 ? void 0 : member.nickname) ? LabelColors.ONBACKGROUND_1 : LabelColors.ONBACKGROUND_3
  }, (member === null || member === void 0 ? void 0 : member.nickname) || (stringSet === null || stringSet === void 0 ? void 0 : stringSet.MENTION_NAME__NO_NAME)), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-mention-suggest-list__user-item__user-id",
    type: LabelTypography.SUBTITLE_2,
    color: LabelColors.ONBACKGROUND_2
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
      maxMentionCount = _h === void 0 ? MAX_USER_MENTION_COUNT : _h,
      _j = props.maxSuggestionCount,
      maxSuggestionCount = _j === void 0 ? MAX_USER_SUGGESTION_COUNT : _j;
  var currentGroupChannel = (_a = useChannelContext === null || useChannelContext === void 0 ? void 0 : useChannelContext()) === null || _a === void 0 ? void 0 : _a.currentGroupChannel;
  var currentChannel = (_b = useThreadContext === null || useThreadContext === void 0 ? void 0 : useThreadContext()) === null || _b === void 0 ? void 0 : _b.currentChannel;
  var channelInstance = currentGroupChannel || currentChannel;

  var _k = useSendbirdStateContext(),
      config = _k.config,
      stores = _k.stores;

  var logger = config.logger;
  var currentUserId = ((_e = (_d = (_c = stores === null || stores === void 0 ? void 0 : stores.sdkStore) === null || _c === void 0 ? void 0 : _c.sdk) === null || _d === void 0 ? void 0 : _d.currentUser) === null || _e === void 0 ? void 0 : _e.userId) || '';
  var scrollRef = useRef(null);
  var stringSet = useContext(LocalizationContext).stringSet;

  var _l = useState(null),
      timer = _l[0],
      setTimer = _l[1];

  var _m = useState(''),
      searchString = _m[0],
      setSearchString = _m[1];

  var _o = useState(''),
      lastSearchString = _o[0],
      setLastSearchString = _o[1];

  var _p = useState(null),
      currentUser = _p[0],
      setCurrentUser = _p[1];

  var _q = useState([]),
      currentMemberList = _q[0],
      setCurrentMemberList = _q[1];

  useEffect(function () {
    clearTimeout(timer);
    setTimer(setTimeout(function () {
      setSearchString(targetNickname);
    }, DEBOUNCING_TIME));
  }, [targetNickname]);
  useEffect(function () {
    if ((inputEvent === null || inputEvent === void 0 ? void 0 : inputEvent.key) === MessageInputKeys.Enter) {
      if (currentMemberList.length > 0) {
        onUserItemClick(currentUser);
      }
    }

    if ((inputEvent === null || inputEvent === void 0 ? void 0 : inputEvent.key) === MessageInputKeys.ArrowUp) {
      var currentUserIndex = currentMemberList.findIndex(function (member) {
        return (member === null || member === void 0 ? void 0 : member.userId) === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId);
      });

      if (0 < currentUserIndex) {
        setCurrentUser(currentMemberList[currentUserIndex - 1]);
        onFocusItemChange(currentMemberList[currentUserIndex - 1]);
      }
    }

    if ((inputEvent === null || inputEvent === void 0 ? void 0 : inputEvent.key) === MessageInputKeys.ArrowDown) {
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

  useEffect(function () {
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
      nicknameStartsWithFilter: searchString.slice(USER_MENTION_TEMP_CHAR.length)
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

  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-mention-suggest-list ".concat(className),
    key: "sendbird-mention-suggest-list",
    ref: scrollRef
  }, ableAddMention && (currentMemberList === null || currentMemberList === void 0 ? void 0 : currentMemberList.map(function (member) {
    return /*#__PURE__*/React__default.createElement(SuggestedUserMentionItem, {
      key: (member === null || member === void 0 ? void 0 : member.userId) || uuidv4(),
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
  })), !ableAddMention && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-mention-suggest-list__notice-item"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-mention-suggest-list__notice-item__icon",
    type: IconTypes.INFO,
    fillColor: IconColors.ON_BACKGROUND_2,
    width: "20px",
    height: "20px"
  }), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-mention-suggest-list__notice-item__text",
    type: LabelTypography.SUBTITLE_2,
    color: LabelColors.ONBACKGROUND_2
  }, stringSet.MENTION_COUNT__OVER_LIMIT.replace('%d', maxMentionCount))));
}

export { SuggestedMentionList as default };
//# sourceMappingURL=SuggestedMentionList.js.map
