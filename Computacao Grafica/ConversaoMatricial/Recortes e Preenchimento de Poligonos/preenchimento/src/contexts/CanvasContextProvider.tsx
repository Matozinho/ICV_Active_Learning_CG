import { useState } from "react";
import { createContext, ReactNode } from "react";

type CanvasContextProviderProps = {
  children: ReactNode;
};

interface CanvasContextType {
  clearCanvas: boolean;
  rightButtonClicked: boolean;
  setRightButtonClicked: (value: boolean) => void;
  setClearCanvas: (value: boolean) => void;
}

export const CanvasContext = createContext({} as CanvasContextType);

export function CanvasContextProvider(props: CanvasContextProviderProps) {
  const [clearCanvas, setClearCanvas] = useState(false);
  const [rightButtonClicked, setRightButtonClicked] = useState(false);

  return (
    <CanvasContext.Provider
      value={{
        clearCanvas,
        rightButtonClicked,
        setClearCanvas,
        setRightButtonClicked,
      }}
    >
      {props.children}
    </CanvasContext.Provider>
  );
}

