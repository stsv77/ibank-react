import React from 'react';
import PropTypes from 'prop-types';
import styles from './Select.module.css';

const Select = (
  {
    options,
    name,
    miniTitle = '',
    onChange,
  }
) => {

  const handleChange = (evt) => {
    if (typeof handleChange !== 'function') {
      return;
    }
    onChange(evt);
  };

  return (
    <>
      <p className={styles.miniTitle}>{miniTitle}</p>
      <select name={name} className={styles.select} onChange={handleChange}>
        {options?.map((option) => <option key={option?.id} value={option?.value}>{option?.text}</option>)}
      </select>
    </>
  );
};

Select.propTypes = {
  options: PropTypes.array,
};

export default Select;
