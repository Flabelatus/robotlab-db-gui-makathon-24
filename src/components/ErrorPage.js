import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    const navigate = useNavigate();

    const handleNavigatePrevious = () => {
        navigate(-1);
    }
    return (
        <div className="container mt-5" style={{ backgroundColor: "#50f" }}>
            <div className="row">
                <div className="col-md-6 offset-md-3" style={{ color: 'white' }}>
                    <h1 className="mt-3">Oops!</h1>
                    <p>Sorry, This section is not implemented yet. Do you have questions? contact j.jooshesh@hva.nl</p>
                    <p>
                        <em>{error.statusText || error.message}</em>
                    </p>
                    <a className="btn btn-submit-light-small fonts" onClick={handleNavigatePrevious}>Back</a>
                </div>
            </div>
        </div>
    )
}