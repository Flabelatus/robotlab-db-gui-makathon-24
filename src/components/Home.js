import { Link, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import InsertForm from "./InsertForm";


const Home = () => {

    return (
        <>
            <div className="row justify-content-center" style={{ backgroundColor: "blue" }}>
                <div>
                    <h1 style={{ color: 'white', fontFamily: 'arial', fontSize: 60, fontWeight: 800, textAlign: 'center' }}>Wood Data</h1>
                    <h5 className="text-center mb-5" style={{ color: 'white' }}> Robotlab Minor Makathon January 2024 </h5>
                </div>
                <InsertForm />
            </div>

        </>

    );
}

export default Home;