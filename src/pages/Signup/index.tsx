import { Flex, Heading } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { api } from "../../services/api"
import { SignupForm } from "./SignupForm"

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
    }

    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm({
        resolver: yupResolver(signUpSchema)
    })

    const handleSignup = ({ name, email, password }: SignUpData) => {
        api
        .post("/users", {name, email, password})
        .then((response) => {
            console.log(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }


    return (
        <Flex justifyContent="center" flexDirection={"column"} >
            <Flex alignItems={"center"} justifyContent={"space-around"} >
                <Heading as="h1" >Cadastro</Heading>
                <span>Retornar para o login</span>
            </Flex>
            <SignupForm
            errors={errors}
            register={register}
            handleSignup={handleSubmit(handleSignup)}
            />
        </Flex>
    )
}