import { TiStarFullOutline } from 'react-icons/ti';
import { FiRefreshCcw } from 'react-icons/fi';
import { TfiHeart } from 'react-icons/tfi';

import axios from 'axios';
import { useEffect, useReducer, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BsTrash } from 'react-icons/bs';
import ProductCard from '../components/ProductCard';
import ImageZoom from '../components/ImageZoom';
import { FaUserCircle } from 'react-icons/fa';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import ReviewCard from '../components/ReviewCard';
import AjouterCom from '../components/AjouterCom';
import { MdOutlineDeliveryDining } from 'react-icons/md';
const ProductDetails = () => {
  const [reducerValue, forUpdate] = useReducer((x) => x + 1, 0);
  const ref = useRef();
  const { produitId } = useParams();
  const [counter, setCounter] = useState(1);
  const [ImgsFocused, setImgsFocused] = useState(false);
  const [product, setProduct] = useState({});
  const [magasin, SetMagasin] = useState({});
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [storeProducts, setStoreProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [reviews, SetReviews] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [focused, setFocused] = useState(0);
  const [mainImg, setMainImg] = useState('');
  const dispatch = useDispatch();
  const [openReview, setOpenReview] = useState(false);
  const calcAvg = () => {
    let total = 0;
    let count = 0;
    reviews.forEach((review) => {
      total += review.evaluation;
      count++;
    });
    if (count == 0) {
      return 0;
    }
    return Math.round(total / count);
  };
  // const calcReviewers = (number) => {
  //   let reviewers = 0;
  //   reviews.forEach((review) => {
  //     if (review.evaluation === number) {
  //       reviewers++;
  //     }
  //   });
  //   return reviewers;
  // };
  const getRelatedProducts = (res) => {
    axios
      .post(
        'https://mystorify-api.cyclic.app/api/produits/categorie',
        {
          sous_CategorieId: res.data.Sous_Categorie.id,
        }
      )
      .then((res) => {
        setCategoryProducts(res.data);
      });
  };
  const getStoreProducts = (res) => {
    axios
      .post(
        `https://mystorify-api.cyclic.app/api/produits/user/magasin/${res.data.magasin.id}`,
        {
          number: 3,
        }
      )
      .then((res) => {
        setStoreProducts(res.data);
      });
  };
  const getProduct = () => {
    axios
      .get(
        `https://mystorify-api.cyclic.app/api/produits/${produitId}`
      )
      .then((res) => {
        setProduct(res.data);
        setImages(res.data.images);
        setMainImg(res.data.images[0].image_url);
        SetReviews(res.data.Review);
        SetMagasin(res.data.magasin);
        setDiscounts(res.data.discounts);
        getRelatedProducts(res);
        getStoreProducts(res);
        if (res.data.quantity === 0) {
          setCounter(0);
          ref.current.disabled = true;
        } else setCounter(1);
      });
  };
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const user = useSelector((state) => state.auth.user);
  const [wishlist, setWishlist] = useState([]);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    getProduct();
  }, [produitId, reducerValue]);
  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get('https://mystorify-api.cyclic.app/api/produits/user', {
          withCredentials: true,
        })
        .then((res) => {
          setWishlist(res.data);
        });
    }
  }, [addedToWishlist]);
  let inFav = false;
  let wishlistId;
  wishlist.map((wishlist) => {
    if (wishlist.produit.id === product.id) {
      inFav = true;
      wishlistId = wishlist.id;
    }
  });
  const handleRemoveWishlist = () => {
    axios
      .delete(
        `https://mystorify-api.cyclic.app/api/produits/user/${wishlistId}`,
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
          `https://mystorify-api.cyclic.app/api/produits/user`,
          { produitId: product.id },
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
  const calcNewPrice = (price, percentage) => {
    const minusValue = (price * percentage) / 100;
    return price - minusValue;
  };
  return (
    <main>
      <div className="container">
        <div className="product-details">
          <div className="product-side">
            <h3 style={{ color: 'black' }}>{product.nom}</h3>
            <Link to={`/magasin/${magasin.id}`} className="magasin">
              {magasin.nom}
            </Link>
            <div className="review">
              <div className="stars-wrapper">
                {[...Array(calcAvg())].map((x, i) => (
                  <TiStarFullOutline key={i} className="star" />
                ))}
                {[...Array(5 - calcAvg())].map((x, i) => (
                  <TiStarFullOutline
                    key={i}
                    className="star unfilled"
                  />
                ))}
              </div>
              <small className="product-card__rating-count">
                ({reviews.length} Commentaires)
              </small>
              {product?.quantity === 0 ? (
                <p style={{ color: 'red' }}>
                  En stock ({product.quantity})
                </p>
              ) : (
                <p>En stock ({product.quantity})</p>
              )}
            </div>
            {discounts.map((discount) => {
              if (discount.valide) {
                return (
                  <div style={{ display: 'flex', gap: '.5em' }}>
                    <p
                      style={{ color: 'var(--clr-primary)' }}
                      className="price"
                    >
                      {calcNewPrice(
                        product.prix,
                        discount.pourcentage
                      )}{' '}
                      DA
                    </p>
                    <p
                      style={{
                        color: 'rgba(0, 0, 0, 0.3)',
                        textDecoration: 'line-through',
                      }}
                      className="price"
                    >
                      {product.prix} DA
                    </p>
                  </div>
                );
              } else {
                <p className="price">{product.prix} DA</p>;
              }
            })}
            {discounts.length === 0 && (
              <p className="product-card__price">{product.prix} DA</p>
            )}
            {/* <p className="price">{product.prix} DA</p> */}
            <p className="desc">{product.description}</p>
            <div className="btns">
              <div className="plus-minus">
                <p
                  className="minus"
                  onClick={() => {
                    if (counter > 1) {
                      setCounter((current) => --current);
                    }
                  }}
                >
                  -
                </p>
                <span>{counter}</span>
                <p
                  className="plus"
                  onClick={() => {
                    if (counter < product?.quantity)
                      setCounter((current) => ++current);
                  }}
                >
                  +
                </p>
              </div>
              <button
                style={{ fontSize: '1rem', paddingInline: '1em' }}
                ref={ref}
                className="btn"
                onClick={() => {
                  if (discounts.length !== 0) {
                    discounts.forEach((discount) => {
                      if (discount.valide) {
                        const newPriceProduct = product;
                        newPriceProduct.prix = calcNewPrice(
                          product.prix,
                          discount.pourcentage
                        );
                        dispatch(
                          addToCart({
                            ...newPriceProduct,
                            count: counter,
                          })
                        );
                      } else {
                        dispatch(
                          addToCart({ ...product, count: counter })
                        );
                      }
                    });
                  } else {
                    dispatch(
                      addToCart({ ...product, count: counter })
                    );
                  }
                }}
              >
                Ajouter au panier
              </button>
              {inFav || addedToWishlist ? (
                <button
                  onClick={handleRemoveWishlist}
                  className="icon-wrapper wish"
                >
                  <BsTrash className="icon" />
                </button>
              ) : (
                <button
                  onClick={handleAddWishlist}
                  className="icon-wrapper wish"
                >
                  <TfiHeart className="icon" />
                </button>
              )}
              {/* <button className="icon-wrapper wish">
                <TfiHeart className="icon" />
              </button> */}
            </div>
            <div className="extras">
              <div className="extras-flex">
                <div className="icon-wrapper">
                  <MdOutlineDeliveryDining className="icon" />
                </div>
                <div className="text">
                  <h4>Prix De Livraison :</h4>
                  {user?.wilaya ? (
                    <p>
                      Prix de livraison vers {user?.wilaya} est :
                      Gratuite
                    </p>
                  ) : (
                    <p>Vous n'êtes pas connecté !</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {images.length !== 0 && (
            <div className="img-side">
              <div className="mini-imgs">
                {images.map((image) => {
                  return (
                    <img
                      onClick={() => {
                        setMainImg(image.image_url);
                      }}
                      key={image.id}
                      src={image.image_url}
                      style={{ cursor: 'pointer' }}
                      alt=""
                    />
                  );
                })}
              </div>
              <div className="main-img">
                <ImageZoom imageUrl={mainImg} />
              </div>
            </div>
          )}
        </div>
      </div>
      <section>
        <div className="container">
          <div className="section-wrapper">
            <div className="section-title">
              <div className="section-title-rectangle"></div>
              <p className="section-title-text">
                Ce Que Les Autres Pensent
              </p>
            </div>
            <div className="reviews-wrapper">
              <Swiper
                modules={[Navigation]}
                spaceBetween={30}
                slidesPerView={'auto'}
                navigation
              >
                {reviews.length !== 0 ? (
                  reviews.map((review) => {
                    return (
                      <SwiperSlide
                        key={review.id}
                        style={{ width: '30%' }}
                      >
                        <ReviewCard review={review} />
                      </SwiperSlide>
                    );
                  })
                ) : (
                  <div className="center">
                    <h2
                      style={{
                        fontWeight: 400,
                        fontSize: '1.3rem',
                        marginBottom: '.3em',
                      }}
                    >
                      Ce Produit N'a Pas De Commantaire !
                    </h2>
                  </div>
                )}
              </Swiper>
            </div>
            <div style={{ marginBottom: '1em' }} className="center">
              <button
                onClick={() => {
                  setOpenReview(true);
                }}
                className="btn"
              >
                Ajouter Commentaire
              </button>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="section-wrapper">
            <div className="section-title">
              <div className="section-title-rectangle"></div>
              <p className="section-title-text">Articles Connexes</p>
            </div>
            <div className="products-wrapper-grid">
              {/* {categoryProducts.map((product) => {
                return (
                  <ProductCard product={product} key={product.id} />
                );
              })} */}
              {categoryProducts[0] && (
                <ProductCard
                  product={categoryProducts[0]}
                  key={categoryProducts[0]?.id}
                />
              )}
              {categoryProducts[1] && (
                <ProductCard
                  product={categoryProducts[1]}
                  key={categoryProducts[1]?.id}
                />
              )}
              {categoryProducts[2] && (
                <ProductCard
                  product={categoryProducts[2]}
                  key={categoryProducts[2]?.id}
                />
              )}
              {categoryProducts[3] && (
                <ProductCard
                  product={categoryProducts[3]}
                  key={categoryProducts[3]?.id}
                />
              )}
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div style={{ border: 'none' }} className="section-wrapper">
            <div className="section-title">
              <div className="section-title-rectangle"></div>
              <p className="section-title-text">
                Articles Du Même Magasin
              </p>
            </div>
            <div className="products-wrapper-grid">
              {/* {storeProducts.map((product) => {
                return (
                  <ProductCard product={product} key={product.id} />
                );
              })} */}
              {storeProducts[0] && (
                <ProductCard
                  product={storeProducts[0]}
                  key={storeProducts[0]?.id}
                />
              )}
              {storeProducts[1] && (
                <ProductCard
                  product={storeProducts[1]}
                  key={storeProducts[1]?.id}
                />
              )}
              {storeProducts[2] && (
                <ProductCard
                  product={storeProducts[2]}
                  key={storeProducts[2]?.id}
                />
              )}
              {storeProducts[3] && (
                <ProductCard
                  product={storeProducts[3]}
                  key={storeProducts[3]?.id}
                />
              )}
            </div>
          </div>
        </div>
      </section>
      {/* <section className="reviews-section">
        <div className="container">
          <div className="section-wrapper">
            <div className="section-title">
              <div className="section-title-rectangle"></div>
              <p className="section-title-text">
                Ce Que Les Autres Pensent
              </p>
            </div>
            <div>
              <div className="stars-wrapper">
                {[...Array(5)].map((x, i) => (
                  <TiStarFullOutline key={i} className="star" />
                ))}
                {[...Array(0)].map((x, i) => (
                  <TiStarFullOutline
                    key={i}
                    className="star unfilled"
                  />
                ))}
                <p>({calcReviewers(5)})</p>
              </div>
              <div className="stars-wrapper">
                {[...Array(4)].map((x, i) => (
                  <TiStarFullOutline key={i} className="star" />
                ))}
                {[...Array(1)].map((x, i) => (
                  <TiStarFullOutline
                    key={i}
                    className="star unfilled"
                  />
                ))}
                <p>({calcReviewers(4)})</p>
              </div>
              <div className="stars-wrapper">
                {[...Array(3)].map((x, i) => (
                  <TiStarFullOutline key={i} className="star" />
                ))}
                {[...Array(2)].map((x, i) => (
                  <TiStarFullOutline
                    key={i}
                    className="star unfilled"
                  />
                ))}
                <p>({calcReviewers(3)})</p>
              </div>
              <div className="stars-wrapper">
                {[...Array(2)].map((x, i) => (
                  <TiStarFullOutline key={i} className="star" />
                ))}
                {[...Array(3)].map((x, i) => (
                  <TiStarFullOutline
                    key={i}
                    className="star unfilled"
                  />
                ))}
                <p>({calcReviewers(2)})</p>
              </div>
              <div className="stars-wrapper">
                {[...Array(1)].map((x, i) => (
                  <TiStarFullOutline key={i} className="star" />
                ))}
                {[...Array(4)].map((x, i) => (
                  <TiStarFullOutline
                    key={i}
                    className="star unfilled"
                  />
                ))}
                <p>({calcReviewers(1)})</p>
              </div>
              <div className="stars-wrapper">
                {[...Array(0)].map((x, i) => (
                  <TiStarFullOutline key={i} className="star" />
                ))}
                {[...Array(5)].map((x, i) => (
                  <TiStarFullOutline
                    key={i}
                    className="star unfilled"
                  />
                ))}
                <p>({calcReviewers(0)})</p>
              </div>
            </div>
            <div></div>
            <div></div>
          </div>
        </div>
      </section> */}
      {openReview && (
        <AjouterCom
          setOpenReview={setOpenReview}
          productId={product.id}
          forceUpdate={forUpdate}
        />
      )}
    </main>
  );
};

export default ProductDetails;
