import React, { useContext } from "react";

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import Login from './pages/Login/Login'
import Home from './pages/home/Home'
import CadastrarMagia from './pages/cadastrarMagia/cadastrarMagia'
import InfoMagia from "./pages/infoMagia/infoMagia";

import { AuthProvider, AuthContext } from './contexts/auth'
import { Children } from "react";


const AppRoutes = () => {
    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext);

        if (loading) {
            return <div> Carregando...</div>;
        }

        if (!authenticated) {
            return <Navigate to="/login" />;
        }
        return children

    }


    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/" element={<Private><Home /></Private>} />
                    <Route exact path="/home" element={<Private><Home /></Private>} />
                    <Route exact path="/cadastrarMagia" element={<Private><CadastrarMagia /></Private>} />

                    <Route exact path="/spell/view" element={<Private><InfoMagia /></Private>}>
                        <Route path=":id" element={<Private><InfoMagia /></Private>} />
                    </Route>

                    <Route exact path="/spell/edit" element={<Private><InfoMagia /></Private>}>
                        <Route path=":id" element={<Private><InfoMagia /></Private>} />
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>

    )
}
export default AppRoutes;