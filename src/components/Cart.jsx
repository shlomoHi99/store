import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import deleteIcon from '../images/delete-icon.png'


export default function Cart({ storeData }) {
    const { cartState, setCartState } = useCart();
    const [renderItems, setRenderItems] = useState([])
    const [numOfRenders, setNumOfRenders] = useState(0)

    function ChangeAmount(item, action) {
        let indexOfItem = cartState.findIndex((product) => product.id === item)
        if (action === 'add') {
            cartState[indexOfItem].amount++;
            setCartState(cartState);
        }
        else if (action === 'sub' || action === 'del') {
            if (cartState[indexOfItem].amount > 1 && action !== 'del') {
                cartState[indexOfItem].amount--;
                setCartState(cartState);
            }
            else {
                setCartState(cartState.filter((product) => product.id !== item))
            }
        }
        setNumOfRenders(numOfRenders + 1)
    }

    let curItems = storeData.filter((item) => {
        let exist = cartState.find((product) => product.id === item.id)
        return (exist) ? item : null;
    })
    

    useEffect(() => {

        setRenderItems(curItems.map((item, i) => {
            let details = cartState.find((product) => product.id === item.id);
            return (
                <div key={i} className="card d-flex flex-row col-12 p-5 m-3 text-decoration-none text-dark">
                    <Link  className='col-2'  to={`../../shop/${item.id}`}>
                    <img src={item.img} alt="" className='img-fluid'/>
                    </Link>
                    <div className="p-2 col-3 d-flex flex-column justify-content-center align-items-center">
                        <h1>{item.name}</h1>
                    </div>
                    <div className="p-2 col-2 d-flex flex-column justify-content-center align-items-center">
                        <h3>Price: ${item.price}</h3>
                        <h3>total: ${item.price * details.amount}</h3>
                    </div>
                    <div className="p-2 col-3 d-flex justify-content-center align-items-center">
                        <button onClick={() => ChangeAmount(item.id, "sub")} className='btn btn-light fs-3 m-2'>-</button>
                        <span className=' fs-1'>{details.amount}</span>
                        <button onClick={() => ChangeAmount(item.id, "add")} className='btn btn-light fs-3 m-2'>+</button>
                    </div>
                    <button className='col-1 border-0 rounded' onClick={() => ChangeAmount(item.id, "del")}><img className='img-fluid ' src={deleteIcon} alt="" /></button>
                </div>
            )
        }
        ))
    }, [cartState, numOfRenders])

    function ClearCart() {
        setCartState([]);
    }

    function TotalPrice(){
        let total = 0;
        curItems.forEach((item) => {
            let details = cartState.find((product) => product.id === item.id);
            total += item.price * details.amount;
        });
        return total;
    }

    return (
        <div className="container"  style={(renderItems.length < 2) ? {height:'74vh'}: null}>
            <div className='container d-flex justify-content-evenly m-3'>
                <button className='btn btn-danger fs-3' onClick={ClearCart}>Clear Cart</button>
                <Link to={'../../shop'} className='btn btn-primary fs-3'>Continue Sopping</Link>
            </div>
            {(cartState.length > 0)?
            (<><div className="d-flex justify-content-center">
            <p className="fs-1 text-bold m-3">Total: ${TotalPrice()}</p>
            </div>
            <div>{renderItems}</div></>) :
            (<div className="container card bg-info bg-gradient p-5 m-3">
                <h1 className='align-self-center'>Cart is Empty!</h1>
            </div>) }
        </div>
    )
}
