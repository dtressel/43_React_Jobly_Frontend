import { useState, useEffect } from 'react';
import JoblyApi from '../api';

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  console.log(currentUser);

  useEffect(() => {
    const getUserInfo = async () => {
      const user = await JoblyApi.getUser(currentUser.username);
      setCurrentUser(user);
    }
    if (currentUser && !currentUser.email) {
      getUserInfo();
    } 
  }, [currentUser]);

  if (currentUser === undefined) {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      savedUser.applications = [];
      const { token, ...rest } = savedUser;
      setCurrentUser(rest);
      JoblyApi.token = token;
    }
  }

  const signupUser = async (signupInfo) => {
    try {
      const newToken = await JoblyApi.signupUser(signupInfo);
      JoblyApi.token = newToken;
      const user = await JoblyApi.getUser(signupInfo.username);
      setCurrentUser(user);
      localStorage.setItem("user", JSON.stringify({ username: user.username, firstName: user.firstName, token: newToken }));
      return { successful: true };
    }
    catch(err) {
      return { successful: false, messages: err };
    }
  }

  const loginUser = async (loginInfo) => {
    try {
      const newToken = await JoblyApi.loginUser(loginInfo);
      JoblyApi.token = newToken;
      const user = await JoblyApi.getUser(loginInfo.username);
      setCurrentUser(user);
      localStorage.setItem("user", JSON.stringify({ username: user.username, firstName: user.firstName, token: newToken }));
      return { successful: true };
    }
    catch(err) {
      return { successful: false, messages: err };
    }
  }

  const logoutUser = () => {
    JoblyApi.token = null;
    setCurrentUser(null);
    localStorage.removeItem("user");
  }

  const validatePassword = async (password) => {
    try {
      await JoblyApi.loginUser({ username: currentUser.username, password: password });
      return true;
    }
    catch {
      return false;
    }
  }

  const updateUser = async (updateInfo) => {
    try {
      const updatedUser = await JoblyApi.updateUser(currentUser.username, updateInfo);
      setCurrentUser(() => ({ ...updatedUser, applications: currentUser.applications }));
      localStorage.setItem("user", JSON.stringify({ username: updatedUser.username, firstName: updateInfo.firstName, token: JoblyApi.token }));
      return {updated: true, message: "User profile successfully updated!"}
    }
    catch {
      return {updated: false, message: "Server error. User profile not updated. Please try again later!"}
    }
  }

  const addApplication = async (jobId) => {
    try {
      await JoblyApi.applyJob(currentUser.username, jobId);
      setCurrentUser(() => ({...currentUser, applications: [...currentUser.applications, jobId]}));
      return true;
    }
    catch {
      return false;
    }
  }

  return [currentUser, signupUser, loginUser, logoutUser, validatePassword, updateUser, addApplication];
}

export default useCurrentUser;