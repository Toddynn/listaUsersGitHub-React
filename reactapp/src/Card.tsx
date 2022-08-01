import "./Card.css";

export type CardProps ={
    name:string,
    time:string;
}

export function Card(props: CardProps){
    return(
        <div className="listUsers">
            <p><strong>{props.name}</strong> - {props.time}</p>
        </div>
    )
}
