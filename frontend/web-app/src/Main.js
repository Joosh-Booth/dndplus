import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Homepage from './components/Homepage';

const Main = () => {
  return (
    <Switch>
      <Route exact path='/' component={Homepage}></Route>
    </Switch>
  );
}

export default Main