import { useCart } from '../../providers/Cart'
import { CartProduct } from "../CartProduct"

export const CartProducts = () => {
    
    const {cart} = useCart()

    return (
        <>
        {
            cart.map(e => <CartProduct category={e.category} id={e.id} img={e.img} name={e.name} price={e.price} key={e.id}/>)
        }
        </>
    )
}