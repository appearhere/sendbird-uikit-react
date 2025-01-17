/**
 * Type Definitions for @sendbird/uikit-react@{{ version }}
 * homepage: https://sendbird.com/
 * git: https://github.com/sendbird/sendbird-uikit-react
 */
declare module "SendbirdUIKitGlobal" {
  import type React from 'react';
  import type Locale from 'date-fns';
  import type SendbirdChat from '@sendbird/chat';
  import type {
    SendbirdError,
    SessionHandler,
    User,
    ApplicationUserListQueryParams,
    EmojiContainer,
  } from '@sendbird/chat';
  import type {
    GroupChannel,
    GroupChannelCreateParams,
    GroupChannelUpdateParams,
    Member,
    SendbirdGroupChat,
    GroupChannelListQuery,
    GroupChannelListQueryParams,
  } from '@sendbird/chat/groupChannel';
  import type {
    AdminMessage,
    BaseMessage,
    FailedMessageHandler,
    FileMessage,
    FileMessageCreateParams,
    MessageListParams,
    MessageSearchQuery,
    MessageSearchQueryParams,
    UserMessage,
    UserMessageCreateParams,
    UserMessageUpdateParams,
  } from '@sendbird/chat/message';
  import type {
    OpenChannel,
    OpenChannelCreateParams,
    OpenChannelUpdateParams,
    SendbirdOpenChat,
  } from '@sendbird/chat/openChannel';

  export type ReplyType = "NONE" | "QUOTE_REPLY" | "THREAD";
  export interface AppProps {
    appId: string;
    userId: string;
    accessToken?: string;
    customApiHost?: string,
    customWebSocketHost?: string,
    // not-ready yet
    // mediaQueryBreakPoint?: string | boolean,
    theme?: 'light' | 'dark';
    userListQuery?(): UserListQuery;
    nickname?: string;
    profileUrl?: string;
    dateLocale?: Locale;
    allowProfileEdit?: boolean;
    disableUserProfile?: boolean;
    disableMarkAsDelivered?: boolean;
    showSearchIcon?: boolean;
    renderUserProfile?: (props: RenderUserProfileProps) => React.ReactNode | React.ReactElement;
    onProfileEditSuccess?(user: User): void;
    config?: SendbirdProviderConfig;
    useReaction?: boolean;
    useMessageGrouping?: boolean;
    stringSet?: Record<string, string>;
    colorSet?: Record<string, string>;
    imageCompression?: {
      compressionRate?: number,
      resizingWidth?: number | string,
      resizingHeight?: number | string,
    };
    replyType?: ReplyType;
    disableAutoSelect?: boolean;
    isMentionEnabled?: boolean;
    isReactionEnabled?: boolean;
    isTypingIndicatorEnabledOnChannelList?: boolean;
    isMessageReceiptStatusEnabledOnChannelList?: boolean;
  }

  export type Logger = {
    info?(title?: unknown, description?: unknown): void;
    error?(title?: unknown, description?: unknown): void;
    warning?(title?: unknown, description?: unknown): void;
  }

  export type MessageHandler = (message: UserMessage | FileMessage) => void;

  export interface UikitMessageHandler {
    onPending: (handler: MessageHandler) => UikitMessageHandler;
    onFailed: (handler: FailedMessageHandler) => UikitMessageHandler;
    onSucceeded: (handler: MessageHandler) => UikitMessageHandler;
  }

  export interface UserListQuery {
    hasNext?: boolean;
    next(): Promise<Array<User>>;
  }

  export interface RenderUserProfileProps {
    user: User | Member;
    currentUserId: string;
    close(): void;
  }

  export interface SendbirdProviderConfig {
    logLevel?: 'debug' | 'warning' | 'error' | 'info' | 'all' | Array<string>;
    userMention?: {
      maxMentionCount?: number,
      maxSuggestionCount?: number,
    };
    isREMUnitEnabled?: boolean;
  }

  export interface ClientMessage {
    reqId: string;
    file?: File;
    localUrl?: string;
    _sender: User;
  }

  export interface RenderMessageProps {
    message: EveryMessage;
    chainTop: boolean;
    chainBottom: boolean;
  }
  export interface RenderCustomSeparatorProps {
    message: AdminMessage | UserMessage | FileMessage;
  }

  export interface ClientUserMessage extends UserMessage, ClientMessage { }
  export interface ClientFileMessage extends FileMessage, ClientMessage { }
  export interface ClientAdminMessage extends AdminMessage, ClientMessage { }
  export type EveryMessage = ClientUserMessage | ClientFileMessage | ClientAdminMessage;
  export type ClientSentMessages = ClientUserMessage | ClientFileMessage;

  export type GetSdk = SendbirdChat | undefined;
  export type GetConnect = (
    userId: string,
    accessToken?: string
  ) => Promise<User>;
  export type GetDisconnect = () => Promise<void>;
  export type GetUpdateUserInfo = (
    nickName: string,
    profileUrl?: string
  ) => Promise<User>;
  export type GetCreateGroupChannel = (channelParams: GroupChannelCreateParams) => Promise<GroupChannel>;
  export type GetCreateOpenChannel = (channelParams: OpenChannelCreateParams) => Promise<OpenChannel>;
  export type GetGetGroupChannel = (
    channelUrl: string,
    isSelected?: boolean,
  ) => Promise<GroupChannel>;
  export type GetGetOpenChannel = (
    channelUrl: string,
  ) => Promise<OpenChannel>;
  export type GetLeaveGroupChannel = (channelUrl: string) => Promise<void>;
  export type GetEnterOpenChannel = (channelUrl: string) => Promise<OpenChannel>;
  export type GetExitOpenChannel = (channelUrl: string) => Promise<void>;
  export type GetFreezeChannel = (channel: GroupChannel | OpenChannel) => Promise<void>;
  export type GetUnFreezeChannel = (channel: GroupChannel | OpenChannel) => Promise<void>;
  export type GetSendUserMessage = (
    channel: GroupChannel | OpenChannel,
    UserMessageCreateParams: UserMessageCreateParams,
  ) => UikitMessageHandler;
  export type GetSendFileMessage = (
    channel: GroupChannel | OpenChannel,
    FileMessageCreateParams: FileMessageCreateParams
  ) => UikitMessageHandler;
  export type GetUpdateUserMessage = (
    channel: GroupChannel | OpenChannel,
    messageId: string | number,
    params: UserMessageUpdateParams
  ) => Promise<UserMessage>;
  // type getUpdateFileMessage = (
  //   channel: GroupChannel | OpenChannel,
  //   messageId: string | number,
  //   params: FileMessageUpdateParams,
  // ) => Promise<FileMessage>;
  export type GetDeleteMessage = (
    channel: GroupChannel | OpenChannel,
    message: UserMessage | FileMessage
  ) => Promise<void>;
  export type GetResendUserMessage = (
    channel: GroupChannel | OpenChannel,
    failedMessage: UserMessage
  ) => Promise<UserMessage>;
  export type GetResendFileMessage = (
    channel: GroupChannel | OpenChannel,
    failedMessage: FileMessage
  ) => Promise<FileMessage>;

  export interface sendbirdSelectorsInterface {
    getSdk: (store: SendBirdState) => GetSdk;
    getConnect: (store: SendBirdState) => GetConnect
    getDisconnect: (store: SendBirdState) => GetDisconnect;
    getUpdateUserInfo: (store: SendBirdState) => GetUpdateUserInfo;
    getCreateGroupChannel: (store: SendBirdState) => GetCreateGroupChannel;
    getCreateOpenChannel: (store: SendBirdState) => GetCreateOpenChannel;
    getGetGroupChannel: (store: SendBirdState) => GetGetGroupChannel;
    getGetOpenChannel: (store: SendBirdState) => GetGetOpenChannel;
    getLeaveGroupChannel: (store: SendBirdState) => GetLeaveGroupChannel;
    getEnterOpenChannel: (store: SendBirdState) => GetEnterOpenChannel;
    getExitOpenChannel: (store: SendBirdState) => GetExitOpenChannel;
    getFreezeChannel: (store: SendBirdState) => GetFreezeChannel;
    getUnFreezeChannel: (store: SendBirdState) => GetUnFreezeChannel;
    getSendUserMessage: (store: SendBirdState) => GetSendUserMessage;
    getSendFileMessage: (store: SendBirdState) => GetSendFileMessage;
    getUpdateUserMessage: (store: SendBirdState) => GetUpdateUserMessage;
    // getUpdateFileMessage: (store: SendBirdState) => GetUpdateFileMessage;
    getDeleteMessage: (store: SendBirdState) => GetDeleteMessage;
    getResendUserMessage: (store: SendBirdState) => GetResendUserMessage;
    getResendFileMessage: (store: SendBirdState) => GetResendFileMessage;
  }
  export interface SendbirdProviderProps {
    userId: string;
    appId: string;
    accessToken?: string;
    configureSession?: (sdk: SendbirdGroupChat | SendbirdOpenChat) => SessionHandler;
    customApiHost?: string,
    customWebSocketHost?: string,
    // mediaQueryBreakPoint?: string | boolean,
    children?: React.ReactNode | React.ReactElement;
    theme?: 'light' | 'dark';
    nickname?: string;
    profileUrl?: string;
    dateLocale?: Locale;
    disableUserProfile?: boolean;
    disableMarkAsDelivered?: boolean;
    onUserProfileMessage?: (props: GroupChannel) => void;
    renderUserProfile?: (props: RenderUserProfileProps) => React.ReactNode | React.ReactElement;
    allowProfileEdit?: boolean;
    userListQuery?(): UserListQuery;
    config?: SendbirdProviderConfig;
    stringSet?: Record<string, string>;
    colorSet?: Record<string, string>;
    isMentionEnabled?: boolean;
    imageCompression?: {
      compressionRate?: number,
      resizingWidth?: number | string,
      resizingHeight?: number | string,
    };
    isReactionEnabled?: boolean,
    isTypingIndicatorEnabledOnChannelList?: boolean,
    isMessageReceiptStatusEnabledOnChannelList?: boolean,
  }

  export interface SendBirdStateConfig {
    disableUserProfile: boolean;
    disableMarkAsDelivered: boolean;
    renderUserProfile?: (props: RenderUserProfileProps) => React.ReactNode | React.ReactElement;
    allowProfileEdit: boolean;
    isOnline: boolean;
    isReactionEnabled: boolean;
    isMentionEnabled: boolean;
    userMention: {
      maxMentionCount: number;
      maxSuggestionCount: number;
    };
    userId: string;
    appId: string;
    accessToken: string;
    theme: string;
    pubSub: any;
    logger: Logger;
    setCurrenttheme: (theme: string) => void;
    userListQuery?(): UserListQuery;
    imageCompression?: {
      compressionRate?: number,
      resizingWidth?: number | string,
      resizingHeight?: number | string,
    };
    isTypingIndicatorEnabledOnChannelList?: boolean;
    isMessageReceiptStatusEnabledOnChannelList?: boolean;
    replyType: ReplyType;
  }
  export interface SdkStore {
    error: boolean;
    initialized: boolean;
    loading: boolean;
    sdk: SendbirdGroupChat | SendbirdOpenChat;
  }
  export interface UserStore {
    initialized: boolean;
    loading: boolean;
    user: User;
  }
  export interface SendBirdStateStore {
    sdkStore: SdkStore;
    userStore: UserStore;
  }

