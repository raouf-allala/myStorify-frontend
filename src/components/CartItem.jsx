import { CgClose } from 'react-icons/cg';
import { removeFromCart } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <li className='cart-table-row'>
      <div
        style={{
          display: 'flex',
          gap: '1em',
          alignItems: 'center',
        }}
      >
        <div className='cart-item-img'>
          <img src={product.images[0].image_url} alt='' />
        </div>

        <p>
          {product.nom.length > 60
            ? product.nom.slice(0, 40) + '...'
            : product.nom}
        </p>
      </div>
      <div className='cart-item-delete'>
        <button
          onClick={() => {
            dispatch(removeFromCart(product));
          }}
        >
          <CgClose />
        </button>
      </div>
      <p>{product.prix}</p>
      <p>{product.count}</p>
      <p>{product.prix * product.count}</p>
    </li>
  );
};

export default CartItem;
