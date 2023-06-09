import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Register from './Components/Elements/Register';
import Login from './Components/Elements/Login';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './Components/Elements/Home';
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';



function App() {


  const {currentUser}= useContext(AuthContext)
   const ProtectedRoute = ({children})=>{
    if(!currentUser){
      return <Navigate to="/login"/>
    }
    return children
   }
 
 
  return (
    
      <div>
     
     <BrowserRouter>
     <Routes>
      <Route path='/'/>
      <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
  
     </Routes>
     </BrowserRouter>
    
    </div>
  
  );
}

export default App;