  export type SendBirdState = {
    config: SendBirdStateConfig;
    stores: SendBirdStateStore;
    dispatchers: {
      userDispatcher: UserDispatcher,
    },
  }

  export type UserDispatcherParams = {
    type: string,
    payload: User;
  };

  export type UserDispatcher = (params: UserDispatcherParams) => void;

  export interface ChannelListQueries {
    applicationUserListQuery?: ApplicationUserListQueryParams;
    channelListQuery?: GroupChannelListQueryParams;
  }

  export type OverrideInviteUserType = {
    users: Array<string>;
    onClose: () => void;
    channelType: 'group' | 'supergroup' | 'broadcast';
  };

  export interface ChannelListProviderProps {
    allowProfileEdit?: boolean;
    overrideInviteUser?(params: OverrideInviteUserType): void;
    onBeforeCreateChannel?(users: Array<string>): GroupChannelCreateParams;
    onThemeChange?(theme: string): void;
    onProfileEditSuccess?(user: User): void;
    onChannelSelect?(channel: GroupChannel): void;
    sortChannelList?: (channels: GroupChannel[]) => GroupChannel[];
    queries?: ChannelListQueries;
    children?: React.ReactNode | React.ReactElement;
    className?: string | Array<string>;
    renderUserProfile?: (props: RenderUserProfileProps) => React.ReactNode | React.ReactElement;
    disableUserProfile?: boolean;
    disableAutoSelect?: boolean;
    isTypingIndicatorEnabled?: boolean;
    isMessageReceiptStatusEnabled?: boolean;
  }

  export interface ChannelListProviderInterface extends ChannelListProviderProps {
    initialized: boolean;
    loading: boolean;
    allChannels: GroupChannel[];
    currentChannel: GroupChannel;
    showSettings: boolean;
    channelListQuery: GroupChannelListQueryParams;
    currentUserId: string;
    // channelListDispatcher: CustomUseReducerDispatcher;
    channelSource: GroupChannelListQuery;
    typingChannels: GroupChannel[];
  }


  export interface RenderChannelPreviewProps {
    channel: GroupChannel;
    onLeaveChannel(
      channel: GroupChannel,
      onLeaveChannelCb?: (c: GroupChannel) => void,
    );
  }

  export interface ChannelListUIProps {
    renderChannelPreview?: (props: RenderChannelPreviewProps) => React.ReactNode | React.ReactElement;
    renderUserProfile?: (props: RenderUserProfileProps) => React.ReactNode | React.ReactElement;
    renderHeader?: (props: void) => React.ReactNode | React.ReactElement;
    renderPlaceHolderError?: (props: void) => React.ReactNode | React.ReactElement;
    renderPlaceHolderLoading?: (props: void) => React.ReactNode | React.ReactElement;
    renderPlaceHolderEmptyList?: (props: void) => React.ReactNode | React.ReactElement;
  }

  export interface ChannelListProps extends ChannelListProviderProps, ChannelListUIProps { }

  export interface ChannelListHeaderInterface {
    renderHeader?: (props: void) => React.ReactNode | React.ReactElement;
    renderTitle?: (props: void) => React.ReactNode | React.ReactElement;
    renderIconButton?: (props: void) => React.ReactNode | React.ReactElement;
    onEdit?: (props: void) => void;
    allowProfileEdit?: boolean;
  }

  export interface ChannelPreviewInterface {
    channel: GroupChannel;
    onLeaveChannel?: () => void;
    isActive?: boolean;
    onClick: () => void;
    renderChannelAction: (props: { channel: GroupChannel }) => React.ReactNode | React.ReactElement;
    tabIndex: number;
  }

  export interface ChannelPreviewActionInterface {
    disabled?: boolean;
    onLeaveChannel?: () => void;
  }

  export type OverrideInviteMemberType = {
    users: Array<string>;
    onClose: () => void;
    channel: GroupChannel;
  };

  export interface ChannelSettingsProviderInterface {
    channelUrl: string;
    onCloseClick?(): void;
    overrideInviteUser?(params: OverrideInviteMemberType): void;
    onChannelModified?(channel: GroupChannel): void;
    onBeforeUpdateChannel?(currentTitle: string, currentImg: File, data: string): GroupChannelUpdateParams;
    queries?: ChannelSettingsQueries;
    forceUpdateUI(): void;
    channel: GroupChannel;
    invalidChannel: boolean;
  }

  export interface ChannelSettingsUIProps {
    renderPlaceholderError?: () => React.ReactNode | React.ReactElement;
    renderChannelProfile?: () => React.ReactNode | React.ReactElement;
    renderModerationPanel?: () => React.ReactNode | React.ReactElement;
    renderLeaveChannel?: () => React.ReactNode | React.ReactElement;
  }

  export interface ChannelSettingsQueries {
    applicationUserListQuery?: ApplicationUserListQueryParams;
  }

  export type ChannelSettingsContextProps = {
    children?: React.ReactElement;
    channelUrl: string;
    className?: string;
    onCloseClick?(): void;
    onChannelModified?(channel: GroupChannel): void;
    overrideInviteUser?(params: OverrideInviteMemberType): void;
    onBeforeUpdateChannel?(currentTitle: string, currentImg: File, data: string): GroupChannelUpdateParams;
    queries?: ChannelSettingsQueries;
    renderUserProfile?: (props: RenderUserProfileProps) => React.ReactNode | React.ReactElement;
    disableUserProfile?: boolean;
  }

  export interface ChannelSettingsProps extends ChannelSettingsUIProps, ChannelSettingsContextProps {
  }

  export type ChannelSettingsEditDetailsProps = {
    onSubmit: () => void;
    onCancel: () => void;
  }

  export type CustomUser = User & {
    isMuted: boolean;
    role: string;
  }

  export interface UserListItemActionProps {
    actionRef: React.RefObject<HTMLInputElement>;
    parentRef: React.RefObject<HTMLInputElement>;
  }

  export interface UserListItemProps {
    user: CustomUser;
    currentUser?: string;
    className?: string;
    action?(props: UserListItemActionProps): React.ReactElement;
  }

  export type LeaveChannelProps = {
    onSubmit: () => void;
    onCancel: () => void;
  };

  /**
   * Channel
   */
  export interface RenderMessageProps {
    message: EveryMessage;
    chainTop: boolean;
    chainBottom: boolean;
  }

  export type ChannelQueries = {
    messageListParams?: MessageListParams;
  };

  export enum ThreadReplySelectType {
    PARENT = 'PARENT',
    THREAD = 'THREAD',
  }

  export type ChannelContextProps = {
    children?: React.ReactElement;
    channelUrl: string;
    isReactionEnabled?: boolean;
    isMessageGroupingEnabled?: boolean;
    showSearchIcon?: boolean;
    animatedMessage?: number;
    highlightedMessage?: number;
    startingPoint?: number;
    onBeforeSendUserMessage?(text: string, quotedMessage?: UserMessage | FileMessage): UserMessageCreateParams;
    onBeforeSendFileMessage?(file: File, quotedMessage?: UserMessage | FileMessage): FileMessageCreateParams;
    onBeforeUpdateUserMessage?(text: string): UserMessageUpdateParams;
    onChatHeaderActionClick?(event: React.MouseEvent<HTMLElement>): void;
    onSearchClick?(): void;
    onBackClick?(): void;
    replyType?: ReplyType;
    threadReplySelectType?: ThreadReplySelectType;
    queries?: ChannelQueries;
    renderUserProfile?: (props: RenderUserProfileProps) => React.ReactElement;
    disableUserProfile?: boolean;
    disableMarkAsRead?: boolean;
    onReplyInThread?: (props: { message: UserMessage | FileMessage }) => void;
    onQuoteMessageClick?: (props: { message: UserMessage | FileMessage }) => void;
    onMessageAnimated?: () => void;
    onMessageHighlighted?: () => void;
  };

  export interface ChannelUIProps {
    isLoading?: boolean;
    renderPlaceholderLoader?: () => React.ReactNode | React.ReactElement;
    renderPlaceholderInvalid?: () => React.ReactNode | React.ReactElement;
    renderPlaceholderEmpty?: () => React.ReactNode | React.ReactElement;
    renderChannelHeader?: () => React.ReactNode | React.ReactElement;
    renderMessage?: (props: RenderMessageProps) => React.ReactNode | React.ReactElement;
    renderMessageInput?: () => React.ReactNode | React.ReactElement;
    renderTypingIndicator?: () => React.ReactNode | React.ReactElement;
    renderCustomSeparator?: (props: RenderCustomSeparatorProps) => React.ReactNode | React.ReactElement;
  }

  export type CoreMessageType = AdminMessage | UserMessage | FileMessage;

  export interface MessageStoreInterface {
    allMessages: CoreMessageType[];
    loading?: boolean;
    initialized?: boolean;
    unreadSince?: string;
    isInvalid?: boolean;
    currentGroupChannel?: GroupChannel;
    hasMorePrev?: boolean;
    oldestMessageTimeStamp: number;
    hasMoreNext?: boolean;
    latestMessageTimeStamp: number;
    emojiContainer: any;
    readStatus: any;
  }

  export interface ChannelProviderInterface extends ChannelContextProps, MessageStoreInterface {
    scrollToMessage?(createdAt: number, messageId: number): void;
    messageActionTypes: Record<string, string>;
    quoteMessage: CoreMessageType;
    setQuoteMessage: React.Dispatch<React.SetStateAction<CoreMessageType>>;
    initialTimeStamp: number;
    setInitialTimeStamp: React.Dispatch<React.SetStateAction<number>>;
    animatedMessageId: number;
    highLightedMessageId: number;
    nicknamesMap: Map<string, string>;
    scrollRef: React.MutableRefObject<HTMLDivElement>;
    setAnimatedMessageId: React.Dispatch<React.SetStateAction<number>>;
    setHighLightedMessageId: React.Dispatch<React.SetStateAction<number>>;
    messageInputRef: React.MutableRefObject<HTMLInputElement>,
    toggleReaction(message: UserMessage | FileMessage, emojiKey: string, isReacted: boolean): void,
  }

  export type FileViewerProps = {
    onCancel: () => void;
    message: ClientFileMessage;
  }

  export type MessageUIProps = {
    message: EveryMessage;
    hasSeparator?: boolean;
    chainTop?: boolean;
    chainBottom?: boolean;
    handleScroll: () => void;
    // for extending
    renderMessage?: (props: RenderMessageProps) => React.ReactNode | React.ReactElement;
    renderCustomSeparator?: (props: RenderCustomSeparatorProps) => React.ReactNode | React.ReactElement;
    renderEditInput?: () => React.ReactNode | React.ReactElement;
    renderMessageContent?: () => React.ReactNode | React.ReactElement;
  };

  export type MessageInputProps = {
    // value is removed when channelURL changes
    value?: string;
    ref?: React.MutableRefObject<any>;
  };

