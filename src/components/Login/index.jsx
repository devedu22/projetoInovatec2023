import React, { useState } from 'react';
import { FaUser, FaLock, FaFacebook, FaGoogle, FaApple } from 'react-icons/fa';
import './style.css';
import tw from 'twin.macro';
import 'fontsource-poppins';
import 'typeface-poppins';

const Container = tw.div`flex flex-wrap justify-center items-center h-screen bg-gray-50 dark:bg-gray-900`;
const ContainerL = tw.div`flex-1 flex items-center justify-center`;
const ContainerR = tw.div`flex-1 bg-gradient-to-r from-teal-600 to-teal-400 dark:from-gray-900 dark:to-black`;
const FormContainer = tw.div` px-8 pt-6 pb-10 w-full`;
const Form = tw.form``;
const Input = tw.input`shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-inner bg-gray-100 dark:bg-gray-700 text-lg`; const Button = tw.button`bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-inner bg-blue-400 dark:bg-blue-300`;
const FormWrapper = tw.div`w-full lg:w-9/12`;
const UserInput = tw(Input)`block w-full mb-7 pl-10`;
const PasswordInput = tw(Input)`block w-full mb-6 pl-10`;
const Title = tw.h2`font-bold text-3xl text-gray-800 mb-5 font-sans`;



export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');



  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // lógica de autenticação aqui
  };

  return (
    <div>
      <Container>
        <ContainerL>
          <FormWrapper style={{ width: "100%", maxWidth: "600px" }}>
            <FormContainer className="form-container" style={{ padding: "2rem" }}>
            <img src="/yuzu2.png" alt="Yuzu" className="logo" style={{ maxWidth: "100%" }} />
              <Title>Login</Title>
              <Form onSubmit={handleSubmit} className="form">

                <div className="input-container">

                  <div className="icon-input-container">
                    <FaUser className="icon" style={{ color: "#ccc" }} />
                    <UserInput
                      type="text"
                      id="username"
                      name="username"
                      value={username}
                      onChange={handleUsernameChange}
                      placeholder='Usuário'
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
                  <Button type="submit" style={{ boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.25)', backgroundColor: '#008080' }}>Entrar</Button>
                </div>
                <div className="links-container">
                  <a href="a">Primeiro acesso</a>
                  <a href="a">Recuperar senha</a>
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