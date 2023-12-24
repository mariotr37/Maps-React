import { useForm } from "../hooks/useForm";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const Login = ({ toggleForm }) => {
  const { handleLoginWithGoogle, handleLoginWithCredentials } =
    useContext(AuthContext);

  const { handleChange, pass, email } = useForm({
    initialState: {
      email: "",
      pass: "",
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginWithCredentials(pass, email);
  };

  return (
    <>
      <div className="form-container sign-in">
        <form onSubmit={handleSubmit}>
          <h1>Iniciar Sesión</h1>
          <div className="social-icons">
            <button type="button" onClick={handleLoginWithGoogle} className="icon">
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
  );
};
