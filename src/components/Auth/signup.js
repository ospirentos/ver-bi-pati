import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "./UserContext";
import { withFirebase } from "../Firebase";
import { notification } from "antd";

import "./signup.css";

const initialState = {
  name: "",
  surname: "",
  email: "",
  department: "",
  phone: "",
  university_year: "",
  feedingTableLock: false
};

const openNotification = (title, message, type) => {
  notification[type]({
    message: title,
    description: message,
    placement: "bottomLeft"
  });
};

const SignUpBase = props => {
  const [userInfo, setUserInfo] = useState(initialState);

  const [view, setView] = useState(1);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [user, setUser] = useContext(UserContext);

  const handleChange = e => {
    setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
  };

  const handleSignUp = e => {
    e.preventDefault();
    const { firebase } = props;
    firebase.doAddDoc("/users/", userInfo);
    openNotification(
      "Kayıt Başarılı",
      "Kullanıcı kaydı başarıyla oluşturuldu!",
      "success"
    );
    setUserInfo(initialState);
  };

  const getAuthStatus = response => {
    if (!response.loginStatus) {
      if (response.message === "user-not-found") {
        setEmailError(true);
      } else if (response.message === "wrong-password") {
        setPasswordError(true);
      }
    } else if (response.loginStatus) {
      localStorage.setItem(
        "userDataInLocal",
        JSON.stringify({
          type: response.authType,
          data: response.userData
        })
      );
      setUser({ type: response.authType, data: response.userData });
    }
  };

  const handleUserLogin = e => {
    e.preventDefault();
    const { firebase } = props;
    firebase.doSignInAsUser(userInfo.email, getAuthStatus);
  };

  const handleAdminLogin = e => {
    e.preventDefault();
    const { firebase } = props;
    firebase.doSignInAsAdmin(userInfo.email, userInfo.password, getAuthStatus);
  };
  return (
    <div>
      <li>
        <div>
          {view === 0 && (
            <form onSubmit={handleSignUp} style={{ width: "300px" }}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <div className="form-group" style={{ width: "200px" }}>
                  <strong className="text-info">Ver Bi'Pati’ye Üye Ol</strong>
                  <input
                    className="form-control"
                    name="name"
                    id="name"
                    type="text"
                    placeholder="İsim"
                    value={userInfo.name}
                    onChange={handleChange}
                    style={{ margin: "20px 0px" }}
                  />
                  <input
                    className="form-control"
                    name="surname"
                    id="surname"
                    type="text"
                    placeholder="Soyisim"
                    value={userInfo.surname}
                    onChange={handleChange}
                    style={{ margin: "20px 0px" }}
                  />
                  <input
                    className="form-control"
                    name="phone"
                    id="phone"
                    type="text"
                    placeholder="Cep no"
                    value={userInfo.phone}
                    onChange={handleChange}
                    style={{ margin: "20px 0px" }}
                  />
                  <input
                    className="form-control"
                    name="department"
                    id="department"
                    type="text"
                    placeholder="Bölüm"
                    value={userInfo.department}
                    onChange={handleChange}
                    style={{ margin: "20px 0px" }}
                  />

                  <input
                    className="form-control"
                    name="university_year"
                    id="university_year"
                    type="text"
                    placeholder="Sınıf"
                    value={userInfo.university_year}
                    onChange={handleChange}
                    style={{ margin: "20px 0px" }}
                  />
                  <input
                    className="form-control"
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={userInfo.email}
                    onChange={handleChange}
                    style={{ margin: "20px 0px" }}
                  />
                </div>
              </div>
              <br></br>
              <li className="footer bg-light text-center">
                <Button variant="primary" type="submit">
                  Kayıt Ol
                </Button>
              </li>
              <Button
                type="button"
                variant="Link"
                onClick={() => {
                  setView(1);
                }}
              >
                <small className="text-warning">Zaten Üye misin</small>
              </Button>
            </form>
          )}
          {view === 1 && (
            <form onSubmit={handleUserLogin} style={{ width: "300px" }}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <div className="form-group" style={{ width: "200px" }}>
                  <strong className="text-info">
                    Ver Bi'Pati’ye Giriş Yap
                  </strong>

                  <input
                    className="form-control"
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    style={{ margin: "20px 0px" }}
                  />
                  {emailError && (
                    <div>
                      Üzgünüz, kayıtlı bir email adresiniz bulunmamaktadır.
                    </div>
                  )}
                </div>
              </div>
              <br></br>
              <li className="footer bg-light text-center">
                <Button variant="primary" type="submit">
                  Giriş Yap
                </Button>
              </li>
              <Button
                type="button"
                variant="Link"
                onClick={() => {
                  setView(2);
                }}
              >
                <small className="text-warning">Yönetici Girişi Yap</small>
              </Button>
              <br></br>
              <Button
                type="button"
                variant="Link"
                onClick={() => {
                  setView(0);
                }}
              >
                <small className="text-warning">Kayıt Ol</small>
              </Button>
            </form>
          )}
          {view === 2 && (
            <form onSubmit={handleAdminLogin} style={{ width: "300px" }}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <div className="form-group" style={{ width: "200px" }}>
                  <strong className="text-info">
                    Ver Bi'Pati’ye Giriş Yap
                  </strong>
                  <input
                    className="form-control"
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    style={{ margin: "20px 0px" }}
                  />
                  {emailError && (
                    <div>
                      Üzgünüz, kayıtlı bir email adresiniz bulunmamaktadır.
                    </div>
                  )}
                  <input
                    className="form-control"
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Şifreniz"
                    onChange={handleChange}
                    style={{ margin: "20px 0px" }}
                  />
                  {passwordError && (
                    <div>Üzgünüz girdiğiniz şifre yanlıştır.</div>
                  )}
                </div>
              </div>
              <br></br>
              <li className="footer bg-light text-center">
                <Button variant="primary" type="submit">
                  Giriş Yap
                </Button>
              </li>
              <Button
                type="button"
                variant="Link"
                onClick={() => {
                  setView(1);
                }}
              >
                <small className="text-warning">Giriş yap</small>
              </Button>
              <br></br>
              <Button
                type="button"
                variant="Link"
                onClick={() => {
                  setView(0);
                }}
              >
                <small className="text-warning">Kayıt Ol</small>
              </Button>
            </form>
          )}
        </div>
      </li>
    </div>
  );
};
const SignUp = withFirebase(SignUpBase);
export default SignUp;
