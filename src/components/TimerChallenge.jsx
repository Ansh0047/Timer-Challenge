export default function TimerChallenge({titile, targetTimer}){
    return <section className="challenge">
        <h2>{titile}</h2>
        <p className="challenge-time">
            {targetTimer} second{targetTimer > 1 ? 's' : ''}
        </p>
        <p>
           <button>Start Challenge</button> 
        </p>
        <p className="active">
            Timer is running.../Timer is inactive
        </p>
    </section>
}