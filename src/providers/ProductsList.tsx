import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface ProductListProviderProps {
    children: ReactNode
}

interface Product {
    id: number
    name: string
    category: string
    price: number
    img: string
}

interface ProductListContextData {
    productList: Product[]
}

const ProductListContext = createContext <ProductListContextData> ({} as ProductListContextData)

const useProductList = () => {
    const context = useContext(ProductListContext)
    if (!context) {
        throw new Error ("UseProductList must be used within a ProductListProvider")
    }
    return context
}

const ProductListProvider = ({ children }: ProductListProviderProps ) => {
    
    const [productList, setProductList] = useState<Product[]>([])

    useEffect(() => {
        axios
        .get<Product[]>("https://berburgers.herokuapp.com/products")
        .then((response) => {
            setProductList(response.data)
        })
    }, [])

    return (
        <ProductListContext.Provider value={{productList}} >
            {children}
        </ProductListContext.Provider>
    )
}

export {useProductList, ProductListProvider}