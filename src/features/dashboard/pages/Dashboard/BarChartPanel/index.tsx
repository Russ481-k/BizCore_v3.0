import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import { useMemo } from "react";

interface BarChartPanelProps {
  data: Array<{
    sendDate: string;
    sendCount: number;
    readCount: number;
  }>;
}

function BarChartPanel({ data }: BarChartPanelProps) {
  const chartOptions: AgChartOptions = useMemo(
    () => ({
      autoSize: true,
      data,
      theme: {
        palette: {
          fills: ["#001FBF", "CFC6FC", "#6D92DD"],
          strokes: ["#000000"],
        },
        overrides: {
          column: {
            series: {
              strokeWidth: 0,
              highlightStyle: {
                item: {
                  fill: undefined,
                },
              },
            },
          },
          line: {
            series: {
              strokeWidth: 5,
              marker: {
                enabled: true,
                shape: "circle",
                size: 10,
                strokeWidth: 0,
              },
              highlightStyle: {
                item: {
                  fill: undefined,
                },
              },
            },
          },
        },
      },
      series: [
        {
          type: "column",
          xKey: "sendDate",
          yKey: "sendCount",
          yName: "건 수",
        },
        {
          type: "column",
          xKey: "sendDate",
          yKey: "acceptCount",
          yName: "수신건 수",
        },
        {
          type: "line",
          xKey: "sendDate",
          yKey: "readCount",
          yName: "열람자 수",
        },
      ],
      axes: [
        {
          type: "category",
          position: "bottom",
        },
        {
          type: "number",
          position: "left",
          keys: ["sendCount", "acceptCount", "readCount"],
          label: {
            formatter: (params) => {
              return params.value + "건";
            },
          },
        },
      ],
      legend: {
        position: "bottom",
        item: {
          marker: {
            shape: "square",
            strokeWidth: 0,
          },
        },
      },
    }),
    [data]
  );
  return <AgChartsReact options={chartOptions} />;
}
export default BarChartPanel;
