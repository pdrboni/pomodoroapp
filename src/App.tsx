import { PomodoroTimer } from "./components/pomodoro-timer"
import { StudyDetails } from "./components/studyDetails";
import { History } from "./components/history";
import StatusProvider, { PomodoroInfoProvider } from "./context/statusContext";

interface Props {
  className: string;
}

function App(props: Props) {


  return (
    <PomodoroInfoProvider>
      <StatusProvider>
        <div className={props.className}>
          <PomodoroTimer
            pomodoroTime={60}
            shortRestTime={3}
            longRestTime={9}
            cycles={4}
          />
        <div className="details-container">
          <div className="details history">
            <History />
          </div>
          <div className="details study">
            <StudyDetails />
          </div>
        </div>
        
      </div>
      </StatusProvider>
    </PomodoroInfoProvider>
  )
}

export default App
