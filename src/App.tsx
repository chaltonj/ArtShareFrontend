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
import NewUser from "./components/NewUser/NewUser";

import './App.css';

class App extends React.Component {

  public render() {
    return (
      <div className="App">
        <CssBaseline />
        <Container className="app__routercontainer">
          <Router>
            <Switch>
              {/* <Route path="/:userid">
                <ReturningUser />
              </Route> */}
              <Route path="/">
                <NewUser />
              </Route>
            </Switch>
          </Router>
        </Container>
        
      </div>
    );
  }
}

export default App;
