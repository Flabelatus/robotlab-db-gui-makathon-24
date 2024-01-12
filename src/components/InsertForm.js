import { useEffect, useState } from "react";
import Input, { InputLong } from "./Input";

const InsertForm = () => {

    const [wood, setWood] = useState({});
    const [lastID, setLastID] = useState(null);

    const [selectedOption, setSelectedOption] = useState("");

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {

    }, [refresh]);

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
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitted(true);

        const buttonValue = event.nativeEvent.submitter.value;
        if (buttonValue === "submit") {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(wood)
            }
            fetch(`https://robotlab-residualwood.onrender.com/wood`, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    setLastID(data.id);
                    var payload = {
                        event: "Wood added to the Database",
                        wood_id: data.id
                    }
                    const historyRequestOptions = {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload)
                    }
                    fetch(`https://robotlab-residualwood.onrender.com/history`, historyRequestOptions)
                        .catch((e) => {
                            console.error(e);
                        })
                })
                .catch((err) => {
                    console.error(err.message);
                })
                .finally(() => {
                    handleRefreshPage();
                })
        }
    };

    const handleWoodDataChange = (field, value) => {
        setWood(prevWood => ({
            ...prevWood,
            [field]: value
        }));
    };

    return (
        <div className="justify-content-center container mb-5">
            <form onSubmit={handleSubmit} className="mb-5 mt-5">
                <div className=" mt-5 justify-content-center px-4 py-4">
                    <div className="row justify-content-center">
                        <div className="col-md-3" style={{ width: 'fit-content' }}>
                            <Input
                                title="Length"
                                id="length"
                                type="number"
                                className="me-4"
                                name="company-name"
                                onChange={(e) => handleWoodDataChange("length", e.target.value)}
                            />
                            <Input
                                title="Width"
                                id="width"
                                type="number"
                                className="me-4"
                                name="width"
                                onChange={(e) => handleWoodDataChange("width", e.target.value)}
                            />
                            <Input
                                title="Height"
                                id="height"
                                type="number"
                                className="me-4"
                                name="height"
                                onChange={(e) => handleWoodDataChange("height", e.target.value)}
                            />
                            <Input
                                title="Weight"
                                id="weight"
                                type="number"
                                className="me-4"
                                name="weight"
                                onChange={(e) => handleWoodDataChange("weight", e.target.value)}
                            />
                        </div>
                        <div className="col-md-3 justify-content-end" style={{ width: 'fit-content' }}>
                            <Input
                                title="Color"
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
                                    defaultChecked={true}
                                ></input>
                                <label style={{ fontSize: 20, marginLeft: 10, fontWeight: 400, color: "blue" }}>Straight</label>

                                <input
                                    className="form-check-input checkbox-custom ms-4"
                                    type="checkbox"
                                    defaultChecked={false}
                                ></input>
                                <label style={{ fontSize: 20, marginLeft: 10, fontWeight: 400, color: "blue" }}>Planed</label>

                                <input
                                    className="form-check-input checkbox-custom ms-4"
                                    type="checkbox"
                                    defaultChecked={false}
                                ></input>
                                <label style={{ fontSize: 20, marginLeft: 10, fontWeight: 400, color: "blue" }}>Fire Treated</label>
                            </div>
                            <div className="row justify-content-center">
                                <button type="submit" value="submit" className="btn btn-submit-light-large mt-5" style={{ fontSize: 20, width: 150 }}>Submit</button>
                                <button value="clear" className="btn btn-secondary mt-5 ms-2" style={{ fontSize: 20, width: 150 }} onClick={handleClearForm}>Clear Forms</button>
                            </div>
                            <div className="container mt-4 mb-2" style={{ backgroundColor: "#EEE" }}>
                                <p>Last Inserted Row ID: {lastID}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </form >
        </div >
    );
}

export default InsertForm;