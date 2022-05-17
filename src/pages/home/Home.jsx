/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import styled from 'styled-components'
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { AiFillDelete } from 'react-icons/ai';
import { AiFillInfoCircle } from 'react-icons/ai';
import { AiFillEdit } from 'react-icons/ai';

import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import { height } from "@mui/system";



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
    background-color: rgba(0,0,0,0.5);
    animation: go-back 2s;
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
const SCCard = styled(Card)`
    display: flex ;
    flex-wrap: wrap ;
    margin: 1rem 0 ;
    color: #fff;
    box-shadow: 0px 4px 10px -2px black !important;
    width: 350px ;


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
const SCMenuCard = styled(CardActions)`
    width: 100% ;
    background-color: #A30201 ;
    color: #fff !important ;
    border-top: 5px solid #F9AA01 ;
    display: flex ;
    justify-content: flex-end ;
    a{
        text-decoration: none ;
        color: #fff ;
        display: flex ;
        align-items: baseline ;

        span{
            margin-left: 5px ;
        }
    }
    a:hover{
        opacity: 0.5 ;
    }


`


function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const { authenticated, logout } = useContext(AuthContext);

    useEffect(() => {
        fetchSpells()
    }, [])

    const handleLogout = () => {
        logout();
    }

    async function handleDelete(id) {
        setIsLoaded(false);
        await deleteMagia(id);
        await fetchSpells()

    }

    function deleteMagia(id) {
        return axios.delete(`https://9488e748.us-south.apigw.appdomain.cloud/api/v1/spells`, {
            headers: { 'Content-Type': 'application/json' },
            data: { id }
        })
    }

    async function getSpells() {
        const { spells } = await fetch("https://9488e748.us-south.apigw.appdomain.cloud/api/v1/spells")
            .then(res => res.json())

        return spells.sort(function (a, b) { //ordenando resultado
            if (a.name < b.name) {
                return -1;
            } else {
                return true;
            }
        })

    }

    async function fetchSpells() {
        setIsLoaded(false);
        try {
            const spells = await getSpells()
            setIsLoaded(true);
            setItems(spells);
        } catch (error) {
            setIsLoaded(true);
            setError(error);
        }
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
                            <SCBtnSubmit href="/cadastrarMagia">Cadastrar Magina</SCBtnSubmit>
                            <SCBtnSubmit onClick={handleLogout}>sair</SCBtnSubmit>
                        </div>
                    </SCContainerMenu>
                </SCMenu>
                <SCContainer>
                    <h2> Lista de Magias</h2>
                    <Divider />
                    <SCListCards>

                        {items.map(item => (
                            <SCCard sx={{ maxWidth: 345 }} key={item.id}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.type}
                                    </Typography>
                                </CardContent>
                                <SCMenuCard>
                                    <a size="small" onClick={() => handleDelete(item.id)}><AiFillDelete /><span>Excluir</span></a>
                                    <Link size="small" to={`/spell/view/${item.id}`}>
                                        <AiFillInfoCircle /><span>Informações</span>

                                    </Link>

                                    <Link size="small" to={`/spell/edit/${item.id}`}>
                                        <AiFillEdit /><span>Editar</span>

                                    </Link>

                                </SCMenuCard>
                            </SCCard>
                        ))}
                    </SCListCards>
                </SCContainer>
            </>
        );
    }
}







export default Home;