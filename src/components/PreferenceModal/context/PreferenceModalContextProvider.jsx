import { PreferenceModalContext } from "./PreferenceModalContext";
import { usePrefernceModalReducer } from "./hooks/usePreferenceModalReducer";

export function PreferenceModalContextProvider({ children }) {
  const {state, actions} = usePrefernceModalReducer();
  return (
    <PreferenceModalContext.Provider value={{ state, actions}}>
      {children}
    </PreferenceModalContext.Provider>
  );
}
