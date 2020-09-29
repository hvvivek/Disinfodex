import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom' 

import Home from './Pages/Home'
import Sync from './Pages/Sync';

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/sync">
            <Sync></Sync>
          </Route>
          <Route path="/">
            <Home></Home>
          </Route>
          
        </Switch>
      </Router>
    );
}

export default App;
