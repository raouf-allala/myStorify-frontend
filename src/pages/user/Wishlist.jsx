import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [randoms, setRandoms] = useState([]);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_HOST}/api/produits/user`, {
        withCredentials: true,
      })
      .then((res) => {
        setWishlist(res.data);
      });
    axios
      .get(
        `${import.meta.env.VITE_SERVER_HOST}/api/produits/random/4`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setRandoms(res.data);
      });
  }, [reducerValue]);
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <main>
      <div className="container">
        <section>
          <div className="section-wrapper">
            <h1 style={{ fontWeight: 400, fontSize: '1.5rem' }}>
              Mes Favoris ({wishlist.length})
            </h1>
            {wishlist.length !== 0 && (
              <div className="products-wrapper-grid">
                {wishlist.map((wishlist) => {
                  return (
                    <ProductCard
                      product={wishlist.produit}
                      forceUpdate={forceUpdate}
                    />
                  );
                })}
              </div>
            )}
            {wishlist.length === 0 && (
              <div className="center">
                <h2
                  style={{
                    fontWeight: '400',
                    fontSize: '1.3rem',
                    marginBottom: '1.5em',
                  }}
                >
                  Vous N'avez Ajouté Aucun Produit Aux Favoris !
                </h2>
                <Link className="btn" to="/">
                  Voir Les Produits
                </Link>
              </div>
            )}
          </div>
          <div
            style={{ borderBottom: 'none' }}
            className="section-wrapper"
          >
            <div className="section-title">
              <div className="section-title-rectangle"></div>
              <p className="section-title-text">Juste Pour Toi</p>
            </div>
            <div className="products-wrapper-grid">
              {randoms.map((produit) => {
                return <ProductCard product={produit} />;
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Wishlist;
