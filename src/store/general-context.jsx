import { createContext, useReducer, useContext, useCallback } from "react";
import { actions } from "../utility/data";

const initialState = {
  loading: false,
};

const GeneralContext = createContext({
  loading: false,
  setLoading: () => {},
});

function generalReducer(state, action) {
  if (action.type === actions.SET_LOADING) {
    return {
      ...state,
      loading: action.payload,
    };
  }

  return state;
}

export default function GeneralContextProvider({ children }) {
  const [generalState, generalDispatch] = useReducer(
    generalReducer,
    initialState
  );

  const handleSetLoading = useCallback((user) => {
    generalDispatch({
      type: actions.SET_LOADING,
      payload: user,
    });
  }, []);

  const values = {
    loading: generalState.loading,
    setLoading: handleSetLoading,
  };

  return (
    <GeneralContext.Provider value={values}>{children}</GeneralContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGeneral = () => useContext(GeneralContext);
