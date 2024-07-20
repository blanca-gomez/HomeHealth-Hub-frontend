import React, { createContext, useContext,useState } from "react";

export const MedicationContext = createContext();

export const MedicationProvider = ({ children }) => {
    const [medications, setMedications] = useState([]);
    const updateMedicationsList = (newMedications) => {
        setMedications(newMedications);
      };

    return (
        <MedicationContext.Provider value={{ medications,updateMedicationsList }}>
            {children}
        </MedicationContext.Provider>
    );
};
export const useMedication = () => {
  return useContext(MedicationContext);
};