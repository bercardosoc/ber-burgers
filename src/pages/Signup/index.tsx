import { Box, Flex, Heading } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { api } from "../../services/api"
import { SignupForm } from "./SignupForm"
import { Logo } from "../../components/Logo"
import { RiShoppingBag3Line } from "react-icons/ri"
import { useHistory } from "react-router-dom"

export const Signup = () => {

    const signUpSchema = yup.object().shape({
        name: yup
        .string()
        .required("Nome obrigatório"),
        email: yup
        .string()
        .required("E-mail obrigatório")
        .email("E-mail inválido"),
        password: yup
        .string()
        .required("Senha obrigatória"),
        confirmPassword: yup
        .string()
        .required("Confirmação de senha obrigatória")
        .oneOf([yup.ref("password")], "Senhas diferentes")
    })

    interface SignUpData {
        name: string;
        email: string;
        password: string;
        confirmPassword: string
    }

    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm <SignUpData> ({
        resolver: yupResolver(signUpSchema)
    })

    const handleSignup = ({ name, email, password, confirmPassword }: SignUpData) => {
        api
        .post("/users", {name, email, password, confirmPassword})
        .then((response) => {
            console.log(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const history = useHistory()


    return (
        <>
        <Logo/>
        <Flex justifyContent="center" flexDirection={["column", "column", "row", "row"]}  >
            <Flex border={"1px solid"} borderColor={"gray.500"} paddingBottom={"1rem"} paddingTop={"1rem"}  marginBottom={"2rem"} justifyContent={"space-around"} width={["auto", "auto", "45%", "45%"]} height={"110px"} margin={"auto 0"} >
                <Flex borderRadius={"5px"} justifyContent={"center"} alignItems={"center"} width={"75px"} height={"75px"} bg={"orange.100"} ><RiShoppingBag3Line color="red" size={50} /></Flex>
                <Box width={"70%"} ><span>A vida é como um sanduíche, é preciso recheá-la com os <b>melhores</b> ingredientes </span></Box>
            </Flex>
            <Flex flexDirection={"column"} width={["auto", "auto", "50%", "50%"]} >
            <Flex 
                alignItems={"center"} 
                justifyContent={"space-around"}
                marginBottom={"1.5rem"} >
                <Heading as="h1" >Cadastro</Heading>
                <span onClick={() => history.push("/signin")}>Retornar para o login</span>
            </Flex>
            <SignupForm
                errors={errors}
                register={register}
                handleSignup={handleSubmit(handleSignup)}
            />
            </Flex>
        </Flex>
        </>
    )
}