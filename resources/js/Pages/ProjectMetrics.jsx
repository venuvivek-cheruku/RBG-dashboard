import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useRef, useState, useCallback } from "react";
import BarChart from "@/Components/BarChart";
import PlusIcon from "@/Components/icons/PlusIcon";
import ExportIcon from "@/Components/icons/ExportIcon";
import axios from "axios";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import DeleteIcon from "@/Components/icons/DeleteIcon";
import LineChart from "@/Components/LineChart";
import BarChart2 from "@/Components/BarChart-2";

export default function ProjectMetrics({ auth }) {
    const undoRedoCellEditing = true;
    const undoRedoCellEditingLimit = 20;
    const gridRef = useRef();
    const [rowData, setRowData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedRows, setSelectedRows] = useState([]);
    const [newProjectMetrics, setNewProjectMetrics] = useState({
        project_name: "",
        cost: "",
        duration: "",
        profit: "",
        revenue: "",
        roi: "",
        client_satisfaction: "",
        efficiency: "",
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/project");
            setRowData(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching project metrics:", error);
        }
    };

    const onSelectionChanged = () => {
        const selectedNodes = gridRef.current.api.getSelectedNodes();
        const selectedIds = selectedNodes.map((node) => node.data.id);
        setSelectedRows(selectedIds);
    };

    const handleCellValueChanged = async (event) => {
        try {
            const updatedProjectMetrics = {
                id: event.data.id,
                [event.colDef.field]: event.newValue,
            };
            await axios.put(
                `/api/project/${updatedProjectMetrics.id}`,
                updatedProjectMetrics
            );
            console.log(
                "Project Metrics updated successfully:",
                updatedProjectMetrics
            );
            const updatedRowData = rowData.map((row) => {
                if (row.id === updatedProjectMetrics.id) {
                    return { ...row, [event.colDef.field]: event.newValue };
                }
                return row;
            });
            setRowData(updatedRowData);
        } catch (error) {
            console.error("Error updating Project Metrics:", error);
        }
    };

    const handleDeleteRows = async () => {
        try {
            await axios.delete(`/api/project/${selectedRows.join(",")}`);
            const updatedRowData = rowData.filter(
                (row) => !selectedRows.includes(row.id)
            );
            setRowData(updatedRowData);
            setSelectedRows([]);
        } catch (error) {
            console.error("Error deleting Project Metrics:", error);
        }
    };

    const [columnDefs] = useState([
        {
            field: "project_name",
            checkboxSelection: true,
            headerName: "Project Name",
            cellDataType: "text",
        },
        {
            field: "cost",
            valueFormatter: (params) => `£${params.value}`,
            headerName: "Cost (£)",
            cellDataType: "number",
        },
        {
            field: "duration",
            cellDataType: "number",
            valueFormatter: (params) => `${params.value}`,
            headerName: "Duration (months)",
        },
        {
            field: "profit",
            valueFormatter: (params) => `£${params.value}`,
            headerName: "Profit (£)",
            cellDataType: "number",
        },
        {
            field: "revenue",
            valueFormatter: (params) => `£${params.value}`,
            headerName: "Revenue (£)",
            cellDataType: "number",
        },
        {
            field: "roi",
            valueFormatter: (params) => `${params.value}%`,
            headerName: "ROI (%)",
            cellDataType: "number",
        },
        {
            field: "client_satisfaction",
            headerName: "Client Satisfaction",
            cellDataType: "text",
        },
        {
            field: "efficiency",
            valueFormatter: (params) => `${params.value}%`,
            headerName: "Efficiency (%)",
            cellDataType: "number",
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
        setNewProjectMetrics((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        try {
            axios.post("/api/project", newProjectMetrics).then((response) => {
                console.log(
                    "Project Metrics added successfully:",
                    response.data
                );
                setNewProjectMetrics({
                    project_name: "",
                    cost: "",
                    duration: "",
                    profit: "",
                    revenue: "",
                    roi: "",
                    client_satisfaction: "",
                    efficiency: "",
                });
            });
            setModalIsOpen(false);
            window.location.reload();
        } catch (error) {
            console.error("Error adding Project Metrics:", error);
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

    return (
        <>
            {auth.user && (
                <AuthenticatedLayout
                    user={auth.user}
                    header={"Project Metrics"}
                >
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="graphs flex gap-2 justify-center">
                            <LineChart
                                data={rowData}
                                title="Project Durations"
                                subtitle="Duration of Each Project Over Time (Months)"
                                xKey="project_name"
                                yKey="duration"
                                yName="Duration (months)"
                            />
                            <BarChart2
                                data={rowData}
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
                                Add Project Metrics
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
                                    value={newProjectMetrics.project_name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleInputChange}
                                    required={true}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="cost" value="Cost (£)" />

                                <TextInput
                                    id="cost"
                                    type="number"
                                    name="cost"
                                    value={newProjectMetrics.cost}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleInputChange}
                                    required={true}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="duration"
                                    value="Duration (months)"
                                />

                                <TextInput
                                    id="duration"
                                    type="number"
                                    name="duration"
                                    value={newProjectMetrics.duration}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleInputChange}
                                    required={true}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="profit"
                                    value="Profit (£)"
                                />

                                <TextInput
                                    id="profit"
                                    type="number"
                                    name="profit"
                                    value={newProjectMetrics.profit}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleInputChange}
                                    required={true}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="revenue"
                                    value="Revenue (£)"
                                />

                                <TextInput
                                    id="revenue"
                                    type="number"
                                    name="revenue"
                                    value={newProjectMetrics.revenue}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleInputChange}
                                    required={true}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="roi" value="ROI (%)" />

                                <TextInput
                                    id="roi"
                                    type="number"
                                    name="roi"
                                    value={newProjectMetrics.roi}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleInputChange}
                                    required={true}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="client_satisfaction"
                                    value="Client Satisfaction"
                                />

                                <TextInput
                                    id="client_satisfaction"
                                    type="text"
                                    name="client_satisfaction"
                                    value={
                                        newProjectMetrics.client_satisfaction
                                    }
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleInputChange}
                                    required={true}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="efficiency"
                                    value="Efficiency (%)
"
                                />

                                <TextInput
                                    id="efficiency"
                                    type="number"
                                    name="efficiency"
                                    value={newProjectMetrics.efficiency}
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
                                Add Project Metrics
                            </PrimaryButton>
                        </form>
                    </Modal>
                </AuthenticatedLayout>
            )}
        </>
    );
}
