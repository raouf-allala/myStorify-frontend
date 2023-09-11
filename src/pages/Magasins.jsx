import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { Pagination } from 'swiper';
import { SwiperSlide, Swiper } from 'swiper/react';
import IphoneBanner from '../assets/iPhone-Banner.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import AdidasBanner from '../assets/Adidas-Banner-transformed.jpeg';
import MagasinCard from '../components/MagasinCard';
const Magasins = () => {
  const [categories, setCategories] = useState([]);
  const [magasins, setMagasins] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/api/categories').then((res) => {
      setCategories(res.data);
    });
    axios
      .get('http://localhost:3000/api/magasins/valide')
      .then((res) => {
        setMagasins(res.data);
      });
  }, []);
  return (
    <>
      <section>
        <div className="container">
          <div className="home-first-section">
            <div className="left">
              <motion.ul
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="categories-list"
              >
                {categories.map((categorie) => {
                  return (
                    <li>
                      <Link>{categorie.nom}</Link>
                      <MdOutlineKeyboardArrowRight />
                      {categorie.Sous_Categorie.length !== 0 && (
                        <div className="sous-cat-wrapper">
                          {categorie.Sous_Categorie.map((cat) => {
                            return <Link>{cat.nom}</Link>;
                          })}
                        </div>
                      )}
                    </li>
                  );
                })}
              </motion.ul>
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
                <SwiperSlide>
                  <div className="slide">
                    <img src={IphoneBanner} alt="" />
                    <p className="slide-sub">Nos Milleurs Magasins</p>
                    <h1 className="title">
                      Raouf Store Pour Des Iphones De Qualité.
                    </h1>
                    <Link to="/magasin/2" className="slide-btn">
                      <p>Découvrir</p>
                      <HiArrowRight />
                    </Link>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="slide">
                    <img src={AdidasBanner} alt="" />
                    <p
                      style={{ color: 'black' }}
                      className="slide-sub"
                    >
                      Nos Meilleurs Magasins
                    </p>
                    <h1 style={{ color: 'black' }} className="title">
                      La Boutique Officielle Adidas En Algerie.
                    </h1>
                    <Link
                      to="/magasin/3"
                      style={{ color: 'black' }}
                      className="slide-btn slide-btn-black"
                    >
                      <p>Découvrir</p>
                      <HiArrowRight />
                    </Link>
                  </div>
                </SwiperSlide>
              </Swiper>
            </motion.div>
          </div>
        </div>
      </section>
      <main>
        <section>
          <div className="container">
            <div className="section-wrapper">
              <div className="section-title">
                <div className="section-title-rectangle"></div>
                <p className="section-title-text">
                  Meilleur Des Meilleurs
                </p>
              </div>
              <h1>Magasins Les Plus Visités</h1>
              <div className="products-wrapper-grid">
                {/* {magasins.map((magasin) => {
                  return <MagasinCard magasin={magasin} />;
                })} */}
                <MagasinCard magasin={magasins[0]} />
                <MagasinCard magasin={magasins[1]} />
                <MagasinCard magasin={magasins[2]} />
                <MagasinCard magasin={magasins[3]} />
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div
              style={{ border: 'none' }}
              className="section-wrapper"
            >
              <div className="section-title">
                <div className="section-title-rectangle"></div>
                <p className="section-title-text">Nos Magasins</p>
              </div>
              <h1>Découvrez Nos Magasins</h1>
              <div className="products-wrapper-grid">
                {magasins.map((magasin) => {
                  return <MagasinCard magasin={magasin} />;
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Magasins;
