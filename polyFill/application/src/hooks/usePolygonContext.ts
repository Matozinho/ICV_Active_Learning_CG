import { useContext } from "react";
import { PolygonContext } from "../contexts/PolygonContextProvider";

export function usePolygonContext() {
  const value = useContext(PolygonContext); 
  
  return value;
}