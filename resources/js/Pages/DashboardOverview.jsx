import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useRef, useState } from "react";

import axios from "axios";
import BarChart from "@/Components/BarChart";
import PieChart from "@/Components/PieChart";
import BarChart2 from "@/Components/BarChart-2";

export default function DashboardOverview({ auth }) {
    const gridRef = useRef();
    const [rowData, setRowData] = useState([]);
    const [rowSIData, setRowSIData] = useState([]);
    const [rowPMData, setRowPMData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/materials");
            const processedData = response.data.map((item) => ({
                ...item,
                quantity_used: parseFloat(item.quantity_used),
                sustainability_impact_numeric: (() => {
                    switch (item.sustainability_impact) {
                        case "Low":
                            return 1;
                        case "Moderate":
                            return 2;
                        case "High":
                            return 4;
                        default:
                            return item.sustainability_impact;
                    }
                })(),
            }));
            setRowData(processedData);
        } catch (error) {
            console.error("Error fetching materials:", error);
        }

        try {
            const SIresponse = await axios.get("/api/sustainability");
            setRowSIData(SIresponse.data);
        } catch (error) {
            console.error("Error fetching sustainability:", error);
        }

        try {
            const PMresponse = await axios.get("/api/project");
            setRowPMData(PMresponse.data);
        } catch (error) {
            console.error("Error fetching project metrics:", error);
        }

        setLoading(false); // Set loading to false once all data fetching is complete
    };

    const [columnDefs] = useState([
        {
            field: "project_association",
            headerName: "Project Association",
        },
        {
            field: "material_name",
            headerName: "Material Name",
        },
        {
            field: "usage_status",
            headerName: "Usage Status",
        },
        {
            field: "quantity_used",
            valueFormatter: (params) => `${params.value} kg`,
            headerName: "Quantity Used (Kgs)",
        },
    ]);

    const defaultColDef = {
        filter: true,
        sortable: true,
    };

    const calculateAggregationData = () => {
        const aggregationData = {
            totalCarbonEmissions: 0,
            totalWaterUsage: 0,
            totalEnergyConsumption: 0,
            totalWasteGeneration: 0,
        };

        rowSIData.forEach((row) => {
            aggregationData.totalCarbonEmissions += parseFloat(
                row.carbon_emissions
            );
            aggregationData.totalWaterUsage += parseFloat(row.water_usage);
            aggregationData.totalEnergyConsumption += parseFloat(
                row.energy_consumption
            );
            aggregationData.totalWasteGeneration += parseFloat(
                row.waste_generation
            );
        });

        return aggregationData;
    };

    const aggregationData = calculateAggregationData();

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="elements flex flex-wrap gap-14 m-14 items-center">
                    <div className="element border rounded-lg overflow-hidden bg-gray-200">
                        <h3 className="text-center font-bold py-2 ">
                            Project Material Status
                        </h3>
                        <div
                            className="ag-theme-quartz relative"
                            style={{ height: 300, width: 600 }}
                        >
                            <AgGridReact
                                ref={gridRef}
                                rowData={rowData}
                                columnDefs={columnDefs}
                                defaultColDef={defaultColDef}
                                rowSelection="false"
                                pagination={true}
                                paginationPageSize={10}
                                paginationPageSizeSelector={[10, 50, 100]}
                            />
                        </div>
                    </div>
                    <div className="element border rounded-lg overflow-hidden bg-gray-200">
                        <h3 className="text-center font-bold py-2 ">
                            Sustainability Impacts
                        </h3>
                        <div
                            className="ag-theme-quartz relative"
                            style={{ height: 300 }}
                        >
                            <BarChart
                                data={rowData}
                                title="Material Sustainability Impact"
                                subtitle="Low, Moderate, and High"
                                xKey="material_name"
                                yKey="sustainability_impact_numeric"
                                yName="Sustainability Impact"
                            />
                        </div>
                    </div>
                    <div className="element border rounded-lg overflow-hidden bg-gray-200">
                        <h3 className="text-center font-bold py-2 ">
                            Sustainability Usage
                        </h3>
                        <div
                            className="ag-theme-quartz relative"
                            style={{ height: 300 }}
                        >
                            <PieChart
                                data={[
                                    {
                                        project_name: "Total Carbon Emissions",
                                        sustainability_impact:
                                            aggregationData.totalCarbonEmissions,
                                    },
                                    {
                                        project_name: "Total Water Usage",
                                        sustainability_impact:
                                            aggregationData.totalWaterUsage,
                                    },
                                    {
                                        project_name:
                                            "Total Energy Consumption",
                                        sustainability_impact:
                                            aggregationData.totalEnergyConsumption,
                                    },
                                    {
                                        project_name: "Total Waste Generation",
                                        sustainability_impact:
                                            aggregationData.totalWasteGeneration,
                                    },
                                ]}
                                backgroundColor="white"
                                title="Sustainability Metrics Overview"
                                subtitle="Total Quantities Across All Projects"
                                angleKey="sustainability_impact"
                                calloutLabelKey="project_name"
                                sectorLabelKey="sustainability_impact"
                            />
                        </div>
                    </div>
                    <div className="element border rounded-lg overflow-hidden bg-gray-200">
                        <h3 className="text-center font-bold py-2 ">
                            Project Information
                        </h3>
                        <div
                            className="ag-theme-quartz relative"
                            style={{ height: 300 }}
                        >
                            <BarChart2
                                data={rowPMData}
                                title="Comparison Across Projects"
                                subtitle="Project Cost, Profit, and Revenue"
                                xKey="project_name"
                                yKey1="cost"
                                yKey2="profit"
                                yKey3="revenue"
                                yName1="Cost"
                                yName2="Profit"
                                yName3="Revenue"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
