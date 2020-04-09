import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home';

export const routes = {
  home: '/',

};

function Router(props) {
    return (
      <ConnectedRouter history={props.history}>
        <Switch>
          <Route exact path={routes.home} component={Home}/>
        </Switch>
      </ConnectedRouter>
    );
}

export default Router;
