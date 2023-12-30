import { createContext, useEffect, useState } from "react";
import {
  getUserData,
  loginWithCredentials,
  logoutFirebase,
  onAuthStateHasChanged,
  signInWithCredentials,
  singInWithGoogle,
  handlePhotoUpload,
  updateProfileInfo,
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

  const handleRegisterWithCredentials = async (
    password,
    email,
    firstName,
    lastName,
    age,
    photo
  ) => {
    checking();
    const profilePhoto = photo ? await handlePhotoUpload(photo) : null;
    const userId = await signInWithCredentials({
      email,
      password,
      firstName,
      lastName,
      age,
      profilePhoto,
    });
    validateAuth(userId);
  };

  const handleUpdateProfile = async (
    oldPassword,
    newPassword,
    firstName,
    lastName,
    age,
    photo
  ) => {
    const photoURL = photo ? await handlePhotoUpload(photo) : null;
    const userId = await updateProfileInfo({
      oldPassword,
      newPassword,
      firstName,
      lastName,
      age,
      photoURL,
    });
    validateAuth(userId);
  };

  const fetchUserData = async (userId) => {
    try {
      const userData = await getUserData(userId);
      return userData;
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...session,
        handleLoginWithGoogle,
        handleLoginWithCredentials,
        handleRegisterWithCredentials,
        handleUpdateProfile,
        fetchUserData,
        handleLogOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
