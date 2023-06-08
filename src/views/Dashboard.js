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
  const [data, setData] = useState([]);
  const [yAxisParam, setYAxisParam] = useState('');
  const [columnOptions, setColumnOptions] = useState([]);
  const [rosetype, setRoseType] = useState(''); // Default value is empty
  const [title, setTitle] = useState('');

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
          setYAxisParam(''); // Set default y-axis parameter as blank
          console.log("columns:", columns);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const getOptions = () => {
    const yAxisData = data.map(entry => entry[yAxisParam]);
    const legendData = [yAxisParam];

    const options = {
      title: {
        text: title,
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        data: legendData.filter(Boolean), // Filter out empty values
      },
      series: [
        {
          name: yAxisParam,
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ], // Use the retrieved data for the y-axis
          type: "pie",
          roseType: rosetype
        },
      ],
    };

    return options;
  };

  const handleYAxisChange = (e) => {
    setYAxisParam(e.target.value);
  };

  const handleRose = (e) => {
    const value = e.target.value;
    setRoseType(value);
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
        <label htmlFor="yAxisParam">Series:</label>
        <select id="yAxisParam" value={yAxisParam} onChange={handleYAxisChange} style={{ width: '200px' }}>
          <option value="">Blank</option>
          {columnOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="box-item">
        <label htmlFor="rosetype">roseType:</label>
        <select id="rosetype" value={rosetype} onChange={handleRose} style={{ width: '200px' }}>
          <option value="">None</option>
          <option value="radius">Radius</option>
          <option value="area">Area</option>
        </select>
      </div>

      <div className="chart-container">
        {/* <ResponsiveGridLayout
          className="layout"
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={800}
        >
          <div key="chart"> */}
            <div className="chart-wrapper">
              <ReactEcharts option={getOptions()} style={{ height: '100%', width: '100%' }} />
              {/* Display the fetched data */}
              {data.map(item => (
                <div key={item.id}>{item.name}</div>
              ))}
            </div>
          {/* </div>
        </ResponsiveGridLayout> */}
      </div>
    </div>
  );
};

