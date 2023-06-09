import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";


function Chats() {
  const {currentUser}=useContext(AuthContext);
  const {dispatch}=useContext(ChatContext);
 

  const [chats,setChats]=useState([]);


  const handleSelect =(u)=>{
    dispatch({type:"CHANGE_USER", payload:u})
  }


 

  useEffect (()=>{
    const getChats =()=>{
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
     });
     return()=>{
     unsub();
     };
    }
    currentUser.uid && getChats();
  },[currentUser.uid])

  console.log(Object.entries(chats));

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map(chat=>(

     
      <div className="userchat" key={chat[0]}  onClick={()=>handleSelect(chat[1].userInfo)} >
        <img src={chat[1].userInfo.photoURL} alt="" />
        <div className="userinfo">
          <span className="chatname">{chat[1].userInfo.displayName}</span>
          <p className="chatmsg">{chat[1].lastMessage?.text}</p>
        </div>
      </div>
       ))}
    </div>
  );
}

export default Chats;
