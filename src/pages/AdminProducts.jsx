import { useOutletContext, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { IoIosArrowDown } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';
import DashProduct from '../components/DashProduct';
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineUnorderedList,
} from 'react-icons/ai';

const AdminProducts = () => {
  const [dropdownCata, setDropdownCata] = useState(false);
  const [dropdownDate, setDropdownDate] = useState(false);
  const [categorieNom, setCategorieNom] = useState('Toutes');
  const [categorieId, setCategorieId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [counter, setCounter] = useState();
  const [page, setPage] = useState();
  const [nom, setNom] = useState();
  const [total, setTotal] = useState();
  const [sort, setSort] = useState('Le plus récent');
  const [products, setProducts] = useState([]);
  const [prixOrder, setPrixOrder] = useState(false);
  const [dateOrder, setDateOrder] = useState('desc');
  const [quantityOrder, setQuantityOrder] = useState(false);
  const [err, setErr] = useState();
  useEffect(() => {
    axios
      .post(
        `https://mystorify-api.cyclic.app/api/produits/dash/admin/`,
        {
          prixOrder,
          dateOrder,
          quantityOrder,
          categorieId,
          nom,
        }
      )
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.total);
        setCounter(res.data.products.length);
        setPage(1);
        setErr('');
      })
      .catch((err) => {
        console.log(err);
        setErr(err.response.data.message);
      });
  }, [prixOrder, dateOrder, quantityOrder, categorieId, nom]);
  useEffect(() => {
    axios
      .get(`https://mystorify-api.cyclic.app/api/categories/`)
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const getNext = (take, skip, last) => {
    axios
      .post(
        `https://mystorify-api.cyclic.app/api/produits/admin/paged/`,
        {
          take,
          skip,
          prixOrder,
          dateOrder,
          quantityOrder,
          categorieId,
          nom,
        }
      )
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
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
        `https://mystorify-api.cyclic.app/api/produits/admin/paged/`,
        {
          take,
          skip,
          prixOrder,
          dateOrder,
          quantityOrder,
          categorieId,
          nom,
        }
      )
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
        setCounter((current) => current - products.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="dash-content dash-products">
        <div className="head">
          <h2>List des produits</h2>
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
              to={`/dashboard/admin/codesPromos`}
              style={{ color: 'white' }}
            >
              Ajouter code promo
            </Link>
          </button>
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
                        setPrixOrder(false);
                        setQuantityOrder(false);
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
                        setPrixOrder(false);
                        setQuantityOrder(false);
                        setDropdownDate(false);
                      }}
                    >
                      Le plus ancient
                    </li>
                    <li
                      onClick={() => {
                        setDateOrder(false);
                        setPrixOrder('desc');
                        setSort('Le plus cher');
                        setQuantityOrder(false);
                        setDropdownDate(false);
                      }}
                    >
                      Le plus cher
                    </li>
                    <li
                      onClick={() => {
                        setDateOrder(false);
                        setPrixOrder('asc');
                        setSort('Le moins cher');
                        setQuantityOrder(false);
                        setDropdownDate(false);
                      }}
                    >
                      Le moins cher
                    </li>
                    <li
                      onClick={() => {
                        setDateOrder(false);
                        setPrixOrder(false);
                        setSort('La plus grande quantité');
                        setQuantityOrder('desc');
                        setDropdownDate(false);
                      }}
                    >
                      La plus grande quantité
                    </li>
                    <li
                      onClick={() => {
                        setDateOrder(false);
                        setPrixOrder(false);
                        setSort('La plus petite quantité');
                        setQuantityOrder('asc');
                        setDropdownDate(false);
                      }}
                    >
                      La plus petite quantité
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
              {categories && (
                <AnimatePresence>
                  {dropdownCata && (
                    <motion.ul
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="dropdown-methods"
                      style={{
                        maxHeight: '25vh',
                        overflow: 'scroll',
                      }}
                    >
                      {categories.map((categorie) => {
                        return categorie.Sous_Categorie.map(
                          (cate) => {
                            console.log(cate.nom);
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
                          }
                        );
                      })}

                      <li
                        onClick={() => {
                          setCategorieNom('Toutes');
                          setCategorieId(false);
                          setDropdownCata(false);
                        }}
                      >
                        Touts
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              )}
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
            <li>Nom du produit</li>
            <li
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '.5em',
              }}
            >
              Prix
            </li>
            <li
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '.5em',
              }}
            >
              Quantité
            </li>
            <li>Catégorie</li>
          </ul>
        </div>
        {!err && (
          <div className="dash-products-wrapper">
            {total === 0 && <p>il y a pas des produits</p>}
            {products &&
              products.map((product) => {
                return (
                  <DashProduct
                    product={product}
                    link={`/dashboard/admin/products/${product.id}`}
                  />
                );
              })}
          </div>
        )}
        {!err && (
          <div className="pages">
            <p className="number">
              {counter} de {total} produits
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
                            counter - products.length - 10,
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
export default AdminProducts;
