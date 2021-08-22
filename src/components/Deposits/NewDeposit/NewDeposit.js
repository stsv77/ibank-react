import React, {useEffect, useRef, useState} from 'react';
import DepositOption from './DepositOption/DepositOption';
import PropTypes from 'prop-types';
import ContextButton from '../../../ui/ContextButton/ContextButton';
import Input from '../../../ui/Input/Input';
import Select from '../../../ui/Select/Select';

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
  const options = [
    {
      value: 3,
      text: '3 месяца',
    },
    {
      value: 6,
      text: '6 месяцев',
    },
    {
      value: 9,
      text: '9 месяцев',
    },
    {
      value: 12,
      text: '12 месяцев',
    },
    {
      value: 18,
      text: '18 месяцев',
    },
  ];

  const [step, setStep] = useState(1);
  const [deposit, setDeposit] = useState(null);
  const [valueAmount, setValueAmount] = useState(500000);
  const [valuePeriod, setValuePeriod] = useState(6);
  const [error, setError] = useState(false);
  const [styleButton, setStyleButton] = useState('accent');
  const ref = useRef();

  useEffect(() => {
    if (step === 2) {
      ref.current?.focus();
    }
  }, [step]);

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
    setValueAmount(500000);
    setError(false);
    setStyleButton('accent');
  };
  const handleAmountChange = (evt) => {
    const {value} = evt.target;
    const valueToNumber = Number(value);
    //debugger;
    if (Number.isNaN(valueToNumber)) {
      setError('Неверное значение. Введите число, например: 500000');
      setStyleButton('disabled');
    } else if (valueToNumber < 15000) {
      setError(`Минимальная сумма вклада 15 000 ₽. Введите сумму не меньше 15 000 ₽`);
      setStyleButton('disabled');
    } else if (valueToNumber > 300000000) {
      setError(`
      Максимальная сумма вклада 300 000 000 ₽. Введите сумму не больше 300 000 000 ₽.
      Вы можете открыть два и больше вкладов
      `);
      setStyleButton('disabled');
    } else {
      setError(false);
      setStyleButton('accent');
    }
    setValueAmount(value);
  };
  const handlePeriodChange = (evt) => {
    const {value} = evt.target;
    setValuePeriod(value);
  };
  const handleChange = (evt) => {
    const {value} = evt.target;
    setValuePeriod(value);
  };
  const handleSend = (evt) => {

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
        <Input
          name="amount"
          miniTitle="Сумма вклада"
          value={valueAmount}
          ref={ref}
          error={error}
          onChange={handleAmountChange}/>
        {/*<Input miniTitle="Срок вклада" value={valuePeriod} onChange={handlePeriodChange}/>*/}
        <div>
          <Select name="period" miniTitle="Срок вклада" options={options} onChange={handleChange}/>
        </div>
        <ContextButton view={styleButton} onClick={handleSend}>Открыть вклад</ContextButton>
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
