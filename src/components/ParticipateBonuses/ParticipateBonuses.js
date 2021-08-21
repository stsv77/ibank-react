import React, {useState} from 'react';
import ContextButton from '../../ui/ContextButton/ContextButton';
import PropTypes from 'prop-types';
import {postJSON} from '../../utils/http';
import Loader from '../../ui/Loader/Loader';

const ParticipateBonuses = (
  {
    onComplete,
  }
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      setData(await postJSON('/cashback'));
    } catch (e) {
      setData(null);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async () => {
    await loadData();
  };

  const handleRetry = async () => {
    await loadData();
  };

  const handleComplite = () => {
    onComplete();
  }

  if (loading) {
    return (
      <div data-testid="loading">
        <Loader/>
      </div>
    );
  }

  if (error) {
    return (
      <div data-testid="error">
        <p>Произошла ошибка</p>
        <ContextButton onClick={handleRetry}>Повторить попытку</ContextButton>
      </div>
    );
  }

  if (data) {
    return (
      <div data-testid="ok">
        <p>Программа успешно подключена</p>
        <ContextButton onClick={handleComplite}>Ok</ContextButton>
      </div>
    );
  }

  return (
    <div data-testid="participate">
      <p>Будет подключена программа кешбек</p>
      <ContextButton onClick={handleClick}>Подключить</ContextButton>
    </div>
  );
};

ParticipateBonuses.propTypes = {
  onComplete: PropTypes.func,
};

export default ParticipateBonuses;
