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
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get(prefectureUrl, {headers: headers})
      .then(res => {
        setPrefList(res.data.result);
      })

  }, []);
  
  useEffect(() => {
    let rowCount = 0;
    if (year.length > 0) rowCount = year[0].data.length;
    let newRows = [];
    for(var x = rowCount - 1; x >= 0; x--) {
      newRows.push(
        <tr>
          <td>{year[0].data[x].year}</td>
          <td>{year[0].data[x].value} - {x > 0 ? (year[0].data[x].value / year[0].data[x-1].value * 10).toFixed(1) : ""}</td>
          <td>{year[1].data[x].value} - {year[1].data[x].rate}</td>
          <td>{year[2].data[x].value} - {year[2].data[x].rate}</td>
          <td>{year[3].data[x].value} - {year[3].data[x].rate}</td>
        </tr>
      );
    }
    setRows(newRows);
  }, [year]);

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
              <table>
                <thead>
                <tr>
                  <th>年</th>
                {year.map((yearItem) => (
                  <th>{yearItem.label}</th>
                ))}
                </tr>
                </thead>
                <tbody>
                  {rows}
                </tbody>
              </table>
            </div>
        </Router>
      </div>
    );
}

export default App;