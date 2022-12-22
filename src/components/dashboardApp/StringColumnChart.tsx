import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
import BaseOptionChart from "./BaseOptionChart";

interface StringColumnChartType {
  name: string;
  categories: string[];
  data: number[];
}
function StringColumnChart({ name, categories, data }: StringColumnChartType) {
  const chartOption = merge(BaseOptionChart(), {
    series: [
      {
        name,
        data,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories,
      },
      yaxis: {
        // title: {
        //   text: "$ (thousands)",
        // },
      },
      fill: {
        opacity: 1,
      },

      tooltip: {
        // y: {
        //   formatter: function (val) {
        //     return "$ " + val + " thousands";
        //   },
        // },
      },
    },
  });

  return (
    <ReactApexChart
      options={chartOption.options as any}
      series={chartOption.series}
      type="bar"
      height={350}
    />
  );
}

export default StringColumnChart;
