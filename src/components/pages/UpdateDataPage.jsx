import { useState, useContext, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { Sidebar } from "../ui";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

export const UpdateDataPage = () => {
  const { userId, handleUpdateProfile, fetchUserData } =
    useContext(AuthContext);
  const [userData, setUserData] = useState({
    photo: null,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const user = await fetchUserData(userId);
      if (user) {
        setUserData(user);
        // Establecer los valores iniciales de los campos de input con la información del usuario
        handleChange({ target: { name: "email", value: user.email } });
        handleChange({ target: { name: "firstName", value: user.firstName } });
        handleChange({ target: { name: "lastName", value: user.lastName } });
        handleChange({ target: { name: "age", value: user.age } });
      }
    };

    fetchData();
  }, [userId, fetchUserData]);

  const {
    handleChange,
    oldPass,
    newPass,
    email,
    firstName,
    lastName,
    age,
    photo,
  } = useForm({
    initialState: {
      email: "",
      oldPass: "",
      newPass: "",
      firstName: "",
      lastName: "",
      age: "",
      photo: null,
    },
  });

  const validateUpdate = () => {
    const errors = {};

    if (age <= 0 || age > 100) {
      errors.limitAge = "La edad debe estar entre 1 y 100";
    }

    if (newPass.length > 0 && newPass.length < 6) {
      errors.passLength = "La contraseña debe tener al menos 6 caracteres";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    if (validateUpdate()) {
      handleUpdateProfile(oldPass, newPass, firstName, lastName, age, photo);
      // Reiniciar los campos de contraseña y foto a su estado inicial
      handleChange({ target: { name: "oldPass", value: "" } });
      handleChange({ target: { name: "newPass", value: "" } });
      handleChange({ target: { name: "photo", value: null } });
      setShowPassword(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const toggleEditing = () => {
    setIsEditing((prevEditing) => !prevEditing);
    setErrors({});
    setSubmitted(false);
    setShowPassword(false);
  };

  return (
    <>
      <Sidebar />
      <section className="home edit-acc">
        <div className="container edit-acc">
          <div className="form-container update-data">
            <form onSubmit={handleSubmit}>
              <div className="user-photo-container">
                {userData.photo ? (
                  <img src={userData.photo} alt="User Photo" />
                ) : (
                  <img src="user.png" alt="User Photo" />
                )}
              </div>
              <button
                className="btn-upload"
                type="button"
                disabled={!isEditing}
              >
                <i className="fa-solid fa-camera"></i>
                <span>{photo ? photo?.name : "EDITAR FOTO"}</span>
                <input
                  name="photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleChange({
                      target: { name: "photo", value: e.target.files[0] },
                    })
                  }
                  disabled={!isEditing}
                />
              </button>
              <input
                name="firstName"
                type="text"
                placeholder="Nombre"
                onChange={handleChange}
                value={firstName}
                disabled={!isEditing}
              />
              <input
                name="lastName"
                type="text"
                placeholder="Apellido"
                onChange={handleChange}
                value={lastName}
                disabled={!isEditing}
              />
              <input
                name="age"
                type="number"
                placeholder="Edad"
                onChange={handleChange}
                value={age}
                disabled={!isEditing}
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
                placeholder="E-mail"
                onChange={handleChange}
                value={email}
                disabled
              />
              <div className="password-input-container">
                <input
                  name="oldPass"
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña Actual"
                  onChange={handleChange}
                  value={oldPass}
                  disabled={!isEditing}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                  disabled={!isEditing}
                >
                  {showPassword ? (
                    <i className="fas fa-eye-slash"></i>
                  ) : (
                    <i className="fas fa-eye"></i>
                  )}
                </button>
              </div>
              <div className="password-input-container">
                <input
                  name="newPass"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nueva Contraseña"
                  onChange={handleChange}
                  value={newPass}
                  disabled={!isEditing}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                  disabled={!isEditing}
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
              <div className="button-container">
                <button
                  className="button-common cancel"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
                <button
                  className="button-common edit-toggle"
                  type="button"
                  onClick={toggleEditing}
                >
                  {isEditing ? "Desactivar Edición" : "Activar Edición"}
                </button>
                <button
                  className="button-common submit"
                  type="submit"
                  disabled={!isEditing}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
