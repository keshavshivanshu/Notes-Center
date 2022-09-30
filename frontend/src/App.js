
import './App.css';
import "./App.css";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyNotes from './screens/MyNotes/MyNotes';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import CreateNote from './screens/CreateNote/CreateNote';
import SingleNote from './screens/SingleNote/SingleNote';
import { useState } from 'react';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
const App = () => {
   const [search, setSearch] = useState("");
   return (
   <BrowserRouter>
   <Header setSearch={setSearch} />
   <main>
      <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/profile' element={<ProfileScreen />} />
      <Route path='/mynotes' element={<MyNotes search={search}/>} />
      <Route path='/note/:id' element={<SingleNote />} />
      <Route path="/createnote" element={<CreateNote />} />
      </Routes>
   </main>
   <Footer />
   </BrowserRouter>
)};


export default App;
