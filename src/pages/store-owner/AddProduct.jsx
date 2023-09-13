import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useRef, useEffect, memo } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { RxCross1 } from 'react-icons/rx';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const AddProduct = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { magasin } = useOutletContext();
  console.log(magasin);
  //const [magasin, setMagasin] = useState();
  const [dropdownCata, setDropdownCata] = useState(false);
  const [dropdownDepot, setDropdownDepot] = useState(false);
  const [depotId, setDepotId] = useState(magasin?.Depot[0]?.id);
  const [depotNom, setDepotNom] = useState();
  const [sousCate, setSousCate] = useState([]);
  const [categorieId, setCategorieId] = useState();
  const [categorieNom, setCategorieNom] = useState();
  const [nom, setNom] = useState('');
  const [desc, setDesc] = useState('');
  const [prix, setPrix] = useState();
  const [quantity, setQuantity] = useState();
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [image4, setImage4] = useState();
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [empty, setEmpty] = useState([
    'nom',
    'desc',
    'quantity',
    'prix',
  ]);

  useEffect(() => {
    setSousCate(magasin?.Categorie?.Sous_Categorie);
    setCategorieId(sousCate[0]?.id);
    setCategorieNom(sousCate[0]?.nom);
    setDepotNom(magasin?.Depot[0]?.nom);
  }, [sousCate]);
  useEffect(() => {
    if (image1 || image2 || image3 || image4) {
      setErr(false);
    } else {
      setErr(true);
    }
  }, [image1, image2, image3, image4]);

  const handleErr = (e) => {
    if (e.target.value.trim() === '') {
      setEmpty((current) => [...current, e.target.id]);
    }
    if (empty.length !== 0 && e.target.value.trim() !== '') {
      if (empty.indexOf(e.target.id) > -1) {
        empty.splice(empty.indexOf(e.target.id), 1);
        console.log(e.target.id);
        e.target.style.borderColor = '';
      }
    }
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!image1 && !image2 && !image3 && !image4) {
      setErr(true);
    }
    empty.forEach((id) => {
      const input = document.getElementById(id);
      console.log(input);
      input.style.borderColor = '#ed4337';
    });
  };

  const handleReset = () => {
    setNom('');
    setDesc('');
    setPrix('');
    setQuantity('');
    setEmpty([]);
    setImage1('');
    setImage2('');
    setImage3('');
    setImage4('');
    setErr(false);
    setDropdownCata(false);
    setDropdownDepot(false);
    empty.forEach((id) => {
      const input = document.getElementById(id);
      console.log(input);
      input.style.borderColor = '';
    });
  };

  const handleImage1Upload = (e) => {
    const file = e.target.files[0];
    TransformImage1(file);
  };
  const TransformImage1 = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage1(reader.result);
      };
    } else {
      setImage1('');
    }
  };
  const handleImage2Upload = (e) => {
    const file = e.target.files[0];
    TransformImage2(file);
  };
  const TransformImage2 = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage2(reader.result);
      };
    } else {
      setImage2('');
    }
  };
  const handleImage3Upload = (e) => {
    const file = e.target.files[0];
    TransformImage3(file);
  };
  const TransformImage3 = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage3(reader.result);
      };
    } else {
      setImage3('');
    }
  };
  const handleImage4Upload = (e) => {
    const file = e.target.files[0];
    TransformImage4(file);
  };
  const TransformImage4 = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage4(reader.result);
      };
    } else {
      setImage4('');
    }
  };
  const handleSubmit = () => {
    setIsLoading(true);
    const magasinId = magasin.id;
    const produit = {
      nom,
      description: desc,
      prix,
      quantity,
      magasinId,
      depotId,
      categorieId,
      image1,
      image2,
      image3,
      image4,
    };
    console.log(produit);
    axios
      .post(
        `${import.meta.env.VITE_SERVER_HOST}/api/produits/`,
        produit
      )
      .then((res) => {
        console.log(res);
        navigate(`/dashboard/magasin/${magasin.id}/products`);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  return (
    <div className="dash-content">
      <div className="head">
        <h2>Ajouter un produit</h2>
      </div>
      <div className="edit-profile">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="form-flex">
            <div>
              <label>Nom du produit </label>
              <input
                id="nom"
                type="text"
                value={nom}
                onChange={(e) => {
                  setNom(e.target.value);
                  handleErr(e);
                }}
              />
            </div>
          </div>
          <div className="form-flex">
            <div>
              <label>Description </label>
              <textarea
                id="desc"
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                  handleErr(e);
                }}
                style={{ height: '15vh' }}
              ></textarea>
            </div>
          </div>
          <div className="form-flex">
            <div>
              <label>Prix </label>
              <input
                id="prix"
                value={prix}
                onChange={(e) => {
                  setPrix(e.target.value);
                  handleErr(e);
                }}
              />
            </div>
            <div>
              <label>Quantité </label>
              <input
                id="quantity"
                value={quantity}
                type="text"
                onChange={(e) => {
                  setQuantity(e.target.value);
                  handleErr(e);
                }}
              />
            </div>
          </div>
          <div className="form-flex">
            <div>
              <label>Dépot </label>
              <div
                className="dropdown"
                style={{ zIndex: '3', marginTop: '.5em' }}
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setDropdownDepot((current) => !current);
                  }}
                  className={
                    dropdownDepot ? 'dropdown-open' : undefined
                  }
                >
                  {depotNom}
                  <IoIosArrowDown
                    className={
                      !dropdownDepot
                        ? 'arrow-down'
                        : 'arrow-down arrow-down-rotated'
                    }
                  />
                </button>
                <AnimatePresence>
                  {dropdownDepot && (
                    <motion.ul
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="dropdown-methods"
                    >
                      {magasin.Depot.map((depot) => {
                        return (
                          <li
                            onClick={() => {
                              setDepotId(depot.id);
                              setDepotNom(depot.nom);
                              setDropdownDepot(false);
                            }}
                          >
                            {depot.nom}
                          </li>
                        );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div>
              <label>Catégorie</label>
              <div
                className="dropdown"
                style={{ zIndex: '5', marginTop: '.5em' }}
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setDropdownCata((current) => !current);
                  }}
                  className={
                    dropdownCata ? 'dropdown-open' : undefined
                  }
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
                      {sousCate &&
                        sousCate.map((cate) => {
                          return (
                            <li
                              onClick={() => {
                                setCategorieId(cate.id);
                                setCategorieNom(cate.nom);
                                console.log(cate.id);
                                setDropdownCata(false);
                                console.log(categorieId);
                              }}
                            >
                              {cate.nom}
                            </li>
                          );
                        })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div
            className="add-product-images"
            style={{ marginBottom: '1.5em' }}
          >
            <label>Images </label>
            {err && (
              <p className="err" style={{ marginTop: '.5em' }}>
                Insérer au minimum une photo !
              </p>
            )}
            <div
              className="add-product-images-container"
              style={{ marginTop: '1em' }}
            >
              {image1 && (
                <div className="add-product-image">
                  <div className="add-product-image-preview">
                    <img src={image1} alt="Product Image" />
                    <button
                      className="add-product-image-delete"
                      onClick={() => {
                        setImage1('');
                      }}
                    >
                      <RxCross1 className="icon" size={17} />
                    </button>
                  </div>
                </div>
              )}
              {image2 && (
                <div className="add-product-image">
                  <div className="add-product-image-preview">
                    <img src={image2} alt="Product Image" />
                    <button
                      className="add-product-image-delete"
                      onClick={() => {
                        setImage2('');
                      }}
                    >
                      <RxCross1 className="icon" size={17} />
                    </button>
                  </div>
                </div>
              )}
              {image3 && (
                <div className="add-product-image">
                  <div className="add-product-image-preview">
                    <img src={image3} alt="Product Image" />
                    <button
                      className="add-product-image-delete"
                      onClick={() => {
                        setImage3('');
                      }}
                    >
                      <RxCross1 className="icon" size={17} />
                    </button>
                  </div>
                </div>
              )}
              {image4 && (
                <div className="add-product-image">
                  <div className="add-product-image-preview">
                    <img src={image4} alt="Product Image" />
                    <button
                      className="add-product-image-delete"
                      onClick={() => {
                        setImage4('');
                      }}
                    >
                      <RxCross1 className="icon" size={17} />
                    </button>
                  </div>
                </div>
              )}
              {!image1 && (
                <div className="add-product-image">
                  <div
                    className="add-product-image-overlay"
                    onClick={() => {
                      inputRef.current.click();
                    }}
                  >
                    <span className="add-product-image-overlay-icon">
                      +
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    style={{ display: 'none' }}
                    onChange={handleImage1Upload}
                  />
                </div>
              )}
              {image1 && !image2 && (
                <div className="add-product-image">
                  <div
                    className="add-product-image-overlay"
                    onClick={() => {
                      inputRef.current.click();
                    }}
                  >
                    <span className="add-product-image-overlay-icon">
                      +
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    style={{ display: 'none' }}
                    onChange={handleImage2Upload}
                  />
                </div>
              )}
              {image2 && !image3 && (
                <div className="add-product-image">
                  <div
                    className="add-product-image-overlay"
                    onClick={() => {
                      inputRef.current.click();
                    }}
                  >
                    <span className="add-product-image-overlay-icon">
                      +
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    style={{ display: 'none' }}
                    onChange={handleImage3Upload}
                  />
                </div>
              )}
              {image3 && !image4 && (
                <div className="add-product-image">
                  <div
                    className="add-product-image-overlay"
                    onClick={() => {
                      inputRef.current.click();
                    }}
                  >
                    <span className="add-product-image-overlay-icon">
                      +
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    style={{ display: 'none' }}
                    onChange={handleImage4Upload}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="btns">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleReset();
              }}
              className="btn btn-sec"
            >
              Réinitialiser
            </button>
            {!isLoading ? (
              <button
                className="btn"
                onClick={(e) => {
                  handleOnSubmit(e);
                  if (empty.length === 0 && !err) {
                    handleSubmit();
                  }
                }}
              >
                Sauvgarder
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="btn"
              >
                <Spinner />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
