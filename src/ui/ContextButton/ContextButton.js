import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContextButton.module.css';

const ContextButton = (
  {
    view = 'regular',
    disabled = false,
    children,
    onClick,
  }
) => {
  const handleClick = (evt) => {
    if (typeof onClick !== 'function') {
      return;
    }
    onClick(evt);
  };

  return (
    <button
      className={styles[view]}
      onClick={handleClick}
      disabled={disabled? 'disabled' : disabled}
    >
      {children}
    </button>
  );
};

ContextButton.propTypes = {
  /**
   * button type
   */
  view: PropTypes.oneOf(['regular', 'accent' , 'regularForm', 'accentForm']),
  /**
   * button content
   */
  children: PropTypes.node,
  /**
   * click event handler
   */
  onClick: PropTypes.func,
};

export default ContextButton;

