export { default as SendBirdProvider } from './SendbirdProvider.js';
export { default as App } from './App.js';
export { default as ChannelSettings } from './ChannelSettings.js';
export { default as ChannelList } from './ChannelList.js';
export { default as Channel, getAllEmojisFromEmojiContainer, getEmojiCategoriesFromEmojiContainer, getEmojisFromEmojiContainer } from './Channel.js';
import { S as SendbirdSdkContext } from './LocalizationContext-ef1f11a7.js';
export { g as getStringSet, w as withSendBird } from './LocalizationContext-ef1f11a7.js';
export { default as OpenChannel } from './OpenChannel.js';
export { default as OpenChannelSettings } from './OpenChannelSettings.js';
export { default as MessageSearch } from './MessageSearch.js';
export { s as sendBirdSelectors } from './index-9654c8fd.js';
import { useContext } from 'react';
import 'prop-types';
import 'sendbird';
import './actionTypes-b5c24a63.js';
import './index-e9bf54e3.js';
import 'css-vars-ponyfill';
import './index-88859e36.js';
import './LeaveChannel-04d546e3.js';
import './index-b9a826ad.js';
import './index-10ef6b87.js';
import './utils-ff1fc2bf.js';
import './index-016ac689.js';
import './index-17a77b13.js';
import './index-9ba2e621.js';
import './index-b121da7f.js';
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
