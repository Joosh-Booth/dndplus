import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Homepage from '@dnd/pages/Homepage';
import NavBar from '@components/NavBar'
import { H1 } from '@components/headers'
import { getBackgroundColour} from "@dnd/theme";

const Main = () => {
  return (
    <>
      <NavBar/>
      <Switch>
        <Route exact path='/' component={Homepage}></Route>
      </Switch>
    </>
  );
}

export default Main