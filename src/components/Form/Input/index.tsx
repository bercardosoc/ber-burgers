import { FormControl, FormLabel, InputGroup, InputLeftElement, Input as ChakraInput, InputProps as ChakraInputProps, FormErrorMessage } from "@chakra-ui/react"
import { forwardRef, ForwardRefRenderFunction, useCallback, useEffect, useState } from "react"
import { IconType } from "react-icons/lib"
import { FieldError } from "react-hook-form"

interface InputProps extends ChakraInputProps {
    name: string
    label?: string
    error?: FieldError | null
    icon?: IconType
}

type inputVariationOptions = {
    [key: string]: string
}

const inputVariation: inputVariationOptions = {
    error: "red",
    default: "gray.500",
    focus: "orange.500",
    filled: "orange.500",
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
    { name, label, icon: Icon, error = null, ...rest },
    ref
) => {
    const [value, setValue] = useState("")
    const [variation, setVariation] = useState("default")

    useEffect(() => {
        if(error) {
            return setVariation("error")
        }
    }, [error])

    const handleInputFocus = useCallback(() => {
        if(!error) {
            setVariation("focus")
        }
    }, [error])

    const handleInputBlur = useCallback(() => {
        if(value.length > 1 && !error) {
            setVariation("focus")
        }
    }, [error])
    
    return (
        <FormControl isInvalid={!!error}>
            {!!label && <FormLabel color="gray.500">{label}</FormLabel>}
            <InputGroup flexDirection={"column"} >
                {Icon && (
                    <InputLeftElement color={inputVariation[variation]} mt={"2.5"}>
                        <Icon/>
                    </InputLeftElement>
                )}
                {!!error && (
                    <FormErrorMessage color="red.500" marginBottom={"0.2rem"} >
                        {error.message}
                    </FormErrorMessage>
                )}
                <ChakraInput
                    id={name}
                    name={name}
                    onChangeCapture={(e) => setValue(e.currentTarget.value)}
                    onBlurCapture={handleInputBlur}
                    onFocus={handleInputFocus}
                    borderColor={inputVariation[variation]}
                    color={inputVariation[variation]}
                    variant="filled"
                    _hover={{ color: "black" }}
                    _placeholder={{ color: "gray.500" }}
                    _focus={{
                        bg: "gray.500",
                    }}
                    marginBottom={"1rem"}
                    size="lg"
                    h="3.5rem"
                    ref={ref}
                    {...rest}
                />
            </InputGroup>
        </FormControl>
    )
}

export const Input = forwardRef(InputBase)