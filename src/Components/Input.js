import React from 'react'

const Input = ({ icon, title, type, name, inputChange, value, info }) => {

    const handleInputChange = e => {
        e.preventDefault();
        inputChange(name, e.target.value);
    }

    return (
        <div className={`input-wrapper ${info && (info.type==='error' ? "input-error" : "input-warning")}`}>
            <label htmlFor={name}>{title}</label>
            <div>
                <i className={`fa ${(info ? (info.type==='error' ? "fa-exclamation-circle" : "fa-exclamation-triangle") : icon)}`}></i>
                <input type={type}
                    name={name}
                    placeholder={title}
                    onChange={handleInputChange}
                    value={value} />
                {info && (info.type==='error'
                ? <p className="error-msg">{info.msg}</p>
                : <p className="warning-msg">{info.msg}</p>)}
            </div>
        </div>
    )
}

export default Input
