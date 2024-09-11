import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import '../Login/login.css';

const Login = ({ role }) => {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleToggle = () => {
    setIsSignIn(!isSignIn);
  };

  const handleGoogleLogin = (response) => {
    console.log('Google login response:', response);
  };

  return (
    <div className={`container ${!isSignIn ? 'active' : ''}`} id="container">
      <div className="form-container sign-up">
        <form>
          <h1>Create Account ({role})</h1>
          <div className="social-icons">
            <GoogleLogin onSuccess={handleGoogleLogin} />
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form>
          <h1>Sign In ({role})</h1>
          <div className="social-icons">
            <GoogleLogin onSuccess={handleGoogleLogin} />
          </div>
          <span>or use your email and password</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Forget Your Password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button className={isSignIn ? 'hidden' : ''} onClick={handleToggle}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, {role}!</h1>
            <p>Register with your personal details to use all of site features</p>
            <button className={isSignIn ? '' : 'hidden'} onClick={handleToggle}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
