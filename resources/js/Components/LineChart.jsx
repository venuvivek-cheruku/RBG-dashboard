import React, { Fragment, useState } from "react";
import { AgChartsReact } from "ag-charts-react";

export default function LineChart({
    data,
    title,
    subtitle,
    xKey,
    yKey,
    yName,
    ...props
}) {
    // Convert yKey values to integers
    const convertedData = data.map((item) => ({
        ...item,
        [yKey]: parseInt(item[yKey]),
    }));

    const [options, setOptions] = useState({
        title: {
            text: title,
        },
        subtitle: {
            text: subtitle,
        },
        data: convertedData,
        series: [
            {
                type: "line",
                xKey: xKey,
                yKey: yKey,
                yName: yName,
            },
        ],
    });

    return <AgChartsReact options={options} />;
}
