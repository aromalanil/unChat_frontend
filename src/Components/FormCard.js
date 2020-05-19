import React from 'react';

const FormCard = ({title,subtitle,children}) => {
    return (
        <div className="msg-box">
            <div className="box-content">
                <div className="box-head">
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                </div>
                {children}
            </div>
        </div>
    )
}

export default FormCard;
