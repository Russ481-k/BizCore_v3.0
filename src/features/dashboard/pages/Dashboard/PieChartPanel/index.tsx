import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import { useMemo } from "react";

import formatter from "libs/formatter";

interface pieChartPanelProps {
  data: Array<{
    type: string;
    count: number;
  }>;
}

function PieChartPanel({ data }: pieChartPanelProps) {
  const sendTotal = data.reduce(
    (
      acc: number,
      cur: {
        type: string;
        count: number;
      }
    ) => acc + cur["count"],
    0
  );

  const chartOptions: AgChartOptions = useMemo(
    () => ({
      autoSize: true,
      data,
      series: [
        {
          type: "pie",
          calloutLabelKey: "type",
          strokeWidth: 0,
          angleKey: "count",
          sectorLabelKey: "count",
          calloutLabel: {
            enabled: false,
          },
          sectorLabel: {
            color: "white",
            fontWeight: "bold",
            formatter: ({ datum, sectorLabelKey }) => {
              const value = datum[sectorLabelKey!];
              return formatter.currencyFormatter(String(value));
            },
          },
          fills: ["#6D92DD", "#CFC6FC", "#0ACBBF"],
          strokes: undefined,
          innerLabels: [
            {
              text: formatter.currencyFormatter(String(sendTotal)),
              fontSize: 22,
              fontWeight: "bold",
            },
            {
              text: "건",
              fontSize: 15,
            },
          ],
          highlightStyle: {
            item: {
              fill: undefined,
            },
          },
          tooltip: {
            renderer: ({ datum, calloutLabelKey, title, sectorLabelKey }) => {
              return {
                title,
                content: `${
                  datum[calloutLabelKey!]
                }: ${formatter.currencyFormatter(
                  String(datum[sectorLabelKey!])
                )}`,
              };
            },
          },
        },
      ],
    }),
    [data, sendTotal]
  );

  return <AgChartsReact options={chartOptions} />;
}
export default PieChartPanel;
