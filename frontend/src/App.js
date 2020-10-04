import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom' 
import About from './Pages/About';

import Home from './Pages/Home'
import Sync from './Pages/Sync';
import Whitepaper from './Pages/Whitepaper';

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/sync">
            <Sync></Sync>
          </Route>

          <Route path="/about">
            <About></About>
          </Route>

          <Route path="/whitepaper">
            <Whitepaper></Whitepaper>
          </Route>


          <Route path="/">
            <Home></Home>
          </Route>
          
        </Switch>
      </Router>
    );
}

export default App;
