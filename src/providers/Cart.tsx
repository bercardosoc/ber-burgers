import { createContext, ReactNode, useContext, useState } from "react"

interface Product {
    id: number
    name: string
    category: string
    price: number
    img: string
}

interface CartProviderProps {
    children: ReactNode
}

interface CartProviderData {
    cart: Product[]
    addToCart: (product: Product) => void
    //deleteFromCart: (product: Product) => void 
}

const CartContext = createContext<CartProviderData>(
    {} as CartProviderData
)

export const CartProvider = ({children}: CartProviderProps) => {
    const [cart, setCart] = useState<Product[]>([])

    const addToCart = (product: Product): void => {
        setCart([...cart, product])
    }

    // const removeFromCart = (product: Product): void => {
    //     const removed = cart.find((item) => item.id === product.id)
    //     const removedIndex = cart.indexOf(removed) 
    //     cart.splice(removedIndex, 1)
    //     setCart([...cart])
    // }
    return (
        <CartContext.Provider value={{addToCart, cart,}} >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)