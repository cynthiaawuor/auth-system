import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DashBoard from './components/DashBoard';
import Login from './components/Login';
import PhoneVerify from './components/PhoneVerify';
import SignUp from './components/Signup';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<SignUp />} />
      <Route path='dashboard' element={<DashBoard />} /> 
      <Route path='phone/verify' element={<PhoneVerify />} />
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
