export { default as SendBirdProvider } from './SendbirdProvider.js';
export { default as App } from './App.js';
export { default as ChannelSettings } from './ChannelSettings.js';
export { default as ChannelList } from './ChannelList.js';
export { default as Channel, getAllEmojisFromEmojiContainer, getEmojiCategoriesFromEmojiContainer, getEmojisFromEmojiContainer } from './Channel.js';
import { S as SendbirdSdkContext } from './LocalizationContext-668a1ea6.js';
export { g as getStringSet, w as withSendBird } from './LocalizationContext-668a1ea6.js';
export { default as OpenChannel } from './OpenChannel.js';
export { default as OpenChannelSettings } from './OpenChannelSettings.js';
export { default as MessageSearch } from './MessageSearch.js';
export { s as sendBirdSelectors } from './index-96c0ebfa.js';
import { useContext } from 'react';
import 'prop-types';
import 'sendbird';
import './actionTypes-ed6a21b3.js';
import './index-3ba00050.js';
import 'css-vars-ponyfill';
import './index-63e654f0.js';
import './LeaveChannel-bf4033b5.js';
import './index-0cd544e5.js';
import './index-ae395294.js';
import './utils-6e673a84.js';
import './index-25dbd6cb.js';
import './index-0a69274c.js';
import './index-ea3ae4a1.js';
import './index-13a6a88a.js';
import 'react-dom';

/**
 * Example:
 * const MyComponent = () => {
 *  const context = useSendbirdStateContext();
 *  const sdk = sendbirdSelectors.getSdk(context);
 *  return (<div>...</div>);
 * }
 */

function useSendbirdStateContext() {
  var context = useContext(SendbirdSdkContext);
  return context;
}

export { useSendbirdStateContext };
//# sourceMappingURL=index.js.map
