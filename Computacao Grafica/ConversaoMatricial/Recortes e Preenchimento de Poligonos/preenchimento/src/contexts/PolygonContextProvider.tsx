import { useState } from "react";
import { createContext, ReactNode } from "react";
import { polygon } from "../PolygonObject/polygon";
import p5Types from 'p5';

type PolygonContextProviderProps = {
  children: ReactNode;
}

interface PointType {
  x: number,
  y: number,
}

interface PolygonType {
  borderColor: string;
  fillColor: string;
  vertices: PointType[];
  isOpen: boolean;
  defineEdgeIntersections: (p1: PointType, p2: PointType) => void;
  close: (p5: p5Types) => void;
  reset: () => void;
  setColors: (p5: p5Types, newBorderColor: string, newFillColor: string) => void;
}

interface PolygonContextType {
  polygonBorderColor: string;
  polygonFillColor: string;
  polygon: PolygonType;
  colorsWasChanged: boolean;
  setPolygonBorderColor: (value: string) => void;
  setPolygonFillColor: (value: string) => void;
  setColorsWasChanged: (value: boolean) => void;
}

export const PolygonContext = createContext({} as PolygonContextType);

export function PolygonContextProvider(props: PolygonContextProviderProps) {
  const [polygonBorderColor, setPolygonBorderColor] = useState(polygon.borderColor);
  const [polygonFillColor, setPolygonFillColor] = useState(polygon.fillColor);
  const [colorsWasChanged, setColorsWasChanged] = useState(false);

  return (
    <PolygonContext.Provider value={{
      polygon,
      polygonBorderColor,
      polygonFillColor,
      colorsWasChanged,
      setColorsWasChanged,
      setPolygonBorderColor,
      setPolygonFillColor,
    }}>
      {props.children}
    </PolygonContext.Provider>
  )
}