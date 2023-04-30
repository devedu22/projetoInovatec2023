import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
    Flex,
    Box,
    Center,
    FormControl,
    Input,
    FormLabel,
    HStack,
    Button,
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Alert, AlertIcon } from "@chakra-ui/react";

import api from '../../services/api';

export function CadastroUsuario() {
    const navigate = useNavigate();
    const [name, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [password, setSenha] = useState("");
    const [alerta, setAlerta] = useState(null); // inicialmente sem alerta

    const handleNomeChange = (event) => {
        setNome(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleCpfChange = (event) => {
        setCpf(event.target.value);
    };

    const handleSenhaChange = (event) => {
        setSenha(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (name && email && cpf && password) {
            if (password !== password) {
                setAlerta("As senhas não correspondem");
            } else {
                const usuario = {
                    name: name,
                    email: email,
                    cpf: cpf,
                    password: password,
                };
                api.post("/registrarUsuario", usuario)
                    .then((response) => {
                        setAlerta("Usuário criado com sucesso!"); // atualiza o estado do alerta
                        console.log(response.data);
                        setTimeout(() => {
                            setAlerta('');
                            navigate('/login');
                        }, 800);
                    })
                    .catch((error) => {
                        setAlerta("Erro ao criar usuário"); // atualiza o estado do alerta
                        console.log(error);
                        setTimeout(() => {
                            setAlerta('');
                        }, 500)

                    });
            }
        } else {
            setAlerta("Preencha todos os campos"); // atualiza o estado do alerta
            setTimeout(() => {
                setAlerta('');
            }, 500)
        }
    };

    return (
        <ChakraProvider>
            <>
                {alerta && (
                    <Alert status={alerta.includes("sucesso") ? "success" : "error"}>
                        <AlertIcon />
                        {alerta}
                    </Alert>
                )}

                <Box h="100vh">
                    <Center
                        as="header"
                        h={150}
                        bg="teal.500"
                        color="white"
                        fontWeight="bold"
                        fontSize="4xl"
                        pb="8"
                    >
                        Primeiro Acesso
                    </Center>
                    <Flex
                        align="center"
                        justify="center"
                        bg="blackAlpha.200"
                        h="calc(100vh - 150px)"
                    >
                        <Center
                            w="100%"
                            maxW={840}
                            bg="white"
                            top={100}
                            position="absolute"
                            borderRadius={5}
                            p="6"
                            boxShadow="0 1px 2px #ccc"
                        >
                            <FormControl display="flex" flexDir="column" gap="4" onSubmit={handleSubmit}>
                                <HStack spacing="4">
                                    <Box w="100%">
                                        <FormLabel htmlFor="nome">Nome Completo</FormLabel>
                                        <Input id="name" value={name} onChange={handleNomeChange} required />
                                    </Box>
                                    <Box w="100%">
                                        <FormLabel htmlFor="email">E-mail</FormLabel>
                                        <Input id="email" type="email" value={email} onChange={handleEmailChange} required />
                                    </Box>
                                </HStack>
                                <HStack spacing="4">
                                    <Box w="100%">
                                        <FormLabel htmlFor="cpf">CPF</FormLabel>
                                        <Input id="cpf" type="text" value={cpf} onChange={handleCpfChange} required />
                                    </Box>
                                    <Box w="100%">
                                        <FormLabel htmlFor="password">Senha</FormLabel>
                                        <Input id="password" type="password" value={password} onChange={handleSenhaChange} required />
                                    </Box>
                                </HStack>
                                <HStack justify="center">
                                    <Button
                                        w={240}
                                        p="6"
                                        type="submit"
                                        bg="teal.600"
                                        color="white"
                                        fontWeight="bold"
                                        fontSize="xl"
                                        mt="2"
                                        _hover={{ bg: "teal.800" }}
                                        required
                                        onClick={handleSubmit}
                                    >
                                        Enviar
                                    </Button>
                                </HStack>
                            </FormControl>

                        </Center>
                    </Flex>
                </Box>
            </>
        </ChakraProvider>
    );
}

export default CadastroUsuario;