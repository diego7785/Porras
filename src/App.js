import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './pages/Home.js';
import Register from './pages/Register.js';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/register" component={Register} exact/>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
