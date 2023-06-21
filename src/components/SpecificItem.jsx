import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { useCart } from '../context/useCart';


export default function SpecificItem({ storeData }) {
    const {itemId} = useParams();
    const [amount, setAmount] = useState(1);
    const {cartState, setCartState} = useCart();
    const [errorNumOfItems, setErrorNumOfItems] = useState(false)

    const curItem = storeData.find((item)=>{
        return item.id === itemId;
    })

    function AddProduct(){
      setAmount(amount + 1);
    }
    function SubtractProduct(){
      if(amount > 0)
       setAmount(amount - 1)
    }

    function AddToCart(){
      if(amount > 0){
        setErrorNumOfItems(false)
        let indexOfItem = cartState.findIndex(item=>item.id === itemId)
        if(indexOfItem !== -1){
          cartState[indexOfItem].amount += amount
          setCartState(cartState)
        }
        else{
          setCartState([...cartState, {id:itemId, amount:amount}])
        }
        setAmount(1)
      }
      else if(amount === 0){
        setErrorNumOfItems(true)
      }
    }

  return (
    <>
    {(errorNumOfItems)?
    (<div class="m-2 rounded alert alert-danger alert-dismissible" role="alert">
       <div className='d-flex justify-content-center align-items-center fs-3'>Error! no items were chosen!</div>
      <button type="button" class="btn-close" onClick={()=>setErrorNumOfItems(false)} data-bs-dismiss="alert" aria-label="Close"></button>'
    </div>):null}
    <div style={{height:'80vh'}} className="container d-flex justidy-content-evenly align-items-center">
        <img src={curItem.img} alt="" className="col-4" />
        <div className="d-flex flex-column justidy-content-evenly align-items-center col-8">
            <h1>{curItem.name} - ${curItem.price}</h1>
            <div className="d-flex">
                    <button onClick={SubtractProduct} className='btn btn-light fs-3 m-2'>-</button>
                    <span className=' fs-1'>{amount}</span>
                    <button onClick={AddProduct} className='btn btn-light fs-3 m-2'>+</button>
            </div>
            <button onClick={AddToCart} className='btn btn-info fs-3 m-2'>Add to cart</button>
            <span className='p-5'>{curItem.description}</span>
        </div>
    </div>
    </>
  )
}
