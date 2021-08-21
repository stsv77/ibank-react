import React from 'react';
import PropTypes from 'prop-types';
import styles from './Form.module.css';

const Form = React.forwardRef((
  {
    children,
    disabled = false,
    enctype = 'application/x-www-form-urlencoded',
    onSubmit,
    onReset,
  }, ref
) => {
  const handleSubmit = (evt) => {
    if (typeof onSubmit !== 'function') {
      return;
    }
    onSubmit(evt);
  };
  const handleReset = (evt) => {
    if (typeof onReset !== 'function') {
      return;
    }
    onReset(evt);
  };

  return (
    <form ref={ref} onSubmit={handleSubmit} onReset={handleReset}>
      <fieldset className={styles.fieldset} disabled={disabled}>
        {children}
      </fieldset>
    </form>
  );
});

Form.propTypes = {
  /**
   * form content
   */
  children: PropTypes.node,
  /**
   * form controls disabled
   */
  disabled: PropTypes.bool,
  /**
   * enctype
   */
  enctype: PropTypes.oneOf(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']),
  /**
   * submit event handler
   */
  onSubmit: PropTypes.func,
  /**
   * reset event handler
   */
  onReset: PropTypes.func,
};

export default Form;
