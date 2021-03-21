import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom' 
import Home from './pages/Home'


import {getAllNetworks} from "./helpers/networks.js"
import {getAllDisclosures} from "./helpers/disclosures.js"
import {getAllScreenshots} from "./helpers/assets.js"

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
    console.log("Downloading Data")
    // getAllNetworks()
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

    console.log(data)

    return (
        <Router>
          <Switch>
            <Route path="/">
              <Home data={data}></Home>
            </Route>
          </Switch>
        </Router>
      );
  }
}

export default App;
