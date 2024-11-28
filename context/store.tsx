"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";

interface ContextProp {
  isConnected: boolean;
  setIsConnected: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextProp>({
  isConnected: false,
  setIsConnected: () => {},
});

export default GlobalContext;

export const GlobalContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <GlobalContext.Provider value={{ isConnected, setIsConnected }}>
      {children}
    </GlobalContext.Provider>
  );
};
