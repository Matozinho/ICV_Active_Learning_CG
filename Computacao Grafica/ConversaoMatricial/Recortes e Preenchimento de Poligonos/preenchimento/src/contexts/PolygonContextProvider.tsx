import { useState } from "react";
import { createContext, ReactNode } from "react";
import { Polygon } from "../classes/Polygon";
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
  polygonColor: string;
  vertices: PointType[];
  intersections: Map<number, number[]>;
  isOpen: boolean;
  maxCoordinantes: PointType;
  minCoordinantes: PointType;
  changeBorderColor: (newColor: string) => void;
  changePolygonColor: (newColor: string) => void;
  defineMaxsAndMins: () => void;
  scanLine: (p1: PointType, p2: PointType) => void;
  fillPolygon: (p5: p5Types) => void;
  reset: () => void;
}

// TODO: Fazer tipagem do polygon
interface PolygonContextType {
  polygonBorderColor: string;
  polygonFillColor: string;
  polygon: PolygonType;
  setPolygonBorderColor: (value: string) => void;
  setPolygonFillColor: (value: string) => void;
}

export const PolygonContext = createContext({} as PolygonContextType);

export function PolygonContextProvider(props: PolygonContextProviderProps) {
  const [polygonBorderColor, setPolygonBorderColor] = useState("#000000");
  const [polygonFillColor, setPolygonFillColor] = useState("#000000");

  var polygon = new Polygon(polygonBorderColor, polygonFillColor);

  return (
    <PolygonContext.Provider value={{
      polygon,
      polygonBorderColor,
      polygonFillColor,
      setPolygonBorderColor,
      setPolygonFillColor,
    }}>
      {props.children}
    </PolygonContext.Provider>
  )
}