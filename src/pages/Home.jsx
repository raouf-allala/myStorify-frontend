import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import {
  Link,
  Navigate,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import { motion } from 'framer-motion';
import {
  TbTruckDelivery,
  TbHeadset,
  TbShieldCheck,
} from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { AiOutlineMobile } from 'react-icons/ai';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { BsTabletLandscape } from 'react-icons/bs';
import SlideImg from '../assets/slide.jpg';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { GiArmoredPants } from 'react-icons/gi';
import 'swiper/css/pagination';

// Import Swiper styles
import 'swiper/css';
import { FaTshirt } from 'react-icons/fa';
import { authUpdate } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
const Home = () => {
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const update = searchParams.get('update');
  console.log(update);
  const navigate = useNavigate();
  const [randomProducts, setRandomProducts] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [topProducts, setTopProducts] = useState();
  useEffect(() => {
    if (update === 'true') {
      const id = user.id;
      console.log(id);
      axios
        .get(`http://localhost:3000/api/users/dash/admin/${id}`)
        .then((res) => {
          console.log(res.data);
          dispatch(authUpdate(res.data));
        });
    }
    axios.get('http://localhost:3000/api/produits').then((res) => {
      setRandomProducts(res.data);
    });
    axios.get('http://localhost:3000/api/categories').then((res) => {
      console.log(res.data);
      setCategories(res.data);
    });
    axios
      .get('http://localhost:3000/api/produits/discounts')
      .then((res) => {
        setDiscounts(res.data);
      });
    axios
      .get('http://localhost:3000/api/produits/top')
      .then((res) => {
        setTopProducts(res.data);
      });
  }, []);
  if (isAuthenticated) {
    if (user?.adresse === undefined)
      return <Navigate to="/dashboard/admin" />;
  }
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
                            return (
                              <Link
                                to={`produits/catégorie/${cat.id}`}
                              >
                                {cat.nom}
                              </Link>
                            );
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
                pagination={{ clickable: true }}
                modules={[Pagination]}
                slidesPerView={1}
              >
                <SwiperSlide>
                  <div className="slide">
                    <img src={SlideImg} alt="" />
                    <p className="slide-sub">
                      Monde De La Technologie
                    </p>
                    <h1 className="title">
                      Découvrir Notre Catégorie D'électroniques.
                    </h1>
                    <Link className="slide-btn">
                      <p>Découvrir</p>
                      <HiArrowRight />
                    </Link>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="slide">
                    <img src={SlideImg} alt="" />
                    <p className="slide-sub">
                      Monde De La Technologie
                    </p>
                    <h1 className="title">
                      Découvrir Notre Catégorie D'électroniques.
                    </h1>
                    <Link className="slide-btn">
                      <p>Découvrir</p>
                      <HiArrowRight />
                    </Link>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="slide">
                    <img src={SlideImg} alt="" />
                    <p className="slide-sub">
                      Monde De La Technologie
                    </p>
                    <h1 className="title">
                      Découvrir Notre Catégorie D'électroniques.
                    </h1>
                    <Link className="slide-btn">
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
                <p className="section-title-text">Aujourd'hui</p>
              </div>
              <h1>Les Soldes</h1>
              <div className="products-wrapper-grid">
                {discounts.map((discount) => {
                  return <ProductCard product={discount.produit} />;
                })}
              </div>
              <div className="center">
                <Link className="btn">Voir Tous Les Produits</Link>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="section-wrapper">
              <div className="section-title">
                <div className="section-title-rectangle"></div>
                <p className="section-title-text">
                  Catégories les plus visitées
                </p>
              </div>
              <h1>Parcourir Par Catégorie</h1>
              <div className="categories-wrapper-home">
                <Link to="/produits/catégorie/2" className="category">
                  <AiOutlineMobile
                    style={{ fontSize: '4rem', marginBottom: '.2em' }}
                  />
                  <p>Smartphone</p>
                </Link>
                <Link to="/produits/catégorie/3" className="category">
                  <BsTabletLandscape
                    style={{ fontSize: '4rem', marginBottom: '.2em' }}
                  />
                  <p>Tablet</p>
                </Link>
                <Link to="/produits/catégorie/1" className="category">
                  <FaTshirt
                    style={{ fontSize: '4rem', marginBottom: '.2em' }}
                  />
                  <p>T-shirt</p>
                </Link>
                <Link to="/produits/catégorie/9" className="category">
                  <GiArmoredPants
                    style={{ fontSize: '4rem', marginBottom: '.2em' }}
                  />
                  <p>Pantalon</p>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="section-wrapper">
              <div className="section-title">
                <div className="section-title-rectangle"></div>
                <p className="section-title-text">Ce Mois-ci</p>
              </div>
              <h1>Produits Les Plus Vendus</h1>
              <div className="products-wrapper-grid">
                {topProducts && (
                  <>
                    <ProductCard product={topProducts[0]} />
                    <ProductCard product={topProducts[1]} />
                    <ProductCard product={topProducts[2]} />
                    <ProductCard product={topProducts[3]} />
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="section-wrapper">
              <div className="section-title">
                <div className="section-title-rectangle"></div>
                <p className="section-title-text">Nos Produits</p>
              </div>
              <h1>Découvrez Nos Produits</h1>
              <div className="products-wrapper-grid">
                {/* {randomProducts.map((product) => {
                  return <ProductCard product={product} />;
                })} */}
                {randomProducts[0] && (
                  <ProductCard product={randomProducts[0]} />
                )}
                {randomProducts[1] && (
                  <ProductCard product={randomProducts[1]} />
                )}
                {randomProducts[2] && (
                  <ProductCard product={randomProducts[2]} />
                )}
                {randomProducts[3] && (
                  <ProductCard product={randomProducts[3]} />
                )}
                {randomProducts[4] && (
                  <ProductCard product={randomProducts[4]} />
                )}
                {randomProducts[5] && (
                  <ProductCard product={randomProducts[5]} />
                )}
                {randomProducts[6] && (
                  <ProductCard product={randomProducts[6]} />
                )}
                {randomProducts[7] && (
                  <ProductCard product={randomProducts[7]} />
                )}
              </div>
              <div className="center">
                <Link to="/produits/tous" className="btn">
                  Voir Tous Les Produits
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="qualities-wrapper">
            <div className="quality">
              <div className="quality-top">
                <div className="quality-logo">
                  <TbTruckDelivery className="quality-logo-img" />
                </div>
              </div>
              <div className="quality-content">
                <h3>Nous assurons la livraison</h3>
                <p>Pour des prix raisonnables</p>
              </div>
            </div>
            <div className="quality">
              <div className="quality-top">
                <div className="quality-logo">
                  <TbHeadset className="quality-logo-img" />
                </div>
              </div>
              <div className="quality-content">
                <h3>Service Client 24/7</h3>
                <p>Support client convivial 24h/24 et 7j/7</p>
              </div>
            </div>
            <div className="quality">
              <div className="quality-top">
                <div className="quality-logo">
                  <TbShieldCheck className="quality-logo-img" />
                </div>
              </div>
              <div className="quality-content">
                <h3>Garantie De Remboursement</h3>
                <p>Nous remboursons dans les 30 jours</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
