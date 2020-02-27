import {
  Container,
  CssBaseline,
  }
  from '@material-ui/core';
import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import CreateContainer from "./components/Create/CreateContainer";
import Exhibition from "./components/Exhibition/Exhibition";
import Introduction from "./components/Introduction/Introduction";

import './App.css';

class App extends React.Component {

  public render() {
    return (
      <div className="App">
        <CssBaseline />
        <Container className="app__routercontainer">
          <Router>
            <Switch>
              <Route path="/create">
                <CreateContainer />
              </Route>
              <Route path="/">
                <Introduction />
                <Exhibition />
              </Route>
            </Switch>
          </Router>
        </Container>
        
      </div>
    );
  }
}

export default App;
