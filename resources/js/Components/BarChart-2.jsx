import React, { useState } from "react";
import { AgChartsReact } from "ag-charts-react";

export default function BarChart2({
    data,
    title,
    subtitle,
    xKey,
    yKey1,
    yKey2,
    yKey3,
    yName1,
    yName2,
    yName3,
    ...props
}) {
    // Convert yKey values to integers
    const convertedData = data.map((item) => ({
        ...item,
        [yKey1]: parseInt(item[yKey1]),
        [yKey2]: parseInt(item[yKey2]),
        [yKey3]: parseInt(item[yKey3]),
    }));

    const [options, setOptions] = useState({
        title: {
            text: title,
        },
        subtitle: {
            text: subtitle,
        },
        data: convertedData, // Use converted data instead of original data
        series: [
            {
                type: "bar",
                xKey: xKey,
                yKey: yKey1,
                yName: yName1,
            },
            {
                type: "bar",
                xKey: xKey,
                yKey: yKey2,
                yName: yName2,
            },
            {
                type: "bar",
                xKey: xKey,
                yKey: yKey3,
                yName: yName3,
            },
        ],
    });

    return <AgChartsReact options={options} />;
}
