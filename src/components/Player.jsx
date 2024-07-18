import { useState , useRef} from "react";

export default function Player() {
  // When you want a component to “remember” some information, 
  // but you don’t want that information to trigger new renders, you can use a ref.
  const playerName = useRef();
  const [enterPlayerName,setPlayerName] = useState(null);

  function handleClick(){
    // here we are accessing the playerName ref current object which accesses the value of the input as we have
    // set the ref prop right there in the input element and using the state change function to set the value of 
    // enterPlayerName 
    setPlayerName(playerName.current.value);
    // now to clear the input we can use this syntax as playerName refers to the input element and we can change
    // the value using particular propert(value)
    playerName.current.value = '';
  }

  return (
    <section id="player">
      <h2>Welcome {enterPlayerName ?? 'unknown entity'}</h2>
      <p>
        {/* here i have set the ref prop which will persist a mutable value without causing re-renders.  */}
        <input ref={playerName} type="text"/>
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
