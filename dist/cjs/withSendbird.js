'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-597f5cf8.js');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const SendbirdSdkContext = /*#__PURE__*/React__default["default"].createContext();

const withSendbirdContext = (OriginalComponent, mapStoreToProps) => {
  const ContextAwareComponent = props => /*#__PURE__*/React__default["default"].createElement(SendbirdSdkContext.Consumer, null, context => {
    if (mapStoreToProps && typeof mapStoreToProps !== 'function') {
      // eslint-disable-next-line no-console
      console.warn('Second parameter to withSendbirdContext must be a pure function');
    }

    const mergedProps = mapStoreToProps && typeof mapStoreToProps === 'function' ? _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, mapStoreToProps(context)), props) : _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, context), props); // eslint-disable-next-line react/jsx-props-no-spreading

    return /*#__PURE__*/React__default["default"].createElement(OriginalComponent, mergedProps);
  });

  const componentName = OriginalComponent.displayName || OriginalComponent.name || 'Component';
  ContextAwareComponent.displayName = `SendbirdAware${componentName}`;
  return ContextAwareComponent;
};

exports.SendbirdSdkContext = SendbirdSdkContext;
exports["default"] = withSendbirdContext;
//# sourceMappingURL=withSendbird.js.map
