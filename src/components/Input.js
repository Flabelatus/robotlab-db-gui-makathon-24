import { ForwardedRef, forwardRef } from "react";

const Input = forwardRef((props, ref) => {
    return (
        <div className="mb-3">
            <label htmlFor={props.name} className="form-label" style={{ fontSize: 20, color: "#00000090", fontWeight: 400 }}>
                {props.title}
            </label>
            <div className="">
                <input
                    style={{ color: "#00224C", border: "2px solid #00000060", borderRadius: 8, height: 40, fontSize: 18, width: 250 }}
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

export const InputLong = forwardRef((props, ref) => {
    return (
        <div className="mb-3 text-center" >
            <label htmlFor={props.name} className="form-label" style={{ fontSize: 20, color: "#00000090", fontWeight: 400 }}>
                {props.title}
            </label>
            <div className="">
                <input
                    style={{ color: "#00224C", border: "2px solid #00000060", borderRadius: 8, height: 180, fontSize: 18, width: 400 }}
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
