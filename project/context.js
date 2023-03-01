import { createContext } from "react";
import { useState } from "react";

export const isAuthContext = createContext(false);

export const IsAuthContext = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  console.log(isAuth, "context");

  const toggleIsAuth = () => {
    // setIsAuth((prevAuth) => (prevAuth === false ? true : false));
    setIsAuth(true);
  };
  return (
    <isAuthContext.Provider value={{ isAuth, toggleIsAuth }}>
      {children}
    </isAuthContext.Provider>
  );
};
