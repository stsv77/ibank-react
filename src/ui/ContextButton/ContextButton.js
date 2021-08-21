import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContextButton.module.css';

const ContextButton = (
  {
    view = 'regular',
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
    >
      {children}
    </button>
  );
};

ContextButton.propTypes = {
  /**
   * button type
   */
  view: PropTypes.oneOf(['regular', 'accent']),
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

