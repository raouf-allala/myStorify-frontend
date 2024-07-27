import { MdOutlineSettings } from 'react-icons/md';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import {
  MdOutlineNotificationsNone,
  MdOutlineSpaceDashboard,
} from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { AiOutlineFileText } from 'react-icons/ai';
import { BsTruck, BsBag } from 'react-icons/bs';
import { TfiStatsUp } from 'react-icons/tfi';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { logout } from '../features/auth/authSlice';
import { BiStoreAlt, BiCategory } from 'react-icons/bi';
import { VscReport } from 'react-icons/vsc';
import { FiUser } from 'react-icons/fi';
import axios from 'axios';
const DashAdminSides = () => {
  const left = useRef();
  const right = useRef();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();
  console.log(user);

  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [fourth, setFourth] = useState(false);
  const [fifth, setFifth] = useState(false);
  const [sixth, setSixth] = useState(false);
  const [eigth, setEigth] = useState(false);
  const [last, setLast] = useState(false);
  const [showSide, setShowSide] = useState(false);
  const [userCount, setUserCount] = useState();
  const [productCount, setProductCount] = useState();
  const [magasinCount, setMagasinCount] = useState();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_HOST}/api/users/stats`)
      .then((res) => {
        console.log(res.data);
        setUserCount(res.data.usersCount);
        setMagasinCount(res.data.magasinCount);
        setProductCount(res.data.productCount);
      })
      .catch(() => {
        console.log(err);
      });
  }, []);

  // if (isAuthenticated) {
  //   if (user?.adresse !== undefined) {
  //     return <Navigate to="/" />;
  //   }
  // } else {
  //   return <Navigate to="/login" />;
  // }
  return (
    <>
      <div className="dash-wrapper">
        <aside className="dash-sidebar">
          <div
            onMouseOver={() => {
              setShowSide(true);
            }}
          >
            <div className="img" style={{ width: '40px' }}>
              <img
                src={Logo}
                alt=""
                style={showSide ? { opacity: '0' } : { opacity: '1' }}
              />
            </div>
            <div
              className="links icons "
              ref={left}
              onScroll={() => {
                if (left.current.scrollTop === 60) {
                  right.current.scrollTop =
                    left.current.scrollTop + 8;
                } else
                  right.current.scrollTop = left.current.scrollTop;
                console.log(right.current.scrollTop);
              }}
            >
              <Link
                onMouseOver={() => setSecond(true)}
                style={
                  second ? { color: 'white' } : { color: '#5E8CD9' }
                }
                onMouseLeave={() => setSecond(false)}
                to={`/dashboard/admin/users`}
                className={
                  location.pathname.includes('users')
                    ? 'sideSelected'
                    : ''
                }
              >
                <FiUser className="dash-icon" />
              </Link>
              <Link
                onMouseOver={() => setThird(true)}
                style={
                  third ? { color: 'white' } : { color: '#5E8CD9' }
                }
                onMouseLeave={() => setThird(false)}
                to={`/dashboard/admin/magasins`}
                className={
                  location.pathname.includes('magasins')
                    ? 'sideSelected'
                    : ''
                }
              >
                <BiStoreAlt className="dash-icon" />
              </Link>
              <Link
                onMouseOver={() => setFourth(true)}
                style={
                  fourth ? { color: 'white' } : { color: '#5E8CD9' }
                }
                onMouseLeave={() => setFourth(false)}
                to={`/dashboard/admin/products`}
                className={
                  location.pathname.includes('products')
                    ? 'sideSelected'
                    : ''
                }
              >
                <BsBag className="dash-icon" />
              </Link>
              <Link
                onMouseOver={() => setFifth(true)}
                style={
                  fifth ? { color: 'white' } : { color: '#5E8CD9' }
                }
                onMouseLeave={() => setFifth(false)}
                to={`/dashboard/admin/reports`}
                className={
                  location.pathname.includes('reports')
                    ? 'sideSelected'
                    : ''
                }
              >
                <VscReport className="dash-icon" />
              </Link>
              <Link
                onMouseOver={() => setEigth(true)}
                style={
                  eigth ? { color: 'white' } : { color: '#5E8CD9' }
                }
                onMouseLeave={() => setEigth(false)}
                to={`/dashboard/admin/categories`}
                className={
                  location.pathname.endsWith('categories')
                    ? 'sideSelected'
                    : ''
                }
              >
                <BiCategory className="dash-icon" />
              </Link>
              <Link
                onMouseOver={() => setSixth(true)}
                style={
                  sixth ? { color: 'white' } : { color: '#5E8CD9' }
                }
                onMouseLeave={() => setSixth(false)}
                to={`/dashboard/admin/update`}
                className={
                  location.pathname.endsWith('update')
                    ? 'sideSelected'
                    : ''
                }
              >
                <MdOutlineSettings className="dash-icon" />
              </Link>
            </div>
            <div
              className="logout"
              onMouseOver={() => setLast(true)}
              style={last ? { color: 'white' } : { color: '#5E8CD9' }}
              onMouseLeave={() => setLast(false)}
              onClick={() => {
                dispatch(logout());
              }}
            >
              <RiLogoutBoxRLine className="dash-icon" />
            </div>
          </div>
          {showSide && (
            <motion.div
              onMouseLeave={() => {
                setShowSide(false);
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ dealay: 0.5, duraion: 0.5 }}
            >
              <div
                className="img"
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  width: '40px',
                  marginLeft: '-35%',
                }}
              >
                <img
                  src={Logo}
                  alt=""
                  style={
                    showSide
                      ? { opacity: '1', justifySelf: 'center' }
                      : { opacity: '0' }
                  }
                />
              </div>
              <div
                className="links text"
                ref={right}
                onScroll={() => {
                  if (right.current.scrollTop === 72.80000305175781) {
                    left.current.scrollTop =
                      right.current.scrollTop - 9;
                  } else
                    left.current.scrollTop = right.current.scrollTop;
                  console.log(right.current.scrollTop);
                }}
              >
                <Link
                  onMouseOver={() => setSecond(true)}
                  style={
                    second ? { color: 'white' } : { color: '#5E8CD9' }
                  }
                  onMouseLeave={() => setSecond(false)}
                  to={`/dashboard/admin/users`}
                  className={
                    location.pathname.includes('users')
                      ? 'sideSelected'
                      : ''
                  }
                >
                  Liste des utilisateurs
                </Link>
                <Link
                  onMouseOver={() => setThird(true)}
                  style={
                    third ? { color: 'white' } : { color: '#5E8CD9' }
                  }
                  onMouseLeave={() => setThird(false)}
                  to={`/dashboard/admin/magasins`}
                  className={
                    location.pathname.includes('magasins')
                      ? 'sideSelected'
                      : ''
                  }
                >
                  Liste des magasins
                </Link>
                <Link
                  onMouseOver={() => setFourth(true)}
                  style={
                    fourth ? { color: 'white' } : { color: '#5E8CD9' }
                  }
                  onMouseLeave={() => setFourth(false)}
                  to={`/dashboard/admin/products`}
                  className={
                    location.pathname.includes('products')
                      ? 'sideSelected'
                      : ''
                  }
                >
                  List des produits
                </Link>
                <Link
                  onMouseOver={() => setFifth(true)}
                  style={
                    fifth ? { color: 'white' } : { color: '#5E8CD9' }
                  }
                  onMouseLeave={() => setFifth(false)}
                  to={`/dashboard/admin/reports`}
                  className={
                    location.pathname.includes('reports')
                      ? 'sideSelected'
                      : ''
                  }
                >
                  Liste des reclamations
                </Link>
                <Link
                  onMouseOver={() => setEigth(true)}
                  style={
                    eigth
                      ? { color: 'white', alignSelf: 'flex-end' }
                      : { color: '#5E8CD9', alignSelf: 'flex-end' }
                  }
                  onMouseLeave={() => setEigth(false)}
                  to={`/dashboard/admin/categories`}
                  className={
                    location.pathname.endsWith('categories')
                      ? 'sideSelected'
                      : ''
                  }
                >
                  Liste des catégories
                </Link>
                <Link
                  onMouseOver={() => setSixth(true)}
                  style={
                    sixth ? { color: 'white' } : { color: '#5E8CD9' }
                  }
                  onMouseLeave={() => setSixth(false)}
                  to={`/dashboard/admin/update`}
                  className={
                    location.pathname.endsWith('update')
                      ? 'sideSelected'
                      : ''
                  }
                >
                  Gérer compte
                </Link>
              </div>
              <div
                className="logout"
                onMouseOver={() => setLast(true)}
                style={
                  last ? { color: 'white' } : { color: '#5E8CD9' }
                }
                onMouseLeave={() => setLast(false)}
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Déconnecté
              </div>
            </motion.div>
          )}
        </aside>
        <div className="dash-profile">
          <div className="notif">
            <p>profile</p>
            <div>
              <MdOutlineNotificationsNone className="icon" />
            </div>
            <span>1</span>
          </div>
          <div className="avatar">
            <div className="circle"></div>
            <h4>
              {user?.nom} {user?.prenom}
            </h4>
            <p>Admin</p>
          </div>
          <div className="stat">
            <p>Statistiques</p>
            <div className="ventes">
              <div className="ic-wrapper">
                <FiUser className="ic" />
              </div>
              <div className="nums">
                <p className="nbr">{userCount} utilisateurs</p>
                <p className="percent">+10% d'hier</p>
              </div>
            </div>
            <div className="com-total">
              <div className="ic-wrapper">
                <BiStoreAlt className="ic" />
              </div>
              <div className="nums">
                <p className="nbr">{magasinCount} magasins</p>
                <p className="percent">+10% d'hier</p>
              </div>
            </div>
            <div className="com-arr">
              <div className="ic-wrapper">
                <BsBag className="ic" />
              </div>
              <div className="nums">
                <p className="nbr">{productCount} produits</p>
                <p className="percent">+10% d'hier</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {user ? <Outlet context={{ user }} /> : null}
    </>
  );
};
export default DashAdminSides;
