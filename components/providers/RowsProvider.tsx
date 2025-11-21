'use client'
import { createContext, useContext } from "react";

export const RowsContext = createContext<{
  rows: any[] ;
  setExtractedData: (rows: any[] ) => void;
}>({
  rows: [],
  setExtractedData: () => {},
})

export const RowsContextProvider = RowsContext.Provider;

export default function useRowsContext() {
  return useContext(RowsContext);
}
