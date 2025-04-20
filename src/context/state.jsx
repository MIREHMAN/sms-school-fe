import { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer";

const Ctx = createContext({});

export function Provider({ children }) {
  const [data, dispatch] = useReducer(reducer, { auth: false, count: 0 });
  return <Ctx.Provider value={{ data, dispatch }}>{children}</Ctx.Provider>;
}

export function useCtx() {
  return useContext(Ctx);
}
