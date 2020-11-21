import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import Top from './components/Top';
import population from './components/population';
import axios from 'axios';

export default class App extends React.Component{
  constructor(props) {
    super();
    this.state = {
      headers: {
        'x-api-key': process.env.REACT_APP_X_API_KEY
      },
      prefUrl: 'https://opendata.resas-portal.go.jp/api/v1/prefectures'
    }
  }
  componentDidMount() {
    axios.get(this.state.prefUrl, {headers: this.state.headers})
      .then(res => {
        const prefList = res.data.result;
        this.setState({prefList})
      })
  }

  render() {
    return (
      <div>
        <Router>
            <ul>
              <li><Link to="/">トップ</Link></li>
              <li><Link to="/population">人口</Link></li>
            </ul>
            <Route path="/" exact component={Top} />
            <Route path="/population/" exact component={population} />
        </Router>
          <h1>都道府県人口構成</h1>
            <div>
            { this.state.prefList
               ? this.state.prefList.map(listItem => {
                return (
                  <label>
                    <input type="checkbox" key={listItem.prefCode} value={listItem.prefName}/>
                    {listItem.prefName}
                  </label>
                )
               })
               : "Loading...."
            }
            </div>
      </div>
    );
  }
}

