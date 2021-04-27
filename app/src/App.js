import React from 'react';
import {BrowserRouter as Router, Switch, Route, useParams} from 'react-router-dom' 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Home from './pages/Home'
import About from './pages/About'

import HowItWorks from './pages/HowItWorks'

import {getAllNetworks} from "./helpers/networks.js"
import {getAllDisclosures} from "./helpers/disclosures.js"
import {getAllScreenshots} from "./helpers/assets.js"

import DataContext from './contexts/DataContext.js'
import Network from './pages/Network';

function NetworkPage()
{
  let {id} = useParams();
  return <Network {...{id}}></Network>
}
class App extends React.Component{
  
  constructor()
  {
    super()
    this.state = {
      networks: [],
      screenshots: [],
      disclosures: []
    }
  }

  async componentDidMount()
  {
    let networks = await getAllNetworks()
    let screenshots = await getAllScreenshots()
    let disclosures = await getAllDisclosures()

    this.setState({
      networks: [...this.state.networks, ...networks],
      screenshots: [...this.state.screenshots, ...screenshots],
      disclosures: [...this.state.disclosures, ...disclosures]
    })
  }

  render()
  {
    let data = {
      "networks": this.state.networks,
      "screenshots": this.state.screenshots,
      "disclosures": this.state.disclosures, 
    }

    

    return (
      <DataContext.Provider value={data}>

        <Router>
          <Switch>
            <Route path="/about">
              <About></About>
            </Route>

            <Route path="/how-to">
              <HowItWorks></HowItWorks>
            </Route>

            <Route path="/:id" children={<NetworkPage></NetworkPage>}>
            </Route>

            <Route path="/">
                <Home data={data}></Home>
            </Route>

            
          </Switch>
        </Router>
        </DataContext.Provider>
      );
  }
}

export default App;
