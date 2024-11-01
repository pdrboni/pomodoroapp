import { PomodoroTimer } from "./components/pomodoro-timer"

interface Props {
  className: string;
}

function App(props: Props) {


  return (
    <div className={props.className}>
      <PomodoroTimer
        pomodoroTime={1500}
        shortRestTime={300}
        longRestTime={900}
        cycles={4}
      />
    <div className="details">
      <p>iueshafiuehwviuhaewv</p>
      <p>iueshafiuehwviuhaewv</p>
      <p>iueshafiuehwviuhaewv</p>
      <p>iueshafiuehwviuhaewv</p>
      <p>iueshafiuehwviuhaewv</p>
    </div>
    
  </div>
  )
}

export default App
