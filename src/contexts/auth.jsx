import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listUser, setListUser] = useState([{}]);

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }

    setLoading(false);
  }, []);

  const login = (email, password) => {
    const loggedUser = {
      id: "123",
      email,
    };

    localStorage.setItem("user", JSON.stringify(loggedUser));

    listUser.map((usuario) => {
      if (usuario.email === email && usuario.password === password) {
        setUser(loggedUser);
        navigate("/");
      }
    });
    if (password === "12345" && email === "admin@admin.com") {
      setUser(loggedUser);
      navigate("/");
    }
  };

  const cadastro = (email, nome, password) => {
    setListUser([...listUser, { email, nome, password }]);
  };

  const cadastroMagia = () => {
    navigate("../");
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        login,
        loading,
        logout,
        cadastro,
        cadastroMagia,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
