import { useState, useContext } from "react";
import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../context/authContext";
import { handlePhotoUpload } from "../../firebase/providers";

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const {
    handleLoginWithGoogle,
    handleLoginWithCredentials,
    handleRegisterWithCredentials,
    status,
  } = useContext(AuthContext);

  const { handleChange, pass, email, firstName, lastName, age, photo } =
    useForm({
      initialState: {
        email: "",
        pass: "",
        firstName: "",
        lastName: "",
        age: "",
        photo: null,
      },
    });

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    handleLoginWithCredentials(pass, email);
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    const photoURL = photo ? await handlePhotoUpload(photo) : null;
    handleRegisterWithCredentials(
      pass,
      email,
      firstName,
      lastName,
      age,
      photoURL
    );
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  if (status === "checking") {
    return (
      <p className="loading">
        <span>Chequeando credenciales, espere un momento...</span>
      </p>
    );
  }

  return (
    <div className={`container ${isLogin ? "" : "active"}`}>
      {isLogin ? (
        <>
          <div className="form-container sign-in">
            <form onSubmit={handleSubmitLogin}>
              <h1>Iniciar Sesión</h1>
              <div className="social-icons">
                <button
                  type="button"
                  onClick={handleLoginWithGoogle}
                  className="icon"
                >
                  <i className="fa-brands fa-google-plus-g"></i>
                </button>
                <button className="icon">
                  <i className="fa-brands fa-github"></i>
                </button>
              </div>
              <span>o ingresa con tu cuenta</span>
              <input
                name="email"
                type="email"
                placeholder="E-mail"
                onChange={handleChange}
                value={email}
              />
              <input
                name="pass"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={pass}
              />
              <a href="#">¿Olvidaste tu contraseña?</a>
              <button className="button-common submit" type="submit">
                Iniciar Sesión
              </button>
            </form>
          </div>
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-right">
                <h1>¡Hola, Usuario!</h1>
                <p>
                  Registrese con sus datos personales y empiece a usar todas
                  nuestras funciones
                </p>
                <button className="button-common hidden" onClick={toggleForm}>
                  Registrarse
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="form-container sign-up">
            <form onSubmit={handleSubmitRegister}>
              <h1>Crear Cuenta</h1>
              <span>Ingresa tus datos para registrarte</span>
              <button className="btn-upload" type="button">
                <i className="fa-solid fa-camera"></i>
                <span>{photo ? photo?.name : "SUBIR FOTO"}</span>
                <input
                  name="photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleChange({
                      target: { name: "photo", value: e.target.files[0] },
                    })
                  }
                />
              </button>
              <input
                name="firstName"
                type="text"
                placeholder="Nombre"
                onChange={handleChange}
                value={firstName}
              />
              <input
                name="lastName"
                type="text"
                placeholder="Apellido"
                onChange={handleChange}
                value={lastName}
              />
              <input
                name="age"
                type="number"
                placeholder="Edad"
                onChange={handleChange}
                value={age}
              />
              <input
                name="email"
                type="email"
                placeholder="E-mail"
                onChange={handleChange}
                value={email}
              />
              <input
                name="pass"
                type="password"
                placeholder="Contraseña"
                onChange={handleChange}
                value={pass}
              />
              <button className="button-common submit" type="submit">
                Registrarse
              </button>
            </form>
          </div>
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>Bienvenido de nuevo</h1>
                <p>
                  Para mantenerse conectado con nosotros, inicie sesión con su
                  información personal
                </p>
                <button className="button-common hidden" onClick={toggleForm}>
                  Iniciar Sesión
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
