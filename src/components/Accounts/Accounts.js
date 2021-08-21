import React, {useEffect, useState} from 'react';
import Loader from '../../ui/Loader/Loader';
import ContextButton from '../../ui/ContextButton/ContextButton';
import {getJSON} from '../../utils/http';
import Account from './Account/Account';

const Accounts = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      setData(await getJSON('/accounts'));
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
    return <Loader/>;
  }

  if (error) {
    return (
      <>
        <p>Произошла ошибка</p>
        <ContextButton onClick={handleRetry}>Повторить попытку</ContextButton>
      </>
    );
  }

  return (
    <>
      {data?.map((account) => <Account key={account?.id} item={account}/>)}
    </>
  );
};

Accounts.propTypes = {};

export default Accounts;
