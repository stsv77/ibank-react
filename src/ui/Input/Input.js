import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.css';

const Input = React.forwardRef((
  {
    name,
    type = 'text',
    value = '',
    error = '',
    onChange,
  }, ref
) => {
  const handleChange = (evt) => {
    if (typeof onChange !== 'function') {
      return;
    }
    onChange(evt);
  };

  return (
    <>
      <input
        name={name}
        type={type}
        value={value}
        ref={ref}
        className={error ? styles.error : styles.regular}
        onChange={handleChange}
      />
      <span className={styles.message}>{error}</span>
    </>
  );
});

Input.propTypes = {
  /**
   * input name
   */
  name: PropTypes.string,
  /**
   * input type
   */
  view: PropTypes.oneOf(['text', 'password']),
  /**
   * input value
   */
  value: PropTypes.string,
  /**
   * error text
   */
  error: PropTypes.string,
  /**
   * change event handler
   */
  onChange: PropTypes.func,
};

export default Input;