  export type MessageListProps = {
    renderMessage?: (props: RenderMessageProps) => React.ReactNode | React.ReactElement;
    renderPlaceholderEmpty?: () => React.ReactNode | React.ReactElement;
    renderCustomSeparator?: (props: RenderCustomSeparatorProps) => React.ReactNode | React.ReactElement;
  };

  export type SuggestedMentionListProps = {
    targetNickname: string;
    memberListQuery?: Record<string, string>;
    onUserItemClick?: (member: User) => void;
    onFocusItemChange?: (member: User) => void;
    onFetchUsers?: (users: Array<User>) => void;
    renderUserMentionItem?: (props: { user: User }) => JSX.Element;
    ableAddMention: boolean;
    maxMentionCount?: number;
    maxSuggestionCount?: number;
    inputEvent?: React.KeyboardEvent<HTMLDivElement>;
  };

  export type SuggestedUserMentionItemProps = {
    member: User | Member;
    isFocused?: boolean;
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onMouseOver?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    renderUserMentionItem?: (props: { user: User | Member }) => JSX.Element;
  };

  export interface UnreadCountProps {
    count: number;
    time: string;
    onClick(): void;
  }

  export interface ChannelProps extends ChannelContextProps, ChannelUIProps {
  }

  export interface RemoveMessageProps {
    onCancel: () => void;
    message: EveryMessage;
  }

  /**
   * OpenChannel
   */
  export type OpenChannelQueries = {
    // https://sendbird.github.io/core-sdk-javascript/module-model_params_messageListParams-MessageListParams.html
    messageListParams?: {
      replyType?: string,
      messageType?: string,
      prevResultSize?: number,
      nextResultSize?: number,
      reverse?: boolean,
      isInclusive?: boolean,
      includeMetaArray?: boolean,
      // UIKit doesn't support emoji reaction in OpenChannel
      // includeReactions?: boolean,
      // UIKit doesn't support message threading in OpenChannel
      // includeThreadInfo?: boolean,
      includePollDetails?: boolean,
      includeParentMessageInfo?: boolean,
      showSubchannelMessagesOnly?: boolean,
      customTypes?: Array<string>,
      senderUserIds?: Array<string>,
    },
  };

  export interface OpenChannelProviderProps {
    channelUrl: string;
    children?: React.ReactNode | React.ReactElement;
    useMessageGrouping?: boolean;
    queries?: OpenChannelQueries;
    messageLimit?: number;
    onBeforeSendUserMessage?(text: string): UserMessageCreateParams;
    onBeforeSendFileMessage?(file_: File): FileMessageCreateParams;
    onChatHeaderActionClick?(): void;
    onBackClick?(): void;
    disableUserProfile?: boolean;
    renderUserProfile?: (props: RenderUserProfileProps) => React.ReactNode | React.ReactElement;
  }

  export interface OpenChannelMessagesState {
    allMessages: Array<EveryMessage>;
    loading: boolean;
    initialized: boolean;
    currentOpenChannel: OpenChannel;
    isInvalid: boolean;
    hasMore: boolean;
    lastMessageTimestamp: number;
    frozen: boolean;
    operators: Array<User>;
    participants: Array<User>;
    bannedParticipantIds: Array<string>;
    mutedParticipantIds: Array<string>;
  }

  export interface OpenChannelInterface extends OpenChannelProviderProps, OpenChannelMessagesState {
    // derived/utils
    messageInputRef: React.RefObject<HTMLInputElement>;
    conversationScrollRef: React.RefObject<HTMLDivElement>;
    disabled: boolean;
    amIBanned: boolean;
    amIMuted: boolean;
    amIOperator: boolean;
    fetchMore: boolean;
    checkScrollBottom: () => boolean;
    onScroll: (callback: () => void) => void;
  }

  export interface OpenChannelUIProps {
    renderMessage?: (props: RenderMessageProps) => React.ReactNode | React.ReactElement;
    renderHeader?: () => React.ReactNode | React.ReactElement;
    renderInput?: () => React.ReactNode | React.ReactElement;
    renderPlaceHolderEmptyList?: () => React.ReactNode | React.ReactElement;
    renderPlaceHolderError?: () => React.ReactNode | React.ReactElement;
    renderPlaceHolderLoading?: () => React.ReactNode | React.ReactElement;
  }

  export interface OpenChannelProps extends OpenChannelProviderProps, OpenChannelUIProps {
  }

  export type OpenchannelMessageListProps = {
    renderMessage?: (props: RenderMessageProps) => React.ReactNode | React.ReactElement;
    renderPlaceHolderEmptyList?: () => React.ReactNode | React.ReactElement;
  }

  export type OpenChannelMessageInputWrapperProps = {
    // value is removed when channelURL changes
    value?: string;
    ref?: React.MutableRefObject<any>;
  }

  export type OpenChannelMessageProps = {
    renderMessage?: (props: RenderMessageProps) => React.ReactNode | React.ReactElement;
    message: EveryMessage;
    chainTop?: boolean;
    chainBottom?: boolean;
    hasSeparator?: boolean;
    editDisabled?: boolean;
  };

  /**
   * OpenChannelList
   */
  export interface UserFilledOpenChannelListQuery {
    customTypes?: Array<string>;
    includeFrozen?: boolean;
    includeMetaData?: boolean;
    limit?: number;
    nameKeyword?: string;
    urlKeyword?: string;
  }

  export type OpenChannelListFetchingStatus = 'EMPTY' | 'FETCHING' | 'DONE' | 'ERROR';
  export type CustomUseReducerDispatcher = (props: { type: string, payload: any }) => void;
  export type OnOpenChannelSelected = (channel: OpenChannel, e?: React.MouseEvent<HTMLDivElement | unknown>) => void;
  export type FetchNextCallbackType = (callback: (channels?: Array<OpenChannel>, err?: SendbirdError) => void) => void

  export interface OpenChannelListProviderProps {
    className?: string;
    children?: React.ReactElement;
    queries?: { openChannelListQuery?: UserFilledOpenChannelListQuery };
    onChannelSelected?: OnOpenChannelSelected;
  }

  export interface RenderOpenChannelPreviewProps {
    channel: OpenChannel;
    isSelected: boolean;
    onChannelSelected: OnOpenChannelSelected;
  }

  export interface OpenChannelListUIProps {
    renderHeader?: () => React.ReactElement;
    renderChannelPreview?: (props: RenderOpenChannelPreviewProps) => React.ReactElement;
    renderPlaceHolderEmpty?: () => React.ReactElement;
    renderPlaceHolderError?: () => React.ReactElement;
    renderPlaceHolderLoading?: () => React.ReactElement;
  }

  export interface OpenChannelPreviewProps {
    className?: string;
    isSelected?: boolean;
    channel: OpenChannel;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  }

  export interface OpenChannelListProviderInterface extends OpenChannelListProviderProps {
    logger: Logger;
    currentChannel: OpenChannel;
    allChannels: Array<OpenChannel>;
    fetchingStatus: OpenChannelListFetchingStatus;
    customOpenChannelListQuery?: UserFilledOpenChannelListQuery;
    fetchNextChannels: FetchNextCallbackType;
    refreshOpenChannelList: () => void;
    openChannelListDispatcher: CustomUseReducerDispatcher;
  }

  export interface OpenChannelListProps extends OpenChannelListProviderProps, OpenChannelListUIProps { }

  /**
   * CreateOpenChannel
   */
  export interface CreateOpenChannelProviderProps {
    className?: string;
    children?: React.ReactElement;
    onCreateChannel?: (channel: OpenChannel) => void;
    onBeforeCreateChannel?: (params: OpenChannelCreateParams) => OpenChannelCreateParams;
  }
  export interface CreateOpenChannelUIProps {
    closeModal?: () => void;
    renderHeader?: () => React.ReactElement;
    renderProfileInput?: () => React.ReactElement;
  }

  export interface CreateOpenChannelProps extends CreateOpenChannelProviderProps, CreateOpenChannelUIProps { }

  export interface CreateNewOpenChannelCallbackProps {
    name: string;
    coverUrlOrImage?: string;
  }

  export interface CreateOpenChannelContextInterface extends CreateOpenChannelProviderProps {
    sdk: SendbirdOpenChat;
    sdkInitialized: boolean;
    logger: Logger;
    createNewOpenChannel: (props: CreateNewOpenChannelCallbackProps) => void;
  }

  /**
   * OpenChannelSettings
   */
  export interface OpenChannelSettingsContextProps {
    channelUrl: string;
    children?: React.ReactElement;
    onCloseClick?(): void;
    onLeaveChannel?(): void;
    onBeforeUpdateChannel?(currentTitle: string, currentImg: File, data: string): OpenChannelUpdateParams;
    onChannelModified?(channel: OpenChannel): void;
    onDeleteChannel?(channel: OpenChannel): void;
    disableUserProfile?: boolean;
    renderUserProfile?: (props: RenderUserProfileProps) => React.ReactNode | React.ReactElement;
  }

  export interface OpenChannelSettingsUIProps {
    renderOperatorUI?: () => React.ReactNode | React.ReactElement;
    renderParticipantList?: () => React.ReactNode | React.ReactElement;
  }

  export interface OpenChannelSettingsProps extends OpenChannelSettingsContextProps, OpenChannelSettingsUIProps {
  }

  export interface OpenChannelSettingsContextType extends OpenChannelSettingsContextProps {
    channelUrl: string;
    channel?: OpenChannel;
    setChannel?: React.Dispatch<React.SetStateAction<OpenChannel>>;
  }

  export interface OperatorUIProps {
    renderChannelProfile?: () => React.ReactNode | React.ReactElement;
  }

  export interface OpenChannelEditDetailsProps {
    onCancel(): void;
  }

  /**
   * MessageSearch
   */
  export interface MessageSearchProviderProps {
    channelUrl: string;
    children?: React.ReactNode | React.ReactElement;
    searchString?: string;
    requestString?: string;
    messageSearchQuery?: MessageSearchQueryParams;
    onResultLoaded?(messages?: Array<ClientSentMessages>, error?: SendbirdError): void;
    onResultClick?(message: ClientSentMessages): void;
  }

  export type MessageSearchScrollCallbackReturn = (
    callback: (
      messages: Array<UserMessage | FileMessage | AdminMessage>,
      /* eslint-disable @typescript-eslint/no-explicit-any*/
      error: any,
    ) => void
  ) => void;

  export type MessageSearchDispatcherType = { type: string, payload: any };
  export interface MessageSearchProviderInterface extends MessageSearchProviderProps {
    retryCount: number;
    setRetryCount: React.Dispatch<React.SetStateAction<number>>;
    selectedMessageId: number;
    setSelectedMessageId: React.Dispatch<React.SetStateAction<number>>;
    messageSearchDispatcher: (diapatcher: MessageSearchDispatcherType) => void;
    scrollRef: React.MutableRefObject<HTMLDivElement>;
    allMessages: Array<ClientFileMessage | ClientUserMessage>;
    loading: boolean;
    isInvalid: boolean;
    currentChannel: GroupChannel;
    currentMessageSearchQuery: MessageSearchQuery;
    hasMoreResult: boolean;
    onScroll: MessageSearchScrollCallbackReturn;
    handleRetryToConnect: () => void;
    handleOnScroll: (e: React.BaseSyntheticEvent) => void;
  }

