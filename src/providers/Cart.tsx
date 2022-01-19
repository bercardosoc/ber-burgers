import { createContext, ReactNode, useContext, useState } from "react"

interface CartProviderProps {
    children: ReactNode
}

interface Product {
    id: number
    name: string
    category: string
    price: number
    img: string
}

interface CartContextData {
    cart: Product[]
    addToCart: (product: Product) => void
    removeFromCart: (product: Product) => void
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export const CartProvider = ({children}: CartProviderProps) => {
    
    const [cart, setCart] = useState <Product[]> ([])

    const addToCart = (product: Product): void => {
        setCart((oldState) => [...oldState, product])
    }

    const removeFromCart = (product: Product): void => {
        // const removed = cart.find((item) => item.id === product.id)
        // const removedIndex = cart.indexOf(removed)
        // cart.splice(removedIndex, 1)
        // setCart([...cart])
    }

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart}} >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)