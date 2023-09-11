import { useEffect, useState } from 'react';
import Logo from '../assets/Rectangle 16.png';
import { BsThreeDots } from 'react-icons/bs';
import { TiStarFullOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';
const DashProduct = ({ product, magasinId, link }) => {
  const calcAvg = () => {
    let total = 0;
    let count = 0;
    product.Review.forEach((review) => {
      total += review.evaluation;
      count++;
    });
    if (count == 0) {
      return 0;
    }
    return total / count;
  };

  return (
    <>
      <div className='dash-product'>
        <div className='list'>
          <ul className='cols nums'>
            <div className='info'>
              <img src={product?.images[0]?.image_url} alt='' />

              <div className='text'>
                <h3>
                  {' '}
                  {product?.nom?.length > 20
                    ? product?.nom.slice(0, 19) + '...'
                    : product?.nom}
                </h3>
              </div>
            </div>
            <li>{product?.prix} DA</li>
            <li>{product?.quantity}</li>
            <li>{product?.Sous_Categorie?.nom}</li>
            <li>
              {product.Review && (
                <div className='stars-wrapper'>
                  {[...Array(Math.floor(calcAvg()))].map((x, i) => (
                    <TiStarFullOutline className='star' />
                  ))}
                  {[...Array(5 - Math.floor(calcAvg()))].map((x, i) => (
                    <TiStarFullOutline className='star unfilled' />
                  ))}
                  <small className='product-card__rating-count'>
                    ({product.Review.length})
                  </small>
                </div>
              )}
            </li>
          </ul>
        </div>

        <Link style={{ display: 'flex', alignItems: 'center' }} to={link}>
          <BsThreeDots className='more' />
        </Link>
      </div>
    </>
  );
};
export default DashProduct;
