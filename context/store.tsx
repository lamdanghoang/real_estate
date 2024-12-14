"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";

interface ContextProp {
  isConnected: boolean;
  isOwner: boolean;
  setIsConnected: Dispatch<SetStateAction<boolean>>;
  setIsOwner: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextProp>({
  isConnected: false,
  setIsConnected: () => {},
  isOwner: false,
  setIsOwner: () => {},
});

export default GlobalContext;

export const GlobalContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  return (
    <GlobalContext.Provider
      value={{ isConnected, setIsConnected, isOwner, setIsOwner }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
