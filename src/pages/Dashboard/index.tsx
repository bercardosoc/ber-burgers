import { Flex, Image, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import { BsSearch } from "react-icons/bs"
import { BsCart4 } from "react-icons/bs"
import { FiLogOut } from "react-icons/fi"
import Badge from "@material-ui/core/Badge";
import { SearchBar } from "../../components/SearchBar"
import { Products } from "../../components/Dashboard/Products"
import { useCart } from "../../providers/Cart"
import { useAuth } from "../../providers/Auth"
import { CartModal } from "../../components/CartModal"
import Woman from "../../assets/woman.png"

export const Dashboard = () => {

    const { cart } = useCart()

    const { signOut } = useAuth()

    const [searchBar, setSearchBar] = useState(false)

    const { isOpen, onClose, onOpen } = useDisclosure()

    return (
        <Flex flexDirection={"column"} bg={"yellow.100"}>
        <CartModal isOpen={isOpen} onClose={onClose} />
        <Flex
            bg={"yellow.600"}
            height={"3rem"}
            justifyContent={"flex-end"}
        >
           {
               searchBar ? (
                   <SearchBar/>
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
        <Flex 
            overflowX={"auto"}
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
              }}
        >
            <Products/>
        </Flex>
        <Image src={Woman} margin={"0 auto"} />
        </Flex>
    )
}