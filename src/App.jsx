import Player from './components/Player.jsx';
import TimerChallenge from './components/TimerChallenge.jsx';

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimerChallenge titile="Easy" targetTimer={1}/>
        <TimerChallenge titile="Not Easy" targetTimer={5}/>
        <TimerChallenge titile="Getting tough" targetTimer={10}/>
        <TimerChallenge titile="Pros only" targetTimer={15}/>
      </div>
    </>
  );
}

export default App;
