import React from 'react'
import backImg from '../images/ecommerce-background.jpg'
import { Link } from 'react-router-dom'
import { usePopular } from '../context/usePopular'

export default function Home() {
    const {popularState, setPopularState} = usePopular();
    let listSortedByPopularity = popularState.sort((a,b) => b.numOfClicks - a.numOfClicks)
    let renderPopularItems = [];
    for(let i = 0; i < 3; i++){
        renderPopularItems.push(
            <Link onClick={() => HandleLogs(i)} to={`../shop/${listSortedByPopularity[i].id}`} id={i} className="card m-1 h-100 col-3 p-2 d-flex flex-column justify-content-between text-decoration-none" key={i}>
                    <img src={listSortedByPopularity[i].img} alt="" className='img-fluid' />
                    <div className='align-self-center text-dark'>
                        <h2 >{listSortedByPopularity[i].name}</h2>
                        <h4 >${listSortedByPopularity[i].price}</h4>
                    </div>
                </Link>
        )
    }

    function HandleLogs(index){
        let indexOfItem = popularState.findIndex((product) => product.id === listSortedByPopularity[index].id)
        popularState[indexOfItem].numOfClicks++ ;
        setPopularState(popularState);
        console.log(popularState);
    }

  return (
    <div className="d-flex">
        <div className="col-6 d-flex flex-column align-items-center justify-content-evenly">
            <h1 className='text-primary'>This is our store</h1>
            <h3>Popular Items:</h3>
            <div className="d-flex justify-content-center align-items-center">{renderPopularItems}</div>
        </div>
        <div className="col-6"><img className='img-fluid' src={backImg} alt="" /></div>
    </div>
  )
}
