import React, { createContext, useContext,useState } from "react";

export const AppoinmentContext = createContext();

export const AppoinmentProvider = ({ children }) => {
    const [appoinments, setAppoinments] = useState([]);
    const updateAppoinmentsList = (newAppoinments) => {
        setAppoinments(newAppoinments);
      };

    return (
        <AppoinmentContext.Provider value={{ appoinments,updateAppoinmentsList }}>
            {children}
        </AppoinmentContext.Provider>
    );
};
export const useAppoinments = () => {
  return useContext(AppoinmentContext);
};