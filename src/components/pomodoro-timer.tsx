import React, { useEffect, useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { Button } from "./button";
import { Timer } from "./timer";

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {

  const [mainTime, setMainTime] = useState(props.pomodoroTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);

  useEffect(() => {
    if(working) document.body.classList.add('working')
  },[working])

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, timeCounting ? 1000 : null);

  const configureWork = () => {
    setTimeCounting(true);
    setWorking(true);
  }

  return (
    <>
      <div className="pomodoro">
        <h2>You are working</h2>
        <Timer mainTime={mainTime} />
        <div className="button-container">
          <Button onClick={configureWork} text="Work" className="button" />
          <Button onClick={() => console.log('oi')} text="Stop" className="button" />
          <Button onClick={() => setTimeCounting(!timeCounting)} text={!timeCounting ? "Play" : "Pause"} className="button" />
        </div>
      </div>
    </>
  )
}