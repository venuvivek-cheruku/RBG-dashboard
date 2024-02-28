import React, { useState } from "react";
import { AgChartsReact } from "ag-charts-react";

export default function DonutChart({
    data,
    title,
    subtitle,
    calloutLabelKey,
    angleKey,
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
                type: "donut",
                calloutLabelKey: calloutLabelKey,
                angleKey: angleKey,
                innerRadiusRatio: 0.7,
            },
        ],
    });

    return <AgChartsReact options={options} />;
}
