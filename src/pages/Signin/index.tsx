import { Box, Flex, Heading } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { SigninForm } from "./SigninForm"
import { Logo } from "../../components/Logo"
import { RiShoppingBag3Line } from "react-icons/ri"
import { useHistory } from "react-router-dom"
import { useAuth } from "../../providers/Auth"

interface SigninData {
    email: string;
    password: string;
}

export const Signin = () => {

    const { signIn } = useAuth()

    const SigninSchema = yup.object().shape({
        email: yup
        .string()
        .required("E-mail obrigatório")
        .email("E-mail inválido"),
        password: yup
        .string()
        .required("Senha obrigatória")
    })

    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm <SigninData> ({
        resolver: yupResolver(SigninSchema)
    })

    const handleSignin = (data: SigninData) => {
        signIn(data)
        .then((_) => {
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const history = useHistory()


    return (
        <>
        <Logo/>
        <Flex justifyContent="center" flexDirection={["column", "column", "row-reverse", "row-reverse"]}  >
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
                <span onClick={() => history.push("/")}>Retornar para o cadastro</span>
            </Flex>
            <SigninForm
                errors={errors}
                register={register}
                handleSignin={handleSubmit(handleSignin)}
            />
            </Flex>
        </Flex>
        </>
    )
}