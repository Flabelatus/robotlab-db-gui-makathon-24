import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
    return (
        <div className="mb-3 fonts">
            <label htmlFor={props.name} className="form-label" style={{ fontSize: 18, color: "blue", fontWeight: 400 }}>
                {props.title}
            </label>
            <div className="fonts">
                <input
                    style={{ color: "#2222FF", border: "0px solid blue", borderRadius: 8, height: 40, fontSize: 15, width: 200, backgroundColor: '#eee' }}
                    type={props.type}
                    className={props.className}
                    placeholder={props.placeholder}
                    ref={ref}
                    id={props.name}
                    autoComplete={props.autoComplete}
                    onChange={props.onChange}
                    defaultValue={props.defaultValue}
                />
            </div>
        </div>
    );
});

export const InputLong = forwardRef((props, ref) => {
    return (
        <div className="mb-3 fonts" >
            <label htmlFor={props.name} className="form-label" style={{ fontSize: 18, color: "blue", fontWeight: 400 }}>
                {props.title}
            </label>
            <div className="">
                <textarea
                    style={{ color: "#2222FF", border: "0px solid blue", borderRadius: 8, height: 150, fontSize: 15, width: 300, backgroundColor: "#eee" }}
                    type={props.type}
                    className={props.className}
                    ref={ref}
                    id={props.name}
                    autoComplete={props.autoComplete}
                    onChange={props.onChange}
                    defaultValue={props.defaultValue}
                />
            </div>
        </div>
    );
});

export default Input;
