import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import axios from "axios";

const SCLoading = styled.div`
  color: #fff;
  font-size: 2rem;
  width: 100%;
  height: 100vh;
  margin: auto;
  text-align: center;
  font-weight: 800;
  margin-top: 20rem;
  animation: rotate 1s linear infinite;

  @keyframes rotate {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
const SCContainer = styled(Container)`
  color: #fff;
  padding: 2rem;
  border-radius: 8px;
  background-color: #fff;
  color: #3b3b3b;
  animation: go-back 2s;
  @media (max-width: 1280px) {
    width: 85% !important;
  }
  @keyframes go-back {
    0% {
      transform: translateY(100px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
const SCMenu = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px solid #f9aa01;
  background-color: #fff;
  color: #a30201;
  box-shadow: 0px 0px 30px -5px black;
  margin-bottom: 3rem;
`;
const SCContainerMenu = styled(Container)`
  display: flex !important;
  flex-wrap: wrap !important;
  justify-content: space-between;
  align-items: center;
  animation: go-back2 1s;

  @media (max-width: 1280px) {
    width: 85% !important;
  }
  @keyframes go-back2 {
    0% {
      transform: translateY(-100px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
const SCBtnSubmit = styled(Button)`
  height: 3rem !important;
  height: 3rem !important;
  background-color: #a30201 !important ;
  color: #fff !important;
  margin: 1rem !important;
  padding: 0 1rem !important;

  @media (max-width: 500px) {
    margin: 5px !important;
  }
`;
const SCBtnCadastrar = styled(SCBtnSubmit)`
  margin: 0rem !important;
  margin-top: 2rem !important;
`;

function CadastrarMagia() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { cadastroMagia, logout } = useContext(AuthContext);

  const [nomeMagia, setNomeMagia] = useState("");
  const [tipoMagia, setTipoMagia] = useState("");

  const handleLogout = () => {
    logout();
  };

  const PostMagia = async (event) => {
    event.preventDefault();
    const dadosMagia = {
      name: nomeMagia,
      type: tipoMagia,
    };
    try {
      const res = await axios.post(
        "https://9488e748.us-south.apigw.appdomain.cloud/api/v1/spells",
        { ...dadosMagia }
      );
      alert("Magia cadastrada com sucesso");
      cadastroMagia();
      return res.data;
    } catch (error) {
      alert("Não foi possivel cadastrar a magia- Error: " + error);
    }
  };
  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
              <SCBtnSubmit href="/">home</SCBtnSubmit>
              <SCBtnSubmit onClick={handleLogout}>sair</SCBtnSubmit>
            </div>
          </SCContainerMenu>
        </SCMenu>
        <SCContainer maxWidth="sm">
          <h2> Cadastre uma Magias</h2>
          <Divider />
          <form onSubmit={PostMagia}>
            <TextField
              type="text"
              name="nomeMagia"
              id="nomeMagia"
              label="Nome da Magia"
              variant="outlined"
              fullWidth
              margin="normal"
              value={nomeMagia}
              onChange={(e) => setNomeMagia(e.target.value)}
            />

            <TextField
              type="pastextsword"
              name="tipoMagia "
              id="tipo-magia"
              label="Tipo da Magia"
              variant="outlined"
              fullWidth
              margin="normal"
              value={tipoMagia}
              onChange={(e) => setTipoMagia(e.target.value)}
            />

            <SCBtnCadastrar
              variant="contained"
              size="large"
              type="submet"
              fullWidth
            >
              Cadastrar
            </SCBtnCadastrar>
          </form>
        </SCContainer>
      </>
    );
  }
}

export default CadastrarMagia;
