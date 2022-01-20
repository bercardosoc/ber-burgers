import { ChakraProvider } from "@chakra-ui/react"
import { ReactNode } from "react"
import { theme } from "../styles/theme"
import { AuthProvider } from "./Auth"
import { CartProvider } from "./Cart"
import { ProductListProvider } from "./ProductsList"

interface AppProviderProps {
    children: ReactNode
}

export const AppProvider = ({children}: AppProviderProps) => (
    <ChakraProvider theme={theme} >
        <AuthProvider>
            <ProductListProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </ProductListProvider>
        </AuthProvider>
    </ChakraProvider>
)