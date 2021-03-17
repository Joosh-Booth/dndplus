import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Homepage, CreateCampaign } from '@dnd/pages';
import NavBar from '@components/NavBar'
import { AuthWrapper } from '@components/authentication'

const Main = () => {
  return (
    <>
      <NavBar/>
      <Switch>
        <Route exact path='/' component={Homepage}></Route>
        <AuthWrapper>
          <Route exact path='/create_game' component={CreateCampaign}></Route>
        </AuthWrapper>
        
      </Switch>
    </>
  );
}

export default Main