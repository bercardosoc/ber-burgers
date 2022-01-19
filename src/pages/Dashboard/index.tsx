import { Flex } from "@chakra-ui/react"
import { useState } from "react"
import { BsSearch } from "react-icons/bs"
import { BsCart4 } from "react-icons/bs"
import { FiLogOut } from "react-icons/fi"
import Badge from "@material-ui/core/Badge";
import { SearchBar } from "../../components/SearchBar"
import { Products } from "../../components/Dashboard/Products"
import { useCart } from "../../providers/Cart"

export const Dashboard = () => {

    const { cart } = useCart()

    const [searchBar, setSearchBar] = useState(false)


    return (
        <>
        <Flex
            bg={"gray.500"}
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
                <Badge color="secondary" badgeContent={cart.length}  >
                    <BsCart4/>{""}
                </Badge>
                <FiLogOut/>
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
        </>
    )
}