import axios from "axios"
import { useEffect, useState } from "react"
import { Card } from "../Card"

interface Product {
    id: number
    name: string
    category: string
    price: number
    img: string
}

export const Products = () => {

    const [productList, setProductList] = useState<Product[]>([])

    useEffect(() => {
        axios
        .get<Product[]>("https://berburgers.herokuapp.com/products")
        .then((response) => {
            setProductList(response.data)
        })
    }, [])
    return (
        <>
        {
            productList.map((item) => <Card
            category={item.category}
            id={item.id}
            img={item.img}
            name={item.name}
            price={item.price}
            key={item.id}
        />)
        }
        </>
    )
}