 import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function Login() {

  const Navigate =useNavigate();
  const [err, setErr] = useState(false);


  const Signin= async (e)=>{
    e.preventDefault();
    const email=e.target[0].value;
    const password=e.target[1].value;
      try{
        await signInWithEmailAndPassword(auth,email,password)
        Navigate("/")
      }catch (err){
          setErr(true);
      }
    
     
    }
  return (
    <div className="formcontainer">
      <div className="formwrapper">
        <h3 className="logo">SyntecX Chathub</h3>
        <h4 className="logo">Login</h4>
        <form onSubmit={Signin}>
         
          <input className="username" type="email" placeholder="Email"   />
          <input className="username" type="password" placeholder="Password"  />
         
          <button className="signupbutton" type="submit">Login</button>
          {err && <span>Something went wrong</span>}
        </form>
        <br />
        <p>Create new account?</p>
        <Link className="login" to="/register" >Register</Link>
      </div>
    </div>
  );
}

export default Login;
