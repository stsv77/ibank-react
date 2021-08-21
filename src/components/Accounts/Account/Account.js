import React from 'react';
import Card from '../Card/Card';
import PropTypes from 'prop-types';

const Account = ({item}) => {
  return (
    <div>
      {item?.title}
      {item?.number}
      {item?.balance}
      {item?.cards?.map((card) => <Card key={card.id} item={card}/>)}
    </div>
  );
};

Account.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    cards: PropTypes.array,
  }),
};

export default Account;
