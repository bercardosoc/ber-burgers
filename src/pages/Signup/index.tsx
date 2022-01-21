import { Box, Flex, Heading, useToast } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { api } from "../../services/api"
import { SignupForm } from "./SignupForm"
import { Logo } from "../../components/Logo"
import { RiShoppingBag3Line } from "react-icons/ri"
import { useHistory } from "react-router-dom"

export const Signup = () => {

    const sucessToast = useToast()
    const errorToast = useToast()

    const signUpSchema = yup.object().shape({
        name: yup
        .string()
        .required("Required field"),
        email: yup
        .string()
        .required("Required field")
        .email("Invalid e-mail"),
        password: yup
        .string()
        .required("Required field"),
        confirmPassword: yup
        .string()
        .required("Required field")
        .oneOf([yup.ref("password")], "Different passwords")
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
        .then((_) => {
            history.push("/signin")
            sucessToast({
                title: "Account created",
                description: "You sucefully created your account",
                status: "success",
                duration: 5000,
                isClosable: true
            })
        })
        .catch((err) => {
            errorToast({
                title: "Something is wrong",
                description: "This account already exists",
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
        <Flex justifyContent="center" flexDirection={["column", "column", "row", "row"]}  >
            <Flex border={"1px solid"} borderColor={"orange.500"} paddingBottom={"1rem"} paddingTop={"1rem"}  marginBottom={"2rem"} justifyContent={"space-around"} width={["auto", "auto", "45%", "45%"]} height={"110px"} margin={"auto 0"} >
                <Flex borderRadius={"5px"} justifyContent={"center"} alignItems={"center"} width={"75px"} height={"75px"} bg={"orange.100"} ><RiShoppingBag3Line color="red" size={50} /></Flex>
                <Box width={"70%"} ><span>Life is like a sandwich, you have to fill it with the <b>best</b> ingredients </span></Box>
            </Flex>
            <Flex flexDirection={"column"} width={["auto", "auto", "50%", "50%"]} >
            <Flex 
                alignItems={"center"} 
                justifyContent={"space-around"}
                marginBottom={"1.5rem"} >
                <Heading as="h1" >Signup</Heading>
                <span onClick={() => history.push("/signin")}>Return to login</span>
            </Flex>
            <SignupForm
                errors={errors}
                register={register}
                handleSignup={handleSubmit(handleSignup)}
            />
            </Flex>
        </Flex>
        </Flex>
    )
}