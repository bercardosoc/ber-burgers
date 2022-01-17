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
    default: "black",
    focus: "orange",
    filled: "orange",
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
            {!!label && <FormLabel color="black.400">{label}</FormLabel>}
            <InputGroup flexDirection={"column"} >
                {Icon && (
                    <InputLeftElement color={inputVariation[variation]} mt={"2.5"}>
                        <Icon/>
                    </InputLeftElement>
                )}
                <ChakraInput
                    id={name}
                    name={name}
                    onChangeCapture={(e) => setValue(e.currentTarget.value)}
                    onBlurCapture={handleInputBlur}
                    onFocus={handleInputFocus}
                    borderColor={inputVariation[variation]}
                    color={inputVariation[variation]}
                    bg="black.50"
                    variant="filled"
                    _hover={{ color: "black.100" }}
                    _placeholder={{ color: "black.300" }}
                    _focus={{
                        bg: "black.100",
                    }}
                    size="lg"
                    h="60px"
                    ref={ref}
                    {...rest}
                />
                {!!error && (
                    <FormErrorMessage color="red.500">
                        {error.message}
                    </FormErrorMessage>
                )}
            </InputGroup>
        </FormControl>
    )
}

export const Input = forwardRef(InputBase)