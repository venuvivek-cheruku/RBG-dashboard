import React, { useState } from "react";
import { AgChartsReact } from "ag-charts-react";

export default function BarChart({
    data,
    title,
    subtitle,
    xKey,
    yKey,
    yName,
    ...props
}) {
    const [options, setOptions] = useState({
        title: {
            text: title,
        },
        subtitle: {
            text: subtitle,
        },
        data: data,
        series: [
            {
                type: "bar",
                xKey: xKey,
                yKey: yKey,
                yName: yName,
                stacked: true,
            },
        ],
        axes: [
            {
                type: "category",
                position: "bottom",
                label: {
                    rotation: 45,
                },
            },
            {
                type: "number",
                position: "left",
                label: {
                    formatter: (params) => {
                        if (params.value == 0) {
                            return "Low";
                        }
                        if (params.value == 2) {
                            return "Moderate";
                        }
                        if (params.value == 4) {
                            return "High";
                        }
                    },
                },
            },
        ],
    });

    return <AgChartsReact options={options} />;
}
