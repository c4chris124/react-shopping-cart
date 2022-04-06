import CartItem from "../CartItem/CartItem";
// styles
import {Wrapper} from './Cart.styles'
// Types
import {CartItemType} from '../App'

type Props = {
    cartItems: CartItemType[]
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const Cart: React.FC<Props> = ({cartItems, addToCart, removeFromCart}) => {
    // Return total value
    const calculateTotal = (items: CartItemType[]) => (
        items.reduce((acc: number, item) => acc + item.amount * item.price, 0)
    )
    return (
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? <p>No Items in cart</p> : null}
            {cartItems.map(item => (
                <CartItem 
                key={item.id}
                item={item}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                />
            ))}
            <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
        </Wrapper>
    )
}

export default Cart;