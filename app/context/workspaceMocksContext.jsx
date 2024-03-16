// ModalContext.js

import { createContext, useContext, useState } from "react";

const WorkspaceMocksContext = createContext();

export function WorkspaceMocksProvider({ children }) {
    const [mocksList, setMocksList] = useState([]);
 

  return (
    <WorkspaceMocksContext.Provider
      value={{mocksList, setMocksList}}
    >
      {children}
    </WorkspaceMocksContext.Provider>
  );
}

export function useWorkspaceMocks() {
  return useContext(WorkspaceMocksContext);
}