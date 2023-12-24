import { useForm } from "../hooks/useForm";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const Register = ({ toggleForm }) => {
  const { handleRegisterWithCredentials } = useContext(AuthContext);

  const { handleChange, pass, email } = useForm({
    initialState: {
      email: "",
      pass: "",
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegisterWithCredentials(pass, email);
  };

  return (
    <>
      <div className="form-container sign-up">
        <form onSubmit={handleSubmit}>
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
  );
};
