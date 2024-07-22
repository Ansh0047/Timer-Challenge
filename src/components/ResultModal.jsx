import { forwardRef,useImperativeHandle, useRef} from "react";

// this forwardRef as the name suggests is used to forward the props
const ResultModal = forwardRef(function ResultModal({result, targetTime ,timeRemaining}, ref) {
  const dialog = useRef();

  // we are using this ref to expose those functions returned to other components. 
  useImperativeHandle(ref,() => {
    // this fucntion will return the object that returns the functions to be exposed
    return{
      open(){
        dialog.current.showModal();
      }
    };
  });

  return (
    <dialog ref={dialog} className="result-modal">
      <h2>You {result}</h2>
      <p>
        The target time was <strong>{targetTime}</strong> seconds.
      </p>
      <p>
        You stopped the timer with <strong>{timeRemaining} seconds left.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
})

export default ResultModal;