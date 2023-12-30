import {
  createUserWithEmailAndPassword,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { uploadString, getDownloadURL, ref } from "firebase/storage";
import { FirebaseAuth, Firestore, Storage } from "./config";

const googleProvider = new GoogleAuthProvider();

const getUserData = async (userId) => {
  try {
    const userRef = doc(Firestore, "users", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return userDoc.data();
    }

    return null;
  } catch (e) {
    alert("Hubo un error al obtener los datos del usuario");
  }
};

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
  } catch (e) {
    alert(e.message);
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
  profilePhoto,
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
      photoURL: profilePhoto || null,
    });

    // Almacena datos adicionales en Firestore
    const userRef = doc(Firestore, "users", userId);
    await setDoc(userRef, {
      firstName,
      lastName,
      age,
      email,
      photo: profilePhoto || null,
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

const updateProfileInfo = async ({
  oldPassword,
  newPassword,
  firstName,
  lastName,
  age,
  photoURL,
}) => {
  try {
    const user = FirebaseAuth.currentUser;

    if (!user) {
      throw new Error("Usuario no autenticado");
    }

    // Verificar si no se proporcionaron contraseñas nuevas y los demás datos son iguales a los existentes
    const existingData = await getUserData(user.uid);
    const isPasswordUnchanged = !oldPassword || !newPassword;
    const isDataUnchanged =
      existingData &&
      existingData.firstName === firstName &&
      existingData.lastName === lastName &&
      existingData.age === age &&
      existingData.photo === photoURL;

    // Verificar si alguno de los campos (nombre, apellido, edad, foto) ha cambiado
    const isFirstNameChanged = existingData?.firstName !== firstName;
    const isLastNameChanged = existingData?.lastName !== lastName;
    const isAgeChanged = existingData?.age !== age;
    const isPhotoChanged = existingData?.photo !== photoURL;

    // Variable para determinar si se realizaron cambios en los datos del perfil
    let isProfileChanged = false;

    // Actualizar el perfil con los nuevos datos modificados
    if (
      (!isDataUnchanged && (isFirstNameChanged || isLastNameChanged || isAgeChanged || isPhotoChanged)) ||
      (!isPasswordUnchanged && newPassword)
    ) {
      // Reautenticar al usuario antes de realizar cambios en la contraseña
      if (!isPasswordUnchanged) {
        const credential = EmailAuthProvider.credential(user.email, oldPassword);
        await reauthenticateWithCredential(user, credential);

        // Actualizar la contraseña si se proporciona una nueva contraseña
        await updatePassword(user, newPassword);
        isProfileChanged = true; // Indicar que la contraseña cambió
      }

      const displayName = `${firstName} ${lastName}`;
      await updateProfile(user, { displayName, photoURL });

      // Actualizar los datos adicionales en Firestore solo si hay cambios y el campo no está vacío
      const userRef = doc(Firestore, "users", user.uid);
      const updateData = {};

      if (isFirstNameChanged && firstName) {
        updateData.firstName = firstName;
        isProfileChanged = true;
      }

      if (isLastNameChanged && lastName) {
        updateData.lastName = lastName;
        isProfileChanged = true;
      }

      if (isAgeChanged && age) {
        updateData.age = age;
        isProfileChanged = true;
      }

      if (isPhotoChanged && photoURL) {
        updateData.photo = photoURL;
        isProfileChanged = true;
      }

      if (isProfileChanged) {
        await updateDoc(userRef, updateData);
        alert("Perfil actualizado correctamente");
      } else {
        alert("No se realizaron cambios en el perfil.");
      }

      return user.uid;
    }

    // Si no hay cambios, mostrar alerta y salir de la función
    alert("No se realizaron cambios en el perfil.");
    return user.uid;
  } catch (error) {
    alert(
      "Hubo un error al actualizar el perfil. Verifica tus credenciales y vuelve a intentarlo."
    );
    throw error;
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
  getUserData,
  singInWithGoogle,
  handlePhotoUpload,
  signInWithCredentials,
  loginWithCredentials,
  updateProfileInfo,
  onAuthStateHasChanged,
  logoutFirebase,
};
