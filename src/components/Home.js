import React, { useState, useEffect } from "react";

import AuthService from "../services/auth.service";

import Main from "./Main";
import Login from "./Login";

const Home = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
      const user = AuthService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
      }
    }, []);
    return (
    <div>
      {currentUser ? (
        <Main/>
      ) : (
        <Login/>
      )}
    </div>  
  );
};

export default Home;


