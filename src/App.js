import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from './NavBar';
import Home from './Home';
import Companies from './Companies';
import CompanyDetails from './CompanyDetails';
import Jobs from './Jobs';
import Signup from './Signup';
import Profile from './Profile';
import Login from './Login';
import userContext from './UserContext';
import useCurrentUser from "./hooks/useCurrentUser";
import './App.css';

function App() {
  const [currentUser, signupUser, loginUser, logoutUser, validatePassword, updateUser, addApplication] = useCurrentUser();

  return (
    <div className="App">
      <userContext.Provider value={currentUser}>
        <NavBar logoutUser={logoutUser} />
        <div className="App-main-wrapper">
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/*' element={<Navigate to="/" replace={true} />} />
              {currentUser 
                ?
                  <>
                    <Route path='/companies' element={<Companies />} />
                    <Route path='/companies/:handle' element= {<CompanyDetails addApplication={addApplication} />} />
                    <Route path='/jobs' element={<Jobs addApplication={addApplication} />} />
                    <Route path='/profile' element={<Profile validatePassword={validatePassword} updateUser={updateUser} />} />
                  </>
                : 
                  <>
                    <Route path='/signup' element={<Signup signupUser={signupUser}/>} />
                    <Route path='/login' element={<Login loginUser={loginUser} />} />
                  </>
              }
            </Routes>
          </main>
        </div>
      </userContext.Provider>
    </div>
  );
}

export default App;
