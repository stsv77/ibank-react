import React from 'react';
import PropTypes from 'prop-types';

const Card = ({item}) => {
  return (
    <div>
      {item?.type}
      {item?.title}
      {item?.number}
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
};

export default Card;
