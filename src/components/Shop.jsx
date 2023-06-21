import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePopular } from '../context/usePopular'


export default function Shop({ storeData }) {

    const [renderStoreItems, setRenderStoreItems] = useState([])
    const [categorySelect, setCategorySelect] = useState("all")
    const [itemSearch, setItemSearch] = useState("")
    const [priceRange, setPriceRange] = useState(0)
    const {popularState, setPopularState} = usePopular();

    //sets the lowest and highest price for the range filter
    let prices = storeData.map(function (item) {
        return item.price;
    })
    const lowestPrice = Math.min(...prices);
    const highestPrice = Math.max(...prices);

    //sets the categories for the select filter
    let everyCategories = storeData.map(function (item) {
        return item.category;
    })
    let categories = [...new Set(everyCategories)]
    let renderCategories = categories.map(function (item, i) {
        return <option key={i} value={item}>{item}</option>
    })

    let curItems = FilterItems();

    function FilterItems(){
        let items = storeData;
        //filter by category
        if(categorySelect !== 'all'){
            items = items.filter(function (item) {
                return item.category === categorySelect;
        })}
        //filter by search
        if(itemSearch !== ""){
            items = items.filter(function (item) {
                return item.name.toLowerCase().includes(itemSearch.toLowerCase());
            })
        }
        //filter by range
        items = items.filter(function (item) {
            return item.price > priceRange;
        })
        return items;
    }

    useEffect(function () {

        setRenderStoreItems(curItems.map(function (item, i) {

            return (
                <Link onClick={() => HandleLogs(i)} to={`../shop/${item.id}`} id={i} className="card m-2 h-2 p-2 col-3 d-flex flex-column justify-content-between text-decoration-none" key={i}>
                    <img src={item.img} alt="" />
                    <div className='align-self-center text-dark'>
                        <h2 >{item.name}</h2>
                        <h4 >${item.price}</h4>
                    </div>
                </Link>
            )
        }))
    }, [itemSearch,categorySelect, priceRange ])
    
    function HandleLogs(index){
        popularState[index].numOfClicks++ ;
        setPopularState(popularState);
    }
    console.log(popularState);

    return (
        <div className="d-flex navbar" style={(renderStoreItems.length < 4) ? {height:'76vh'}: null}>
            <div className="d-flex flex-column justify-context-evenly align-self-start align-items-start col-3 p-8 sticky-top">
                <input placeholder='search' onKeyUp={(e) => setItemSearch(e.target.value)} type="text" name="" className='m-3 p-1 rounded' id="" />
                <select onChange={(e) => setCategorySelect(e.target.value)} className='m-3 p-1 rounded'>
                    <option value="all">--Please choose a category--</option>
                    {renderCategories}
                </select>
                <div className='m-3'>
                    <label htmlFor="price">Price Range:</label>
                    <div className="d-flex">
                        <span>${lowestPrice}</span>
                        <input onChange={(e) => setPriceRange(e.target.value)} className='m-1 form-range' type="range" min={lowestPrice} max={highestPrice} id="price" name="price" />
                        <span>${highestPrice}</span>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-wrap col-9">
                {renderStoreItems}
            </div>
        </div>
    )
}
