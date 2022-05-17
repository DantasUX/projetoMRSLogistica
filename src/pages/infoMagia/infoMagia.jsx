import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import styled from 'styled-components'
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import { useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import axios from "axios";
import { useLocation } from "react-router-dom";




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
    color: #fff ;
    padding: 2rem ;
    border-radius: 8px ;
    background-color: #fff;
    color: #3B3B3B ;
    animation: go-back 2s;
    display: flex !important;
    align-items: center ;
    flex-direction: column;
    padding-bottom: 6rem !important;





    @media (max-width: 1280px){
        width: 85% !important;
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

    }

`
const SCBtnFormulario = styled(SCBtnSubmit)`
    margin: 0 !important;
    margin-top: 1rem !important;
`


function InfoMagia() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [spell, setSpell] = useState({});
    const [pagview, setPagView] = useState(true);

    const { authenticated, logout } = useContext(AuthContext);

    const params = useParams();
    const location = useLocation();

    async function handleEdit() {
        setIsLoaded(false);
        await axios.put(`https://9488e748.us-south.apigw.appdomain.cloud/api/v1/spells`, {
            id: spell.id,
            name: spell.name,
            type: spell.type,
            version: spell.version
        })
        setIsLoaded(true);

    }


    useEffect(() => {
        if (!location.pathname.includes('view')) {
            setPagView(false);
        }
        else {
            setPagView(true);
        }

        async function getSpell() {
            axios.post(`https://9488e748.us-south.apigw.appdomain.cloud/api/v1/spells/findById`, {
                id: params.id
            })
                .then(function (response) {
                    setSpell(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
        getSpell();
        setIsLoaded(true);

    }, [])

    const handleLogout = () => {
        logout();
    }





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
                <SCContainer>
                    <h2> Magia Selecionada</h2>
                    <Divider />
                    <SCListCards>
                        <form>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                disabled
                                type="text"
                                name="id"
                                id="id-magia"
                                label="Id"
                                variant="outlined"
                                fullWidth margin="normal"
                                value={spell.id}
                                onChange={(e) => setSpell({ ...spell, id: e.target.value })}
                            />
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                disabled={pagview}
                                type="text"
                                name="nome"
                                id="nome-magia"
                                label="Nome da Magia"
                                variant="outlined"
                                fullWidth margin="normal"
                                value={spell.name}
                                onChange={(e) => setSpell({ ...spell, name: e.target.value })}
                            />

                            <TextField
                                InputLabelProps={{ shrink: true }}
                                disabled={pagview}
                                type="text"
                                name="typeMagina"
                                id="type-magia"
                                label="Tipo da Magia"
                                variant="outlined"
                                fullWidth margin="normal"
                                value={spell.type}

                                onChange={(e) => setSpell({ ...spell, type: e.target.value })}
                            />

                            {!pagview ?
                                <SCBtnFormulario variant="contained" size="large" onClick={() => handleEdit()} fullWidth >Editar</SCBtnFormulario>
                                :
                                null}
                        </form>

                    </SCListCards>
                </SCContainer>
            </>
        );
    }
}







export default InfoMagia;