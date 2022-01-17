import { Button, Flex } from "@chakra-ui/react"
import { DeepMap, FieldError,FieldValues } from "react-hook-form"
import { Input } from "../../components/Form/Input"

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
        w={["90%", "70%", "90%", "70%"]}
    >
        <Input
            {...register("name")}
            error={errors.name}
            placeholder="Nome"
            name="name"
        />
        <Input
            {...register("email")}
            error={errors.email}
            placeholder="Email"
            name="email"
        />
        <Input
            {...register("password")}
            error={errors.password}
            placeholder="Senha"
            name="password"
            type="password"
        />
        <Input
            {...register("confirmPassword")}
            error={errors.confirmPassword}
            placeholder="Confirmar senha"
            name="confirmPassword"
            type="password"
        />
        <Button colorScheme={"orange"} size={"lg"} type="submit" >Cadastrar</Button>
    </Flex>
)