  export interface MessageSearchUIProps {
    renderPlaceHolderError?: (props: void) => React.ReactNode | React.ReactElement;
    renderPlaceHolderLoading?: (props: void) => React.ReactNode | React.ReactElement;
    renderPlaceHolderNoString?: (props: void) => React.ReactNode | React.ReactElement;
    renderPlaceHolderEmptyList?: (props: void) => React.ReactNode | React.ReactElement;
    renderSearchItem?(
      {
        message,
        onResultClick,
      }: {
        message: ClientSentMessages,
        onResultClick?: (message: ClientSentMessages) => void,
      }
    ): JSX.Element;
  }

  export interface MessageSearchProps extends MessageSearchUIProps, MessageSearchProviderProps {
    onCloseClick?: () => void;
  }

  /**
   * Thread
   */
  export enum ChannelStateTypes {
    NIL = 'NIL',
    LOADING = 'LOADING',
    INVALID = 'INVALID',
    INITIALIZED = 'INITIALIZED',
  }
  export enum ParentMessageStateTypes {
    NIL = 'NIL',
    LOADING = 'LOADING',
    INVALID = 'INVALID',
    INITIALIZED = 'INITIALIZED',
  }
  export enum ThreadListStateTypes {
    NIL = 'NIL',
    LOADING = 'LOADING',
    INVALID = 'INVALID',
    INITIALIZED = 'INITIALIZED',
  }

  export interface ThreadProps extends ThreadProviderProps, ThreadContextInitialState {
    className?: string;
  }

  export interface ThreadProviderInterface extends ThreadProviderProps, ThreadContextInitialState {
    fetchPrevThreads: (callback?: (messages?: Array<BaseMessage>) => void) => void;
    fetchNextThreads: (callback?: (messages?: Array<BaseMessage>) => void) => void;
    toggleReaction: (message, key, isReacted) => void;
    sendMessage: (props: {
      message: UserMessage,
      quoteMessage?: UserMessage | FileMessage,
      mentionTemplate?: string,
      mentionedUsers?: Array<User>,
    }) => void;
    sendFileMessage: (file: File, quoteMessage: UserMessage | FileMessage) => void;
    resendMessage: (failedMessage: UserMessage | FileMessage) => void;
    updateMessage: (props, callback?: () => void) => void;
    deleteMessage: (message: UserMessage | FileMessage) => Promise<UserMessage | FileMessage>;
    nicknamesMap: Map<string, string>;
  }

  export type ThreadProviderProps = {
    children?: React.ReactElement;
    channelUrl: string;
    message: UserMessage | FileMessage;
    onHeaderActionClick?: () => void;
    onMoveToParentMessage?: (props: { message: UserMessage | FileMessage, channel: GroupChannel }) => void;
    disableUserProfile?: boolean;
    renderUserProfile?: (props: { user: User, close: () => void }) => React.ReactElement;
    onUserProfileMessage?: (channel: GroupChannel) => void;
  }

  export interface ThreadContextInitialState {
    currentChannel: GroupChannel;
    allThreadMessages: Array<BaseMessage>;
    parentMessage: UserMessage | FileMessage;
    channelState: ChannelStateTypes;
    parentMessageState: ParentMessageStateTypes;
    threadListState: ThreadListStateTypes;
    hasMorePrev: boolean;
    hasMoreNext: boolean;
    emojiContainer: EmojiContainer;
    isMuted: boolean;
    isChannelFrozen: boolean;
    currentUserId: string;
  }

  export interface ThreadUIProps {
    renderHeader?: () => React.ReactElement;
    renderParentMessageInfo?: () => React.ReactElement;
    renderMessage?: (props: {
      message: UserMessage | FileMessage,
      chainTop: boolean,
      chainBottom: boolean,
      hasSeparator: boolean,
    }) => React.ReactElement;
    renderMessageInput?: () => React.ReactElement;
    renderCustomSeparator?: () => React.ReactElement;
    renderParentMessageInfoPlaceholder?: (type: ParentMessageStateTypes) => React.ReactElement;
    renderThreadListPlaceHolder?: (type: ThreadListStateTypes) => React.ReactElement;
  }

  type EventType = React.MouseEvent<HTMLDivElement | HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>;
  export interface ThreadHeaderProps {
    className?: string;
    channelName: string;
    renderActionIcon?: (props: { onActionIconClick: (e: EventType) => void }) => React.ReactElement;
    onActionIconClick?: (e: EventType) => void;
    onChannelNameClick?: (e: EventType) => void;
  }

  export interface ParentMessageInfoProps {
    className?: string;
  }

  export interface ParentMessageInfoItemProps {
    className?: string;
    message: UserMessage | FileMessage;
    showFileViewer?: (bool: boolean) => void;
  }

  export interface ThreadListProps {
    className?: string;
    allThreadMessages: Array<UserMessage | FileMessage | BaseMessage>;
    renderMessage?: (props: {
      message: UserMessage | FileMessage,
      chainTop: boolean,
      chainBottom: boolean,
      hasSeparator: boolean,
    }) => React.ReactElement;
    renderCustomSeparator?: (props: { message: UserMessage | FileMessage }) => React.ReactElement;
    scrollRef?: React.RefObject<HTMLDivElement>;
    scrollBottom?: number;
  }
  export interface ThreadListItemProps {
    className?: string;
    message: UserMessage | FileMessage;
    chainTop?: boolean;
    chainBottom?: boolean;
    hasSeparator?: boolean;
    renderCustomSeparator?: (props: { message: UserMessage | FileMessage }) => React.ReactElement;
    handleScroll?: () => void;
  }

  export interface ThreadMessageInputProps {
    className?: string;
  }

  /**
   * CreateChannel
   */
  export interface CreateChannelProviderProps {
    children?: React.ReactNode | React.ReactElement;
    onCreateChannel(channel: GroupChannel): void;
    overrideInviteUser?(params: OverrideInviteUserType): void;
    onBeforeCreateChannel?(users: Array<string>): GroupChannelCreateParams;
    userListQuery?(): UserListQuery;
  }

  export interface CreateChannelContextInterface {
    overrideInviteUser?(params: OverrideInviteUserType): void;
    onBeforeCreateChannel?(users: Array<string>): GroupChannelCreateParams;
    createChannel: (channelParams: GroupChannelCreateParams) => Promise<GroupChannel>;
    sdk: SendbirdGroupChat | SendbirdOpenChat;
    userListQuery?(): UserListQuery;
    onCreateChannel?(channel: GroupChannel): void;
    step: number,
    setStep: React.Dispatch<React.SetStateAction<number>>,
    type: 'group' | 'supergroup' | 'broadcast',
    setType: React.Dispatch<React.SetStateAction<'group' | 'supergroup' | 'broadcast'>>,
  }

  export interface CreateChannelUIProps {
    onCancel?(): void;
    renderStepOne?: (props: void) => React.ReactNode | React.ReactElement;
  }

  export interface CreateChannelProps extends CreateChannelProviderProps, CreateChannelUIProps { }

  export interface InviteUsersProps {
    onCancel?: () => void;
  }

  export interface SelectChannelTypeProps {
    onCancel?(): void;
  }

  /**
   * EditUserProfile
   */
  export interface EditUserProfileProps {
    children?: React.ReactNode | React.ReactElement;
    onCancel?(): void;
    onThemeChange?(theme: string): void;
    onEditProfile?(updatedUser: User): void;
  }

  export interface EditUserProfileProviderInterface {
    onCancel?(): void;
    onThemeChange?(theme: string): void;
    onEditProfile?(updatedUser: User): void;
  }
}

declare module '@sendbird/uikit-react' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  export const App: React.FunctionComponent<SendbirdUIKitGlobal.AppProps>;
  export const SendBirdProvider: React.FunctionComponent<SendbirdUIKitGlobal.SendbirdProviderProps>;
  export const sendBirdSelectors: SendbirdUIKitGlobal.sendbirdSelectorsInterface;
  export const sendbirdSelectors: SendbirdUIKitGlobal.sendbirdSelectorsInterface;
  export const ChannelList: React.FunctionComponent<SendbirdUIKitGlobal.ChannelListProps>;
  export const ChannelSettings: React.FunctionComponent<SendbirdUIKitGlobal.ChannelSettingsProps>;
  export const Channel: React.FunctionComponent<SendbirdUIKitGlobal.ChannelProps>
  export const OpenChannel: React.FunctionComponent<SendbirdUIKitGlobal.OpenChannelProps>
  export const OpenChannelSettings: React.FunctionComponent<SendbirdUIKitGlobal.OpenChannelSettingsProps>
  export const MessageSearch: React.FunctionComponent<SendbirdUIKitGlobal.MessageSearchProps>
  export function withSendBird(
    ChildComp: React.Component | React.ElementType | React.ReactNode | React.ReactElement,
    mapStoreToProps?: (store: SendbirdUIKitGlobal.SendBirdState) => unknown
  ): (props: unknown) => React.ReactNode | React.ReactElement;
  export function useSendbirdStateContext(): SendbirdUIKitGlobal.SendBirdState;
}

declare module '@sendbird/uikit-react/App' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const App: React.FunctionComponent<SendbirdUIKitGlobal.AppProps>
  export default App;
}

declare module '@sendbird/uikit-react/SendbirdProvider' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const SendbirdProvider: React.FunctionComponent<SendbirdUIKitGlobal.SendbirdProviderProps>;
  export default SendbirdProvider;
}

declare module '@sendbird/uikit-react/sendbirdSelectors' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const sendBirdSelectors: SendbirdUIKitGlobal.sendbirdSelectorsInterface;
  export default sendBirdSelectors;
}

declare module '@sendbird/uikit-react/useSendbirdStateContext' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  function useSendbirdStateContext(): SendbirdUIKitGlobal.SendBirdState;
  export default useSendbirdStateContext;
}

declare module '@sendbird/uikit-react/withSendbird' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  function withSendbird(
    ChildComp: React.Component | React.ElementType | React.ReactNode | React.ReactElement,
    mapStoreToProps?: (store: SendbirdUIKitGlobal.SendBirdState) => unknown
  ): (props: unknown) => React.ReactNode | React.ReactElement;
  export default withSendbird;
}

/** handlers */
declare module '@sendbird/uikit-react/handlers/ConnectionHandler' {
  import { ConnectionHandler } from '@sendbird/chat';
  export default ConnectionHandler;
}
declare module '@sendbird/uikit-react/handlers/SessionHandler' {
  import { SessionHandler } from '@sendbird/chat';
  export default SessionHandler;
}
declare module '@sendbird/uikit-react/handlers/GroupChannelHandler' {
  import { GroupChannelHandler } from '@sendbird/chat/groupChannel';
  export default GroupChannelHandler;
}
declare module '@sendbird/uikit-react/handlers/OpenChannelHandler' {
  import { OpenChannelHandler } from '@sendbird/chat/openChannel';
  export default OpenChannelHandler;
}
declare module '@sendbird/uikit-react/handlers/UserEventHandler' {
  import { UserEventHandler } from "@sendbird/chat";
  export default UserEventHandler;
}

