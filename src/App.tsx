import  {useState} from 'react'
import { useQuery } from 'react-query';
// components
import Item from './Item/Item';
import Cart from './Cart/Cart';
import { Drawer, LinearProgress, Grid, Badge  } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
// styles
import {Wrapper, StyledButton} from './App.styles'
// types
export type CartItemType={
  id:number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getProducts = async (): Promise<CartItemType[]> => 
  await(await fetch(`https://fakestoreapi.com/products`)).json()

const App = () => {
  const [CartOpen, setCartOpen] = useState(false)
  const [CartItems, setCartItems] = useState([] as CartItemType[])
  const {data, isLoading, error} = useQuery<CartItemType[]>('products', getProducts )
  
  const getTotalItems = (items: CartItemType[]) => {
    return items.reduce((ack: number, items) => ack + items.amount, 0)
  }

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prevSt => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prevSt.find(item => item.id === clickedItem.id)

      if(isItemInCart){
        return prevSt.map(item => 
          item.id === clickedItem.id
          ? {...item, amount: item.amount + 1}
          : item
        )
      }
      // First time the items i added
      return [...prevSt, {...clickedItem, amount: 1}]
    })
  }

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prevSt => (
      prevSt.reduce((acc, item) => {
        if(item.id === id) {
          if (item.amount === 1) return acc
          return [...acc, {...item, amount: item.amount - 1}]
        } else {
          return [...acc, item]
        }
      }, [] as CartItemType[])
    ))
  } 

  if (isLoading) return <LinearProgress/>
  if (error) return <div>Something Went wrong ...</div>

  return (
      <Wrapper>
        <Drawer anchor='right' open={CartOpen} onClose={() => setCartOpen(false)}>
          <Cart 
          cartItems={CartItems} 
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          />
        </Drawer> 
        <StyledButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(CartItems)} color='error'>
            <AddShoppingCart/>
          </Badge>
        </StyledButton>
        <Grid container spacing={3}>
          {data?.map(item => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart}/>
            </Grid>
          ))}
        </Grid>
      </Wrapper>
  );
}

export default App;
