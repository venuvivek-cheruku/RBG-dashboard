import React, { Fragment, useState } from "react";
import { AgChartsReact } from "ag-charts-react";

export default function PieChart({
    data,
    className = "",
    title,
    subtitle,
    angleKey,
    calloutLabelKey,
    sectorLabelKey,
    backgroundColor,
    ...props
}) {
    const [options, setOptions] = useState({
        data: data,
        title: {
            text: title,
        },
        subtitle: {
            text: subtitle,
        },
        series: [
            {
                type: "pie",
                angleKey: angleKey,
                calloutLabelKey: calloutLabelKey,
                sectorLabelKey: sectorLabelKey,
                sectorLabel: {
                    color: "white",
                    fontWeight: "normal",
                    formatter: ({ value }) => `${value / 1000}K`,
                },
            },
        ],
        background: {
            fill: backgroundColor,
        },
        legend: { enabled: false },
    });

    return (
        <>
            <div {...props} className={className}>
                <AgChartsReact options={options} />
            </div>
        </>
    );
}
