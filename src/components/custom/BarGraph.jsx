import Chart from "@blueupcode/apexcharts"
import { useEffect, useState } from "react";

const defaultOptions = {
  chart: {
    background: "transparent"
  },
  plotOptions: {
    bar: {
      vertical: true
    }
  },
  dataLabels: {
    enabled: true
  }
}

const BarGraph = ({ data, theme } = props) => {

  const [series, setSeries] = useState([
    {
      data: data.map(x => x.value)
    }
  ]);

  const [options, setOptions] = useState({
    theme: {
      mode: theme,
      palette: "palette1"
    },
    xaxis: {
      categories: data.map(x => x.label)
    },
    ...defaultOptions
  });

  useEffect(() => {
    setSeries(
      [
        {
          data: data.map(x => x.value)
        }
      ]
    );

    setOptions(
      {
        theme: {
          mode: theme,
          palette: "palette2"
        },
        xaxis: {
          categories: data.map(x => x.label)
        },
        ...defaultOptions
      }
    )
  }, [data]);

  return (
    <Chart type="bar" options={options} series={series} height={350} />
  )

};

export default BarGraph;