const Alert = (props) => {
    return (
        <div className="col-md-6 offset-md-3 px-5" style={{backgroundColor: 'blue'}}>
            <div className={"alert mt- px-5 " + props.className} role="alert" style={{borderRadius: 16, border: '0px solid #00000000' }}>
                <h3 className="h5 text-center">{props.message}</h3>
            </div>
        </div>
    );
}

export default Alert;