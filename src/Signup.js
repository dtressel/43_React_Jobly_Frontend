import { useState } from 'react';
import { Label, Input, Button, Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import useFields from './hooks/useFields';
import './LoginSignup.css';

const Signup = ({ signupUser }) => {
  const [formData, handleChange, resetForm] = useFields({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  })
  const navigate = useNavigate();
  const [alertMessages, setAlertMessages] = useState();

  const handleSubmit = async evt => {
    evt.preventDefault();
    const res = await signupUser(formData);
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
      <h2 className="auth-form-header">Sign Up</h2>
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
          <Label htmlFor="firstName">First Name</Label>
          <Input 
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <Label htmlFor="lastName">Last Name</Label>
          <Input 
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <Label htmlFor="email">Email</Label>
          <Input 
            type="email"
            id="email"
            name="email"
            value={formData.email}
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

export default Signup;