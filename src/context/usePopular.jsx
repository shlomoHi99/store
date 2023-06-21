import React, { createContext, useContext, useState } from "react";
import storeData from '../storeData.json'

const PopularContext = createContext();

export function PopularProvider({ children }) {
  const [popularState, setPopularState] = useState(
    storeData.map((item) => {
        return {...item, numOfClicks: 0}
    })
  );

  const value = {
    popularState,
    setPopularState,
  };

  return <PopularContext.Provider value={value}>{children}</PopularContext.Provider>;
}

export function usePopular() {
  return useContext(PopularContext);
}