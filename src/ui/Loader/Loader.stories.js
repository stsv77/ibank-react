import React from 'react';
import Loader from './Loader';

export default {
  title: 'Components/Loader',
  component: Loader,
};

const Template = (args) => <Loader {...args} />;

export const Regular = Template.bind({});
Regular.args = {};

