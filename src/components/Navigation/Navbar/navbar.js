import React, { Component } from "react";
import "./navbar.css";
import NavigationItem from "../NavigationItem/navigationItem";
import SignUp from "./../../Auth/signup";
import NotificationMenu from "../../Tabs/notificationMenu";

class Navbar extends Component {
  render() {
    return (
      <div id="menu">
        <nav className="navbar navbar-expand-lg" style={{ margin: "40px" }}>
          <a className="navbar-brand" href="/anasayfa">
            <img
              className="logo"
              src={require("./../../Res/images/verBiPatiLogo.png")}
              alt="Ver Bi Pati"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Neler Yapıyoruz?
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li className="nav-item dropdown">
                    <a className="dropdown-item" href="/projeler">
                      Projelerimiz
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="dropdown-item" href="/etkinlikler">
                      Etkinliklerimiz
                    </a>
                  </li>
                </ul>
              </li>
              <NavigationItem link="/beslemetakvimi">
                Besleme Programı
              </NavigationItem>
              <NavigationItem link="/destekol">Destek Ol</NavigationItem>
              <NavigationItem link="/ilanlar">
                Kayıp {"&"} Sahiplendirme
              </NavigationItem>
              <NavigationItem link="/galeri">Galeri</NavigationItem>
              <NavigationItem link="/iletisim">İletişim</NavigationItem>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <NotificationMenu
                firebase={this.props.firebase}
              ></NotificationMenu>
              <SignUp firebase={this.props.firebase}></SignUp>
              )}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
