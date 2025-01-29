import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import'./Login&Register.css' // Import the CSS file
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign up logic here (e.g., API call)
    axios.post('http://127.0.0.1:8000/smsBK/login',{email,password})
    .then(result => {console.log(result)
        if(result.data === "Success"){
            navigate("/home")
        }else{
            alert("password is wrong")
        }
        

    })
    .catch(err=> console.log(err))
    
  };

    return(
        <div className="sign-up-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
         You have not Account? <Link to="/">Register</Link>
        </p>
      </div>
    )
}

export default Login;