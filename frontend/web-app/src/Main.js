import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Homepage, CreateCampaign, JoinCampaign, Login } from '@dnd/pages';
import NavBar from '@components/NavBar'
import { PrivateRoute } from '@components/authentication'

const Main = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/login' component={Login} />

        <PrivateRoute path='/*'>
          <JoinCampaign />
          <CreateCampaign />
        </PrivateRoute>

      </Switch>
    </>
  );
}

export default Main