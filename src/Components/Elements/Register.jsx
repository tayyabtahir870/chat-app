import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

function Register() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate("");

  const Signup = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
              password,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {

            });
            navigate("/");
          });
        }
      );
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="formcontainer">
      <div className="formwrapper">
        <h3 className="logo">SyntecX Chathub</h3>
        <h4 className="logo">Register</h4>
        <form onSubmit={Signup}>
          <input className="username" type="text" placeholder="Username" />
          <input className="username" type="email" placeholder="Email" />
          <input className="username" type="password" placeholder="Password" />
          <input
            style={{ display: "none" }}
            className="username"
            id="file"
            type="file"
          />
          <label htmlFor="file">
            <img className="img-fluid" src="Assests/profile.png" alt="" />{" "}
            <span>Add Profile Image</span>
          </label>
          <button className="signupbutton" type="submit">
            Sign Up
          </button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>Already have an account?</p>
        <Link className="login" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
