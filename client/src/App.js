import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import 'semantic-ui-css/semantic.min.css';

import Editor from './components/Editor/Editor'
import Home from './components/Home/Home'
function App() {
  return (
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/home">
            <Home />
          </Route>

          <Route path="/editor/:id/:useDb">
            <Editor />
          </Route>
 
        </Switch>
    </Router>
  );
}
export default App;
