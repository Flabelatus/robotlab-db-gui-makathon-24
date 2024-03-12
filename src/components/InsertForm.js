import { useEffect, useState } from "react";
import Input, { InputLong } from "./Input";
import { useOutletContext } from "react-router-dom";
import ThreeDCube from "./3DView";

const InsertForm = () => {

    const [fire, setFire] = useState(false);
    const [planed, setPlaned] = useState(false);
    const [str8, setStr8] = useState(true);

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

    const resetWoodState = () => {
        setWood({
            length: "",
            width: "",
            height: "",
            name: "",
            weight: "",
            color: "",
            image: "",
            storage_location: "",
            source: "",
            info: "",
            is_planed: false,
            is_straight: true,
            is_fire_treated: false
        });
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
    }, [refresh, lastID, wood]);

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
                const response = await fetch(`${process.env.REACT_APP_BACKEND}/wood`, requestOptions);
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
                var payload = {
                    event: "Wood added to the Database",
                    wood_id: data.id
                }
                const historyRequestOptions = {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(payload)
                }
                const historyResponse = await fetch(`${process.env.REACT_APP_BACKEND}/history`, historyRequestOptions);
                if (!historyResponse.ok) {
                    throw new Error(`HTTP error! Status: ${historyResponse.status}`);
                }
                setTimeout(() => {
                    handleRefreshPage();
                    resetWoodState();
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
                                        <label className="fonts" style={{ fontSize: 20, marginLeft: 10, fontWeight: 400, color: "blue" }}>Straight</label>

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
                                        <label className="fonts" style={{ fontSize: 20, marginLeft: 10, fontWeight: 400, color: "blue" }}>Fire Treated</label>
                                    </div>
                                    <div className="row justify-content-center">
                                        <button type="submit" value="submit" className="btn btn-submit-light-large mt-5 fonts px-4" style={{ fontSize: 16, width: 'fit-content' }}>Submit</button>
                                        <button value="clear" className="btn btn-secondary mt-5 ms-2 fonts px-4" style={{ fontSize: 16, width: 'fit-content' }} onClick={handleClearForm}>Clear Forms</button>
                                        <button value="clear" className="btn btn-submit-light-small-outline mt-5 ms-2 fonts px-4" style={{ fontSize: 16, width: 'fit-content' }} onClick={handlePrintRequest}>Print</button>
                                    </div>
                                    {
                                        lastID &&
                                        <div className="container mt-4 mb-2" style={{ backgroundColor: "#FFFF0060" }}>
                                            <em className="fonts" style={{ fontSize: 20 }}>New Row ID: </em>
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
                        <h1 className="fonts" style={{ color: '#8888FF', fontSize: 35, fontWeight: 700, textAlign: 'start' }}>Model preview</h1>
                        <div className="row justify-content-center mt-4 py-5" style={{ borderRadius: 8, border: 'solid 1px blue', height: 'fit-content' }}>
                            <div className="col-md-3 container- py-2">
                                <div style={{ backgroundColor: '#FFF', height: 'fit-content', overflowY: 'auto' }}>
                                    <pre style={{ color: '#0000FF', fontWeight: 600 }}>{lastID ? JSON.stringify(newRow, null, 2) : 'Entered row displays here'}</pre>
                                </div>
                            </div>
                            <div className="col-md-10 mt-5 d-flex- justify-content-center align-items-center" style={{ width: 'fit-content' }}>
                                <ThreeDCube width={params.width} length={params.length} height={params.height} color={`rgb(${params.color})`} />
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </>
    );
};

export default InsertForm;