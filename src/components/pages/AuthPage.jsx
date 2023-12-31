import { useState, useContext } from "react";
import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../context/authContext";

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

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

  const validateLogin = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = "El correo electrónico es requerido";
    }

    if (!pass.trim()) {
      errors.pass = "La contraseña es requerida";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const validateRegister = () => {
    const errors = {};

    if (!firstName.trim()) {
      errors.firstName = "El nombre es requerido";
    }

    if (!lastName.trim()) {
      errors.lastName = "El apellido es requerido";
    }

    if (!age) {
      errors.age = "La edad es requerida";
    } else if (age < 1 || age > 100) {
      errors.limitAge = "La edad debe estar entre 1 y 100";
    }

    if (!email.trim()) {
      errors.email = "El correo electrónico es requerido";
    }

    if (!pass.trim()) {
      errors.pass = "La contraseña es requerida";
    } else if (pass.length < 6) {
      errors.passLength = "La contraseña debe tener al menos 6 caracteres";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    setSubmitted(true);

    if (validateLogin()) {
      handleLoginWithCredentials(pass, email);
      setShowPassword(false);
    }
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();

    setSubmitted(true);

    if (validateRegister()) {
      handleRegisterWithCredentials(
        pass,
        email,
        firstName,
        lastName,
        age,
        photo
      );
      setShowPassword(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setSubmitted(false);
    setShowPassword(false);
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
              {submitted && errors.email && (
                <div className="error-container">
                  <i className="fa-solid fa-exclamation-circle"></i>
                  <div className="error">{errors.email}</div>
                </div>
              )}
              <div className="password-input-container">
                <input
                  name="pass"
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  onChange={handleChange}
                  value={pass}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? (
                    <i className="fas fa-eye-slash"></i>
                  ) : (
                    <i className="fas fa-eye"></i>
                  )}
                </button>
              </div>
              {submitted && errors.pass && (
                <div className="error-container">
                  <i className="fa-solid fa-exclamation-circle"></i>
                  <div className="error">{errors.pass}</div>
                </div>
              )}
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
                placeholder={
                  submitted && errors.firstName ? errors.firstName : "Nombre"
                }
                onChange={handleChange}
                value={firstName}
                className={submitted && errors.firstName ? "error-input" : ""}
              />
              <input
                name="lastName"
                type="text"
                placeholder={
                  submitted && errors.lastName ? errors.lastName : "Apellido"
                }
                onChange={handleChange}
                value={lastName}
                className={submitted && errors.lastName ? "error-input" : ""}
              />
              <input
                name="age"
                type="number"
                placeholder={submitted && errors.age ? errors.age : "Edad"}
                onChange={handleChange}
                value={age}
                className={submitted && errors.age ? "error-input" : ""}
              />
              {submitted && errors.limitAge && (
                <div className="error-container">
                  <i className="fa-solid fa-exclamation-circle"></i>
                  <div className="error">{errors.limitAge}</div>
                </div>
              )}
              <input
                name="email"
                type="email"
                placeholder={
                  submitted && errors.email ? errors.email : "E-mail"
                }
                onChange={handleChange}
                value={email}
                className={submitted && errors.email ? "error-input" : ""}
              />
              <div className="password-input-container">
                <input
                  name="pass"
                  type={showPassword ? "text" : "password"}
                  placeholder={
                    submitted && errors.pass ? errors.pass : "Contraseña"
                  }
                  onChange={handleChange}
                  value={pass}
                  className={submitted && errors.pass ? "error-input" : ""}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`password-toggle ${submitted && errors.pass ? "error-input" : ""}`}
                >
                  {showPassword ? (
                    <i className="fas fa-eye-slash"></i>
                  ) : (
                    <i className="fas fa-eye"></i>
                  )}
                </button>
              </div>
              {submitted && errors.passLength && (
                <div className="error-container">
                  <i className="fa-solid fa-exclamation-circle"></i>
                  <div className="error">{errors.passLength}</div>
                </div>
              )}
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
