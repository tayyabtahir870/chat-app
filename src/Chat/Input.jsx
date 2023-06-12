import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';
import {FcPicture} from "react-icons/fc";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage';


  

function Input() { 

  const [text,setText]=useState("");
  const [img,setImg]=useState(null);
  const {currentUser}=useContext(AuthContext);
  const {data}=useContext(ChatContext);


  const handleSend = async()=>{
    
    if(img){
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          // setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db,"chats", data.chatId),{
              messages :arrayUnion({
                id: uuid(),
                text,
                senderId : currentUser.uid,
                date : Timestamp.now(),
                img : downloadURL,
              })
             })
          });
        }
      );
    }else{
    await updateDoc(doc(db,"chats", data.chatId),{
     messages :arrayUnion({
       id: uuid(),
       text,
       senderId : currentUser.uid,
       date : Timestamp.now(),
     })
    })
    }

    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId+".date"]:serverTimestamp()
    })
    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId+".date"]:serverTimestamp()
    })
    setText("");
    setImg(null);
   };



  return (
    <div className='input'>
      <input className='type' type="text" placeholder='Type Something..' onChange={e=>setText(e.target.value)} value={text}  />
      <div className="send">
        <img src="" alt="" />
        <input  type="file" id='picture' style={{display:"none"}}  onChange={e=>setImg(e.target.files[0])}  />
        <label  htmlFor="picture"><FcPicture className='icon' size={40}/></label>
        <button onClick={handleSend} >Send</button>
      </div>
      </div>
  )
}

export default Input