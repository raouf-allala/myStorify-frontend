import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  logout,
  authClear,
  verifyRemember,
} from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { TfiHeart } from 'react-icons/tfi';
import { FiUser, FiShoppingCart } from 'react-icons/fi';
import { BiHistory, BiLogOut } from 'react-icons/bi';
import { BsShopWindow } from 'react-icons/bs';
import { CiMoneyBill } from 'react-icons/ci';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import { RiFilePaper2Line } from 'react-icons/ri';
import { RxArrowTopRight, RxHamburgerMenu } from 'react-icons/rx';
import axios from 'axios';
const Header = ({ socket }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [showMagasins, setShowMagasins] = useState(false);
  const [search, setSearch] = useState('');
  const [showNav, setShowNav] = useState(false);
  const profileRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const user = useSelector((state) => state.auth.user);
  const rememberMe = useSelector((state) => state.auth.rememberMe);
  const { cartCount } = useSelector((state) => state.cart);

  useEffect(() => {
    const handler = (e) => {
      if (!profileRef.current.contains(e.target)) {
        setProfileOpen(false);
        setShowMagasins(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });
  useEffect(() => {
    dispatch(verifyRemember(rememberMe));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() === '') {
      return;
    }
    navigate(`/recharcher/${search}`);
  };
  useEffect(() => {
    axios
      .get('https://mystorify-api.cyclic.app/api/users/verifyToken', {
        withCredentials: true,
      })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 401) {
          dispatch(authClear());
        }
      });
  }, [rememberMe]);
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  var objAr = [
    { name: 'John', age: 30 },
    { name: 'Peter', age: 27 },
    { name: 'Bob', age: 38 },
  ];
  function cmpAge(a, b) {
    return b.age - a.age;
  }
  console.log(objAr.sort(cmpAge));
  return (
    <>
      <header>
        <div className="header-promo">
          <p>
            Soldes D'été Pour De Nombreux T-shirts Et Livraison
            Express A Des Prix Raisonnables - 50 % !
            <Link
              className="header-promo-link"
              to="/produits/catégorie/1"
            >
              Achetez Maintenant
            </Link>
          </p>
        </div>
        <nav>
          <div className="container header-nav">
            <div className="logo">
              <Link to="/">MyStorify</Link>
            </div>
            <ul
              className={
                showNav ? 'main-nav main-nav-active' : 'main-nav'
              }
              style={isAuthenticated ? { marginLeft: '13%' } : {}}
            >
              <li>
                <NavLink to="/">Acceuil</NavLink>
              </li>
              <li>
                <NavLink to="/magasins">Magasins</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/report">Réclamation</NavLink>
              </li>
              {!isAuthenticated && (
                <li>
                  <NavLink to="/inscrire">S'inscrire</NavLink>
                </li>
              )}
            </ul>
            <div className="header-cta">
              <form
                onSubmit={handleSubmit}
                className="search-input-holder"
              >
                <FiSearch className="search-icon" />
                <input
                  placeholder="Chercher Produit"
                  type="text"
                  className="search-input"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </form>
              <div className="cart-header">
                <Link to="/panier" className="icon">
                  <FiShoppingCart />
                  {cartCount !== 0 && (
                    <div className="cart-count">
                      <p>{cartCount}</p>
                    </div>
                  )}
                </Link>
              </div>

              {isAuthenticated && (
                <div className="header-cta">
                  <Link to="favoris" className="icon">
                    <TfiHeart />
                  </Link>
                  <div ref={profileRef} className="profile">
                    <button
                      onClick={() => {
                        setProfileOpen(!profileOpen);
                        socket.emit(JSON.stringify(user.id), 'yoo');
                      }}
                      className="icon"
                    >
                      <FiUser />
                    </button>
                    {profileOpen && (
                      <ul className="profile-card">
                        {!showMagasins ? (
                          <>
                            <li>
                              <Link to="/compte/info">
                                <FiUser />
                                <p>Gérer Compte</p>
                              </Link>
                            </li>
                            <li>
                              <Link to="/historique">
                                <BiHistory />
                                <p>Mes Commandes</p>
                              </Link>
                            </li>

                            <li>
                              <Link to="/demandeMagasin">
                                <RiFilePaper2Line />
                                <p>Ouvrir un magasin</p>
                              </Link>
                            </li>

                            {user?.Magasin?.length !== 0 && (
                              <li>
                                <button
                                  onClick={() => {
                                    setShowMagasins(true);
                                  }}
                                >
                                  <BsShopWindow />
                                  <p>Mes Magasins</p>
                                  <MdOutlineKeyboardArrowRight />
                                </button>
                              </li>
                            )}
                            <li>
                              <Link to="/credit">
                                <CiMoneyBill />
                                <p>Mon Crédit</p>
                              </Link>
                            </li>
                            <li>
                              <button onClick={handleLogout}>
                                <BiLogOut />
                                <p>Se déconnecter</p>
                              </button>
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                              <button
                                onClick={() => {
                                  setShowMagasins(false);
                                }}
                              >
                                <MdOutlineKeyboardArrowLeft />
                              </button>
                            </li>
                            {user?.Magasin?.map((magasin) => {
                              return (
                                <li>
                                  <Link
                                    to={`/dashboard/magasin/${magasin.id}`}
                                  >
                                    <BsShopWindow />
                                    <p>{magasin.nom}</p>
                                    <RxArrowTopRight />
                                  </Link>
                                </li>
                              );
                            })}
                          </>
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="ham-holder">
              <button
                onClick={() => {
                  setShowNav(!showNav);
                }}
              >
                <RxHamburgerMenu />
              </button>
            </div>
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
