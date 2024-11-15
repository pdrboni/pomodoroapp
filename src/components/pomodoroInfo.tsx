import { usePomodoroInfo } from "../context/statusContext";

interface Props {
  className?: string;
}

export function PomodoroInfo(props: Props): JSX.Element {
  const pomodoroInfo = usePomodoroInfo();

  return (
    <div className={props.className}>
      <div className="cycle-info-container">
        <p style={{ marginTop: "10px" }}>Cycles info:</p>
        <p>Number of cycles: {pomodoroInfo?.numberCycles}</p>
        <p>Working Time: {pomodoroInfo?.workingTime} min</p>
        <p>Number of pomodoros: {pomodoroInfo?.numberPomodoros}</p>
      </div>
    </div>
  );
}
