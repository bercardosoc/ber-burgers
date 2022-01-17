import { Button, Flex, VStack } from "@chakra-ui/react"
import { DeepMap, FieldError,FieldValues, UseFormRegister } from "react-hook-form"
import { Input } from "../../components/Form/Input"
import { FaCashRegister } from "react-icons/fa"
import { Si1Password } from "react-icons/si"
import { BiRename } from "react-icons/bi"


interface SignupProps {
    handleSignup: () => void
    errors: DeepMap<FieldValues, FieldError>
    register: any
}

export const SignupForm = ({ handleSignup, errors, register }: SignupProps) => (
    <Flex 
        onSubmit={handleSignup}
        as="form"
        margin={"0 auto"}
        flexDirection={"column"} 
        w={["90%", "90%", "10rem", "250px"]}
    >
        <VStack spacing={"1rem"} />
        <Input
            {...register("name")}
            error={errors.name}
            placeholder="Nome"
            name="name"
            icon={BiRename}
        />
        <VStack spacing={"1rem"} />
        <Input
            {...register("email")}
            error={errors.email}
            placeholder="Email"
            name="email"
            icon={FaCashRegister}
        />
        <VStack spacing={"1rem"} />
        <Input
            {...register("password")}
            error={errors.password}
            placeholder="Senha"
            name="password"
            icon={Si1Password}
            type="password"
        />
        <VStack spacing={"1rem"} />
        <Input
            {...register("confirmPassword")}
            error={errors.confirmPassword}
            placeholder="Confirmar senha"
            name="confirmPassword"
            icon={Si1Password}
            type="password"
        />
        <Button colorScheme={"orange"} size={"lg"} type="submit" >Cadastrar</Button>
    </Flex>
)