import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

export default function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch() must be used inside a ThemeProvider");
  }
  return context;
}
