import React, { useState } from 'react';
import { NavLink as Link } from 'react-router-dom';


export default function Nav() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Eighth navbar example">
        <div className="container">
          <Link className="navbar-brand" to="/">Todo Note</Link>
          <button class="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
            <span class="navbar-toggler-icon"></span>
          </button>

          <div>
            {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button> */}
          </div>

          <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}  id="navbarsExample09" >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/todo">Todo</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/notes" >Notes</Link>
              </li>
              {/* <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/" id="dropdown07" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
            <ul className="dropdown-menu" aria-labelledby="dropdown07">
              <li><a className="dropdown-item" href="/">Action</a></li>
              <li><a className="dropdown-item" href="/">Another action</a></li>
              <li><a className="dropdown-item" href="/">Something else here</a></li>
            </ul>
          </li> */}
            </ul>
            {/* <form>
          <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
        </form> */}
          </div>
        </div>
      </nav>
    </>
  )
}
