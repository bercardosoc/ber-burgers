import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { api } from "../services/api"
import { useAuth } from "./Auth"

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

interface Cart {
    id: number
    name: string
    category: string
    price: number
    img: string
    quantity: number
    userId: number
}

interface CartContextData {
    cart: Cart[]
    addToCart: (product: Product) => void
    addQuantity: (product: Cart) => void
    subQuantity: (product: Cart) => void
    deleteFromCart: (product: Cart) => void
    deleteAll: () => void
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
    
    const [cart, setCart] = useState<Cart[]>([])
    const [refresh, setRefresh] = useState(false)
    const { accessToken, user } = useAuth()

    const addToCart = (product: Product) => {
        if (cart.filter((item) => item.name === product.name).length === 0) {
            const sendToCart = {...{category: product.category, img: product.img, name: product.name, price: product.price}, ...{quantity: 1, userId: user.id }}
            api
            .post("/itens", sendToCart, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }) 
            .then((_) => setRefresh(!refresh))
        }
    }

    const addQuantity = (product: Cart) => {
        product.quantity = product.quantity + 1
        const sendToCart = {...product}
        api
        .patch(`/itens/${product.id}`, sendToCart, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then((_) => setRefresh(!refresh))
    }

    const subQuantity = (product: Cart) => {
        if (product.quantity > 1) {
            product.quantity = product.quantity - 1
            const sendToCart = {...product}
            api
            .patch(`/itens/${product.id}`, sendToCart, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((_) => setRefresh(!refresh))
        }
    }

    const deleteFromCart = (productToBeDeleted: Cart) => {
        setCart([...cart.filter((item) => item.id !== productToBeDeleted.id)])
        api 
        .delete(`/itens/${productToBeDeleted.id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then((_) => setRefresh(!refresh))
    }

    const deleteAll = () => {
        cart.forEach(function(item) {
            deleteFromCart(item)
            setCart([])
        }, 1)
        setCart([])
    }

    useEffect(() => {
        api
        .get(`itens`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then((response) => {
            setCart(response.data.filter((item: Cart) => Number(item.userId) === Number(user.id)))
        })
        .catch(err => setCart(cart))
    }, [refresh])

    return (
        <CartContext.Provider
        value={{
            addToCart,
            addQuantity,
            cart, 
            subQuantity,
            deleteFromCart,
            deleteAll,
        }}
        >
            {children}
        </CartContext.Provider>
    )
}

export {useCart, CartProvider }