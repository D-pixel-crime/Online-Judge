import React, { useState } from "react";

interface errorContextType {
  isError: null;
  setIsError: (arg: any) => void;
  whatIsTheError: null;
  setWhatIsTheError: (arg: any) => void;
}

const ErrorContext = React.createContext<errorContextType | null>(null);

interface errorProviderProps {
  children: React.ReactNode;
}

const ErrorContextProvider = ({ children }: errorProviderProps) => {
  const [isError, setIsError] = useState(null);
  const [whatIsTheError, setWhatIsTheError] = useState(null);

  return (
    <ErrorContext.Provider
      value={{ isError, setIsError, whatIsTheError, setWhatIsTheError }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

export { ErrorContextProvider, ErrorContext };
