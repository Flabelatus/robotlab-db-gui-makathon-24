import InsertForm from "./InsertForm";


const Home = () => {

    return (
        <>
            <div className="row justify-content-center" style={{ backgroundColor: "#0000ff", width: 'fit-content' }}>
                <div>
                    <h1 className="fonts mt-5 mb-5" style={{ color: 'white', fontSize: 45, fontWeight: 700, textAlign: 'center' }}>Manual wood intake dashboard</h1>
                    {/* <h5 className="text-center mb-5 fonts" style={{ color: 'white' }}> Robotlab </h5> */}
                </div>
                <InsertForm />
            </div>
        </>
    );
}

export default Home;