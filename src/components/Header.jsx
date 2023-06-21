import { Link } from "react-router-dom";
import { useCart } from '../context/useCart';
import cartIcon from '../images/basket-cart-icon-27.png'
import storeLogo from '../images/ecommerce-logo.png'


export default function Header() {
  const {cartState} = useCart();

  return (
    <div className="d-flex justify-content-between p-3 bg-light">
      <Link className="col-3" to={''}> 
          <img className="img-fluid col-4" src={storeLogo} alt="" />
        </Link>
        <Link className="btn btn-dark text-white fs-5" to={'../../shop'}>Shop</Link>
        <Link className="col-1" to={'../../cart'}> 
          <img className="img-fluid col-4" src={cartIcon} alt="" />
          {
            (cartState.length > 0) ?
            (<span class="position-absolute top-10 start-10 translate-middle badge rounded-pill bg-danger">
              {cartState.length}   
            </span>) : null
          }
        </Link>
    </div>
  )
}
