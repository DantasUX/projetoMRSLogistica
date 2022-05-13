import { Button } from "@mui/material";
import React, { useContext } from "react";

import { AuthContext } from "../../contexts/auth";

function Home() {
    const { authenticated, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();

    }
    return (
        <div>
            <h1>home</h1>
            <p> {String(authenticated)}</p>
            <a href="/magia">magia ir</a>
            <button onClick={handleLogout}>sair</button>

        </div>

    )
}

export default Home;