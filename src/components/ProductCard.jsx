import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TfiHeart } from 'react-icons/tfi';
import { TiStarFullOutline } from 'react-icons/ti';
import { BsTrash } from 'react-icons/bs';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const ProductCard = ({ product, forceUpdate }) => {
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const [wishlist, setWishlist] = useState([]);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get(
          `${import.meta.env.VITE_SERVER_HOST}/api/produits/user`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setWishlist(res.data);
        });
    }
  }, [addedToWishlist]);
  const calcAvg = () => {
    let total = 0;
    let count = 0;
    product?.Review.forEach((review) => {
      total += review.evaluation;
      count++;
    });
    if (count == 0) {
      return 0;
    }
    return total / count;
  };
  let inFav = false;
  let wishlistId;
  wishlist.map((wishlist) => {
    if (wishlist.produit.id === product?.id) {
      inFav = true;
      wishlistId = wishlist.id;
    }
  });
  const calcNewPrice = (price, percentage) => {
    const minusValue = (price * percentage) / 100;
    return price - minusValue;
  };
  const handleRemoveWishlist = () => {
    axios
      .delete(
        `${
          import.meta.env.VITE_SERVER_HOST
        }/api/produits/user/${wishlistId}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setAddedToWishlist(false);
        if (forceUpdate) {
          forceUpdate();
        }
        setAddedToWishlist(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAddWishlist = () => {
    if (isAuthenticated) {
      axios
        .post(
          `${import.meta.env.VITE_SERVER_HOST}/api/produits/user`,
          { produitId: product?.id },
          { withCredentials: true }
        )
        .then((res) => {
          setAddedToWishlist(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate('/login');
    }
  };
  return (
    <div className="product-card">
      <div className="product-card-top">
        {inFav || addedToWishlist ? (
          <button
            onClick={handleRemoveWishlist}
            className="product-card-top__wishlist-btn"
          >
            <BsTrash />
          </button>
        ) : (
          <button
            onClick={handleAddWishlist}
            className="product-card-top__wishlist-btn"
          >
            <TfiHeart />
          </button>
        )}
        {product?.discounts.map((discount) => {
          if (discount.valide) {
            return (
              <div className="product-card-top__discount">
                <p>-{discount.pourcentage}%</p>
              </div>
            );
          }
        })}
        <div className="product-card__cta">
          <Link to={`/produits/${product?.id}`}>Voir Détails</Link>
        </div>
        <img
          className="product-card__img"
          src={product?.images[0]?.image_url}
          alt=""
        />
      </div>
      <div className="product-card__content">
        <p className="product-card__title">
          {product?.nom.length > 25
            ? product?.nom.slice(0, 24) + '...'
            : product?.nom}
        </p>
        {product?.discounts.map((discount) => {
          if (discount.valide) {
            return (
              <div style={{ display: 'flex', gap: '.5em' }}>
                <p className="product-card__price">
                  {calcNewPrice(product?.prix, discount.pourcentage)}{' '}
                  DA
                </p>
                <p
                  style={{
                    color: 'rgba(0, 0, 0, 0.3)',
                    textDecoration: 'line-through',
                  }}
                  className="product-card__price"
                >
                  {product?.prix} DA
                </p>
              </div>
            );
          } else {
            <p className="product-card__price">{product?.prix} DA</p>;
          }
        })}
        {product?.discounts.length === 0 && (
          <p className="product-card__price">{product?.prix} DA</p>
        )}
        <div className="stars-wrapper">
          {[...Array(Math.floor(calcAvg()))].map((x, i) => (
            <TiStarFullOutline className="star" />
          ))}
          {[...Array(5 - Math.floor(calcAvg()))].map((x, i) => (
            <TiStarFullOutline className="star unfilled" />
          ))}
          <small className="product-card__rating-count">
            ({product?.Review.length})
          </small>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
