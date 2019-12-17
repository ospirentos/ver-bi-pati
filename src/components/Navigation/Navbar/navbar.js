import React, { useContext, useState } from "react";
import "./navbar.css";
import * as ROUTES from "../../../constants/routes";
import SignUp from "./../../Auth/signup";
import NotificationMenu from "../../Tabs/notificationMenu";
import { UserContext } from "../../Auth/UserContext";
import { Link } from "react-router-dom";
import { withFirebase } from "../../Firebase";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Popover, Menu, Dropdown } from "antd";

const submenu_activities = (
  <Menu>
    <Menu.Item>
      <Link to="/projeler">Projelerimiz</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/etkinlikler">Etkinliklerimiz</Link>
    </Menu.Item>
  </Menu>
);

const NavbarBase = props => {
  const [user, setUser] = useContext(UserContext);
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);
  return (
    <div className="navbar-main-container">
      <nav className="site-navbar">
        <div className="navbar-banner">
          <Link className="navbar-brand" to="/anasayfa">
            <img
              className="logo"
              src={require("./../../Res/images/verBiPatiLogo.png")}
              alt="Ver Bi Pati"
            />
          </Link>
        </div>

        <div className="navbar-links-group">
          <div>
            <Dropdown
              overlay={submenu_activities}
              overlayStyle={{ width: "200px" }}
            >
              <Link>Neler Yapıyoruz?</Link>
            </Dropdown>
          </div>
          <div>
            <Link to={ROUTES.FEEDING}>Besleme Programı</Link>
          </div>
          <div>
            <Link to={ROUTES.DONATION}>Destek Ol</Link>
          </div>
          <div>
            <Link to={ROUTES.ANNOUNCEMENTS}>Kayıp&Sahiplendirme</Link>
          </div>
          <div>
            <Link to={ROUTES.GALLERY}>Galeri</Link>
          </div>
          <div>
            <Link to={ROUTES.CONTACT}>İletişim</Link>
          </div>
        </div>
        <div className="navbar-user-notif-group">
          <div>
            <Popover
              content={<NotificationMenu />}
              title="Notifications"
              trigger="click"
              placement="topLeft"
            >
              <Link>
                <i className="fa fa-fw fa-bell fa-lg"></i>
              </Link>
            </Popover>
          </div>
          <div>
            {user.type === "guest" && (
              <Popover
                content={<SignUp />}
                tittle="Login"
                trigger="click"
                placement="bottomLeft"
              >
                <Link>
                  <i className="fa fa-fw fa-user fa-lg"></i>
                </Link>
              </Popover>
            )}
            {user.type !== "guest" && (
              <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle color="black">
                  <div className="loggedin-user-button">{user.data.name}</div>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => {
                      localStorage.removeItem("userDataInLocal");
                      setUser({ type: "guest", data: {} });
                      props.firebase.doSignOut();
                    }}
                  >
                    Çıkış Yap
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

const Navbar = withFirebase(NavbarBase);
export default Navbar;
