import React from 'react';
import Panel from './Panel';
import {rub} from '../../utils/format';

export default {
  title: 'Components/Panel',
  component: Panel,
};

const Template = (args) => <Panel {...args} />;

export const Regular = Template.bind({});
Regular.args = {
  title: 'Бонусы',
  children: (
    <>
      Cashback: {rub(99.99)}
    </>
  )
};

