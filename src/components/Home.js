import { Card, CardBody, Container } from "reactstrap";
import CoverImage from './../images/cover.jpg';

export const Home = () => {
    return (
        <div className="row justify-content-center">
           <div className="px-5 py-5"  style={{ height: "100vh", backgroundColor: '#ffffffcc', backgroundImage: `url(${CoverImage})`, backgroundSize: 'cover', backgroundBlendMode: 'overlay', borderRadius: 8 }}>
           <h1 className="fonts mt-5 mb-5 text-center" style={{ color: 'blue', fontSize: 45, fontWeight: 700, textAlign: 'center' }}>Welcome to Robot Lab</h1>
           </div>
        </div>
    );
}