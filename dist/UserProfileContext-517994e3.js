import React__default from 'react';
import PropTypes from 'prop-types';

/**
 * user profile goes deep inside the component tree
 * use this context as a short circuit to send in values
 */

const UserProfileContext = /*#__PURE__*/React__default.createContext({
  disableUserProfile: true,
  isOpenChannel: false,
  renderUserProfile: null,
  onUserProfileMessage: null
});

const UserProfileProvider = props => {
  const {
    children
  } = props;
  return /*#__PURE__*/React__default.createElement(UserProfileContext.Provider, {
    value: props
  }, children);
};

UserProfileProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element), PropTypes.any]).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  isOpenChannel: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  disableUserProfile: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  renderUserProfile: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  onUserProfileMessage: PropTypes.func
};
UserProfileProvider.defaultProps = {
  isOpenChannel: false,
  disableUserProfile: false,
  renderUserProfile: null,
  onUserProfileMessage: null
};

export { UserProfileProvider as U, UserProfileContext as a };
//# sourceMappingURL=UserProfileContext-517994e3.js.map
