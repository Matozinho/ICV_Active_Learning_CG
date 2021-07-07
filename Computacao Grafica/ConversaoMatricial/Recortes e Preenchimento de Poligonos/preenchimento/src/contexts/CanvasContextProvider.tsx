import { useState } from "react";
import { createContext, ReactNode } from "react";

type CanvasContextProviderProps = {
  children: ReactNode;
}

interface CanvasContextType {
  clearCanvas: boolean;
  setClearCanvas: (value: boolean) => void;
}

export const CanvasContext = createContext({} as CanvasContextType);

export function CanvasContextProvider(props: CanvasContextProviderProps) {
  const [clearCanvas, setClearCanvas] = useState(false);

  return (
    <CanvasContext.Provider value={{
      clearCanvas,
      setClearCanvas
    }}>
      {props.children}
    </CanvasContext.Provider>
  )
}