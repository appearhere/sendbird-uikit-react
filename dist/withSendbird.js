import { _ as _objectSpread2 } from './_rollupPluginBabelHelpers-fe256514.js';
import React__default from 'react';

const SendbirdSdkContext = /*#__PURE__*/React__default.createContext();

const withSendbirdContext = (OriginalComponent, mapStoreToProps) => {
  const ContextAwareComponent = props => /*#__PURE__*/React__default.createElement(SendbirdSdkContext.Consumer, null, context => {
    if (mapStoreToProps && typeof mapStoreToProps !== 'function') {
      // eslint-disable-next-line no-console
      console.warn('Second parameter to withSendbirdContext must be a pure function');
    }

    const mergedProps = mapStoreToProps && typeof mapStoreToProps === 'function' ? _objectSpread2(_objectSpread2({}, mapStoreToProps(context)), props) : _objectSpread2(_objectSpread2({}, context), props); // eslint-disable-next-line react/jsx-props-no-spreading

    return /*#__PURE__*/React__default.createElement(OriginalComponent, mergedProps);
  });

  const componentName = OriginalComponent.displayName || OriginalComponent.name || 'Component';
  ContextAwareComponent.displayName = `SendbirdAware${componentName}`;
  return ContextAwareComponent;
};

export { SendbirdSdkContext, withSendbirdContext as default };
//# sourceMappingURL=withSendbird.js.map
