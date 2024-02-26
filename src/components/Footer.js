import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <div className="row" style={{backgroundColor:'blue'}}>
                <footer className="text-center container-fluid py-2">
                    <div className="row">
                        <div className="col mt-4">
                            <p style={{ fontWeight: 300, color: 'white', fontSize: 16 }}>Wood Data entery GUI</p>
                        </div>
                        <div className="col mt-4">
                            <p style={{ fontWeight: 300, color: 'white', fontSize: 16 }}>Contact: j.jooshesh@hva.nl</p>

                        </div>
                        <div className="col mt-4">
                            <a href="https://robotlab-residualwood.onrender.com/api-docs" rel="noopener noreferrer" target="_blank" style={{ fontWeight: 300, color: 'white', fontSize: 16 }}>API Documentation</a>
                        </div>
                        <div className="col mt-4">
                            <p style={{ fontWeight: 300, color: 'white', fontSize: 16 }}>Version Feb '24</p><Link to="https://github.com/Flabelatus/woodPlatformGo/tree/master" className="fa-brands fa-github" /> <br /><i className="fa-brands fa-youtube" />
                        </div>
                    </div>
                </footer>
            </div>

        </>

    )
}

export default Footer;