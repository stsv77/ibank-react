import Input from './Input';
import React, {useEffect, useRef, useState} from 'react';

export default {
  title: 'Components/Input',
  component: Input,
};

const Template = (args) => {
  const [value, setValue] = useState(args.value);

  const handleChange = (evt) => {
    const {value} = evt.target;
    setValue(value);
  }

  return <Input {...args} value={value} onChange={handleChange}/>;
};

export const Regular = Template.bind({});
Regular.args = {
  value: '10000',
};

export const Error = Template.bind({});
Error.args = {
  value: '10000',
  error: 'Сумма должна быть больше 100 000'
};

export const Focused = (args) => {
  const [value, setValue] = useState(args.value);
  const ref = useRef();

  const handleChange = (evt) => {
    const {value} = evt.target;
    setValue(value);
  }

  useEffect(() => {
    ref.current?.focus();
  });

  return <Input {...args} value={value} ref={ref} onChange={handleChange}/>;
};
Focused.args = {
  value: '10000',
};
