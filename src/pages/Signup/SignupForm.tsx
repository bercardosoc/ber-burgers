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
            placeholder="Name"
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
            placeholder="Password"
            name="password"
            type="password"
        />
        <Input
            {...register("confirmPassword")}
            error={errors.confirmPassword}
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
        />
        <Button colorScheme={"orange"} size={"lg"} type="submit" >Create my account</Button>
    </Flex>
)