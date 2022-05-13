import React, { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [listUser, setListUser] = useState([{}]);

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user');

        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser));
        }

        setLoading(false);
        console.log(listUser);

    }, []);

    const login = (email, password) => {
        console.log("login auth", { email, password });

        const loggedUser = {
            id: "123",
            email,
        };

        localStorage.setItem("user", JSON.stringify(loggedUser));

        listUser.map(
            (usuario) => {
                if (usuario.email === email && usuario.password === password) {
                    setUser(loggedUser);
                    navigate('/');
                }

            }
        )
        if (password === "12345") {
            setUser(loggedUser);
            navigate('/');
        }
    };

    const cadastro = (email, nome, password) => {
        setListUser([...listUser, { email, nome, password }])
        console.log(listUser)
    };

    const logout = () => {
        console.log("logout");
        //localStorage.removeItem('user');
        setUser(null);
        navigate("/login");

    };


    return (
        <AuthContext.Provider
            value={{ authenticated: !!user, user, login, loading, logout, cadastro }}>
            {children}
        </AuthContext.Provider>

    )
}

