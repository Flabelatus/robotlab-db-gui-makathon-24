import InsertForm from "./InsertForm";


const Home = () => {

    return (
        <>
            <div className="row justify-content-center" style={{ backgroundColor: "blue" }}>
                <div>
                    <h1 className="fonts" style={{ color: 'white', fontSize: 60, fontWeight: 700, textAlign: 'center' }}>Wood Data</h1>
                    <h5 className="text-center mb-5 fonts" style={{ color: 'white' }}> Robotlab Minor Makathon January 2024 </h5>
                </div>
                <InsertForm />
            </div>
        </>

    );
}

export default Home;