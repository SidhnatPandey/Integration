import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import InstallButton from './InstallButton';
import WelcomePage from './WelcomePage';
 
 
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/welcomePage" component={WelcomePage} />
        <Route path="/" exact>
          <div>
            <h1>GitHub App Installation</h1>
            <InstallButton />
          </div>
        </Route>
      </Switch>
    </Router>
  );
};
 
export default App;