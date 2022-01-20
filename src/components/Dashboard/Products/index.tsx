import { Flex } from "@chakra-ui/react"
import { useProductList } from "../../../providers/ProductsList"
import { Card } from "../Card"

export const Products = () => {

    const { productList } = useProductList()

    return (
        <Flex flexWrap={["nowrap", "nowrap", "wrap", "wrap"]} >
        {
            productList.map(item => <Card
            category={item.category}
            id={item.id}
            img={item.img}
            name={item.name}
            price={item.price}
            key={item.id}
        />)
        }
        </Flex>
    )
}