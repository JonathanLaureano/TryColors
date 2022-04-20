import './SignIn.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios';

function SignIn() {

  const [formType, setFormType] = useState(true)
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");


  // Log In:
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Signed In:
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState(null)


  function onFormClick() {
      setFormType(formType => !formType)
  }

  function handleSignUpSubmit(e) {
    e.preventDefault();
    const signUpDetails = {
      username: signUpUsername,
      password: signUpPassword,
    }
    axios.post("/signup", signUpDetails)
      .then(r => {
        console.log(r)
        setSignedIn(true)
        window.location.reload();

      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.errors);
          alert(error.response.data.errors)
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      });

  }

  function handleLogInSubmit(e) {
    e.preventDefault();
    const logInDetails = {
      username,
      password
    }

    axios.post("/login", logInDetails)
      .then((r) => {
        setSignedIn(true)
        setUser(r.data)
        window.location.reload();

      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.errors);
          alert(error.response.data.errors)
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      });
  }

  function handleLogOut() {
    axios.delete('/logout')
      .then(r => {
        setSignedIn(false);
        setUser(null);
        window.location.reload();
      })
  }

  useEffect(() => {
    fetch("/me")
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            setUser(user)
            setSignedIn(true)
          }
        );
      }
    });
  }, [])

  return (
      <div className='signin-modal'>
          <div className={formType ? "container" : "container right-panel-active"} id="container">
              <div className="signin-container">
                  <div className="form-container sign-up-container">
                      <form className='modal-form' action="#">
                          <h1 className='modal-create'>Create Account</h1>
                          <input className='modal-input' type="text" placeholder="Username" value={signUpUsername} onChange={(e) => setSignUpUsername(e.target.value)} />
                          <input className='modal-input' type="password" placeholder="Password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} />
                          <button className='modal-button' onClick={handleSignUpSubmit} >Sign Up</button>
                      </form>
                  </div>
                  <div className="form-container sign-in-container">
                      <form className='modal-form' action="#">
                          <h1 className='modal-signin-title'>Sign in</h1>
                          <input className='modal-input' type="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                          <input className='modal-input' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                          <button className='modal-button' onClick={handleLogInSubmit}>Sign In</button>
                      </form>
                  </div>
                  <div className="overlay-container">
                      <div className="overlay">
                          <div className="overlay-panel overlay-left">
                              <h1 className='modal-welcome'>Welcome</h1>
                              <button onClick={onFormClick} className=" modal-button ghost" id="signIn">Sign In</button>
                          </div>
                          <div className="overlay-panel overlay-right">
                              <h1 className='modal-welcome'>Welcome</h1>
                              <button onClick={onFormClick} className="modal-button ghost" id="signUp">Sign Up</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

    )
  }
  
  export default SignIn;