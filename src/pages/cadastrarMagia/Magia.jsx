import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import styled from 'styled-components'
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';



const SCLoading = styled.div`
    color: #fff ;
    font-size: 2rem ;
    width: 100% ;
    height: 100vh ;
    margin: auto ;
    text-align: center ;
    font-weight: 800 ;
    margin-top: 20rem;
    animation: rotate 1s linear infinite;

    @keyframes rotate {
		0% { opacity: 0 ;} 50% { opacity: 1 ;} 100% { opacity: 0 ;}

	}

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
const SCMenu = styled.nav`
    display: flex ;
    justify-content: space-between ;
    align-items: center ;
    border-bottom:  5px solid #F9AA01 ;
    background-color: #fff;
    color: #A30201 ;
    box-shadow: 0px 0px 30px -5px black;
    margin-bottom: 3rem ;

`
const SCContainerMenu = styled(Container)`
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: space-between;
    align-items: center ;
    animation: go-back2 1s;


    @media (max-width: 1280px){
        width: 85% !important;
    }
    @keyframes go-back2 {
    0% {
        transform: translateY(-100px);
        opacity: 0 ;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}
`
const SCListCards = styled.div`
    display: flex ;
    flex-wrap: wrap ;
    justify-content: space-between ;

    @media (max-width: 1280px){
        justify-content: space-around !important;
    }
    @media (max-width: 1280px){
        justify-content: space-between ;
    }

`
const SCBtnSubmit = styled(Button)`
    height: 3rem !important;
    height: 3rem !important;
    background-color: #A30201 !important ;
    color: #fff !important;
    margin: 1rem  !important;
    padding: 0 1rem !important;

    @media (max-width: 500px){
        margin: 5px  !important;
    }

`
const SCBtnSubmitCadastro = styled(SCBtnSubmit)`
    margin: 0 !important ;
    margin-top: 2rem !important ;

`

function CadastrarMagia() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const { authenticated, logout } = useContext(AuthContext);

    const [nomeMagia, setNomeMagia] = useState("");
    const [typoMagia, setTypoMagia] = useState("");

    const handleLogout = () => {
        logout();
    }

    useEffect(() => {
        fetch("https://9488e748.us-south.apigw.appdomain.cloud/api/v1/spells")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.spells.sort(function (a, b) { //ordenando resultado
                        if (a.name < b.name) {
                            return -1;
                        } else {
                            return true;
                        }
                    }));
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <SCLoading>Loading...</SCLoading>;
    } else {
        return (
            <>
                <SCMenu>
                    <SCContainerMenu>
                        <h1>Grifinoria</h1>
                        <div>
                            <SCBtnSubmit href="/home">Home</SCBtnSubmit>
                            <SCBtnSubmit onClick={handleLogout}>sair</SCBtnSubmit>
                        </div>
                    </SCContainerMenu>
                </SCMenu>
                <SCContainer maxWidth="sm">
                    <h2> Cadastre Uma Magias</h2>
                    <Divider />
                    <form >

                        <TextField
                            type="text"
                            name="user"
                            id="eamil-registro"
                            label="Nome da Magia"
                            variant="outlined"
                            fullWidth margin="normal"
                            value={nomeMagia}
                            onChange={(e) => setNomeMagia(e.target.value)}
                        />
                        <TextField
                            type="text"
                            name="tipoMagina"
                            id="nome-registro"
                            label="Tipo da Magia"
                            variant="outlined"
                            fullWidth margin="normal"
                            value={typoMagia}
                            onChange={(e) => setTypoMagia(e.target.value)}
                        />


                        <SCBtnSubmitCadastro variant="contained" size="large" type="submet" fullWidth >Cadastrar</SCBtnSubmitCadastro>
                    </form>
                </SCContainer>
            </>
        );
    }
}

export default CadastrarMagia;