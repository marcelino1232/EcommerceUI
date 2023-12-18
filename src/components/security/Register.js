import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { register } from "../../actions/userAction";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    username: "",
    password: "",
  });

  const { nombre, apellido, email, telefono, username, password } = user;

  const [avatar, setAvator] = useState("");

  const [avatarPreview, setAvatarPreview] = useState(
    "images/default_avatar.jpg"
  );

  const alert = useAlert();

  const { errores, isAuthenticated, loading } = useSelector(
    (state) => state.security
  );

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.set("nombre", nombre);
    formData.set("apellido", apellido);
    formData.set("telefono", telefono);
    formData.set("username", username);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("foto", avatar);

    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (errores) {
      errores.map((error) => alert.error(error));
    }
  }, [dispatch, alert, isAuthenticated, errores, navigate]);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvator(e.target.files[0]);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  return (
    <Fragment>
      <MetaData titulo={"Registro de usuario"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            <h2 className="mb-3">Registro de Usuario</h2>

            <div className="form-group">
              <label htmlFor="nombre_field">Nombre</label>
              <input
                type="text"
                id="nombre_field"
                className="form-control"
                value={nombre}
                name="nombre"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellido_field">Apellido</label>
              <input
                type="text"
                id="apellido_field"
                className="form-control"
                value={apellido}
                name="apellido"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="usuario_field">Usuario</label>
              <input
                type="text"
                id="usuario_field"
                className="form-control"
                value={username}
                name="username"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono_field">Telefono</label>
              <input
                type="text"
                id="telefono_field"
                className="form-control"
                value={telefono}
                name="telefono"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="image"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Upload Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
            >
              Registrar
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
