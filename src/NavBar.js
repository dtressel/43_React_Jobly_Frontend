import "./NavBar.css";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from './UserContext';

const NavBar = ({ logoutUser }) => {
  const user = useContext(UserContext);

  const handleLogout = () => {
    logoutUser();
  }

  return(
    <div>
      <Navbar expand="md">
        <NavLink to="/" className="navbar-brand">Jobly</NavLink>
        <Nav className="ml-auto" navbar>
          {user
            ?
              <>
                <NavItem>
                  <NavLink to="/companies">Companies</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/jobs">Jobs</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/profile">Profile</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink 
                    className="NavBar-no-active-style"
                    onClick={handleLogout} 
                    to='/'
                  >Log out {user.username}</NavLink>
                </NavItem>
              </>
            :
              <>
                <NavItem>
                  <NavLink to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/signup">Signup</NavLink>
                </NavItem>
              </>
          }
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;