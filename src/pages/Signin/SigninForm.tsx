import { Button, Flex } from "@chakra-ui/react"
import { DeepMap, FieldError,FieldValues } from "react-hook-form"
import { Input } from "../../components/Form/Input"

interface SigninProps {
    handleSignin: () => void
    errors: DeepMap<FieldValues, FieldError>
    register: any
}

export const SigninForm = ({ handleSignin, errors, register }: SigninProps) => (
    <Flex 
        onSubmit={handleSignin}
        as="form"
        margin={"0 auto"}
        flexDirection={"column"} 
        w={["90%", "70%", "90%", "70%"]}
    >
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
        <Button colorScheme={"orange"} size={"lg"} type="submit" >Cadastrar</Button>
    </Flex>
)