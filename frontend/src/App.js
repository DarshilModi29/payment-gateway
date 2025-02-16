import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationForm from './pages/Registration';
import Signin from './pages/Signin';
import CustomNavbar from './components/Navbar';
import Home from './pages/Home';
import { Payment } from './pages/Payment';

function App() {
  return (
    <>
      <BrowserRouter>
        <CustomNavbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Signin />} />
          <Route path='/register' element={<RegistrationForm />} />
          <Route path='/payment' element={<Payment />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
