import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";


function Message({ message}) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
 

  return (
    <div className={`message  ${message.senderId === currentUser.uid && "owner"}` }>
      <div className="message info">
        {/* <img className="img-fluid"
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        /> */}
        <span className="mt-3">Just now</span>
      </div>
      <div className="messagecontent">
        <p>{message.text}</p>
        
        { message.img && < img src={message.img} className="img-fluid" alt="" width={200} />}
      </div>
      
    </div>
  );
}

export default Message;