const LineChart = () => {
  const [data, setData] = useState([]);
  const [xAxisParam, setXAxisParam] = useState('');
  const [yAxisParam, setYAxisParam] = useState('');
  const [yAxisParam1, setYAxisParam1] = useState('');
  const [yAxisParam2, setYAxisParam2] = useState('');
  const [yAxisParam3, setYAxisParam3] = useState('');
  const [yAxisParam4, setYAxisParam4] = useState('');
  const [columnOptions, setColumnOptions] = useState([]);
  const [smooth, setSmooth] = useState([]);
  const [smooth1, setSmooth1] = useState([]);
  const [smooth2, setSmooth2] = useState([]);
  const [smooth3, setSmooth3] = useState([]);
  const [smooth4, setSmooth4] = useState([]);
  const [stack, setStack] = useState(''); // Default value is empty
  const [areaStyle, setAreaStyle] = useState(false); // Default value is false
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

    return {
      title: {
        text: title
      },
      xAxis: {
        type: xAxisType,
        data: xAxisData, // Use the retrieved data for the x-axis
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
          type: 'cross',
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
          data: yAxisData, // Use the retrieved data for the y-axix
          type: "line",
          smooth: smooth[0] || false,
          stack: stack,
          areaStyle: {
            opacity: areaStyle ? 0.7 : 0,
          },

        },
        {
          name: yAxisParam1,
          data: yAxisData1, // Use the retrieved data for the y-axix
          type: "line",
          smooth: smooth[1] || false,
          stack: stack,
          areaStyle: {
            opacity: areaStyle ? 0.7 : 0,
          },
        },
        {
          name: yAxisParam2,
          data: yAxisData2, // Use the retrieved data for the y-axix
          type: "line",
          smooth: smooth[2] || false,
          stack: stack,
          areaStyle: {
            opacity: areaStyle ? 0.7 : 0,
          },
        },
        {
          name: yAxisParam3,
          data: yAxisData3, // Use the retrieved data for the y-axix
          type: "line",
          smooth: smooth[3] || false,
          stack: stack,
          areaStyle: {
            opacity: areaStyle ? 0.7 : 0,
          },
        },
        {
          name: yAxisParam4,
          data: yAxisData4, // Use the retrieved data for the y-axix
          type: "line",
          smooth: smooth[4] || false,
          stack: stack,
          areaStyle: {
            opacity: areaStyle ? 0.7 : 0,
          },
        },
      ],
    };
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

  const handleSmooth = (seriesIndex, e) => {
    const newSmooth = [...smooth];
    newSmooth[seriesIndex] = e.target.value === "true";
    setSmooth(newSmooth);
  };

  const handleSmooth1 = (seriesIndex, e) => {
    const newSmooth1 = [...smooth1];
    newSmooth1[seriesIndex] = e.target.value === "true";
    setSmooth1(newSmooth1);
  };

  const handleSmooth2 = (seriesIndex, e) => {
    const newSmooth2 = [...smooth2];
    newSmooth2[seriesIndex] = e.target.value === "true";
    setSmooth2(newSmooth2);
  };

  const handleSmooth3 = (seriesIndex, e) => {
    const newSmooth3 = [...smooth3];
    newSmooth3[seriesIndex] = e.target.value === "true";
    setSmooth3(newSmooth3);
  };

  const handleSmooth4 = (seriesIndex, e) => {
    const newSmooth4 = [...smooth4];
    newSmooth4[seriesIndex] = e.target.value === "true";
    setSmooth4(newSmooth4);
  };

  const handleStackChange = (e) => {
    setStack(e.target.value);
  };
  
  const handleAreaStyleChange = (e) => {
    setAreaStyle(e.target.checked);
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
          {columnOptions.map(option => (
            <option key={option} value={option} data-type="value">Value: {option}</option>
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
        <label>Smooth:</label>
        <select value={smooth} onChange={(e) => handleSmooth(0, e)} style={{ marginLeft: "10px" }}>              
          <option value={false}>   </option>
          <option value={true}>Yes</option>
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
        <label>Smooth:</label>
        <select value={smooth1} onChange={(e) => handleSmooth1(0, e)} style={{ marginLeft: "10px" }}>              
          <option value={false}>   </option>
          <option value={true}>Yes</option>
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
        <label>Smooth:</label>
        <select value={smooth2} onChange={(e) => handleSmooth2(0, e)} style={{ marginLeft: "10px" }}>              
          <option value={false}>   </option>
          <option value={true}>Yes</option>
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
        <label>Smooth:</label>
        <select value={smooth3} onChange={(e) => handleSmooth3(0, e)} style={{ marginLeft: "10px" }}>              
          <option value={false}>   </option>
          <option value={true}>Yes</option>
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
        <label>Smooth:</label>
        <select value={smooth4} onChange={(e) => handleSmooth4(0, e)} style={{ marginLeft: "10px" }}>              
          <option value={false}>   </option>
          <option value={true}>Yes</option>
        </select>
      </div>

      <div className="box-item">
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


function Dashboard() {
  const mainPanel = React.useRef(null);
  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);
  const [layout, setLayout] = useState([]);
  const [theme, setTheme] = useState('dark');

  const handleLayoutChange = (newLayout, newLayouts) => {
    setLayout(newLayout);
    // You can perform any additional actions based on the new layout here
  };

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
      
        <ResponsiveGridLayout
          className="layout"
          breakpoints={{ lg: layout}}
          cols={{ lg: 10, md: 8, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={820}
          onLayoutChange={handleLayoutChange}
          
        >
      
        <div 
          key="line-chart" 
          className="chart-wrapper"
          data-grid={{ w: 6, h: 1, x: 0, y: 0 }}
        >
          <Card>
            <Card.Header>
              <Card.Title as="h4">Line Chart</Card.Title>
            </Card.Header>
            <Card.Body>
              <LineChart />
            </Card.Body>
          </Card>
        </div>
        <div 
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
          </div>
        <div 
          key="bar-chart" 
          className="chart-wrapper"
          data-grid={{ w: 6, h: 1, x: 0, y: 0 }}
        >
          <Card>
            <Card.Header>
              <Card.Title as="h4">Bar Chart</Card.Title>
            </Card.Header>
            <Card.Body>
              <BarChart />
            </Card.Body>
          </Card>
        </div>
        </ResponsiveGridLayout>
      </Container>
      </div>
    </>
  );
}

export default Dashboard;
