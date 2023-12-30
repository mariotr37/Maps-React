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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateProfile(oldPass, newPass, firstName, lastName, age, photo);
    // Reiniciar los campos de contraseña y foto a su estado inicial
    handleChange({ target: { name: "oldPass", value: "" } });
    handleChange({ target: { name: "newPass", value: "" } });
    handleChange({ target: { name: "photo", value: null } });
  };

  const handleCancel = () => {
    navigate("/");
  };

  const toggleEditing = () => {
    setIsEditing((prevEditing) => !prevEditing);
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
              <input
                name="email"
                type="email"
                placeholder="E-mail"
                onChange={handleChange}
                value={email}
                disabled
              />
              <input
                name="oldPass"
                type="password"
                placeholder="Contraseña Actual"
                onChange={handleChange}
                value={oldPass}
                disabled={!isEditing}
              />
              <input
                name="newPass"
                type="password"
                placeholder="Nueva Contraseña"
                onChange={handleChange}
                value={newPass}
                disabled={!isEditing}
              />
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
