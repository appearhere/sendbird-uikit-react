'use strict';

var React = require('react');
var withSendbird = require('./withSendbird.js');
require('./_rollupPluginBabelHelpers-597f5cf8.js');

/**
 * Example:
 * const MyComponent = () => {
 *  const context = useSendbirdStateContext();
 *  const sdk = sendbirdSelectors.getSdk(context);
 *  return (<div>...</div>);
 * }
 */

function useSendbirdStateContext() {
  var context = React.useContext(withSendbird.SendbirdSdkContext);
  return context;
}

module.exports = useSendbirdStateContext;
//# sourceMappingURL=useSendbirdStateContext.js.map
