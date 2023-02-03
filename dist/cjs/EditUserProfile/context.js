'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const EditUserProfileProviderContext = /*#__PURE__*/React__default["default"].createContext(undefined);

const EditUserProfileProvider = props => {
  const {
    children,
    onEditProfile,
    onCancel,
    onThemeChange
  } = props;
  const value = React.useMemo(() => {
    return {
      onEditProfile,
      onCancel,
      onThemeChange
    };
  }, []);
  return /*#__PURE__*/React__default["default"].createElement(EditUserProfileProviderContext.Provider, {
    value: value
  }, children);
};

const useEditUserProfileContext = () => React__default["default"].useContext(EditUserProfileProviderContext);

exports.EditUserProfileProvider = EditUserProfileProvider;
exports.useEditUserProfileContext = useEditUserProfileContext;
//# sourceMappingURL=context.js.map
