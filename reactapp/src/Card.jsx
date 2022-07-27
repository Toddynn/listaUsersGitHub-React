import "./Card.css";

function Card(props){
    return(
        <div className="listUsers">
            <p><strong>{props.name}</strong> - {props.time}</p>
        </div>
    )
}
export default Card;