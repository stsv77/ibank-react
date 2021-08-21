import React from 'react';
import Counter from './Counter';

export default {
  title: 'Components/Counter',
  component: Counter,
};

const Template = (args) => <Counter {...args} />;

export const Regular = Template.bind({});
Regular.args = {};

