import { useOutletContext, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { IoIosArrowDown } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';
import DashUser from '../../components/DashUser';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const UsersList = () => {
  const { magasin } = useOutletContext();
  const [dropdownCata, setDropdownCata] = useState(false);
  const [dropdownDate, setDropdownDate] = useState(false);
  const [counter, setCounter] = useState();
  const [page, setPage] = useState();
  const [nom, setNom] = useState('');
  const [total, setTotal] = useState();
  const [sort, setSort] = useState('Le plus récent');
  const [users, setUsers] = useState([]);
  const [prixOrder, setPrixOrder] = useState(false);
  const [dateOrder, setDateOrder] = useState('desc');
  const [filter, setFilter] = useState('Toutes');
  const [hasStore, setHasStore] = useState('all');
  const [livreur, setLivreur] = useState(false);
  const [err, setErr] = useState();
  useEffect(() => {
    axios
      .post(
        `https://mystorify-api.cyclic.app/api/users/dash/admin/`,
        {
          dateOrder,
          nom,
          hasStore,
          livreur,
        }
      )
      .then((res) => {
        setUsers(res.data.users);
        setTotal(res.data.total);
        setCounter(res.data.users.length);
        console.log(res.data);
        setPage(1);
        console.log(res.data);
        console.log(res.data.total);
        setErr('');
      })
      .catch((err) => {
        console.log(err);
        setErr(err.response.data.message);
      });
  }, [dateOrder, nom, hasStore, livreur]);
  const getNext = (take, skip, last) => {
    axios
      .post(
        `https://mystorify-api.cyclic.app/api/produits/paged/${magasin.id}`,
        {
          take,
          skip,
          hasStore,
          dateOrder,
          nom,
        }
      )
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
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
        `https://mystorify-api.cyclic.app/api/users/admin/paged`,
        {
          take,
          skip,
          hasStore,
          dateOrder,
          nom,
        }
      )
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
        setCounter((current) => current - users.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="dash-content dash-products">
        <div className="head">
          <h2>List des Utilisateurs</h2>
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
              to={`/dashboard/admin/users/add`}
              style={{ color: 'white' }}
            >
              Ajouter Utilisateur
            </Link>
          </button>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label>Trier par </label>
            <div className="dropdown" style={{ zIndex: '5' }}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownDate((current) => !current);
                }}
                className={dropdownDate ? 'dropdown-open' : undefined}
              >
                {sort}
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
                        setDateOrder('desc');
                        setSort('Le plus récent');
                        setDropdownDate(false);
                      }}
                    >
                      Le plus récent
                    </li>
                    <li
                      onClick={() => {
                        setDateOrder('asc');
                        setSort('Le plus ancient');
                        setDropdownDate(false);
                      }}
                    >
                      Le plus ancient
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div>
            <label style={{}}>Filtrer par </label>
            <div
              className="dropdown"
              style={{ zIndex: '5', marginBlock: '0' }}
            >
              <button
                style={{ marginBlock: '0' }}
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownCata((current) => !current);
                }}
                className={dropdownCata ? 'dropdown-open' : undefined}
              >
                {filter}
                <IoIosArrowDown
                  className={
                    !dropdownCata
                      ? 'arrow-down'
                      : 'arrow-down arrow-down-rotated'
                  }
                />
              </button>
              <AnimatePresence>
                {dropdownCata && (
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="dropdown-methods"
                  >
                    <li
                      onClick={() => {
                        setFilter('Porprietaire');
                        setHasStore(true);
                        setDropdownCata(false);
                        setLivreur(false);
                      }}
                    >
                      Propriétaire
                    </li>
                    <li
                      onClick={() => {
                        setDropdownCata(false);
                        setFilter('Non-Porprietaire');
                        setHasStore(false);
                        setLivreur(false);
                      }}
                    >
                      Non-Propriétaire
                    </li>
                    <li
                      onClick={() => {
                        setDropdownCata(false);
                        setLivreur(true);
                        setFilter('Livreur');
                        setHasStore(false);
                      }}
                    >
                      Livreur
                    </li>

                    <li
                      onClick={() => {
                        setHasStore('all');
                        setFilter('Toutes');
                        setDropdownCata(false);
                        setLivreur(false);
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
          <ul className="cols head">
            <li>Nom </li>
            <li
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '.5em',
              }}
            >
              Prénom
            </li>
            <li
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '.5em',
              }}
            >
              Adresse
            </li>
            <li>Wilaya</li>
            <li>Télephone</li>
          </ul>
        </div>
        {!err && (
          <div className="dash-products-wrapper">
            {users &&
              users.map((user) => {
                return <DashUser user={user} />;
              })}
          </div>
        )}
        {!err && (
          <div className="pages">
            <p className="number">
              {counter} de {total} utilisateurs
            </p>

            <div>
              {total > 10 && (
                <>
                  {counter > 10 && (
                    <>
                      <AiOutlineLeft
                        className="arrow"
                        onClick={() => {
                          getPrev(
                            10,
                            counter - users.length - 10,
                            false
                          );
                          setPage((current) => --current);
                        }}
                      />
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
export default UsersList;
