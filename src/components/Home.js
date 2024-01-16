import InsertForm from "./InsertForm";


const Home = () => {

    return (
        <>
            <div className="row justify-content-center" style={{ backgroundColor: "blue", width: 'fit-content' }}>
                <div>
                    <h1 className="fonts mt-5" style={{ color: 'white', fontSize: 45, fontWeight: 700, textAlign: 'center' }}>Manual Wood Intake Dashboard</h1>
                    <h5 className="text-center mb-5 fonts" style={{ color: 'white' }}> Robotlab Minor Makathon January 2024 </h5>
                </div>
                <InsertForm />
            </div>
        </>

    );
}

export default Home;