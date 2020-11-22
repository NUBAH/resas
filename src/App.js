import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import Top from './components/Top';
import population from './components/population';
import axios from 'axios';

const App = props => {
  const headers= {
    'x-api-key': process.env.REACT_APP_X_API_KEY
  };
  const prefectureUrl= 'https://opendata.resas-portal.go.jp/api/v1/prefectures';
  const populationUrl= 'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=';

  const [prefList, setPrefList] = useState([]);
  const [year, setYear] = useState([]);

  useEffect(() => {
    axios.get(prefectureUrl, {headers: headers})
      .then(res => {
        setPrefList(res.data.result);
      })

  }, []);
  

  const handleClick = prefCode =>  {
    axios.get(populationUrl+prefCode, {headers: headers})
      .then(response => {
        console.log(response);
        setYear(response.data.result.data);
      })
  }

    return (
      <div>
        <Router>
            <ul>
              <li><Link to="/">トップ</Link></li>
              <li><Link to="/population">人口</Link></li>
            </ul>
            <Route path="/" exact component={Top} />
            <Route path="/population/" exact component={population} />
          <h1>都道府県人口構成</h1>
            <div>
              {prefList.map((listItem, index) => (
                <label key={index}>
                  <input 
                    type="checkbox" 
                    onChange={() => handleClick(listItem.prefCode)}
                    />
                  {listItem.prefName}
                </label>
                )
              )
            }
            </div>
            <div>
              {year.map((yearItem, index) => (
                <label key={index}>
                  <p>{yearItem.label}</p>
                </label>
              ))}
            </div>
        </Router>
      </div>
    );
}

export default App;