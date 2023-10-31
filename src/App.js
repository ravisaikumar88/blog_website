import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import { useState } from 'react';
import Login from './pages/Login';

// Firebase imports
import { signOut } from 'firebase/auth';
import { auth } from './fc';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    // Using the imported signOut and auth from Firebase
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      <nav>
        <Link to='/'><b>WRITESCAPE</b></Link>
        {!isAuth ? <Link to='/login'>Login</Link> :
          (
            <>
              <Link to='/createpost' className='createpost'><button className='postbutton'>CREATE POST</button></Link>
              <button className='postbutton' onClick={signUserOut}>Log Out</button>
            </>
          )}
      </nav>
      <Routes>
        <Route path='/' element={<Home isAuth={isAuth} />} />
        <Route path='/createpost' element={<CreatePost isAuth={isAuth} />} />
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;