import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Die from "./components/Die";
import "./App.css";
import Confetti from "react-confetti"

export default function App() {
  const [dice, setDice] = useState(allNewDie);
  const [flag,setFlag]=useState(false);
  const [count,setCount]=useState(0);

  useEffect(()=>{
    const held=dice.every(die =>die.isHeld)
    const firstValue = dice[0].value
    const val=dice.every(die => die.value===firstValue)
    if(held&&val){
      setFlag(true)
    }
  },[dice])

  function generate(){
    const dice = {
      value:Math.ceil(Math.random()*6),
      isHeld:false,
      id:nanoid()
    }
    return dice
  }
  
  function allNewDie(){
    
    let array=[]
    for(let i=0;i<10;i++){
      
      array.push(generate());
    }
    return array
  }

  function rollDice(){
    if(!flag){
    setDice(oldDie=>oldDie.map(die =>{
      return die.isHeld ? die:generate()
    }))
  }
  else{
    setFlag(false)
    setCount(-1)
    setDice(allNewDie())
  }
  setCount(prevCount => prevCount+1)
  }

  function holdDice(id){
    setDice(oldDie =>{
      return oldDie.map(die =>{
        return die.id===id ? {...die,isHeld:!die.isHeld}:die
      })
    })
  }

  
  const diceElements= dice.map(die =>{
    return <Die key={die.id}  value={die.value} isHeld={die.isHeld} holdDice={()=>holdDice(die.id)}/>
  })
  return (
    <main>
      
      <div className="main-container">
      {flag&&<Confetti/>}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {diceElements}
        </div>
        <div>Total Counts : {count}</div>
       <button 
       className="roll-dice"
       onClick={rollDice}
       >{flag ? "New game" : "Roll"}</button>
      </div>
    </main>
  );
}
