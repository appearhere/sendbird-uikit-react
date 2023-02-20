export { default as SendBirdProvider } from './SendbirdProvider.js';
export { default as App } from './App.js';
export { default as ChannelSettings } from './ChannelSettings.js';
export { default as ChannelList } from './ChannelList.js';
export { default as Channel, getAllEmojisFromEmojiContainer, getEmojiCategoriesFromEmojiContainer, getEmojisFromEmojiContainer } from './Channel.js';
import { S as SendbirdSdkContext } from './LocalizationContext-fb23954a.js';
export { g as getStringSet, w as withSendBird } from './LocalizationContext-fb23954a.js';
export { default as OpenChannel } from './OpenChannel.js';
export { default as OpenChannelSettings } from './OpenChannelSettings.js';
export { default as MessageSearch } from './MessageSearch.js';
export { s as sendBirdSelectors } from './index-69674cf1.js';
import { useContext } from 'react';
import 'prop-types';
import 'sendbird';
import './actionTypes-8e69017b.js';
import './index-e514b5c7.js';
import 'css-vars-ponyfill';
import './index-c45f1918.js';
import './LeaveChannel-186b995b.js';
import './index-feae9f57.js';
import './index-d612c603.js';
import './utils-e709e568.js';
import './index-058f53da.js';
import './index-d821371c.js';
import './index-c038a6e4.js';
import './index-e8e11124.js';
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
