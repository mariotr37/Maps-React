import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { uploadString, getDownloadURL, ref } from "firebase/storage";
import { FirebaseAuth, Firestore, Storage } from "./config";

const googleProvider = new GoogleAuthProvider();

const singInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);

    const { displayName, email, photoURL, uid } = result.user;

    return uid;
  } catch (e) {
    alert(e.message);
  }
};

const handlePhotoUpload = async (photo) => {
  try {
    const dataURL = await convertFileToDataURL(photo);
    const photoRef = ref(
      Storage,
      `profile-photos/${Date.now()}_${Math.floor(Math.random() * 100000)}`
    );
    const photoSnapshot = await uploadString(photoRef, dataURL, "data_url");
    return await getDownloadURL(photoSnapshot.ref);
  } catch (error) {
    console.error("Error uploading photo:", error);
    return null;
  }
};

const convertFileToDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const signInWithCredentials = async ({
  email,
  password,
  firstName,
  lastName,
  age,
  photo,
}) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    const userId = resp.user.uid;

    // Actualiza el perfil del usuario con nombre y apellido
    await updateProfile(resp.user, {
      displayName: `${firstName} ${lastName}`,
      photoURL: photo,
    });

    // Almacena datos adicionales en Firestore
    const userRef = doc(Firestore, "users", userId);
    await setDoc(userRef, {
      firstName,
      lastName,
      age,
      email,
      photo: photo || null,
    });

    return userId;
  } catch (e) {
    alert(e.message);
  }
};

const loginWithCredentials = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    return resp.user.uid;
  } catch (e) {
    alert(e.message);
  }
};

const onAuthStateHasChanged = (setSession) => {
  onAuthStateChanged(FirebaseAuth, (user) => {
    if (!user) return setSession({ status: "no-authenticated", userId: null });

    setSession({ status: "authenticated", userId: user.uid });
  });
};

const logoutFirebase = async () => await FirebaseAuth.signOut();

export {
  singInWithGoogle,
  handlePhotoUpload,
  signInWithCredentials,
  loginWithCredentials,
  onAuthStateHasChanged,
  logoutFirebase,
};
