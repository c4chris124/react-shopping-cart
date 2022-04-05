import  {useState} from 'react'
import { useQuery } from 'react-query';
// components
import Item from './Item/Item';
import { Drawer, LinearProgress, Grid, Badge  } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
// styles
import {Wrapper} from './App.styles'
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
  const {data, isLoading, error} = useQuery<CartItemType[]>('products', getProducts )
  
  const getTotalItems = () => null

  const handleAddToCart = (clickedItem: CartItemType) => null

  const handleRemoveFromCart = () => null

  if (isLoading) return <LinearProgress/>
  if (error) return <div>Something Went wrong ...</div>

  return (
    <div className="App">
      <Wrapper>
        <Grid container spacing={3}>
          {data?.map(item => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart}/>
            </Grid>
          ))}
        </Grid>
      </Wrapper>
    </div>
  );
}

export default App;
