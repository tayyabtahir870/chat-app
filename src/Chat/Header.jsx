import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { AuthContext } from '../Context/AuthContext';
function Header() {
  const {currentUser}=useContext(AuthContext)
   const navigate=useNavigate('');

 

  const signout = () => {
    auth.signOut();
    navigate("/login");
  };
  return (
    <div className='header p-2'>
        <span className="logo">SyntecX Chat</span>
        <div className="user">
            <img src={currentUser.photoURL} alt="" />
            <span className='mt-1'>{currentUser.displayName}</span>
            <button onClick={()=>signout()}>Logout</button>
        </div>
    </div>
  )
}

export default Header