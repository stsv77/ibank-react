import React from 'react';
import styles from './DepositOptions.module.css';
import PropTypes from 'prop-types';

const DepositOption = (
  {
    deposit,
    onSelect,
  }
) => {
  const handleSelect = (evt) => {
    if (typeof onSelect !== 'function') {
      return;
    }
    onSelect(evt, deposit);
  };

  return (
    <div className={styles.container} onClick={handleSelect}>
      {deposit.title} - {deposit.percent}
    </div>
  );
};

DepositOption.propTypes = {
  deposit: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    percent: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func,
};

export default DepositOption;
