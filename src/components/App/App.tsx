import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import { Link } from 'react-router-dom';

import styles from '../App/App.scss';
import Users from '@src/components/UserData/Users/Users';
import Graphics from '@src/components/UserResult/Graphics/Graphics';
import DataInputStore from '@src/modules/DataInputStore/DataInputStore';
import { Provider } from 'mobx-react';

class App extends React.Component {
  tmp: DataInputStore = new DataInputStore();

  public render() {
    return (
      <div className={styles.baseContainr}>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <ul>
              <Link to="/page1/">ввод данных</Link>
            </ul>
          </div>
          <div className={styles.container}>
            <ul>
              <Link to="/page2/">перейдем к результату</Link>
            </ul>
          </div>
        </div>
        <Provider dataInputStore={this.tmp}>
          <Switch>
            <Route path="/page1/" component={Users} />
            <Route path="/page2/" component={Graphics} />
            <Route path="/">
              <Redirect to="/page1/" />
            </Route>
          </Switch>
        </Provider>
      </div>
    );
  }
}

export default App;
