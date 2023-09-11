import CartItem from '../components/CartItem';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  return (
    <main>
      <div className="container">
        <h1>Panier</h1>
        {cart.cartItems.length !== 0 ? (
          <>
            <div
              style={{ paddingInline: '1em', paddingBlock: '.5em' }}
            >
              <ul className="cart-table-row">
                <li className="grid-item">Produit</li>
                <li className="grid-item">Prix</li>
                <li className="grid-item">Quantité</li>
                <li className="grid-item">Totale</li>
              </ul>
            </div>
            <ul
              className="cart-items"
              style={{ paddingInline: '1em', paddingBlock: '.5em' }}
            >
              {cart.cartItems.map((product) => {
                return <CartItem product={product} />;
              })}
            </ul>
          </>
        ) : (
          <div style={{ marginBottom: '2em' }} className="center">
            <h2
              style={{
                fontWeight: 400,
                fontSize: '1.3rem',
                marginBottom: '1.7em',
              }}
            >
              Vous N'avez Ajouté Aucun Produit A votre Panier !
            </h2>
            <Link to="/" className="btn">
              Retour À La page D'accueil
            </Link>
          </div>
        )}
        <div className="cart-cta">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="btn btn-sec"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '.4em',
              paddingInline: '1em',
            }}
          >
            <MdOutlineKeyboardArrowLeft />
            <p>Retour</p>
          </button>
          {cart.cartItems.length !== 0 && (
            <button
              onClick={() => {
                dispatch(clearCart());
              }}
              className="btn btn-sec"
            >
              Vider Le Panier
            </button>
          )}
        </div>
        <div style={{ marginTop: '2.5em' }} className="cart-cta">
          <div style={{ display: 'flex', gap: '1em' }}>
            <input
              placeholder="Code Promo"
              className="coupon-input"
              type="text"
            />
            {cart.cartItems.length !== 0 ? (
              <button className="btn">Appliquer</button>
            ) : (
              <button disabled className="btn">
                Appliquer
              </button>
            )}
          </div>
          <div className="cart-cta-card">
            <h3 style={{ color: 'black' }}>Total Du Panier</h3>
            <ul>
              <li>
                <p>Total:</p>
                <p>{cart.totale}</p>
              </li>
              <li>
                <p>Livraison:</p>
                <p>Gratuite</p>
              </li>
              <li>
                <p>Total final:</p>
                <p>{cart.totale}</p>
              </li>
            </ul>
            <div style={{ marginTop: '1.5em', textAlign: 'center' }}>
              <Link to="/paiement" className="btn">
                Passe Au Paiement
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
