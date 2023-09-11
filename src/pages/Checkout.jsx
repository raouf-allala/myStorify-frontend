import { useDispatch, useSelector } from 'react-redux';
import CIB from '../assets/unnamed.jpg';
import {
  Navigate,
  Link,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import axios from 'axios';
import { clearCart } from '../features/cart/cartSlice';
import { useEffect, useState } from 'react';
import Successs from '../components/Success';
const Checkout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const finish = searchParams.get('done');
  const [methode, setMethode] = useState('card crédit');
  const { cartItems, totale } = useSelector((state) => state.cart);
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const user = useSelector((state) => state.auth.user);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [adresse, setAdresse] = useState(user?.adresse);
  const [wilaya, setWilaya] = useState(user?.wilaya);
  const [change, setChange] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const effucterAchat = () => {
    if (methode === 'crédit du compte' && user?.credit < totale) {
      setError('Crédit insuffisant');
      console.log('crédit');
    } else if (methode === 'card crédit') {
      const commande_produits = [];
      cartItems.forEach((item) => {
        commande_produits.push({
          quantity: item.count,
          produitId: item.id,
          etat: 'non-livré',
        });
      });
      const commande = {
        commande_produits,
        methode_paiement: methode,
        totale: totale,
        adresse: adresse,
        wilaya: wilaya,
      };
      localStorage.setItem('commande', JSON.stringify(commande));
      navigate('/paiement/CIB');
    } else {
      const commande_produits = [];
      cartItems.forEach((item) => {
        commande_produits.push({
          quantity: item.count,
          produitId: item.id,
          etat: 'non-livré',
        });
      });
      console.log(commande_produits);
      axios
        .post(
          'https://mystorify-api.cyclic.app/api/achat',
          {
            totale: totale,
            methode_paiement: methode,
            commande_produits,
            adresse: adresse,
            wilaya: wilaya,
          },
          { withCredentials: true }
        )
        .then((res) => {
          dispatch(clearCart());
          setDone(true);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    if (finish === 'true') {
      setDone(true);
      localStorage.removeItem('commande');
    }
  }, []);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <main>
      <div className="container">
        <h1>Détails du Paiement</h1>
        <div className="login-flex">
          <div
            style={
              done
                ? {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                  }
                : { width: '100%' }
            }
          >
            {done ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Successs message="Votre Commande a été effectuée!" />
              </div>
            ) : (
              <>
                <h3 style={{ color: 'black', fontSize: '1.3rem' }}>
                  Déstination :
                </h3>
                <p> Votre commande sera livrée à votre adresse : </p>
                <p style={{ fontWeight: '500', marginBlock: '.5em' }}>
                  {' '}
                  {user?.wilaya} , {user?.adresse}
                </p>{' '}
                {!change ? (
                  <button
                    style={{
                      color: '#2E47BD',
                      border: 'none',
                      textDecoration: 'underline',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setChange(true);
                    }}
                  >
                    Changé
                  </button>
                ) : (
                  <button
                    style={{
                      color: '#2E47BD',
                      border: 'none',
                      textDecoration: 'underline',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setChange(false);
                      setAdresse(user.adresse);
                      setWilaya(user.wilaya);
                    }}
                  >
                    Gardé
                  </button>
                )}
                {change && (
                  <div>
                    <input
                      className="inputCheckout"
                      value={adresse}
                      placeholder="Adresse"
                      type="text"
                      style={{ width: '40%', marginTop: '1em' }}
                      onChange={(e) => {
                        setAdresse(e.target.value);
                      }}
                    />
                    <input
                      className="inputCheckout"
                      value={wilaya}
                      placeholder="Wilaya"
                      type="text"
                      style={{ width: '40%', marginTop: '1em' }}
                      onChange={(e) => {
                        setWilaya(e.target.value);
                      }}
                    />
                  </div>
                )}
                <h3
                  style={{
                    color: 'black',
                    fontSize: '1.3rem',
                    marginBlock: '1em',
                  }}
                >
                  Note (Optionnel) :
                </h3>
                <textarea
                  placeholder="Note*"
                  style={{ width: '70%' }}
                />
              </>
            )}
          </div>

          <div className="checkout-cart">
            <div style={{ maxHeight: 170, overflow: 'scroll' }}>
              {cartItems.length !== 0 ? (
                cartItems.map((product) => {
                  return (
                    <div className="checkout-cart-item">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '.8em',
                        }}
                      >
                        <img
                          src={product.images[0].image_url}
                          alt=""
                          className="cart-item-img"
                        />
                        <p>
                          {product.nom.length > 25
                            ? product.nom.slice(0, 24) + '...'
                            : product.nom}
                        </p>
                      </div>
                      <p>{product.prix} DA</p>
                    </div>
                  );
                })
              ) : (
                <p style={{ marginBlock: '1em' }}>
                  Vous N'avez Ajouté Aucun Produit A votre Panier !
                </p>
              )}
            </div>
            <ul>
              <li>
                <p>Total:</p>
                <p>{totale} DA</p>
              </li>
              <li>
                <p>Livraison:</p>
                <p>Gratuite</p>
              </li>
              <li>
                <p>Total final:</p>
                <p>{totale} DA</p>
              </li>
            </ul>
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '.7em',
                  marginTop: '.7em',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1em',
                  }}
                >
                  <input
                    type="radio"
                    name="methode"
                    value="card crédit"
                    id="card crédit"
                    checked={methode === 'card crédit'}
                    onChange={(e) => {
                      setMethode(e.target.value);
                    }}
                  />
                  <label htmlFor="card crédit">Card Crédit</label>
                </div>
                <img style={{ width: 25 }} src={CIB} alt="" />
              </div>
              <div
                style={
                  methode === 'crédit du compte'
                    ? {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1em',
                      }
                    : {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1em',
                        marginBottom: '0.7em',
                      }
                }
              >
                <input
                  type="radio"
                  name="methode"
                  value="crédit du compte"
                  id="crédit du compte"
                  onChange={(e) => {
                    setMethode(e.target.value);
                  }}
                  checked={methode === 'crédit du compte'}
                />
                <label htmlFor="crédit du compte">
                  Credit Du Compte
                </label>
              </div>
              {methode === 'crédit du compte' && (
                <div style={{}}>
                  <p
                    style={{
                      marginBlock: '.7em',
                      fontSize: '1rem',
                    }}
                  >
                    Votre Crédit :{' '}
                    <span style={{ fontWeight: 'bold' }}>
                      {user?.credit} DA
                    </span>
                  </p>
                  {error && (
                    <p
                      style={{
                        display: 'inline-block',
                        marginBottom: '.7em',
                      }}
                    >
                      {error}!
                      <Link to="/credit" className="rechar">
                        {' '}
                        Recharger Crédit
                      </Link>
                    </p>
                  )}
                </div>
              )}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1em',
                  marginBottom: '1em',
                }}
              >
                <input
                  type="radio"
                  name="methode"
                  value="cash"
                  id="cash"
                  checked={methode === 'cash'}
                  onChange={(e) => {
                    setMethode(e.target.value);
                  }}
                />
                <label htmlFor="cash">Cash</label>
              </div>
              {cartItems.length !== 0 ? (
                <button onClick={effucterAchat} className="btn">
                  Passer la commande
                </button>
              ) : (
                <button disabled className="btn">
                  Passer la commande
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Checkout;
