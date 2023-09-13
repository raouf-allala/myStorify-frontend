import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { BiStoreAlt } from 'react-icons/bi';

import { RxCross1 } from 'react-icons/rx';
import { IoIosArrowDown } from 'react-icons/io';
import { BsTruck, BsBag } from 'react-icons/bs';
import Spinner from '../../components/Spinner';
import Successs from '../../components/Success';

const DemandeMagasin = () => {
  const inputRefLogo = useRef(null);
  const inputRefRegistre = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const [desc, setDesc] = useState('');
  const [empty, setEmpty] = useState(['desc', 'nom']);
  const [done, setDone] = useState(false);
  const [registre, setRegistre] = useState();
  const [dropdownCata, setDropdownCata] = useState(false);
  const [categories, setCategories] = useState();
  const [categorieNom, setCategorieNom] = useState();
  const [categorieId, setCategorieId] = useState();
  const [nom, setNom] = useState();
  const [fileName, setFileName] = useState();
  const [sousCategories, setSousCategoires] = useState();
  const [logo, setLogo] = useState();
  const [err, setErr] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_HOST}/api/categories/`)
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
        setSousCategoires(res.data[0].Sous_Categorie);
        setCategorieId(res.data[0].id);
        setCategorieNom(res.data[0].nom);
      })
      .catch((err) => console.log(err));
  }, []);

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
    if (!registre) {
      setErr('Il faut télecharger votre registre !');
    }
    e.preventDefault();
    empty.forEach((id) => {
      const input = document.getElementById(id);
      console.log(input, id);
      input.style.borderColor = '#ed4337';
    });
  };
  const handleReset = () => {
    setNom('');
    setEmpty(['nom', 'desc']);
    setDesc('');
    setLogo();
    setRegistre('');
    empty.forEach((id) => {
      const input = document.getElementById(id);
      console.log(input);
      input.style.borderColor = '';
    });
  };
  const handleSubmit = () => {
    if (!registre) {
      setErr('Il faut télecharger votre registre !');
    } else {
      setErr('');
      setIsLoading(true);
      const utilisateurId = user.id;
      axios
        .post(`${import.meta.env.VITE_SERVER_HOST}/api/magasins/`, {
          nom,
          desc,
          categorieId,
          registre,
          utilisateurId,
          logo,
          fileName,
        })
        .then((res) => {
          console.log(res.data);
          setDone(true);
          setIsLoading(false);
        });
    }
  };
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    TransformLogo(file);
  };
  const TransformLogo = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setLogo(reader.result);
      };
    } else {
      setLogo();
    }
  };
  const handleRegistreUpload = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    TransformRegistre(file);
  };
  const TransformRegistre = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setRegistre(reader.result);
      };
    } else {
      setRegistre('');
    }
  };
  return (
    <>
      <main>
        <div className="container">
          <div className="edit-profile">
            <div
              style={{ alignItems: 'flex-start' }}
              className="contact-flex"
            >
              <div className="left">
                <div>
                  <div className="head">
                    <div className="icon-wrapper">
                      <BiStoreAlt className="icon" />
                    </div>
                    <h3 style={{ color: 'black' }}>
                      Plateform E-commerce
                    </h3>
                  </div>
                  <p>
                    Vous pouvez ouvrir plusieurs magasins sur notre
                    site.
                  </p>
                </div>
                <div>
                  <div className="head">
                    <div className="icon-wrapper">
                      <BsTruck className="icon" />
                    </div>
                    <h3 style={{ color: 'black' }}>Livraison</h3>
                  </div>
                  <p>
                    Systéme de livraison intégerer avec une
                    application mobile.
                  </p>
                </div>
              </div>
              <div className="right">
                {!done ? (
                  <form>
                    <h2>Demande D'ouvrir Un Magasin</h2>

                    <div className="form-flex">
                      <div>
                        <label>Nom du Magasin </label>
                        <input
                          id="nom"
                          type="text"
                          value={nom}
                          onChange={(e) => {
                            setNom(e.target.value);
                            handleErr(e);
                          }}
                          onFocus={() => {
                            setErr('');
                          }}
                          placeholder="Nom du magasin"
                        />
                      </div>
                    </div>
                    <div className="form-flex">
                      <div>
                        <label htmlFor="">Déscription</label>
                        <textarea
                          placeholder="Déscription"
                          style={{
                            marginBottom: '.5em',
                            height: '15vh',
                          }}
                          id="desc"
                          onChange={(e) => {
                            setDesc(e.target.value);
                            handleErr(e);
                            setErr('');
                          }}
                          value={desc}
                        ></textarea>
                      </div>
                    </div>
                    <div
                      className="form-flex"
                      style={{ alignItems: 'flex-start' }}
                    >
                      <div>
                        <label style={{ marginBottom: '2em' }}>
                          Catégories{' '}
                        </label>
                        <div
                          className="dropdown"
                          style={{ zIndex: '5', marginTop: '.5em' }}
                        >
                          <button
                            style={{
                              marginBlock: '0',
                              borderColor: 'black',
                              color: 'black',
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              setDropdownCata((current) => !current);
                              setErr('');
                            }}
                            className={
                              dropdownCata
                                ? 'dropdown-open'
                                : undefined
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
                                style={{
                                  color: 'black',
                                  borderColor: 'black',
                                }}
                              >
                                {categories?.map((cate) => {
                                  return (
                                    <li
                                      onClick={() => {
                                        setSousCategoires(
                                          cate?.Sous_Categorie
                                        );
                                        setCategorieNom(cate.nom);
                                        setCategorieId(cate.id);
                                        setDropdownCata(false);
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
                      <div>
                        <label
                          style={{
                            marginTop: '.5em',
                            paddingLeft: '0',
                          }}
                        >
                          Les sous catégories de la catégorie{' '}
                          {categorieNom} :
                        </label>
                        <ul
                          style={{
                            marginTop: '.5em',
                            paddingLeft: '1.5em',
                          }}
                        >
                          {sousCategories?.map((sousCate) => {
                            return (
                              <li
                                style={{
                                  listStyle: 'initial',
                                }}
                              >
                                {sousCate.nom}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                    {err && <p className="err">{err}</p>}
                    <div
                      className="form-flex"
                      style={{ alignItems: 'flex-start' }}
                    >
                      {registre && (
                        <div>
                          <label htmlFor="">
                            Votre registre d'ecommerce :
                          </label>
                          <div
                            style={{
                              marginTop: '.5em',
                            }}
                          >
                            <p
                              style={{
                                marginLeft: '.5em',
                                display: 'flex',
                                gap: '2em',
                              }}
                            >
                              {fileName}
                              <RxCross1
                                style={{
                                  cursor: 'pointer',
                                  color: 'red',
                                }}
                                size={17}
                                onClick={() => {
                                  setRegistre('');
                                }}
                              />
                            </p>
                          </div>
                        </div>
                      )}

                      {!registre && (
                        <div style={{ display: 'block' }}>
                          <label htmlFor="">
                            Votre registre d'ecommerce :
                          </label>
                          <div
                            style={{
                              marginTop: '.5em',
                            }}
                          >
                            <div
                              onClick={() => {
                                inputRefRegistre.current.click();
                                setErr('');
                              }}
                            >
                              <p
                                className="btn btn-sec"
                                style={{
                                  width: '70%',
                                  marginTop: '1em',
                                }}
                              >
                                Choisir un fichier
                              </p>
                            </div>
                            <input
                              type="file"
                              accept="pdf/*"
                              ref={inputRefRegistre}
                              style={{ display: 'none' }}
                              onChange={handleRegistreUpload}
                            />
                          </div>
                        </div>
                      )}
                      <div>
                        <label htmlFor="">Logo :</label>
                        {logo && (
                          <div
                            className="add-product-image"
                            style={{ width: '50%' }}
                          >
                            <div className="add-product-image-preview">
                              <img src={logo} alt="Product Image" />
                              <button
                                className="add-product-image-delete"
                                onClick={() => {
                                  setLogo();
                                  setErr('');
                                }}
                              >
                                <RxCross1
                                  className="icon"
                                  size={17}
                                />
                              </button>
                            </div>
                          </div>
                        )}

                        {!logo && (
                          <>
                            <div
                              className="add-product-image"
                              style={{
                                marginTop: '.5em',
                                width: '50%',
                                cursor: 'pointer',
                              }}
                            >
                              <div
                                className="add-product-image-overlay"
                                onClick={() => {
                                  inputRefLogo.current.click();
                                }}
                              >
                                <span className="add-product-image-overlay-icon">
                                  +
                                </span>
                              </div>
                              <input
                                type="file"
                                accept="image/*"
                                ref={inputRefLogo}
                                style={{ display: 'none' }}
                                onChange={handleLogoUpload}
                              />
                            </div>
                          </>
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
                            console.log(err);
                            if (empty.length === 0 && !err) {
                              handleSubmit();
                            }
                          }}
                        >
                          Envoyer
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
                ) : (
                  <Successs
                    message="Votre demande a été envoyer"
                    message2="La réponse va étre envoyer a votre email"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default DemandeMagasin;
