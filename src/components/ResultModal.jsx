import { forwardRef, useImperativeHandle, useRef } from "react";
import {createPortal} from 'react-dom';

// this forwardRef as the name suggests is used to forward the props
const ResultModal = forwardRef(function ResultModal({ targetTime, remainingTime, onReset },ref) {
  const dialog = useRef();
  // condition check for Lost if we are out of time
  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);         // fixed the precision to 2 digits
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  // we are using this ref to expose those functions returned to other components.
  useImperativeHandle(ref, () => {
    // this fucntion will return the object that returns the functions to be exposed
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2>You lost!</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime}</strong> seconds.
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemainingTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>, 
    document.getElementById('modal')
  );
});

export default ResultModal;
