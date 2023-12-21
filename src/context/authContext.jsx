import { createContext, useEffect, useState } from "react";
import {
  loginWithCredentials,
  logoutFirebase,
  onAuthStateHasChanged,
  signInWithCredentials,
  singInWithGoogle,
} from "../firebase/providers";

const initialState = {
  userId: null,
  status: "checking",
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(initialState);

  useEffect(() => {
    onAuthStateHasChanged(setSession);
  }, []);

  const handleLogOut = async () => {
    logoutFirebase();
    setSession({ userId: null, status: "no-authenticated" });
  };

  const validateAuth = (userId) => {
    if (userId) return setSession({ userId, status: "authenticated" });
    handleLogOut();
  };

  const checking = () =>
    setSession((prev) => ({ ...prev, status: "checking" }));

  const handleLoginWithGoogle = async () => {
    checking();
    const userId = await singInWithGoogle();
    validateAuth(userId);
  };

  const handleLoginWithCredentials = async (password, email) => {
    checking();
    const userId = await loginWithCredentials({ email, password });
    validateAuth(userId);
  };

  const handleRegisterWithCredentials = async (password, email) => {
    checking();
    const userId = await signInWithCredentials({ email, password });
    validateAuth(userId);
  };

  return (
    <AuthContext.Provider
      value={{
        ...session,
        handleLoginWithGoogle,
        handleLoginWithCredentials,
        handleRegisterWithCredentials,
        handleLogOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
