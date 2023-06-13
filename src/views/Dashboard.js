import React, { useEffect, useRef, useState, Component } from "react";
import ReactEcharts from "echarts-for-react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useLocation, Route, Switch } from "react-router-dom";
import axios from 'axios';
import "./HomePage.css"; 
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import routes from "routes.js";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

const ResponsiveGridLayout = WidthProvider(Responsive);

const PieChart = () => {
  const [yAxisParam, setYAxisParam] = useState('');
  const [columnOptions, setColumnOptions] = useState([]);
  const [rosetype, setRoseType] = useState('');
  const [title, setTitle] = useState('');
  const [crimeData, setCrimeData] = useState([]);


  useEffect(() => {
    // Fetch data from the backend
    axios.get("https://firebasestorage.googleapis.com/v0/b/ey-apache-echarts.appspot.com/o/twofive_crime.json?alt=media&token=811a0d47-f26a-4caf-bddd-71b016cf3dad&_gl=1*9a7xbd*_ga*MTA2NzMxNjc4MS4xNjg2Mjk4MTI0*_ga_CW55HF8NVT*MTY4NjU3MzgzNC43LjEuMTY4NjU3NTM5Ni4wLjAuMA..") // Replace with your backend API endpoint
        .then(response => {
          const crimeData = response.data;
          setCrimeData(crimeData);
  
          // Extract column names from the orders data
          if (crimeData.length > 0) {
            const columns = Object.keys(crimeData[0]);
            setColumnOptions(columns);
            
            setYAxisParam(''); // Set default y-axis parameter as blank
          }
        })
        .catch(error => {
          console.error(error);
        });
    }, []);


  const getOptions = () => {
    const yAxisData = crimeData.map((entry) => entry[yAxisParam]);
    const legendData = [yAxisParam];

    const options = {
      title: {
        text: title,
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        data: legendData.filter(Boolean),
      },
      series: [
        {
          name: yAxisParam,
          data: yAxisData,
          type: 'pie',
          roseType: rosetype,
        },
      ],
    };

    return options;
  };

  const handleYAxisChange = (value) => {
    setYAxisParam(value);
  };

  const handleRose = (e) => {
    const value = e.target.value;
    setRoseType(value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const isOptionSelected = (option) => {
    return yAxisParam === option ? 'selected' : '';
  };

  return (
    <div className="container">
      <div className="controls">
        <div className="box-chart">
          <label htmlFor="title">Chart Title:</label>
          <input
            id="title"
            value={title}
            onChange={handleTitleChange}
            style={{ width: '200px' }}
          />
        </div>

        <div className="box-chart">
          <label htmlFor="rosetype">roseType:</label>
          <select
            id="rosetype"
            value={rosetype}
            onChange={handleRose}
            style={{ width: '200px' }}
          >
            <option value="">None</option>
            <option value="radius">Radius</option>
            <option value="area">Area</option>
          </select>
        </div>

        <div className="box-chart">
          <label htmlFor="yAxisParam">series:</label>
          <div className="column-table">
            {columnOptions.map((option) => (
              <div
                key={option}
                option={option}
                handleYAxisChange={handleYAxisChange}
              />
            ))}
          </div>
        </div>

        <div className="column-options">
          <p>Options: </p>
          <div className="column-table">
            {columnOptions.map((option) => (
              <div
                key={option}
                className={`option ${isOptionSelected(option)}`}
                onClick={() => handleYAxisChange(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ width: '100%', height: '400px' }}>
        <ReactEcharts option={getOptions()} />
      </div>

      {crimeData.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
      
    </div>
  );
};

const LineChart = () => {
  const [data, setData] = useState([]);
  const [xAxisParam, setXAxisParam] = useState('');
  const [columnOptions, setColumnOptions] = useState([]);
  const [yAxisParams, setYAxisParams] = useState([]);
  const [smooth, setSmooth] = useState([]);
  const [stack, setStack] = useState(''); // Default value is empty
  const [areaStyle, setAreaStyle] = useState(false); // Default value is false
  const [title, setTitle] = useState('');
  const [type, setType] = useState(''); // Default value is empty
  const [showSmooth, setShowSmooth] = useState(false);
  const [showStack, setShowStack] = useState(false); // Default value is empty
  const [showxAxis, setShowxAxis] = useState(false);
  const [xAxisType, setXAxisType] = useState(''); // Default x-axis type is 'category'
  const [hideControls, setHideControls] = useState(false)
  const [sortedData, setSortedData] = useState([]);
  const [seriesCount, setSeriesCount] = useState(1);
  const [showLegend, setShowLegend] = useState(false);

  // const [selectedCharts, setSelectedCharts] = useState([]);
  // console.log("Data:", data);
  

  useEffect(() => {
    // Fetch data from the backend
    axios.get("http://localhost:5000") // Replace with your backend API endpoint
        .then(response => {
          const ordersData = response.data;
          setData(ordersData);
  
          // Extract column names from the orders data
          if (ordersData.length > 0) {
            const columns = Object.keys(ordersData[0]);
            setColumnOptions(columns);
            setXAxisParam(''); // Set default x-axis parameter as blank
            sortData(ordersData, ''); 
          }
        })
        .catch(error => {
          console.error(error);
        });
    }, []);

    const sortData = (data, xAxisParam) => {
      const sorted = data
        .filter((entry, index) => index % 100 === 0)
        .sort((a, b) => a[xAxisParam] - b[xAxisParam]);
      setSortedData(sorted);
    };
    
    useEffect(() => {
      sortData(data, xAxisParam);
    }, [data, xAxisParam]);

  const getOptions = () => {
    const xAxisData = sortedData.map(entry => entry[xAxisParam]);
    const series = [];
    const legendData = [];
    

    for (let i = 0; i < seriesCount; i++) {
      const yAxisParam = yAxisParams[i];
      const yAxisData = sortedData.map(entry => entry[yAxisParam]);
      
      console.log('series.length:', series.length)

      series.push({
        name: yAxisParam,
        data: yAxisData,
        type: type,
        smooth: smooth[0] || false,
        stack: stack,
        areaStyle: {
          opacity: areaStyle ? 0.7 : 0,
        },
      });
      legendData.push(yAxisParam);
    }

    return {
      title: {
        text: title
      },
      xAxis: {       
        type: xAxisType || 'category',
        data: xAxisData, // Use the retrieved data for the x-axis 
        axisTick: {
          show: true
        }
      },
      yAxis: {
        type: "value",
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },
          restore: {},
          saveAsImage: {},
        },
      },
      // legend: {
      //   show: yAxisParams.length > 0 && series.length > 0,
      //   data: yAxisParams.length > 0 && showLegend && series.length > 0 ? legendData : [],
      // },
      series: series,
    };
  };

  useEffect(() => {
    setShowLegend(yAxisParams.length > 0);
  }, [yAxisParams]);

  const handleXAxisChange = (value) => {
    setXAxisParam(value);
  };


  const handleYAxisChange = (value, index) => {
    setYAxisParams((prevParams) => {
      const updatedParams = [...prevParams];
      updatedParams[index] = value;
      return updatedParams;
    });
  };

  const handleHideControls = () => {
    setHideControls(true);
  };

  const handleUnhideControls = () => {
    setHideControls(false);
  };

  const handleSmooth = (seriesIndex, e) => {
    const newSmooth = [...smooth];
    newSmooth[seriesIndex] = e.target.value === "true";
    setSmooth(newSmooth);
  };


  const handleStackChange = (value) => {
    setStack(value);
  };

  const handleXAxisType = (e) => {
    setXAxisType(e.target.value);
  };
  
  const handleAreaStyleChange = (value) => {
    setAreaStyle(value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSeriesCount = (value) => {
    setSeriesCount(value);
  };

  const handleAddSeries = () => {
    setSeriesCount(prevCount => prevCount + 1);
  };

  const handleRemoveSeries = () => {
    if (seriesCount > 1) {
      setSeriesCount(prevCount => prevCount - 1);
    }
  };

  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    setType(selectedType);
 
    // Update the visibility of features based on the selected chart type
    if (selectedType === 'line') {
      setShowSmooth(true);
      setShowStack(true);
      
      setShowxAxis(true);

      // Update the visibility of other features as needed
    } else if (selectedType === 'bar') {
      setShowSmooth(false);
      setShowStack(true);
      
      setShowxAxis(true);
      // Update the visibility of other features as needed
    } else if (selectedType === 'pie') {
      setShowSmooth(false);
      setShowStack(false);
      
      setShowxAxis(false);
      // Update the visibility of other features as needed
    } else {
      setShowSmooth(false);
      setShowStack(false);
      
      setShowxAxis(false);
      // Reset the visibility of other features as needed
    }
  }

  return (
    <div className="box-container">
      {/* Axis parameter selection */}
      {/* <div>
        <button onClick={handleAddChart}>Add Chart</button>
      </div>
      
      <div>
        {generateCharts()}
      </div> */}

      <div className={`box-chart ${hideControls ? 'hide-controls' : ''}`}>
        <label htmlFor="type">Chart Type:</label>
        <select id="type" value={type} onChange={handleTypeChange} style={{ width: '200px' }} >
          <option value="">Blank</option>
          <option value="line">line</option>
          <option value="bar">bar</option>
          <option value="pie">pie</option>
        </select>
      </div>
     
      <div className={`box-chart ${hideControls ? 'hide-controls' : ''}`}>
        <label htmlFor="title">Chart Title:</label>
        <input id="title" value={title} onChange={handleTitleChange} style={{ width: '200px' }} />
      </div>

      <div className={`box-chart ${hideControls ? 'hide-controls' : ''}`}>
        {showxAxis && (
        <>
        <label htmlFor="xAxisParam">X-Axis:</label>
        <select onChange={(e) => handleXAxisChange(e.target.value)}>
              <option>Blank</option>
              {columnOptions.map((column, index) => (
                <option key={index} value={column}>
                  {column}
                </option>
              ))}
        </select>
        </>
        )}
      </div>

      <div className={`column-table ${hideControls ? 'hide-controls' : ''}`}>
      {Array.from({ length: seriesCount }, (_, index) => index).map((index) => (
            <div className="column-options" key={index}>
              <label>Series {index + 1}:</label>
              <select onChange={(e) => handleYAxisChange(e.target.value, index)}>
                <option>Blank</option>
                {columnOptions.map((column, index) => (
                  <option key={index} value={column}>
                    {column}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className={`box-chart ${hideControls ? 'hide-controls' : ''}`}>
          {/* <div className="control-item"> */}
            <label>Series Count:</label>
            <button onClick={handleRemoveSeries}>-</button>
            <span>{seriesCount}</span>
            <button onClick={handleAddSeries}>+</button>
          {/* </div> */}
        </div>

      <div className={`box-chart ${hideControls ? 'hide-controls' : ''}`}>
      {showStack && (
        <>
        <label htmlFor="stack">Stack:</label>
        <select id="stack" value={stack} onChange={handleStackChange} style={{ width: '200px' }}>
          <option value="">None</option>
          <option value="Total">Total</option>
        </select>
        <label htmlFor="areaStyle">Area Style:</label>
        <input
        id="areaStyle"
        type="checkbox"
        checked={areaStyle}
        onChange={handleAreaStyleChange}
        style={{ marginLeft: '10px' }}
        />
        </>
      )}    
      </div>

      <div className={`box-chart ${hideControls ? 'hide-controls' : ''}`}>
      {showSmooth && (
        <>
        <label>Smooth:</label>
        <select value={smooth} onChange={(e) => handleSmooth(0, e)} style={{ marginLeft: "10px" }}>              
          <option value={false}>   </option>
          <option value={true}>Yes</option>
        </select>
        </>
      )}     
      </div>

      <div>
      {hideControls ? (
        <button onClick={handleUnhideControls}>Unhide Controls</button>
      ) : (
        <button onClick={handleHideControls}>Hide Controls</button>
      )}
      </div>

      <div className="chart-container" >
      <ReactEcharts option={getOptions()} />
      </div> 

      {/* Display the fetched data */}
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
        
      ))}
    </div>
  );
};

const BarChart = () => {
  const [data, setData] = useState([]);
  const [xAxisParam, setXAxisParam] = useState('');
  const [yAxisParam, setYAxisParam] = useState('');
  const [yAxisParam1, setYAxisParam1] = useState('');
  const [yAxisParam2, setYAxisParam2] = useState('');
  const [yAxisParam3, setYAxisParam3] = useState('');
  const [yAxisParam4, setYAxisParam4] = useState('');
  const [columnOptions, setColumnOptions] = useState([]);
  const [stack, setStack] = useState(''); // Default value is empty
  const [title, setTitle] = useState('');
  

  const [xAxisType, setXAxisType] = useState('category'); // Default x-axis type is 'category'
  // console.log("Data:", data);

  useEffect(() => {
    // Fetch data from the backend
    axios.get("http://localhost:5000/") // Replace with your backend API endpoint
      .then(response => {
        const ordersData = response.data;
        setData(ordersData);

        // Extract column names from the orders data
        if (ordersData.length > 0) {
          const columns = Object.keys(ordersData[0]);
          setColumnOptions(columns);
          setXAxisParam(''); // Set default x-axis parameter as blank
          setYAxisParam(''); // Set default y-axis parameter as blank
          setYAxisParam1(''); // Set default y-axis parameter as blank
          setYAxisParam2(''); // Set default y-axis parameter as blank
          setYAxisParam3(''); // Set default y-axis parameter as blank
          setYAxisParam4(''); // Set default y-axis parameter as blank
          console.log("columns:", columns);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const getOptions = () => {
    const xAxisData = data.map(entry => entry[xAxisParam]);
    const yAxisData = data.map(entry => entry[yAxisParam]);
    const yAxisData1 = data.map(entry => entry[yAxisParam1]);
    const yAxisData2 = data.map(entry => entry[yAxisParam2]);
    const yAxisData3 = data.map(entry => entry[yAxisParam3]);
    const yAxisData4 = data.map(entry => entry[yAxisParam4]);
    const legendData = [yAxisParam, yAxisParam1, yAxisParam2, yAxisParam3, yAxisParam4];

    // console.log("xAxisData:", xAxisData);
    console.log("yAxisData:", yAxisData);

    const options = {
      title: {
        text: title,
      },
      xAxis: {
        data: xAxisData,
        type: xAxisType,
      },
      yAxis: {
        type: "value",
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },
          restore: {},
          saveAsImage: {},
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            backgroundColor: '#6a7985'
          },
        },
      },
      legend: {
        data: legendData.filter(Boolean), // Filter out empty values
      },
      series: [
        {
          name: yAxisParam,
          data: yAxisData, // Use the retrieved data for the y-axis
          type: "bar",
          stack: stack,
        },
        {
          name: yAxisParam1,
          data: yAxisData1, // Use the retrieved data for the y-axis
          type: "bar",
          stack: stack,
        },
        {
          name: yAxisParam2,
          data: yAxisData2, // Use the retrieved data for the y-axis
          type: "bar",
          stack: stack,
        },
        {
          name: yAxisParam3,
          data: yAxisData3, // Use the retrieved data for the y-axis
          type: "bar",
          stack: stack,
        },
        {
          name: yAxisParam4,
          data: yAxisData4, // Use the retrieved data for the y-axis
          type: "bar",
          stack: stack,
        },
      ],
  };
  
  return options;
};

  const handleXAxisChange = (e) => {
    setXAxisParam(e.target.value);
    setXAxisType(e.target.options[e.target.selectedIndex].getAttribute('data-type'));
  };

  const handleYAxisChange = (e) => {
    setYAxisParam(e.target.value);
  };

  const handleYAxisChange1 = (e) => {
    setYAxisParam1(e.target.value);
  };

  const handleYAxisChange2 = (e) => {
    setYAxisParam2(e.target.value);
  };

  const handleYAxisChange3 = (e) => {
    setYAxisParam3(e.target.value);
  };

  const handleYAxisChange4 = (e) => {
    setYAxisParam4(e.target.value);
  };


  const handleStackChange = (e) => {
    setStack(e.target.value);
  };

  const handleTitleChange = (e) => {
      setTitle(e.target.value);
  };
  

  return (
    <div className="box-container">
      {/* Axis parameter selection */}

      
      <div>
      <label htmlFor="title">Chart Title:</label>
      <input id="title" value={title} onChange={handleTitleChange} style={{ width: '200px' }} />
      </div>

      <div className="box-chart">
        <label htmlFor="xAxisParam">X-Axis Parameter:</label>
        <select id="xAxisParam" value={xAxisParam} onChange={handleXAxisChange} style={{ width: '200px' }}>
          <option value="">Blank</option>
          {columnOptions.map(option => (
            <option key={option} value={option} data-type="category">Category: {option}</option>
          ))}
        </select>
      </div>
      <div className="box-chart">
        <label htmlFor="yAxisParam">Series 1:</label>
        <select id="yAxisParam" value={yAxisParam} onChange={handleYAxisChange} style={{ width: '200px' }}>
          <option value="">Blank</option>
          {columnOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="box-chart">
        <label htmlFor="yAxisParam1">Series 2:</label>
        <select id="yAxisParam1" value={yAxisParam1} onChange={handleYAxisChange1} style={{ width: '200px' }}>
          <option value="">Blank</option>
          {columnOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

      </div>
      <div className="box-chart">
        <label htmlFor="yAxisParam2">Series 3:</label>
        <select id="yAxisParam2" value={yAxisParam2} onChange={handleYAxisChange2} style={{ width: '200px' }}>
          <option value="">Blank</option>
          {columnOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

      </div>
      <div className="box-chart">
        <label htmlFor="yAxisParam3">Series 4:</label>
        <select id="yAxisParam3" value={yAxisParam3} onChange={handleYAxisChange3} style={{ width: '200px' }}>
          <option value="">Blank</option>
          {columnOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

      </div>
      <div>
        <label htmlFor="yAxisParam4">Series 5:</label>
        <select id="yAxisParam4" value={yAxisParam4} onChange={handleYAxisChange4} style={{ width: '200px' }}>
          <option value="">Blank</option>
          {columnOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

      </div>

      <div className="box-item">
        <label htmlFor="stack">Stack:</label>
        <select id="stack" value={stack} onChange={handleStackChange} style={{ width: '200px' }}>
          <option value="">None</option>
          <option value="Total">Total</option>
          </select>
      </div>
      

      <div style={{ width: '100%', height: '400px' }}>
      <ReactEcharts option={getOptions()}  style={{ height: '400px' }} />
      </div>

      {/* Display the fetched data */}
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
        
      ))}
    </div>
  );
};

const ControlCenter = () => {
  const [data, setData] = useState([]);
  const [xAxisParam, setXAxisParam] = useState('');
  const [yAxisParam, setYAxisParam] = useState('');
  const [columnOptions, setColumnOptions] = useState([]);
  const [smooth, setSmooth] = useState([]);
  const [stack, setStack] = useState(''); // Default value is empty
  const [areaStyle, setAreaStyle] = useState(false); // Default value is false
  const [title, setTitle] = useState('');
  const [type, setType] = useState(''); // Default value is empty
  const [showSmooth, setShowSmooth] = useState(false);
  const [showStack, setShowStack] = useState(false); // Default value is empty
  const [showxAxis, setShowxAxis] = useState(false);
  const [xAxisType, setXAxisType] = useState(''); // Default x-axis type is 'category'
  const [hideControls, setHideControls] = useState(false)
  const [sortedData, setSortedData] = useState([]);
  
  useEffect(() => {
    // Fetch data from the backend
    axios.get("http://localhost:5000") // Replace with your backend API endpoint
        .then(response => {
          const ordersData = response.data;
          setData(ordersData); 
          // Extract column names from the orders data
          if (ordersData.length > 0) {
            const columns = Object.keys(ordersData[0]);            
            setColumnOptions(columns);
            
            if (!xAxisParam || !columns.includes(xAxisParam)) {
                setXAxisParam(columns[0]); // Set xAxisParam to undefined if it's empty or not found in the columns
              }
              
              if (!yAxisParam || !columns.includes(yAxisParam)) {
                setYAxisParam(columns[0]); // Set yAxisParam to undefined if it's empty or not found in the columns
              }
            
            
            console.log("Columns:", columns)       
          }
        })
        .catch(error => {
          console.error(error);
        });
    }, [data, xAxisParam, yAxisParam]);

    useEffect(() => {
      const sortData = (data, xAxisParam) => {
        const sorted = data
          .filter((entry, index) => index % 10 === 0)
          .sort((a, b) => a[xAxisParam] - b[xAxisParam]);
        setSortedData(sorted);
      };
  
      sortData(data, xAxisParam);
      console.log("sortedData:", sortedData);
    }, [data, xAxisParam]);

  const handleXAxisChange = (e) => {
    setXAxisParam(e.target.value);  
  };

  const handleYAxisChange = (e) => {
    setYAxisParam(e.target.value);
  };

  const handleSmooth = (seriesIndex, e) => {
    const newSmooth = [...smooth];
    newSmooth[seriesIndex] = e.target.value === "true";
    setSmooth(newSmooth);
  };


  const handleStackChange = (e) => {
    setStack(e.target.value);
  };

  const handleXAxisType = (e) => {
    setXAxisType(e.target.value);
  };
  
  const handleAreaStyleChange = (e) => {
    setAreaStyle(e.target.checked);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleHideControls = () => {
    setHideControls(true);
  };

  const handleUnhideControls = () => {
    setHideControls(false);
  };

  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    setType(selectedType);
 
    // Update the visibility of features based on the selected chart type
    if (selectedType === 'line') {
      setShowSmooth(true);
      setShowStack(true);
      setShowxAxis(true);

      // Update the visibility of other features as needed
    } else if (selectedType === 'bar') {
      setShowSmooth(false);
      setShowStack(true); 
      setShowxAxis(true);
      // Update the visibility of other features as needed
    } else if (selectedType === 'pie') {
      setShowSmooth(false);
      setShowStack(false);      
      setShowxAxis(false);
      // Update the visibility of other features as needed
    } else {
      // Reset the visibility of all features when no chart type is selected
      setShowSmooth(false);
      setShowStack(false);      
      setShowxAxis(false);
      // Reset the visibility of other features as needed
    }
  }
  return (
    <div className="box-container">
      <div className={`box-chart ${hideControls ? 'hide-controls' : ''}`}>
        <label htmlFor="type">Chart Type:</label>
        <select id="type" value={type} onChange={handleTypeChange} style={{ width: '200px' }} >
          <option value="">Blank</option>
          <option value="line">line</option>
          <option value="bar">bar</option>
          <option value="pie">pie</option>
        </select>
      </div>
     
      <div className={`box-chart ${hideControls ? 'hide-controls' : ''}`}>
        <label htmlFor="title">Chart Title:</label>
        <input id="title" value={title} onChange={handleTitleChange} style={{ width: '200px' }} />
      </div>

      <div className={`box-chart ${hideControls ? 'hide-controls' : ''}`}>
      {showxAxis && (
        <>
        <label htmlFor="xAxisType">X-Axis Type:</label>
        <select id="xAxisType" value={xAxisType} onChange={handleXAxisType} style={{ width: '200px' }} >
          <option value="category">Category</option>
          {/* <option value="category">category</option> */}
          <option value="value">value</option>
          <option value="time">time</option>
          <option value="log">log</option>
        </select>
        </>
        )}
      </div>

      <div className={`box-chart ${hideControls ? 'hide-controls' : ''}`}>
        {showxAxis && (
        <>
        <label htmlFor="xAxisParam">X-Axis:</label>
        <select id="xAxisParam" value={xAxisParam} onChange={handleXAxisChange} style={{ width: '200px' }}>
            <option value="">Blank</option>
            {columnOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
        </select>
        </>
        )}
      </div>
     
      <div className={`box-chart ${hideControls ? 'hide-controls' : ''}`}>
        <label htmlFor="yAxisParam">Series: </label>
        <select id="yAxisParam" value={yAxisParam} onChange={handleYAxisChange} style={{ width: '200px' }}>
          <option value="">Blank</option>
          {columnOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className={`box-chart ${hideControls ? 'hide-controls' : ''}`}>
      {showStack && (
        <>
        <label htmlFor="stack">Stack:</label>
        <select id="stack" value={stack} onChange={handleStackChange} style={{ width: '200px' }}>
          <option value="">None</option>
          <option value="Total">Total</option>
        </select>
        <label htmlFor="areaStyle">Area Style:</label>
        <input
        id="areaStyle"
        type="checkbox"
        checked={areaStyle}
        onChange={handleAreaStyleChange}
        style={{ marginLeft: '10px' }}
        />
        </>
      )}    
      </div>

      <div className={`box-chart ${hideControls ? 'hide-controls' : ''}`}>
      {showSmooth && (
        <>
        <label>Smooth:</label>
        <select value={smooth} onChange={(e) => handleSmooth(0, e)} style={{ marginLeft: "10px" }}>              
          <option value={false}>   </option>
          <option value={true}>Yes</option>
        </select>
        </>
      )}     
      </div>

      <div>
      {hideControls ? (
        <button onClick={handleUnhideControls}>Unhide Controls</button>
      ) : (
        <button onClick={handleHideControls}>Hide Controls</button>
      )}
      </div>
      <Chart
        data={sortedData}
        xAxisParam={xAxisParam}
        yAxisParam={yAxisParam}
        title={title}
        type={type}
        smooth={smooth}
        stack={stack}
        areaStyle={areaStyle}
        xAxisType={xAxisType}
      />     
    </div>
  );
};

const Chart = ({ 
    data,
    xAxisParam,
    yAxisParam,  
    title,
    type,
    smooth,
    stack,
    areaStyle,
    xAxisType
}) => {

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (xAxisParam && yAxisParam && data.length > 0) {
            setIsReady(true);
        }
    }, [xAxisParam, yAxisParam, data]);

    if (!isReady) {
        return null; // Don't render the chart if the necessary variables are not ready
    }
    
    const getOptions = () => {
    
      const xAxisData = data.map(entry => entry[xAxisParam]);
      const yAxisData = data.map(entry => entry[yAxisParam]);
        
        const legendData = [yAxisParam];
        console.log('xAxisData:', xAxisData)
        return {
          title: {
            text: title
          },
          xAxis: {    
            show: type !== 'pie',  
            type: xAxisType || 'category',
            data: yAxisData, // Use the retrieved data for the x-axis 
            axisTick: {
              show: true
            }
          },
          yAxis: {
            type: "value",
            axisLabel: {
              rotate: 45, // Rotate the labels by -45 degrees
            },
          },
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: "none",
              },
              restore: {},
              saveAsImage: {},
            },
          },
          legend: {
            data: legendData.filter(Boolean), // Filter out empty values
          },
          series: [
            {
              name: yAxisParam,
              data: yAxisData, // Use the retrieved data for the y-axix
              type: type,
              smooth: smooth[0] || false,
              stack: stack,
              areaStyle: {
                opacity: areaStyle ? 0.7 : 0,
              },   
            },
            
          ],
        };
      };
    
      return (
        <div className="box-container">
          <div className="chart-container" >
            <ReactEcharts option={getOptions()} />
          </div> 
          
          {data.map(item => (
      <div key={item.id}>{item.name}</div>
    ))}
    </div>
    

      );
};

function Dashboard() {
  const mainPanel = React.useRef(null);
  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);
  const [layout, setLayout] = useState([]);
  const [theme, setTheme] = useState('dark');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Sidebar collapse state

  const [rowHeight, setRowHeight] = useState(1000); // Initial row height

  const handleRowHeightChange = (e) => {
    const newHeight = parseInt(e.target.value, 10);
    setRowHeight(newHeight);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed((prevCollapsed) => !prevCollapsed);
  };

  const handleLayoutChange = (newLayout, newLayouts) => {
    setLayout(newLayout);

    const barChartElement = barChartRef.current;

  if (barChartElement) {
    const chartWidth = barChartElement.clientWidth;
    const chartHeight = barChartElement.clientHeight;

    // Update layout with dynamic dimensions
    setLayout([
      { i: 'bar-chart', x: 0, y: 0, w: chartWidth, h: chartHeight },
    ]);
  }
};
    // You can perform any additional actions based on the new layout here

  useEffect(() => {
    const updateLayout = () => {
      // Calculate chart dimensions
      const lineChartElement = lineChartRef.current;
      const pieChartElement = pieChartRef.current;
      const barChartElement = barChartRef.current;

      if (lineChartElement && pieChartElement && barChartElement) {
        const chartWidth = lineChartElement.clientWidth;
        const chartHeight = lineChartElement.clientHeight;

        // Update layout with dynamic dimensions
        setLayout([
          { i: 'line-chart', x: 0, y: 0, w: chartWidth, h: chartHeight },
          { i: 'pie-chart', x: 0, y: 1, w: chartWidth, h: chartHeight },
          { i: 'bar-chart', x: 0, y: 2, w: chartWidth, h: chartHeight },
        ]);
      }
    };

    // Call updateLayout initially and on window resize
    updateLayout();
    window.addEventListener('resize', updateLayout);

    return () => {
      window.removeEventListener('resize', updateLayout);
    };
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
    <div className={theme}>
        <button onClick={toggleTheme}>
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      <Container fluid>
      <div className="row-height-control">
          <label htmlFor="rowHeight">Row Height:</label>
          <input
            id="rowHeight"
            type="number"
            value={rowHeight}
            onChange={handleRowHeightChange}
          />
        </div>
      
        <ResponsiveGridLayout
          className="layout"
          breakpoints={{ lg: layout}}
          cols={{ lg: 10, md: 8, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={rowHeight}
          onLayoutChange={handleLayoutChange}          
        >
      
        <div 
          key="line-chart" 
          className="chart-wrapper"
          data-grid={{ w: 6, h: 1, x: 0, y: 0 }}
        >
          <Card>
            {/* <Card.Header>
              <Card.Title as="h3">Chart</Card.Title>
            </Card.Header> */}
            <Card.Body>
              <LineChart />
            </Card.Body>
          </Card>
        </div>
        {/* <div 
          key="pie-chart" 
          className="chart-wrapper"
          data-grid={{ w: 4, h: 0.65, x: 0, y: 0 }}
        >
          <Card>
            <Card.Header>
              <Card.Title as="h4">Pie Chart</Card.Title>
            </Card.Header>
            <Card.Body>
              <PieChart />
            </Card.Body>
          </Card>
          </div>  */}
        {/* <div 
          key="bar-chart" 
          className="chart-wrapper"
          data-grid={{ w: 6, h: 1, x: 0, y: 0 }}
        >
          <Card>
            <Card.Body>
              <ControlCenter />
            </Card.Body>
          </Card>
        </div> */}
        </ResponsiveGridLayout>
      </Container>
      </div>
    </>
  );
}
export default Dashboard;
