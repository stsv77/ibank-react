import React, {useEffect, useState} from 'react';
import {getJSON} from '../../utils/http';
import Loader from '../../ui/Loader/Loader';
import ContextButton from '../../ui/ContextButton/ContextButton';
import {rubMod} from '../../utils/format';

const History = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      setData(await getJSON('/history'));
    } catch (e) {
      setData(null);
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  const handleRetry = async () => {
    await loadData();
  };
  useEffect(() => {
    loadData();
  }, []);

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
        <p>Не удалось загрузить данные</p>
        <ContextButton onClick={handleRetry}>Повторить попытку</ContextButton>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div data-testid="no-operations">
        За последнее время у Вас не было операций
      </div>
    );
  }

  return (
    <>
      {data?.map((operation) => <div data-testid="operation" key={operation?.id}>
          <span data-testid="title">{operation.title}</span>
          <span data-testid="amount">{rubMod(operation.amount)}</span>
        </div>
      )}
    </>
  )
};

History.propTypes = {};

export default History;
