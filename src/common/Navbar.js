import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../helper/authHelper";
import { auth } from "../firebase-config";

function Navbar(props) {
  
  const navigate = useNavigate();

  const logout = () => {
    auth.signOut();
    localStorage.removeItem("uid");
    localStorage.removeItem("authObj");
    navigate("/");
  }

  return (
    <div>
      <nav className="container navbar navbar-expand-lg navbar-light bg-white pt-2">
        <h3 className="font m-2 m-md-0">Share Eats</h3>
        <div
          className="collapse navbar-collapse d-none d-lg-block"
          id="navbarText"
        >
          <ul className="navbar-nav mx-auto mt-2">
            <li className="nav-item">
                        <a className={"nav-link " + (props.activeNav == "donor" ? 'active' : '')} onClick={() => navigate('/donors')}>Donate</a>
                    </li>
                    <li className="nav-item">
                        <a className={"nav-link " + (props.activeNav == "receiver" ? 'active' : '')} onClick={() => navigate('/receivers')}>Need Food</a>
                    </li>
                    <li className="nav-item">
                        <a className={"nav-link " + (props.activeNav == "logs" ? 'active' : '')} onClick={() => navigate('/logs')}>Logs</a>
                    </li>
          </ul>
        </div>
        <span className="navbar-text litle-bigger">
          <div onClick={logout} className="btn btn-darkblue btn-lg">Sign out</div>
          {/* <i class="fas fa-cog" style={{color:'black', fontSize:'1.5rem',marginTop:'0.3rem'}}></i> */}
        </span>
      </nav>
    </div>
  );
}

export default Navbar;
