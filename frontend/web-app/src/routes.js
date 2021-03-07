import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { CookiesProvider } from 'react-cookie';

import App from './App';
import Homepage from '/components/Homepage';


export default (
  <CookiesProvider>
    <Route path="/" component={App}>
      <IndexRoute component={Homepage} />
    </Route>
  </CookiesProvider>
)