import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <div className="row">
                <footer className="text-center container-fluid py-2" style={{ backgroundColor: "#eee" }}>
                    <div className="row">
                        <div className="col mt-3">
                            <p style={{ fontWeight: 600, color: '#777' }}>Robotlab Wood Data entery GUI</p>
                        </div>
                        <div className="col mt-3">
                            <p style={{ fontWeight: 600, color: '#777' }}>Contact: j.jooshesh@hva.nl</p>
                        </div>
                        <div className="col mt-3">
                            <p style={{ fontWeight: 600, color: '#777' }}>API Documentation</p>
                        </div>
                        <div className="col mt-3">
                            <p style={{ fontWeight: 600, color: '#777' }}>Socials</p><Link to="https://github.com/Flabelatus/woodPlatformGo/tree/master" className="fa-brands fa-github" /> <br /><i className="fa-brands fa-youtube" />
                        </div>
                    </div>
                </footer>
            </div>

        </>

    )
}

export default Footer;