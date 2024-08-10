import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TableDetails({
    onClose,    
}) {

const [details, setDetails] = useState([]);
const {itemId} = useParams();

useEffect(() => {
    try {
        (async ()=> {
            const response = await fetch(`http://localhost:3030/api/items/${itemId}`)
            const result = await response.json()
            console.log(result)
            setDetails(result[0])
            
        })()
    }catch(err){
        console.error(err);
    }    
}, [itemId])


    return (
        <div className="overlay__table">
        <div className="backdrop" onClick={onClose}></div>
        <div className="modal">
            <div className="detail-container">
                <header className="headers__table">
                    <h2>User Detail</h2>
                    <button className="btn close" onClick={onClose}>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark"
                            className="svg-inline--fa fa-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <path fill="currentColor"
                                d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z">
                            </path>
                        </svg>
                    </button>
                </header>
                <div className="content__table">
                    <div className="image-container__table">
                        <img src={''} alt="avatar" className="image" />
                    </div>
                    <div className="table-details">
                        <p>User Id: <strong>{details.id}</strong></p>
                        <p>
                            name:
                            <strong>{details.name}</strong>
                        </p>
                        <p>Description: <strong>{details.description}</strong></p>
                        <p>Amout: <strong>{details.amount}</strong></p>
                        <p>
                            Date:
                            <strong> {details.date}</strong>
                        </p>

                        <p>Created on: <strong>{}</strong></p>
                        <p>Modified on: <strong>{}</strong></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}
