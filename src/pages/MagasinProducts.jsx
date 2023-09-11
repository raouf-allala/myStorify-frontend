import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import { Link, useParams } from 'react-router-dom';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from '../components/ProductCard';
import Blob from '../assets/blob.svg';
const MagasinProducts = () => {
  const params = useParams();
  const [magasin, SetMagasin] = useState({});
  const [products, setProducts] = useState([]);
  useEffect(() => {
    window.scrollTo({ top: 0 });
    axios
      .get(
        `https://mystorify-api.cyclic.app/api/magasins/valide/${params.id}`
      )
      .then((res) => {
        SetMagasin(res.data);
      });
    axios
      .post(
        `https://mystorify-api.cyclic.app/api/produits/user/magasin/${params.id}`
      )
      .then((res) => {
        setProducts(res.data);
      });
  }, []);
  return (
    <>
      <section>
        <div className="container">
          <div className="home-first-section">
            <div className="left left-magasin">
              <img className="logo" src={magasin.logo} alt="" />
              <h2 style={{ color: 'black' }}>{magasin.nom}</h2>
              <p style={{ textAlign: 'center' }}>
                {magasin.description}
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="right"
            >
              <Swiper
                pagination={true}
                modules={[Pagination]}
                slidesPerView={1}
              >
                {/* {products.map((product) => {
                  return (
                    <SwiperSlide style={{ paddingRight: '1em' }}>
                      <div className="slide slide-magasin">
                        <img
                          style={{ background: 'white' }}
                          src={product?.images[0]?.image_url}
                          alt=""
                          className="img"
                        />
                        <p
                          style={{ color: 'black' }}
                          className="slide-sub"
                        >
                          Milleurs Produits
                        </p>
                        <h1
                          style={{
                            color: 'black',
                          }}
                          className="title"
                        >
                          {product.nom}
                        </h1>
                        <Link
                          to={`/produits/${product.id}`}
                          style={{ color: 'black' }}
                          className="slide-btn slide-btn-black"
                        >
                          <p>Voir Détails</p>
                          <HiArrowRight />
                        </Link>
                        <img className="blob1" src={Blob} alt="" />
                        <img className="blob2" src={Blob} alt="" />
                      </div>
                    </SwiperSlide>
                  );
                })} */}
                {products[2] && (
                  <SwiperSlide style={{ paddingRight: '1em' }}>
                    <div className="slide slide-magasin">
                      <img
                        style={{ background: 'white' }}
                        src={products[2]?.images[0]?.image_url}
                        alt=""
                        className="img"
                      />
                      <p
                        style={{ color: 'black' }}
                        className="slide-sub"
                      >
                        Milleurs Produits
                      </p>
                      <h1
                        style={{
                          color: 'black',
                        }}
                        className="title"
                      >
                        {products[2]?.nom}
                      </h1>
                      <Link
                        to={`/produits/${products[2]?.id}`}
                        style={{ color: 'black' }}
                        className="slide-btn slide-btn-black"
                      >
                        <p>Voir Détails</p>
                        <HiArrowRight />
                      </Link>
                      <img className="blob1" src={Blob} alt="" />
                      <img className="blob2" src={Blob} alt="" />
                    </div>
                  </SwiperSlide>
                )}
                {products[1] && (
                  <SwiperSlide style={{ paddingRight: '1em' }}>
                    <div className="slide slide-magasin">
                      <img
                        style={{ background: 'white' }}
                        src={products[1]?.images[0]?.image_url}
                        alt=""
                        className="img"
                      />
                      <p
                        style={{ color: 'black' }}
                        className="slide-sub"
                      >
                        Milleurs Produits
                      </p>
                      <h1
                        style={{
                          color: 'black',
                        }}
                        className="title"
                      >
                        {products[1]?.nom}
                      </h1>
                      <Link
                        to={`/produits/${products[1]?.id}`}
                        style={{ color: 'black' }}
                        className="slide-btn slide-btn-black"
                      >
                        <p>Voir Détails</p>
                        <HiArrowRight />
                      </Link>
                      <img className="blob1" src={Blob} alt="" />
                      <img className="blob2" src={Blob} alt="" />
                    </div>
                  </SwiperSlide>
                )}
                {products[0] && (
                  <SwiperSlide style={{ paddingRight: '1em' }}>
                    <div className="slide slide-magasin">
                      <img
                        style={{ background: 'white' }}
                        src={products[0]?.images[0]?.image_url}
                        alt=""
                        className="img"
                      />
                      <p
                        style={{ color: 'black' }}
                        className="slide-sub"
                      >
                        Milleurs Produits
                      </p>
                      <h1
                        style={{
                          color: 'black',
                        }}
                        className="title"
                      >
                        {products[0]?.nom}
                      </h1>
                      <Link
                        to={`/produits/${products[0]?.id}`}
                        style={{ color: 'black' }}
                        className="slide-btn slide-btn-black"
                      >
                        <p>Voir Détails</p>
                        <HiArrowRight />
                      </Link>
                      <img className="blob1" src={Blob} alt="" />
                      <img className="blob2" src={Blob} alt="" />
                    </div>
                  </SwiperSlide>
                )}
              </Swiper>
            </motion.div>
          </div>
        </div>
      </section>
      <main>
        <section>
          <div className="container">
            <div
              style={{ border: 'none' }}
              className="section-wrapper"
            >
              <div className="section-title">
                <div className="section-title-rectangle"></div>
                <p className="section-title-text">Magasin Produits</p>
              </div>
              <h1>Nos Produits</h1>
              <div className="products-wrapper-grid">
                {products.map((product) => {
                  return <ProductCard product={product} />;
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default MagasinProducts;
