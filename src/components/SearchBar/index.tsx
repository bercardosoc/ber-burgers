import { Icon, Input as ChakraInput, InputGroup, InputRightElement } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"

export const SearchBar = () => {
    return (
        <InputGroup>
            <InputRightElement>
                <Icon as={SearchIcon} />
            </InputRightElement>
            <ChakraInput size={"lg"} h="2rem" />
        </InputGroup>
    )
}