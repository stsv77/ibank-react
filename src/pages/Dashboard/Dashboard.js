import React from 'react';
import styles from './Dashboard.module.css';
import Bonuses from '../../components/Bonuses/Bonuses';
import Panel from '../../ui/Panel/Panel';
import Accounts from '../../components/Accounts/Accounts';
import Deposits from '../../components/Deposits/Deposits';
import History from '../../components/History/History';

const Dashboard = () => {
  return (
    <>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <Panel title="Бонусы">
            <div data-testid="bonuses">
              <Bonuses/>
            </div>
          </Panel>
          <Panel title="Счета и карты">
            <Accounts/>
          </Panel>
          <Panel title="Вклады">
            <div data-testid="deposits">
              <Deposits/>
            </div>
          </Panel>
        </aside>
        <main className={styles.main}/>
        <Panel title="История операций">
          <div data-testid="history">
            <History/>
          </div>
        </Panel>
      </div>
    </>
  );
};

export default Dashboard;

