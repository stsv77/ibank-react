import React, {useState} from 'react';
import ContextButton from '../ContextButton/ContextButton';

const Counter = (props) => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prevState) => prevState + 1);
    setCount((prevState) => prevState + 1);
  };

  return (
    <ContextButton onClick={handleClick}>Кликов: {count}</ContextButton>
  );
};

Counter.propTypes = {};

export default Counter;
