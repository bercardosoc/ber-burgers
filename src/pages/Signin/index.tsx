import { Box, Flex, Heading, useToast } from "@chakra-ui/react"
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

    const sucessToast = useToast()
    const errorToast = useToast()

    const { signIn } = useAuth()

    const SigninSchema = yup.object().shape({
        email: yup
        .string()
        .required("Required field")
        .email("Invalid e-mail"),
        password: yup
        .string()
        .required("Required field")
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
            sucessToast({
                title: "Logged in",
                description: "You sucefully logged in",
                status: "success",
                duration: 5000,
                isClosable: true
            })
        })
        .catch((err) => {
            errorToast({
                title: "Something is wrong",
                description: "Incorrect user or password",
                status: "error",
                duration: 5000,
                isClosable: true
            })
        })
    }

    const history = useHistory()


    return (
        <Flex flexDirection={"column"} bg={"yellow.100"} height={"100vh"} >
        <Logo/>
        <Flex justifyContent="center" flexDirection={["column", "column", "row-reverse", "row-reverse"]}  >
            <Flex border={"1px solid"} borderColor={"orange.500"} paddingBottom={"1rem"} paddingTop={"1rem"}  marginBottom={"2rem"} justifyContent={"space-around"} width={["auto", "auto", "45%", "45%"]} height={"110px"} margin={"auto 0"} >
                <Flex borderRadius={"5px"} justifyContent={"center"} alignItems={"center"} width={"75px"} height={"75px"} bg={"orange.100"} ><RiShoppingBag3Line color="red" size={50} /></Flex>
                <Box width={"70%"} ><span>Life is like a sandwich, you have to fill it with the <b>best</b> ingredients </span></Box>
            </Flex>
            <Flex flexDirection={"column"} width={["auto", "auto", "50%", "50%"]} >
            <Flex 
                alignItems={"center"} 
                justifyContent={"space-around"}
                marginBottom={"1.5rem"} >
                <Heading as="h1" >Login</Heading>
                <span onClick={() => history.push("/")}>Return to signup</span>
            </Flex>
            <SigninForm
                errors={errors}
                register={register}
                handleSignin={handleSubmit(handleSignin)}
            />
            </Flex>
        </Flex>
        </Flex>
    )
}