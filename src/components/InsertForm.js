import { useEffect, useState } from "react";
import Input, { InputLong } from "./Input";
import { useOutletContext } from "react-router-dom";

const InsertForm = () => {
    const { jwtToken } = useOutletContext();

    const woodData = {
        length: "",
        width: "",
        height: "",
        weight: "",
        type: "",
        name: "",
        source: "",
        storage_location: "",

    }

    const [wood, setWood] = useState(woodData);

    const [selectedOption, setSelectedOption] = useState("");

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
    }, [wood, refresh]);

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
        setWood({ woodData: woodData });
        document.querySelectorAll('input').forEach(input => {
            input.value = ''; // Resets input fields directly
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitted(true);
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
           
                        <div className="col-md-3 container-" style={{ width: 'fit-content' }}>
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
                        <div className="col-md-3 container- justify-content-end" style={{ width: 'fit-content' }}>
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
                        <div className="col-md-4 container-" style={{ width: 'fit-content' }}>
                            <InputLong
                                title="Info"
                                id="info"
                                type="text"
                                className="me-4"
                                name="info"
                                onChange={(e) => handleWoodDataChange("info", e.target.value)}
                            />
                            <div className="row justify-content-center">
                                <button type="submit" className="btn btn-submit-light-large mt-5" style={{ fontSize: 20, width: 150 }}>Submit</button>
                                <button className="btn btn-secondary mt-5 ms-2" style={{ fontSize: 20, width: 150 }} onClick={handleClearForm}>Clear Forms</button>

                            </div>

                        </div>
                    </div>

                    <div className="row justify-content-center">

                    </div>
                </div>
            </form >
        </div >
    );
}

export default InsertForm;