import { useContext } from "react";
import { CanvasContext } from "../contexts/CanvasContextProvider";

export function useCanvasContext() {
  const value = useContext(CanvasContext); 
  
  return value;
}