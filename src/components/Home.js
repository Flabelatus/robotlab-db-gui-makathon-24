import { Link, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import InsertForm from "./InsertForm";


const Home = () => {
    const { jwtToken } = useOutletContext();

    useEffect(() => {
    }, [])

    return (
        <>
            <div className="row justify-content-center" style={{ backgroundColor: "#ffffff" }}>
                <h1 style={{ color: 'blue', fontFamily: 'revert', fontSize: 40, fontWeight: 800, textAlign: 'center' }}>INSERT</h1>
                <hr style={{width: 300}}></hr>
                <InsertForm />
            </div>

        </>

    );
}

export default Home;