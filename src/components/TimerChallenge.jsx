import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ titile, targetTimer }) {
  const timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTimer * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTimer * 1000;

  // to manually delete our timer
  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
    // console.log(timeRemaining);
  }

  function handleReset(){
    setTimeRemaining(targetTimer * 1000);
  }

  // let timer;   // will store the timer pointer returned by the setTimeout
  // we can not use this as it will lost the previous timer and on state change will refer to new one.
  // so we use ref instead of normal behaviour.
  function handleStart() {
    timer.current = setInterval(() => {
      // it will return the pointer to the timer runnning
      // prevTimeRemaining = this is the feature that it will automatically get the prev old time
      // and we are deducting the 10 milisecodns during the state change
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);

    // setTimerStarted(true);
  }

  function handleStop() {
    // clear timeout function will take the pointer of the timer and stops the timer set by the setTimeout
    // clearTimeout(timer.current);
    // and we have to use the clearInterval to stop the setInterval function
    clearInterval(timer.current);
    // setTimerStarted(false);
    dialog.current.open();
  }

  return (
    <>
      {/* so if timer got expired we will see the dialog box which shows the output */}
      <ResultModal
        ref={dialog}
        targetTime={targetTimer}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{titile}</h2>
        {/* {timeExpired && <p>You lost!</p>} */}
        <p className="challenge-time">
          {targetTimer} second{targetTimer > 1 ? "s" : ""}
        </p>
        <p>
          {/* in onClick we have used the ternary check if our timer has starte then we have to 
                point our onClick to handleStop function as it has started else to handleStart */}
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Timer is running..." : "Timer is inactive"}
        </p>
      </section>
    </>
  );
}
