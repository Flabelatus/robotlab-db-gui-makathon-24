import { useEffect, useState } from "react";
import Input, { InputLong } from "./Input";
import { useOutletContext } from "react-router-dom";
import ThreeDCube from "./3DView";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, Text } from 'recharts';
import { PCDViewer } from "./PCDViewer";
import PCD from './../pcd/Conveyor_0000_Invalid.pcd';

const InsertForm = () => {

    const [fire, setFire] = useState(false);
    const [planed, setPlaned] = useState(false);
    const [str8, setStr8] = useState(true);
    const { devMode } = useOutletContext();

    const [impactData, setImpactData] = useState([]);

    const [showPie, setShowPie] = useState(false);

    const [rawImpactData, setRawImpactData] = useState({});

    const COLORS = ["#00f", "#00c", "#88f", "#aaF"]
    const [params, setParams] = useState({});

    const [wood, setWood] = useState({
        length: "",
        width: "",
        height: "",
        weight: "",
        name: "",
        color: "",
        image: "",
        storage_location: "",
        source: "",
        info: "",
        is_planed: false,
        is_straight: true,
        is_fire_treated: false
    });

    const [newRow, setNewRow] = useState({});
    const [lastID, setLastID] = useState(null);
    const { setAlertMessage, setAlertClassName } = useOutletContext();
    const [isAnyFieldNotEmpty, setIsAnyFieldNotEmpty] = useState(false);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const showAlert = (message, className, timeout = 5000) => {
        setAlertMessage(message);
        setAlertClassName(className);

        setTimeout(() => {
            setAlertMessage("");
            setAlertClassName("");
        }, timeout);
    };

    useEffect(() => {
        const anyFieldNotEmpty = Object.keys(wood).some((key) => {
            const value = wood[key];
            if (typeof value === "string") {
                return value.trim() !== "";
            } else if (typeof value === "number") {
                return value !== null;
            }
            return false;
        });
        setIsAnyFieldNotEmpty(anyFieldNotEmpty);
    }, [refresh, lastID, wood, impactData]);

    const handleRefreshPage = () => {
        if (!refresh) {
            setRefresh(true);
        } else {
            setRefresh(false);
        }
        setIsSubmitted(false);
        handleClearForm();
    }

    const handleClearForm = () => {
        document.querySelectorAll('input').forEach(input => {
            input.value = '';
            if (input.name === 'straight') {
                input.checked = true;
                setStr8(true);
            } else {
                if (input.name === 'fire' || input.name === 'planed') {
                    input.checked = false;
                    setFire(false);
                    setPlaned(false);
                }
            }
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsSubmitted(true);
        if (wood.width === 'undefined') {
            showAlert("Please fill the fields", "alert-danger", 3000);
        }
        const buttonValue = event.nativeEvent.submitter.value;
        if (buttonValue === "submit") {

            if (!isAnyFieldNotEmpty) {
                showAlert("Please fill all the fields", "alert-danger", 3000);
                return;
            }

            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            wood.is_fire_treated = fire;
            wood.is_planed = planed;
            wood.is_straight = str8;
            const requestOptions = {
                method: "POST",
                headers: headers,
                body: JSON.stringify(wood)
            }
            try {
                var url = `${process.env.REACT_APP_BACKEND}`;
                if (devMode) {
                    url = `https://robotlab-residualwood-dev.onrender.com`;
                }
                const response = await fetch(`${url}/wood`, requestOptions);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setLastID(data.id);
                setNewRow(data);
                setParams({
                    length: wood.length,
                    width: wood.width,
                    height: wood.height,
                    color: wood.color
                })
                showAlert("New row created", "alert-success", 3000);

                const impactResponse = await fetch(`${url}/impact/wood/${data.id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                })
                if (!impactResponse.ok) {
                    throw new Error(`HTTP error! Status: ${impactResponse.status}`);
                }
                const impactDat = await impactResponse.json();
                setRawImpactData(impactDat);

                impactDat.carbon_footprint = parseFloat(impactDat.carbon_footprint);
                impactDat.eco_costs = parseFloat(impactDat.eco_costs);
                impactDat.eco_toxicity = parseFloat(impactDat.eco_toxicity);
                impactDat.footprint = parseFloat(impactDat.footprint);
                impactDat.resource_depletion = parseFloat(impactDat.resource_depletion);

                const { human_health, process: productionProcess, codename, material, wood_id, id, ...newImpact } = impactDat;

                var result = Object.entries(newImpact).map(([key, value]) => ({ name: key, value: value }));
                
                setImpactData(result);
                setShowPie(true);

                // History
                var payload = {
                    event: "Wood added to the Database",
                    wood_id: data.id
                };
                const historyRequestOptions = {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(payload)
                }
                const historyResponse = await fetch(`${url}/history`, historyRequestOptions);
                if (!historyResponse.ok) {
                    throw new Error(`HTTP error! Status: ${historyResponse.status}`);
                }
                setTimeout(() => {
                    handleRefreshPage();
                    // resetWoodState();
                }, 2000);
            } catch (error) {
                console.error(error.message);
                showAlert(error.message, "alert-danger", 3000);
            }
        }
    };

    const handleWoodDataChange = (field, value) => {
        setWood((prevWood) => ({
            ...prevWood,
            [field]: value,
        }));
    };

    const handlePrintRequest = () => {
        const printRequestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        };

        fetch(`http://10.0.0.9:8081/print/${lastID}`, printRequestOptions)
            .then((response) => response.json())
            .catch((error) => {
                console.error(error.message);
            })
    };

    return (
        <>
            <div className="container justify-content-center row px-0" style={{ backgroundColor: 'white', marginLeft: '6%', marginRight: '6%' }}>
                <h1 className="fonts ms-5" style={{ color: '#8888FF', fontSize: 35, fontWeight: 700, textAlign: 'start' }}>Form</h1>
                <div className="justify-content-center container mb-0 px-5" style={{ width: 'fit-content' }}>
                    <form onSubmit={handleSubmit} className="mb-2 mt-5">
                        <div className=" mt-5 px-5 py-3">
                            <div className="row justify-content-center">
                                <div className="col-md-4" style={{ width: 'fit-content' }}>
                                    <Input
                                        title="Length (mm) *"
                                        id="length"
                                        type="number"
                                        className="me-4 px-3"
                                        placeholder="e.g. 2000"
                                        name="company-name"
                                        onChange={(e) => handleWoodDataChange("length", e.target.value)}
                                    />
                                    <Input
                                        title="Width (mm) *"
                                        id="width"
                                        type="number"
                                        placeholder="e.g. 100"
                                        className="me-4 px-3"
                                        name="width"
                                        onChange={(e) => handleWoodDataChange("width", e.target.value)}
                                    />
                                    <Input
                                        title="Height (mm) *"
                                        id="height"
                                        type="number"
                                        placeholder="e.g. 30"
                                        className="me-4 px-3"
                                        name="height"
                                        onChange={(e) => handleWoodDataChange("height", e.target.value)}
                                    />
                                    <Input
                                        title="Weight (grams) *"
                                        id="weight"
                                        type="number"
                                        className="me-4 px-3"
                                        placeholder="e.g. 1000"
                                        name="weight"
                                        onChange={(e) => handleWoodDataChange("weight", e.target.value)}
                                    />
                                </div>
                                <div className="col-md-4 justify-content-end" style={{ width: 'fit-content' }}>
                                    <Input
                                        title="Color (r, g, b)"
                                        id="color"
                                        type="text"
                                        className="me-4 px-3"
                                        placeholder="e.g. 144, 110, 90"
                                        name="color"
                                        onChange={(e) => handleWoodDataChange("color", e.target.value)}
                                    />
                                    <Input
                                        title="Image Path"
                                        id="image"
                                        type="text"
                                        className="me-4 px-3"
                                        placeholder="e.g. path/to/image.png"
                                        name="image"
                                        onChange={(e) => handleWoodDataChange("image", e.target.value)}
                                    />
                                    <Input
                                        title="Storage Location"
                                        id="storage"
                                        type="text"
                                        placeholder="e.g. a-1"
                                        className="me-4 px-3"
                                        name="storage"
                                        onChange={(e) => handleWoodDataChange("storage_location", e.target.value)}
                                    />
                                    <Input
                                        title="Source"
                                        id="source"
                                        type="text"
                                        className="me-4 px-3"
                                        name="source"
                                        placeholder="e.g. Robot Lab"
                                        onChange={(e) => handleWoodDataChange("source", e.target.value)}
                                    />
                                    <Input
                                        title="Species"
                                        id="species"
                                        type="text"
                                        className="me-4 px-3"
                                        name="species"
                                        placeholder="e.g. Pine FSC"
                                        onChange={(e) => handleWoodDataChange("name", e.target.value)}
                                    />
                                </div>
                                <div className="col-md-4" style={{ width: 'fit-content' }}>
                                    <InputLong
                                        title="Info"
                                        id="info"
                                        type="text"
                                        className="me-4 px-3 py-2"
                                        name="info"
                                        onChange={(e) => handleWoodDataChange("info", e.target.value)}
                                    />
                                    <div className=" mt-5 text-center">
                                        <input
                                            className="form-check-input checkbox-custom"
                                            type="checkbox"
                                            name="straight"
                                            id="straight"
                                            defaultChecked={true}
                                            onChange={(e) => setStr8(e.target.checked)}

                                        ></input>
                                        <label className="fonts" style={{ fontSize: 18, marginLeft: 10, fontWeight: 400, color: "blue" }}>Straight</label>

                                        <input
                                            className="form-check-input checkbox-custom ms-4"
                                            type="checkbox"
                                            name="planed"
                                            id="planed"
                                            defaultChecked={false}
                                            onChange={(e) => setPlaned(e.target.checked)}
                                        ></input>
                                        <label className="fonts" style={{ fontSize: 20, marginLeft: 10, fontWeight: 400, color: "blue" }}>Planed</label>

                                        <input
                                            className="form-check-input checkbox-custom ms-4"
                                            type="checkbox"
                                            name="fire"
                                            id="fire"
                                            defaultChecked={false}
                                            onChange={(e) => setFire(e.target.checked)}

                                        ></input>
                                        <label className="fonts" style={{ fontSize: 18, marginLeft: 10, fontWeight: 400, color: "blue" }}>Fire Treated</label>
                                    </div>
                                    <div className="row justify-content-center">
                                        <button type="submit" value="submit" className="btn btn-submit-light-large mt-5 fonts px-4" style={{ fontSize: 16, width: 'fit-content' }}>Submit</button>
                                        <button value="clear" className="btn btn-secondary mt-5 ms-2 fonts px-4" style={{ fontSize: 16, width: 'fit-content' }} onClick={handleClearForm}>Clear Forms</button>
                                        <button value="clear" className="btn btn-submit-light-small-outline mt-5 ms-2 fonts px-4" style={{ fontSize: 16, width: 'fit-content' }} onClick={handlePrintRequest}>Print</button>
                                    </div>
                                    {
                                        lastID &&
                                        <div className="container mt-4 mb-2" style={{ backgroundColor: "#FFFF0060" }}>
                                            <em className="fonts" style={{ fontSize: 18 }}>New Row ID: </em>
                                            <em className="fonts text-center" style={{ fontSize: 20 }}>{lastID}</em>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </form >
                </div >
                <div className="justify-content-center container- px-5 mb-5" style={{ height: 'fit-content' }}>
                    <div className="mb-3">
                        <h1 className="fonts" style={{ color: '#8888FF', fontSize: 20, fontWeight: 700, textAlign: 'start' }}>Model preview</h1>
                        <div className="row justify-content-center mt-4 py-5" style={{ borderRadius: 8, border: 'solid 0px blue', height: 'fit-content'  }}>
                            <div className="col-md-3 container- py-2">
                                <div className="px-2 py-3" style={{ backgroundColor: '#fff', height: 'fit-content', overflowY: 'auto', borderRadius: 8 }}>
                                    <pre style={{ color: '#5500ff', fontWeight: 500, fontSize: 12 }}>{lastID ? JSON.stringify(newRow, null, 2) : 'Entered row displays here'}</pre>
                                </div>
                            </div>
                            <div className="col-md-10 mt-2 d-flex- justify-content-center align-items-center" style={{ width: 'fit-content' }}>
                                {/* <PCDViewer pcdFile={PCD}/> */}
                                <ThreeDCube width={params.width} length={params.length} height={params.height} color={`rgb(${params.color})`} metalPositions={null} metalSpan={null} />
                                <div className="row px-4 py-4 ms-4 mt-4" style={{ border: "0px solid #ccc", width: 'fit-content', borderRadius: 16 }}>
                                    <div className="col">
                                        {showPie &&
                                            <div>
                                                <h3 className="mt-4 ms-4" style={{ color: "#00f" }}>Impact Data</h3>
                                                <h5 className=" ms-4" style={{ color: "#55f" }}>{rawImpactData.process}</h5>
                                            </div>
                                        }

                                        {showPie && <div className="col-md-6 mt-5">
                                            <div style={{ width: '350px', height: "350px", minWidth: "250px", minHeight: "250px" }}>
                                                <ResponsiveContainer>
                                                    <PieChart>
                                                        <Pie
                                                            dataKey="value"
                                                            nameKey="name"
                                                            data={impactData}
                                                            cx="50%"
                                                            cy="50%"
                                                            outerRadius={125}
                                                            stroke='none'
                                                            fill="#8884d8"
                                                        >
                                                            <Cell key={`cell-0`} fill={COLORS[0]} />
                                                            <Cell key={`cell-1`} fill={COLORS[1]} />
                                                            <Cell key={`cell-2`} fill={COLORS[2]} />
                                                            <Cell key={`cell-2`} fill={COLORS[3]} />

                                                        </Pie>

                                                        <Tooltip formatter={(value) => `€${value.toFixed(2)}`} />
                                                        <Legend />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                                {/* <label>Total Cost: </label> */}
                                            </div>
                                        </div>}
                                    </div>
                                    {showPie &&
                                        <div className="col mt-5 ms-5 py-5 px-4" style={{ backgroundColor: "#eef", borderRadius: 8, height: 'fit-content' }}>
                                            <h6>Carbon Footprint: € {rawImpactData.footprint}</h6>
                                            <h6>Eco Costs: € {rawImpactData.eco_costs}</h6>
                                            <h6>Eco Toxicity: € {rawImpactData.eco_toxicity}</h6>
                                            <h6>Resource Deplition Costs: € {rawImpactData.footprint}</h6>
                                            <h6>Total Footprint: € {rawImpactData.footprint}</h6>
                                            <br />
                                            <label>Source: Idemat2024</label>
                                        </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </>
    );
};

export default InsertForm;