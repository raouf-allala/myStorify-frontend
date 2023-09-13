import { MdOutlineSettings } from 'react-icons/md';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import {
  MdOutlineNotificationsNone,
  MdOutlineSpaceDashboard,
} from 'react-icons/md';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { AiOutlineFileText } from 'react-icons/ai';
import { BsTruck, BsBag } from 'react-icons/bs';
import { TfiStatsUp } from 'react-icons/tfi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
const DashMagasinSides = () => {
  const { magasinId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(magasinId);
  const user = useSelector((state) => state.auth.user);
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [fourth, setFourth] = useState(false);
  const [fifth, setFifth] = useState(false);
  const [last, setLast] = useState(false);
  const [magasin, setMagasin] = useState('');
  const [showSide, setShowSide] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [totalProduit, setTotalProduit] = useState(1);
  const [totalCommande, setTotalCommande] = useState(0);
  useEffect(() => {
    if (!magasinId) {
      navigate('/');
    } else {
      axios
        .get(
          `${
            import.meta.env.VITE_SERVER_HOST
          }/api/magasins/user/valide/${magasinId}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);
          setMagasin(res.data);
          console.log(magasin);
        })
        .catch((err) => {
          console.log(err.response.status);
          if (
            err.response.status === 401 ||
            err.response.status === 404
          ) {
            navigate('/');
          }
        });
    }
    axios
      .get(
        `${
          import.meta.env.VITE_SERVER_HOST
        }/api/produits/dashTop/${magasinId}`
      )
      .then((res) => {
        console.log(res.data);
        setTotalCommande(0);
        setTotalProduit(res.data.length);
        res.data.forEach((product) => {
          setTotalCommande(
            (current) => current + product._count.Commande_Produit
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
            <div className="links icons ">
              <Link
                onMouseOver={() => setFirst(true)}
                className={
                  location.pathname.endsWith(`${magasin.id}`)
                    ? 'sideSelected'
                    : ''
                }
                style={
                  first ? { color: 'white' } : { color: '#5E8CD9' }
                }
                onMouseLeave={() => setFirst(false)}
                to={`/dashboard/magasin/${magasin.id}`}
              >
                <TfiStatsUp className="dash-icon" />
              </Link>
              <Link
                onMouseOver={() => setSecond(true)}
                style={
                  second ? { color: 'white' } : { color: '#5E8CD9' }
                }
                onMouseLeave={() => setSecond(false)}
                to={`/dashboard/magasin/${magasin.id}/products`}
                className={
                  location.pathname.includes('products')
                    ? 'sideSelected'
                    : ''
                }
                onClick={console.log(location.path)}
              >
                <BsBag className="dash-icon" />
              </Link>
              <Link
                onMouseOver={() => setThird(true)}
                style={
                  third ? { color: 'white' } : { color: '#5E8CD9' }
                }
                onMouseLeave={() => setThird(false)}
                to={`/dashboard/magasin/${magasin.id}/update`}
                className={
                  location.pathname.endsWith('update')
                    ? 'sideSelected'
                    : ''
                }
              >
                <MdOutlineSettings className="dash-icon" />
              </Link>
              <Link
                onMouseOver={() => setFourth(true)}
                style={
                  fourth ? { color: 'white' } : { color: '#5E8CD9' }
                }
                onMouseLeave={() => setFourth(false)}
                to={`/dashboard/magasin/${magasin.id}/commandes`}
                className={
                  location.pathname.endsWith('commandes')
                    ? 'sideSelected'
                    : ''
                }
              >
                <BsTruck className="dash-icon" />
              </Link>
            </div>
            <div
              className="logout"
              onMouseOver={() => setLast(true)}
              style={last ? { color: 'white' } : { color: '#5E8CD9' }}
              onMouseLeave={() => setLast(false)}
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
              <div className="links text">
                <Link
                  onMouseOver={() => setFirst(true)}
                  style={
                    first ? { color: 'white' } : { color: '#5E8CD9' }
                  }
                  onMouseLeave={() => setFirst(false)}
                  to={`/dashboard/magasin/${magasin.id}`}
                  className={
                    location.pathname.endsWith(`${magasin.id}`)
                      ? 'sideSelected'
                      : ''
                  }
                >
                  Statistique
                </Link>
                <Link
                  onMouseOver={() => setSecond(true)}
                  style={
                    second ? { color: 'white' } : { color: '#5E8CD9' }
                  }
                  onMouseLeave={() => setSecond(false)}
                  to={`/dashboard/magasin/${magasin.id}/products`}
                  className={
                    location.pathname.includes('products')
                      ? 'sideSelected'
                      : ''
                  }
                >
                  List des produits
                </Link>
                <Link
                  onMouseOver={() => setThird(true)}
                  style={
                    third ? { color: 'white' } : { color: '#5E8CD9' }
                  }
                  onMouseLeave={() => setThird(false)}
                  to={`/dashboard/magasin/${magasin.id}/update`}
                  className={
                    location.pathname.endsWith('update')
                      ? 'sideSelected'
                      : ''
                  }
                >
                  Gérer magasin
                </Link>
                <Link
                  onMouseOver={() => setFourth(true)}
                  style={
                    fourth ? { color: 'white' } : { color: '#5E8CD9' }
                  }
                  onMouseLeave={() => setFourth(false)}
                  to={`/dashboard/magasin/${magasin.id}/commandes`}
                  className={
                    location.pathname.endsWith('commandes')
                      ? 'sideSelected'
                      : ''
                  }
                >
                  Liste des commandes
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
                  navigate('/');
                }}
              >
                Acceuil
              </div>
            </motion.div>
          )}
        </aside>
        <div className="dash-profile">
          <div className="notif">
            <p>Magsin</p>
            <div>
              <MdOutlineNotificationsNone className="icon" />
            </div>
            <span>1</span>
          </div>
          <div className="avatar">
            {magasin?.logo ? (
              <div className="img">
                <img src={magasin?.logo} alt="" />{' '}
              </div>
            ) : (
              <div className="circle"></div>
            )}

            <h4>{magasin?.nom}</h4>
            <p>Magsin</p>
          </div>
          <div className="stat">
            <p>Résume</p>
            <div className="ventes">
              <div className="ic-wrapper">
                <FaRegMoneyBillAlt className="ic" />
              </div>
              <div className="nums">
                <p className="nbr">{totalCommande} ventes totales</p>
                <p className="percent">+10% d'hier</p>
              </div>
            </div>
            <div className="com-total">
              <div className="ic-wrapper">
                <AiOutlineFileText className="ic" />
              </div>
              <div className="nums">
                <p className="nbr">
                  {totalCommande} commandes totales
                </p>
                <p className="percent">+10% d'hier</p>
              </div>
            </div>
            <div className="com-arr">
              <div className="ic-wrapper">
                <BsTruck className="ic" />
              </div>
              <div className="nums">
                <p className="nbr">{totalProduit} produits</p>
                <p className="percent">+10% d'hier</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {magasin ? <Outlet context={{ magasin }} /> : null}
    </>
  );
};
export default DashMagasinSides;
