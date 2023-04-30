import React, { useState } from 'react';
import { FaUser, FaLock, FaFacebook, FaGoogle, FaApple } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './style.css';
import tw from 'twin.macro';
import 'fontsource-poppins';
import 'typeface-poppins';
import api from '../../services/api';
import { Alert, AlertTitle } from '@mui/material';



const Container = tw.div`flex flex-wrap justify-center items-center h-screen bg-gray-50 dark:bg-gray-900`;
const ContainerL = tw.div`flex-1 flex items-center justify-center`;
const ContainerR = tw.div`flex-1 bg-gradient-to-r from-teal-600 to-teal-400 dark:from-gray-900 dark:to-black`;
const FormContainer = tw.div` px-8 pt-6 pb-10 w-full`;
const Form = tw.form``;
const Input = tw.input`shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-inner bg-gray-100 dark:bg-gray-700 text-lg`; const Button = tw.button`bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-inner bg-blue-400 dark:bg-blue-300`;
const FormWrapper = tw.div`w-full lg:w-9/12`;
const UserInput = tw(Input)`block w-full mb-7 pl-10`;
const PasswordInput = tw(Input)`block w-full mb-6 pl-10`;




export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');




  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/logarUsuario', {
        email,
        password,
      });

      // aqui você pode armazenar o token de autenticação que recebeu do backend
      // e redirecionar o usuário para a homepage
      console.log(response.data);
      setSuccess('Logado com Sucesso');
      // Esconde a mensagem de sucesso após 5 segundos (5000 milissegundos)
      setTimeout(() => {
        setSuccess('');
        navigate('/homepage');
      }, 500);



    } catch (error) {
      setError('Email ou senha inválidos');
      setTimeout(() => {
        setError('');
      }, 500)
    }
  };


  return (
    <div>
      <Container>
        <ContainerL>
          <FormWrapper style={{ width: "100%", maxWidth: "600px" }}>
            <FormContainer className="form-container" style={{ padding: "2rem" }}>
              {error && (
                <Alert severity="error" onClose={() => setError('')}>
                  <AlertTitle>Erro</AlertTitle>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert severity="success" onClose={() => setSuccess('')}>
                  <AlertTitle>Sucesso</AlertTitle>
                  {success}
                </Alert>
              )}
              
              <img src="/yuzu2.png" alt="Yuzu" className="logo" style={{ maxWidth: "150%" }} />
          
              <Form onSubmit={handleSubmit} className="form">

                <div className="input-container">

                  <div className="icon-input-container">
                    <FaUser className="icon" style={{ color: "#ccc" }} />
                    <UserInput
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder='E-mail'
                      required
                    />
                  </div>
                </div>
                <div className="input-container">
                  <div className="icon-input-container">
                    <FaLock className="icon" style={{ color: "#ccc" }} />
                    <PasswordInput
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder='Senha'
                      required
                    />
                  </div>
                </div>
                <div className="button-container">
                  <Button type="submit" style={{ boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.25)', backgroundColor: '#008080' }} onClick={handleSubmit}>Entrar</Button>
                </div>
                <div className="links-container">
                  <a href="/primeiroacesso">Primeiro acesso</a>
                  <a href="/recuperasenha">Recuperar senha</a>
                </div>
                <div className="social-login">
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <span>Logar com:</span>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <a href="https://www.facebook.com/login"><FaFacebook /></a>
                      <a href="https://accounts.google.com/login"><FaGoogle /></a>
                      <a href="https://appleid.apple.com"><FaApple /></a>
                    </div>
                  </div>
                </div>
              </Form>
            </FormContainer>
          </FormWrapper>
        </ContainerL>
        <ContainerR className="container-r">
          <img src="empresa.png" alt="Yuzu" className="logo2" />
        </ContainerR>
      </Container>
    </div>
  );
}