/** utils */
declare module '@sendbird/uikit-react/utils/message/getOutgoingMessageState' {
  import { GroupChannel } from '@sendbird/chat/groupChannel';
  import { OpenChannel } from '@sendbird/chat/openChannel';
  import { UserMessage, FileMessage } from '@sendbird/chat/message';
  export enum OutgoingMessageStates {
    NONE = 'NONE',
    PENDING = 'PENDING',
    SENT = 'SENT',
    FAILED = 'FAILED',
    DELIVERED = 'DELIVERED',
    READ = 'READ',
  }
  export function getOutgoingMessageState(
    channel: GroupChannel | OpenChannel,
    message: UserMessage | FileMessage,
  ): OutgoingMessageStates;
}

/** ChannelList */
declare module '@sendbird/uikit-react/ChannelList' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const ChannelList: React.FunctionComponent<SendbirdUIKitGlobal.ChannelListProps>;
  export default ChannelList;
}

declare module '@sendbird/uikit-react/ChannelList/context' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  export const ChannelListProvider: React.FunctionComponent<SendbirdUIKitGlobal.ChannelListProviderProps>;
  export function useChannelListContext(): SendbirdUIKitGlobal.ChannelListProviderInterface;
  export function useChannelList(): SendbirdUIKitGlobal.ChannelListProviderInterface;
}

declare module '@sendbird/uikit-react/ChannelList/components/AddChannel' {
  const AddChannel: React.FunctionComponent;
  export default AddChannel;
}

declare module '@sendbird/uikit-react/ChannelList/components/ChannelListUI' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const ChannelListUI: React.FunctionComponent<SendbirdUIKitGlobal.ChannelListUIProps>;
  export default ChannelListUI;
}

declare module '@sendbird/uikit-react/ChannelList/components/ChannelListHeader' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const ChannelListHeader: React.FunctionComponent<SendbirdUIKitGlobal.ChannelListHeaderInterface>;
  export default ChannelListHeader;
}

declare module '@sendbird/uikit-react/ChannelList/components/ChannelPreview' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const ChannelPreview: React.FunctionComponent<SendbirdUIKitGlobal.ChannelPreviewInterface>;
  export default ChannelPreview;
}

declare module '@sendbird/uikit-react/ChannelList/components/ChannelPreviewAction' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const ChannelPreviewAction: React.FunctionComponent<SendbirdUIKitGlobal.ChannelPreviewActionInterface>;
  export default ChannelPreviewAction;
}

declare module '@sendbird/uikit-react/ChannelSettings' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const ChannelSettings: React.FunctionComponent<SendbirdUIKitGlobal.ChannelSettingsProps>;
  export default ChannelSettings;
}

declare module '@sendbird/uikit-react/ChannelSettings/context' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  export const ChannelSettingsProvider: React.FC<SendbirdUIKitGlobal.ChannelSettingsContextProps>;
  export const useChannelSettingsContext: () => SendbirdUIKitGlobal.ChannelSettingsProviderInterface;
}

declare module '@sendbird/uikit-react/ChannelSettings/components/ModerationPanel' {
  const ModerationPanel: React.FunctionComponent;
  export default ModerationPanel;
}

declare module '@sendbird/uikit-react/ChannelSettings/components/ChannelProfile' {
  const ChannelProfile: React.FunctionComponent;
  export default ChannelProfile;
}

declare module '@sendbird/uikit-react/ChannelSettings/components/ChannelSettingsUI' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const ChannelSettingsUI: React.FC<SendbirdUIKitGlobal.ChannelSettingsUIProps>;
  export default ChannelSettingsUI;
}

declare module '@sendbird/uikit-react/ChannelSettings/components/EditDetailsModal' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const EditDetailsModal: React.FC<SendbirdUIKitGlobal.ChannelSettingsEditDetailsProps>;
  export default EditDetailsModal;
}

declare module '@sendbird/uikit-react/ChannelSettings/components/LeaveChannel' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const LeaveChannel: React.FC<SendbirdUIKitGlobal.LeaveChannelProps>;
  export default LeaveChannel;
}

declare module '@sendbird/uikit-react/ChannelSettings/components/UserListItem' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const UserListItem: React.FC<SendbirdUIKitGlobal.UserListItemProps>;
  export default UserListItem;
}

declare module '@sendbird/uikit-react/ChannelSettings/components/UserPanel' {
  const UserPanel: React.FunctionComponent;
  export default UserPanel;
}

/**
 * Channel
 */
declare module '@sendbird/uikit-react/Channel' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const Channel: React.FC<SendbirdUIKitGlobal.ChannelProps>;
  export default Channel;
}

declare module '@sendbird/uikit-react/Channel/context' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  export const ChannelProvider: React.FunctionComponent<SendbirdUIKitGlobal.ChannelContextProps>;
  export function useChannelContext(): SendbirdUIKitGlobal.ChannelProviderInterface;
  export enum ThreadReplySelectType { PARENT, THREAD }
}

declare module '@sendbird/uikit-react/Channel/components/ChannelHeader' {
  const ChannelHeader: React.FunctionComponent;
  export default ChannelHeader;
}

declare module '@sendbird/uikit-react/Channel/components/ChannelUI' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const ChannelUI: React.FunctionComponent<SendbirdUIKitGlobal.ChannelUIProps>;
  export default ChannelUI;
}

declare module '@sendbird/uikit-react/Channel/components/FileViewer' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const FileViewer: React.FunctionComponent<SendbirdUIKitGlobal.FileViewerProps>;
  export default FileViewer;
}

declare module '@sendbird/uikit-react/Channel/components/FrozenNotification' {
  const FrozenNotification: React.FunctionComponent;
  export default FrozenNotification;
}

declare module '@sendbird/uikit-react/Channel/components/Message' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const Message: React.FunctionComponent<SendbirdUIKitGlobal.MessageUIProps>;
  export default Message;
}

declare module '@sendbird/uikit-react/Channel/components/MessageInput' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const MessageInput: React.FunctionComponent<SendbirdUIKitGlobal.MessageInputProps>;
  export default MessageInput;
}

declare module '@sendbird/uikit-react/Channel/components/MessageList' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const MessageList: React.FunctionComponent<SendbirdUIKitGlobal.MessageListProps>;
  export default MessageList;
}

declare module '@sendbird/uikit-react/Channel/components/SuggestedMentionList' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const SuggestedMentionList: React.FunctionComponent<SendbirdUIKitGlobal.SuggestedMentionListProps>;
  export default SuggestedMentionList;
}

declare module '@sendbird/uikit-react/Channel/components/RemoveMessageModal' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const RemoveMessageModal: React.FunctionComponent<SendbirdUIKitGlobal.RemoveMessageProps>;
  export default RemoveMessageModal;
}

declare module '@sendbird/uikit-react/Channel/components/TypingIndicator' {
  const TypingIndicator: React.FunctionComponent;
  export default TypingIndicator;
}

declare module '@sendbird/uikit-react/Channel/components/UnreadCount' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const UnreadCount: React.FunctionComponent<SendbirdUIKitGlobal.UnreadCountProps>;
  export default UnreadCount;
}

/**
 * OpenChannel
 */
declare module '@sendbird/uikit-react/OpenChannel' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const OpenChannel: React.FC<SendbirdUIKitGlobal.OpenChannelProps>;
  export default OpenChannel;
}

declare module '@sendbird/uikit-react/OpenChannel/context' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  export const OpenChannelProvider: React.FunctionComponent<SendbirdUIKitGlobal.OpenChannelProviderProps>;
  export function useOpenChannelContext(): SendbirdUIKitGlobal.OpenChannelInterface;
}

declare module '@sendbird/uikit-react/OpenChannel/components/FrozenChannelNotification' {
  const FrozenChannelNotification: React.FunctionComponent;
  export default FrozenChannelNotification;
}

declare module '@sendbird/uikit-react/OpenChannel/components/OpenChannelHeader' {
  const OpenChannelHeader: React.FunctionComponent;
  export default OpenChannelHeader;
}

declare module '@sendbird/uikit-react/OpenChannel/components/OpenChannelInput' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const OpenChannelInput: React.FC<SendbirdUIKitGlobal.OpenChannelMessageInputWrapperProps>;
  export default OpenChannelInput;
}

declare module '@sendbird/uikit-react/OpenChannel/components/OpenChannelMessage' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const OpenChannelMessage: React.FC<SendbirdUIKitGlobal.OpenChannelMessageProps>;
  export default OpenChannelMessage;
}

declare module '@sendbird/uikit-react/OpenChannel/components/OpenChannelMessageList' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const OpenChannelMessageList: React.FC<SendbirdUIKitGlobal.OpenchannelMessageListProps>;
  export default OpenChannelMessageList;
}

declare module '@sendbird/uikit-react/OpenChannel/components/OpenChannelUI' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const OpenChannelUI: React.FC<SendbirdUIKitGlobal.OpenChannelUIProps>;
  export default OpenChannelUI;
}

/**
 * OpenChannelList
 */
declare module '@sendbird/uikit-react/OpenChannelList' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const OpenChannelList: React.FC<SendbirdUIKitGlobal.OpenChannelListProps>;
  export default OpenChannelList;
}

declare module '@sendbird/uikit-react/OpenChannelList/context' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  export const OpenChannelListProvider: React.FC<SendbirdUIKitGlobal.OpenChannelListProviderProps>;
  export const useChannelListContext: () => SendbirdUIKitGlobal.OpenChannelListProviderInterface;
}

declare module '@sendbird/uikit-react/OpenChannelList/components/OpenChannelListUI' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const OpenChannelListUI: React.FC<SendbirdUIKitGlobal.OpenChannelListUIProps>;
  export default OpenChannelListUI;
}

declare module '@sendbird/uikit-react/OpenChannelList/components/OpenChannelPreview' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const OpenChannelPreview: React.FC<SendbirdUIKitGlobal.OpenChannelPreviewProps>;
  export default OpenChannelPreview;
}

/**
 * CreateOpenChannel
 */
declare module '@sendbird/uikit-react/CreateOpenChannel' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const CreateOpenChannel: React.FC<SendbirdUIKitGlobal.CreateOpenChannelProps>;
  export default CreateOpenChannel;
}

declare module '@sendbird/uikit-react/CreateOpenChannel/context' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  export const CreateOpenChannelProvider: React.FC<SendbirdUIKitGlobal.CreateOpenChannelProviderProps>;
  export const useCreateOpenChannelContext: () => SendbirdUIKitGlobal.CreateOpenChannelContextInterface;
}

declare module '@sendbird/uikit-react/CreateOpenChannel/components/CreateOpenChannelUI' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const CreateOpenChannelUI: React.FC<SendbirdUIKitGlobal.CreateOpenChannelUIProps>;
  export default CreateOpenChannelUI;
}

/**
 * OpenChannelSettings
 */
declare module '@sendbird/uikit-react/OpenChannelSettings' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const OpenChannelSettings: React.FC<SendbirdUIKitGlobal.OpenChannelSettingsProps>;
  export default OpenChannelSettings;
}

