import React, { useState } from "react";
import { createContext } from "react";

interface Entity<T> {
  entity: T;
  set: React.Dispatch<React.SetStateAction<T>>;
}
interface Context {
  token: Entity<string>;
}

const DEFAULT_CONTEXT: Context = {
  token: {
    entity: "",
    set: () => null,
  },
};

export const AppContext = createContext<Context>(DEFAULT_CONTEXT);

export const ContextProvider = (props: { children: React.ReactNode }) => {
  const [code, setCode] = useState<string>("");

  return (
    <AppContext.Provider
      value={{
        token: {
          entity: code,
          set: setCode,
        },
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
