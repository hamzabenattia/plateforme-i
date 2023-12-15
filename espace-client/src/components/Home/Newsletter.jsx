import SendIcon from '@mui/icons-material/Send';
import { Alert, Stack } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import styled from "styled-components";

const Container = styled.div`
  background-color: #F9F9F9;
  display: flex;
  justify-content: center;
  align-items: center ;
  height:30vh ;
`;
const Title = styled.h1`
  font-size: 30px;
  font-family: Lato;

`;

const Desc = styled.div`
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 20px;

`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  display: flex;
  border-radius: 10px ;
justify-content  :flex-end ;

`;

const Input = styled.input`
  flex: 8;
  padding-left: 20px;




  
`;

const Button = styled.button`
  flex: 1;
  background-color:#1B7BFA ;
  border: none;
  color: black;
  cursor: pointer;
`;

const Newsletter = () => {



  const [email, setEmail] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:1000/api/news",{email}).then((response)=>{
      alert(response.data)
    }).catch((err)=>{
      console.log(err)
    }) ; };





  return (
    <Container>
      
        <div>
      <Title>NEWSLETTER</Title>
      
      <Desc>Vous pouvez vous désinscrire à tout moment. Vous trouverez pour cela nos informations de contact dans les conditions d'utilisation du site.</Desc>
      </div>
      <InputContainer>
    
        <Input placeholder="Entrer votre E-mail"    onChange={(e) => setEmail(e.target.value)}/>
        <Button onClick={submitHandler}>
          <SendIcon />
        </Button>
      </InputContainer>
    
    </Container>

  );
};

export default Newsletter;
