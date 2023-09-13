import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { IoIosArrowDown } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';
const Products = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [rating, setRating] = useState('Evaluation');
  const [price, setPrice] = useState('Prix');
  const [dropdownPrice, setDropdownPrice] = useState('');
  const [dropdownRating, setDropdownRating] = useState('');
  const [filterByPrice, setFilterByPrice] =
    useState('most-expensive');
  const { category } = params;
  useEffect(() => {
    window.scrollTo({ top: true });
    axios
      .post(
        `${import.meta.env.VITE_SERVER_HOST}/api/produits/categorie`,
        {
          sous_CategorieId: category,
        }
      )
      .then((res) => {
        const productsWithAvgRating = res.data.map((product) => {
          const { Review } = product;
          const totalRating = Review.reduce(
            (sum, review) => sum + review.evaluation,
            0
          );
          const averageRating = totalRating / Review.length;
          if (isNaN(averageRating)) {
            return {
              ...product,
              averageRating: 0,
            };
          }
          return {
            ...product,
            averageRating,
          };
        });
        console.log(productsWithAvgRating);
        setProducts(productsWithAvgRating);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // Apply sorting and filtering
    let filtered = [...products];

    // Apply price filter
    if (filterByPrice === 'most-expensive') {
      filtered.sort((a, b) => b.prix - a.prix);
    } else if (filterByPrice === 'least-expensive') {
      filtered.sort((a, b) => a.prix - b.prix);
    }
    if (sortOrder === 'desc') {
      filtered.sort((a, b) => b.averageRating - a.averageRating);
    } else {
      filtered.sort((a, b) => a.averageRating - b.averageRating);
    }

    setFilteredProducts(filtered);
  }, [products, sortOrder, filterByPrice]);

  return (
    <>
      <main>
        <section>
          <div className="container">
            <div
              className="section-wrapper"
              style={{ border: 'none' }}
            >
              <div className="section-title">
                <div className="section-title-rectangle"></div>
                <p className="section-title-text">Catégorie</p>
              </div>
              <h1>{products[0]?.Sous_Categorie?.nom}</h1>
              <div style={{ display: 'flex', gap: '2em' }}>
                <div>
                  <div
                    className="dropdown"
                    style={{
                      zIndex: '5',
                      marginTop: '.5em',
                      width: '15vw',
                      minWidth: '120px',
                    }}
                  >
                    <button
                      style={{
                        marginBlock: '0',
                        borderColor: 'black',
                        color: 'black',
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        setDropdownRating((current) => !current);
                        // setErr('');
                      }}
                      className={
                        dropdownRating ? 'dropdown-open' : undefined
                      }
                    >
                      {rating}
                      <IoIosArrowDown
                        className={
                          !dropdownRating
                            ? 'arrow-down'
                            : 'arrow-down arrow-down-rotated'
                        }
                      />
                    </button>
                    <AnimatePresence>
                      {dropdownRating && (
                        <motion.ul
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="dropdown-methods"
                          style={{
                            color: 'black',
                            borderColor: 'black',
                          }}
                        >
                          <li
                            onClick={() => {
                              // setSousCategoires(
                              //   cate?.Sous_Categorie
                              // );
                              // setCategorieNom(cate.nom);
                              setSortOrder('desc');
                              setDropdownRating(false);
                              setRating('Les Plus Aimés');
                            }}
                          >
                            Les Plus Aimés
                          </li>
                          <li
                            onClick={() => {
                              // setSousCategoires(
                              //   cate?.Sous_Categorie
                              // );
                              // setCategorieNom(cate.nom);
                              // setCategorieId(cate.id);
                              setSortOrder('asc');
                              setDropdownRating(false);
                              setRating('Les Moins Aimés');
                            }}
                          >
                            Les Moins Aimés
                          </li>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div>
                  <div
                    className="dropdown"
                    style={{
                      zIndex: '5',
                      marginTop: '.5em',
                      width: '15vw',
                      minWidth: '120px',
                    }}
                  >
                    <button
                      style={{
                        marginBlock: '0',
                        borderColor: 'black',
                        color: 'black',
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        setDropdownPrice((current) => !current);
                        // setErr('');
                      }}
                      className={
                        dropdownPrice ? 'dropdown-open' : undefined
                      }
                    >
                      {price}
                      <IoIosArrowDown
                        className={
                          !dropdownPrice
                            ? 'arrow-down'
                            : 'arrow-down arrow-down-rotated'
                        }
                      />
                    </button>
                    <AnimatePresence>
                      {dropdownPrice && (
                        <motion.ul
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="dropdown-methods"
                          style={{
                            color: 'black',
                            borderColor: 'black',
                          }}
                        >
                          <li
                            onClick={() => {
                              // setSousCategoires(
                              //   cate?.Sous_Categorie
                              // );
                              // setCategorieNom(cate.nom);
                              // setCategorieId(cate.id);
                              setPrice('Plus Cher');
                              setFilterByPrice('most-expensive');
                              setDropdownPrice(false);
                            }}
                          >
                            Plus Cher
                          </li>
                          <li
                            onClick={() => {
                              // setSousCategoires(
                              //   cate?.Sous_Categorie
                              // );
                              // setCategorieNom(cate.nom);
                              // setCategorieId(cate.id);
                              setPrice('Moin Cher');
                              setFilterByPrice('least-expensive');
                              setDropdownPrice(false);
                            }}
                          >
                            Moin Cher
                          </li>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              <div className="products-wrapper-grid">
                {filteredProducts.map((product) => {
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

export default Products;
