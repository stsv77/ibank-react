import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Panel.module.css';

const Panel = (
  {
    title,
    children,
  }
) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleClick = () => {
    setCollapsed((prevState) => !prevState);
  };

  return (
    <div className={!collapsed ? styles.container : styles.containerCollapsed}>
      <div className={styles.caption} onClick={handleClick}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.toggle}/>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Panel;
