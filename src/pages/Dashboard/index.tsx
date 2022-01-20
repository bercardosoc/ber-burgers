import { Icon, Input as ChakraInput, InputGroup, InputRightElement } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import { Flex, Image, Text, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import { BsSearch } from "react-icons/bs"
import { BsCart4 } from "react-icons/bs"
import { FiLogOut } from "react-icons/fi"
import Badge from "@material-ui/core/Badge";
import { Products } from "../../components/Dashboard/Products"
import { useCart } from "../../providers/Cart"
import { useAuth } from "../../providers/Auth"
import { CartModal } from "../../components/CartModal"
import Woman from "../../assets/woman.png"
import { Card } from "../../components/Dashboard/Card"
import { useProductList } from "../../providers/ProductsList"

interface Product {
    id: number
    name: string
    category: string
    price: number
    img: string
}

export const Dashboard = () => {

    const { productList } = useProductList()

    const { cart } = useCart()

    const { signOut } = useAuth()

    const [searchBar, setSearchBar] = useState(false)

    const { isOpen, onClose, onOpen } = useDisclosure()

    const [filteredProducts, setFilteredProducts] = useState <Product[]> ([])

    const [currentSearch, setCurrentSearch] = useState("")

    const SearchItem = (productName: string) => {
        const filtered = productList.filter((item) => {
            return item.name.toLowerCase() === productName.toLocaleLowerCase()
        })
        setFilteredProducts(filtered)
    }

    return (
        <Flex flexDirection={"column"} bg={"yellow.100"}>
        <CartModal isOpen={isOpen} onClose={onClose} />
        <Flex
            bg={"yellow.600"}
            height={"3rem"}
            justifyContent={"flex-end"}
            boxShadow='md'
        >
           {
               searchBar ? (
                <InputGroup>
                <InputRightElement>
                    <Icon as={SearchIcon} onClick={() => SearchItem(currentSearch)} cursor={"wait"} />
                </InputRightElement>
                <ChakraInput type="text" value={currentSearch} onChange={(e) => setCurrentSearch(e.target.value)} width={"95%"} size={"lg"} h="2rem" variant={"outlined"} placeholder="Ex: X-salad" margin={"auto auto"} />
            </InputGroup>
               ) : (
                <Flex margin={"1rem"} justifyContent={"space-between"} width={"25%"}>
                <BsSearch 
                    onClick={() => setSearchBar(true)}
                />
                <Badge color="secondary" badgeContent={cart.length}>
                    <BsCart4 onClick={onOpen} />{""}
                </Badge>
                <FiLogOut onClick={signOut} />
                </Flex>
               )
           }
        </Flex>
        <Flex flexDirection={["column", "column", "row", "row"]} >
            <Flex 
                maxW={["auto", "auto", "80%", "80%"]}
                onClick={() => setSearchBar(false)}
                overflowX={["auto", "auto", "unset", "unset"]}
                css={{
                    '&::-webkit-scrollbar': {
                    width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                    width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                    borderRadius: '24px',
                    },
                }}>
            {
                filteredProducts.length < 0 ? (
                    filteredProducts.map(item => <Card category={item.category} id={item.id} img={item.img} name={item.name} price={item.price} /> )
                ) : (
                    <Products/>
                )
            }
                
            </Flex>
            <Flex flexDirection={"column"} alignItems={"center"} justifyContent={"center"} >
                <Text textAlign={"center"} marginTop={"1rem"} >Thanks!</Text>
                <Image src={Woman} margin={["0 auto", "0 auto", "auto 0", "auto 0"]} height={["20rem", "20rem", "90vh", "90vh"]} />
            </Flex>
            </Flex>
        </Flex>
    )
}