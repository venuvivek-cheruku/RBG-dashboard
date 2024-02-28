import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import PieChart from "@/Components/PieChart";
import { useEffect, useRef, useState, useCallback } from "react";
import BarChart from "@/Components/BarChart";
import PlusIcon from "@/Components/icons/PlusIcon";
import ExportIcon from "@/Components/icons/ExportIcon";
import axios from "axios";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import DeleteIcon from "@/Components/icons/DeleteIcon";
import DonutChart from "@/Components/DonutChart";

export default function SustainabilityImpact({ auth }) {
    const undoRedoCellEditing = true;
    const undoRedoCellEditingLimit = 20;
    const gridRef = useRef();
    const [rowData, setRowData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedRows, setSelectedRows] = useState([]);
    const [newSustainability, setNewSustainability] = useState({
        project_name: "",
        carbon_emissions: "",
        water_usage: "",
        energy_consumption: "",
        waste_generation: "",
        renewable_energy_integration: "",
        sustainable_materials_used: "",
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/sustainability");
            setRowData(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching sustainability:", error);
        }
    };

    const onSelectionChanged = () => {
        const selectedNodes = gridRef.current.api.getSelectedNodes();
        const selectedIds = selectedNodes.map((node) => node.data.id);
        setSelectedRows(selectedIds);
    };

    const handleCellValueChanged = async (event) => {
        try {
            const updatedSustainability = {
                id: event.data.id,
                [event.colDef.field]: event.newValue,
            };
            await axios.put(
                `/api/sustainability/${updatedSustainability.id}`,
                updatedSustainability
            );
            console.log(
                "Sustainability updated successfully:",
                updatedSustainability
            );
            const updatedRowData = rowData.map((row) => {
                if (row.id === updatedSustainability.id) {
                    return { ...row, [event.colDef.field]: event.newValue };
                }
                return row;
            });
            setRowData(updatedRowData);
        } catch (error) {
            console.error("Error updating Sustainability:", error);
        }
    };

    const handleDeleteRows = async () => {
        try {
            await axios.delete(`/api/sustainability/${selectedRows.join(",")}`);
            const updatedRowData = rowData.filter(
                (row) => !selectedRows.includes(row.id)
            );
            setRowData(updatedRowData);
            setSelectedRows([]);
        } catch (error) {
            console.error("Error deleting sustainability:", error);
        }
    };

    const [columnDefs] = useState([
        {
            field: "project_name",
            checkboxSelection: true,

            headerName: "Project Name",
        },
        {
            field: "carbon_emissions",
            headerName: "Carbon Emissions (tons)",
        },
        {
            field: "water_usage",
            headerName: "Water Usage (litres)",
        },
        {
            field: "energy_consumption",
            headerName: "Energy Consumption (kWh)",
        },
        {
            field: "waste_generation",
            valueFormatter: (params) => `${params.value} kg`,
            headerName: "Waste Generation (kg)",
        },
        {
            field: "renewable_energy_integration",
            headerName: "Renewable Energy Integration",
        },
        {
            field: "sustainable_materials_used",
            headerName: "Sustainable Materials Used",
        },
    ]);

    const defaultColDef = {
        filter: true,
        sortable: true,
        editable: true,
    };

    const handleAddMaterial = () => {
        setModalIsOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSustainability((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        try {
            axios
                .post("/api/sustainability", newSustainability)
                .then((response) => {
                    console.log(
                        "Sustainability added successfully:",
                        response.data
                    );
                    setNewSustainability({
                        project_name: "",
                        carbon_emissions: "",
                        water_usage: "",
                        energy_consumption: "",
                        waste_generation: "",
                        renewable_energy_integration: "",
                        sustainable_materials_used: "",
                    });
                });
            setModalIsOpen(false);
            window.location.reload();
        } catch (error) {
            console.error("Error adding Sustainability:", error);
        }
    };

    const onBtnExport = () => {
        gridRef.current.api.exportDataAsCsv();
    };

    const onQuickFilterChanged = useCallback(() => {
        gridRef.current.api.setGridOption(
            "quickFilterText",
            document.getElementById("quickFilter").value
        );
    }, []);

    const calculateAggregationData = () => {
        const aggregationData = {
            totalCarbonEmissions: 0,
            totalWaterUsage: 0,
            totalEnergyConsumption: 0,
            totalWasteGeneration: 0,
        };

        // Iterate through rowData to calculate totals for each category
        rowData.forEach((row) => {
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
            {auth.user && (
                <AuthenticatedLayout
                    user={auth.user}
                    header={"Sustainability Impact"}
                >
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="graphs flex gap-2 justify-center">
                            <DonutChart
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
                                className="max-w-[32%]"
                                title="Sustainability Metrics Overview"
                                subtitle="Total Quantities Across All Projects"
                                calloutLabelKey="project_name"
                                angleKey="sustainability_impact"
                            />
                        </div>
                    )}

                    <div className="m-2 flex flex-nowrap justify-between gap-2">
                        <div>
                            <TextInput
                                type="text"
                                onInput={onQuickFilterChanged}
                                id="quickFilter"
                                placeholder="Search Here..."
                            />
                        </div>
                        <div className="flex flex-nowrap gap-2">
                            {selectedRows.length > 0 && (
                                <PrimaryButton
                                    className="flex flex-nowrap gap-2 bg-transparent dark:bg-transparent border rounded font-medium capitalize text-base"
                                    onClick={handleDeleteRows}
                                >
                                    <DeleteIcon color={"#1f2937"} />
                                    Delete
                                </PrimaryButton>
                            )}
                            <PrimaryButton
                                className="flex flex-nowrap gap-2 bg-transparent dark:bg-transparent border rounded font-medium capitalize text-base"
                                onClick={handleAddMaterial}
                            >
                                <PlusIcon color={"#1f2937"} />
                                Add Sustainability Impact
                            </PrimaryButton>

                            <PrimaryButton
                                className="flex flex-nowrap gap-2 bg-transparent dark:bg-transparent border rounded font-medium capitalize text-base"
                                onClick={onBtnExport}
                            >
                                <ExportIcon color={"#1f2937"} />
                                Export
                            </PrimaryButton>
                        </div>
                    </div>
                    <div
                        className="ag-theme-quartz relative"
                        style={{ height: 500 }}
                    >
                        <AgGridReact
                            ref={gridRef}
                            rowData={rowData}
                            columnDefs={columnDefs}
                            defaultColDef={defaultColDef}
                            rowSelection="multiple"
                            suppressExcelExport={true}
                            suppressRowClickSelection={true}
                            pagination={true}
                            paginationPageSize={10}
                            paginationPageSizeSelector={[10, 50, 100]}
                            undoRedoCellEditing={undoRedoCellEditing}
                            undoRedoCellEditingLimit={undoRedoCellEditingLimit}
                            onCellValueChanged={handleCellValueChanged}
                            onSelectionChanged={onSelectionChanged}
                        />
                    </div>

                    <Modal
                        show={modalIsOpen}
                        onClose={() => setModalIsOpen(false)}
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-wrap gap-3 items-end"
                        >
                            <div>
                                <InputLabel
                                    htmlFor="project_name"
                                    value="Project Name"
                                />

                                <TextInput
                                    id="project_name"
                                    type="text"
                                    name="project_name"
                                    value={newSustainability.project_name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleInputChange}
                                    required={true}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="carbon_emissions"
                                    value="Carbon Emissions (tons)"
                                />

                                <TextInput
                                    id="carbon_emissions"
                                    type="number"
                                    name="carbon_emissions"
                                    value={newSustainability.carbon_emissions}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleInputChange}
                                    required={true}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="water_usage"
                                    value="Water Usage (litres)"
                                />

                                <TextInput
                                    id="water_usage"
                                    type="number"
                                    name="water_usage"
                                    value={newSustainability.water_usage}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleInputChange}
                                    required={true}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="energy_consumption"
                                    value="Energy Consumption (kWh)"
                                />

                                <TextInput
                                    id="energy_consumption"
                                    type="number"
                                    name="energy_consumption"
                                    value={newSustainability.energy_consumption}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleInputChange}
                                    required={true}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="waste_generation"
                                    value="Waste Generation (kg)"
                                />

                                <TextInput
                                    id="waste_generation"
                                    type="number"
                                    name="waste_generation"
                                    value={newSustainability.waste_generation}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleInputChange}
                                    required={true}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="renewable_energy_integration"
                                    value="Renewable Energy Integration"
                                />

                                <TextInput
                                    id="renewable_energy_integration"
                                    type="text"
                                    name="renewable_energy_integration"
                                    value={
                                        newSustainability.renewable_energy_integration
                                    }
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleInputChange}
                                    required={true}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="sustainable_materials_used"
                                    value="Sustainable Materials Used"
                                />

                                <TextInput
                                    id="sustainable_materials_used"
                                    type="text"
                                    name="sustainable_materials_used"
                                    value={
                                        newSustainability.sustainable_materials_used
                                    }
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleInputChange}
                                    required={true}
                                />
                            </div>

                            <PrimaryButton
                                className=" h-fit flex flex-nowrap gap-2 bg-gray-600 mx-auto mt-4 w-[250px] justify-center dark:bg-gray-600 border rounded font-medium uppercase text-base text-white dark:text-white"
                                type="submit"
                            >
                                Add Sustainability
                            </PrimaryButton>
                        </form>
                    </Modal>
                </AuthenticatedLayout>
            )}
        </>
    );
}
