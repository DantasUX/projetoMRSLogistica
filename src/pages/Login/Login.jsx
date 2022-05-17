
import React, { useState, useContext } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styled from 'styled-components'
import Container from '@mui/material/Container';
import Logo from '../../img/logo.png'

import { AuthContext } from "../../contexts/auth";


const SCLogo = styled.div`
    width: 100% ;
    display: flex ;
    align-items: center ;
    justify-content: center ;
    margin-top: -5rem ;
    img{
        width: 10rem ;
    }
`
const SCBtnSubmit = styled(Button)`
    margin-top: 50px !important;
    height: 3rem !important;
    background: #A30201 !important;
`
const SCContainer = styled(Container)`
    padding: 2rem ;
    border-radius: 8px ;
    box-shadow: 0px 5px 14px -5px black;
    background-color: #fff ;
    margin-top: 10rem ;

    animation: go-back 2s;


    @media (max-width: 650px){
        width: 80% !important;
    }
    @keyframes go-back {
    0% {
        transform: translateY(100px);
        opacity: 0 ;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}
`
const SCContainer2 = styled(SCContainer)`
`
const SCTitle = styled.h1`
    text-align: center ;
    color: #3B3B3B ;
    font-weight: 400 ;

`
const SCCadastrar = styled.h5`
    text-align: center ;
    color: #3B3B3B ;
    a{
        color:  #A30201;
        text-decoration: none ;
        cursor: pointer ;
    }

`



function FormLogin() {
    const [register, setRegister] = useState(true)
    const { authenticated, login, cadastro } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    }

    const registerSubmit = (event) => {
        setRegister(true);
        event.preventDefault();
        cadastro(registerEmail, name, registerPassword);

        setRegisterEmail("")
        setRegisterPassword("");
        setName("");
    }



    if (register) {
        return (
            <SCContainer maxWidth="sm">
                <SCLogo> <img src={Logo}></img></SCLogo>
                <SCTitle>Grifinória</SCTitle>
                <form onSubmit={handleSubmit}>
                    <TextField
                        type="email"
                        name="user"
                        id="email-Login"
                        label="E-mail"
                        variant="outlined"
                        fullWidth margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        type="password"
                        name="password"
                        id="senha-Login"
                        label="Senha"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <SCBtnSubmit variant="contained" size="large" type="submet" fullWidth >Entrar</SCBtnSubmit>
                </form>
                <SCCadastrar>Quero me <a onClick={() => setRegister(false)}> cadastrar </a> </SCCadastrar>
            </SCContainer>
        )
    } else {
        return (
            <SCContainer2 maxWidth="sm">
                <SCLogo> <img src={Logo} /></SCLogo>
                <SCTitle>Faça seu Cadastro</SCTitle>
                <form onSubmit={registerSubmit}>
                    <TextField
                        type="email"
                        name="user"
                        id="eamil-registro"
                        label="E-mail"
                        variant="outlined"
                        fullWidth margin="normal"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                    />
                    <TextField
                        type="text"
                        name="nome"
                        id="nome-registro"
                        label="Nome"
                        variant="outlined"
                        fullWidth margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        type="password"
                        name="password"
                        id="senha-registro"
                        label="Senha"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                    />


                    <SCBtnSubmit variant="contained" size="large" type="submet" fullWidth >Cadastrar</SCBtnSubmit>
                </form>
                <SCCadastrar><a onClick={() => setRegister(true)}> cancelar </a> </SCCadastrar>
            </SCContainer2>
        )
    }
}



export default FormLogin;