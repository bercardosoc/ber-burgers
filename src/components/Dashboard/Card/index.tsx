import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { useCart } from "../../../providers/Cart"

interface Product {
    id: number
    name: string
    category: string
    price: number
    img: string
}

export const Card = ( product: Product) => {

    const { addToCart } = useCart()


    return (
        <Flex 
            key={product.id}
            _hover={{
                transition: "1s",
                cursor: "pointer",
                borderColor: "yellow.500"
            }}
            flexDirection={"column"} 
            alignItems={"center"}  
            border={"1px solid"} 
            borderColor={"orange.500"}  
            borderRadius={"10px"} 
            margin={'1rem'} 
            padding={"1rem"}
            maxHeight={"350px"}
        >
            <Heading as="h3" size={"md"} >{product.name}</Heading>
            <Image src={product.img} maxW={"200px"} w={["150px", "150px", "200px", "200px"]} />
            <Text>{product.category}</Text>
            <Text>${product.price.toFixed(2)}</Text>
            <Button
                onClick={() => addToCart(product)}
                mt={"0.5rem"}
                rightIcon={<AddIcon width={"0.6rem"} />}
                color={"white"}
                bgColor={"orange.500"}>
                    Add
            </Button>
        </Flex>
    )
}