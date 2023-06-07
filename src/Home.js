import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';
import { Button } from "reactstrap";
import './Home.css';

const Home = () => {
  const user = useContext(UserContext);

  return(
    <div className="Home">
      <div className="Home-content-wrapper">
        <h1>Jobly</h1>
        <p>All the jobs in one, convenient place.</p>
        {user
          ? 
            <h2>Welcome Back, {user.firstName}!</h2>
          :
            <div>
              <Link to="/login"><Button color="primary">Log in</Button></Link>
              <Link to="/signup"><Button color="primary">Sign up</Button></Link>
            </div>
        }
      </div>
    </div>
  )
}

export default Home;