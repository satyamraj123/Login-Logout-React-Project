import React, { useState,useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogOut: () => {},
  onLogIn: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //this function will only run 1 time when App() starts, if App() is rebuild then not
  //if we add dependencies and if they are changed, then also this useEffect will run
  //useEffect handles sideEffects of some code
  //if we keep this code outside useEfffect directly inside the App() then
  //it will run in loop, setIsLoggedIn will be be called for firs time
  //and App() component will rebuild
  //which in turn will call setIsLoggedIn again
  //lec112-115
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "1");
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogOut: logoutHandler,
        onLogIn: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
