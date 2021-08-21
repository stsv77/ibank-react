import React, {useState} from 'react';
import Form from './Form';
import ContextButton from '../ContextButton/ContextButton';
import Input from '../Input/Input';

export default {
  title: 'Components/Form',
  component: Form,
};

const Template = (args) => {
  const [amount, setAmount] = useState(args.amount);
  const [period, setPeriod] = useState(args.period);

  const handleAmountChange = (evt) => {
    const {value} = evt.target;
    setAmount(value);
  }

  const handlePeriodChange = (evt) => {
    const {value} = evt.target;
    setPeriod(value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // TODO: just work with amount & period
  }

  return (
    <Form {...args} onSubmit={handleSubmit}>
      <Input value={amount} onChange={handleAmountChange}/>
      <Input value={period} onChange={handlePeriodChange}/>
      <ContextButton>Ok</ContextButton>
    </Form>
  );
};

export const Regular = Template.bind({});
Regular.args = {
  amount: '10000',
  period: '3',
};

export const Disabled = Template.bind({});
Disabled.args = {
  amount: '10000',
  period: '3',
  disabled: true,
};
