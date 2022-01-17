import { ChakraProvider } from "@chakra-ui/react"
import { ReactNode } from "react"

interface AppProviderProps {
    children: ReactNode
}

export const AppProvider = ({children}: AppProviderProps) => (
    <ChakraProvider>
        {children}
    </ChakraProvider>
)