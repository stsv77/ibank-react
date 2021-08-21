import ContextButton from './ContextButton';
import React from 'react';

export default {
  title: 'Components/ContextButton',
  component: ContextButton,
};

const Template = (args) => <ContextButton {...args} />;

export const Regular = Template.bind({});
Regular.args = {
  view: 'regular',
  children: 'Открыть вклад'
};

export const Accent = Template.bind({});
Accent.args = {
  view: 'accent',
  children: 'Открыть вклад'
};