declare module '@sendbird/uikit-react/OpenChannelSettings/context' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  export const useOpenChannelSettingsContext: () => SendbirdUIKitGlobal.OpenChannelSettingsContextType;
  export const OpenChannelSettingsProvider: React.FC<SendbirdUIKitGlobal.OpenChannelSettingsContextProps>;
}

declare module '@sendbird/uikit-react/OpenChannelSettings/components/EditDetailsModal' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const EditDetailsModal: React.FC<SendbirdUIKitGlobal.OpenChannelEditDetailsProps>;
  export default EditDetailsModal;
}

declare module '@sendbird/uikit-react/OpenChannelSettings/components/OpenChannelSettingsUI' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const OpenChannelSettingsUI: React.FC<SendbirdUIKitGlobal.OpenChannelSettingsUIProps>;
  export default OpenChannelSettingsUI;
}

declare module '@sendbird/uikit-react/OpenChannelSettings/components/OperatorUI' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const OperatorUI: React.FC<SendbirdUIKitGlobal.OperatorUIProps>;
  export default OperatorUI;
}

declare module '@sendbird/uikit-react/OpenChannelSettings/components/ParticipantUI' {
  const ParticipantUI: React.FunctionComponent;
  export default ParticipantUI;
}

/**
 * MessageSearch
 */
declare module '@sendbird/uikit-react/MessageSearch' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const MessageSearch: React.FC<SendbirdUIKitGlobal.MessageSearchProps>;
  export default MessageSearch;
}

declare module '@sendbird/uikit-react/MessageSearch/context' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  export const useMessageSearchContext: () => SendbirdUIKitGlobal.MessageSearchProviderInterface;
  export const MessageSearchProvider: React.FC<SendbirdUIKitGlobal.MessageSearchProviderProps>;
}

declare module '@sendbird/uikit-react/MessageSearch/components/MessageSearchUI' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const MessageSearchUI: React.FC<SendbirdUIKitGlobal.MessageSearchUIProps>;
  export default MessageSearchUI;
}

/**
 * Thread
 */
declare module '@sendbird/uikit-react/Thread' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const Thread: React.FC<SendbirdUIKitGlobal.ThreadProviderProps>;
  export default Thread;
}

declare module '@sendbird/uikit-react/Thread/context' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  export const useThreadContext: () => SendbirdUIKitGlobal.ThreadProviderInterface;
  export const ThreadProvider: React.FC<SendbirdUIKitGlobal.ThreadProviderProps>;
}

declare module '@sendbird/uikit-react/Thread/context/types' {
  export enum ChannelStateTypes {
    NIL = 'NIL',
    LOADING = 'LOADING',
    INVALID = 'INVALID',
    INITIALIZED = 'INITIALIZED',
  }
  export enum ParentMessageStateTypes {
    NIL = 'NIL',
    LOADING = 'LOADING',
    INVALID = 'INVALID',
    INITIALIZED = 'INITIALIZED',
  }
  export enum ThreadListStateTypes {
    NIL = 'NIL',
    LOADING = 'LOADING',
    INVALID = 'INVALID',
    INITIALIZED = 'INITIALIZED',
  }
}

declare module '@sendbird/uikit-react/Thread/components/ThreadUI' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const ThreadUI: React.FC<SendbirdUIKitGlobal.ThreadUIProps>;
  export default ThreadUI;
}
declare module '@sendbird/uikit-react/Thread/components/ThreadHeader' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const ThreadHeader: React.FC<SendbirdUIKitGlobal.ThreadHeaderProps>;
  export default ThreadHeader;
}
declare module '@sendbird/uikit-react/Thread/components/ParentMessageInfo' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const ParentMessageInfo: React.FC<SendbirdUIKitGlobal.ParentMessageInfoProps>;
  export default ParentMessageInfo;
}
declare module '@sendbird/uikit-react/Thread/components/ParentMessageInfoItem' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const ParentMessageInfoItem: React.FC<SendbirdUIKitGlobal.ParentMessageInfoItemProps>;
  export default ParentMessageInfoItem;
}
declare module '@sendbird/uikit-react/Thread/components/ThreadList' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const ThreadList: React.FC<SendbirdUIKitGlobal.ThreadListProps>;
  export default ThreadList;
}
declare module '@sendbird/uikit-react/Thread/components/ThreadListItem' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const ThreadListItem: React.FC<SendbirdUIKitGlobal.ThreadListItemProps>;
  export default ThreadListItem;
}
declare module '@sendbird/uikit-react/Thread/components/ThreadMessageInput' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const ThreadMessageInput: React.FC<SendbirdUIKitGlobal.ThreadMessageInputProps>;
  export default ThreadMessageInput;
}

/**
 * CreateChannel
 */
declare module '@sendbird/uikit-react/CreateChannel' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const CreateChannel: React.FC<SendbirdUIKitGlobal.CreateChannelProps>;
  export default CreateChannel;
}

declare module '@sendbird/uikit-react/CreateChannel/context' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  export const CreateChannelProvider: React.FC<SendbirdUIKitGlobal.CreateChannelProviderProps>;
  export function useCreateChannelContext(): SendbirdUIKitGlobal.CreateChannelContextInterface;
}

declare module '@sendbird/uikit-react/CreateChannel/components/CreateChannelUI' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const CreateChannelUI: React.FC<SendbirdUIKitGlobal.CreateChannelUIProps>;
  export default CreateChannelUI;
}

declare module '@sendbird/uikit-react/CreateChannel/components/InviteUsers' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const InviteUsers: React.FC<SendbirdUIKitGlobal.InviteUsersProps>;
  export default InviteUsers;
}

declare module '@sendbird/uikit-react/CreateChannel/components/SelectChannelType' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const SelectChannelType: React.FC<SendbirdUIKitGlobal.SelectChannelTypeProps>;
  export default SelectChannelType;
}

/**
 * EditUserProfile
 */
declare module '@sendbird/uikit-react/EditUserProfile' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  const EditProfile: React.FC<SendbirdUIKitGlobal.EditUserProfileProps>;
  export default EditProfile;
}

declare module '@sendbird/uikit-react/EditUserProfile/context' {
  import SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  export const EditUserProfileProvider: React.FC<SendbirdUIKitGlobal.EditUserProfileProps>;
  export function useEditUserProfileProviderContext(): SendbirdUIKitGlobal.EditUserProfileProviderInterface;
}

declare module '@sendbird/uikit-react/EditUserProfile/components/EditUserProfileUI' {
  const EditUserProfileUI: React.FunctionComponent;
  export default EditUserProfileUI;
}

declare module '@sendbird/uikit-react/ui/Accordion' {
  interface AccordionProps {
    className?: string | Array<string>;
    id: string;
    renderTitle(): React.ReactElement;
    renderContent(): React.ReactElement;
    renderFooter?(): React.ReactElement;
  }
  const Accordion: React.FC<AccordionProps>;
  export default Accordion;
}

declare module '@sendbird/uikit-react/ui/AccordionGroup' {
  interface AccordionTypeProps {
    children: Array<React.ReactElement> | React.ReactElement;
    defaultOpened?: string;
    className?: string;
  }
  const AccordionGroup: React.FC<AccordionTypeProps>;
  export default AccordionGroup;
}

declare module '@sendbird/uikit-react/ui/AdminMessage' {
  import type { AdminMessage } from '@sendbird/chat/message';
  interface AdminMessageProps {
    className?: string,
    message: AdminMessage,
  }
  const AdminMessageComponent: React.FC<AdminMessageProps>;
  export default AdminMessageComponent;
}

declare module '@sendbird/uikit-react/ui/Avatar' {
  interface AvatarProps {
    className?: string | Array<string>,
    height?: string | number,
    width?: string | number,
    src?: string | Array<string>,
    alt?: string,
    onClick?(): void,
    customDefaultComponent?({ width, height }: { width: number | string, height: number | string }): React.ReactElement;
  }
  const Avatar: React.FC<AvatarProps>;
  export default Avatar;
}

declare module '@sendbird/uikit-react/ui/MutedAvatarOverlay' {
  interface MutedAvatarOverlayProps {
    height?: number;
    width?: number;
  }
  const MutedAvatarOverlay: React.FC<MutedAvatarOverlayProps>;
  export default MutedAvatarOverlay;
}

declare module '@sendbird/uikit-react/ui/Badge' {
  interface BadgeProps {
    count: number,
    maxLevel?: number,
    className?: string | string[],
  }
  const Badge: React.FC<BadgeProps>;
  export default Badge;
}

declare module '@sendbird/uikit-react/ui/Button' {
  interface ButtonProps {
    className?: string | Array<string>;
    type?: 'PRIMARY' | 'SECONDARY' | 'DANGER' | 'DISABLED';
    size?: 'BIG' | 'SMALL';
    children?: string | React.ReactElement;
    disabled?: boolean;
    onClick?: () => void;
  }
  const Button: React.FC<ButtonProps>;
  export default Button;
}

declare module '@sendbird/uikit-react/ui/ChannelAvatar' {
  import type { GroupChannel } from '@sendbird/chat/groupChannel'
  interface ChannelAvatarProps {
    channel: GroupChannel;
    userId: string;
    theme: string;
    width?: number,
    height?: number,
  }
  const ChannelAvatar: React.FC<ChannelAvatarProps>;
  export default ChannelAvatar;
}

declare module '@sendbird/uikit-react/ui/OpenChannelAvatar' {
  import type { OpenChannel } from '@sendbird/chat/openChannel'
  interface OpenChannelAvatarProps {
    channel: OpenChannel;
    theme: string;
    height?: number;
    width?: number;
  }
  const OpenChannelAvatar: React.FC<OpenChannelAvatarProps>;
  export default OpenChannelAvatar;
}

declare module '@sendbird/uikit-react/ui/Checkbox' {
  interface CheckboxProps {
    id?: string,
    checked?: boolean,
    onChange?: () => void,
  }
  const Checkbox: React.FC<CheckboxProps>;
  export default Checkbox;
}

declare module '@sendbird/uikit-react/ui/ConnectionStatus' {
  const ConnectionStatus: React.FunctionComponent;
  export default ConnectionStatus;
}

declare module '@sendbird/uikit-react/ui/ContextMenu' {
  interface ContextMenuProps {
    menuTrigger?: () => void;
    menuItems: () => void;
    isOpen?: boolean;
  }
  const ContextMenu: React.FC<ContextMenuProps>;
  export default ContextMenu;
}

declare module '@sendbird/uikit-react/ui/DateSeparator' {
  enum Colors {
    ONBACKGROUND_1 = 'ONBACKGROUND_1',
    ONBACKGROUND_2 = 'ONBACKGROUND_2',
    ONBACKGROUND_3 = 'ONBACKGROUND_3',
    ONBACKGROUND_4 = 'ONBACKGROUND_4',
    ONCONTENT_1 = 'ONCONTENT_1',
    PRIMARY = 'PRIMARY',
    ERROR = 'ERROR',
  }
  interface DateSeparatorProps {
    className?: string | Array<string>;
    children?: string | React.ReactElement,
    separatorColor?: Colors,
  }
  const DateSeparator: React.FC<DateSeparatorProps>;
  export default DateSeparator;
}

