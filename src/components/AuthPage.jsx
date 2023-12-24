import { useState, useContext } from "react";
import { useForm } from "../hooks/useForm";
import { AuthContext } from "../context/authContext";

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const {
    handleLoginWithGoogle,
    handleLoginWithCredentials,
    handleRegisterWithCredentials,
  } = useContext(AuthContext);

  const { handleChange, pass, email } = useForm({
    initialState: {
      email: "",
      pass: "",
    },
  });

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    handleLoginWithCredentials(pass, email);
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    handleRegisterWithCredentials(pass, email);
  };

  const toggleForm = (e) => {
    setIsLogin(!isLogin);
  };

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
              <span>ingresa tus datos para registrarte</span>
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
