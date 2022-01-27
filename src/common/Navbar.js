import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar(props) {
  
  const navigate = useNavigate();

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
                    {/* <li className="nav-item dropdown">
                        <p className="nav-link dropdown-toggle mb-0" data-bs-toggle="dropdown">Live Projects</p>
                        <ul className="dropdown-menu p-0">
                            <li><a className="dropdown-item py-3 px-4 font" href="https://medworld.daranip.com/"> Med
                                    World</a></li>
                            <li><a className="dropdown-item py-3 px-4 font" href="http://legitgoods.herokuapp.com/"> Legit
                                    Goods</a></li>
                            <li><a className="dropdown-item py-3 px-4 font" href="https://todo.daranip.com/"> Todo</a></li>
                            <li><a className="dropdown-item py-3 px-4 font" href="https://covid.daranip.com/"> Covid
                                    Project</a></li>
                            <li><a className="dropdown-item py-3 px-4 font" href="https://twitter.daranip.com/"> Twitter
                                    Clone</a></li>
                        </ul>
                    </li> */}
          </ul>
        </div>
        <span className="navbar-text litle-bigger">
          <div className="btn btn-darkblue btn-lg">Sign out</div>
          {/* <i class="fas fa-cog" style={{color:'black', fontSize:'1.5rem',marginTop:'0.3rem'}}></i> */}
        </span>
      </nav>
    </div>
  );
}

export default Navbar;
