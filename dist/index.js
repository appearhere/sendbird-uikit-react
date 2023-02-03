export { default as SendBirdProvider } from './SendbirdProvider.js';
export { default as App } from './App.js';
export { default as ChannelSettings } from './ChannelSettings.js';
export { default as ChannelList } from './ChannelList.js';
export { default as Channel, getAllEmojisFromEmojiContainer, getEmojiCategoriesFromEmojiContainer, getEmojisFromEmojiContainer } from './Channel.js';
import { S as SendbirdSdkContext } from './LocalizationContext-4f84414a.js';
export { g as getStringSet, w as withSendBird } from './LocalizationContext-4f84414a.js';
export { default as OpenChannel } from './OpenChannel.js';
export { default as OpenChannelSettings } from './OpenChannelSettings.js';
export { default as MessageSearch } from './MessageSearch.js';
export { s as sendBirdSelectors } from './index-38ea17f7.js';
import { useContext } from 'react';
import 'prop-types';
import 'sendbird';
import './actionTypes-c5f62117.js';
import './index-098bf6e1.js';
import 'css-vars-ponyfill';
import './index-ba41c814.js';
import './LeaveChannel-e973613e.js';
import './index-880f789f.js';
import './index-bb9cd10b.js';
import './utils-1c812b47.js';
import './index-e1ccbbac.js';
import './index-5b01e184.js';
import './index-09a6ff1f.js';
import './index-be5aadf0.js';
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
