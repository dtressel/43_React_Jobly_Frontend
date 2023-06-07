import { useState } from 'react';
import { Label, Input, Button, Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import useFields from './hooks/useFields';
import './LoginSignup.css';

const Login = ({ loginUser }) => {
  const [formData, handleChange, resetForm] = useFields({
    username: '',
    password: ''
  })
  const navigate = useNavigate();
  const [alertMessages, setAlertMessages] = useState();

  const handleSubmit = async evt => {
    evt.preventDefault();
    const res = await loginUser(formData);
    if (res.successful) {
      resetForm();
      navigate("/");
    }
    else {
      setAlertMessages(res.messages);
    }
  }
  return (
    <>
      <h2 className="auth-form-header">Log In</h2>
      <div className="auth-form-wrapper">
        <form onSubmit={handleSubmit} className="auth-form">
          <Label htmlFor="username">Username</Label>
          <Input 
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <Label htmlFor="password">Password</Label>
          <Input 
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" color="primary">Submit</Button>
        </form>
        {alertMessages && alertMessages.map((msg) => {
          return <Alert color="danger">{msg}</Alert>
        })}
      </div>
    </>
  )
}

export default Login;