import React, { useState } from "react";
import './LoginSignup.css';
import person from '../assert/person.png';
import password from '../assert/password.png';
import email from '../assert/email.png';
import phone from '../assert/phone.png';
import axios from 'axios';

const LoginSignup = () => {
  const [Name, setName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const [action, setAction] = useState("Login");

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:5000/login", {
      email: Email, password: Password,name:Name,phone:PhoneNumber
    })
    
    const payload = action === "Sign Up"
      ? { name: Name, phone: PhoneNumber, email: Email, password: Password }
      : { email: Email, password: Password };

    const endpoint = action === "Sign Up"
      ? "http://localhost:5000/api/signup"
      : "http://localhost:5000/api/login";

    axios.post(endpoint, payload)
      .then((response) => {
        console.log(response.data);
        alert(`${action} successful!`);
        // Redirect or set user state here
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert(`Failed to ${action.toLowerCase()}.`);
      });
  };

  const handleMouseEnter = () => {
    let container = document.querySelector('.container');
    container.style.transform = 'scale(1.05)';
  };

  const handleMouseLeave = () => {
    let container = document.querySelector('.container');
    container.style.transform = 'scale(1.0)';
  };

  const handleForgotPasswordClick = () => {
    window.location.href = '/Lostpassword';
  };

  return (
    <div className='container' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="inputs">
          {action === "Sign Up" && (
            <div className="input">
              <img src={person} alt="" />
              <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            </div>
          )}
          {action === "Sign Up" && (
            <div className="input">
              <img src={phone} alt="" />
              <input type="tel" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
          )}
          <div className="input">
            <img src={email} alt="" />
            <input type="email" placeholder="Email Id" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input">
            <img src={password} alt="" />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          </div>
        </div>

        <button type="submit" className="submit-button">{action}</button>
      </form>

      {action === "Login" && (
        <button className="forgot-password">
        Lost Password? <span onClick={handleForgotPasswordClick}>Click here!</span>
      </button>
      )}

      <div className="submit-container">

        <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => setAction("Sign Up")}>Sign Up</div>
        <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => setAction("Login")}>Sign In</div>
      </div>
    </div>
  );
};


export default LoginSignup;
