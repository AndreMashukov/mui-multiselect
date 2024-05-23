import {PageContext} from "./PageContext";
import usePageReducer from "./hooks/reducer/usePageReducer";

export function PageContextProvider({children}) {
  const {state, actions} = usePageReducer();
  return (
    <PageContext.Provider value={{state, actions}}>
      {children}
    </PageContext.Provider>
  );
}
