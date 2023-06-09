import React from 'react'
import Header from './Header'
import Search  from './Search'
import Chats from './Chats'


function Sidebar() {
  return (
    <div className='sidebar'>
      <Header/>
       <Search/>
       <Chats/>
    
    
    </div>
  )
}

export default Sidebar