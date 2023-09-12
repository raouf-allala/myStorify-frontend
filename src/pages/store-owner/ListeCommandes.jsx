import { useOutletContext, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { IoIosArrowDown } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';

import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineUnorderedList,
} from 'react-icons/ai';
import DashCommande from '../../components/DashCommande';

const ListeCommandes = () => {
  const { magasin } = useOutletContext();
  const [dropdownCata, setDropdownCata] = useState(false);
  const [dropdownDate, setDropdownDate] = useState(false);
  const [counter, setCounter] = useState();
  const [page, setPage] = useState();
  const [nom, setNom] = useState();
  const [total, setTotal] = useState(0);
  const [etat, setEtat] = useState(false);
  const [etatNom, setEtatNom] = useState('Toutes');
  const [commandes, setCommandes] = useState([]);
  const [dateOrder, setDateOrder] = useState('desc');
  const [quantityOrder, setQuantityOrder] = useState(false);
  const [err, setErr] = useState();
  useEffect(() => {
    axios
      .post(
        `https://mystorify-api.cyclic.app/api/achat/magasin/${magasin.id}`,
        {
          etat,
        }
      )
      .then((res) => {
        console.log(res.data);

        setCommandes(res.data);
        setTotal(res.data.length);
        setCounter(res.data.length);
        setPage(1);

        setErr('');
      })
      .catch((err) => {
        console.log(err);
        setErr(err.response.data.message);
      });
  }, [etat]);
  const getNext = (take, skip, last) => {
    axios
      .post(
        `https://mystorify-api.cyclic.app/api/achat/paged/${magasin.id}`,
        {
          take,
          skip,
          dateOrder,
          quantityOrder,
          nom,
        }
      )
      .then((res) => {
        console.log(res.data);
        setCommandes(res.data);
        if (!last) setCounter((current) => current + res.data.length);
        setErr('');
      })
      .catch((err) => {
        console.log(err);
        setErr(err.response.data.message);
      });
  };
  const getPrev = (take, skip, last) => {
    axios
      .post(
        `https://mystorify-api.cyclic.app/api/achat/paged/${magasin.id}`,
        {
          take,
          skip,
          dateOrder,
          quantityOrder,
          nom,
        }
      )
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
        setCounter((current) => current - commandes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="dash-content dash-products">
        <div className="head">
          <h2>List des commandes</h2>
        </div>
        <div
          className="form-flex"
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1em',
          }}
        >
          <button className="btn">
            <Link
              to={`/dashboard/magasin/${magasin.id}/products/add`}
              style={{ color: 'white' }}
            >
              Ajouter un produit
            </Link>
          </button>
          <div></div>
          <div>
            <label style={{}}>Filtrer par </label>
            <div className="dropdown" style={{ zIndex: '5' }}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownDate((current) => !current);
                }}
                className={dropdownDate ? 'dropdown-open' : undefined}
              >
                {etatNom}
                <IoIosArrowDown
                  className={
                    !dropdownDate
                      ? 'arrow-down'
                      : 'arrow-down arrow-down-rotated'
                  }
                />
              </button>
              <AnimatePresence>
                {dropdownDate && (
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="dropdown-methods"
                  >
                    <li
                      onClick={() => {
                        setEtatNom('Livré');
                        setEtat('livré');
                        setDropdownDate(false);
                      }}
                    >
                      Livré
                    </li>
                    <li
                      onClick={() => {
                        setEtatNom('Non-livré');
                        setEtat('non-livré');
                        setDropdownDate(false);
                      }}
                    >
                      Non-livré
                    </li>
                    <li
                      onClick={() => {
                        setEtatNom('Toutes');
                        setEtat(false);
                        setDropdownDate(false);
                      }}
                    >
                      Toutes
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="search-input-holder">
            <FiSearch className="search-icon" color="#3B4C68" />
            <input
              type="text"
              className="search-input"
              onChange={(e) => {
                setNom(e.target.value);
              }}
            />
          </div>
        </div>

        <div
          className="list"
          style={{
            paddingRight: '2em',
            marginTop: '3em',
            borderBottom: 'solid 1px #B7C1D1',
            paddingBottom: '.7em',
          }}
        >
          <ul className="head magasins fourheaders">
            <li>Prodiut</li>
            <li>Client</li>
            <li>Quantité</li>
            <li>Etat</li>
          </ul>
        </div>
        {!err && (
          <div className="dash-products-wrapper">
            {commandes &&
              commandes.map((commande) => {
                return (
                  <DashCommande
                    commande={commande}
                    link={`/dashboard/magasin/${magasin.id}/commandes/${commande.id}`}
                  />
                );
              })}
          </div>
        )}
        {!err && (
          <div className="pages">
            <p className="number">
              {counter} de {total} magasins
            </p>

            <div>
              {total > 10 && (
                <>
                  {counter > 10 && (
                    <>
                      <AiOutlineLeft className="arrow" />
                    </>
                  )}
                  {page <= Math.ceil(total / 10) && (
                    <span
                      className="number"
                      style={
                        page === 1
                          ? { color: '#2E47BD' }
                          : { color: '#3B4C68' }
                      }
                      onClick={() => {
                        getNext(10, 0, false);
                        setCounter(0);
                        setPage(1);
                      }}
                    >
                      1
                    </span>
                  )}
                  {page > 1 && (
                    <span
                      className="number"
                      style={{ color: '#2E47BD' }}
                    >
                      ... {page}
                    </span>
                  )}
                  {page < Math.ceil(total / 10) && (
                    <span
                      className="number"
                      onClick={() => {
                        console.log(total);
                        if (total % 10 === 0)
                          getNext(10, total - 10, true);
                        else getNext(10, total - (total % 10), true);
                        setCounter(total);
                        setPage(Math.ceil(total / 10));
                      }}
                    >
                      ... {Math.ceil(total / 10)}
                    </span>
                  )}
                  {counter < total && (
                    <AiOutlineRight
                      className="arrow"
                      onClick={() => {
                        getNext(10, counter, false);
                        setPage((current) => ++current);
                        console.log(counter);
                      }}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        )}
        {err && (
          <h3
            style={{
              textAlign: 'center',
              color: '#3B4C68',
              marginTop: '3em',
            }}
          >
            {err}
          </h3>
        )}
      </div>
    </>
  );
};
export default ListeCommandes;
