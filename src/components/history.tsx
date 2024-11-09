import React, { useEffect, useRef, useState } from "react";
import { StatusState, useStatus, PomodoroInfoState, usePomodoroInfo } from "../context/statusContext";

interface Props {
  className?: string;
}

export function History(props: Props): JSX.Element {

  const [historyArray, setHistoryArray] = useState<string[]>([]);
  const status = useStatus();
  const pomodoroInfo = usePomodoroInfo();

  function getStateAndHistory(obj: StatusState | null): void {

    if (!obj) return;

    const trueStatus = Object.keys(obj).filter(
      (key) => (obj as StatusState)[key as keyof StatusState] === true);

    switch (trueStatus[0]) {
      case 'workRunning': {
        setHistoryArray((prev) => [...prev, 'Working cycle started'])
        break
      }
      case 'shortRunning': {
        setHistoryArray((prev) => [...prev, 'Short rest cycle started'])
        break
      }
      case 'longRunning': {
        setHistoryArray((prev) => [...prev, 'Long rest cycle started'])
        break
      }
      case 'workStopped': {
        setHistoryArray((prev) => [...prev, 'Working cycle stopped'])
        break
      }
      case 'shortStopped': {
        setHistoryArray((prev) => [...prev, 'Short rest cycle stopped'])
        break
      }
      case 'longStopped': {
        setHistoryArray((prev) => [...prev, 'Long rest cycle stopped'])
        break
      }
      case 'workResumed': {
        setHistoryArray((prev) => [...prev, 'Working cycle resumed'])
        break
      }
      case 'shortResumed': {
        setHistoryArray((prev) => [...prev, 'Short rest cycle resumed'])
        break
      }
      case 'longResumed': {
        setHistoryArray((prev) => [...prev, 'Long rest cycle resumed'])
        break
      }
    }    
  }

  useEffect(()=>{

    getStateAndHistory(status)
    console.log(historyArray)

  }, [status])

  return (
    <div className={props.className}>
      <p>History:</p>
      <div className="history-container">
        {historyArray.map((hist, index) => { return ( <p key={index}>{hist}</p> ) })}
      </div>

      <p style={{marginTop: "10px"}}>Cycles info:</p>
      <p>Number of cycles: {pomodoroInfo?.numberCycles}</p>
      <p>Working Time: {pomodoroInfo?.workingTime} min</p>
      <p>Number of pomodoros: {pomodoroInfo?.numberPomodoros}</p>
    </div>
  )
}