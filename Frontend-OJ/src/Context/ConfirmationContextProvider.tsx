import React, { createContext, useState } from "react";

interface propsConfirmationContext {
  isConfirmed: boolean;
  setIsConfirmed: (value: boolean) => void;
}

const ConfirmationContext = createContext<propsConfirmationContext | null>(
  null
);

interface prosProviderConfirmationContext {
  children: React.ReactNode;
}

const ConfirmationContextProvider = ({
  children,
}: prosProviderConfirmationContext) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  return (
    <ConfirmationContext.Provider value={{ isConfirmed, setIsConfirmed }}>
      {children}
    </ConfirmationContext.Provider>
  );
};

export { ConfirmationContext, ConfirmationContextProvider };
