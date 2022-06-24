import { createContext, ReactNode, useContext, useState } from "react"

type ShoppingCartProviderProps = {
  children: ReactNode
}
type CartItem = {
  id:number,
  quantity:number
}
type ShoppingCartContext = {
  // openCart: ()=> void,
  // closeCart: ()=> void,
  // cartQuantity: number,
  // cartItems: CartItem[],
  getItemQuantity:(id:number)=>number,
  increaseItemQuantity:(id:number)=>void,
  decreaseItemQuantity:(id:number)=>void,
  removeFromCart:(id:number)=>void,
}
const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}:ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState<Boolean>(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function getItemQuantity(id:number){
    return cartItems.find(item => item.id===id)?.quantity||0
  }

  function increaseItemQuantity(id:number){
    setCartItems(currentItems => {
      if(currentItems.find(item=>item.id===id)==null){
        return [...currentItems, {id,quantity:1}]
      } else {
        return currentItems.map(item=>{
          if(item.id===id){
            return {...item, quantity:item.quantity + 1}
          } else {
            return item
          }
      })
      }
    })
  }
  function decreaseItemQuantity(id:number){
    setCartItems(currentItems => {
      if(currentItems.find(item=>item.id===id)?.quantity === 1){
        return currentItems.filter(item=>item.id!==id)
      } else {
        return currentItems.map(item=>{
          if(item.id===id){
            return {...item, quantity:item.quantity - 1}
          } else {
            return item
          }
      })
      }
    })
  }
  function removeFromCart(id:number){
    setCartItems(currentItems => {
      return currentItems.filter(item=>item.id!==id)
    })
  }


  return (
    <ShoppingCartContext.Provider value={{getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeFromCart}}>
      {children}
    </ShoppingCartContext.Provider>
  )
}