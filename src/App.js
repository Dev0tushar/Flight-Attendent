import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pie from './chart/PieChart';
import * as d3 from "d3";
import { useEffect, useState } from 'react';
import LineChart from './chart/LineChart.js'
import ScatterChart from './chart/ScatterChart';
import BarChart from './chart/BarChart';
import axios from 'axios'
import { usePapaParse } from 'react-papaparse';
function App() {
  const [csvdata, setCsvdata] = useState([])
  const { readRemoteFile } = usePapaParse();
  const [ScatterData, setScatterData] = useState([])
  const handleReadRemoteFile = () => {
    readRemoteFile("https://raw.githubusercontent.com/roberthryniewicz/datasets/master/airline-dataset/flights/flights.csv", {
      worker: true,
      complete: (results) => {
        console.log(results, 'All data!');
        const newdata = results?.data;
        newdata.length = 100
        setCsvdata(newdata)
      },
      header: true
    });
  };
  const generateData = (value, length = 5) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value: value === null || value === undefined ? Math.random() * 100 : value
    }));

  const [data, setData] = useState(generateData(0));
  const changeData = () => {
    setData(generateData());
  };
  useEffect(() => {
    handleReadRemoteFile()
  }, [])

  useEffect(
    () => {
      setData(generateData());
    },
    [!data]
  );
  useEffect(() => {
    const sdata = csvdata?.map((item) => [parseInt(item?.Distance), parseInt(item?.AirTime)])
    setScatterData(sdata)
  }, [csvdata])
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='text-center'>Flight Attendent</h1>

        <div className='container'>
          <div className='row g-4'>
            <div className='col-lg-4'>
              <div className='boxSide'>
                <h4>Flights(%) by Air Line</h4>
                <Pie
                  data={data}
                  width={380}
                  height={380}
                  innerRadius={120}
                  outerRadius={190}
                />
              </div>
            </div>
            <div className='col-lg-8'>
              {/* <LineChart chartData={csvData} /> */}
              <div className='boxSide'>
              <h4>Avg. Flight Time by DOW</h4>
                <LineChart data={csvdata}/>
              </div>
            </div>
            <div className='col-lg-12'>
              <div className='boxSide'>
              <h4>Flight Distance by Flight Time</h4>
                <ScatterChart data={ScatterData} />
              </div>
            </div>
            <div className='col-lg-12'>
            <div className='boxSide'>
              <h4>Flight Distance by Flight Time</h4>
                <BarChart width={1200} height={400} data={csvdata}/>
            </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
