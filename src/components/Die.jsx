


export default function Die(props){
    const styles={
        backgroundColor:props.isHeld ? "#105580":"#FFFFFF"
    }
    return (
        <div 
        className="dice"
        style={styles}
        onClick={props.holdDice}
        >
            {props.value}
        </div>
    )
}