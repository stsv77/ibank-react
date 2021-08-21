import React, {useEffect, useState} from 'react';
import Loader from '../../ui/Loader/Loader';
import {rubMod, rub} from '../../utils/format';
import ContextButton from '../../ui/ContextButton/ContextButton';
import {getJSON} from '../../utils/http';
import styles from './Bonuses.module.css';
import Modal from '../../ui/Modal/Modal';
import ParticipateBonuses from '../ParticipateBonuses/ParticipateBonuses';

const Bonuses = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [participateModalOpen, setParticipateModalOpen] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    setParticipateModalOpen(false);
    try {
      setData(await getJSON('/cashback'));
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
  const handleParticipate = () => {
    setParticipateModalOpen(true);
  };
  const handleParticipateModalClose = () => {
    setParticipateModalOpen(false);
  };
  const handleParticipateBonusesComplite = () => {
      setParticipateModalOpen(false);
      loadData();
  }

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

  if (data.participating === false) {
    return (
      <>
        <p>У вас не подключен кешбек</p>
        <ContextButton onClick={handleParticipate}>Подключить</ContextButton>
        {participateModalOpen && <Modal onClose={handleParticipateModalClose}>
          <ParticipateBonuses onComplete={handleParticipateBonusesComplite}/>
        </Modal>
        }
      </>
    );
  }

  return (
    <>
      <p className={styles.cashback}>Cashback: {rubMod(data?.balance)}</p>
    </>
  );
};

Bonuses.propTypes = {};

export default Bonuses;
