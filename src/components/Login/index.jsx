import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import './style.css';
import tw from 'twin.macro';


const Container = tw.div`flex flex-wrap justify-center items-center h-screen bg-gray-800 dark:bg-gray-900 bg-white`;
const ContainerL = tw.div`flex-1 flex items-center justify-center`;
const ContainerR = tw.div`flex-1 bg-gradient-to-r from-blue-300 to-blue-200 dark:from-gray-900 dark:to-black`;
const FormContainer = tw.div` px-8 pt-6 pb-10 w-full`;
const Form = tw.form``;
const Input = tw.input`shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-inner bg-gray-100 dark:bg-gray-700 text-lg`; const Button = tw.button`bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-inner bg-blue-400 dark:bg-blue-300`;
const DarkModeButton = tw(Button)`absolute top-10 right-20 mt-4 mr-4`;
const FormWrapper = tw.div`w-full lg:w-4/5`;
const UserInput = tw(Input)`block w-full mb-7 pl-10`;
const PasswordInput = tw(Input)`block w-full mb-6 pl-10`;
const Title = tw.h2`font-bold text-3xl text-gray-800 mb-5 font-serif`;


export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Container>
        <ContainerL>
          <img src="/yuzu2.png" alt="Yuzu" className="logo" />
          <FormWrapper style={{ width: "90vh" }}>
            <FormContainer className="form-container" style={{ padding: "4rem" }}>
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
                <div className="input-container remember-me-container">
                  <input
                    type="checkbox"
                    id="remember-me"
                    name="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember-me">Lembrar-me</label>
                </div>
                <div className="button-container">
                  <Button type="submit" style={{ boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.25)' }}>Entrar</Button>
                </div>
              </Form>
              <DarkModeButton onClick={handleDarkModeToggle}>
                <i className="material-icons">
                  {isDarkMode ? 'wb_sunny' : 'brightness_2'}
                </i>
              </DarkModeButton>
            </FormContainer>
          </FormWrapper>
        </ContainerL>
        <ContainerR className="container-r">
          <img src="logo.png" alt="Yuzu" className="logo2" />
        </ContainerR>
      </Container>
    </div>
  );
}