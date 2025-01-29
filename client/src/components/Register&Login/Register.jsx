import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import'./Login&Register.css'
import { Link } from 'react-router-dom';

const Register = () => {

    const [name,setName] = useState("");
    const[email,setEmail] = useState("");
    const [password,setPassword]=useState("");
    const navigate =useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/smsBK/register',{name,email,password})
        .then(result =>{console.log(result)
            navigate("/login")
        })
        .catch(err=>console.log(err))
        
      
    }
  return (
    <div className="sign-up-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Register</button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}

export default Register
