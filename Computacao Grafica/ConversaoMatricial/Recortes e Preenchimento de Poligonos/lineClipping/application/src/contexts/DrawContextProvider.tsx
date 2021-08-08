import { createContext, ReactNode } from "react";

type DrawContextProviderProps = {
  children: ReactNode;
};

interface DrawContextType {
  lines: LineType[];
}

interface PointType {
  x: number;
  y: number;
}

interface LineType {
  initialPoint: PointType;
  endPoint: PointType;
}

export const DrawContext = createContext({} as DrawContextType);

export function DrawContextProvider(props: DrawContextProviderProps) {

  let lines: LineType[] = [];

  return (
    <DrawContext.Provider
      value={{
        lines,
      }}
    >
      {props.children}
    </DrawContext.Provider>
  );
}

