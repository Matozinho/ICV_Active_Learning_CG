import { createContext, ReactNode } from "react";

type DrawContextProviderProps = {
  children: ReactNode;
};

interface DrawContextType {
  lines: LineType[];
}

interface LinePointType {
  x: number;
  y: number;
  clippingCode: number;
}

interface LineType {
  initialPoint: LinePointType;
  endPoint: LinePointType;
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

