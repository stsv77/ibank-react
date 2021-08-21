import React, {useState} from 'react';
import ContextButton from '../../ui/ContextButton/ContextButton';
import Modal from '../../ui/Modal/Modal';
import NewDeposit from './NewDeposit/NewDeposit';

const Deposits = () => {
  const [newDepositModalOpen, setNewDepositModalOpen] = useState(false);

  const handleNewDeposit = () => {
    setNewDepositModalOpen(true);
  };
  const handleNewDepositModalClose = () => {
    setNewDepositModalOpen(false);
  };
  const handleNewDepositComplete = () => {
    setNewDepositModalOpen(false);
    // TODO: reload deposits
  };

  return (
    <>
      <p>У вас нет вкладов</p>
      <ContextButton onClick={handleNewDeposit}>Открыть вклад</ContextButton>
      {newDepositModalOpen && <Modal onClose={handleNewDepositModalClose}>
        <NewDeposit onComplete={handleNewDepositComplete}/>
      </Modal>}
    </>
  );
};

Deposits.propTypes = {};

export default Deposits;
