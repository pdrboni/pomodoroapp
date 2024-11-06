import React, { useEffect, useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { Button } from "./button";
import { Timer } from "./timer";
 
import bellStart from '../sounds/bell-start.mp3'
import bellFinish from '../sounds/bell-finish.mp3'

import { useStatusDispatch } from "../context/statusContext";
import { usePomodoroInfoDispatch } from "../context/statusContext";


const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {

  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [longRestingTime, setLongRestingTime] = useState(props.longRestTime);
  const [shortRestingTime, setShortRestingTime] = useState(props.shortRestTime);
  const [mainTime, setMainTime] = useState(props.pomodoroTime);
  const [cyclesQtdManager, setCyclesQtdManager] = useState(new Array(props.cycles).fill(true));
  const dispatchStatus = useStatusDispatch(); // Get the dispatch function
  const dispatchPomodoroInfo = usePomodoroInfoDispatch(); // Get the dispatch function

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, timeCounting ? 1000 : null);

  const configureWork = () => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(mainTime)
    dispatchStatus({ type: 'work-running'})
    audioStartWorking.play();
  }

  const configureRest = (long: boolean) => {
    setTimeCounting(true);
    setWorking(false);
    setResting(true);
    setMainTime(long ? longRestingTime : shortRestingTime)
    audioStopWorking.play();
  }

  const handleSetTimes = () => {
    
  }

  useEffect(() => {
    if(working) document.body.classList.add('working');
    if(resting) document.body.classList.remove('working');

    console.log(mainTime)
    
    if (mainTime > 0) return;

    if (working && cyclesQtdManager.length > 1) {
      dispatchPomodoroInfo({type: 'add-working-time', workingTime: Math.floor(mainTime/60)})
      configureRest(false)
    } else if (working && (cyclesQtdManager.length <= 1)) {
      dispatchPomodoroInfo({type: 'add-working-time', workingTime: Math.floor(mainTime/60)})
      configureRest(true)
    }
    
    if (resting && cyclesQtdManager.length > 1) {
      cyclesQtdManager.pop()
      dispatchPomodoroInfo({type: 'add-number-cycles'})
      configureWork()
    } else if (resting && cyclesQtdManager.length === 1) {
      dispatchPomodoroInfo({type: 'add-number-cycles'})
      dispatchPomodoroInfo({type: 'add-number-pomodoros'})
      setCyclesQtdManager(new Array(props.cycles).fill(true))
      configureWork()
    }

  },[working, resting, mainTime, cyclesQtdManager, longRestingTime, shortRestingTime])


  return (
    <>
      <div className="pomodoro">

      <div style={{display: "flex", marginBottom: "15px"}}>
        <button 
          className="button-add-details"
          onClick={handleSetTimes}
        >
          Set
        </button>
        <input 
          type="text" 
          className="input-add-task"
          style={{marginRight: "15px"}}
          placeholder="Working time (in minutes)"
          onChange={(e) => {setMainTime(Number(e.target.value)*60)}}
        />

        <input 
          type="text" 
          className="input-add-task"
          style={{marginRight: "15px", width: "180px"}}
          placeholder="Long resting time (in minutes)"
          onChange={(e) => {setLongRestingTime(Number(e.target.value)*60)}}
        />

        <input 
          type="text" 
          className="input-add-task"
          placeholder="Short resting time (in minutes)"
          style={{marginRight: "15px", width: "180px"}}
          onChange={(e) => {setShortRestingTime(Number(e.target.value)*60)}}
        />
      </div>

        { working ?
          <h2>You are working</h2> :
          <h2>You are resting</h2>
        }
        <Timer mainTime={mainTime} />
        <div className="button-container">
          <Button onClick={configureWork} text="Work" className="button" />
          <Button onClick={() => configureRest(false)} text="Rest" className="button" />
          <Button 
          onClick={() => setTimeCounting(!timeCounting)}
          text={!timeCounting ? "Play" : "Pause"}
          className={working || resting ? "button" : "hidden"}
          />
        </div>
      </div>
    </>
  )
}