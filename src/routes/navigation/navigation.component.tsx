import { Outlet, Link } from "react-router-dom";

import { ReactComponent as HomeIcon } from "../../assets/icon-home.svg";
import { ReactComponent as SettingsIcon } from "../../assets/icon-settings.svg";

import "./navigation.styles.scss";

function Navigation() {
  return (
    <>
      <div className="navigation">
        <div className="navigation-inner">
          <Link className="nav-link" to="/">
            <HomeIcon className="nav-icon icon-house" />
          </Link>
          <Link className="nav-link" to="/admin">
            <SettingsIcon className="nav-icon icon-gear" />
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Navigation;
