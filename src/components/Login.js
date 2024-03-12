import { useState } from "react";
import Input from "./Input";
import { useNavigate, useOutletContext } from "react-router-dom";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setLogged } = useOutletContext()
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

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

        fetch(`${process.env.REACT_APP_BACKEND}/login`, requestOptions)
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

        <div className="row justify-content-center" style={{ height: "70vh", backgroundColor: "#0000ff" }}>
            <div className="justify-content-center mb-0 px-5" style={{ width: 'fit-content' }}>
                <div className="col-md-4 offset-md-3">
                    <button
                        className="btn btn-submit-light-small mt-5 mb-5"
                        style={{ width: 'fit-content', height: 'fit-content', marginLeft: '3%' }}
                        onClick={handleGoBack}
                    >
                        Go Back
                    </button>

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
                            <button className="btn btn-submit-dark-small mt-4" >
                                Subimt
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}