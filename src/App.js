import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //this function will only run 1 time when App() starts, if App() is rebuild then not
  //if we add dependencies and if they are changed, then also this useEffect will run
  //useEffect handles sideEffects of some code
  //if we keep this code outside useEfffect directly inside the App() then
  //it will run in loop, setIsLoggedIn will be be called for firs time 
  //and App() component will rebuild
  //which in turn will call setIsLoggedIn again
  useEffect(()=>{
    const storedIsLoggedIn=localStorage.getItem('isLoggedIn');
    if(storedIsLoggedIn==='1'){
      setIsLoggedIn(true);
    }
  },[]);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn','1');
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
