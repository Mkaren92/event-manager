import { createContext, useReducer, useContext, useCallback } from "react";
import { actions } from "../utility/data";

const initialState = {
  isSignedIn: false,
  authUser: {},
};

const AuthContext = createContext({
  isSignedIn: false,
  authUser: {},
  setAuthUser: () => {},
  setIsSignedIn: () => {},
  setSingOut: () => {},
});

function authReducer(state, action) {
  if (action.type === actions.AUTH_USER) {
    return {
      ...state,
      authUser: { ...action.payload },
    };
  }

  if (action.type === actions.IS_SIGN_IN) {
    return {
      ...state,
      isSignedIn: action.payload,
    };
  }

  if (action.type === actions.SIGN_OUT) {
    return {
      ...state,
      isSignedIn: false,
      authUser: {},
    };
  }

  return state;
}

export default function AuthContextProvider({ children }) {
  const [authState, authDispatch] = useReducer(authReducer, initialState);

  const handleSetAuthUser = useCallback((user) => {
    authDispatch({
      type: actions.AUTH_USER,
      payload: user,
    });
  }, []);

  const handleSetIsSignedIn = useCallback((loggedIn) => {
    authDispatch({
      type: actions.IS_SIGN_IN,
      payload: loggedIn,
    });
  }, []);

  const handleSignOut = useCallback(() => {
    authDispatch({
      type: actions.SIGN_OUT,
    });
  }, []);

  const values = {
    isSignedIn: authState.isSignedIn,
    authUser: authState.authUser,
    setIsSignedIn: handleSetIsSignedIn,
    setAuthUser: handleSetAuthUser,
    setSingOut: handleSignOut,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