declare module '@sendbird/uikit-react/ui/Dropdown' {
  interface DropdownProps {
    renderButton: () => React.ReactElement,
    renderItems: () => React.ReactElement,
  }
  const Dropdown: React.FC<DropdownProps>;
  export default Dropdown;
}

declare module '@sendbird/uikit-react/ui/EmojiReactions' {
  import type { EmojiCategory } from '@sendbird/chat';
  import type { FileMessage, UserMessage } from '@sendbird/chat/message';

  interface EmojiContainer {
    emojiCategories: Array<EmojiCategory>;
    emojiHash: string;
  }
  interface EmojiReactionsProps {
    className?: string | Array<string>;
    userId: string;
    message: UserMessage | FileMessage;
    emojiContainer: EmojiContainer;
    memberNicknamesMap: Map<string, string>;
    spaceFromTrigger?: Record<string, unknown>;
    isByMe?: boolean;
    toggleReaction?: (message: UserMessage | FileMessage, key: string, byMe: boolean) => void;
  }
  const EmojiReactions: React.FC<EmojiReactionsProps>;
  export default EmojiReactions;

}

declare module '@sendbird/uikit-react/ui/FileMessageItemBody' {
  import type { FileMessage } from '@sendbird/chat/message';

  interface FileMessageItemBodyProps {
    className?: string | Array<string>;
    message: FileMessage;
    isByMe?: boolean;
    mouseHover?: boolean;
    isReactionEnabled?: boolean;
  }
  const FileMessageItemBody: React.FC<FileMessageItemBodyProps>;
  export default FileMessageItemBody;

}

declare module '@sendbird/uikit-react/ui/FileViewer' {
  import type { FileMessage } from '@sendbird/chat/message';

  interface FileViewerBodyProps {
    message: FileMessage;
    isByMe?: boolean;
    onClose?: () => void,
    onDelete?: () => void,
  }
  const FileViewerBody: React.FC<FileViewerBodyProps>;
  export default FileViewerBody;
}

declare module '@sendbird/uikit-react/ui/Icon' {
  interface IconProps {
    className?: string,
    children?: string | React.ReactElement,
    fillColor?: string,
    width?: number,
    height?: number,
    onClick?: () => void,
  }
  const Icon: React.FC<IconProps>;
  export default Icon;
}

declare module '@sendbird/uikit-react/ui/IconButton' {
  interface IconButtonProps {
    className?: string | Array<string>,
    children?: string | React.ReactElement,
    disabled?: boolean,
    width?: number,
    height?: number,
    type: string,
    onClick?: () => void,
    onBlur?: () => void,
  }
  const IconButton: React.FC<IconButtonProps>;
  export default IconButton;
}

declare module '@sendbird/uikit-react/ui/ImageRenderer' {
  interface ImageRendererProps {
    className?: string | Array<string>;
    url: string;
    alt?: string;
    width?: string | number;
    height?: string | number;
    circle?: boolean;
    fixedSize?: boolean;
    placeHolder?: ((props: { style: { [key: string]: string | number } }) => React.ReactElement) | React.ReactElement;
    defaultComponent?: (() => React.ReactElement) | React.ReactElement;
    onLoad?: () => void;
    onError?: () => void;
  }
  const ImageRenderer: React.FC<ImageRendererProps>;
  export default ImageRenderer;
}

declare module '@sendbird/uikit-react/ui/Input' {
  interface InputProps {
    name: string,
    required?: boolean,
    disabled?: boolean,
    placeHolder?: string,
    value?: string,
  }
  const Input: React.FC<InputProps>;
  export default Input;
}

declare module '@sendbird/uikit-react/ui/Label' {
  interface LabelProps {
    className: Array<string>,
    type: string,
    color: string,
    children: React.ReactElement,
  }
  const Label: React.FC<LabelProps>;
  export default Label;
}

declare module '@sendbird/uikit-react/ui/LinkLabel' {
  interface LinkLabelProps {
    className?: Array<string>,
    src: string,
    type?: string,
    color?: string,
    children: React.ReactElement | string,
  }
  const LinkLabel: React.FC<LinkLabelProps>;
  export default LinkLabel;
}

declare module '@sendbird/uikit-react/ui/Loader' {
  interface LoaderProps {
    className?: Array<string>,
    width?: number,
    height?: number,
    children: React.ReactElement | string,
  }
  const Loader: React.FC<LoaderProps>;
  export default Loader;
}

declare module '@sendbird/uikit-react/ui/MentionUserLabel' {
  interface MentionUserLabelProps {
    className?: string
    children?: string;
    isReverse?: boolean;
    color?: string;
    userId?: string;
  }
  const MentionUserLabel: React.FC<MentionUserLabelProps>;
  export default MentionUserLabel;
}

declare module '@sendbird/uikit-react/ui/MentionLabel' {
  interface MentionLabelProps {
    mentionTemplate: string;
    mentionedUserId: string;
    isByMe: boolean;
  }
  const MentionUserLabel: React.FC<MentionLabelProps>;
  export default MentionUserLabel;
}

declare module '@sendbird/uikit-react/ui/MessageContent' {
  import type { GroupChannel, Member } from '@sendbird/chat/groupChannel';
  import type { EmojiContainer } from '@sendbird/chat';
  import type { AdminMessage, FileMessage, UserMessage } from '@sendbird/chat/message';
  import type SenbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  interface MessageContentProps {
    className?: string | Array<string>;
    userId: string;
    channel: GroupChannel;
    message: AdminMessage | FileMessage | UserMessage;
    disabled?: boolean;
    chainTop?: boolean;
    chainBottom?: boolean;
    useReaction?: boolean;
    replyType?: SenbirdUIKitGlobal.ReplyType;
    nicknamesMap?: Map<string, string>;
    emojiContainer?: EmojiContainer;
    scrollToMessage?: (createdAt: number, messageId: number) => void;
    showEdit?: (bool: boolean) => void;
    showRemove?: (bool: boolean) => void;
    showFileViewer?: (bool: boolean) => void;
    resendMessage?: (message: UserMessage | FileMessage) => void;
    toggleReaction?: (message: UserMessage | FileMessage, reactionKey: string, isReacted: boolean) => void;
    setQuoteMessage?: (message: UserMessage | FileMessage) => void;
  }
  const MessageContent: React.FC<MessageContentProps>;
  export default MessageContent;
}

declare module '@sendbird/uikit-react/ui/MessageInput' {
  import type { User } from '@sendbird/chat';

  interface MessageInputProps {
    className?: Array<string>,
    isEdit?: boolean,
    isMentionEnabled?: boolean;
    disabled?: boolean,
    // value is removed when channelURL changes
    value?: string,
    name: string,
    placeholder?: string,
    maxLength?: number,
    onFileUpload?: () => void,
    onSendMessage?: () => void,
    onCancelEdit?: () => void,
    onStartTyping?: () => void,
    channelUrl: string,
    mentionSelectedUser?: Array<User>,
    onUserMentioned?: (user: User) => void,
    onMentionStringChange?: (str: string) => void,
    onMentionedUserIdsUpdated?: (userIds: Array<string>) => void,
    onKeyUp?: (e: React.KeyboardEvent<HTMLDivElement>) => void,
    onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void,
  }
  const MessageInput: React.FC<MessageInputProps>;
  export default MessageInput;
}

declare module '@sendbird/uikit-react/ui/MessageItemMenu' {
  import type { GroupChannel } from '@sendbird/chat/groupChannel';
  import type { FileMessage, UserMessage } from '@sendbird/chat/message';
  import type { OpenChannel } from '@sendbird/chat/openChannel';
  type ReplyType = "NONE" | "QUOTE_REPLY" | "THREAD";

  interface MessageItemMenuProps {
    className?: string | Array<string>;
    message: UserMessage | FileMessage;
    channel: GroupChannel | OpenChannel;
    isByMe?: boolean;
    disabled?: boolean;
    replyType?: ReplyType;
    disableDeleteMessage?: boolean;
    showEdit?: (bool: boolean) => void;
    showRemove?: (bool: boolean) => void;
    resendMessage?: (message: UserMessage | FileMessage) => void;
    setQuoteMessage?: (message: UserMessage | FileMessage) => void;
    setSupposedHover?: (bool: boolean) => void;
    onReplyInThread?: (props: { message: UserMessage | FileMessage }) => void;
    onMoveToParentMessage?: () => void;
  }
  const MessageItemMenu: React.FC<MessageItemMenuProps>;
  export default MessageItemMenu;

}

declare module '@sendbird/uikit-react/ui/MessageItemReactionMenu' {
  import type { EmojiContainer } from '@sendbird/chat';
  import type { FileMessage, UserMessage } from '@sendbird/chat/message';

  interface MessageItemReactionMenuProps {
    className?: string | Array<string>;
    message: UserMessage | FileMessage;
    userId: string;
    spaceFromTrigger?: Record<string, unknown>;
    emojiContainer?: EmojiContainer;
    toggleReaction?: (message: UserMessage | FileMessage, reactionKey: string, isReacted: boolean) => void;
    setSupposedHover?: (bool: boolean) => void;
  }
  const MessageItemReactionMenu: React.FC<MessageItemReactionMenuProps>;
  export default MessageItemReactionMenu;
}

declare module '@sendbird/uikit-react/ui/MessageSearchFileItem' {
  import type SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';

  interface MessageSearchFileItemProps {
    className?: string | Array<string>;
    message: SendbirdUIKitGlobal.ClientFileMessage;
    selected?: boolean;
    onClick?: (message: SendbirdUIKitGlobal.ClientFileMessage) => void;
  }
  const MessageSearchFileItem: React.FC<MessageSearchFileItemProps>;
  export default MessageSearchFileItem;

}

declare module '@sendbird/uikit-react/ui/MessageSearchItem' {
  import type SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';

  interface MessageSearchItemProps {
    className?: string | Array<string>;
    message: SendbirdUIKitGlobal.ClientUserMessage;
    selected?: boolean;
    onClick?: (message: SendbirdUIKitGlobal.ClientMessage) => void;
  }
  const MessageSearchItem: React.FC<MessageSearchItemProps>;
  export default MessageSearchItem;

}

declare module '@sendbird/uikit-react/ui/MessageStatus' {
  import type { UserMessage, FileMessage } from '@sendbird/chat/message';
  import type { GroupChannel } from '@sendbird/chat/groupChannel';

  interface MessageStatusProps {
    className?: string;
    message: UserMessage | FileMessage;
    channel: GroupChannel;
    isDateSeparatorConsidered?: boolean;
  }
  const MessageStatus: React.FC<MessageStatusProps>;
  export default MessageStatus;

}

declare module '@sendbird/uikit-react/ui/Modal' {
  interface ModalProps {
    className?: string,
    onCancel: () => void,
    onSubmit: () => void,
    hideFooter?: boolean,
    disabled?: boolean,
    type?: string,
    isFullScreenOnMobile?: boolean;
    isCloseOnClickOutside?: boolean;
    children: React.ReactElement | string,
    renderHeader?: () => React.ReactElement,
  }
  const Modal: React.FC<ModalProps>;
  export default Modal;
}

