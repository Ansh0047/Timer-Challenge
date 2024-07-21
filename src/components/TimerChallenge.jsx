import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({titile, targetTimer}){
    const timer = useRef();
    const dialog = useRef();

    const[timerStarted,setTimerStarted] = useState(false);
    const [timerExpired,setTimeExpired] = useState(false);

    // let timer;   // will store the timer pointer returned by the setTimeout
    // we can not use this as it will lost the previous timer and on state change will refer to new one.
    // so we use ref instead of normal behaviour.
    function handleStart(){
        // converted targetTimer to milliseconds
        // and if this function is executed right after target time ends and player stops
        timer.current = setTimeout(() => {     // it will return the pointer to the timer runnning
            setTimeExpired(true);
            setTimerStarted(false);
            dialog.current.showModal();
        }, targetTimer*1000);
        
        setTimerStarted(true);
    }

    function handleStop(){
        // clear timeout function will take the pointer of the timer and stops the timer set by the setTimeout 
        clearTimeout(timer.current);
        setTimerStarted(false);
    }

    return(
    <>
        {/* so if timer got expired we will see the dialog box which shows the output */}
        <ResultModal ref={dialog} result='lost' targetTime={targetTimer} />
        <section className="challenge">
            <h2>{titile}</h2>
            {/* {timeExpired && <p>You lost!</p>} */}
            <p className="challenge-time">
                {targetTimer} second{targetTimer > 1 ? 's' : ''}
            </p>
            <p>
                {/* in onClick we have used the ternary check if our timer has starte then we have to 
                point our onClick to handleStop function as it has started else to handleStart */}
            <button onClick={timerStarted ? handleStop : handleStart}>
                    {timerStarted ? 'Stop' :'Start'} Challenge
                </button> 
            </p>
            <p className={timerStarted ? 'active' : undefined}>
                {timerStarted ? 'Timer is running...' : 'Timer is inactive'}
            </p>
        </section>
    </>
    );
}