import React, {useState} from 'react';
import DepositOption from './DepositOption/DepositOption';
import PropTypes from 'prop-types';
import ContextButton from '../../../ui/ContextButton/ContextButton';

const NewDeposit = (
  {
    onComplete,
  }
) => {
  const [deposits, setDeposits] = useState([
    {
      id: 1,
      title: '"150 лет надежности"',
      percent: 'До 5,25%',
    },
    {
      id: 2,
      title: '"Пополняемый"',
      percent: 'До 2,70%',
    },
    {
      id: 3,
      title: '"Управляемый"',
      percent: 'До 2,40%',
    },
  ]);
  const [step, setStep] = useState(1);
  const [deposit, setDeposit] = useState(null);

  const handleDepositSelect = (evt, deposit) => {
    setDeposit(deposit);
    setStep(2);
    // TODO: just simplify
    if (typeof onComplete !== 'function') {
      return;
    }
    //onComplete();
  };
  const hadleBack = () => {
    setStep((prevState) => prevState - 1);
  };

  if (step === 1) {
    return (
      <div data-testid="selection">
        <h3>Выберите вклад</h3>
        {deposits.map((deposit) => <DepositOption
          key={deposit.id}
          deposit={deposit}
          onSelect={handleDepositSelect}
        >
          {deposit.title} - {deposit.percent}
        </DepositOption>)}
      </div>
    )
  }

  if (step === 2) {
    return (
      <div data-testid="params">
        <h3>{deposit.title}</h3>
        <ContextButton view="accent">Открыть вклад</ContextButton>
        <ContextButton onClick={hadleBack}>Назад</ContextButton>
      </div>
    )

  }

  if (step === 3) {

  }

  return (
    <>

    </>
  );
};

NewDeposit.propTypes = {
  onComplete: PropTypes.func,
};

export default NewDeposit;