declare module '@sendbird/uikit-react/ui/OGMessageItemBody' {
  import type { UserMessage } from '@sendbird/chat/message';
  interface OGMessageItemBodyProps {
    className?: string | Array<string>;
    message: UserMessage;
    isByMe?: boolean;
    mouseHover?: boolean;
    isMentionEnabled?: boolean;
    isReactionEnabled?: boolean;
  }
  const OGMessageItemBody: React.FC<OGMessageItemBodyProps>;
  export default OGMessageItemBody;
}

declare module '@sendbird/uikit-react/ui/OpenChannelAdminMessage' {
  import type { AdminMessage } from '@sendbird/chat/message';
  interface OpenChannelAdminMessageProps {
    className?: string | Array<string>;
    message: AdminMessage;
  }
  const OpenChannelAdminMessage: React.FC<OpenChannelAdminMessageProps>;
  export default OpenChannelAdminMessage;
}

declare module '@sendbird/uikit-react/ui/OpenChannelConversationHeader' {
  interface OpenChannelConversationHeaderProps {
    coverImage?: string;
    title?: string;
    subTitle?: string;
    amIOperator?: boolean;
    onActionClick?(): void;
  }
  const OpenChannelConversationHeader: React.FC<OpenChannelConversationHeaderProps>;
  export default OpenChannelConversationHeader;
}

declare module '@sendbird/uikit-react/ui/OpenChannelFileMessage' {
  import type SenbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  interface OpenChannelFileMessageProps {
    className?: string | Array<string>;
    message: SenbirdUIKitGlobal.ClientFileMessage;
    userId: string;
    disabled?: boolean;
    chainTop?: boolean;
    chainBottom?: boolean;
    showRemove(bool: boolean): void;
    resendMessage(message: SenbirdUIKitGlobal.ClientFileMessage): void;
  }
  const OpenChannelFileMessage: React.FC<OpenChannelFileMessageProps>;
  export default OpenChannelFileMessage;
}

declare module '@sendbird/uikit-react/ui/OpenChannelOGMessage' {
  import type SenbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  interface OOpenChannelOGMessageProps {
    message: SenbirdUIKitGlobal.ClientUserMessage;
    className?: string | Array<string>;
    disabled?: boolean;
    showEdit(bool: boolean): void;
    showRemove(bool: boolean): void;
    resendMessage(message: SenbirdUIKitGlobal.ClientUserMessage): void;
    chainTop?: boolean;
    chainBottom?: boolean;
    userId: string;
  }
  const OOpenChannelOGMessage: React.FC<OOpenChannelOGMessageProps>;
  export default OOpenChannelOGMessage;
}

declare module '@sendbird/uikit-react/ui/OpenChannelThumbnailMessage' {
  import type SenbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  interface OpenChannelThumbnailMessageProps {
    className?: string | Array<string>;
    message: SenbirdUIKitGlobal.ClientFileMessage;
    disabled: boolean;
    userId: string;
    chainTop: boolean;
    chainBottom: boolean;
    onClick(bool: boolean): void,
    showRemove(bool: boolean): void,
    resendMessage(message: SenbirdUIKitGlobal.ClientFileMessage): void;
  }
  const OpenChannelThumbnailMessage: React.FC<OpenChannelThumbnailMessageProps>;
  export default OpenChannelThumbnailMessage;
}

declare module '@sendbird/uikit-react/ui/OpenChannelUserMessage' {
  import type SenbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  interface OpenChannelUserMessageProps {
    className?: string | Array<string>;
    message: SenbirdUIKitGlobal.ClientUserMessage;
    userId: string;
    disabled?: boolean;
    showEdit(bool: boolean): void;
    showRemove(bool: boolean): void;
    resendMessage(message: SenbirdUIKitGlobal.ClientUserMessage): void;
    chainTop?: boolean;
    chainBottom?: boolean;
  }
  const OpenChannelUserMessage: React.FC<OpenChannelUserMessageProps>;
  export default OpenChannelUserMessage;
}

declare module '@sendbird/uikit-react/ui/PlaceHolder' {
  interface PlaceHolderProps {
    className?: string | Array<string>;
    type?: 'LOADING' | 'NO_CHANNELS' | 'NO_MESSAGES' | 'WRONG' | 'SEARCH_IN' | 'SEARCHING' | 'NO_RESULT',
    iconSize?: string | number;
    searchInString?: string;
    retryToConnect?: () => void;
  }
  const PlaceHolder: React.FC<PlaceHolderProps>;
  export default PlaceHolder;
}

declare module '@sendbird/uikit-react/ui/QuoteMessage' {
  import type { UserMessage, FileMessage } from '@sendbird/chat/message';
  interface QuoteMessageProps {
    message?: UserMessage | FileMessage;
    userId?: string;
    isByMe?: boolean;
    className?: string | Array<string>;
    onClick?: () => void;
  }
  const QuoteMessage: React.FC<QuoteMessageProps>;
  export default QuoteMessage;
}

declare module '@sendbird/uikit-react/ui/QuoteMessageInput' {
  import type SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  interface QuoteMessageInputProps {
    className?: string | Array<string>;
    replyingMessage: SendbirdUIKitGlobal.CoreMessageType;
    onClose?: (message: SendbirdUIKitGlobal.CoreMessageType) => void;
  }
  const QuoteMessageInput: React.FC<QuoteMessageInputProps>;
  export default QuoteMessageInput;
}

declare module '@sendbird/uikit-react/ui/ReactionBadge' {
  interface ReactionBadgeProps {
    className?: string | Array<string>;
    children?: React.ReactElement;
    count?: boolean,
    selected?: boolean,
    isAdd?: boolean,
    onClick?: () => void,
  }
  const ReactionBadge: React.FC<ReactionBadgeProps>;
  export default ReactionBadge;
}

declare module '@sendbird/uikit-react/ui/ReactionButton' {
  interface ReactionButtonProps {
    className?: string | Array<string>;
    width?: number,
    height?: number,
    selected: boolean,
    onClick?: () => void,
    children?: React.ReactElement;
  }
  const ReactionButton: React.FC<ReactionButtonProps>;
  export default ReactionButton;
}

declare module '@sendbird/uikit-react/ui/SortByRow' {
  interface SortByRowProps {
    maxItemCount?: number,
    itemWidth?: number,
    itemHeight?: number,
    children?: React.ReactElement;
    className?: string | Array<string>;
  }
  const SortByRow: React.FC<SortByRowProps>;
  export default SortByRow;
}

declare module '@sendbird/uikit-react/ui/TextButton' {
  enum Colors {
    ONBACKGROUND_1 = 'ONBACKGROUND_1',
    ONBACKGROUND_2 = 'ONBACKGROUND_2',
    ONBACKGROUND_3 = 'ONBACKGROUND_3',
    ONBACKGROUND_4 = 'ONBACKGROUND_4',
    ONCONTENT_1 = 'ONCONTENT_1',
    PRIMARY = 'PRIMARY',
    ERROR = 'ERROR',
  }
  interface TextButtonProps {
    children: React.ReactElement;
    className?: string | Array<string>;
    color?: Colors;
    disabled?: boolean;
    disableUnderline?: boolean;
    onClick?: (e: (React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>)) => void;
  }
  const TextButton: React.FC<TextButtonProps>;
  export default TextButton;
}

declare module '@sendbird/uikit-react/ui/TextMessageItemBody' {
  import type { UserMessage } from '@sendbird/chat/message';
  interface TextMessageItemBodyProps {
    className?: string | Array<string>;
    message: UserMessage;
    isByMe?: boolean;
    mouseHover?: boolean;
    isMentionEnabled?: boolean;
    isReactionEnabled?: boolean;
  }
  const TextMessageItemBody: React.FC<TextMessageItemBodyProps>;
  export default TextMessageItemBody;
}

declare module '@sendbird/uikit-react/ui/ThreadReplies' {
  import type { ThreadInfo } from '@sendbird/chat/message';
  interface ThreadRepliesProps {
    className?: string;
    threadInfo: ThreadInfo;
    onClick?: (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void;
  }
  const ThreadReplies: React.FC<ThreadRepliesProps>;
  export default ThreadReplies;
}

declare module '@sendbird/uikit-react/ui/ThumbnailMessageItemBody' {
  import type { FileMessage } from '@sendbird/chat/message';
  interface ThumbnailMessageItemBodyProps {
    className?: string | Array<string>;
    message: FileMessage;
    isByMe?: boolean;
    mouseHover?: boolean;
    isReactionEnabled?: boolean;
    showFileViewer?: (bool: boolean) => void;
    style?: Record<string, any>;
  }
  const ThumbnailMessageItemBody: React.FC<ThumbnailMessageItemBodyProps>;
  export default ThumbnailMessageItemBody;
}

declare module '@sendbird/uikit-react/ui/Tooltip' {
  interface TooltipProps {
    children?: React.ReactElement;
    className?: string | Array<string>;
  }
  const Tooltip: React.FC<TooltipProps>;
  export default Tooltip;
}

declare module '@sendbird/uikit-react/ui/TooltipWrapper' {
  interface OpenChannelFileMessageProps {
    hoverTooltip?: React.ReactElement;
    children?: React.ReactElement;
    className?: string | Array<string>;
  }
  const OpenChannelFileMessage: React.FC<OpenChannelFileMessageProps>;
  export default OpenChannelFileMessage;
}

declare module '@sendbird/uikit-react/ui/UnknownMessageItemBody' {
  import type SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  interface UnknownMessageItemBodyProps {
    className?: string | Array<string>;
    isByMe?: boolean;
    message: SendbirdUIKitGlobal.CoreMessageType;
    mouseHover?: boolean;
    isReactionEnabled?: boolean;
  }
  const UnknownMessageItemBody: React.FC<UnknownMessageItemBodyProps>;
  export default UnknownMessageItemBody;
}

declare module '@sendbird/uikit-react/ui/UserListItem' {
  import type { User } from '@sendbird/chat';
  interface UserListItemProps {
    className?: string | Array<string>;
    user?: User,
    checkBox?: boolean,
    disableMessaging?: boolean,
    currentUser?: string,
    checked?: boolean,
    onChange?: () => void,
    action?: () => React.ReactElement,
  }
  const UserListItem: React.FC<UserListItemProps>;
  export default UserListItem;
}

declare module '@sendbird/uikit-react/ui/UserProfile' {
  import type { User } from '@sendbird/chat';
  import type { SendbirdGroupChat, GroupChannelCreateParams, GroupChannel } from '@sendbird/chat/groupChannel';
  import type { SendbirdOpenChat } from '@sendbird/chat/openChannel';
  import type SendbirdUIKitGlobal from 'SendbirdUIKitGlobal';
  interface UserProfileProps {
    user: User;
    currentUserId?: string;
    sdk?: SendbirdGroupChat | SendbirdOpenChat;
    logger?: SendbirdUIKitGlobal.Logger;
    disableMessaging?: boolean;
    createChannel?(params: GroupChannelCreateParams): Promise<GroupChannel>;
    onSuccess?(): void;
  }
  const UserProfile: React.FC<UserProfileProps>;
  export default UserProfile;
}
