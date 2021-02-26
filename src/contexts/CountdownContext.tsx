import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}


export const CountdownContext = createContext({} as CountdownContextData);
let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setHasFinished(false);
    setTime(0.1 * 60);

  }

  //Na hora de fazer a verrificacao e a verificacao estiver false o usseEffect vai parar de executar o setTime e caso eseteja true ele continua 

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1); //Diminue o tempo de 1 em 1 , esse efeito acontece quando eu clicar no botao 
      }, 1000) //Tempo que leva pra acontecer 1 segundo
    }
    else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]); //Colocando a dependecia time o tempo vai ficar diminuindo de 1 em 1 ate chegar em 0 e ele ve que zero nao e maior que zero ae para 

  return (
    <CountdownContext.Provider value={
      {
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown,
      }}>
      {children}
    </CountdownContext.Provider>
  );
}
