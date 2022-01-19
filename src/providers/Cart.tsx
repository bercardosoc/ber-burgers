import { AxiosResponse } from "axios"
import { createContext, ReactNode, useCallback, useContext, useState } from "react"
import { api } from "../services/api"

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
    addToCart: (data: Omit<Product, "id">, accessToken: string) => Promise<void>
    loadCart: (userId: string, accessToken: string) => Promise<void>
    deleteFromCart: (itemIndex: string, accessToken: string) => Promise<void>
}

const CartContext = createContext<CartContextData> ({} as CartContextData)

const useCart = () => {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error ("useCart must be used within an CartProvider")
    }
    return context
}

const CartProvider = ({ children }: CartProviderProps ) => {
    
    const [cart, setCart] = useState<Product[]>([])

    const addToCart = useCallback(
        async (data: Omit <Product, "id">, accessToken: string) => {
            api
            .post("/itens", data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response: AxiosResponse<Product>) => 
                setCart((oldState) => [...oldState, response.data])
                )
                .catch((err) => console.log(err)) 
        },
        []
    )

    const deleteFromCart = useCallback(
        async (itemIndex: string, accessToken: string) => {
            await api
            .delete(`/cart/${itemIndex}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((_) => {
                const filteredCart = cart.filter((e) => e.id !== Number(itemIndex))
                setCart(filteredCart)
            })
            .catch((err) => console.log(err))
        },
        [cart]
    )

    const loadCart = useCallback(async(userId: string, accessToken: string) => {
        try {
            const response = await api.get(`/cart?userId=${userId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            setCart(response.data)
        } catch (err) {
            console.log(err)
        }
    }, [])

    return (
        <CartContext.Provider
        value={{
            addToCart,
            cart,
            deleteFromCart,
            loadCart,
        }}
        >
            {children}
        </CartContext.Provider>
    )
}

export {useCart, CartProvider }