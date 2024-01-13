import { useEffect, useState } from "react";
import Input, { InputLong } from "./Input";
import { useOutletContext } from "react-router-dom";

const InsertForm = () => {

    const [fire, setFire] = useState(false);
    const [planed, setPlaned] = useState(false);
    const [str8, setStr8] = useState(true);

    const [wood, setWood] = useState({
        length: "",
        width: "",
        height: "",
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

        if (!isAnyFieldNotEmpty) {
            showAlert("Please fill all the fields", "alert-danger", 3000);
            return;
        }

        setIsSubmitted(true);
        if (wood.width === 'undefined') {
            showAlert("Please fill the fields", "alert-danger", 3000);
        }
        const buttonValue = event.nativeEvent.submitter.value;
        if (buttonValue === "submit") {

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
                const response = await fetch(`https://robotlab-residualwood.onrender.com/wood`, requestOptions);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setLastID(data.id);
                setNewRow(data);
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

                const historyResponse = await fetch(`https://robotlab-residualwood.onrender.com/history`, historyRequestOptions);
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

    return (
        <div className="justify-content-center container mb-5">
            <form onSubmit={handleSubmit} className="mb-5 mt-5">
                <div className=" mt-5 justify-content-center px-4 py-4">
                    <div className="row justify-content-center">
                        <div className="col-md-4" style={{ width: 'fit-content' }}>
                            <Input
                                title="Length (mm) *"
                                id="length"
                                type="number"
                                className="me-4"
                                name="company-name"
                                onChange={(e) => handleWoodDataChange("length", e.target.value)}
                            />
                            <Input
                                title="Width (mm) *"
                                id="width"
                                type="number"
                                className="me-4"
                                name="width"
                                onChange={(e) => handleWoodDataChange("width", e.target.value)}
                            />
                            <Input
                                title="Height (mm) *"
                                id="height"
                                type="number"
                                className="me-4"
                                name="height"
                                onChange={(e) => handleWoodDataChange("height", e.target.value)}
                            />
                            <Input
                                title="Weight (grams) *"
                                id="weight"
                                type="number"
                                className="me-4"
                                name="weight"
                                onChange={(e) => handleWoodDataChange("weight", e.target.value)}
                            />
                        </div>
                        <div className="col-md-4 justify-content-end" style={{ width: 'fit-content' }}>
                            <Input
                                title="Color (r, g, b)"
                                id="color"
                                type="text"
                                className="me-4"
                                name="color"
                                onChange={(e) => handleWoodDataChange("color", e.target.value)}
                            />
                            <Input
                                title="Image Path"
                                id="image"
                                type="text"
                                className="me-4"
                                name="image"
                                onChange={(e) => handleWoodDataChange("image", e.target.value)}
                            />
                            <Input
                                title="Storage Location"
                                id="storage"
                                type="text"
                                className="me-4"
                                name="storage"
                                onChange={(e) => handleWoodDataChange("storage_location", e.target.value)}
                            />
                            <Input
                                title="Source"
                                id="source"
                                type="text"
                                className="me-4"
                                name="source"
                                onChange={(e) => handleWoodDataChange("source", e.target.value)}
                            />

                        </div>
                        <div className="col-md-4" style={{ width: 'fit-content' }}>
                            <InputLong
                                title="Info"
                                id="info"
                                type="text"
                                className="me-4"
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
                                <button type="submit" value="submit" className="btn btn-submit-light-large mt-5 fonts" style={{ fontSize: 20, width: 150 }}>Submit</button>
                                <button value="clear" className="btn btn-secondary mt-5 ms-2 fonts" style={{ fontSize: 20, width: 150 }} onClick={handleClearForm}>Clear Forms</button>
                            </div>
                            <div className="container mt-4 mb-2" style={{ backgroundColor: "#FFFF0060" }}>
                                <p className="fonts">Last Inserted Row ID</p>
                                <p className="fonts text-center">{lastID}</p>
                            </div>
                        </div>
                        <div className="col-md-4" style={{ width: 'fit-content' }}>
                            <div className="px-4 py-4 " style={{ backgroundColor: 'blue', height: 500, overflowY: 'auto' }}>
                                <pre style={{ color: 'white', }}>{lastID ? JSON.stringify(newRow, null, 2) : 'The entered data row will be displayed here'}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </form >
        </div >
    );
}

export default InsertForm;