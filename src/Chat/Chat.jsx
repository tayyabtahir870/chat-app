import React, { useContext } from 'react';
import {FaVideo} from 'react-icons/fa';
import {FaUserFriends} from 'react-icons/fa';
import {FiMoreVertical} from 'react-icons/fi';
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../Context/ChatContext';


 

function Chat() {


  const {data}=useContext(ChatContext);

  return (
    <div className='chat'>
      <div className="chatuserinfo">
        <span>{data.user?.displayName}</span>
        <div className='chaticons'>
           <FaVideo size={22} color='white'/> &nbsp;&nbsp;&nbsp;&nbsp;
           <FaUserFriends size={22} color='white'/>&nbsp;&nbsp;&nbsp;&nbsp;
           <FiMoreVertical size={22} color='white'/>

        </div>
       
      </div>

      <Messages/>
      <Input/>

    </div>
  )
}

export default Chat