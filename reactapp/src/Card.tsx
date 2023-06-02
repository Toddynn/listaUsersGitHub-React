import { BsTrash3 } from "react-icons/bs";
import "./Card.css";

export function Card(props: any){
    return(
        <div className="listUsers flex gap-2">
            <div className="flex items-center">
                <p><strong>{props.name}</strong> - {props.time}</p>
            </div>
            <div className="flex items-center">
                <button onClick={props.onClickDelete}>
                    <BsTrash3 color="red"></BsTrash3>
                </button>
            </div>
        </div>
    )
}

