import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useRef, useEffect, memo } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { RxCross1 } from 'react-icons/rx';
import {
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import Spinner from '../components/Spinner';
import { TiStarFullOutline } from 'react-icons/ti';
import { BsTrash } from 'react-icons/bs';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Dialog from '../components/Dialog';
const AdminEditMagasin = () => {
  const ref = useRef();
  const inputRefLogo = useRef(null);
  const navigate = useNavigate();
  const { magasinId } = useParams();

  const [depots, setDepots] = useState();

  const [categorie, setCategorie] = useState();
  const [nom, setNom] = useState('');
  const [desc, setDesc] = useState('');
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [empty, setEmpty] = useState([]);
  const [date, setDate] = useState([]);
  const [magasin, setMagasin] = useState({});
  const [logo, setLogo] = useState();
  const [dialogMagasin, setDialogMagasin] = useState(false);
  const [deletedMagasin, setDeletedMagasin] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/magasins/${magasinId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setMagasin(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (deletedMagasin) {
      const email = magasin?.Utilisateur?.email;
      console.log(magasin?.Utilisateur?.email);
      axios
        .post(
          `http://localhost:3000/api/magasins/delete/${magasinId}`,
          {
            email,
          }
        )
        .then((res) => {
          console.log(res.data);
          navigate('/dashboard/admin/magasins');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [deletedMagasin]);

  useEffect(() => {
    setCategorie(magasin?.Categorie);
    setDepots(magasin?.Depot);
    setDate(magasin?.createdAt?.split('T'));
    setNom(magasin?.nom);
    setDesc(magasin?.description);
    setLogo(magasin?.logo);
  }, [magasin, depots]);

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
      setLogo('');
    }
  };
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

    empty.forEach((id) => {
      const input = document.getElementById(id);
      console.log(input);
      input.style.borderColor = '#ed4337';
    });
    console.log(empty);
  };

  const handleReset = () => {
    setNom(magasin?.nom);
    setDesc(magasin?.description);
    setErr(false);
    empty.forEach((id) => {
      const input = document.getElementById(id);
      console.log(input);
      input.style.borderColor = '';
    });
    setEmpty([]);
  };
  const validate = () => {
    const email = magasin?.Utilisateur?.email;
    console.log(magasin?.Utilisateur?.email);
    axios
      .patch(
        `http://localhost:3000/api/magasins/valider/${magasin.id}`,
        {
          email,
        }
      )
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        navigate('/dashboard/admin/magasins');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteDepot = (id) => {
    axios
      .delete(`http://localhost:3000/api/magasins/depot/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        setDepots((current) =>
          current.filter((depot) => depot.id !== res.data.id)
        );
        console.log(depots);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = () => {
    const categorieId = categorie?.id;
    setIsLoading(true);

    axios
      .patch(`http://localhost:3000/api/magasins/${magasin.id}`, {
        nom,
        desc,
        categorieId,
        logo,
      })
      .then((res) => {
        console.log(res);
        navigate(`/dashboard/admin/magasins`);
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
        {magasin?.etat === 'validé' ? (
          <h2>Voir et modifier le details de cette magasin</h2>
        ) : (
          <h2>Voir le details de cette demande</h2>
        )}
        <div
          className="form-flex"
          style={{
            justifyContent: 'space-between',
          }}
        >
          {date && (
            <p style={{ fontWeight: 'lighter' }}>
              Cette demande a été crée le {date[0] + ' '} à{' '}
              {date[1]?.substring(0, 8)} par l'utilisateur{' '}
              <span style={{ fontWeight: '500' }}>
                {' '}
                {magasin?.Utilisateur?.nom + ' '}
                {magasin?.Utilisateur?.prenom + ' '}
              </span>
            </p>
          )}
        </div>
      </div>
      <div className="edit-profile">
        {magasin.etat === 'non-validé' ? (
          <>
            <div className="form-flex">
              <div>
                <label>Nom du magasin :</label>
                <p style={{ color: '#3B4C68', marginLeft: '1em' }}>
                  {magasin?.nom}
                </p>
              </div>
            </div>
            <div className="form-flex">
              <div>
                <label>Description :</label>
                <p style={{ color: '#3B4C68', marginLeft: '1em' }}>
                  {magasin?.description}
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="form-flex">
              <div>
                <label>Nom du magasin </label>

                <input
                  id="nom"
                  value={nom}
                  type="text"
                  onChange={(e) => {
                    setNom(e.target.value);
                    handleErr(e);
                  }}
                />
              </div>
            </div>
            <div className="form-flex">
              <div>
                <label>Déscription</label>

                <input
                  id="desc"
                  value={desc}
                  type="text"
                  onChange={(e) => {
                    setDesc(e.target.value);
                    handleErr(e);
                  }}
                />
              </div>
            </div>
          </>
        )}
        <div className="form-flex">
          <div style={{ color: '#3B4C68' }}>
            <p
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '.5em',
              }}
            >
              <a
                href={magasin?.register_commerce}
                target="_blank"
                className="register"
              >
                Le registre d'ecommerce de ce magasin
              </a>
              <AiOutlineArrowRight size={15} color="#2E47BD" />
            </p>
            <label htmlFor="">Logo</label>
            {magasin?.etat === 'non-validé' && (
              <>
                {magasin?.logo ? (
                  <img
                    src={magasin?.logo}
                    alt=""
                    style={{
                      width: '200px',
                      height: '200px',
                      marginTop: '.5em',
                    }}
                  />
                ) : (
                  <p style={{ marginTop: '.5em' }}>
                    (Il y a pas un logo !)
                  </p>
                )}
              </>
            )}
            {magasin?.etat === 'validé' && (
              <div>
                {logo && (
                  <div
                    className="add-product-image"
                    style={{
                      width: '200px',
                      height: '200px',
                      marginTop: '.5em',
                    }}
                  >
                    <div className="add-product-image-preview">
                      <img
                        src={logo}
                        alt="Product Image"
                        style={{
                          aspectRatio: '2/3',
                          objectFit: 'contain',
                        }}
                      />
                      <button
                        className="add-product-image-delete"
                        onClick={() => {
                          setLogo('');
                          setErr('');
                        }}
                      >
                        <RxCross1 className="icon" size={17} />
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
                        width: '200px',
                        height: '200px',
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
            )}
          </div>
          <div style={{ color: '#3B4C68' }}>
            <p style={{ color: '#3B4C68', fontWeight: '500' }}>
              Les sous catégories de la catégorie de ce magasin (
              {magasin?.Categorie?.nom}) :
            </p>
            <ul style={{ paddingLeft: '1.5em' }}>
              {magasin?.Categorie?.Sous_Categorie.map((cate) => {
                return (
                  <li
                    style={{
                      listStyle: 'initial',
                    }}
                  >
                    {cate.nom}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="form-flex">
          {magasin?.etat === 'validé' && (
            <div>
              {depots?.length !== 0 && (
                <div style={{ color: '#3B4C68' }}>
                  <h4>Les dépots de ce magasin : </h4>
                  <ul
                    style={{
                      paddingLeft: '1.5em',
                      fontWeight: '500',
                    }}
                  >
                    {depots?.map((depot) => {
                      return (
                        <li
                          style={{
                            marginBlock: '.5em',
                            listStyle: 'initial',
                          }}
                        >
                          {depot?.nom}
                          <div
                            style={{
                              fontWeight: 'lighter',
                              marginLeft: '1em',
                              marginTop: '.3em',
                              display: 'flex',
                              justifyContent: 'space-between',
                              paddingRight: '1em',
                            }}
                          >
                            <div>
                              <p>Wilaya : {depot?.wilaya}</p>
                              <p>Adresse : {depot?.adresse}</p>
                            </div>
                            <BsTrash
                              style={{
                                color: '#ed4337',
                                cursor: 'pointer',
                              }}
                              onClick={(e) => {
                                deleteDepot(depot.id);
                              }}
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          )}
          <div></div>
        </div>

        {magasin?.etat === 'validé' ? (
          <div
            className="btns"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <button
                className="btn"
                style={{
                  backgroundColor: 'red',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '.5em',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setDialogMagasin(true);
                }}
              >
                <BsTrash />
                Supprimer
              </button>
            </div>
            <div style={{ display: 'flex', gap: '2em' }}>
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
          </div>
        ) : (
          <div
            className="btns"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <button
                className="btn"
                style={{
                  backgroundColor: 'red',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '.5em',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setDialogMagasin(true);
                }}
              >
                <BsTrash />
                Refuser
              </button>
            </div>
            <div style={{ display: 'flex', gap: '1em' }}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleReset();
                  navigate(`/dashboard/admin/magasins`);
                }}
                className="btn btn-sec"
              >
                Retourner
              </button>
              {!isLoading ? (
                <button
                  className="btn"
                  onClick={(e) => {
                    validate();
                  }}
                >
                  Valider
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
          </div>
        )}
        {dialogMagasin && (
          <Dialog
            text1="Est ce que vous-avez sur ?"
            setDialogMagasin={setDialogMagasin}
            setDeletedMagasin={setDeletedMagasin}
          />
        )}
      </div>
    </div>
  );
};

export default AdminEditMagasin;
