import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import Top from './components/Top';
import population from './components/population';
import axios from 'axios'

function App() {
  return (
    <Router>
        <ul>
          <li><Link to="/">トップ</Link></li>
          <li><Link to="/population">人口</Link></li>
        </ul>
        <Route path="/" exact component={Top} />
        <Route path="/population/" exact component={population} />
    </Router>
  );
}

export default App;
