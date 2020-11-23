import React, {useState, useEffect} from 'react';
import './App.css'
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
        <tr className="table-row">
          <td className="year-column">{year[0].data[x].year}</td>
          <td>{year[0].data[x].value} - ({x > 0 ? (year[0].data[x].value / year[0].data[x-1].value * 10).toFixed(1) : ""})</td>
          <td>{year[1].data[x].value} - ({year[1].data[x].rate})</td>
          <td>{year[2].data[x].value} - ({year[2].data[x].rate})</td>
          <td>{year[3].data[x].value} - ({year[3].data[x].rate})</td>
        </tr>
      );
    }
    setRows(newRows);
  }, [year]);

  const handleClick = prefCode =>  {
    axios.get(populationUrl+prefCode, {headers: headers})
      .then(response => {
        setYear(response.data.result.data);
      })
  }

    return (
      <div className="App">
        <div className="App-header">
          <h1>都道府県人口構成</h1>
        </div>
        <div className="App-checkbox">
          {prefList.map((listItem, index) => (
            <label className="checkbox-label" key={index}>
              <input 
                className="checkbox-button"
                type="checkbox" 
                onChange={() => handleClick(listItem.prefCode)}
                />
              {listItem.prefName}
            </label>
            )
          )
        }
        </div>
        <div className="App-table">
          <h3>人口構成表</h3>
          <table className="g-table">
            <thead>
              <tr className="table-row">
                <th>年</th>
                {year.map((yearItem) => (
                  <th>{yearItem.label} - (割合)</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default App;