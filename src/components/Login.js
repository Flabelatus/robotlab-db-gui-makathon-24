import { useState } from "react";
import Input from "./Input";
import { useNavigate, useOutletContext } from "react-router-dom";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { devMode } = useOutletContext();
    const { setLogged } = useOutletContext()
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        var url = `${process.env.REACT_APP_BACKEND}`;
        if (devMode) {
            url = `https://robotlab-residualwood-dev.onrender.com`;
        };

        var payload = {
            username: username,
            password: password
        };

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(payload)
        };

        fetch(`${url}/login`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.access_token) {
                    sessionStorage.setItem("jwtToken", data.access_token);
                    setLogged(true);
                    navigate("/");
                } else {
                    alert(data.message);
                }

            }).catch((error) => {
                console.log(error);
            });
    };

    return (

        <div className="row justify-content-center py-" style={{ height: "100vh", minHeight: 600, backgroundColor: "#5500ff" }}>
            
            <div className="justify-content-center mb-0 px-5 mt-5" style={{ width: 'fit-content' }}>
            <button
                className="btn btn-submit-light-small mt-5 mb-3"
                style={{ width: 'fit-content', height: 'fit-content', marginLeft: '3%', fontSize: 14 }}
                onClick={handleGoBack}
            >
                Go Back
            </button>
                <div className="col-md-3 offset-0 ">
                    
                    <form className="container px-5 py-5" style={{ backgroundColor: 'white', width: 'fit-contnet' }} onSubmit={handleSubmit}>
                        <Input
                            className="container text-cetner"
                            title="Username"
                            type="text"
                            name="username"
                            id="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                            className="container text-cetner"
                            title="Password"
                            type="password"
                            name="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="row px-5">
                            <button className="btn btn-submit-dark-small mt-4" style={{fontSize: 14, fontWeight: 700}}>
                                Subimt
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}