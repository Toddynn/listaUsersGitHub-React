import { Button } from "react-bootstrap";
import "./Card.css";

export type CardProps ={
    name:string,
    time:string;
}

export function Card(props: CardProps){
    return(
        <div className="listUsers">
            <div className="col-8">
                <p><strong>{props.name}</strong> - {props.time}</p>
            </div>
            {/* <div className="col-4">
                <button><i className="bi bi-trash"></i></button>
            </div> */}
        </div>
    )
}

