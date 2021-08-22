import React from 'react';
import PropTypes from 'prop-types';
import Select from './Select';

export default {
  title: 'Components/Select',
  component: Select,
};

const Template = (args) => {

  return <Select {...args}/>;
};

export const Regular = Template.bind({});
Regular.args = {
  options: [
    {
      value: 1,
      text: '1 месяц',
    },
    {
      value: 2,
      text: '2 месяца',
    },
  ],
};

