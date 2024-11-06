import { createContext, useContext, useReducer, Dispatch, ReactNode } from 'react';
import { secondsToTime } from '../utils/secondsToTime';

const StatusContext = createContext<StatusState | null>(null);
const StatusDispatchContext = createContext<Dispatch<Action> | undefined>(undefined);

const PomodoroInfoContext = createContext<PomodoroInfoState | null>(null);
const PomodoroInfoDispatchContext = createContext<Dispatch<Action> | undefined>(undefined);


export default function StatusProvider({ children }: StatusProviderProps) {
  const [status, dispatch] = useReducer(
    statusReducer,
    initialStatus
  );

  return (
    <StatusContext.Provider value={status}>
      <StatusDispatchContext.Provider value={dispatch}>
        {children}
      </StatusDispatchContext.Provider>
    </StatusContext.Provider>
  );
}

export function PomodoroInfoProvider({ children }: PomodoroInfoProviderProps) {
  const [pomodoroInfo, dispatch] = useReducer(
    pomodoroInfoReducer,
    initialPomodoroInfo
  );

  return (
    <PomodoroInfoContext.Provider value={pomodoroInfo}>
      <PomodoroInfoDispatchContext.Provider value={dispatch}>
        {children}
      </PomodoroInfoDispatchContext.Provider>
    </PomodoroInfoContext.Provider>
  );
}

export function usePomodoroInfo() {
  return useContext(PomodoroInfoContext);
}

export function usePomodoroInfoDispatch() {
  const context = useContext(PomodoroInfoDispatchContext);
  if (context === undefined) {
    throw new Error('usePomodoroInfoDispatch must be used within a PomodoroInfoProvider');
  }
  return context;
}

export function useStatus() {
  return useContext(StatusContext);
}

export function useStatusDispatch() {
  const context = useContext(StatusDispatchContext);
  if (context === undefined) {
    throw new Error('useStatusDispatch must be used within a StatusProvider');
  }
  return context;
}

function pomodoroInfoReducer(state: PomodoroInfoState, action: Action): PomodoroInfoState {
  switch (action.type) {
    case 'add-working-time': {
      return { ...state, workingTime: (action.workingTime + state.workingTime) };
    }
    case 'add-number-pomodoros': {
      return { ...state, numberPomodoros: state.numberPomodoros + 1 };
    }
    case 'add-number-cycles': {
      return { ...state, numberCycles: state.numberCycles + 1 };
    }
    default: {
      throw new Error(`Unknown action`);
    }
  }
}

function statusReducer(state: StatusState, action: Action): StatusState {
  switch (action.type) {
    case 'work-running': {
      return { ...state, workRunning: true };
    }
    case 'work-stopped': {
      return { ...state, workStopped: true };
    }
    case 'work-resumed': {
      return { ...state, workResumed: true };
    }
    case 'short-running': {
      return { ...state, shortRunning: true };
    }
    case 'short-stopped': {
      return { ...state, shortStopped: true };
    }
    case 'short-resumed': {
      return { ...state, shortResumed: true };
    }
    case 'long-running': {
      return { ...state, longRunning: true };
    }
    case 'long-stopped': {
      return { ...state, longStopped: true };
    }
    case 'long-resumed': {
      return { ...state, longResumed: true };
    }
    default: {
      throw new Error(`Unknown action`);
    }
  }
}

interface StatusProviderProps {
  children: ReactNode;
}

interface PomodoroInfoProviderProps {
  children: ReactNode;
}

type Action =
  | { type: 'work-running' }
  | { type: 'work-stopped' }
  | { type: 'work-resumed' }
  | { type: 'short-running' }
  | { type: 'short-stopped' }
  | { type: 'short-resumed' }
  | { type: 'long-running' }
  | { type: 'long-stopped' }
  | { type: 'long-resumed' }
  | { type: 'add-number-pomodoros' }
  | { type: 'add-working-time', workingTime: number }
  | { type: 'add-number-cycles' };

export interface StatusState {
  workRunning: boolean;
  shortRunning: boolean;
  longRunning: boolean;
  workStopped: boolean;
  shortStopped: boolean;
  longStopped: boolean;
  workResumed: boolean;
  shortResumed: boolean;
  longResumed: boolean;
}

export interface PomodoroInfoState {
  numberCycles: number;
  workingTime: number;
  numberPomodoros: number;
}

const initialStatus: StatusState = {
  workRunning: false,
  shortRunning: false,
  longRunning: false,
  workStopped: false,
  shortStopped: false,
  longStopped: false,
  workResumed: false,
  shortResumed: false,
  longResumed: false,
};

const initialPomodoroInfo: PomodoroInfoState = {
  numberCycles: 0,
  workingTime: 0,
  numberPomodoros: 0,
};
