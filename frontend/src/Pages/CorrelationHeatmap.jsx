import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

function Correlation() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/correlation")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <p>Loading correlation...</p>;

  const series = Object.keys(data).map((key) => ({
    name: key,
    data: Object.entries(data[key]).map(([name, value]) => ({
      x: name,
      y: value.toFixed(2), 
    })),
  }));

  const options = {
    chart: {
      type: 'heatmap',
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#000']
      }
    },
    colors: ["#008FFB"], 
    title: {
      text: 'Pearson Correlation Heatmap'
    },
    xaxis: {
      type: 'category',
    },
    plotOptions: {
      heatmap: {
        colorScale: {
          ranges: [
            { from: -1, to: -0.5, color: '#FF4560', name: 'Strong Negative' },
            { from: -0.5, to: 0, color: '#FEB019', name: 'Weak Negative' },
            { from: 0, to: 0.5, color: '#00E396', name: 'Weak Positive' },
            { from: 0.5, to: 1, color: '#008FFB', name: 'Strong Positive' }
          ]
        }
      }
    }
  };

  return (
    <div style={{ background: "	#87CEEB", padding: "20px"}}>
      <h2>Pearson Correlation (Academic Effort)</h2>
      <Chart
        options={options}
        series={series}
        type="heatmap"
        height={450}
      />
    </div>
  );
}

export default Correlation;