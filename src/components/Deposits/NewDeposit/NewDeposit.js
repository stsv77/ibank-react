import React, {useEffect, useRef, useState} from 'react';
import DepositOption from './DepositOption/DepositOption';
import PropTypes from 'prop-types';
import ContextButton from '../../../ui/ContextButton/ContextButton';
import Input from '../../../ui/Input/Input';
import Select from '../../../ui/Select/Select';
import {postJSON} from '../../../utils/http';
import Loader from '../../../ui/Loader/Loader';
import {rub} from '../../../utils/format';

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
  const [amountPeriods, setAmountPeriods] = useState([
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
  ]);

  const [step, setStep] = useState(1);
  const [deposit, setDeposit] = useState(null);
  const [amount, setAmount] = useState(500000);
  const [period, setPeriod] = useState(3);
  const [disabled, setDisabled] = useState(false);
  const [errorStyle, setErrorStyle] = useState(false);
  const [depositParams, setDepositParams] = useState(false);

  const ref = useRef();

  useEffect(() => {
    if (step === 2) {
      ref.current?.focus();
    }
  }, [step]);

  /* useEffect(() => {
     if (step === 3) {
       loadData(data);
     }
   }, [step]);*/

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      setData(await postJSON('/deposits', depositParams));
    } catch (e) {
      setData(null);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDepositSelect = (evt, deposit) => {
    setDeposit(deposit);
    setStep(2);
    if (typeof onComplete !== 'function') {
      return;
    }
    //onComplete();
  };
  const handleAmountChange = (evt) => {
    const {value} = evt.target;
    const valueToNumber = Number(value);
    if (Number.isNaN(valueToNumber)) {
      setErrorStyle('Неверное значение. Введите число, например: 500000');
      setDisabled('disabled');
    } else if (valueToNumber < 15000) {
      setErrorStyle(`Минимальная сумма вклада 15 000 ₽. Введите сумму не меньше 15 000 ₽`);
      setDisabled('disabled');
    } else if (valueToNumber > 300000000) {
      setErrorStyle(`
      Максимальная сумма вклада 300 000 000 ₽. Введите сумму не больше 300 000 000 ₽.
      Вы можете открыть два и больше вкладов
      `);
      setDisabled('disabled');
    } else {
      setErrorStyle(false);
      setDisabled(false);
    }
    setAmount(value);
  };

  /*
  TODO: del this block
  const handlePeriodChange = (evt) => {
    const {value} = evt.target;
    setPeriod(value);
  };
  */

  const handlePeriodChange = (evt) => {
    const {value} = evt.target;
    setPeriod(value);
  };
  const handleBack = () => {
    setStep((prevState) => prevState - 1);
    setAmount(500000);
    setErrorStyle(false);
    setDisabled(false);
    //debugger;
  };
  const handleSend = (evt) => {
    setStep((prevState) => prevState + 1);
    setDepositParams({
      depositId: deposit.id,
      amount: Number(amount),
      period: Number(period),
    });
    loadData();
  };
  const handleRetry = async () => {
    await loadData();
  };
  const handleBackToDeposit = () => {
    setStep((prevState) => prevState - 1);
    debugger;
  };
  const handleFinish = () => {
    onComplete();
  }

  if (loading) {
    return (
      <div data-testid="loading">
        <p>Данные отправляются. Ожидаем подтверждение операции.</p>
        <Loader/>
      </div>
    );
  }

  if (error) {
    return (
      <div data-testid="error">
        <p>Не удалось загрузить данные</p>
        <ContextButton
          name="retry"
          view={'accentForm'}
          onClick={handleRetry}
        >
          Повторить попытку
        </ContextButton>
        <ContextButton
          name="previous"
          view={'regularForm'}
          onClick={handleBackToDeposit}
        >
          Назад
        </ContextButton>

      </div>
    );
  }

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
    //debugger;
    return (
      <div data-testid="params">
        <h3>{deposit.title}</h3>
        <Input
          name="amount"
          miniTitle="Сумма вклада"
          value={amount}
          ref={ref}
          error={errorStyle}
          onChange={handleAmountChange}
        />
        <Select
          name="period"
          miniTitle="Срок вклада"
          options={amountPeriods}
          onChange={handlePeriodChange}
        />
        <ContextButton
          name="send"
          view={'accentForm'}
          disabled={disabled}
          onClick={handleSend}
        >
          Открыть вклад
        </ContextButton>
        <ContextButton
          name="previous"
          view={'regularForm'}
          onClick={handleBack}
        >
          Назад
        </ContextButton>
      </div>
    )

  }

  if (data) {
    return (
      <div data-testid="ok">
        <h3>{deposit.title}</h3>
        <span>Сумма вклада: {rub(depositParams.amount)}</span>
        <br/>
        <span>Срок вклада, месяцев: {depositParams.period}</span>
        <h3>Успешно</h3>
        <ContextButton view="accent" onClick={handleFinish}>ГОТОВО</ContextButton>
      </div>
    );
  }

  if (step === 3) {
    //debugger;
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
