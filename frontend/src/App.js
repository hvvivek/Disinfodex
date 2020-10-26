import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom' 
import About from './Pages/About';

import Home from './Pages/Home'
import Sync from './Pages/Sync';
import Network from './Pages/Network';
import Whitepaper from './Pages/Whitepaper';
import HowTo from './Pages/HowTo';

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/sync">
            <Sync></Sync>
          </Route>

          <Route path="/network/:network_id" component={Network}>
          </Route>

          <Route path="/whitepaper">
            <Whitepaper></Whitepaper>
          </Route>

          <Route path="/how-to">
            <HowTo></HowTo>
          </Route>


          <Route path="/">
            <Home></Home>
          </Route>
          
        </Switch>
      </Router>
    );
}

export default App;
