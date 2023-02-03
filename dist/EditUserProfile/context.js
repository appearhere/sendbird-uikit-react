import React__default, { useMemo } from 'react';

const EditUserProfileProviderContext = /*#__PURE__*/React__default.createContext(undefined);

const EditUserProfileProvider = props => {
  const {
    children,
    onEditProfile,
    onCancel,
    onThemeChange
  } = props;
  const value = useMemo(() => {
    return {
      onEditProfile,
      onCancel,
      onThemeChange
    };
  }, []);
  return /*#__PURE__*/React__default.createElement(EditUserProfileProviderContext.Provider, {
    value: value
  }, children);
};

const useEditUserProfileContext = () => React__default.useContext(EditUserProfileProviderContext);

export { EditUserProfileProvider, useEditUserProfileContext };
//# sourceMappingURL=context.js.map
