import InsertForm from "./InsertForm";
import { PCDViewer } from "./PCDViewer";
import PCD from './../pcd/0698_EU_Wood_intake_00000079_Neutral.pcd'

const DigitalIntake = () => {

    return (
        <>
            <div className="row justify-content-center" style={{ backgroundColor: "#5500ff", width: 'fit-content' }}>
                <div>
                    <h1 className="fonts mt-5 mb-5" style={{ color: 'white', fontSize: 45, fontWeight: 700, textAlign: 'center' }}>Wood intake dashboard</h1>
                    {/* <h5 className="text-center mb-5 fonts" style={{ color: 'white' }}> Robotlab </h5> */}
                </div>
                <PCDViewer pcdFile={PCD}/>
            </div>
        </>
    );
}

export default DigitalIntake;