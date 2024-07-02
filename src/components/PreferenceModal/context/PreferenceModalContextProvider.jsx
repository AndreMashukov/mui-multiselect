import { PreferenceModalContext } from "./PreferenceModalContext";
import { useHandlers } from "./hooks/useHandlers";
import { usePrefernceModalReducer } from "./hooks/usePreferenceModalReducer";

export function PreferenceModalContextProvider({ children }) {
  const { state, actions } = usePrefernceModalReducer();
  const handlers = useHandlers({ state });
  return (
    <PreferenceModalContext.Provider
      value={{ state, actions: { ...actions, ...handlers } }}
    >
      {children}
    </PreferenceModalContext.Provider>
  );
}
