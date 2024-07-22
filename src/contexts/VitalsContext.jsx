import React, { createContext, useContext,useState } from "react";

export const VitalContext = createContext();

export const VitalProvider = ({ children }) => {
    const [vitals, setVitals] = useState([]);
    const updateVitalsList = (newVitals) => {
        setVitals(newVitals);
      };

    return (
        <VitalContext.Provider value={{ vitals,updateVitalsList }}>
            {children}
        </VitalContext.Provider>
    );
};
export const useVital = () => {
  return useContext(VitalContext);
};