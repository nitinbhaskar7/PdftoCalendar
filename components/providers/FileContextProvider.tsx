'use client'
import { createContext, useContext } from "react";

export const FileContext = createContext<{
  files: File[] | undefined;
  setFiles: (files: File[] | undefined) => void;
}>({
  files: undefined,
  setFiles: () => {},
})

export const FileContextProvider = FileContext.Provider;

export default function useFileContext() {
  return useContext(FileContext);
}
