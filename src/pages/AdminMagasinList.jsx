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
import DashMagasin from '../components/DashMagasin';

const AdminMagasinList = () => {
  const [categories, setCategories] = useState([]);
  const [dropdownCata, setDropdownCata] = useState(false);
  const [dropdownDate, setDropdownDate] = useState(false);
  const [dropdownType, setDropdownType] = useState(false);
  const [etat, setEtat] = useState('Non-validé');
  const [categorieNom, setCategorieNom] = useState('Toutes');
  const [categorieId, setCategorieId] = useState(null);
  const [counter, setCounter] = useState();
  const [page, setPage] = useState();
  const [nom, setNom] = useState();
  const [total, setTotal] = useState();
  const [sort, setSort] = useState('Le plus récent');
  const [magasins, setMagasins] = useState([]);
  const [valide, setValide] = useState('non-validé');
  const [dateOrder, setDateOrder] = useState('desc');
  const [err, setErr] = useState();
  useEffect(() => {
    axios
      .get(`https://mystorify-api.cyclic.app/api/categories/`)
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .post(`https://mystorify-api.cyclic.app/api/magasins/dash`, {
        dateOrder,
        categorieId,
        nom,
        valide,
      })
      .then((res) => {
        console.log(res.data);
        setMagasins(res.data.magasins);
        setTotal(res.data.total);
        setCounter(res.data.magasins.length);
        setPage(1);

        console.log(categorieId);
        console.log(res.data.total);
        setErr('');
      })
      .catch((err) => {
        console.log(err);
        setErr(err.response.data.message);
      });
  }, [dateOrder, categorieId, nom, valide]);
  const getNext = (take, skip, last) => {
    axios
      .post(`https://mystorify-api.cyclic.app/api/magasins/paged/`, {
        take,
        skip,
        dateOrder,
        categorieId,
        nom,
      })
      .then((res) => {
        console.log(res.data);
        setMagasins(res.data);
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
      .post(`https://mystorify-api.cyclic.app/api/magasins/paged/`, {
        take,
        skip,
        dateOrder,
        categorieId,
        nom,
      })
      .then((res) => {
        console.log(res.data);
        setMagasins(res.data);
        setCounter((current) => current - magasins.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="dash-content dash-products">
        <div className="head">
          <h2>Liste des Magasins</h2>
        </div>
        <div
          className="form-flex"
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1em',
          }}
        >
          <div>
            <label style={{}}>Etat </label>
            <div className="dropdown" style={{ zIndex: '5' }}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownType((current) => !current);
                }}
                className={dropdownType ? 'dropdown-open' : undefined}
              >
                {etat}
                <IoIosArrowDown
                  className={
                    !dropdownType
                      ? 'arrow-down'
                      : 'arrow-down arrow-down-rotated'
                  }
                />
              </button>
              <AnimatePresence>
                {dropdownType && (
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="dropdown-methods"
                  >
                    <li
                      onClick={() => {
                        setValide('validé');
                        setEtat('Validé');
                        setDropdownType(false);
                      }}
                    >
                      Validé
                    </li>
                    <li
                      onClick={() => {
                        setValide('non-validé');
                        setEtat('Non-Validé');
                        setDropdownType(false);
                      }}
                    >
                      Non-Validé
                    </li>
                    <li
                      onClick={() => {
                        setValide(null);
                        setEtat('Toutes');
                        setCategorieId(false);
                        setDropdownType(false);
                      }}
                    >
                      Touts
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div>
            <label style={{}}>Trier par </label>
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
            <label style={{}}>Catégorie </label>
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
                {categorieNom}
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
                    {categories?.map((cate) => {
                      return (
                        <li
                          onClick={() => {
                            setCategorieNom(cate.nom);
                            setCategorieId(cate.id);
                            setDropdownCata(false);
                          }}
                        >
                          {cate.nom}
                        </li>
                      );
                    })}
                    <li
                      onClick={() => {
                        setCategorieNom('Touts');
                        setCategorieId(false);
                        setDropdownCata(false);
                      }}
                    >
                      Touts
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
          <ul className=" head magasins">
            <li>Nom du Magasin</li>
            <li>Propriétaire</li>
            <li>Catégorie</li>
          </ul>
        </div>
        {!err && (
          <div className="dash-products-wrapper">
            {magasins &&
              magasins.map((magasin) => {
                return (
                  <DashMagasin
                    magasin={magasin}
                    magasinId={magasin.id}
                    link={`/dashboard/admin/magasins/${magasin.id}`}
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
                      <AiOutlineLeft
                        className="arrow"
                        onClick={() => {
                          getPrev(
                            10,
                            counter - magasins.length - 10,
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
export default AdminMagasinList;
