import React, {useEffect, useRef, useState} from 'react';
import DepositOption from './DepositOption/DepositOption';
import PropTypes from 'prop-types';
import ContextButton from '../../../ui/ContextButton/ContextButton';
import Input from '../../../ui/Input/Input';
import {postJSON} from '../../../utils/http';
import Form from '../../../ui/Form/Form';
import {rub} from '../../../utils/format';
import Loader from '../../../ui/Loader/Loader';

const NewDeposit = (
  {
    onComplete,
  }
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const ref = useRef();

  const [deposits, setDeposits] = useState([
    {
      id: 1,
      title: '"150 лет надежности"',
      percent: 'До 5,25%',
      minAmount: 15000,
      maxAmount: 300000000,
      minPeriod: 3,
      maxPeriod: 36,
    },
    {
      id: 2,
      title: '"Пополняемый"',
      percent: 'До 2,70%',
      minAmount: 15000,
      maxAmount: 50000000,
      minPeriod: 3,
      maxPeriod: 18,
    },
    {
      id: 3,
      title: '"Управляемый"',
      percent: 'До 2,40%',
      minAmount: 50000,
      maxAmount: 50000000,
      minPeriod: 12,
      maxPeriod: 18,
    },
  ]);
  const [deposit, setDeposit] = useState(null);
  const [amount, setAmount] = useState(500000);

  const [period, setPeriod] = useState(3);
  const [disableButtonAmount, setDisableButtonAmount] = useState(false);
  const [disableButtonPeriod, setDisableButtonPeriod] = useState(false);
  const [errorAmount, setErrorAmount] = useState(null);
  const [errorPeriod, setErrorPeriod] = useState(null);

  const sendData = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await postJSON('/deposits', data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDepositSelect = (evt, deposit) => {
    setDeposit(deposit);
    setErrorAmount(null);
    setErrorPeriod(null);
    setDisableButtonAmount(false);
    setDisableButtonPeriod(false);
    setError(false);
    setAmount(deposit.minAmount);
    setPeriod(deposit.minPeriod);
    setStep((prevState) => prevState + 1);
  };

  const handleAmountChange = (evt) => {
    const {value} = evt.target;

    if (value < deposit.minAmount) {
      setErrorAmount(`
      Минимальная сумма вклада ${rub(deposit.minAmount)}.
      Введите сумму ${rub(deposit.minAmount)} или больше
      `);
      setDisableButtonAmount(true);
    } else if (value > deposit.maxAmount) {
      setErrorAmount(`
      Максимальная сумма вклада ${rub(deposit.maxAmount)}.
      Введите сумму ${rub(deposit.maxAmount)} или меньше.
      Вы можете открыть два и больше вкладов
      `);
      setDisableButtonAmount(true);
    } else {
      setErrorAmount(null);
      setDisableButtonAmount(false);
    }

    setAmount(value);
  };

  const handlePeriodChange = (evt) => {
    const {value} = evt.target;

    if (value < deposit.minPeriod) {
      setErrorPeriod(`
      Минимальный срок вклада месяцев: ${deposit.minPeriod}.
      Введите значение ${deposit.minPeriod} или больше.
      `);
      setDisableButtonPeriod(true);
    } else if (value > deposit.maxPeriod) {
      setErrorPeriod(`
      Максимальный срок вклада месяцев: ${deposit.maxPeriod}.
      Введите значение ${deposit.maxPeriod} или меньше.
      `);
      setDisableButtonPeriod(true);
    } else {
      setErrorPeriod(null);
      setDisableButtonPeriod(false);
    }

    setPeriod(value);
  };

  const handleBack = () => {
    setStep((prevState) => prevState - 1);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await sendData(
      {
        depositId: deposit.id,
        amount: Number(amount),
        period: Number(period),
      });
    setStep((prevState) => prevState + 1);
  };

  const handleRetry = async () => {
    await sendData(
      {
        depositId: deposit.id,
        amount: Number(amount),
        period: Number(period),
      }
    );
  };

  const handleFinish = () => {
    if (typeof onComplete !== 'function') {
      return;
    }
    onComplete();
  }

  useEffect(() => {
    if (step === 2) {
      ref.current?.focus();
    }
  }, [step]);

  if (loading) {
    return (
      <div data-testid="loading">
        <p>Данные отправляются. Ожидаем подтверждение операции.</p>
        <Loader/>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div data-testid="selection">
        <h3>Выберите вклад</h3>
        {deposits?.map((deposit) => <DepositOption
          key={deposit?.id}
          deposit={deposit}
          onSelect={handleDepositSelect}
        >
          {deposit.title} - {deposit.percent}
        </DepositOption>)}
      </div>
    );
  }

  if (step === 2) {
    return (
      <div data-testid="params">
        <h3>{deposit.title}</h3>
        <Form name="depositInput" onSubmit={handleSubmit}>
          <Input
            name="amount"
            type="number"
            miniTitle="Сумма вклада"
            value={amount}
            ref={ref}
            error={errorAmount}
            onChange={handleAmountChange}
          />
          <Input
            name="period"
            type="number"
            miniTitle="Срок вклада, месяцев"
            value={period}
            error={errorPeriod}
            onChange={handlePeriodChange}
          />
          <ContextButton
            name="send"
            view={'accentForm'}
            disabled={disableButtonAmount ? disableButtonAmount : disableButtonPeriod}
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
        </Form>
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
          onClick={handleBack}
        >
          Назад
        </ContextButton>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div data-testid="ok">
        <h3>{deposit.title}</h3>
        <div className="successful"> </div>
        <ContextButton view="accentForm" onClick={handleFinish}>ГОТОВО</ContextButton>
      </div>
    );
  }

};

NewDeposit.propTypes = {
  onComplete: PropTypes.func,
};

export default NewDeposit;
