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

export default function MaterialQuantities({ auth }) {
    const undoRedoCellEditing = true;
    const undoRedoCellEditingLimit = 20;
    const gridRef = useRef();
    const [rowData, setRowData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedRows, setSelectedRows] = useState([]);
    const [newMaterial, setNewMaterial] = useState({
        material_name: "",
        quantity_used: "",
        unit_price: "",
        total_price: "",
        project_association: "",
        material_type: "",
        sustainability_impact: "",
        environmental_impact: "",
        usage_status: "",
    });

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
                    // Use an immediately invoked function expression (IIFE)
                    switch (
                        item.sustainability_impact // Corrected this line to access the sustainability_impact property
                    ) {
                        case "Low":
                            return 1;
                        case "Moderate":
                            return 2;
                        case "High":
                            return 4;
                        default:
                            return item.sustainability_impact; // Return original value if no match
                    }
                })(),
            }));
            setRowData(processedData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching materials:", error);
        }
    };

    const onSelectionChanged = () => {
        const selectedNodes = gridRef.current.api.getSelectedNodes();
        const selectedIds = selectedNodes.map((node) => node.data.id);
        setSelectedRows(selectedIds);
    };

    const handleCellValueChanged = async (event) => {
        try {
            const updatedMaterial = {
                id: event.data.id,
                [event.colDef.field]: event.newValue,
            };
            await axios.put(
                `/api/materials/${updatedMaterial.id}`,
                updatedMaterial
            );
            console.log("Material updated successfully:", updatedMaterial);
            const updatedRowData = rowData.map((row) => {
                if (row.id === updatedMaterial.id) {
                    return { ...row, [event.colDef.field]: event.newValue };
                }
                return row;
            });
            setRowData(updatedRowData);
        } catch (error) {
            console.error("Error updating material:", error);
        }
    };

    const handleDeleteRows = async () => {
        try {
            await axios.delete(`/api/materials/${selectedRows.join(",")}`);
            // Remove deleted rows from rowData
            const updatedRowData = rowData.filter(
                (row) => !selectedRows.includes(row.id)
            );
            setRowData(updatedRowData);
            setSelectedRows([]); // Clear selected rows after deletion
        } catch (error) {
            console.error("Error deleting materials:", error);
        }
    };

    const [columnDefs] = useState([
        {
            field: "material_name",
            checkboxSelection: true,

            headerName: "Material Name",
        },
        {
            field: "quantity_used",
            valueFormatter: (params) => `${params.value} kg`,
            headerName: "Quantity Used (Kgs)",
        },
        {
            field: "unit_price",
            valueFormatter: (params) => `£${params.value}`,
            headerName: "Unit Price (£/kg)",
        },
        {
            field: "total_price",
            valueFormatter: (params) => `£${params.value}`,
            headerName: "Total Price (£/kg)",
        },
        {
            field: "project_association",
            headerName: "Project Association",
        },
        {
            field: "material_type",
            headerName: "Material Type",
        },
        {
            field: "sustainability_impact",
            headerName: "Sustainability Impact",
        },
        {
            field: "environmental_impact",
            headerName: "Environmental Impact",
        },
        {
            field: "usage_status",
            headerName: "Usage Status",
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
        setNewMaterial((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        try {
            axios.post("/api/materials", newMaterial).then((response) => {
                console.log("Material added successfully:", response.data);
                setNewMaterial({
                    "Material Name": "",
                    "Quantity Used (kg)": "",
                    "Unit Price (£/kg)": "",
                    "Total Price (£)": "",
                    "Project Association": "",
                    "Usage Status": "",
                    "Material Type": "",
                    "Sustainability Impact": "",
                    "Environmental Impact": "",
                });
            });
            setModalIsOpen(false);
            window.location.reload();
        } catch (error) {
            console.error("Error adding material:", error);
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
                    header={"Material Quantities"}
                >
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="graphs flex gap-2 justify-center">
                            <PieChart
                                data={rowData}
                                className="max-w-[32%]"
                                backgroundColor="transparent"
                                title="Material Quantities"
                                subtitle="in Kilograms"
                                angleKey="quantity_used"
                                calloutLabelKey="material_name"
                                sectorLabelKey="quantity_used"
                            />
                            <BarChart
                                data={rowData}
                                title="Material Sustainability Impact"
                                subtitle="Low, Moderate, and High"
                                xKey="material_name"
                                yKey="sustainability_impact_numeric"
                                yName="Sustainability Impact"
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
                                Add Material
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
                            className="flex flex-wrap gap-3"
                        >
                            <div>
                                <InputLabel
                                    htmlFor="material_name"
                                    value="Material Name"
                                />

                                <TextInput
                                    id="material_name"
                                    type="text"
                                    name="material_name"
                                    value={newMaterial.material_name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleInputChange}
                                    required={true}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="quantity_used"
                                    value="Quantity Used (Kg)"
                                />

                                <TextInput
                                    id="quantity_used"
                                    type="number"
                                    name="quantity_used"
                                    value={newMaterial.quantity_used}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleInputChange}
                                    required={true}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="unit_price"
                                    value="Unit Price"
                                />

                                <TextInput
                                    id="unit_price"
                                    type="number"
                                    name="unit_price"
                                    value={newMaterial.unit_price}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleInputChange}
                                    required={true}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="total_price"
                                    value="Total Price"
                                />

                                <TextInput
                                    id="total_price"
                                    type="number"
                                    name="total_price"
                                    value={newMaterial.total_price}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleInputChange}
                                    required={true}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="project_association"
                                    value="Project Association"
                                />

                                <TextInput
                                    id="project_association"
                                    type="text"
                                    name="project_association"
                                    value={newMaterial.project_association}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleInputChange}
                                    required={true}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="material_type"
                                    value="Material Type"
                                />

                                <TextInput
                                    id="material_type"
                                    type="text"
                                    name="material_type"
                                    value={newMaterial.material_type}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleInputChange}
                                    required={true}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="sustainability_impact"
                                    value="Sustainability Impact"
                                />

                                <TextInput
                                    id="sustainability_impact"
                                    type="text"
                                    name="sustainability_impact"
                                    value={newMaterial.sustainability_impact}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleInputChange}
                                    required={true}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="environmentalImpact"
                                    value="Environmental Impact"
                                />

                                <TextInput
                                    id="environmental_impact"
                                    type="text"
                                    name="environmental_impact"
                                    value={newMaterial.environmental_impact}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleInputChange}
                                    required={true}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="usage_status"
                                    value="Usage Status"
                                />

                                <TextInput
                                    id="usage_status"
                                    type="text"
                                    name="usage_status"
                                    value={newMaterial.usage_status}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleInputChange}
                                    required={true}
                                />
                            </div>

                            <PrimaryButton
                                className="flex flex-nowrap gap-2 bg-gray-600 mx-auto mt-4 w-[250px] justify-center dark:bg-gray-600 border rounded font-medium uppercase text-base text-white dark:text-white"
                                type="submit"
                            >
                                Add Material
                            </PrimaryButton>
                        </form>
                    </Modal>
                </AuthenticatedLayout>
            )}
        </>
    );
}
