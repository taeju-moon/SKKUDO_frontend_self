import ReactApexChart from "react-apexcharts";

interface BooleanColumnChartType {
  series: number[];
  labels: string[];
}
function BooleanColumnChart({ series, labels }: BooleanColumnChartType) {
  const chartOption = {
    series,
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };
  return (
    <ReactApexChart
      options={chartOption.options as any}
      series={chartOption.series}
      type="pie"
      width={380}
    />
  );
}

export default BooleanColumnChart;
